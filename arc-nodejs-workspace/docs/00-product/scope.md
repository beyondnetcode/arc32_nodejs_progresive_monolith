# 🔬 Product Scope & Boundaries - To-Do Reference Architecture

## 1. In-Scope Capabilities
The system delivers atomic task management scoped to isolated users, demonstrating modular architectural patterns.

### 🚀 1.1 Master Technical Requirements & Evolution
The architecture is founded upon the following non-negotiable technical directives:
*   **Progressive Progression**: Initiated as a **Modular Monolith** (Nx based) to guarantee rapid initial time-to-market, explicitly designed via library boundaries to facilitate surgical extraction into **Microservices** in the future without refactoring domain code.
*   **High Concurrency Spikes**: The system MUST sustain sudden, non-uniform bursts of user load ("eventual picos") leveraging auto-scaling, 4-tier caching strategies, and non-blocking Event Buses.
*   **Transactional Integrity**: Every state mutation must be strictly atomic, preventing inconsistent write states through explicit Unit of Work controls.
*   **Secure, Dynamic & Extendible**: Implemented with Zero-Trust architecture principles, and fully decoupled infrastructure Adapters, ensuring new external tools or services can be hot-swapped dynamically over the system's lifetime without impacting core value streams.

### A. Multi-Tenant SaaS Strategy
- Absolute data isolation using shared database schemas bounded by PostgreSQL **Row-Level Security (RLS)**.
- Multi-channel routing via dedicated **BFF Gateways** to safeguard internal core.

### B. User Authentication & Ownership
- Support for basic login via email/password.
- Return of signed JWTs for authorization.
- Strict relational association: Users only see tasks belonging to their specific database key.

### B. Core Task Domain (CRUD)
- **Creation**: Allowing titles and description validation.
- **Categorization**: Grouping tasks into custom defined folders/buckets.
- **Tagging**: Associating multiple shared label keywords per task.
- **Filtering**: Reading back lists filtered by execution state, category, or applied tags.
- **Completion**: Toggling the discrete status state of a task.

### C. Observability & Diagnostics
- Automated trace tracking across Controller -> Application -> Persistence layers.
- Structured JSON output generation for aggregated logging.

### D. Immutable Business Auditing (Compliance)
- Injection of standardized `created_at/updated_at/version` metadata columns per physical table.
- Capture of immutable delta-state logs via Application-Level events tracking explicit user intent.

---

## 2. Out-of-Scope Capabilities
To prevent bloating the pure reference architecture:

- **Team Collaboration**: Tasks cannot be shared between users; there is no group assignment concept.
- **Multi-Factor Authentication (To-Do Domain)**: MFA is not a business requirement of the To-Do use cases themselves. However, the **enterprise SaaS architecture layer** fully implements MFA/Passkeys via ADR-0026 as a demonstrable pattern available for any system adopting this skeleton.
- **Advanced Search Engines**: No Elasticsearch integrations. Standard relational indexed filtering only.
- **Recurring Tasks**: Temporal recurrence loops are omitted.
