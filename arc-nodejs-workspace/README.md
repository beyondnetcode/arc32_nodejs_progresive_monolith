# 🏢 To-Do Reference System - Architecture Monorepo

Welcome to the **To-Do Reference System**, a highly resilient, modular monolith demonstrating advanced backend engineering. This system provides a production-ready skeleton implementing task management scoped to authenticated users.

Built using the **BMAD Method**, it enforces **Clean Architecture (Hexagonal)** principles, $0-cost observability (OpenTelemetry), and rigorous CI/CD quality gates.

> [!IMPORTANT]
> ### 🏛️ CORPORATE BLUEPRINT (ARC32 / ARC42)
> This repository contains the authoritative **Corporate Reference Architecture Blueprint** based on international **arc42 standards**. 
> 👉 **[VIEW CORPORATE REFERENCE ARCHITECTURE DOCUMENT](./docs/02-architecture/reference-architecture-nodejs-arc42.md)**
> *Use this canonical blueprint as the foundational design spec for developing scalable, API-driven modular monoliths that successfully evolve into distributed microservices.*

---

## 🛠️ Technology Stack
- **Backend**: NestJS (v10), TypeORM, PostgreSQL 16.
- **Caching**: Redis (Cluster Support).
- **Frontend**: React (v18), Vite, Zustand, React Query.
- **Monorepo**: Nx & npm Workspaces.
- **Telemetry**: Grafana Loki + OpenTelemetry.

---

## 📚 Documentation Index & Navigation Guide

This repository contains extensive technical documentation following the **bMAD Method** and industry standards (C4 Model and ADRs).

### 🏛️ bMAD Taxonomy

*   🗺️ **[Main Phase - Master Index and Navigation Guides](./docs/index.md)** (Unified central index)
*   🎯 **[Phase 00 - Product Vision](./docs/00-product/)**:
    *   [Product Vision](./docs/00-product/product-vision.md) | [Business Context](./docs/00-product/business-context.md) | [Scope and Boundaries](./docs/00-product/scope.md) | [Objectives](./docs/00-product/objectives.md)
*   📋 **[Phase 01 - Domain Requirements](./docs/01-requirements/)**:
    *   [Use Cases](./docs/01-requirements/usecases/) | [Conceptual Data Model](./docs/01-requirements/conceptual-data-model.md) | [DDD Glossary](./docs/01-requirements/glossary.md)
*   🏗️ **[Phase 02 - Architectural Design](./docs/02-architecture/)**:
    *   **[Node.js Reference Architecture](./docs/02-architecture/reference-architecture-nodejs-arc42.md)** | [C4 Specification](./docs/02-architecture/architecture-spec.md) | [Bounded Context Map](./docs/02-architecture/bounded-context-map.md)
*   📜 **[Phase 03 - Architectural Decision Records (ADRs)](./docs/03-adrs/)**:
    *   [Sequential ADR Ledger](./docs/03-adrs/)
*   🛠️ **[Phase 04 - Engineering Standards](./docs/04-artifacts/)**:
    *   [Global Standards](./docs/04-artifacts/engineering-standards.md) | [Observability Strategy](./docs/04-artifacts/observability-strategy.md) | [Contract Testing Plan](./docs/04-artifacts/contract-testing-plan.md)

---

### 📜 Architectural Decision Records (ADR) Quick Summary

Foundational engineering decisions grouped by architectural focus:

#### 🟢 Core Foundation
*   [ADR 0001: Monorepo Orchestration with Nx](./docs/03-adrs/0001-monorepo-orchestration-nx.md)
*   [ADR 0002: Clean Architecture and Hexagonal Boundaries](./docs/03-adrs/0002-clean-architecture-nestjs.md)
*   [ADR 0003: Strict TypeScript Standards](./docs/03-adrs/0003-strict-typescript-standards.md)
*   [ADR 0005: Zero-Cost Security with CodeQL](./docs/03-adrs/0005-ci-cd-quality-codeql.md)

#### 🟠 SaaS & Scalability
*   [ADR 0006: Future Microservices Transition via Dapr](./docs/03-adrs/0006-future-microservices-transition-dapr.md)
*   [ADR 0007: Telemetry with Grafana Loki & OTel](./docs/03-adrs/0007-observability-telemetry-loki-opentelemetry.md)
*   [ADR 0010: Fault Tolerance & Resiliency](./docs/03-adrs/0010-fault-tolerance-resiliency-patterns.md)
*   [ADR 0012: Distributed Caching Strategy (Redis)](./docs/03-adrs/0012-distributed-caching-strategy-redis.md)
*   [ADR 0014: Immutable Business Audit Trail](./docs/03-adrs/0014-immutable-business-audit-trail.md)

#### 🔵 Communication & Interfaces
*   [ADR 0008: BFF Patterns for Frontends](./docs/03-adrs/0008-progressive-multimodule-evolution-gateway-bff.md)
*   [ADR 0017: Dual-Protocol REST & gRPC API Structure](./docs/03-adrs/0017-dual-protocol-rest-grpc-api-gateway.md)
*   [ADR 0020: API Gateway Kong vs NestJS](./docs/03-adrs/0020-api-gateway-kong-vs-nestjs.md)

---

## 🚀 Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Start the NestJS API (Port 3000)
npx nx run api:serve

# 3. Start the React Client (Port 5173)
npx nx run apps-web:dev
```
