# ADR 0016: Immutable Business Audit Trail and Change Tracking

## Status
Approved

## Date
2026-05-09

## Context
In regulated logistics and customs systems, absolute traceability is required by law. It is not enough to know the current state of a container's weight or seal; auditors must be able to trace exactly who changed it, when, from what IP, and what the previous values were. While initially considered at the ORM level, delegating compliance and auditing to infrastructure (database triggers or ORM subscribers) hides the business intent, loses request context (like user ID or IP), and tightly couples the architecture to the database technology.

## Decision
We will implement an automated, immutable audit trail system at the **Application / Domain Level**:

1. **Application-Level Auditing (Domain Events / Helpers)**: Instead of relying on ORM "magic", the auditing will be an explicit operation. Mappers or Use Cases will capture the `old_values` and `new_values` and explicitly dispatch an audit request (e.g., via a Domain Event using `@nestjs/event-emitter` or an explicit `AuditService` helper).
2. **Rich Business Context**: Because the audit occurs in the Application Layer, we can effortlessly capture the executing `user_id`, the specific Use Case name, the `tenant_id`, and network context (IP/Headers) before the payload is passed to the database adapter.
3. **Immutable Ledger**: The audit logs will be written to a dedicated, append-only Audit Table (or an isolated document store). This table will have database-level triggers preventing `UPDATE` and `DELETE` operations, ensuring legal immutability.

## Consequences
* **Pros**: Fulfills strict legal and customs audit requirements with 100% ORM-agnostic architecture. Retains rich business context and makes the auditing intent explicitly visible in the codebase, perfectly aligning with Clean Architecture.
* **Cons**: Relies on developer discipline to invoke the audit helper or emit the Domain Event. Database storage will grow significantly over time.
