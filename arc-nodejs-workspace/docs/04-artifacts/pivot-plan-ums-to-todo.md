# 📐 Architectural & Functional Pivot Plan: From Enterprise UMS to Classic To-Do System

## 📌 1. Executive Summary (PO & Architect Overview)
As requested, the product context is shifting from an **Enterprise User Management System (UMS)** to a **Classic To-Do System**. 
This change streamlines the project's scope, decoupling it from highly specific Enterprise IAM domains and aligning it strictly as a **Pure Reference Architecture Template**.

By reducing domain complexity, future consumers can focus purely on mastering the underlying architecture (Nx, NestJS Clean Architecture, Hexagonal Ports & Adapters, Hexagonal Boundaries, Event-Driven Primitives) without getting lost in business rules regarding dynamic graph compilation or hierarchical configuration overrides.

---

## 🧭 2. The bMAD Pivot Dimensions

### 💼 2.1 Business Dimension (B) — The Strategic Reboot
*   **Previous Vision**: An abstract, pluggable authorization kernel for SaaS suites (B2B).
*   **New Vision**: A streamlined productivity skeleton serving as an onboarding and implementation playground for advanced architecture concepts.
*   **Scope**: Basic User Registration, Login, and Task Management (Create, List, Toggle Status, Delete).
*   **Value Proposition**: Clear, readable, low-complexity domain code that showcases high-complexity technical structure.

### 🗃️ 2.2 Models Dimension (M) — Domain Simplification
*   **Entities**: Replace complex "Tenants", "Systems", "Permissions", "Feature Flags", "Profile Templates" with:
    *   **User**: Core identity.
    *   **Task**: Description, Status (Pending/Completed), CreationDate, DueDate.
*   **Ubiquitous Language**: Simplify all events to `TaskCreatedEvent`, `TaskCompletedEvent`, etc.

### 🏛️ 2.3 Architecture Dimension (A) — Pattern Retention, Complexity Purge
*   **STAY (Architectural Skeleton)**:
    *   Nx Monorepo Orchestration.
    *   Clean Architecture & Hexagonal Boundaries.
    *   NestJS Framework, TypeORM/PostgreSQL.
    *   Distributed Observability (OpenTelemetry/Loki).
    *   CI/CD Quality Gates.
*   **PURGE (Enterprise Overkill)**:
    *   Multi-Tenancy RLS isolation (revert to standard relational scoping).
    *   Advanced ABAC/RBAC graphs.
    *   Multi-IdP Adapter Pattern (retain simple JWT local storage adapter for simplicity).
    *   Adaptive MFA and Passkeys (OOS for a simple reference).

### 🚀 2.4 Delivery Dimension (D) — Technical Cleanup List
*   **Current Codebase**: The current `apps/api` already has a base `User` structure. We will keep this and seamlessly extend it with `Task` rather than ripping everything out.

---

## 🛠️ 3. Categorical Cleanup & Refactor Register

### 🛑 3.1 Phase 1: PURGE (Irrelevant Legacy Documentation)
The following files cover advanced IAM topics that do not belong in a Simple To-Do context. They will be **permanently removed** to reduce cognitive load.

| Path / Directory | Reason for Deletion |
| :--- | :--- |
| `docs/01-requirements/permission-matrix-example.md` | Overkill for simple list ACL. |
| `docs/01-requirements/usecases/uc-02-*` through `uc-11-*` | Covers graph compilation, hierarchical config, and MFA. |
| `docs/03-adrs/0010-multi-tenancy-*` | A generic To-Do template doesn't need SaaS RLS isolation by default. |
| `docs/03-adrs/0012-advanced-authorization-*` | Replaced by simple boolean ownership. |
| `docs/03-adrs/0017-feature-flagging-*` | Overcomplicates simple template. |
| `docs/03-adrs/0020-identity-provider-*` | Too abstract for basic demo. |
| `docs/03-adrs/0021-*` to `0026-*` | High-performance graph compilation, pluggable projections, and MFA spec. |
| `docs/04-artifacts/enterprise-iam-ums-specification.md` | Domain specific obsolete content. |
| `docs/04-artifacts/high-concurrency-auth-specification.md` | Obsolete. |
| `docs/04-artifacts/mfa-passwordless-security-spec.md` | Obsolete. |
| `docs/04-artifacts/ums-configuration-platform-spec.md` | Obsolete. |

### 🔄 3.2 Phase 2: REFACTOR (Core Documents Adaption)
The following documents represent the structure of our system and will be rewritten to reflect the new domain context while preserving the architectural tone.

| File | Target Action |
| :--- | :--- |
| `docs/index.md` | Rewrite to title "To-Do Reference Architecture" and update navigation. |
| `docs/00-product/business-context.md` | Rewrite from IAM problem to Productivity/Template problem. |
| `docs/00-product/product-vision.md` | Update values and pillars to "Developer Experience & Simple Management". |
| `docs/01-requirements/glossary.md` | Replace "Tenant, Role, Permission" with "User, Task, Status". |
| `docs/01-requirements/conceptual-data-model.md` | Redraw simple User -> Task relationship. |
| `docs/01-requirements/usecases/uc-01-user-authentication.md` | Simplify to local credential lookup. |
| `docs/02-architecture/bounded-context-map.md` | Simplify map to "Core Auth" & "Task Management". |
| `docs/02-architecture/architecture-spec.md` | Update components names (e.g., ConfigAPI becomes TaskAPI). |
| `docs/04-artifacts/bmad-master-audit-alignment-report.md` | Update all bMAD dimensions to follow section 2 of this plan. |

### 🏗️ 3.3 Phase 3: Technical Skeleton (Code Refinement)
Given that the repository currently only contains base `User` initialization in Clean Architecture:
1.  **Keep**: `apps/api/src/core/entities/user.entity.ts` and its supporting repo.
2.  **Generate**: `Task` entity, `CreateTaskUseCase`, and associated repository port/adapter.
3.  **Modify**: Ensure generic config keys pointing to "UMS" are renamed to "ARC_TODO" or similar.

---

## 🏁 4. Immediate Next Steps & Sign-Off
1.  [ ] **Approve Pivot Plan**: Confirm deletion mapping.
2.  [ ] **Execute Purge**: Remove obsolete folders/files listed in section 3.1.
3.  [ ] **Document Refactor Phase 1**: Update `docs/00-product/*` files.
4.  [ ] **Document Refactor Phase 2**: Update Architecture & Use Case files.
5.  [ ] **Final Governance Update**: Re-publish `index.md` with clean architecture pointers.

**Submitted by**: Antigravity (AI Architect / PO Hybrid)
**Methodology**: bMAD Framework v3.0
