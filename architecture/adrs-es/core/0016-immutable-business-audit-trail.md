# [ADR 0016](0016-immutable-business-audit-trail.md): Pista de AuditorÃ­a de Negocio Inmutable y Rastreo de Cambios

## Estado
Aprobado

## Fecha
2026-05-09

## Contexto
Las operaciones reguladas requieren una trazabilidad absoluta. Simplemente capturar el estado final de las entidades no es suficiente para propÃ³sitos forenses o de auditorÃ­a; debemos detectar con precisiÃ³n *quiÃ©n* cambiÃ³ los datos, *cuÃ¡ndo*, desde *quÃ©* vector de red, y registrando diferenciales exactos de los valores de *antes* y *despuÃ©s*.

## DecisiÃ³n
Desplegar una **Estrategia de AuditorÃ­a HÃ­brida** equilibrando la lectura directa performante con el archivado histÃ³rico profundo:

1. **Capa de Metadatos (Nivel de Fila)**: Las entidades fÃ­sicas heredan columnas de auditorÃ­a persistentes estÃ¡ndar: `created_at`, `created_by`, `updated_at`, `updated_by`, y un entero `version` para el rastreo de concurrencia.
2. **Capa de Libro Mayor (Deltas de AplicaciÃ³n)**: Los manejadores de comandos de la aplicaciÃ³n generan eventos a nivel de aplicaciÃ³n que reenvÃ­an paquetes JSON estructurados con los valores antiguos/nuevos directamente hacia el conector de infraestructura de auditorÃ­a.
3. **Persistencia Permanente**: Escribir los registros finales resueltos del libro mayor hacia un objetivo de "solo adiciÃ³n" (append-only). Aplicar triggers de base de datos que sobrescriban directamente el motor fÃ­sico de la BD para lanzar excepciones de bloqueo sobre cualquier usuario genÃ©rico SQL que intente acciones de `DELETE` o `UPDATE` contra los archivos de auditorÃ­a actuales.

## Consecuencias

### Positivas
- Beneficio dual: visibilidad local superrÃ¡pida del Ãºltimo modificador, mÃ¡s capacidad absoluta de repeticiÃ³n legal desde el libro mayor de solo adiciÃ³n.
- Elimina el acoplamiento de triggers del proveedor al manejar la agregaciÃ³n de intenciones dentro del flujo de la aplicaciÃ³n.

### Negativas
- Se requiere rigor del desarrollador para asegurar que todas las operaciones de escritura se enganchen fielmente a los disparadores de despacho de auditorÃ­a.
- La huella de almacenamiento fÃ­sico se expande linealmente indefinidamente a travÃ©s de continuas adiciones; los archivados eventualmente requerirÃ¡n polÃ­ticas de rotaciÃ³n de ciclo de vida.

## Referencias
- [ADR-0031: CatÃ¡logo de Eventos de Dominio](../adrs/core/0031-schema-per-context-domain-event-catalog.md)
- [ADR-0015: Arquitectura Dirigida por Eventos](../adrs/core/0015-event-driven-architecture-intra-domain.md)

---
[? Volver al Índice](./README.es.md)
