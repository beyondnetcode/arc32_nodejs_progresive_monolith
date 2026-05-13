# [ADR 0035](0035-distributed-saga-pattern-strategy.md): Estrategia de ImplementaciÃ³n del PatrÃ³n Distributed Saga

## Estado
Aprobado

## Fecha
2026-05-11

## Contexto
A medida que la plataforma evoluciona de un Monolito Modular hacia servicios distribuidos, las transacciones ACID distribuidas tradicionales **2PC (Two-Phase Commit)** se vuelven imposibles o degradan gravemente el rendimiento. Para garantizar la consistencia eventual de los datos a travÃ©s de los lÃ­mites de servicios desacoplados sin bloquear recursos, se requiere el **PatrÃ³n Saga**. Sin embargo, las Sagas introducen una sobrecarga de lÃ³gica de compensaciÃ³n que solo debe desplegarse cuando sea estrictamente necesario.

## DecisiÃ³n
Adoptar la siguiente matriz corporativa para definir la estrategia de implementaciÃ³n para transacciones de larga duraciÃ³n o multi-servicio:

### 1. La Regla de Local Primero
Antes de desplegar una Saga, verifica si el proceso de negocio puede ser contenido dentro de un **Ãšnico Contexto Delimitado**. Si es asÃ­, IMPONER el uso del **PatrÃ³n Unit of Work** ([ADR-0019](0019-tactical-design-patterns-future-proofing.md)) para ejecutar una transacciÃ³n ACID estÃ¡ndar localmente. Esto se prefiere el 100% de las veces.

### 2. Paso de EvoluciÃ³n: La CondiciÃ³n de Aplicabilidad de la Saga
Mandar una implementaciÃ³n de Saga ÃšNICAMENTE cuando:
1.  La transacciÃ³n deba abarcar **dos o mÃ¡s bases de datos de microservicios separadas** (Particionadas fÃ­sicamente segÃºn [ADR-0031](0031-schema-per-context-domain-event-catalog.md)).
2.  No se requiera consistencia inmediata, pero la **Consistencia Eventual Garantizada** sea obligatoria.
3.  Un fallo en el paso N requiera una **AcciÃ³n de Rollback/CompensaciÃ³n** explÃ­cita en el paso N-1.

### 3. Gobernanza del Estilo de ImplementaciÃ³n
*   **CoreografÃ­a (Saga Dirigida por Eventos)**: RecomendaciÃ³n estÃ¡ndar para cadenas cortas (2 a 3 pasos). Los servicios escuchan el Bus de Eventos ([ADR-0015](0015-event-driven-architecture-intra-domain.md)) y reaccionan directamente a los eventos de finalizaciÃ³n/fallo. Sin controlador central.
*   **OrquestaciÃ³n (Saga Dirigida por Comandos)**: RecomendaciÃ³n obligatoria para flujos de trabajo complejos (> 3 pasos). Requiere un componente Orquestador de Saga dedicado que gestione la ejecuciÃ³n del flujo de trabajo centralizado y emita comandos de compensaciÃ³n explÃ­citamente.

### 4. MecÃ¡nicas Obligatorias
Cualquier implementaciÃ³n de Saga DEBE implementar:
- **Consumidores Idempotentes**: Todos los pasos deben detectar e ignorar mensajes duplicados.
- **Transactional Outbox** ([ADR-0033](0033-transactional-outbox-pattern.md)): Para garantizar que el evento inicial de arranque nunca se pierda.

## Consecuencias

### Positivas
- Habilita operaciones distribuidas altamente resilientes a escala.
- Elimina el bloqueo de base de datos entre servicios y los riesgos de inaniciÃ³n (starvation).
- Proporciona un manejo estructurado para fallos de negocio parciales.

### Negativas
- Aumenta significativamente la complejidad debido a la lÃ³gica obligatoria de transacciones de "Deshacer" (CompensaciÃ³n).
- Depurar los flujos de trabajo entre servicios es mÃ¡s complejo, dependiendo en gran medida de la correlaciÃ³n unificada de trazas distribuidas ([ADR-0007](../nodejs/0007-observability-telemetry-loki-opentelemetry.md)).

## Referencias
- [PatrÃ³n de transacciones distribuidas Saga](https://learn.microsoft.com/es-es/azure/architecture/reference-architectures/saga/saga)
- [ADR-0033: PatrÃ³n Transactional Outbox](../adrs/core/0033-transactional-outbox-pattern.md)

---
[? Volver al Índice](./README.es.md)
