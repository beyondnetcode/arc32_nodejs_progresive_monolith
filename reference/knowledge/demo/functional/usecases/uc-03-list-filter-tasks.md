# Use Case 3: List Personal Tasks

Specification for querying existing user task workloads.

## 1. Use Case Definition

| Attribute | Specification |
| :--- | :--- |
| **Name** | List Tasks |
| **Primary Actor** | Authenticated User |
| **Preconditions** | User possesses a valid JWT token. |
| **Postconditions** | An array of task objects belonging to the User is retrieved. |

## 2. Transaction Flow

```mermaid
sequenceDiagram
 autonumber
 actor User as User
 participant API as NestJS API
 participant Cache as Redis
 participant DB as PostgreSQL

 User->>API: GET /tasks?status=PENDING
 API->>Cache: Check cache key `tasks:{user_id}:pending`
 alt Cache Miss
 API->>DB: SELECT * FROM task WHERE user_id = ? AND status = ?
 DB-->>API: Data payload
 API->>Cache: Store payload (TTL=60s)
 else Cache Hit
 Cache-->>API: Return stored JSON payload
 end
 API-->>User: Return collection JSON
```

### A. Main Flow
1. User accesses the "My Tasks" dashboard.
2. Client calls the `/tasks` endpoint.
3. The API uses read-aside caching logic: first checking Redis for the scoped result.
4. If missing, queries Postgres, caches the result, and serves the requester.

---
[Back to Index](./README.md)
