# [ADR 0015](0015-event-driven-architecture-intra-domain.md): Arquitectura Dirigida por Eventos (EDA) para la ComunicaciÃ³n Intra-Dominio

## Estado
Aprobado

## Fecha
2026-05-08

## Actualizado
2026-05-11 â€” Se aÃ±adiÃ³ referencia al CatÃ¡logo de Eventos de Dominio [ADR-0031](0031-schema-per-context-domain-event-catalog.md). Las definiciones de eventos y el mapa de suscripciÃ³n entre contextos estÃ¡n ahora formalmente especificados en ese registro.

## Contexto
A medida que el Monolito Modular crece, permitir que los contextos delimitados se llamen entre sÃ­ de forma sÃ­ncrona crea un acoplamiento estrecho. Si un contexto es lento o falla, no deberÃ­a propagar fallos en cascada hacia otros contextos. Adicionalmente, la comunicaciÃ³n entre contextos debe definirse como contratos tipados explÃ­citos para permitir una extracciÃ³n futura segura a microservicios ([ADR-0006](0006-future-microservices-transition-dapr.md)).

## DecisiÃ³n

Adoptaremos una **Arquitectura Dirigida por Eventos (EDA)** asÃ­ncrona para toda la comunicaciÃ³n entre contextos delimitados:

### 1. Bus de Eventos Inyectable (`IEventBusPort`)
El dominio nunca importarÃ¡ un brÃ³ker de mensajes concreto. Toda la comunicaciÃ³n asÃ­ncrona se enruta a travÃ©s de un puerto TypeScript puro:

```typescript
export interface IEventBusPort {
  publish<T extends DomainEvent>(event: T): Promise<void>;
  subscribe<T extends DomainEvent>(
    eventClass: new (...args: any[]) => T,
    handler: (event: T) => Promise<void>,
  ): void;
}
```

La implementaciÃ³n concreta se inyecta por el contenedor DI de NestJS en el arranque vÃ­a una variable de entorno:

| `EVENT_BUS_IMPL` | ImplementaciÃ³n | Uso |
| :--- | :--- | :--- |
| `in-memory` | `EventEmitter2` de NestJS | Desarrollo / Pruebas |
| `rabbitmq` | RabbitMQ vÃ­a `@golevelup/nestjs-rabbitmq` | ProducciÃ³n |
| `kafka` | Kafka vÃ­a `kafkajs` | Escenarios de alta escala |

### 2. Eventos de Dominio como Contratos entre Contextos
Cada evento que cruza un lÃ­mite de contexto delimitado debe ser una clase tipada con un `eventId` (UUID para idempotencia) y una marca de tiempo `occurredAt`. El catÃ¡logo completo aprobado de eventos entre contextos se define en:

ðŸ“œ **[ADR-0031: CatÃ¡logo de Eventos de Dominio](../adrs/core/0031-schema-per-context-domain-event-catalog.md)**

### 3. Eventos Intra-Contexto (Internos) vs Eventos Entre-Contextos
- **Eventos Intra-contexto** (dentro del mismo contexto delimitado): Pueden usar emisores de eventos de NestJS sÃ­ncronos sin restricciones de esquema.
- **Eventos Entre-contextos** (cruzando lÃ­mites de contexto delimitado): DEBEN usar `IEventBusPort` y DEBEN ajustarse a las definiciones de carga Ãºtil tipada en el [ADR-0031](0031-schema-per-context-domain-event-catalog.md).

### 4. PreparaciÃ³n para Futuros Microservicios ([ADR-0006](0006-future-microservices-transition-dapr.md))
Cuando un contexto delimitado sea extraÃ­do a un microservicio independiente:
- Se reemplaza la implementaciÃ³n del bus `in-memory` con `rabbitmq` o `kafka` â€” **cero cambios de cÃ³digo en el dominio requeridos**.
- La abstracciÃ³n `IEventBusPort` garantiza que el dominio permanezca agnÃ³stico a la capa de transporte.

## Consecuencias
* **Positivas**: Alto desacoplamiento, aislamiento de fallos, contratos de integraciÃ³n explÃ­citos, ruta fluida de transiciÃ³n a microservicios.
* **Negativas**: Se debe abrazar la consistencia eventual a travÃ©s de los contextos. Se requiere trazado distribuido ([ADR-0007](../nodejs/0007-observability-telemetry-loki-opentelemetry.md)) para seguir los flujos de eventos a travÃ©s de los lÃ­mites de los contextos.

## Referencias
- [ADR-0006: Futuros Microservicios vÃ­a Dapr](../adrs/core/0006-future-microservices-transition-dapr.md)
- [ADR-0007: Observabilidad con OpenTelemetry](../adrs/nodejs/0007-observability-telemetry-loki-opentelemetry.md)
- [ADR-0031: Esquema por Contexto y CatÃ¡logo de Eventos de Dominio](../adrs/core/0031-schema-per-context-domain-event-catalog.md)

---
[? Volver al Índice](./README.es.md)
