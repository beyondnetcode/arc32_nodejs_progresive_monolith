# [ADR 0046](0046-dapr-observabilidad-unificada.md): AdopciÃ³n de Dapr y unificaciÃ³n de trazabilidad con el stack de observabilidad existente

## Estado
Aprobado

## Fecha
2026-05-12

## Contexto
Durante la **Fase 1 (pre-Dapr)** de la evoluciÃ³n arquitectÃ³nica, el ecosistema desarrollÃ³ un stack de observabilidad corporativo maduro. Este stack implementa logs estructurados (JSON), inyecta manualmente un identificador de correlaciÃ³n distribuida (`x-correlation-id`) en el punto de entrada (BFF/Gateway), y consolida los datos en Elastic/Grafana para su posterior diagnÃ³stico y alerta.

En la **Fase 2 (actual)**, iniciamos la adopciÃ³n sistÃ©mica de **Dapr** como sidecar de infraestructura para facilitar la transiciÃ³n evolutiva hacia microservicios y abstraer las capacidades transversales (State, PubSub, Secrets). 

Dapr introduce un comportamiento nativo y automÃ¡tico de telemetrÃ­a basado en el estÃ¡ndar W3C TraceContext, inyectando el header `traceparent`. Esto genera un **problema de diseÃ±o detectado**: si la aplicaciÃ³n conserva el uso del `x-correlation-id` manual operando de forma paralela a la traza de Dapr, se fragmentarÃ¡ la trazabilidad en dos hilos disjuntos dentro de Elastic/Grafana (uno de infraestructura y otro de runtime), imposibilitando el diagnÃ³stico unificado de extremo a extremo (E2E) y violando el principio corporativo de trazabilidad Ãºnica.

## DecisiÃ³n
Establecemos la unificaciÃ³n absoluta de la telemetrÃ­a de infraestructura y runtime bajo las siguientes directrices de ingenierÃ­a:

1.  **AdopciÃ³n del Sidecar**: Consolidar a Dapr como el mecanismo primario de comunicaciÃ³n inter-servicio e integraciÃ³n de componentes de infraestructura, alineado con el [ADR-0006](../core/0006-future-microservices-transition-dapr.md).
2.  **UnificaciÃ³n de CorrelaciÃ³n (Pivot a W3C)**: La aplicaciÃ³n **cesarÃ¡ la generaciÃ³n de identificadores de correlaciÃ³n manuales**. En su lugar, extraerÃ¡ dinÃ¡micamente el `trace-id` del header `traceparent` inyectado automÃ¡ticamente por el sidecar de Dapr y lo establecerÃ¡ como el valor primario en todos los metadatos de los logs estructurados de aplicaciÃ³n.
3.  **VinculaciÃ³n de Spans**: Los logs de aplicaciÃ³n DEBEN incluir tambiÃ©n el `span-id` activo para permitir el anclaje directo entre una lÃ­nea de log y un segmento especÃ­fico del Ã¡rbol de ejecuciÃ³n en el trazado distribuido.
4.  **InstrumentaciÃ³n vÃ­a OpenTelemetry**: Se utilizarÃ¡ el SDK agnÃ³stico de OpenTelemetry en el runtime para heredar y propagar la cabecera TraceContext a lo largo de toda la ejecuciÃ³n interna del dominio, garantizando la continuidad de la traza.
5.  **AlineaciÃ³n en Ingesta**: Los agentes de transporte (Filebeat, Vector, APM Server) se reconfigurarÃ¡n para mapear sus campos de indexaciÃ³n al identificador de campo estÃ¡ndar `trace_id` (reemplazando `x-correlation-id`), salvaguardando la compatibilidad retroactiva de los tableros de Grafana tras una refactorizaciÃ³n de consultas menor.
6.  **ProhibiciÃ³n de SDKs Propietarios**: Se prohÃ­be estrictamente importar SDKs clientes de Dapr o Elastic dentro del modelo de dominio core. Toda comunicaciÃ³n con el sidecar Dapr se canalizarÃ¡ estrictamente a travÃ©s de llamadas HTTP/gRPC locales mediante puertos y adaptadores de infraestructura, asegurando la independencia del framework.

## Consecuencias

### Positivas
- **Trazabilidad HolÃ­stica**: Garantiza que un flujo que viaja de un cliente al Gateway, cruza por el Sidecar Dapr y entra a la lÃ³gica del servicio, se visualice como una sola lÃ­nea de tiempo ininterrumpida.
- **DepuraciÃ³n Acelerada**: Los dashboards integrados ahora pueden correlacionar latencias de infraestructura (inyectadas por Dapr) con errores de lÃ³gica de negocio (extraÃ­dos de los logs de la app) bajo un mismo ID de filtrado.
- **Mantenibilidad del CÃ³digo**: Preserva la infraestructura de logging estructurado actual, modificando Ãºnicamente el Middleware/Interceptor encargado de la extracciÃ³n de identidad en el perÃ­metro.

### Negativas
- **ActualizaciÃ³n de Tableros**: Exige un ciclo de refactorizaciÃ³n de los Dashboards de Grafana actuales y las bÃºsquedas guardadas en Elastic para apuntar al nuevo esquema de metadatos (`trace_id`).
- **Curva de Aprendizaje**: Requiere la capacitaciÃ³n tÃ©cnica del equipo de desarrollo sobre la mecÃ¡nica y estructura del estÃ¡ndar W3C TraceContext.

## Referencias
- [ADR-0006: TransiciÃ³n Futura a Microservicios con Dapr](../core/0006-future-microservices-transition-dapr.md)
- [Reference Blueprint - SecciÃ³n Observabilidad](../../architecture/reference-blueprint.md#31-patrÃ³n-de-contexto-general--stack-completo-con-niveles-de-gateway-y-bus-de-eventos-inyectable)
- [Engineering Manifesto - Aislamiento de Infraestructura](../../engineering/engineering-manifesto.md)
- [Authoritative Tech Stack - Frameworks Aprobados](../../architecture/authoritative-tech-stack.md)

---
[? Volver al Índice](./README.es.md)
