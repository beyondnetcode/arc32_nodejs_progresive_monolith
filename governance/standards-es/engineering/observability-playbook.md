# ðŸ“ˆ Estrategia de TelemetrÃ­a y Observabilidad Distribuida End-to-End

Este documento detalla la arquitectura de telemetrÃ­a, propagaciÃ³n de trazas, estÃ¡ndares de registro y el stack de monitorizaciÃ³n rentable para la Plantilla SCM/Referencia bajo la **estrategia BMAD-METHOD**.

---

## ðŸ›ï¸ 1. Los Tres Pilares de la TelemetrÃ­a

Para asegurar la visibilidad absoluta a travÃ©s de nuestro monolito modular y prepararnos para futuros microservicios, implementamos tres pilares sincronizados de observabilidad segÃºn se especifica en el **[ADR 0007](../../../architecture/adrs-es/nodejs/0007-observability-telemetry-loki-opentelemetry.md)**:

```mermaid
graph TD
    subgraph LGTMStack["Stack de Observabilidad LGTM Empresarial"]
        Grafana["Grafana (Dashboard Visual Unificado)"]
        Loki["Grafana Loki (Agregador de Logs Estructurados)"]
        Tempo["Grafana Tempo (AlmacÃ©n de Trazas Distribuidas)"]
        Mimir["Grafana Mimir (AlmacÃ©n de MÃ©tricas Escalable)"]
    end

    App["AplicaciÃ³n NestJS SCM"] -.->|Logs JSON Estructurados| Loki
    App -.->|Trazado OpenTelemetry| Tempo
    App -.->|MÃ©tricas RED de Prometheus| Mimir

    Grafana -->|Consultas| Loki
    Grafana -->|Consultas| Tempo
    Grafana -->|Consultas| Mimir
```

---

## âš™ï¸ 2. Estrategia TÃ©cnica Detallada

### A. Registro Estructurado (Grafana Loki)
*   **EstÃ¡ndar**: Todos los registros de la aplicaciÃ³n se envÃ­an a la salida estÃ¡ndar (`stdout`) en **formato JSON Estructurado** de alto rendimiento (usando `pino` o NestJS `Winston`).
*   **Formato**: Cada entrada de registro **debe** contener los siguientes metadatos:
    ```json
    {
      "timestamp": "2026-05-08T13:14:08.000Z",
      "level": "info",
      "tenantId": "tenant-abc-123",
      "traceId": "otlp-trace-uuid-xyz",
      "spanId": "otlp-span-uuid-abc",
      "context": "InventoryUseCase",
      "message": "Container checked in successfully",
      "containerId": "CONT-998822"
    }
    ```

### B. Trazado Distribuido (OpenTelemetry & Tempo)
*   **PropagaciÃ³n**: OpenTelemetry (OTel) se inicializa al arranque de la aplicaciÃ³n. Los contextos de traza se propagan automÃ¡ticamente usando **cabeceras W3C Trace Context** estÃ¡ndar (`traceparent`).
*   **PropagaciÃ³n de Eventos Intra-Dominio**: Cuando un evento se publica asÃ­ncronamente a travÃ©s del Bus de Eventos, el `trace_id` activo se adjunta a la carga Ãºtil del evento. Los suscriptores aguas abajo extraen el contexto y comienzan un span hijo, preservando la lÃ­nea de tiempo de la transacciÃ³n a travÃ©s de los mÃ³dulos.

### C. MÃ©tricas de Sistema y Negocio (Mimir)
Monitorizamos la salud del sistema y las operaciones de negocio utilizando dos patrones estructurados:
*   **PatrÃ³n RED (Servicios)**: **R**ate (tasa de peticiones/seg), **E**rrors (errores HTTP 5xx / fallos de base de datos), **D**uration (objetivos de latencia p95/p99 < 200ms).
*   **PatrÃ³n USE (Infraestructura)**: **U**tilization (utilizaciÃ³n), **S**aturation (saturaciÃ³n), y **E**rrors (errores) para CPU, memoria y conexiones de base de datos.

---

## ðŸ—ºï¸ 3. Trazabilidad End-to-End del Proceso de Negocio

Para trazar una sola transacciÃ³n de negocio de principio a fin (ej. pesar un contenedor y generar una factura):

1.  **Ingreso**: El API Gateway/BFF genera un `trace_id` Ãºnico (si no lo proporciona el cliente) y lo inyecta en la peticiÃ³n.
2.  **Caso de Uso**: El MÃ³dulo de Inventario ejecuta la transacciÃ³n de pesaje, registrando el proceso con el `trace_id` asociado.
3.  **Base de Datos**: TypeORM traza el tiempo de ejecuciÃ³n de SQL usando spans de telemetrÃ­a de base de datos.
4.  **Entrega AsÃ­ncrona**: El `ContainerWeighedEvent` se publica al Outbox llevando el `trace_id` en su cabecera.
5.  **Suscriptor Aguas Abajo**: El MÃ³dulo de Aduanas consume el evento, extrae el `trace_id`, y valida el peso del contenedor contra SUNAT, manteniendo una traza Ãºnica y continua a travÃ©s de todas las operaciones asÃ­ncronas.

---

## ðŸ’° 4. Herramientas de MonitorizaciÃ³n y Dimensionamiento de Costos
Al utilizar el **Stack LGTM de Grafana** de cÃ³digo abierto, la empresa minimiza los costos de licencia en comparaciÃ³n con herramientas propietarias (ej. Datadog, Dynatrace) garantizando al mismo tiempo una telemetrÃ­a de alta escala y estÃ¡ndar de la industria:
*   **Almacenamiento Loki**: El almacenamiento de logs compacto y libre de Ã­ndices reduce drÃ¡sticamente los costos de almacenamiento de disco en la nube.
*   **HÃ­brido Autohospedado/Gestionado**: El desarrollo local corre en Docker-compose LGTM; la producciÃ³n se despliega en Grafana Cloud gestionado o configuraciones autohospedadas de Kubernetes para privacidad absoluta de datos y cumplimiento de datos soberanos.

---
[? Volver al Índice](./README.es.md)
