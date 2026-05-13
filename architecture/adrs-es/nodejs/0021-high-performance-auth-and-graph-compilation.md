# [ADR 0021](0021-high-performance-auth-and-graph-compilation.md): CompilaciÃ³n de Grafos de AutorizaciÃ³n de Alto Rendimiento

## Estado
Aprobado

## Fecha
2026-05-08

## Contexto
Los procesos de inicio de sesiÃ³n generan la huella de carga inicial mÃ¡s pesada en absoluto. Atravesar roles anidados recursivos dinÃ¡micos, generar matrices de menÃºs dinÃ¡micas y filtrar capacidades multi-tenant directamente desde las tablas SQL en cada transacciÃ³n genera latencias insoportables y mata el rendimiento total del gateway.

## DecisiÃ³n
Estandarizar los gateways de inicio de sesiÃ³n de autenticaciÃ³n para producir **Grafos de AutorizaciÃ³n JerÃ¡rquicos** ligeros y predigeridos, impulsados vÃ­a cachÃ©s secundarias en memoria distribuida:

1. **Firma Sin Estado**: La verificaciÃ³n de legitimidad de la sesiÃ³n continÃºa sobre la validaciÃ³n de Token RS256 asimÃ©trica, rotada dinÃ¡micamente (RTR).
2. **Grafado Agregado**: En lugar de unir repetidamente tablas relacionales, resolver la totalidad de los mapeos de `Rol -> Sistema -> MenÃº -> SubmenÃº -> AcciÃ³n` una vez.
3. **RÃ¡faga de Memoria Read-Aside**: Serializar esta estructura de grafo directamente en Redis, particionada por claves de contexto de usuario e inquilino. Mantener la resoluciÃ³n de autorizaciÃ³n de acceso general bajo los **benchmarks fÃ­sicos de <5ms**.
4. **Superioridad de DenegaciÃ³n ExplÃ­cita**: Codificar la precedencia de reglas de tal manera que las anulaciones locales (`DENY`/Denegar) superen explÃ­citamente las estructuras permisivas generales (`ALLOW`/Permitir) independientemente de la posiciÃ³n en la jerarquÃ­a.

## Consecuencias

### Positivas
- ReducciÃ³n dramÃ¡tica de la latencia. Logra el mÃ¡ximo rendimiento de densidad para los usuarios finales en mÃ³vil/web inmediatamente tras el apretÃ³n de manos.
- Escalabilidad lineal: Los gateways de autenticaciÃ³n pueden replicarse horizontalmente indefinidamente sin impactar la capacidad del disco SQL.

### Negativas
- Exige una rigurosa lÃ³gica de invalidaciÃ³n de cachÃ© de Redis explÃ­citamente vinculada a cualquier evento de escritura de gestiÃ³n de permisos.

## Referencias
- [ADR-0014: CachÃ© Redis](../adrs/core/0014-distributed-caching-strategy-redis.md)
- [ADR-0022: AutorizaciÃ³n Contextual](../adrs/nodejs/0022-contextual-auth-and-pluggable-projections.md)

---
[? Volver al Índice](./README.es.md)
