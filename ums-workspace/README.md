# 🏢 User Management System (UMS) - Enterprise Monorepo

Welcome to the **User Management System (UMS)**, a highly resilient, enterprise-grade modular monolith built for **UMS**. This system is engineered to manage corporate identities, access control, and user lifecycles across the organization.

The UMS is built leveraging the **BMAD Method**, enforcing strict **Clean Architecture (Hexagonal)** principles, $0-cost observability (AOP), and rigorous CI/CD quality gates. 

> [!NOTE]
> **Progressive Design Disclaimer**: This repository serves as a reference base for 100% Node.js-based systems. While currently implemented as a single modular monolithic solution (UMS), the frontend architecture is built to preserve its structure as a unified entry portal. In the future, it will scale to integrate other corporate backends (such as TMS, WMS, etc.), which will be developed as independent, isolated services with their own databases. Communication will be routed through a central API Gateway, using the Backend For Frontend (BFF) pattern to optimize payloads for web and mobile clients (see [ADR 0008](./docs/architecture-design/adrs/0008-progressive-multimodule-evolution-gateway-bff.md)).


## 🛠️ Technology Stack
- **Backend**: NestJS (v10), TypeORM, PostgreSQL 16.
- **Frontend**: React (v18), Vite, Zustand, TanStack React Query.
- **Monorepo Orchestration**: Nx & npm Workspaces.
- **Security & Quality**: Husky, ESLint (SonarJS + Boundaries), CodeQL, GitHub Actions.

---

## 📚 Documentation Index & Navigation Guide

This repository contains extensive technical documentation following the **bMAD Method** and industry standards (C4 Model and Markdown Architectural Decision Records - MADR). Use the following curated guides to navigate the codebase:

### 📖 1. Standards & Mandates (Core)
*   👉 **[Global Engineering Standards & BMAD Manifesto](./docs/artifacts/engineering_standards.md)**: **MANDATORY reading**. Establishes the non-negotiable coding standards, SOLID, Clean Code, OWASP compliance, and optional DDD guidelines.

### 🏗️ 2. Architectural Design
*   👉 **[C4 Architecture Spec & Technical Inventory](./docs/architecture-design/architecture_spec.md)**: Details the Level 1 (System Context), Level 2 (Container), and Level 3 (Component) diagrams of the UMS, along with the physical technology inventory.
*   👉 **[Gap Analysis & Optimization Roadmap](./docs/artifacts/gap_analysis_and_optimization_plan.md)**: Analyzes the platform's architectural maturity against 16 Enterprise Quality Criteria and tracks active ADR implementations.

### 📜 3. Architectural Decision Records (ADRs)
Foundational engineering decisions grouped by architectural focus:

#### 🟢 General & Core Monorepo
*   [ADR 0001: Monorepo Orchestration with Nx and npm Workspaces](./docs/architecture-design/adrs/0001-monorepo-orchestration-nx.md)
*   [ADR 0002: Clean Architecture and Hexagonal Boundaries on NestJS](./docs/architecture-design/adrs/0002-clean-architecture-nestjs.md)
*   [ADR 0003: Strict TypeScript Standards and SonarJS Static Analysis](./docs/architecture-design/adrs/0003-strict-typescript-standards.md)
*   [ADR 0005: Zero-Cost Security and CI Pipeline with CodeQL](./docs/architecture-design/adrs/0005-ci-cd-quality-codeql.md)
*   [ADR 0009: Strict Dependency Pinning and Automated Vulnerability Management](./docs/architecture-design/adrs/0009-strict-dependency-pinning-vulnerability-management.md)

#### 🔵 Frontend & Client Integration
*   [ADR 0004: Frontend State Management and React Query Offline Architecture](./docs/architecture-design/adrs/0004-frontend-offline-resilience.md)
*   [ADR 0008: Progressive Multi-Module Evolution with API Gateway and BFF Patterns](./docs/architecture-design/adrs/0008-progressive-multimodule-evolution-gateway-bff.md)

#### 🟠 SaaS, Scalability & Resilience
*   [ADR 0006: Future Microservices Transition with Dapr Sidecars](./docs/architecture-design/adrs/0006-future-microservices-transition-dapr.md)
*   [ADR 0007: Observability Telemetry with Grafana Loki and OpenTelemetry](./docs/architecture-design/adrs/0007-observability-telemetry-loki-opentelemetry.md)
*   [ADR 0010: Multi-Tenancy Architecture Strategy for SaaS Evolution](./docs/architecture-design/adrs/0010-multi-tenancy-architecture-strategy.md)
*   [ADR 0011: Fault Tolerance & Resiliency Patterns (Circuit Breakers)](./docs/architecture-design/adrs/0011-fault-tolerance-resiliency-patterns.md)
*   [ADR 0012: Advanced Authorization (RBAC/ABAC)](./docs/architecture-design/adrs/0012-advanced-authorization-rbac-abac.md)
*   [ADR 0013: Cloud Infrastructure Topology & DR](./docs/architecture-design/adrs/0013-cloud-infrastructure-topology-dr.md)
*   [ADR 0014: Distributed Caching Strategy (Redis)](./docs/architecture-design/adrs/0014-distributed-caching-strategy-redis.md)
*   [ADR 0015: Event-Driven Architecture (EDA)](./docs/architecture-design/adrs/0015-event-driven-architecture-intra-domain.md)
*   [ADR 0016: Immutable Business Audit Trail (CDC)](./docs/architecture-design/adrs/0016-immutable-business-audit-trail.md)
*   [ADR 0017: Feature Flagging Strategy](./docs/architecture-design/adrs/0017-feature-flagging-strategy.md)
*   [ADR 0018: Testing Pyramid & Automated Quality Gates](./docs/architecture-design/adrs/0018-testing-pyramid-quality-gates.md)
*   [ADR 0019: Tactical Design Patterns for Domain Integrity (Result Pattern)](./docs/architecture-design/adrs/0019-tactical-design-patterns-future-proofing.md)

### 🏷️ 4. Versioning & Release Cycles
*   [BMAD Automated Versioning Strategy](./docs/artifacts/versioning_and_audit_strategy.md) - Learn how we automate Semantic Versioning and Release cycles.
*   **[View the Official CHANGELOG](./CHANGELOG.md)** - The pristine audit log of all merged features and fixes across the monorepo.

---

## 🚀 Quick Start
```bash
# 1. Install dependencies and link workspaces
npm install

# 2. Start the NestJS API (Port 3000)
npx nx run api:serve

# 3. Start the React Client (Port 5173)
npx nx run apps-web:dev
```
