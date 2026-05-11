# ADR 0006: Future Microservices Transition via Dapr Sidecars

## Status
Proposed / Deferred

## Context
Currently, the Reference Solution monorepo is structured as a **Modular Monolith**. This minimizes infrastructure cost and complexity during prototyping. However, as traffic scales or domain contexts (e.g., Notification Engines, Data Analytics) grow highly coupled, we need a clear roadmap to transition to distributed microservices without refactoring core business logic.

## Decision
We establish a path where if a domain context needs elastic scalability independently, it can be broken out into an independent deployment node. 

1. We will use the **Dapr (Distributed Application Runtime)** sidecar model.
2. Domain Core will NEVER contain Dapr-specific imports. It communicates with local ports (e.g., `IPubSubPort`), and infrastructure adapters map to local `EventEmitter2` during the monolith phase, instantly switchable to `Dapr SDK` adapters for distributed environments.

## Consequences
- **Pros**: Zero rewrite required when transitioning.
- **Cons**: Requires careful domain event discipline early on.
