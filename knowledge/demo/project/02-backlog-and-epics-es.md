# ðŸ“‹ Backlog de Ã‰picas e Historias (Scrum Artifacts)

> ðŸŒ **NavegaciÃ³n BilingÃ¼e:** [ðŸ‡ºðŸ‡¸ English Version](./02-backlog-and-epics.md)

**Fecha:** 2026-05-12  
**Autor:** Product Owner [BMAD Role]  
**Auditor de Calidad (INVEST):** Scrum Master

---

## ðŸ† 1. Resumen de Ã‰picas por Fase

| Ã‰pica | Nombre | Objetivo | Fase |
| :--- | :--- | :--- | :--- |
| **EPIC-01** | Core Multi-Tenant Isolation | Establecer la base de datos aislada y el middleware de identidad. | **MVP (Fase 1)** |
| **EPIC-02** | Hexagonal Task Lifecycles | CRUD de dominio puro sin acoplamiento a infraestructura. | **MVP (Fase 1)** |
| **EPIC-03** | Observability Boost | IntegraciÃ³n de OpenTelemetry y logs estructurados. | **Fase 2 (Scale)** |
| **EPIC-04** | Distribute & Extract | MigraciÃ³n de contextos hacia Microservicios y Dapr sidecars. | **Fase 3 (North Star)** |

---

## ðŸ“‘ 2. Detalle del Backlog (Historias de Usuario & TÃ©cnicas)

### ðŸŸ¢ Ã‰pica 1: Core Multi-Tenant Isolation

#### **US-101: Login con emisiÃ³n de JWT**
*   **DescripciÃ³n:** Como usuario del sandbox, quiero autenticarme con mis credenciales para recibir un Bearer Token seguro.
*   **Tipo:** Funcional
*   **Criterios de AceptaciÃ³n:**
    *   El payload debe contener obligatoriamente `sub` (userId) y `tenantId`.
    *   Retorna 401 ante credenciales invÃ¡lidas.
*   **Prioridad:** Must Have

#### **TS-103: [TÃ©cnica] Row-Level Security (RLS)**
*   **DescripciÃ³n:** Como arquitecto, quiero que la base de datos aplique la polÃ­tica `USING (tenant_id = current_setting('app.current_tenant'))` para blindar la data.
*   **Tipo:** [TÃ©cnica]
*   **Criterios de AceptaciÃ³n:**
    *   Una consulta sin clausula `WHERE` devuelve exclusivamente los registros pertenecientes al contexto del usuario actual.
*   **Prioridad:** Must Have

---

### ðŸŸ¢ Ã‰pica 2: Hexagonal Task Lifecycles

#### **US-201: Registro de Tareas Validadas**
*   **DescripciÃ³n:** Como usuario, quiero registrar un nuevo pendiente para darle seguimiento.
*   **Tipo:** Funcional
*   **Criterios de AceptaciÃ³n:**
    *   El dominio arroja error de validaciÃ³n si el tÃ­tulo excede los 150 caracteres antes de tocar la base de datos.
*   **Prioridad:** Must Have

#### **TS-203: [TÃ©cnica] Domain Events Pub/Sub (In-Memory)**
*   **DescripciÃ³n:** Como desarrollador, quiero que la creaciÃ³n de tareas dispare el evento `TaskCreated` a travÃ©s de un Bus inyectado.
*   **Tipo:** [TÃ©cnica]
*   **Criterios de AceptaciÃ³n:**
    *   El caso de uso dispara el evento, pero no conoce quiÃ©n escucha el evento.
*   **Prioridad:** Should Have

---

## ðŸš¦ 3. Roadmap y Deuda TÃ©cnica Planificada (Roadmap View)

Las siguientes historias tÃ©cnicas se encuentran bloqueadas hasta alcanzar la Fase 2 o 3 segÃºn la evoluciÃ³n natural de carga del sistema ([ADR-0045](../../standards/02-adrs/core/0045-microservice-extraction-readiness-criteria.md)):

*   `TS-302 [Fase 2]` - **Transactional Outbox:** Garantizar entrega de eventos en fallos de red.
*   `TS-401 [Fase 3]` - **ExtracciÃ³n Sidecar Dapr:** IntegraciÃ³n de malla de servicios.

> **Nota del Scrum Master:** Todas las historias aquÃ­ listadas cumplen con los criterios **INVEST** y han sido validadas para su ejecuciÃ³n inmediata en el primer Sprint de desarrollo del Sandbox.

---
[? Back to Index](./README.md)
