# [ADR 0034](0034-cqrs-pattern-applicability-matrix.md): Matriz de AplicaciÃ³n del PatrÃ³n CQRS

## Estado
Aprobado

## Fecha
2026-05-11

## Contexto
Implementar la **SegregaciÃ³n de Responsabilidad de Comando y Consulta (CQRS)** introduce complejidad arquitectÃ³nica debido a la separaciÃ³n de los modelos de datos, rutas de cÃ³digo distintas y mecÃ¡nicas de consistencia eventual. Aplicar CQRS completo ciegamente a cada entidad simple da como resultado una sobrecarga masiva innecesaria. Requerimos reglas rÃ­gidas de gobernanza corporativa que definan CUÃNDO debe implementarse este patrÃ³n.

## DecisiÃ³n
Adoptar la siguiente **Matriz de EvaluaciÃ³n** para determinar si un Caso de Uso especÃ­fico requiere la imposiciÃ³n de CQRS Completo:

### Nivel 1: Ruta EstÃ¡ndar (No se requiere CQRS)
*   **Criterios**: Operaciones CRUD bÃ¡sicas, cambios de estado simples, acceso concurrente de bajo a medio.
*   **Enfoque**: LÃ³gica de modelo Ãºnico utilizando la implementaciÃ³n del Repositorio Hexagonal leyendo y escribiendo en la misma Entidad de Dominio.

### Nivel 2: AgregaciÃ³n de Modelo de Lectura (CQRS a nivel de BFF)
*   **Criterios**: Los modelos de dominio deben combinarse, unirse o refiltrarse para Vistas de UI especializadas.
*   **Enfoque**: El BFF crea "Proyecciones de Solo Lectura" especializadas de los datos utilizando SQL optimizado, mientras mantiene los comandos dirigidos al repositorio core.

### Nivel 3: ImposiciÃ³n de CQRS Completo (Obligatorio)
Mandar la separaciÃ³n completa de cÃ³digo/lÃ³gica fÃ­sica ÃšNICAMENTE si se cumplen al menos **DOS** de las siguientes condiciones:
1.  **AsimetrÃ­a de Volumen**: La relaciÃ³n entre las consultas de Lectura y las actualizaciones de Escritura excede **100:1**.
2.  **Alta Contienda**: Las lecturas analÃ­ticas pesadas perturban el rendimiento de las transacciones y bloquean filas, requiriendo una "ProyecciÃ³n de RÃ©plica de Lectura" separada.
3.  **Proyecciones de Vista Complejas**: Existen mÃºltiples vistas distintas de los mismos datos que no pueden ser derivadas matemÃ¡ticamente del Agregado de Dominio central sin una pesada sobrecarga de cÃ³mputo.
4.  **ReconstrucciÃ³n de Estado**: La lÃ³gica de auditorÃ­a de negocio requiere almacenar el flujo del historial (prerrequisito de Event Sourcing).

## Consecuencias

### Positivas
- Defiende contra la sobre-ingenierÃ­a en dominios simples.
- Dirige los recursos a construir CQRS ÃšNICAMENTE para zonas de contienda de alto rendimiento.
- Asegura una clara segregaciÃ³n de las preocupaciones de escalado.

### Negativas
- Los equipos requieren capacitaciÃ³n para diferenciar entre el Nivel 2 (AgregaciÃ³n de Lectura en BFF) y el Nivel 3 (CQRS Completo).

## Referencias
- [PatrÃ³n CQRS (Martin Fowler)](https://martinfowler.com/bliki/CQRS.html)
- [ADR-0002: Arquitectura Hexagonal Limpia](../adrs/nodejs/0002-clean-architecture-nestjs.md)

---
[? Volver al Índice](./README.es.md)
