# ADR 0006: Future Microservices Transition with Dapr Sidecars

## Status
Approved — Backlog (Phase 3 Milestone)

## Date
2026-05-08

## Context
The system is currently a Modular Monolith (single process, logically isolated bounded contexts). As business requirements scale — higher traffic, independent deployment cycles, or polyglot service integration — a clear and safe path to microservices is required. The transition must not require rewriting any domain logic.

## Decision
Adopt **Dapr (Distributed Application Runtime)** as the microservices sidecar runtime when splitting the monolith into independent services.

**Migration milestones:**

| Milestone | Description |
| :--- | :--- |
| **M1 — Modular Monolith** | Current state. Single process with isolated bounded context modules. |
| **M2 — Service Extraction** | High-traffic or independently-deployable contexts extracted as Nx micro-projects. Each gets its own database schema (ADR-0031) and communicates via gRPC or Dapr. |
| **M3 — Full Mesh** | All services run with Dapr Sidecars. Service-to-Service invocation, Pub/Sub, and State are managed by Dapr components (declarative YAML). |

**Key constraint:** The domain Core must change **zero lines** when Dapr is introduced. All Dapr SDK calls are wrapped behind existing `IEventBusPort` and `ICachePort` abstractions (ADR-0015, ADR-0014).

## Consequences

### Positive
- Polyglot architecture: other services can be written in Go or Python while sharing Dapr capabilities.
- Swapping infrastructure (Redis → Kafka, PostgreSQL → Cosmos DB) requires only a Dapr component YAML change.
- Native retry policies, circuit breakers, and distributed tracing built into Dapr sidecar.

### Negative
- Adds Kubernetes/container orchestration as a prerequisite for the full mesh phase.
- Local Dapr development adds sidecar process overhead per service.

## References
- [ADR-0015: Event-Driven Architecture](./0015-event-driven-architecture-intra-domain.md)
- [ADR-0031: Schema-per-Context & Domain Event Catalog](./0031-schema-per-context-domain-event-catalog.md)
- [Dapr Documentation](https://dapr.io)