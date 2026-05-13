# ðŸ—ºï¸ Bounded Context Map â€” To-Do Reference Skeleton

This document establishes the formal **Domain-Driven Design (DDD) Bounded Context Map** for the Reference Template. Each context owns its own **PostgreSQL schema** ([ADR-0031](../../standards/02-adrs/core/0031-schema-per-context-domain-event-catalog.md)), enabling zero-migration microservices extraction.

---

## ðŸ“ 1. Context Map Overview

```mermaid
graph TD
    subgraph AuthContext["ðŸ” Authentication Context (schema: auth)"]
        IC1["User Registration"]
        IC2["JWT Token Generation"]
        IC3["IPasswordHasher Port"]
    end

    subgraph TaskContext["âœ… Task Management Context (schema: tasks)"]
        TC1["Task Command Service"]
        TC2["Task Query Service"]
        TC3["ITaskRepository Port"]
    end

    subgraph TaxonomyContext["ðŸ·ï¸ Taxonomy Context (schema: taxonomy)"]
        TAX1["Category Management"]
        TAX2["Tag Management"]
        TAX3["ICategoryRepository / ITagRepository Ports"]
    end

    subgraph AuditContext["ðŸ“‹ Audit Context (schema: audit)"]
        AU1["AuditLog Writer"]
        AU2["Append-Only Ledger"]
    end

    subgraph Infrastructure["ðŸ› ï¸ Shared Infrastructure"]
        DB[("PostgreSQL\n[auth | tasks | taxonomy | audit schemas]")]
        Redis[("Redis Cache")]
        Bus["IEventBusPort\n[In-Memory / RabbitMQ]"]
    end

    AuthContext -->|"UserRegisteredEvent â†’ IEventBusPort"| Bus
    AuthContext -->|"UserDeactivatedEvent â†’ IEventBusPort"| Bus

    TaskContext -->|"TaskCreatedEvent â†’ IEventBusPort"| Bus
    TaskContext -->|"TaskCompletedEvent â†’ IEventBusPort"| Bus
    TaskContext -->|"TaskDeletedEvent â†’ IEventBusPort"| Bus

    TaxonomyContext -->|"CategoryDeletedEvent â†’ IEventBusPort"| Bus
    
    Bus -->|"Subscribes: UserRegisteredEvent"| TaskContext
    Bus -->|"Subscribes: CategoryDeletedEvent"| TaskContext
    Bus -->|"Subscribes: All mutation events"| AuditContext

    AuthContext -.-|"auth schema"| DB
    TaskContext -.-|"tasks schema"| DB
    TaxonomyContext -.-|"taxonomy schema"| DB
    AuditContext -.-|"audit schema"| DB
    TaskContext -.-|"ICachePort"| Redis
```

---

## ðŸ“¦ 2. Context Definitions

### ðŸ” A. Authentication Context â€” `schema: auth`
**Mission:** Own the identity management primitives and session token issuing.

**Owns:**
- `auth.users` table
- `IPasswordHasher` port
- Auth Controller (Login/Register endpoints)

**Publishes Events:**
- `UserRegisteredEvent` â†’ consumed by Task, Audit
- `UserDeactivatedEvent` â†’ consumed by Task, Audit

---

### âœ… B. Task Management Context â€” `schema: tasks`
**Mission:** Coordinate all operations related to atomic workflow tasks.

**Owns:**
- `tasks.task` table
- `tasks.task_tags` bridge table
- `ITaskRepository` port
- Use Cases: `CreateTask`, `ListTasks`, `CompleteTask`, `DeleteTask`

**Integration Contract:**
- Reads `userId` from JWT (injected by Auth context via token claim â€” no direct DB cross-schema reads)
- Subscribes to: `UserRegisteredEvent`, `CategoryDeletedEvent`

**Publishes Events:**
- `TaskCreatedEvent`, `TaskCompletedEvent`, `TaskDeletedEvent`

---

### ðŸ·ï¸ C. Taxonomy Context â€” `schema: taxonomy`
**Mission:** Manage the classification vocabulary (Categories and Tags) available to the tenant.

**Owns:**
- `taxonomy.category` table
- `taxonomy.tag` table
- `ICategoryRepository`, `ITagRepository` ports

**Publishes Events:**
- `CategoryDeletedEvent` â†’ consumed by Task (nullify orphaned category_id references)

---

### ðŸ“‹ D. Audit Context â€” `schema: audit`
**Mission:** Maintain an immutable, append-only record of all significant domain state changes.

**Owns:**
- `audit.audit_log` table (database-level INSERT-only trigger enforced per [ADR-0016](../../standards/02-adrs/core/0016-immutable-business-audit-trail.md))

**Subscribes to:** All events from all contexts.

**Does NOT publish events.** The Audit context is a terminal sink.

---

## ðŸš§ 3. Anti-Corruption Layers (ACL)

| Boundary | ACL Mechanism | Reason |
| :--- | :--- | :--- |
| Task â†” Redis | `ICachePort` | Prevents Redis driver from leaking into domain layer |
| Task â†” TypeORM | `ITaskRepository` | ORM decorators must not impact core TS entity rules |
| Auth â†” Bcrypt | `IPasswordHasher` | Decouples crypto algorithm from application workflow |
| Any Context â†” Event Bus | `IEventBusPort` | Decouples transport (RabbitMQ/Kafka) from domain logic |
| Task â†” Auth | Domain Events only | Task never reads `auth.users` directly â€” gets userId from JWT claims |

---

## ðŸ”„ 4. Microservices Extraction Map ([ADR-0031](../../standards/02-adrs/core/0031-schema-per-context-domain-event-catalog.md), [ADR-0006](../../standards/02-adrs/core/0006-future-microservices-transition-dapr.md))

When the system evolves to microservices, each context extracts cleanly:

| Milestone | Action | DB Impact |
| :--- | :--- | :--- |
| **M1: Monolith** | All contexts share one DB connection | Single PostgreSQL, 4 schemas |
| **M2: Extract Task** | `TaskService` gets its own `DATABASE_URL` â†’ `tasks` schema | No migration â€” schema already isolated |
| **M3: Extract Taxonomy** | `TaxonomyService` gets its own `DATABASE_URL` â†’ `taxonomy` schema | No migration â€” schema already isolated |
| **M4: Full Mesh** | Each service on its own PostgreSQL instance | `pg_dump --schema=<name>` per service |

---
[? Back to Index](./README.md)
