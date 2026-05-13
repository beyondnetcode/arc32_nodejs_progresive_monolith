# [ADR 0019](0019-tactical-design-patterns-future-proofing.md): Patrones de DiseÃ±o TÃ¡ctico para Blindaje a Futuro

## Estado
Aprobado

## Fecha
2026-05-08

## Contexto
El acoplamiento estrecho entre controladores de dominio e infraestructura (como lanzar una `HttpException` dentro de un servicio de base de datos) destruye la reutilizaciÃ³n del cÃ³digo. Necesitamos modismos fundacionales que aseguren que la lÃ³gica de dominio fluye limpiamente de forma independiente de los transportes de red o los manejadores de fallos.

## DecisiÃ³n
Imponer patrones Funcionales y de Estructura especÃ­ficos que protejan la pureza core:

1. **El PatrÃ³n Result**: Eliminar el lanzamiento de errores en bruto (raw error throwing) desde el interior de los casos de uso de la aplicaciÃ³n. Los mÃ©todos devuelven estrictamente un envoltorio funcional tipado `Result<V, E>`. Los adaptadores externos (ej. Controlador HTTP) interrogan `result.isFailure()` y mapean los errores de dominio a errores de transporte (ej. 404).
2. **EvitaciÃ³n del Null Object**: Prohibir el uso estÃ¡ndar de `null` para resultados lÃ³gicos comunes. Devolver objetos vacÃ­os semÃ¡nticos fuertemente tipados o representaciones `Optional` para forzar la verificaciÃ³n del manejo de nulos por parte del cliente.
3. **SeparaciÃ³n de LÃ­mites mediante Decoradores**: Descargar filtros transversales globales (mÃ©tricas, rastreo, registro) en Decoradores de mÃ©todos transparentes de Typescript en la puerta de entrada, previniendo el envenenamiento de telemetrÃ­a del cÃ³digo del algoritmo real.
4. **PatrÃ³n Unit of Work**: Todas las mutaciones de estado de la base de datos dentro de una sola transacciÃ³n de Caso de Uso de AplicaciÃ³n deben operar bajo un contexto atÃ³mico `IUnitOfWork`. Esto garantiza que mÃºltiples actualizaciones de repositorio y efectos secundarios (como inserciones de registros de auditorÃ­a) se confirmen exitosamente juntos como una Ãºnica transacciÃ³n o se reviertan totalmente ante cualquier fallo intermediario, preservando estados agregados consistentes.

## Consecuencias

### Positivas
- Garantiza transiciones impecables a transportes alternativos (gRPC, MessageBus) requiriendo cero ediciones dentro de los mÃ³dulos de lÃ³gica.
- Los vectores de error fuertemente tipados producen pistas de seguridad autodocumentadas.

### Negativas
- Introduce ruido verbal (comprobar booleanos de Ã©xito) para desarrolladores habituados a cascadas no estructuradas de try/catch.

## Referencias
- [GuÃ­a del PatrÃ³n Result](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/functional-error-handling-design-patterns/)
- [ADR-0029: Primitivas DDD TÃ¡cticas](../adrs/nodejs/0029-tactical-ddd-primitives-library.md)

---
[? Volver al Índice](./README.es.md)
