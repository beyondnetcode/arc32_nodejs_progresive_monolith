# 🔬 Functional Domain Scope - To-Do Sandbox App

## 1. Scope of Demonstration
The To-Do application delivers atomic task management scoped to isolated users, utilized exclusively to physically validate the underlying architectural patterns.

### A. Multi-Tenant SaaS Simulation
- Absolute data isolation using shared database schemas bounded by PostgreSQL **Row-Level Security (RLS)**.
- Multi-channel routing via dedicated **BFF Gateways** to safeguard internal core.

### B. User Authentication & Ownership
- Support for basic login via email/password.
- Return of signed JWTs for authorization.
- Strict relational association: Users only see tasks belonging to their specific database key.

### C. Core Task Domain (CRUD)
- **Creation**: Allowing titles and description validation.
- **Categorization**: Grouping tasks into custom defined folders/buckets.
- **Tagging**: Associating multiple shared label keywords per task.
- **Filtering**: Reading back lists filtered by execution state, category, or applied tags.
- **Completion**: Toggling the discrete status state of a task.

### D. Observability & Auditing (Implementation)
- Automated trace tracking across Controller -> Application -> Persistence layers.
- Structured JSON output generation for aggregated logging.
- Capture of immutable delta-state logs via Application-Level events tracking explicit user intent.

---

## 2. Explicitly Out-of-Scope (Demo Limit)
To prevent bloating the pure reference architecture:
- **Team Collaboration**: Tasks cannot be shared between users.
- **Advanced Search Engines**: No Elasticsearch integrations.
- **Recurring Tasks**: Temporal recurrence loops are omitted.
