# 🏢 User Management System (UMS) - Enterprise Monorepo

Welcome to the **User Management System (UMS)**, a highly resilient, enterprise-grade modular monolith built for **UMS**. This system is engineered to manage corporate identities, access control, and user lifecycles across the organization.

The UMS is built leveraging the **BMAD Method**, enforcing strict **Clean Architecture (Hexagonal)** principles, $0-cost observability (AOP), and rigorous CI/CD quality gates. 

> [!NOTE]
> **Progressive Design Disclaimer**: This repository serves as a reference base for 100% Node.js-based systems. While currently implemented as a single modular monolithic solution (UMS), the frontend architecture is built to preserve its structure as a unified entry portal. In the future, it will scale to integrate other corporate backends (such as TMS, WMS, etc.), which will be developed as independent, isolated services with their own databases. Communication will be routed through a central API Gateway, using the Backend For Frontend (BFF) pattern to optimize payloads for web and mobile clients (see [ADR 0008](./ums-workspace/docs/architecture-design/adrs/0008-progressive-multimodule-evolution-gateway-bff.md)).


## 🛠️ Technology Stack
- **Backend**: NestJS (v10), TypeORM, PostgreSQL 16.
- **Frontend**: React (v18), Vite, Zustand, TanStack React Query.
- **Monorepo Orchestration**: Nx & npm Workspaces.
- **Security & Quality**: Husky, ESLint (SonarJS + Boundaries), CodeQL, GitHub Actions.

---

## 📚 Documentation Index

The repository contains extensive technical documentation following industry standards (C4 Model and Markdown Architectural Decision Records - MADR).

### 🏛️ Software Architecture Design
- [C4 Architecture Spec & Technical Inventory](./ums-workspace/docs/architecture-design/architecture_spec.md) - System Context, Containers, and Dependency inventory.

### 📜 Architectural Decision Records (ADRs)
Detailed logs of the foundational engineering decisions:

1. [ADR 0001: Monorepo Orchestration with Nx and npm Workspaces](./ums-workspace/docs/architecture-design/adrs/0001-monorepo-orchestration-nx.md)
2. [ADR 0002: Clean Architecture and Hexagonal Boundaries on NestJS](./ums-workspace/docs/architecture-design/adrs/0002-clean-architecture-nestjs.md)
3. [ADR 0003: Strict TypeScript Standards and SonarJS Static Analysis](./ums-workspace/docs/architecture-design/adrs/0003-strict-typescript-standards.md)
4. [ADR 0004: Frontend State Management and React Query Offline Architecture](./ums-workspace/docs/architecture-design/adrs/0004-frontend-offline-resilience.md)
5. [ADR 0005: Zero-Cost Security and CI Pipeline with CodeQL](./ums-workspace/docs/architecture-design/adrs/0005-ci-cd-quality-codeql.md)

### 📈 Technical Debt & Backlog (Proposed Architecture)
6. [ADR 0006: Future Microservices Transition with Dapr Sidecars](./ums-workspace/docs/architecture-design/adrs/0006-future-microservices-transition-dapr.md)
7. [ADR 0007: Observability Telemetry with Grafana Loki and OpenTelemetry](./ums-workspace/docs/architecture-design/adrs/0007-observability-telemetry-loki-opentelemetry.md)
8. [ADR 0008: Progressive Multi-Module Evolution with API Gateway and BFF Patterns](./ums-workspace/docs/architecture-design/adrs/0008-progressive-multimodule-evolution-gateway-bff.md)
9. [ADR 0009: Strict Dependency Pinning and Automated Vulnerability Management](./ums-workspace/docs/architecture-design/adrs/0009-strict-dependency-pinning-vulnerability-management.md)
10. [ADR 0010: Multi-Tenancy Architecture Strategy for SaaS Evolution](./ums-workspace/docs/architecture-design/adrs/0010-multi-tenancy-architecture-strategy.md)

### 🏷️ Versioning & Audit Trail
- [BMAD Automated Versioning Strategy](./ums-workspace/docs/architecture-design/versioning_and_audit_strategy.md) - Learn how we automate Semantic Versioning and Release cycles.
- **[View the Official CHANGELOG](./ums-workspace/CHANGELOG.md)** - The pristine audit log of all merged features and fixes across the monorepo.

---

## 🚀 Quick Start
```bash
# 0. Navigate to the Monorepo workspace
cd ums-workspace

# 1. Install dependencies and link workspaces
npm install

# 2. Start the NestJS API (Port 3000)
npx nx run api:serve

# 3. Start the React Client (Port 5173)
npx nx run apps-web:dev
```
