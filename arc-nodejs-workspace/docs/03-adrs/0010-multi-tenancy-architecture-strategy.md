# ADR 0010: Multi-Tenancy Architecture Strategy for SaaS Evolution

## Status
Approved

## Date
2026-05-08

## Context
As the system matures into a SaaS offering, we must isolate data for multiple tenants securely without exploding cloud infrastructure bills. There are three main partitioning approaches:
1. **Database-per-Tenant**: Max isolation, maximum operational cost overhead.
2. **Schema-per-Tenant**: Logical separation, but harder schema migration management.
3. **Shared Database (Pooled)**: Single table space, discriminator IDs, high efficiency but potential data leakage if developers forget WHERE clauses.

We need absolute leakage prevention alongside efficient resource scaling.

## Decision
Adopt a **Hybrid "Pooled" Multi-Tenancy Strategy with PostgreSQL Row-Level Security (RLS)** as the default mode:

1. **Database-Level Isolation**: Leverage PostgreSQL native **Row-Level Security (RLS)**. The database engine filters rows directly using transaction variables set by the driver. Even if an ORM query neglects a filter, the database blocks leaking cross-tenant data automatically.
2. **Execution Scoping**: Pass `tenant_id` claims in the JWT. Use NestJS `AsyncLocalStorage` to store the current tenant context per-request, which the Persistence Adapter picks up to lock down the SQL session at connection instantiation.
3. **VIP Isolation Readiness**: While 90% share the pool, the infrastructure must abstraction must support routing Enterprise clients to fully isolated physical databases via separate connection pools based on their `tenant_id` context.

## Consequences

### Positive
- **Bulletproof Security**: Row isolation is enforced natively in Postgres engine, not trusted to error-prone backend application code.
- **Extreme Scalability**: Run hundreds of basic tenants on a single Postgres instance without managing hundreds of separate schemas.
- **Simplified Upgrades**: One single migration path applies cleanly to all Pooled tenants instantly.

### Negative
- **Noisy Neighbors**: A rogue query by one tenant can steal hardware capability. Requires strict throttling strategies.
- **Restore Complexity**: Restoring the data lifecycle of only *one* tenant from backup is significantly more labor-intensive in a pooled model.

## References
- [PostgreSQL RLS Documentation](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- [ADR-0031: Schema-per-Context Strategy](./0031-schema-per-context-domain-event-catalog.md)