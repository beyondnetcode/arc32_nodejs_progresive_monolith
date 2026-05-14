# [ADR 0010](0010-multi-tenancy-architecture-strategy.md): Estrategia de Arquitectura Multi-Tenancy para la Evolución SaaS

## Estado
Aprobado

## Fecha
2026-05-08

## Contexto
A medida que el sistema madura hacia una oferta SaaS, debemos aislar los datos de múltiples inquilinos (tenants) de forma segura sin disparar las facturas de infraestructura cloud. Existen tres enfoques principales de particionado:
1. **Base de Datos por Inquilino**: Máximo aislamiento, máxima sobrecarga de costo operativo.
2. **Esquema por Inquilino**: Separación lógica, pero gestión de migraciones de esquema más difícil.
3. **Base de Datos Compartida (Pooled)**: Un solo espacio de tablas, IDs discriminadores, alta eficiencia pero potencial filtración de datos si los desarrolladores olvidan las cláusulas WHERE.

Necesitamos prevención absoluta de filtraciones junto con un escalado de recursos eficiente.

## Decisión
Adoptar una **Estrategia Multi-Tenancy Híbrida "Pooled"** utilizando un **Marco de Aislamiento de Doble Capa obligatorio de "Defensa en Profundidad"**:

1. **Capa 1: Aislamiento a Nivel de Aplicación (Primario - Agnóstico al Motor)**:
 La capa de adaptadores de persistencia DEBE inyectar automáticamente el filtro `tenant_id` activo en todas las consultas ejecutadas vía ORM/Constructores de Consultas (ej. usando filtros globales o interceptores de consulta del repositorio base). Esto asegura que el aislamiento funcional de datos permanezca completamente agnóstico de las capacidades específicas del motor de base de datos.

2. **Capa 2: Red de Seguridad a Nivel de Base de Datos (RLS de PostgreSQL)**:
 Como una red de seguridad absoluta contra errores humanos (ej. consultas SQL puras escritas por desarrolladores que se saltan los filtros del ORM), aprovechamos la **Seguridad a Nivel de Fila (RLS)** nativa de PostgreSQL. El motor de PostgreSQL impone el filtrado físico de filas utilizando variables de sesión de transacción establecidas inmediatamente al abrir el checkout del pool de conexiones.

3. **Alcance de la Ejecución**: Pasar las claims de `tenant_id` de forma segura dentro de JWTs verificados. Utilizar `AsyncLocalStorage` de NestJS para mantener el contexto inmutable por petición, sirviendo como la fuente única de la verdad utilizada por los resolutores tanto de la Capa 1 como de la Capa 2.

4. **Preparación para Aislamiento VIP**: Mientras el 90% de los inquilinos comparten el pool, la capa de abstracción de persistencia debe soportar inherentemente el enrutamiento de clientes Enterprise a endpoints de clúster de base de datos física completamente aislados basados en metadatos del inquilino resueltos, de forma completamente transparente para el dominio.

## Consecuencias

### Positivas
- **Seguridad Blindada**: El aislamiento de filas se impone de forma nativa en el motor Postgres, sin confiar en el propenso a errores código de la aplicación backend.
- **Escalabilidad Extrema**: Ejecuta cientos de inquilinos básicos en una sola instancia de Postgres sin gestionar cientos de esquemas separados.
- **Actualizaciones Simplificadas**: Una única ruta de migración se aplica limpiamente a todos los inquilinos agrupados (Pooled) instantáneamente.

### Negativas
- **Vecinos Ruidosos (Noisy Neighbors)**: Una consulta descontrolada de un inquilino puede robar capacidad de hardware. Requiere estrategias estrictas de estrangulamiento (throttling).
- **Complejidad de Restauración**: Restaurar el ciclo de vida de los datos de *solo un* inquilino desde el backup requiere significativamente más mano de obra en un modelo agrupado.

## Referencias
- [Documentación de RLS en PostgreSQL](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- [ADR-0031: Estrategia de Esquema por Contexto](../../adrs/core/0031-schema-per-context-domain-event-catalog.md)

---
[Volver al Índice](./README.es.md)
