# 📋 Epics & Backlog Registry (Scrum Artifacts)

> 🌍 **Bilingual Navigation:** [🇪🇸 Versión en Español](./02-backlog-and-epics-es.md)

**Date:** 2026-05-12  
**Author:** Product Owner [BMAD Role]  
**Quality Auditor (INVEST):** Scrum Master

---

## 🏆 1. Epics Summary by Phase

| Epic | Name | Objective | Phase |
| :--- | :--- | :--- | :--- |
| **EPIC-01** | Core Multi-Tenant Isolation | Establish the secure persistence layer and identity context middleware. | **MVP (Phase 1)** |
| **EPIC-02** | Hexagonal Task Lifecycles | Pure domain CRUD without external infrastructure bleeding. | **MVP (Phase 1)** |
| **EPIC-03** | Observability Boost | Integration of OpenTelemetry telemetry traces and structured logging. | **Phase 2 (Scale)** |
| **EPIC-04** | Distribute & Extract | Evolution roadmap leading towards Microservices and Dapr Sidecars. | **Phase 3 (North Star)** |

---

## 📑 2. Backlog Detailed View (User Stories & Technical)

### 🟢 Epic 1: Core Multi-Tenant Isolation

#### **US-101: Login & JWT Issuance**
*   **Description:** As a sandbox user, I want to authenticate myself to obtain a secured Bearer Token.
*   **Type:** Functional
*   **Acceptance Criteria:**
    *   Payload MUST explicitly host `sub` (userId) and `tenantId`.
    *   Returns 401 Unauthorized upon credential mismatches.
*   **Priority:** Must Have

#### **TS-103: [Technical] Row-Level Security (RLS)**
*   **Description:** As an Architect, I demand the DB layer executes `USING (tenant_id = current_setting('app.current_tenant'))` policy to safeguard data.
*   **Type:** [Technical]
*   **Acceptance Criteria:**
    *   A naked Query executed without explicit `WHERE` clauses returns exclusively context-relevant rows.
*   **Priority:** Must Have

---

### 🟢 Epic 2: Hexagonal Task Lifecycles

#### **US-201: Validated Task Registration**
*   **Description:** As a user, I want to log a new to-do task to maintain tracking.
*   **Type:** Functional
*   **Acceptance Criteria:**
    *   Domain rules trigger a validation error BEFORE DB interaction if title length exceeds 150 chars.
*   **Priority:** Must Have

#### **TS-203: [Technical] Domain Events Pub/Sub (In-Memory)**
*   **Description:** As a Developer, I want the creation flow to broadcast a `TaskCreated` message via injected event bus.
*   **Type:** [Technical]
*   **Acceptance Criteria:**
    *   The transactional application use case emits the event without static awareness of the handlers.
*   **Priority:** Should Have

---

## 🚦 3. Evolution Roadmap & Planned Technical Debt

Subsequent Technical Tickets are locked until execution parameters scale based on [ADR-0045](../../corporate-standards/02-adrs/core/0045-microservice-extraction-readiness-criteria.md):

*   `TS-302 [Phase 2]` - **Transactional Outbox:** Guaranteeing delivery consistency amid downstream outages.
*   `TS-401 [Phase 3]` - **Dapr Sidecar Extraction:** Orchestrating the service mesh transition.

> **Scrum Master Note:** All listed stories satisfy **INVEST** hygiene norms and are cleared for direct execution in the very first sprint cycle of the Sandbox.
