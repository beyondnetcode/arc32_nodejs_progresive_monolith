# [ADR 0036](0036-message-bus-delivery-strategy-fifo-dlq.md): Estrategia de Entrega y Control de Flujo del Bus de Mensajes

## Estado
Aprobado

## Fecha
2026-05-11

## Contexto
Las arquitecturas asÃ­ncronas dirigidas por eventos requieren diversas garantÃ­as de comunicaciÃ³n dependiendo de la criticidad y naturaleza de la carga Ãºtil. Aplicar ciegamente el orden estricto (FIFO) en todas partes degrada el rendimiento masivamente, mientras que aplicar el estÃ¡ndar "fuego y olvido" sin respaldo conduce a la pÃ©rdida de datos en flujos financieros crÃ­ticos. Requerimos reglas canÃ³nicas que especifiquen quÃ© modo de entrega de mensajerÃ­a DEBE aplicarse por tipo de transacciÃ³n.

## DecisiÃ³n
Adoptar el siguiente **Marco de DecisiÃ³n de Entrega de Eventos** mapeando el contexto de negocio a los comportamientos de la cola de infraestructura:

### 1. Modo: "Fuego y Olvido" (Standard Fan-out / Topic)
*   **DefiniciÃ³n**: Procesamiento asÃ­ncrono sin garantÃ­a de orden, mÃ¡ximo paralelismo horizontal de consumidores.
*   **Puntos de inflexiÃ³n / CuÃ¡ndo Usar**:
    *   MÃ©tricas, rastreo y logs de alto volumen.
    *   Efectos secundarios secundarios que no impactan el flujo de negocio core inmediato (ej. envÃ­o de notificaciones por email, invalidaciÃ³n de cachÃ© cÃ¡lido).
    *   SincronizaciÃ³n de datos donde los mensajes mÃ¡s nuevos contienen nativamente sobrescrituras totales del estado.
*   **Compromiso**: MÃ¡ximo rendimiento. Potencial ejecuciÃ³n fuera de orden.

### 2. Modo: "Orden FIFO Estricto" (Secuencia Garantizada)
*   **DefiniciÃ³n**: Procesamiento estrictamente en el orden recibido, vinculado a una clave de particiÃ³n (ej. `AggregateId`).
*   **Puntos de inflexiÃ³n / CuÃ¡ndo Usar**:
    *   **Contabilidad Transaccional**: Secuencias de entrada del libro mayor (el dÃ©bito debe completarse antes de la lÃ³gica de comprobaciÃ³n de balance).
    *   **Bloqueo de Inventario**: Operaciones consecutivas de decremento/incremento de stock.
    *   **Transiciones de MÃ¡quina de Estados**: Flujos de trabajo de negocio secuenciales de mÃºltiples pasos donde el Paso 3 colapsa si el Paso 2 no se ha confirmado.
*   **Barandilla de ImplementaciÃ³n**: Las colas FIFO restringen la concurrencia a un Ãºnico consumidor por fragmento/particiÃ³n. Utilizado quirÃºrgicamente solo donde la corrupciÃ³n de datos ocurrirÃ­a sin ello.

### 3. PolÃ­tica Global: "Dead Letter Queues (DLQ)" y Defensa contra la PÃ­ldora Venenosa
*   **PolÃ­tica**: OBLIGATORIA para cada cola del dominio de negocio.
*   **Puntos de inflexiÃ³n / ConfiguraciÃ³n**:
    *   Todos los errores del consumidor disparan un **Mecanismo de Reintento** local con backoff exponencial (MÃ¡ximo 3 Intentos).
    *   Tras el 4Âº fallo consecutivo (PÃ­ldora Venenosa), el mensaje DEBE ser re-enrutado automÃ¡ticamente a un contenedor de retenciÃ³n `.{nombre_de_cola}.dlq`.
    *   Previene que un solo JSON corrupto / punto de lÃ³gica con bugs bloquee infinitamente toda la pipeline principal.
*   **AcciÃ³n Requerida**: Establecer alertas automatizadas cuando el tamaÃ±o de la DLQ > 0. El personal de soporte debe inspeccionar y re-lanzar (Re-Drive / Retry) o Archivar los paquetes corruptos.

### 4. Modo: "Entrega Retrasada / Programada"
*   **DefiniciÃ³n**: Mensajes empujados al brÃ³ker con una Cabecera de retraso obligatoria, haciÃ©ndolos invisibles para los consumidores hasta el momento designado.
*   **Puntos de inflexiÃ³n**:
    *   **Timeouts de Negocio**: "Si el Pedido no se paga en 30 minutos, disparar la comprobaciÃ³n de cancelaciÃ³n".
    *   **Recordatorios Estrangulados**: Empujar un email de notificaciÃ³n destinado para maÃ±ana a las 8:00 AM sin usar cronjobs del sistema.
*   **Mecanismo**: Depende de plugins de exchanges retrasados nativos del BrÃ³ker o bucles de enrutamiento TTL + DLX.

### 5. Escalonamiento de Rendimiento: "Colas de Prioridad"
*   **DefiniciÃ³n**: PonderaciÃ³n numÃ©rica de los mensajes que permite a los paquetes de alta prioridad saltarse los paquetes no crÃ­ticos que esperan en la cola.
*   **Puntos de inflexiÃ³n**:
    *   **SLAs de Nivel de Cliente**: Acelerar las peticiones de usuarios VIP durante rÃ¡fagas de alto volumen de trÃ¡fico.
    *   **SeÃ±ales de Emergencia**: Revocaciones administrativas crÃ­ticas que se saltan el flujo estÃ¡ndar de telemetrÃ­a de auditorÃ­a.
*   **Regla**: No sobre-utilizar (mÃ¡x. 3-5 niveles), ya que puede ocurrir una inaniciÃ³n infinita de bajo nivel.

### 6. Regla de Arquitectura: "Mandato de Consumidor Idempotente"
*   **Regla**: TODA consumiciÃ³n de mensajes DEBE asumir una semÃ¡ntica de "Entrega Al Menos Una Vez".
*   **Requisito**: La aplicaciÃ³n Consumidora debe registrar las claves `MessageId` procesadas (en Redis o BD) y comprobar su existencia ANTES de proceder con la lÃ³gica interna. Si el `MessageId` ya fue procesado, DEBE ser instantÃ¡neamente confirmado (ACK) y descartado como un duplicado SIN efectos secundarios.

## Consecuencias

### Positivas
- Elimina el cuello de botella comÃºn del bloqueo excesivo de colas globales.
- Garantiza cero pÃ©rdida de datos para eventos crÃ­ticos a travÃ©s de la cuarentena DLQ garantizada.
- Protege el rendimiento del sistema manteniendo la consistencia estricta exactamente donde se necesita.

### Negativas
- Los equipos deben clasificar intencionalmente cada nuevo tipo de evento durante la revisiÃ³n del diseÃ±o.
- FIFO requiere atenciÃ³n al diseÃ±o de la clave de particiÃ³n dentro de los adaptadores Productores.

## Referencias
- [RabbitMQ Dead Letter Exchanges](https://www.rabbitmq.com/dlx.html)
- [ADR-0015: Mecanismo de Bus de Eventos Inyectable](./0015-event-driven-decoupled-architecture.md)
- [ADR-0033: PatrÃ³n Transactional Outbox](../adrs/core/0033-transactional-outbox-pattern.md)

---
[? Volver al Índice](./README.es.md)
