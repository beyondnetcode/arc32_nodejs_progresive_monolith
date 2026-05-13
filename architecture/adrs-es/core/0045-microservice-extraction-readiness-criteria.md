# [ADR 0045](0045-microservice-extraction-readiness-criteria.md): Criterios de AceptaciÃ³n para la ExtracciÃ³n de Microservicios

## Estatus
Aprobado

## Fecha
2026-05-12

## Contexto
El [ADR 0006](../core/0006-future-microservices-transition-dapr.md) define los hitos de evoluciÃ³n de la arquitectura de Monolito Modular hacia Microservicios y el [ADR-0047](../core/0047-architectural-patterns-monolith-soa-microservices.md) provee el marco de selecciÃ³n macro. Sin embargo, se requerÃ­an criterios cuantitativos especÃ­ficos y objetivos para activar fÃ­sicamente la transiciÃ³n de extracciÃ³n de un servicio. Sin estas reglas explÃ­citas, las decisiones de divisiÃ³n corren el riesgo de estar impulsadas por intuiciÃ³n o presiones, lo que deriva en fallos de migraciÃ³n y sobrecarga operativa prematura.

## DecisiÃ³n
Formalizar la regla **"2 de 4"** como disparador cuantitativo obligatorio para la extracciÃ³n de un Bounded Context hacia un servicio independiente.

Un mÃ³dulo de dominio DEBE considerarse un candidato vÃ¡lido para la fase de extracciÃ³n (Milestone 2) si, y solo si, cumple con al menos 2 de los siguientes 4 criterios durante un perÃ­odo de evaluaciÃ³n mÃ­nimo de 15 dÃ­as:

| Criterio | Umbral Objetivo | RazÃ³n ArquitectÃ³nica |
| :--- | :--- | :--- |
| **1. Latencia CrÃ­tica** | Latencia P95 > 200ms sostenida. | Indica contenciÃ³n de CPU/Memoria especÃ­fica del mÃ³dulo que afecta al resto del monolito. |
| **2. Frecuencia de Release** | > 4 despliegues independientes por semana. | Alta velocidad de cambio que requiere ciclos de CI/CD aislados para no bloquear a otros equipos. |
| **3. AutonomÃ­a de Equipo** | > 80% de los commits pertenecen a un solo Squad. | Aislamiento organizacional claro (Ley de Conway); minimiza la sobrecarga de comunicaciÃ³n. |
| **4. Densidad de Datos** | Carga de base de datos > 20% del total del motor. | Cuello de botella de I/O que justifica la migraciÃ³n a una base de datos dedicada por servicio. |

### Procedimiento Operativo de ExtracciÃ³n:
1.  **ValidaciÃ³n:** El Lead Developer del Squad presenta la mÃ©trica al Architectural Board.
2.  **Aislamiento Temporal:** ConfiguraciÃ³n de routing en Gateway (Kong) para habilitar el patrÃ³n Strangler Fig.
3.  **Desacoplamiento de DB:** MigraciÃ³n de schema hacia una instancia independiente segÃºn fase 2 del Database Migration Path ([ADR-0031](../core/0031-schema-per-context-domain-event-catalog.md)).

## Consecuencias

### Positivas
- Elimina la subjetividad en la divisiÃ³n de sistemas distribuidos.
- Previene el antipatrÃ³n de "Microservicios Prematuros" que consume ancho de banda de DevOps innecesariamente.
- AlineaciÃ³n explÃ­cita con la arquitectura basada en mÃ©tricas y observables.

### Negativas
- Requiere que la observabilidad ([ADR-0007](../../nodejs/0007-observability-telemetry-loki-opentelemetry.md)) estÃ© plenamente operativa para capturar los indicadores P95 por mÃ³dulo.

## Referencias
- [ADR 0006: Future Microservices Transition](../core/0006-future-microservices-transition-dapr.md)
- [ADR 0047: Marco de SelecciÃ³n: Monolito vs SOA vs Microservicios](../core/0047-architectural-patterns-monolith-soa-microservices.md)
- Sam Newman â€” *Building Microservices* (2nd Ed. 2021)

---
[? Volver al Índice](./README.es.md)
