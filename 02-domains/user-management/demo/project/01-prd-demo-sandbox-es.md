# 📄 Documento de Requisitos del Producto (PRD)

> 🌍 **Navegación Bilingüe:** [🇺🇸 English Version](./01-prd-demo-sandbox.md)

**Producto:** ARC32 Reference Sandbox ("To-Do Labs")  
**Dueño del Producto:** Product Manager [BMAD Role]  
**Fase Actual:** MVP (Fase 1)

---

## 🎯 1. Resumen Ejecutivo (Executive Summary)
Este producto no es un sistema comercial final. Es un **Laboratorio de Patrones Específico** diseñado para validar físicamente que los estándares de arquitectura corporativa definidos en los ADRs operan armoniosamente en un ciclo de vida de desarrollo real. Su éxito se mide por la limpieza de sus fronteras arquitectónicas y no por la cantidad de funcionalidades de usuario.

## 🚀 2. Visión y Valor Diferenciador
Demostrar mediante código ejecutable que se puede construir un sistema reactivo con **Seguridad de Nivel de Fila (RLS)** y **Arquitectura Hexagonal**, manteniendo la lógica de negocio blindada contra cambios en el motor de base de datos o en el framework de ejecución.

## 📋 3. Requisitos Funcionales (Functional Requirements)
| ID | Requisito | Descripción Crítica |
| :--- | :--- | :--- |
| **REQ-01** | Gestión de Identidad | Registro, Login y generación de JWT conteniendo obligatoriamente el `tenantId`. |
| **REQ-02** | CRUD de Tareas | Creación, Listado, Filtrado y Actualización del estado de un pendiente por usuario. |
| **REQ-03** | Categorización | Asignación de carpetas o buckets de organización para tareas agrupadas. |

## 🏗️ 4. Requisitos No Funcionales y Deuda Técnica Aceptada
1.  **Blindaje de Dominio:** Prohibición de librerías `@nestjs` o de persistencia en el módulo core del dominio.
2.  **Aislamiento SQL Nativo:** El sandbox debe forzar que el pooling de base de datos configure el contexto del tenant antes de cada Query.
3.  **Consistencia Eventual:** Aceptada y planificada para la Fase 2 mediante el patrón Outbox. En Fase 1, se tolera la comunicación síncrona inter-módulo.

---

## ⚖️ 5. Criterios de Éxito de la Demo
1.  **Seguridad:** Ejecutar un `SELECT` crudo con el contexto de Usuario A y demostrar que los datos del Usuario B son invisibles.
2.  **Agnosticismo:** Reemplazar el adaptador del repositorio de base de datos por una implementación `InMemory` para tests sin cambiar un solo caracter en la capa de aplicación o dominio.
