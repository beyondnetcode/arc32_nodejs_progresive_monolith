# ADR 0014: Distributed Caching Strategy with Redis

## Status
Approved

## Date
2026-05-08

## Context
Repetitive, high-intensity read throughput during peak operational hours can completely starve physical PostgreSQL resources. Reading generic configuration catalogues, constant status lookups, or frequently access aggregates from raw disks leads to slow responses and unmanageable load scales.

## Decision
Incorporate a high-speed **Redis** distributed cluster to implement side-channel fast read pathways:

1. **Transparent Architecture**: Integrate `@nestjs/cache-manager` solely behind our Infrastructure Adapter walls. Core domains communicate with explicit `ICachePort` interfaces, remaining 100% ignorant of concrete Redis dependencies.
2. **Read-Aside Execution**: Cache-compatible reads must seek the cache gateway first. If hit: return immediately under <20ms. If missed: fetch authoritative DB rows, synchronously populate the cache via TTL settings, then return the result to requester.
3. **Eviction Enforcement**: Data write use cases executing mutative changes must publish explicit trigger paths that command synchronous cache entry invalidation to prevent stale reading periods.

## Consequences

### Positive
- Offloads immense query volume from the relational SQL engine.
- Achieves sustained API latency spikes frequently under <50ms for pre-warmed objects.
- Boosts user engagement and experience smoothness for critical app zones.

### Negative
- Cache Invalidation logic creates a non-trivial surface area for synchronization bugs ("Cache is hard" rule).
- Introduces additional persistence-related hardware node setup in operation blueprints.

## References
- [Redis Cache-Aside Pattern](https://redis.io/docs/develop/cache/)
- [ADR-0002: Clean Hexagonal Architecture](./0002-clean-architecture-nestjs.md)