# [ADR 0002](0002-clean-architecture-nestjs.md): Arquitectura Hexagonal Limpia con NestJS

## Estado
Aprobado

## Fecha
2026-05-08

## Contexto
Los tutoriales estÃ¡ndar de NestJS fomentan la colocaciÃ³n de la lÃ³gica de negocio directamente dentro de servicios decorados con `@Injectable()`, creando un acoplamiento estrecho entre el dominio y el framework. Esto hace que la base de cÃ³digo sea difÃ­cil de probar (requiere el bootstrapping del mÃ³dulo de pruebas de NestJS incluso para lÃ³gica de negocio pura) e imposible de migrar a un framework diferente sin una reescritura total.

## DecisiÃ³n
Adoptar la **Arquitectura Hexagonal (Puertos y Adaptadores)** como el patrÃ³n estructural obligatorio para todas las aplicaciones NestJS en este monorepo.

La arquitectura se divide en tres capas explÃ­citas:

1. **Core (Dominio)** â€” Clases de TypeScript puras. Cero importaciones de NestJS, TypeORM, o cualquier SDK externo. Contiene entidades, objetos de valor (value objects), e interfaces de puertos (`IUserRepository`, `IPasswordHasher`).
2. **AplicaciÃ³n** â€” Clases de caso de uso (Use-case) que orquestan la lÃ³gica del Core. Pueden importar NestJS solo para decoradores de DI (`@Injectable`). Sin importaciones de infraestructura.
3. **Infraestructura (Adaptadores)** â€” Implementaciones concretas de los puertos del Core (`TypeOrmUserRepository`, `BcryptPasswordHasher`). Todas las importaciones del framework y del SDK residen aquÃ­.

La direcciÃ³n de dependencia se impone estrictamente: Infraestructura -> AplicaciÃ³n -> Core. Nunca a la inversa.

### 4. Aislamiento de ProgramaciÃ³n Orientada a Aspectos (AOP)
Las preocupaciones transversales (Registro, AuditorÃ­a, Rastreo Distribuido, Almacenamiento en CachÃ©, GestiÃ³n de Transacciones) NUNCA deben acoplar rÃ­gidamente decoradores de librerÃ­as de terceros o SDKs dentro de las capas Core o de AplicaciÃ³n.
- **Prohibido**: Inyectar `@SentryCapture`, `@OpentelemetrySpan`, o `@Cacheable` directamente en los mÃ©todos de UseCase.
- **Permitido**: Encapsular las preocupaciones AOP dentro de **Interceptores, Middleware, o Envoltorios Decoradores de NestJS que residan exclusivamente en la capa Adaptador/Infraestructura**, envolviendo limpiamente la ejecuciÃ³n pura de UseCase desde el exterior.

## Consecuencias

### Positivas
- Las pruebas de dominio puro corren en milisegundos sin configuraciÃ³n de base de datos o framework.
- Toda la capa Core puede ser extraÃ­da y reutilizada en un framework diferente (Fastify, Express) con cero cambios.
- `eslint-plugin-boundaries` puede imponer estÃ¡ticamente la direcciÃ³n de dependencia en CI.

### Negativas
- Requiere cÃ³digo de mapeo adicional (Entidad -> Modelo ORM) en la capa de infraestructura.
- Curva de aprendizaje mÃ¡s pronunciada para desarrolladores acostumbrados al patrÃ³n de servicio estÃ¡ndar de NestJS.

## Referencias
- [ADR-0003: EstÃ¡ndares Estrictos de TypeScript](../adrs/nodejs/0003-strict-typescript-standards.md)
- [ADR-0029: Primitivas DDD TÃ¡cticas](../adrs/nodejs/0029-tactical-ddd-primitives-library.md)
- [EspecificaciÃ³n de Arquitectura â€” Diagrama de Componentes de Nivel 3](../../architecture/c4-topology-spec.md)

---
[? Volver al Índice](./README.es.md)
