# [ADR 0043](0043-data-access-orm-strategy.md): Estrategia de Acceso a Datos y ORM para Node.js

## Estado
Aprobado

## Fecha
2026-05-12

## Contexto
La plataforma ARC32 requiere una estrategia de acceso a datos unificada, mantenible y de alto rendimiento a travÃ©s de sus mÃ³dulos de monolito progresivo. Operamos en un entorno de base de datos heterogÃ©neo (principalmente PostgreSQL para lÃ³gica transaccional, potencialmente MongoDB para almacenamiento de documentos/proyecciones). Necesitamos seleccionar el ecosistema base de Mapeo Objeto-Relacional (ORM) y Mapeo Objeto-Documento (ODM) que equilibre la productividad del desarrollador (DX), caracterÃ­sticas empresariales (migraciones, multi-inquilino) y la alineaciÃ³n con nuestras restricciones de Arquitectura Hexagonal (desacoplamiento del dominio de la infraestructura).

## Drivers ArquitectÃ³nicos
- **Desacoplamiento**: SeparaciÃ³n estricta entre Entidades de Dominio y Modelos de Persistencia (en apoyo al [ADR 0002](0002-clean-architecture-nestjs.md)).
- **Multi-Tenancy**: Soporte nativo o fÃ¡cilmente integrable para estrategias de aislamiento (separaciÃ³n por Esquema/Base de Datos, alineado con el [ADR 0010](../core/0010-multi-tenancy-architecture-strategy.md)).
- **Seguridad de Tipos**: Inferencia de TypeScript de extremo a extremo para reducir errores de consulta en tiempo de ejecuciÃ³n.
- **GestiÃ³n de Migraciones**: Ciclo de vida robusto e integrable en CI/CD para operaciones DDL.
- **Sobrecarga de Rendimiento**: MÃ­nima, con mecanismos claros de escape para SQL nativo cuando sea necesario.

## Criterios de EvaluaciÃ³n y Candidatos

| TecnologÃ­a | CategorÃ­a | Ventajas | Desventajas | AdecuaciÃ³n |
|------------|-----------|----------|-------------|------------|
| **TypeORM** | RDBMS ORM | Soporte nativo de NestJS, patrÃ³n Data Mapper, excelente soporte de decoradores, ecosistema empresarial activo. | Puede generar consultas complejas, Data Mapper requiere disciplina para evitar atajos de Active Record. | **Alta** (Principal SQL) |
| **Prisma** | RDBMS ORM | Excelente DX, cliente autogenerado, DSL de esquema muy intuitivo. | Complejidad en despliegue del motor Rust, esquema rÃ­gido dificulta separaciÃ³n Hexagonal (genera modelos monolÃ­ticos), soporte dÃ©bil para cambio dinÃ¡mico de esquemas multi-inquilino. | Media (Casos puntuales) |
| **MikroORM** | RDBMS ORM | PatrÃ³n Unit of Work, excelente alineaciÃ³n con Clean Architecture, maneja referencias cÃ­clicas de forma nativa. | Ecosistema mÃ¡s pequeÃ±o que TypeORM, mayor curva de aprendizaje. | Alta (Alternativa SQL) |
| **Knex.js** | Query Builder | Ligero, control total sobre SQL, fÃ¡cil de optimizar rendimiento. | Sin gestiÃ³n de relaciones, mapeo manual a objetos de dominio consume mucho tiempo. | Alta (Rendimiento/AnalÃ­tica) |
| **Mongoose** | NoSQL ODM | EstÃ¡ndar de facto para MongoDB, buena validaciÃ³n de esquemas, lÃ³gica de poblaciÃ³n robusta. | Pesado, fomenta acoplamiento estrecho a los esquemas de Mongo. | **Alta** (Principal NoSQL) |

## DecisiÃ³n

### 1. Persistencia Relacional Principal (RDBMS): **TypeORM**
Adoptar **TypeORM** utilizando el patrÃ³n **Data Mapper** como el estÃ¡ndar corporativo para bases de datos relacionales (PostgreSQL).
- **JustificaciÃ³n**: Completamente alineado con nuestra Arquitectura Hexagonal ([ADR 0002](0002-clean-architecture-nestjs.md)). Permite la definiciÃ³n distinta de la Entidad en el Core separada de los Modelos de Persistencia `@Entity` en Infraestructura. Posee la integraciÃ³n mÃ¡s fuerte con `TypeOrmModule` de NestJS.
- **RestricciÃ³n**: El patrÃ³n "Active Record" estÃ¡ estrictamente PROHIBIDO. Todo acceso debe pasar a travÃ©s de Repositorios inyectados en la capa de infraestructura.

### 2. Persistencia No Relacional Principal (NoSQL): **Mongoose**
Para casos de uso orientados a documentos (agregaciones, colecciones de auditorÃ­a, modelos de lectura de proyecciones), **Mongoose** es el ODM estÃ¡ndar.

### 3. Mecanismo de Escape y Consultas de Alto Rendimiento: **SQL Nativo / Knex**
Para reportes analÃ­ticos, JOINs complejos que causen degradaciÃ³n del rendimiento del ORM, u operaciones masivas, se permite a los desarrolladores omitir el ORM utilizando la capacidad `query()` a nivel de driver o un Constructor de Consultas ligero (Knex), siempre que se mantenga oculto detrÃ¡s de la interfaz del Repositorio de Core.

## Implicaciones de DiseÃ±o

### Soporte Multi-Tenancy
El soporte de TypeORM para la clonaciÃ³n de conexiones y la anulaciÃ³n dinÃ¡mica de `schema` durante las peticiones se alinea con nuestra estrategia de aislamiento basada en RLS/Esquema ([ADR 0010](../core/0010-multi-tenancy-architecture-strategy.md)). Usar `nestjs-cls` para inyectar el contexto del inquilino en la capa de datos de forma dinÃ¡mica.

### Migraciones
Las migraciones deben escribirse explÃ­citamente a travÃ©s de archivos TypeScript generados por el CLI de TypeORM. La sincronizaciÃ³n automÃ¡tica de esquemas (`synchronize: true`) estÃ¡ PROHIBIDA en entornos de producciÃ³n.

## Consecuencias

### Positivas
- **Consistencia**: El estÃ¡ndar Ãºnico reduce la carga cognitiva de incorporaciÃ³n.
- **Flexibilidad**: Ruta de migraciÃ³n clara hacia otros drivers mediante la abstracciÃ³n del Repositorio.
- **Mantenibilidad**: Migraciones gestionadas en el control de versiones junto con el cÃ³digo.

### Negativas
- **Boilerplate**: Requiere cÃ³digo de mapeo personalizado de Modelos de persistencia a Entidades de Dominio.
- **Complejidad**: Se requiere gestiÃ³n dinÃ¡mica de conexiones para el enrutamiento dinÃ¡mico de mÃºltiples inquilinos.

## Riesgos y MitigaciÃ³n
- **Problema de Consultas N+1**: MitigaciÃ³n mediante reglas de ESLint para relaciones y monitoreo estricto de revisiÃ³n de cÃ³digo de las relaciones obtenidas.
- **Dependencia del Proveedor (Lock-in)**: MitigaciÃ³n a travÃ©s de la estricta adherencia a interfaces en la capa de Dominio (Puertos).

## Referencias
- [ADR-0002: Arquitectura Hexagonal Limpia con NestJS](../adrs/nodejs/0002-clean-architecture-nestjs.md)
- [ADR-0010: Estrategia de Arquitectura Multi-Tenancy](../adrs/core/0010-multi-tenancy-architecture-strategy.md)
- [ADR-0029: Primitivas DDD TÃ¡cticas](../adrs/nodejs/0029-tactical-ddd-primitives-library.md)

---
[? Volver al Índice](./README.es.md)
