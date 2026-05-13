# [ADR 0004](0004-frontend-offline-resilience.md): Resiliencia Offline del Frontend

## Estado
Aprobado

## Fecha
2026-05-08

## Contexto
Las aplicaciones web que dependen enteramente de la conectividad con el servidor proporcionan una experiencia de usuario deficiente cuando las condiciones de la red se degradan (conexiones mÃ³viles, VPNs corporativas lentas). Los usuarios pierden el estado no guardado y reciben mensajes de error crÃ­pticos en lugar de una degradaciÃ³n elegante.

## DecisiÃ³n
Implementar resiliencia offline en la capa del frontend utilizando **React Query** (TanStack Query) como la soluciÃ³n principal para la gestiÃ³n del estado y la cachÃ© en el lado del cliente.

Estrategias clave:
- **Stale-While-Revalidate**: Servir datos cacheados inmediatamente mientras se obtienen actualizaciones en segundo plano.
- **Optimistic Updates** (Actualizaciones Optimistas): Aplicar mutaciones a la UI instantÃ¡neamente antes de que el servidor las confirme, con rollback automÃ¡tico en caso de fallo.
- **Background Sync** (SincronizaciÃ³n en Segundo Plano): Encolar mutaciones realizadas sin conexiÃ³n y reproducirlas cuando se restaure la conectividad.
- **LÃ³gica de Reintento**: Backoff exponencial automÃ¡tico para peticiones fallidas (configurable por consulta).

## Consecuencias

### Positivas
- Los usuarios ven los datos inmediatamente al navegar â€” sin indicadores de carga (spinners) para contenido cacheado.
- Los formularios y mutaciones se sienten instantÃ¡neos vÃ­a actualizaciones optimistas.
- Modo offline elegante: la aplicaciÃ³n sigue siendo utilizable para operaciones de lectura incluso sin conectividad.

### Negativas
- Las actualizaciones optimistas requieren una lÃ³gica de rollback cuidadosa para mutaciones complejas de mÃºltiples pasos.
- Los desarrolladores deben entender el modelo de invalidaciÃ³n de cachÃ© para prevenir problemas de datos obsoletos.

## Referencias
- [DocumentaciÃ³n de TanStack Query](https://tanstack.com/query)
- [ADR-0011: Patrones de Resiliencia y Tolerancia a Fallos](../adrs/core/0011-fault-tolerance-resiliency-patterns.md)

---
[? Volver al Índice](./README.es.md)
