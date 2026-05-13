# [ADR 0031](0031-schema-per-context-domain-event-catalog.md): Esquema por Contexto Delimitado y CatÃ¡logo de Eventos de Dominio

## Estado
Aprobado

## Fecha
2026-05-11

## Contexto

Como el sistema estÃ¡ diseÃ±ado como un **Monolito Progresivo** ([ADR-0006](0006-future-microservices-transition-dapr.md)) destinado a evolucionar hacia microservicios, existen dos riesgos estructurales que no estÃ¡n cubiertos por la lÃ­nea base actual de ADR:

1. **Esquema de PostgreSQL Plano**: [ADR-0010](0010-multi-tenancy-architecture-strategy.md) define la Seguridad a Nivel de Fila (RLS) para el aislamiento multi-tenant, pero todas las tablas residen en un Ãºnico esquema plano. Al extraer un contexto delimitado a un microservicio independiente, no hay una frontera de propiedad clara a nivel de base de datos. Los joins entre tablas se convierten en llamadas entre servicios, y los planes de migraciÃ³n se vuelven ambiguos.

2. **Sin CatÃ¡logo de Eventos de Dominio**: [ADR-0015](0015-event-driven-architecture-intra-domain.md) define la abstracciÃ³n inyectable `IEventBusPort`, pero no especifica **quÃ© eventos cruzan los lÃ­mites de contexto**, ni los **contratos de carga Ãºtil tipados** para esos eventos. Sin este catÃ¡logo, las dependencias entre contextos son implÃ­citas y no estÃ¡n documentadas, lo que hace que la extracciÃ³n de microservicios sea insegura.

Ambos problemas tienen un costo cero de resoluciÃ³n durante la fase de Monolito Modular, pero se vuelven extremadamente caros de arreglar post-extracciÃ³n.

---

## DecisiÃ³n

### Parte 1: Esquema por Contexto Delimitado (PostgreSQL)

Cada contexto delimitado serÃ¡ dueÃ±o de un **esquema de PostgreSQL dedicado**. Todas las tablas que pertenezcan a un contexto deben crearse dentro de su esquema. Los joins entre esquemas dentro del monolito siguen estando permitidos (misma conexiÃ³n de BD), pero deben tratarse como contratos de integraciÃ³n, no como detalles de implementaciÃ³n.

#### Asignaciones de Esquema

| Esquema PostgreSQL | Contexto Propietario | Tablas |
| :--- | :--- | :--- |
| `auth` | Contexto de AutenticaciÃ³n | `auth.users` |
| `tasks` | Contexto de GestiÃ³n de Tareas | `tasks.task`, `tasks.task_tags` |
| `taxonomy` | Contexto de TaxonomÃ­a | `taxonomy.category`, `taxonomy.tag` |
| `audit` | Contexto de AuditorÃ­a | `audit.audit_log` |

#### Estrategia de MigraciÃ³n

Cada contexto delimitado tendrÃ¡ su propia configuraciÃ³n de `DataSource` de TypeORM acotada a su esquema. Las migraciones se ejecutan por esquema, permitiendo ciclos de despliegue independientes cuando los contextos se extraigan en microservicios dedicados.

```typescript
// Ejemplo: TaskDataSource (acotado al esquema tasks)
export const TaskDataSource = new DataSource({
  schema: 'tasks',
  migrations: ['dist/tasks/infrastructure/migrations/*.js'],
  entities: ['dist/tasks/infrastructure/entities/*.js'],
});
```

#### Ruta de MigraciÃ³n de Base de Datos (ProgresiÃ³n en 3 Fases)

Para prevenir el antipatrÃ³n de "Base de Datos Compartida con Microservicios", la transiciÃ³n debe seguir estrictamente:

- **Fase 1 (Monolito):** Motor fÃ­sico compartido, esquemas lÃ³gicamente distintos por contexto. PROHIBIDOS los JOINs entre esquemas. La cohesiÃ³n entre esquemas solo se da vÃ­a API o eventos de dominio.
- **Fase 2 (ExtracciÃ³n):** Usuarios lÃ³gicos separados por servicio extraÃ­do. TransiciÃ³n hacia migraciÃ³n fÃ­sica utilizando el Transactional Outbox ([ADR-0033](../core/0033-transactional-outbox-pattern.md)) para replicaciÃ³n fiable. Se sincroniza el estado vÃ­a eventos, NUNCA vÃ­a acceso DB directo inter-esquema.
- **Fase 3 (Malla Completa):** Propiedad Total de Datos. Cada microservicio posee su propia instancia de motor de base de datos exclusiva. Las dependencias se resuelven vÃ­a API/gRPC o Vistas Materializadas hidratadas por eventos.

---

### Parte 2: CatÃ¡logo de Eventos de Dominio

Toda la comunicaciÃ³n entre contextos delimitados debe ocurrir exclusivamente vÃ­a **Eventos de Dominio** publicados a travÃ©s de `IEventBusPort` ([ADR-0015](0015-event-driven-architecture-intra-domain.md)). El siguiente catÃ¡logo define todos los eventos aprobados, su contexto propietario y sus contratos de carga Ãºtil tipados.

> **Regla**: Un contexto delimitado solo puede leer de sus propias tablas de esquema. Para obtener datos que pertenecen a otro contexto, debe suscribirse a los Eventos de Dominio publicados por ese contexto.

#### CatÃ¡logo de Eventos

##### Contexto Auth â€” Eventos Publicados

```typescript
/** Publicado cuando un nuevo usuario completa el registro con Ã©xito */
class UserRegisteredEvent {
  readonly eventId: string;        // UUID - para idempotencia
  readonly occurredAt: Date;
  readonly userId: string;         // UUID
  readonly tenantId: string;       // UUID
  readonly email: string;
}

/** Publicado cuando una cuenta de usuario se desactiva permanentemente */
class UserDeactivatedEvent {
  readonly eventId: string;
  readonly occurredAt: Date;
  readonly userId: string;
  readonly tenantId: string;
}
```

##### Contexto GestiÃ³n de Tareas â€” Eventos Publicados

```typescript
/** Publicado cuando una nueva tarea se crea con Ã©xito */
class TaskCreatedEvent {
  readonly eventId: string;
  readonly occurredAt: Date;
  readonly taskId: string;         // UUID
  readonly userId: string;         // UUID - propietario
  readonly tenantId: string;       // UUID
  readonly title: string;
  readonly categoryId: string | null;
}

/** Publicado cuando una tarea transiciona al estado COMPLETED (Completada) */
class TaskCompletedEvent {
  readonly eventId: string;
  readonly occurredAt: Date;
  readonly taskId: string;
  readonly userId: string;
  readonly tenantId: string;
  readonly completedAt: Date;
}

/** Publicado cuando una tarea se elimina permanentemente */
class TaskDeletedEvent {
  readonly eventId: string;
  readonly occurredAt: Date;
  readonly taskId: string;
  readonly userId: string;
  readonly tenantId: string;
}
```

##### Contexto TaxonomÃ­a â€” Eventos Publicados

```typescript
/** Publicado cuando se elimina una categorÃ­a (las tareas que la referencian deben ser notificadas) */
class CategoryDeletedEvent {
  readonly eventId: string;
  readonly occurredAt: Date;
  readonly categoryId: string;
  readonly tenantId: string;
}
```

#### Mapa de SuscripciÃ³n de Eventos

| Evento | Publicador | Suscriptor | RazÃ³n |
| :--- | :--- | :--- | :--- |
| `UserRegisteredEvent` | Auth | Task | Inicializar espacio de trabajo de tareas del usuario |
| `UserDeactivatedEvent` | Auth | Task, Audit | Borrado en cascada de tareas, escribir entrada de auditorÃ­a |
| `TaskCreatedEvent` | Task | Audit | Escribir registro de creaciÃ³n inmutable |
| `TaskCompletedEvent` | Task | Audit | Escribir registro de finalizaciÃ³n inmutable |
| `TaskDeletedEvent` | Task | Audit | Escribir registro de eliminaciÃ³n inmutable |
| `CategoryDeletedEvent` | Taxonomy | Task | Anular el `category_id` en las tareas afectadas |

---

## Consecuencias

### Positivas (Pros)
- **ExtracciÃ³n a microservicios a costo cero**: Los lÃ­mites de esquema definidos de antemano eliminan la parte mÃ¡s costosa de la extracciÃ³n del servicio: la ambigÃ¼edad de la propiedad de los datos.
- **Contratos explÃ­citos**: El CatÃ¡logo de Eventos hace que todas las dependencias entre contextos sean visibles y auditables, previniendo acoplamientos ocultos.
- **Procesamiento de eventos idempotente**: El `eventId` (UUID) en cada evento permite a los consumidores deduplicar de forma segura las entregas reintentadas.
- **Ciclos de migraciÃ³n independientes**: Cada esquema puede migrarse de forma independiente, permitiendo despliegues con cero tiempo de inactividad (zero-downtime) por contexto.

### Negativas (Cons)
- **Sin transacciones entre esquemas**: Las operaciones que abarcan mÃºltiples esquemas no pueden usar una Ãºnica transacciÃ³n de base de datos. Se debe abrazar la consistencia eventual vÃ­a Eventos de Dominio para operaciones entre contextos.
- **Complejidad multi-datasource de TypeORM**: Requiere configurar y gestionar mÃºltiples instancias de `DataSource`, una por esquema. El DI de NestJS debe configurarse cuidadosamente para inyectar la fuente de datos correcta por repositorio.
- **Disciplina del desarrollador**: Los desarrolladores deben respetar las reglas de propiedad del esquema. Las reglas de lÃ­mites de ESLint ([ADR-0003](../nodejs/0003-strict-typescript-standards.md)) deben configurarse para prevenir importaciones directas a travÃ©s de los lÃ­mites de los contextos.

## Referencias
- [ADR-0006: TransiciÃ³n Futura a Microservicios con Dapr](../adrs/core/0006-future-microservices-transition-dapr.md)
- [ADR-0010: Estrategia Multi-Tenancy (RLS)](../adrs/core/0010-multi-tenancy-architecture-strategy.md)
- [ADR-0015: Arquitectura Dirigida por Eventos (Bus Inyectable)](../adrs/core/0015-event-driven-architecture-intra-domain.md)
- [Mapa de Contextos Delimitados](../02-architecture/bounded-context-map.md)

---
[? Volver al Índice](./README.es.md)
