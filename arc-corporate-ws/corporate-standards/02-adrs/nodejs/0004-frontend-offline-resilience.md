# ADR 0004: Frontend Offline Resilience

## Status
Approved

## Date
2026-05-08

## Context
Web applications that depend entirely on server connectivity provide a poor user experience when network conditions are degraded (mobile connections, slow corporate VPNs). Users lose unsaved state and receive cryptic error messages instead of graceful degradation.

## Decision
Implement offline resilience in the frontend layer using **React Query** (TanStack Query) as the primary client-side state and cache management solution.

Key strategies:
- **Stale-While-Revalidate**: Serve cached data immediately while fetching updates in the background.
- **Optimistic Updates**: Apply mutations to the UI instantly before the server confirms, with automatic rollback on failure.
- **Background Sync**: Queue mutations made offline and replay them when connectivity is restored.
- **Retry Logic**: Automatic exponential backoff for failed requests (configurable per query).

## Consequences

### Positive
- Users see data immediately on navigation — no loading spinners for cached content.
- Forms and mutations feel instantaneous via optimistic updates.
- Graceful offline mode: the app remains usable for read operations even without connectivity.

### Negative
- Optimistic updates require careful rollback logic for complex, multi-step mutations.
- Developers must understand the cache invalidation model to prevent stale data issues.

## References
- [TanStack Query Documentation](https://tanstack.com/query)
- [ADR-0011: Fault Tolerance & Resiliency Patterns](./0011-fault-tolerance-resiliency-patterns.md)