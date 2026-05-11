# 🗺️ Master Documentation Index — Reference Platform Architectures

Welcome to the centralized guide for navigating the complete **Node.js Corporate Reference Architecture (ARC32)**. This documentation defines the enterprise blueprint governing modular monoliths scalable to distributed SaaS microservices.

---

## 🎯 Phase 00: Product Vision & Strategic Alignment
High-level scoping and target business metrics.
*   [Business Context](./00-product/business-context.md)
*   [Product Vision](./00-product/product-vision.md)
*   [Strategic Scope & Limits](./00-product/scope.md)
*   [Key Objectives](./00-product/objectives.md)

## 📋 Phase 01: Domain Domain Requirements
Ubiquitous language definition and atomized flows.
*   [DDD Ubiquitous Glossary](./01-requirements/glossary.md)
*   [Conceptual Relational Model](./01-requirements/conceptual-data-model.md)
*   ### Atomic Use Cases
    *   [UC-01: User Authentication (Local)](./01-requirements/usecases/uc-01-user-authentication.md)
    *   [UC-02: Create To-Do Task](./01-requirements/usecases/uc-02-create-todo-task.md)
    *   [UC-03: List Personal Tasks](./01-requirements/usecases/uc-03-list-filter-tasks.md)
    *   [UC-04: Manage Task Tags](./01-requirements/usecases/uc-04-manage-task-tags.md)

## 🏗️ Phase 02: Architectural Specifications (ARC32)
Technical layout, topology, and C4 Model definitions.
*   👉 **[Node.js Corporate Reference Blueprint](./02-architecture/reference-architecture-nodejs-arc42.md)** *(Mandatory Reading)*
*   [C4 Model Specification & Container View](./02-architecture/architecture-spec.md)
*   [Bounded Context Domain Mapping](./02-architecture/bounded-context-map.md)
*   [Tactical DDD Standard Evaluation](./02-architecture/nestjslatam-ddd-evaluation.md)

---

## 📜 Phase 03: Architectural Decision Records (ADRs)
The canonical system blueprint ledger consisting of all 30 fully approved records.

### Core Foundation & Tooling
*   [ADR 0001: Monorepo Orchestration with Nx](./03-adrs/0001-monorepo-orchestration-nx.md)
*   [ADR 0002: Clean Hexagonal Boundaries](./03-adrs/0002-clean-architecture-nestjs.md)
*   [ADR 0003: Strict TypeScript Standards](./03-adrs/0003-strict-typescript-standards.md)
*   [ADR 0004: Frontend Offline Resilience](./03-adrs/0004-frontend-offline-resilience.md)
*   [ADR 0005: CI/CD Quality with CodeQL](./03-adrs/0005-ci-cd-quality-codeql.md)
*   [ADR 0009: Strict Dependency Pinning](./03-adrs/0009-strict-dependency-pinning-vulnerability-management.md)
*   [ADR 0018: Testing Pyramid & Quality Gates](./03-adrs/0018-testing-pyramid-quality-gates.md)

### SaaS, Distribution & Scalability
*   [ADR 0006: Future Microservices with Dapr](./03-adrs/0006-future-microservices-transition-dapr.md)
*   [ADR 0007: Telemetry with OTel & Loki](./03-adrs/0007-observability-telemetry-loki-opentelemetry.md)
*   [ADR 0008: Progressive Multi-Module & BFF](./03-adrs/0008-progressive-multimodule-evolution-gateway-bff.md)
*   [ADR 0010: Multi-Tenancy Architecture (RLS)](./03-adrs/0010-multi-tenancy-architecture-strategy.md)
*   [ADR 0011: Resiliency Patterns (Circuit Breakers)](./03-adrs/0011-fault-tolerance-resiliency-patterns.md)
*   [ADR 0013: Cloud Topology & DR](./03-adrs/0013-cloud-infrastructure-topology-dr.md)
*   [ADR 0014: Distributed Caching (Redis)](./03-adrs/0014-distributed-caching-strategy-redis.md)
*   [ADR 0015: Event-Driven Architecture](./03-adrs/0015-event-driven-architecture-intra-domain.md)
*   [ADR 0029: Tactical DDD Primitives](./03-adrs/0029-tactical-ddd-primitives-library.md)
*   [ADR 0030: API Gateway Strategy - Kong vs NestJS](./03-adrs/0030-api-gateway-kong-vs-nestjs.md)
*   [ADR 0031: Schema-per-Context and Domain Event Catalog](./03-adrs/0031-schema-per-context-domain-event-catalog.md)
*   [ADR 0032: API Protocol Selection Matrix (REST, gRPC, GraphQL)](./03-adrs/0032-api-protocol-decision-matrix-rest-grpc-graphql.md)

### Security & Features Governance
*   [ADR 0012: Advanced Authorization (RBAC/ABAC)](./03-adrs/0012-advanced-authorization-rbac-abac.md)
*   [ADR 0017: Feature Flagging Strategy](./03-adrs/0017-feature-flagging-strategy.md)
*   [ADR 0020: Identity Provider Abstraction](./03-adrs/0020-identity-provider-abstraction-strategy.md)
*   [ADR 0021: High Performance Auth Graphs](./03-adrs/0021-high-performance-auth-and-graph-compilation.md)
*   [ADR 0022: Contextual Pluggable Projections](./03-adrs/0022-contextual-auth-and-pluggable-projections.md)
*   [ADR 0023: Centralized Auth Kernel Boundary](./03-adrs/0023-centralized-ums-vs-decentralized-access.md)
*   [ADR 0024: Config & Feature Platform](./03-adrs/0024-configuration-feature-management-platform.md)
*   [ADR 0025: Feature Flag Abstraction](./03-adrs/0025-feature-flag-provider-abstraction.md)
*   [ADR 0026: MFA & Adaptive Auth](./03-adrs/0026-mfa-passwordless-adaptive-authentication.md)

### Patterns & Protocols
*   [ADR 0019: Tactical Functional Design (Result)](./03-adrs/0019-tactical-design-patterns-future-proofing.md)
*   [ADR 0027: Dual-Protocol REST & gRPC](./03-adrs/0027-dual-protocol-rest-grpc-api-gateway.md)
*   [ADR 0028: Self-Hosted OSS Infrastructure](./03-adrs/0028-self-hosted-hybrid-infrastructure-on-premise.md)
*   [ADR 0029: Tactical DDD Primitives](./03-adrs/0029-tactical-ddd-primitives-library.md)

---

## 🛠️ Phase 04: Supporting Engineering Artifacts
Non-negotiable standards, testing contracts, and playbooks.
*   [Global Engineering Standards Manifesto](./04-artifacts/engineering-standards.md)
*   [Contract Testing Plan (Pact)](./04-artifacts/contract-testing-plan.md)
*   [Kong Gateway Configuration Guide](./04-artifacts/kong-plugins-configuration-guide.md)
*   [Observability & Tracing Playbook](./04-artifacts/observability-strategy.md)
*   [Ums to ToDo Refactor Audit Plan](./04-artifacts/pivot-plan-ums-to-todo.md)
