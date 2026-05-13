# 📜 Architectural Decision Record (ADR) Navigator

> 🌐 **Bilingual Navigation:** [🇪🇸 Versión en Español](../../corporate-standards-es/02-adrs/README.md)


Welcome to the system's legal repository. All decisions contained herein have been approved by the Corporate Architectural Board.

---

## <a name="universal-core"></a>🧠 1. Universal Core (Runtime Agnostic)
Decisions applicable to any product built on top of the framework, regardless of the language.

*   [ADR 0001: Monorepo Orchestration (Nx)](../02-adrs/core/0001-monorepo-orchestration-nx.md)
*   [ADR 0005: CI/CD Quality (CodeQL)](../02-adrs/core/0005-ci-cd-quality-codeql.md)
*   [ADR 0006: Future Microservices (Dapr)](../02-adrs/core/0006-future-microservices-transition-dapr.md)
*   [ADR 0009: Strict Dependency Pinning](../02-adrs/core/0009-strict-dependency-pinning-vulnerability-management.md)
*   [ADR 0010: Multi-Tenancy RLS Strategy](../02-adrs/core/0010-multi-tenancy-architecture-strategy.md)
*   [ADR 0011: Resiliency Patterns](../02-adrs/core/0011-fault-tolerance-resiliency-patterns.md)
*   [ADR 0013: Cloud Topology & DR](../02-adrs/core/0013-cloud-infrastructure-topology-dr.md)
*   [ADR 0014: Distributed Caching (Redis)](../02-adrs/core/0014-distributed-caching-strategy-redis.md)
*   [ADR 0015: Injectable Event Bus](../02-adrs/core/0015-event-driven-architecture-intra-domain.md)
*   [ADR 0016: Immutable Audit Trail](../02-adrs/core/0016-immutable-business-audit-trail.md)
*   [ADR 0017: Feature Flagging Strategy](../02-adrs/core/0017-feature-flagging-strategy.md)
*   [ADR 0018: Testing Pyramid Theory](../02-adrs/core/0018-testing-pyramid-quality-gates.md)
*   [ADR 0019: Tactical Functional Design](../02-adrs/core/0019-tactical-design-patterns-future-proofing.md)
*   [ADR 0020: IdP Abstraction](../02-adrs/core/0020-identity-provider-abstraction-strategy.md)
*   [ADR 0024: Config & Feature Platform](../02-adrs/core/0024-configuration-feature-management-platform.md)
*   [ADR 0025: Feature Flag Provider Abstraction](../02-adrs/core/0025-feature-flag-provider-abstraction.md)
*   [ADR 0028: Self-Hosted OSS Infrastructure](../02-adrs/core/0028-self-hosted-hybrid-infrastructure-on-premise.md)
*   [ADR 0030: API Gateway (Kong vs Nest)](../02-adrs/core/0030-api-gateway-kong-vs-nestjs.md)
*   [ADR 0031: Isolated Schema Per Context](../02-adrs/core/0031-schema-per-context-domain-event-catalog.md)
*   [ADR 0032: Protocol Selection Matrix](../02-adrs/core/0032-api-protocol-decision-matrix-rest-grpc-graphql.md)
*   [ADR 0033: Transactional Outbox](../02-adrs/core/0033-transactional-outbox-pattern.md)
*   [ADR 0034: CQRS Applicability](../02-adrs/core/0034-cqrs-pattern-applicability-matrix.md)
*   [ADR 0035: Distributed Sagas](../02-adrs/core/0035-distributed-saga-pattern-strategy.md)
*   [ADR 0036: Message Bus Delivery Strategy](../02-adrs/core/0036-message-bus-delivery-strategy-fifo-dlq.md)
*   [ADR 0037: Performance & Chaos Verification](../02-adrs/core/0037-performance-concurrency-chaos-strategy.md)
*   [ADR 0039: Deployment Topology Switcher](../02-adrs/core/0039-deployment-topology-abstraction-switcher.md)
*   **[ADR 0040: Multi-Runtime Matrix & Contracts](../02-adrs/core/0040-multi-runtime-selection-contracts.md)** *(Root Governance)*
*   [ADR 0044: Configurable Security Persistence Strategy](../02-adrs/core/0044-configurable-security-persistence-strategy.md)
*   [ADR 0045: Microservice Extraction Readiness Criteria](../02-adrs/core/0045-microservice-extraction-readiness-criteria.md)
*   [ADR 0046: Dapr Adoption & Unified Observability](../02-adrs/core/0046-dapr-unified-observability.md)
*   [ADR 0047: Selection Framework: Monolith vs SOA vs Microservices](../02-adrs/core/0047-architectural-patterns-monolith-soa-microservices.md)

---

## <a name="nodejs-typescript"></a>🟢 2. Node.js / TypeScript Ecosystem
Decisions tied to the primary runtime for APIs and BFFs.

*   [ADR 0002: Clean Architecture NestJS](../02-adrs/nodejs/0002-clean-architecture-nestjs.md)
*   [ADR 0003: Strict TS Standards](../02-adrs/nodejs/0003-strict-typescript-standards.md)
*   [ADR 0004: Frontend Offline Resilience](../02-adrs/nodejs/0004-frontend-offline-resilience.md)
*   [ADR 0007: Observability Telemetry OTel](../02-adrs/nodejs/0007-observability-telemetry-loki-opentelemetry.md)
*   [ADR 0008: Progressive BFF Evolution](../02-adrs/nodejs/0008-progressive-multimodule-evolution-gateway-bff.md)
*   [ADR 0012: Auth RBAC/ABAC Guards](../02-adrs/nodejs/0012-advanced-authorization-rbac-abac.md)
*   [ADR 0021: Auth Graph Compilation](../02-adrs/nodejs/0021-high-performance-auth-and-graph-compilation.md)
*   [ADR 0022: Contextual Projections](../02-adrs/nodejs/0022-contextual-auth-and-pluggable-projections.md)
*   [ADR 0023: Centralized Kernel Boundary](../02-adrs/nodejs/0023-centralized-ums-vs-decentralized-access.md)
*   [ADR 0026: MFA Adaptive Implementation](../02-adrs/nodejs/0026-mfa-passwordless-adaptive-authentication.md)
*   [ADR 0027: Dual-Protocol Node Setup](../02-adrs/nodejs/0027-dual-protocol-rest-grpc-api-gateway.md)
*   [ADR 0029: Tactical DDD Primitives](../02-adrs/nodejs/0029-tactical-ddd-primitives-library.md)
*   [ADR 0038: Result Pattern TS Implementation](../02-adrs/nodejs/0038-error-handling-result-pattern-strategy.md)
*   [ADR 0043: Data Access Strategy & ORM](../02-adrs/nodejs/0043-data-access-orm-strategy.md)

---

## <a name="net-c"></a>🔵 3. .NET (C#) Ecosystem
Decisions tied to high-compute runtimes.

*   **[ADR 0041: Canonical .NET Backend Architecture](../02-adrs/dotnet/0041-canonical-dotnet-backend-architecture.md)**
*   [ADR 0048: .NET API Endpoint Strategy](../02-adrs/dotnet/0048-enterprise-minimal-apis-adoption.md)

---

## <a name="android-native"></a>🟣 4. Android Native (Kotlin) Ecosystem
Decisions tied to resilient mobile clients.

*   **[ADR 0042: Canonical Android Mobile Architecture](../02-adrs/android/0042-canonical-android-mobile-architecture.md)**

---

## ADRs for AI-Augmented Architecture (Optional Section)

| ID | Title | Status |
|----|--------|--------|
| ADR-AI-001 | Harness Engineering as agentic standard | Proposed |
| ADR-AI-002 | MCP as agent-service integration protocol | Proposed |
| ADR-AI-003 | Model selection and governance criteria | Proposed |
| ADR-AI-004 | AGENTS.md as mandatory artifact (level 1+) | Proposed |
| ADR-AI-005 | Human-in-the-Loop policy for irreversible operations | Proposed |

→ [View all AI ADRs](../ai-augmented/06-adrs/README.md)
