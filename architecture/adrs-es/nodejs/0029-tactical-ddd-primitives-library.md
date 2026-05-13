# [ADR 0029](0029-tactical-ddd-primitives-library.md): AdopciÃ³n de LibrerÃ­a de Primitivas DDD TÃ¡cticas

## Estado
Aprobado

## Fecha
2026-05-09

## Contexto
Elaborar una lÃ³gica core Hexagonal robusta invita al desarrollo repetitivo y cargado de cÃ³digo repetitivo (boilerplate). Crear mÃ©todos base de comparaciÃ³n para IDs, identidad estructural para Objetos de Valor, y recolectar Eventos de Dominio en memoria dentro de RaÃ­ces de Agregado resulta en miles de lÃ­neas de utilidades duplicadas. Requerimos primitivas estandarizadas de TypeScript puro sin romper los lÃ­mites Hexagonales.

## DecisiÃ³n
Estandarizar la utilizaciÃ³n del ecosistema de primitivas **`@nestjslatam/ddd`** dentro de los dominios centrales para acelerar la velocidad:

1. **Solo Typescript Puro**: AdhiriÃ©ndose a las restricciones de pureza del core, este paquete especÃ­fico tiene 0 dependencias NPM externas, haciÃ©ndolo totalmente seguro para su colocaciÃ³n directamente en la capa mÃ¡s interna del Dominio.
2. **Clases TÃ¡cticas**: Desplegar implementaciones padre estÃ¡ndar de `AggregateRoot`, `Entity<T>`, `ValueObject`, y definiciones nativas de `DomainEvent`.
3. **Barrera de Barrel Local**: Para prevenir el bloqueo a largo plazo de la librerÃ­a, los desarrolladores importan y re-exportan estos tipos vÃ­a un archivo proxy de librerÃ­a compartida local. El cÃ³digo de negocio importa desde rutas locales, permitiendo futuros reemplazos directos sin ediciones generalizadas.

## Restricciones
- **RestricciÃ³n Readonly**: Todas las propiedades mapeadas a clases de extensiÃ³n de `ValueObject` DEBEN permanecer inmutables con `readonly`.
- **Cero contaminaciÃ³n de ORM**: Prohibido explÃ­citamente utilizar decoradores relacionales (`@Entity`, `@Column`) dentro del cÃ³digo que extiende primitivas DDD. Las reglas de dominio permanecen puras; los mapas SQL permanecen fuera en Infraestructura.

## Consecuencias

### Positivas
- Tritura el pesado cÃ³digo repetitivo de rutina.
- Establece una vernÃ¡cula de codificaciÃ³n uniforme a travÃ©s de mÃºltiples equipos de backend distribuidos instantÃ¡neamente.

### Negativas
- Introduce otra dependencia interna superficial. (Mitigado limpiamente vÃ­a la abstracciÃ³n de Barrel).

## Referencias
- [ADR-0002: Arquitectura Hexagonal](../adrs/nodejs/0002-clean-architecture-nestjs.md)
- [documentaciÃ³n de @nestjslatam/ddd](https://github.com/nestjslatam/ddd)

---
[? Volver al Índice](./README.es.md)
