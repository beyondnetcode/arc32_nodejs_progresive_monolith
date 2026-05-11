# 🔬 Product Scope & Boundaries - To-Do Reference Architecture

## 1. In-Scope Capabilities
The system delivers atomic task management scoped to isolated users, demonstrating modular architectural patterns.

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
- **Multi-Factor Authentication**: Not included. Kept as simple JWT username/pass for template speed.
- **Advanced Search Engines**: No Elasticsearch integrations. Standard relational indexed filtering only.
- **Recurring Tasks**: Temporal recurrence loops are omitted.
