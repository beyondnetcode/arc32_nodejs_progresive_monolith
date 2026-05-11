# ADR 0024: Centralized Configuration & Feature Platform

## Status
Approved

## Date
2026-05-09

## Context
Modern SaaS demands total runtime agility. Rigidly encoding Identity Provider bindings, operational variables (e.g. session TTL, company branding), or feature flag parameters directly into application environment variables creates heavy deploy friction, invalidates immediate auditing, and kills flexible tenant-specific personalization at runtime.

## Decision
Introduce an authoritative **Configuration & Feature Management Bounded Context** consolidating system behaviors:

1. **Dynamic IdP Store**: Shift identity configurations out of environment files into multi-tenant database pools, encrypted with AES-256 referencing external secret vaults. Allows changing tenant SSO providers instantly with zero code push.
2. **System Dynamics**: Deliver versioned JSON settings governing behaviors (MFA requirements, branding, feature access) read directly by application controllers at lifecycle instantiation or real-time socket pushes.
3. **Flag Framework**: Deploy an integrated Boolean/Variant Flag engine supporting deep multidimensional targeting (Role, Environment, Branch, Group) and percentage-based traffic splitting.
4. **Redis Velocity Layer**: Isolate config evaluations into dedicated Redis namespaces (`cfg:*`, `flags:*`), guaranteeing sub-3ms decision evaluations at execution intersections.

## Consequences

### Positive
- True dynamic multitenancy: systems adapt in real-time per company profile without reloads.
- Complete lifecycle tracking: any configuration pivot creates absolute historical records.
- Direct risk isolation through safe incremental rollout gates.

### Negative
- Modest expansion of database schema topology and active Redis key governance strategies.

## References
- [ADR-0025: Feature Flag Abstraction Strategy](./0025-feature-flag-provider-abstraction.md)
- [ADR-0014: Redis Cache Strategy](./0014-distributed-caching-strategy-redis.md)