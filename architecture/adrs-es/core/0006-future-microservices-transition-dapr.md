# [ADR 0006](0006-future-microservices-transition-dapr.md): TransiciÃ³n Futura a Microservicios con Sidecars Dapr

## Estado
Aprobado â€” Backlog (Hito de Fase 3)

## Fecha
2026-05-08

## Contexto
El sistema es actualmente un Monolito Modular (un solo proceso, contextos delimitados lÃ³gicamente aislados). A medida que los requisitos de negocio escalen â€”mayor trÃ¡fico, ciclos de despliegue independientes o integraciÃ³n de servicios polÃ­glotasâ€” se requiere un camino claro y seguro hacia los microservicios. La transiciÃ³n no debe requerir la reescritura de ninguna lÃ³gica de dominio.

## DecisiÃ³n
Adoptar **Dapr (Distributed Application Runtime)** como el runtime sidecar de microservicios cuando se divida el monolito en servicios independientes.

**Hitos de migraciÃ³n:**

| Hito | DescripciÃ³n |
| :--- | :--- |
| **M1 â€” Monolito Modular** | Estado actual. Proceso Ãºnico con mÃ³dulos de contexto delimitado aislados. |
| **M2 â€” ExtracciÃ³n de Servicios** | Contextos de alto trÃ¡fico o desplegables independientemente extraÃ­dos como microproyectos Nx. Se activa bajo las reglas en [ADR-0045](../core/0045-microservice-extraction-readiness-criteria.md). |
| **M3 â€” Malla Completa (Full Mesh)** | Estado avanzado del ecosistema donde la interacciÃ³n a nivel de infraestructura utiliza la abstracciÃ³n de Sidecar. |

### ðŸš¦ Puerta de DecisiÃ³n de Dapr (Activation Gate)
Para prevenir el over-engineering prematuro, los Sidecars de Dapr **NO** estÃ¡n activos por defecto en el Hito 2. La organizaciÃ³n operarÃ¡ inicialmente mediante despliegues Kubernetes puros utilizando comunicaciÃ³n gRPC explÃ­cita entre servicios. La activaciÃ³n de Dapr estÃ¡ condicionada a:
- El conjunto total de servicios extraÃ­dos supera los cinco (5).
- O BIEN: Se exige reintento automÃ¡tico / circuit breaking transparente avanzado que exceda la capacidad del cliente estÃ¡ndar.
- O BIEN: IntegraciÃ³n polÃ­glota que requiere abstracciÃ³n Pub/Sub uniforme (cargas Go/Python).

### ðŸª¢ MecÃ¡nica del PatrÃ³n Strangler Fig vÃ­a Kong
La evoluciÃ³n utiliza el **PatrÃ³n Strangler Fig** aprovechando el API Gateway de borde existente (Kong) para gobernar el desvÃ­o gradual de trÃ¡fico desde endpoints legados hacia micro-unidades extraÃ­das sin modificar el monolito:

```yaml
# Ejemplo de Enrutamiento Strangler EstÃ¡ndar en Kong
routes:
  - name: facturacion-nuevo-servicio
    paths: ["/api/v2/billing"]      # VersiÃ³n de servicio nuevo objetivo
    service: billing-service
  - name: facturacion-legado
    paths: ["/api/billing"]         # Ruta retirada gradualmente en monolito
    service: core-monolith
```

**RestricciÃ³n clave:** El Core de dominio debe cambiar **cero lÃ­neas** cuando se introduzca Dapr. Todas las llamadas al SDK de Dapr se envuelven detrÃ¡s de las abstracciones existentes `IEventBusPort` e `ICachePort` ([ADR-0015](0015-event-driven-architecture-intra-domain.md), [ADR-0014](0014-distributed-caching-strategy-redis.md)).

## Consecuencias

### Positivas
- Arquitectura polÃ­glota: otros servicios pueden escribirse en Go o Python mientras comparten las capacidades de Dapr.
- El intercambio de infraestructura (Redis -> Kafka, PostgreSQL -> Cosmos DB) solo requiere un cambio de YAML en el componente Dapr.
- PolÃ­ticas nativas de reintento, circuit breakers y trazado distribuido integrados en el sidecar de Dapr.

### Negativas
- AÃ±ade Kubernetes/orquestaciÃ³n de contenedores como un prerrequisito para la fase de malla completa.
- El desarrollo local con Dapr aÃ±ade una sobrecarga de proceso sidecar por servicio.

---

## âž• Addenda: IntegraciÃ³n de Observabilidad (Dapr + App)
Con la introducciÃ³n de Dapr en fases avanzadas, se formalizan los siguientes mandatos de observabilidad para evitar duplicidad de hilos de correlaciÃ³n:
1. **Cero SDKs en Core**: La instrumentaciÃ³n de Dapr en la lÃ³gica de dominio debe invocarse EXCLUSIVAMENTE a travÃ©s del sidecar HTTP/gRPC, nunca importando el SDK nativo de Dapr en capas de dominio.
2. **UnificaciÃ³n TraceContext**: El identificador de correlaciÃ³n manual pre-Dapr (`x-correlation-id`) debe converger con el estÃ¡ndar W3C TraceContext (`traceparent`) inyectado automÃ¡ticamente por Dapr, gobernado por el **[ADR-0046](0046-dapr-observabilidad-unificada.md)**.
3. **ExportaciÃ³n Centralizada**: Ambas fuentes de telemetrÃ­a (Sidecar + App) deben utilizar el recolector OpenTelemetry unificado para garantizar vistas de traza de extremo a extremo coherentes.

## Referencias
- [ADR-0015: Arquitectura Dirigida por Eventos](../adrs/core/0015-event-driven-architecture-intra-domain.md)
- [ADR-0031: Esquema por Contexto y CatÃ¡logo de Eventos de Dominio](../adrs/core/0031-schema-per-context-domain-event-catalog.md)
- [ADR-0046: Observabilidad Unificada Dapr](./0046-dapr-observabilidad-unificada.md)
- [DocumentaciÃ³n de Dapr](https://dapr.io)

---
[? Volver al Índice](./README.es.md)
