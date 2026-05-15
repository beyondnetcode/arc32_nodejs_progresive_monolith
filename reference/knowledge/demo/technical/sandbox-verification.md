# Architectural Sandbox & Demo Verification Scope

**Objective:** Define the precise scope of the canonical implementation (To-Do Product) and catalogue which architectural patterns it exercises in a running environment.

---

## 1. The "To-Do" Domain
To prevent polluting the reference architecture with dense business logic, the sandbox executes a streamlined "To-Do Task Manager". This is deliberately chosen for zero cognitive overhead, allowing developers to focus 100% on **Architectural Patterns** instead of business complexities.

---

## 2. Pattern Verification Matrix
The following system directives (ADRs) are physically instantiated and verifiable in this running demo:

| Pattern | Sandbox Verification Location | Validated By |
| :--- | :--- | :--- |
| **Hexagonal Boundaries** | Check `libs/domain/task` (Zero imports of TypeORM or NestJS). | `eslint-plugin-boundaries` |
| **Multi-Tenant RLS** | Attempting to `SELECT * FROM tasks` returns zero rows unless `SET LOCAL app.current_tenant` is called in the current PostgreSQL transaction. | `integration-test/rls.spec.ts` |
| **CQRS Hybrid** | Create Task uses `TaskRepository` (Write). List Tasks executes a flattened view via Query Service (Read). | Manual inspection of flows. |
| **Event Sourcing (Audit)** | Any task creation automatically emits an `Event` captured in `audit.audit_log`. | RabbitMQ monitoring panel. |
| **OTel Tracing** | Every REST/gRPC request generates a Span Visible in local Jaeger instance. | Open `localhost:16686` |
| **Result Pattern** | All Use Cases return `Result.ok()` / `Result.fail()`. Zero `throw new Error` statements in core logic. | Type-check validation. |

---

## 3. Non-Functional Gates Under Exercise
* **Contract Testing**: Running `nx test pact` performs bidirectional check ensuring the React Web-BFF agrees with the Core API gRPC payload.
* **Performance Load**: Local k6 runners exercise high-concurrency insertion of 10,000 tasks in < 5 seconds to verify RLS performance overhead.

---

## 4. Intentional Limitations (Out-of-Sandbox)
To keep the codebase lightweight, the following are NOT implemented in the code, but documented in architecture:
1. **Cloud Distribution**: Cloud specific DNS/Route53 setups.
2. **Complex Sagas**: Distributed sagas traversing 3+ external networks.

---
**Verification Status**: All Critical Patterns Checked & Passed in local Sandbox environment.

---
[Back to Index](./README.md)
