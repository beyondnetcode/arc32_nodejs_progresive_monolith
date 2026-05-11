# 🗺️ Master Navigation Map - To-Do Reference Architecture

Welcome to the master technical documentation for the **Classic To-Do Reference Skeleton**. This knowledge base is structured under the **bMAD Method** to guarantee maximum discoverability and traceability for developers exploring advanced NodeJS architecture.

---

## 🧭 Phase-Based Navigation Index

### 🎯 [Phase 00 - Product Vision](./00-product/)
Defines the value proposition and conceptual boundaries of the reference skeleton.
*   📄 **[Product Vision](./00-product/product-vision.md)**: Architecture-as-the-product strategy and core engineering pillars.
*   📄 **[Business Context](./00-product/business-context.md)**: Problem statement, proposed solution, and conceptual structure.
*   📄 **[Scope and Boundaries](./00-product/scope.md)**: Detailed In-Scope and Out-of-Scope technical constraints.
*   📄 **[Strategic Objectives (OKRs)](./00-product/objectives.md)**: Benchmarks for performance and maintainability.

---

### 📋 [Phase 01 - Domain Requirements](./01-requirements/)
Details simplified domain model and core use cases.
*   📄 **[Glossary of Terms (Ubiquitous Language)](./01-requirements/glossary.md)**: Dictionary of Core Task-related domain terms.
*   📄 **[Conceptual Data Model](./01-requirements/conceptual-data-model.md)**: Basic User-Task relational diagram.
*   📂 **[Atomic Use Cases](./01-requirements/usecases/)**:
    *   [UC-01: User Authentication (Local)](./01-requirements/usecases/uc-01-user-authentication.md)
    *   [UC-02: Create To-Do Task](./01-requirements/usecases/uc-02-create-todo-task.md)
    *   [UC-03: List Personal Tasks](./01-requirements/usecases/uc-03-list-filter-tasks.md)
    *   [UC-04: Manage Task Tags](./01-requirements/usecases/uc-04-manage-task-tags.md)

---

### 🏗️ [Phase 02 - Software Architecture](./02-architecture/)
Contains the system's architectural specification based on the C4 Model and Technology Stack.
*   📄 **[Bounded Context Map](./02-architecture/bounded-context-map.md)**: DDD context boundaries (Auth context vs Task context).
*   📄 **[C4 Architecture Spec](./02-architecture/architecture-spec.md)**: Structural container and component diagrams.
*   📄 **[Authoritative Technology Stack](./02-architecture/stack.md)**: Definitive list of approved node technologies.
*   📄 **[NestJS Latam DDD Evaluation](./02-architecture/nestjslatam-ddd-evaluation.md)**: Tactical design assessment.

---

### 📜 [Phase 03 - Architectural Decision Records (ADRs)](./03-adrs/)
The ledger of architectural design decisions. Access the repository folder for full details.

#### 🟢 APPROVED & ACCEPTED
| ADR ID | Decision Title | Status | Impact |
| :--- | :--- | :--- | :--- |
| **ADR-0001** | [Monorepo Orchestration with Nx](./03-adrs/0001-monorepo-orchestration-nx.md) | 🟢 Accepted | Baseline |
| **ADR-0002** | [Clean Architecture & Hexagonal](./03-adrs/0002-clean-architecture-nestjs.md) | 🟢 Accepted | Baseline |
| **ADR-0003** | [Strict TypeScript Standards](./03-adrs/0003-strict-typescript-standards.md) | 🟢 Accepted | Baseline |
| **ADR-0004** | [React Query Offline Resilience](./03-adrs/0004-frontend-offline-resilience.md) | 🟢 Accepted | Client |
| **ADR-0005** | [CI-CD Quality CodeQL](./03-adrs/0005-ci-cd-quality-codeql.md) | 🟢 Accepted | Security |
| **ADR-0006** | [Future Microservices Dapr](./03-adrs/0006-future-microservices-transition-dapr.md) | 🟢 Accepted | Evolution |
| **ADR-0007** | [Loki & OpenTelemetry Strategy](./03-adrs/0007-observability-telemetry-loki-opentelemetry.md) | 🟢 Accepted | Telemetry |
| **ADR-0008** | [Gateway and BFF Patterns](./03-adrs/0008-progressive-multimodule-evolution-gateway-bff.md) | 🟢 Accepted | Layout |
| **ADR-0009** | [Strict Dependency Pinning](./03-adrs/0009-strict-dependency-pinning-vulnerability-management.md) | 🟢 Accepted | Security |
| **ADR-0010** | [Fault Tolerance & Resiliency](./03-adrs/0010-fault-tolerance-resiliency-patterns.md) | 🟢 Accepted | Reliability |
| **ADR-0011** | [Cloud Infrastructure & DR](./03-adrs/0011-cloud-infrastructure-topology-dr.md) | 🟢 Accepted | Infra |
| **ADR-0012** | [Distributed Caching (Redis)](./03-adrs/0012-distributed-caching-strategy-redis.md) | 🟢 Accepted | Perf |
| **ADR-0013** | [Event-Driven Architecture](./03-adrs/0013-event-driven-architecture-intra-domain.md) | 🟢 Accepted | Async |
| **ADR-0014** | [Immutable Business Audit Trail](./03-adrs/0014-immutable-business-audit-trail.md) | 🟢 Accepted | Audit |
| **ADR-0015** | [Testing Pyramid Quality Gates](./03-adrs/0015-testing-pyramid-quality-gates.md) | 🟢 Accepted | QA |
| **ADR-0016** | [Tactical Domain Patterns](./03-adrs/0016-tactical-design-patterns-future-proofing.md) | 🟢 Accepted | Design |
| **ADR-0017** | [Dual-Protocol REST & gRPC](./03-adrs/0017-dual-protocol-rest-grpc-api-gateway.md) | 🟢 Accepted | Interfaces |
| **ADR-0018** | [Self-Hosted Hybrid Infra](./03-adrs/0018-self-hosted-hybrid-infrastructure-on-premise.md) | 🟢 Accepted | Agnostic |
| **ADR-0019** | [Tactical DDD Primitives](./03-adrs/0019-tactical-ddd-primitives-library.md) | 🟢 Accepted | Tactics |
| **ADR-0020** | [API Gateway Kong vs NestJS](./03-adrs/0020-api-gateway-kong-vs-nestjs.md) | 🟢 Accepted | Ingress |

---

### 🛠️ [Phase 04 - Engineering Standards and Artifacts](./04-artifacts/)
Technical guidelines and operational assessments.
*   📄 **[Global Engineering Standards](./04-artifacts/engineering-standards.md)**: SOLID, Clean Code, and OWASP rules.
*   📄 **[Contract Testing Plan](./04-artifacts/contract-testing-plan.md)**: Micro-contract safety via Pact JS.
*   📄 **[Distributed Observability Strategy](./04-artifacts/observability-strategy.md)**: Telemetry pipeline definitions.
*   📄 **[Pivot Master Plan (Audit Log)](./04-artifacts/pivot-plan-Reference Skeleton-to-todo.md)**: History of the scope transition from Reference Skeleton to To-Do.
*   📄 **[Architecture Maturity Model](./04-artifacts/architecture-maturity-model.md)**: Assessment framework.
*   📄 **[Kong Plugins Config Guide](./04-artifacts/kong-plugins-configuration-guide.md)**: Edge gateway tooling.

---

### 📈 [Phase 05 - Release Roadmap](./05-roadmap/)
*   📄 **[Versioning & Release Strategy](./05-roadmap/versioning-and-audit-strategy.md)**: Publication strategy utilizing Nx Release.
