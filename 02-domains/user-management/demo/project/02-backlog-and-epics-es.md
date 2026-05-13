# 📋 Backlog de Épicas e Historias (Scrum Artifacts)

> 🌍 **Navegación Bilingüe:** [🇺🇸 English Version](./02-backlog-and-epics.md)

**Fecha:** 2026-05-12  
**Autor:** Product Owner [BMAD Role]  
**Auditor de Calidad (INVEST):** Scrum Master

---

## 🏆 1. Resumen de Épicas por Fase

| Épica | Nombre | Objetivo | Fase |
| :--- | :--- | :--- | :--- |
| **EPIC-01** | Core Multi-Tenant Isolation | Establecer la base de datos aislada y el middleware de identidad. | **MVP (Fase 1)** |
| **EPIC-02** | Hexagonal Task Lifecycles | CRUD de dominio puro sin acoplamiento a infraestructura. | **MVP (Fase 1)** |
| **EPIC-03** | Observability Boost | Integración de OpenTelemetry y logs estructurados. | **Fase 2 (Scale)** |
| **EPIC-04** | Distribute & Extract | Migración de contextos hacia Microservicios y Dapr sidecars. | **Fase 3 (North Star)** |

---

## 📑 2. Detalle del Backlog (Historias de Usuario & Técnicas)

### 🟢 Épica 1: Core Multi-Tenant Isolation

#### **US-101: Login con emisión de JWT**
*   **Descripción:** Como usuario del sandbox, quiero autenticarme con mis credenciales para recibir un Bearer Token seguro.
*   **Tipo:** Funcional
*   **Criterios de Aceptación:**
    *   El payload debe contener obligatoriamente `sub` (userId) y `tenantId`.
    *   Retorna 401 ante credenciales inválidas.
*   **Prioridad:** Must Have

#### **TS-103: [Técnica] Row-Level Security (RLS)**
*   **Descripción:** Como arquitecto, quiero que la base de datos aplique la política `USING (tenant_id = current_setting('app.current_tenant'))` para blindar la data.
*   **Tipo:** [Técnica]
*   **Criterios de Aceptación:**
    *   Una consulta sin clausula `WHERE` devuelve exclusivamente los registros pertenecientes al contexto del usuario actual.
*   **Prioridad:** Must Have

---

### 🟢 Épica 2: Hexagonal Task Lifecycles

#### **US-201: Registro de Tareas Validadas**
*   **Descripción:** Como usuario, quiero registrar un nuevo pendiente para darle seguimiento.
*   **Tipo:** Funcional
*   **Criterios de Aceptación:**
    *   El dominio arroja error de validación si el título excede los 150 caracteres antes de tocar la base de datos.
*   **Prioridad:** Must Have

#### **TS-203: [Técnica] Domain Events Pub/Sub (In-Memory)**
*   **Descripción:** Como desarrollador, quiero que la creación de tareas dispare el evento `TaskCreated` a través de un Bus inyectado.
*   **Tipo:** [Técnica]
*   **Criterios de Aceptación:**
    *   El caso de uso dispara el evento, pero no conoce quién escucha el evento.
*   **Prioridad:** Should Have

---

## 🚦 3. Roadmap y Deuda Técnica Planificada (Roadmap View)

Las siguientes historias técnicas se encuentran bloqueadas hasta alcanzar la Fase 2 o 3 según la evolución natural de carga del sistema ([ADR-0045](../../corporate-standards/02-adrs/core/0045-microservice-extraction-readiness-criteria.md)):

*   `TS-302 [Fase 2]` - **Transactional Outbox:** Garantizar entrega de eventos en fallos de red.
*   `TS-401 [Fase 3]` - **Extracción Sidecar Dapr:** Integración de malla de servicios.

> **Nota del Scrum Master:** Todas las historias aquí listadas cumplen con los criterios **INVEST** y han sido validadas para su ejecución inmediata en el primer Sprint de desarrollo del Sandbox.
