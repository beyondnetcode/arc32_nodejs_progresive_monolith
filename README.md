# 🏢 User Management System (UMS) - Enterprise Monorepo

Welcome to the **User Management System (UMS)**, a highly resilient, enterprise-grade modular monolith built for **UNIMAR**. This system is engineered to manage corporate identities, access control, and user lifecycles across the organization.

The UMS is built leveraging the **BMAD Method**, enforcing strict **Clean Architecture (Hexagonal)** principles, $0-cost observability (AOP), and rigorous CI/CD quality gates. 

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
