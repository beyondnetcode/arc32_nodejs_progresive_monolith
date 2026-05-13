# [ADR 0007](0007-observability-telemetry-loki-opentelemetry.md): Observabilidad con OpenTelemetry, Loki y Jaeger

## Estado
Aprobado

## Fecha
2026-05-08

## Contexto
Sin registros estructurados y rastreo distribuido, diagnosticar problemas en producciÃ³n requiere conjeturas. Mensajes de registro sin IDs de correlaciÃ³n hacen imposible rastrear una Ãºnica peticiÃ³n de usuario a travÃ©s de mÃºltiples capas de servicio (Kong -> BFF -> API Core -> Base de Datos). La observabilidad debe ser un ciudadano de primera clase, no una ocurrencia tardÃ­a.

## DecisiÃ³n
Adoptar el estÃ¡ndar **OpenTelemetry (OTel)** como el espinazo unificado de observabilidad, con la siguiente cadena de herramientas:

| SeÃ±al | TecnologÃ­a | PropÃ³sito |
| :--- | :--- | :--- |
| **Trazas** | OpenTelemetry SDK + Jaeger | Rastreo distribuido de peticiones a travÃ©s de todos los niveles |
| **Logs** | Pino + Grafana Loki | AgregaciÃ³n y consulta de logs JSON estructurados |
| **MÃ©tricas**| Prometheus + Grafana | MÃ©tricas SRE: latencia, tasa de errores, rendimiento |

**Reglas de implementaciÃ³n:**

1. **Auto-instrumentaciÃ³n**: Las llamadas HTTP de NestJS, TypeORM y Redis se instrumentan automÃ¡ticamente vÃ­a paquetes de auto-instrumentaciÃ³n de OTel â€” no se requiere la creaciÃ³n manual de span para flujos estÃ¡ndar.
2. **Enrutamiento AgnÃ³stico al Proveedor**: La aplicaciÃ³n DEBE ÃšNICAMENTE emitir telemetrÃ­a neutral al proveedor hacia un **Colector OpenTelemetry** local. Cambiar los backends finales (ej., de Jaeger a Datadog, o de Loki a Elastic) requiere cambiar ÃšNICAMENTE la configuraciÃ³n YAML del Colector, con **cero modificaciones o re-despliegues** en el cÃ³digo fuente de la aplicaciÃ³n.
3. **Spans manuales**: Las operaciones significativas de negocio (ejecuciÃ³n de casos de uso, fallos de cachÃ©) obtienen una envoltura explÃ­cita con `tracer.startSpan()`.
4. **PropagaciÃ³n de trazas**: Todas las llamadas HTTP salientes incluyen cabeceras `traceparent` (estÃ¡ndar W3C Trace Context).
5. **Logs estructurados**: Cada entrada de registro incluye `traceId`, `spanId`, `tenantId` y `userId` para una correlaciÃ³n completa.

## Consecuencias

### Positivas
- Un Ãºnico `traceId` rastrea una peticiÃ³n desde el log del gateway Kong hasta el plan de consulta de PostgreSQL.
- Los dashboards de Grafana proporcionan visibilidad a nivel de SRE con desglose de latencia P50/P95/P99.
- Cero cambios de cÃ³digo en el Core de dominio â€” toda la instrumentaciÃ³n reside en las capas de infraestructura y adaptadores.
- **SoberanÃ­a TecnolÃ³gica Absoluta**: Cero bloqueo de proveedor. El protocolo OTel nos desacopla de Datadog, Dynatrace, Grafana, o cualquier proveedor comercial de forma nativa.

### Negativas
- El Colector de OTel es un componente de infraestructura adicional para desplegar y mantener.
- La creaciÃ³n descuidada de spans puede introducir sobrecarga de rendimiento; la auto-instrumentaciÃ³n debe ser perfilada.

## Referencias
- [DocumentaciÃ³n de OpenTelemetry](https://opentelemetry.io)
- [ADR-0002: Arquitectura Hexagonal Limpia](../adrs/nodejs/0002-clean-architecture-nestjs.md)

---
[? Volver al Índice](./README.es.md)
