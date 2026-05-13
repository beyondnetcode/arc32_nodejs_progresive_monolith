# [ADR 0037](0037-performance-concurrency-chaos-strategy.md): Estrategia Empresarial de VerificaciÃ³n de Rendimiento, Concurrencia y Caos

## Estado
Aprobado

## Fecha
2026-05-11

## Contexto
Las pruebas funcionales estÃ¡ndar (Unit/E2E) verifican que el cÃ³digo se comporta correctamente bajo condiciones ideales y de un solo usuario. Fallan completamente al predecir el comportamiento del sistema bajo concurrencia extrema, alta latencia de red o condiciones de fallo parcial. Para garantizar la escalabilidad futura y la seguridad absoluta en producciÃ³n, requerimos un marco de verificaciÃ³n obligatorio definido conjuntamente por Arquitectura, QA y gestiÃ³n de Producto.

## DecisiÃ³n
Establecer el **Marco de VerificaciÃ³n EstratÃ©gica** para rendimiento, carga y resiliencia operativa:

### 1. Arsenal de Herramientas
*   **Pruebas de Carga y Rendimiento**: **k6** (Grafana). Obligatorio debido a sus scripts nativos en TypeScript, baja huella y profunda integraciÃ³n con mÃ©tricas de rastreo OTel.
*   **Pruebas de Contrato**: **Pact JS**. Usado para verificar cargas Ãºtiles de gRPC y Eventos entre productores/consumidores antes del despliegue.
*   **Caos Operativo**: **Chaos Mesh / Litmus**. Terminar pods periÃ³dicamente o inducir retrasos de red en entornos de staging.

### 2. Escenarios de EstrÃ©s HipotÃ©ticos (VerificaciÃ³n Obligatoria)
Producto y Arquitectura requieren pruebas contra los siguientes flujos extremos hipotÃ©ticos:

#### Escenario A: "La Carrera de Hiper-Contienda"
*   **Concepto**: 5,000 Usuarios Virtuales intentan comprar exactamente las Ãºltimas 5 unidades disponibles de un artÃ­culo de inventario simultÃ¡neamente (ventana de 100ms).
*   **Meta de VerificaciÃ³n**: La BD previene la sobreventa a travÃ©s de Bloqueo de Filas / Unit of Work, y el Circuit Breaker se dispara grÃ¡cilmente si la contienda de bloqueos detiene los hilos locales. Cero inventario negativo.
*   **MÃ©trica**: Tasa de Ã©xito respuesta < 500ms @ percentil 95.

#### Escenario B: "El Gateway Envenenado (InyecciÃ³n de Latencia)"
*   **Concepto**: Utilizando Chaos Mesh, inyectar 5 segundos de retraso artificial en todas las respuestas del endpoint externo de la API de Banca/Aduanas.
*   **Meta de VerificaciÃ³n**: Confirmar que los Circuit Breakers Distribuidos ([ADR-0011](0011-fault-tolerance-resiliency-patterns.md)) se disparan globalmente en 3 segundos, recurriendo al estado cacheado o mensajes amigables para el usuario sin propagar fallos en cascada a servicios de la app no relacionados.

#### Escenario C: "El ApagÃ³n LogÃ­stico"
*   **Concepto**: Desconectar el contenedor de RabbitMQ por completo mientras se empujan 1,000 transacciones por segundo a la BD.
*   **Meta de VerificaciÃ³n**: La **Outbox Transaccional ([ADR-0033](0033-transactional-outbox-pattern.md))** registra todos los eventos en PostgreSQL. Una vez reconectado, verificar una reproducciÃ³n de consumiciÃ³n con 100% cero pÃ©rdida y sin ejecuciÃ³n de lÃ³gica duplicada.

### 3. Puertas de VerificaciÃ³n Obligatorias
- **InstantÃ¡neas de LÃ­nea Base**: Pruebas de carga semanales con K6 contra el entorno de staging para detectar regresiones de latencia > 10% comparado con la semana anterior.
- **Pruebas de Contrato en CI**: Cualquier modificaciÃ³n de `.proto` de gRPC dispara la verificaciÃ³n PACT aguas abajo automÃ¡ticamente. El fallo detiene la construcciÃ³n.

## Consecuencias

### Positivas
- Demuestra matemÃ¡ticamente que el sistema puede escalar antes de que llegue el trÃ¡fico real.
- Establece puntos de referencia (benchmarks) empÃ­ricos inmutables para los SLAs del sistema.
- Protege la experiencia del usuario contra condiciones de carrera ocultas y deadlocks.

### Negativas
- El scripting de rendimiento requiere conjuntos de habilidades especializadas de QA.
- Requiere entornos de Staging aislados y persistentes configurados para imitar tamaÃ±os de infraestructura de producciÃ³n 1:1 para obtener datos de referencia confiables.

## Referencias
- [DocumentaciÃ³n de Grafana k6](https://k6.io/docs/)
- [Pact.io - Contratos Dirigidos por el Consumidor](https://docs.pact.io/)
- [ADR-0011: Circuit Breakers Distribuidos](../adrs/core/0011-fault-tolerance-resiliency-patterns.md)
- [ADR-0033: Outbox Transaccional](../adrs/core/0033-transactional-outbox-pattern.md)

---
[? Volver al Índice](./README.es.md)
