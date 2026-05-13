# ðŸ“„ Documento de Requisitos del Producto (PRD)

> ðŸŒ **NavegaciÃ³n BilingÃ¼e:** [ðŸ‡ºðŸ‡¸ English Version](./01-prd-demo-sandbox.md)

**Producto:** ARC32 Reference Sandbox ("To-Do Labs")  
**DueÃ±o del Producto:** Product Manager [BMAD Role]  
**Fase Actual:** MVP (Fase 1)

---

## ðŸŽ¯ 1. Resumen Ejecutivo (Executive Summary)
Este producto no es un sistema comercial final. Es un **Laboratorio de Patrones EspecÃ­fico** diseÃ±ado para validar fÃ­sicamente que los estÃ¡ndares de arquitectura corporativa definidos en los ADRs operan armoniosamente en un ciclo de vida de desarrollo real. Su Ã©xito se mide por la limpieza de sus fronteras arquitectÃ³nicas y no por la cantidad de funcionalidades de usuario.

## ðŸš€ 2. VisiÃ³n y Valor Diferenciador
Demostrar mediante cÃ³digo ejecutable que se puede construir un sistema reactivo con **Seguridad de Nivel de Fila (RLS)** y **Arquitectura Hexagonal**, manteniendo la lÃ³gica de negocio blindada contra cambios en el motor de base de datos o en el framework de ejecuciÃ³n.

## ðŸ“‹ 3. Requisitos Funcionales (Functional Requirements)
| ID | Requisito | DescripciÃ³n CrÃ­tica |
| :--- | :--- | :--- |
| **REQ-01** | GestiÃ³n de Identidad | Registro, Login y generaciÃ³n de JWT conteniendo obligatoriamente el `tenantId`. |
| **REQ-02** | CRUD de Tareas | CreaciÃ³n, Listado, Filtrado y ActualizaciÃ³n del estado de un pendiente por usuario. |
| **REQ-03** | CategorizaciÃ³n | AsignaciÃ³n de carpetas o buckets de organizaciÃ³n para tareas agrupadas. |

## ðŸ—ï¸ 4. Requisitos No Funcionales y Deuda TÃ©cnica Aceptada
1.  **Blindaje de Dominio:** ProhibiciÃ³n de librerÃ­as `@nestjs` o de persistencia en el mÃ³dulo core del dominio.
2.  **Aislamiento SQL Nativo:** El sandbox debe forzar que el pooling de base de datos configure el contexto del tenant antes de cada Query.
3.  **Consistencia Eventual:** Aceptada y planificada para la Fase 2 mediante el patrÃ³n Outbox. En Fase 1, se tolera la comunicaciÃ³n sÃ­ncrona inter-mÃ³dulo.

---

## âš–ï¸ 5. Criterios de Ã‰xito de la Demo
1.  **Seguridad:** Ejecutar un `SELECT` crudo con el contexto de Usuario A y demostrar que los datos del Usuario B son invisibles.
2.  **Agnosticismo:** Reemplazar el adaptador del repositorio de base de datos por una implementaciÃ³n `InMemory` para tests sin cambiar un solo caracter en la capa de aplicaciÃ³n o dominio.

---
[? Back to Index](./README.md)
