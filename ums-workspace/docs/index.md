# 🗺️ Master Navigation Map - UMS Knowledge Base

Welcome to the master technical documentation for the **User Management System (UMS)**. This knowledge base is structured under the **bMAD Method (numerical sequential phases)** to guarantee maximum discoverability, traceability, and seamless support for both human developers and autonomous AI copilots.

---

## 🧭 Phase-Based Navigation Index

### 🎯 [Phase 00 - Product Vision](./00-product/)
Defines the business context, product strategic pillars, and the map of stakeholders.
*   📄 **[Product Vision](./00-product/product-vision.md)**: Sovereign identity pillars, authentication delegation, and dynamic multi-tenancy.
*   📄 **[Business Context](./00-product/business-context.md)**: Problem statement, proposed solution, and conceptual integration diagrams.
*   📄 **[Scope and Boundaries](./00-product/scope.md)**: Detailed In-Scope and Out-of-Scope capabilities.
*   📄 **[Strategic Objectives (OKRs)](./00-product/objectives.md)**: Quantifiable metrics and KRs for security, latency, and self-service.
*   📄 **[Stakeholders Map](./00-product/stakeholders.md)**: Responsibility matrix and expectation mappings for technical and business roles.

---

### 📋 [Phase 01 - Domain Requirements](./01-requirements/)
Details business rules, interactive sequences, conceptual database diagrams, and the formal Ubiquitous Language definition.
*   📄 **[Glossary of Terms (Ubiquitous Language)](./01-requirements/glossary.md)**: Formal DDD dictionary of the core domain.
*   📄 **[Conceptual Data Model](./01-requirements/conceptual-data-model.md)**: PostgreSQL relational logic and Row-Level Security (RLS) policies.
*   📄 **[Granular Permission Matrix](./01-requirements/permission-matrix-example.md)**: Detailed access logic (RBAC/ABAC) and the explicit-deny precedence rule.
*   📂 **[Atomic Use Cases](./01-requirements/usecases/)**:
    *   [UC-01: User Authentication via External IdP](./01-requirements/usecases/uc-01-user-authentication.md)
    *   [UC-02: Compile Authorization Graph](./01-requirements/usecases/uc-02-build-authorization-graph.md)
    *   [UC-03: Create & Instantiate Authorization Template](./01-requirements/usecases/uc-03-create-authorization-template.md)
    *   [UC-04: Register Organization & Configure IdP Strategy](./01-requirements/usecases/uc-04-register-organization.md)
    *   [UC-05: Register System & Define Menu Topology](./01-requirements/usecases/uc-05-register-system-topology.md)
    *   [UC-06: Create Profile & Manually Assign Template](./01-requirements/usecases/uc-06-create-profile-manual-template.md)
    *   [UC-07: Auto-Assign Template on Profile Creation](./01-requirements/usecases/uc-07-auto-assign-template.md)
    *   [UC-08: Diagnose Permissions via Visual Graph Resolver](./01-requirements/usecases/uc-08-visual-graph-resolver.md)
    *   [UC-09: Resolve Hierarchical System Configuration](./01-requirements/usecases/uc-09-resolve-hierarchical-config.md)

---

### 🏗️ [Phase 02 - Software Architecture](./02-architecture/)
Contains the system's architectural specification based on the C4 Model standard.
*   📄 **[Bounded Context Map](./02-architecture/bounded-context-map.md)**: DDD context boundaries, integration patterns, and Anti-Corruption Layers.
*   📄 **[C4 Architecture Spec & Technical Inventory](./02-architecture/architecture-spec.md)**: Level 1 (Context), Level 2 (Container), and Level 3 (Component) technical diagrams.


---

### 📜 [Phase 03 - Architectural Decision Records (ADRs)](./03-adrs/)
The chronological and immutable ledger of critical design decisions in MADR format.
*   📄 **[ADR Ledger](./03-adrs/)**: Access the complete index of **25 active architectural decisions** (ranging from Nx Monorepo, Clean Architecture, RLS, to Identity Provider Abstraction, High-Performance Graph Compilation, Pluggable Output Projections, Centralized Authorization Kernel, Configuration Platform, and Feature Flag Provider Abstraction).
*   📄 **[ADR-0024: Configuration & Feature Management Platform](./03-adrs/0024-configuration-feature-management-platform.md)**: Establishes Multi-IdP config, System Behavioral Config, and Feature Flag framework.
*   📄 **[ADR-0025: Feature Flag Provider Abstraction](./03-adrs/0025-feature-flag-provider-abstraction.md)**: Defines `IFeatureFlagPort` pluggable pattern — supports Internal engine, LaunchDarkly, Unleash, ConfigCat, Azure App Config.



---

### 🛠️ [Phase 04 - Engineering Standards and Artifacts](./04-artifacts/)
Technical guidelines, clean code rules, security standards, and technical quality plans.
*   📄 **[Global Engineering Standards](./04-artifacts/engineering-standards.md)**: SOLID, Clean Architecture, OWASP compliance, and DDD guidelines.
*   📄 **[Contract Testing Plan](./04-artifacts/contract-testing-plan.md)**: Safe microservices integration using Pact JS.
*   📄 **[Distributed Observability Strategy](./04-artifacts/observability-strategy.md)**: Unified telemetry using OpenTelemetry and Grafana Loki.
*   📄 **[Gap Analysis & Technical Debt](./04-artifacts/gap-analysis-and-optimization-plan.md)**: Architectural maturity assessment and technical mitigation plan.
*   📄 **[Enterprise IAM Spec](./04-artifacts/enterprise-iam-ums-specification.md)**: Dynamic authorization graph contracts and specifications.
*   📄 **[High-Concurrency Auth Spec](./04-artifacts/high-concurrency-auth-specification.md)**: Performance caching and token rotation schemas.
*   📄 **[UMS Web Console Product Spec](./04-artifacts/ums-web-console-product-scope.md)**: Administrative PAP control panel and SRE monitors.
*   📄 **[Configuration & Feature Management Platform Spec](./04-artifacts/ums-configuration-platform-spec.md)**: Multi-IdP config engine, system behavioral config, and feature flag framework.



---

### 📈 [Phase 05 - Release Roadmap](./05-roadmap/)
Code release strategies, continuous deployment, and deployment automation.
*   📄 **[Versioning & Release Strategy](./05-roadmap/versioning-and-audit-strategy.md)**: Tags management and publications utilizing Nx Release.
