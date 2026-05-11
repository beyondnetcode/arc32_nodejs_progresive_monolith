# 🧠 BMAD Master Consistency & Architecture Integrity Audit

**Role:** Principal Architect & Product Owner  
**Methodology:** BMAD (Beyond Modern Application Development)  
**Focus:** Global coherence, cross-artifact rupture prevention, logic errors, design enforcement.

This report presents a severe, exhaustive analysis of all 38 Architectural Decisions Records and corresponding artifacts defining our Progressive Reference Architecture.

---

## 📊 1. Structured Diagnosis Report

### 🔴 CRITICAL INCONSISTENCIES (Immediate Action Required)
#### Issue C1: Cross-Schema Referential Integrity Violations
*   **Finding**: `conceptual-data-model.md` (ERD) models hard foreign key constraints (`FK`) between `auth.USER` and `tasks.TASK` tables, and from `auth.USER` to `audit.AUDIT_LOG`.
*   **Violation**: Directly violates **ADR-0031 (Schema Per Context)** and the **Bounded Context Map (Anti-Corruption Layer)**, which dictates: *"Task never reads auth.users directly — gets userId from JWT claims"*.
*   **Impact**: In monolithic mode, physical FKs enforce database locks that prevent instantaneous microservice split-out (M2 extraction). They leak private relational dependencies across logical bounded domains.
*   **Fix Needed**: Demote physical Foreign Keys that cross schemas into **Logical References (UUID ID fields)** and update Mermaid relationship icons to dotted lines (loose coupling).

### 🟠 MAJOR INCONSISTENCIES (High Risk)
#### Issue M1: Stale Technical Registry Summary
*   **Finding**: `stack-summary.md` has lagged behind the modernization of `stack.md` and fails to encompass the new mandates from ADR-0037/0038.
*   **Violation**: It incorrectly lists "Internal CQRS" instead of "Hybrid CQRS (ADR-0034)", and omits mandated tools like **Pact JS** and **k6 (Grafana)** explicitly defined in `ADR-0037`.
*   **Impact**: Developers consuming the "Quick Reference" cheat sheet will select non-compliant tooling paths during initial sprints.

#### Issue M2: Corrupted Documentation Cross-References
*   **Finding**: Line 3 of `conceptual-data-model.md` erroneously links to `ADR-0014 (Distributed Caching)` as the source of truth for Immutable Business Audit.
*   **Impact**: Incorrect contextual flow. The correct authoritative source is **ADR-0016 (Immutable Business Audit Trail)**.

---

## 📝 2. Artifact Modification & Recreation Plan

To seal all logical holes identified above, the following precise modifications are scheduled:

| Artifact Filename | Status | Required Exact Modifications | Priority |
| :--- | :--- | :--- | :--- |
| `01-requirements/conceptual-data-model.md` | **To Modify** | 1. Change line 3 reference from `ADR-0014` to `ADR-0016`. <br>2. In Mermaid code, change hard lines `||--o{` to dotted lines `..o{` for cross-schema relations. <br>3. Explicitly change `uuid FK` to `uuid LogicalRef` for fields spanning boundaries. | **CRITICAL** |
| `02-architecture/stack-summary.md` | **To Modify** | Sync point-by-point with latest `stack.md`: Update CQRS type, add Pact/k6 verification, inject Error Strategy block. | **MAJOR** |

---

## ⚡ 3. Action Plan & Prioritization

1.  **Step 1: Decouple ERD Logic**: Immediately revise `conceptual-data-model.md` to represent the pure, isolated state. Zero real physical cross-schema FKs must be depicted.
2.  **Step 2: Synchronize Summaries**: Overhaul `stack-summary.md` to reflect the absolute baseline of 38 approved records.
3.  **Step 3: System Validation**: Verify that no further files carry hard-coded ADR-0014 references relating to auditing.

---

## 💡 4. Actionable Suggestions for Improving the Solution

1.  **Suggestion 1: Modular Migrations Setup**: Ensure that when generating TypeORM migrations, scripts are explicitly organized inside nested folders matching their bounded context schemas (e.g., `src/libs/auth/infra/migrations`). This fully blocks monolithic DB migration blobs.
2.  **Suggestion 2: Domain-Events as "Source of Truth" in Data Flows**: Re-emphasize that the Audit context consumes asynchronously. The ERD should contain a notes section specifying that data flows to the Audit schema via RabbitMQ queue bindings, not synchronously inside the master save transaction.
3.  **Suggestion 3: Automated Markdown Linter**: Introduce a markdown linter that explicitly confirms relative links in `docs/` point to valid files, protecting cross-references in perpetuity.

---
**Approval Sign-off**: Principal Architect  
**Audit Status**: Concluded - Remediations Locked.
