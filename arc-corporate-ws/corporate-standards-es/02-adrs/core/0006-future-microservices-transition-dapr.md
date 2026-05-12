# [ADR 0006](0006-future-microservices-transition-dapr.md): Transición Futura a Microservicios con Sidecars Dapr

## Estado
Aprobado — Backlog (Hito de Fase 3)

## Fecha
2026-05-08

## Contexto
El sistema es actualmente un Monolito Modular (un solo proceso, contextos delimitados lógicamente aislados). A medida que los requisitos de negocio escalen —mayor tráfico, ciclos de despliegue independientes o integración de servicios políglotas— se requiere un camino claro y seguro hacia los microservicios. La transición no debe requerir la reescritura de ninguna lógica de dominio.

## Decisión
Adoptar **Dapr (Distributed Application Runtime)** como el runtime sidecar de microservicios cuando se divida el monolito en servicios independientes.

**Hitos de migración:**

| Hito | Descripción |
| :--- | :--- |
| **M1 — Monolito Modular** | Estado actual. Proceso único con módulos de contexto delimitado aislados. |
| **M2 — Extracción de Servicios** | Contextos de alto tráfico o desplegables independientemente extraídos como microproyectos Nx. Cada uno obtiene su propio esquema de base de datos ([ADR-0031](0031-schema-per-context-domain-event-catalog.md)) y se comunica vía gRPC o Dapr. |
| **M3 — Malla Completa (Full Mesh)** | Todos los servicios corren con Sidecars de Dapr. La invocación de servicio a servicio, Pub/Sub y el Estado son gestionados por componentes Dapr (YAML declarativo). |

**Restricción clave:** El Core de dominio debe cambiar **cero líneas** cuando se introduzca Dapr. Todas las llamadas al SDK de Dapr se envuelven detrás de las abstracciones existentes `IEventBusPort` e `ICachePort` ([ADR-0015](0015-event-driven-architecture-intra-domain.md), [ADR-0014](0014-distributed-caching-strategy-redis.md)).

## Consecuencias

### Positivas
- Arquitectura políglota: otros servicios pueden escribirse en Go o Python mientras comparten las capacidades de Dapr.
- El intercambio de infraestructura (Redis -> Kafka, PostgreSQL -> Cosmos DB) solo requiere un cambio de YAML en el componente Dapr.
- Políticas nativas de reintento, circuit breakers y trazado distribuido integrados en el sidecar de Dapr.

### Negativas
- Añade Kubernetes/orquestación de contenedores como un prerrequisito para la fase de malla completa.
- El desarrollo local con Dapr añade una sobrecarga de proceso sidecar por servicio.

## Referencias
- [ADR-0015: Arquitectura Dirigida por Eventos](../02-adrs/core/0015-event-driven-architecture-intra-domain.md)
- [ADR-0031: Esquema por Contexto y Catálogo de Eventos de Dominio](../02-adrs/core/0031-schema-per-context-domain-event-catalog.md)
- [Documentación de Dapr](https://dapr.io)