# [ADR 0010](0010-multi-tenancy-architecture-strategy.md): Estrategia de Arquitectura Multi-Tenancy para la EvoluciÃ³n SaaS

## Estado
Aprobado

## Fecha
2026-05-08

## Contexto
A medida que el sistema madura hacia una oferta SaaS, debemos aislar los datos de mÃºltiples inquilinos (tenants) de forma segura sin disparar las facturas de infraestructura cloud. Existen tres enfoques principales de particionado:
1. **Base de Datos por Inquilino**: MÃ¡ximo aislamiento, mÃ¡xima sobrecarga de costo operativo.
2. **Esquema por Inquilino**: SeparaciÃ³n lÃ³gica, pero gestiÃ³n de migraciones de esquema mÃ¡s difÃ­cil.
3. **Base de Datos Compartida (Pooled)**: Un solo espacio de tablas, IDs discriminadores, alta eficiencia pero potencial filtraciÃ³n de datos si los desarrolladores olvidan las clÃ¡usulas WHERE.

Necesitamos prevenciÃ³n absoluta de filtraciones junto con un escalado de recursos eficiente.

## DecisiÃ³n
Adoptar una **Estrategia Multi-Tenancy HÃ­brida "Pooled"** utilizando un **Marco de Aislamiento de Doble Capa obligatorio de "Defensa en Profundidad"**:

1. **Capa 1: Aislamiento a Nivel de AplicaciÃ³n (Primario - AgnÃ³stico al Motor)**:
   La capa de adaptadores de persistencia DEBE inyectar automÃ¡ticamente el filtro `tenant_id` activo en todas las consultas ejecutadas vÃ­a ORM/Constructores de Consultas (ej. usando filtros globales o interceptores de consulta del repositorio base). Esto asegura que el aislamiento funcional de datos permanezca completamente agnÃ³stico de las capacidades especÃ­ficas del motor de base de datos.

2. **Capa 2: Red de Seguridad a Nivel de Base de Datos (RLS de PostgreSQL)**:
   Como una red de seguridad absoluta contra errores humanos (ej. consultas SQL puras escritas por desarrolladores que se saltan los filtros del ORM), aprovechamos la **Seguridad a Nivel de Fila (RLS)** nativa de PostgreSQL. El motor de PostgreSQL impone el filtrado fÃ­sico de filas utilizando variables de sesiÃ³n de transacciÃ³n establecidas inmediatamente al abrir el checkout del pool de conexiones.

3. **Alcance de la EjecuciÃ³n**: Pasar las claims de `tenant_id` de forma segura dentro de JWTs verificados. Utilizar `AsyncLocalStorage` de NestJS para mantener el contexto inmutable por peticiÃ³n, sirviendo como la fuente Ãºnica de la verdad utilizada por los resolutores tanto de la Capa 1 como de la Capa 2.

4. **PreparaciÃ³n para Aislamiento VIP**: Mientras el 90% de los inquilinos comparten el pool, la capa de abstracciÃ³n de persistencia debe soportar inherentemente el enrutamiento de clientes Enterprise a endpoints de clÃºster de base de datos fÃ­sica completamente aislados basados en metadatos del inquilino resueltos, de forma completamente transparente para el dominio.

## Consecuencias

### Positivas
- **Seguridad Blindada**: El aislamiento de filas se impone de forma nativa en el motor Postgres, sin confiar en el propenso a errores cÃ³digo de la aplicaciÃ³n backend.
- **Escalabilidad Extrema**: Ejecuta cientos de inquilinos bÃ¡sicos en una sola instancia de Postgres sin gestionar cientos de esquemas separados.
- **Actualizaciones Simplificadas**: Una Ãºnica ruta de migraciÃ³n se aplica limpiamente a todos los inquilinos agrupados (Pooled) instantÃ¡neamente.

### Negativas
- **Vecinos Ruidosos (Noisy Neighbors)**: Una consulta descontrolada de un inquilino puede robar capacidad de hardware. Requiere estrategias estrictas de estrangulamiento (throttling).
- **Complejidad de RestauraciÃ³n**: Restaurar el ciclo de vida de los datos de *solo un* inquilino desde el backup requiere significativamente mÃ¡s mano de obra en un modelo agrupado.

## Referencias
- [DocumentaciÃ³n de RLS en PostgreSQL](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- [ADR-0031: Estrategia de Esquema por Contexto](../adrs/core/0031-schema-per-context-domain-event-catalog.md)

---
[? Volver al Índice](./README.es.md)
