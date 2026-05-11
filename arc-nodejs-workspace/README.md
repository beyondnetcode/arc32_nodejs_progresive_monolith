# 🏛️ Node.js Corporate Reference Blueprint (ARC32)

Welcome to the authoritative **Node.js Reference Architecture Skeleton**, a highly-resilient, enterprise-grade codebase designed strictly to define the future of the digital platform architecture. 

### 🎯 The Primary Objective
The primary goal of this repository is **not** simply to build an application, but to establish the **Master Architectural Blueprint** for constructing secure, high-density, **SaaS Multi-Tenant** ecosystems. It enforces a rigorous **Clean Hexagonal Architecture** capable of seamlessly evolving from a Modular Monolith to full distributed Microservices.

---

> [!IMPORTANT]
> ### 📘 THE CANONICAL BLUEPRINT
> This repository is the physical instance of the **arc42 (v8)** standard applied to Node.js enterprise development. 
> 👉 **[READ THE FULL CORPORATE REFERENCE ARCHITECTURE DOCUMENT](./docs/02-architecture/reference-architecture-nodejs-arc42.md)**

---

## 🏗️ Key Architectural Pillars

1.  **🔒 Enterprise SaaS & Multi-Tenancy**: Built native to the database engine utilizing **Dual-Layer Isolation (ORM + PostgreSQL RLS)** to guarantee absolute data containment with zero leakage overhead (See [ADR-0010](./docs/03-adrs/0010-multi-tenancy-architecture-strategy.md)).
2.  **🌐 Backend For Frontend (BFF) & Gateways**: Dedicated entry gateways decouple client-specific concerns from internal domain services using customized communication tiers (See [ADR-0008](./docs/03-adrs/0008-progressive-multimodule-evolution-gateway-bff.md)).
3.  **🧩 Deep Hexagonal Decoupling**: Domain layers have ZERO runtime dependencies on TypeORM, NestJS, or web servers, guaranteeing total infrastructure portability.

---

## 📚 Master Navigation Guide (bMAD)

*   🗺️ **[Primary Documentation Index](./docs/index.md)** (Direct gateway to the 6-phase lifecycle)
*   🎯 **[Phase 00 - Product & Metrics](./docs/00-product/)**: Business context & strategic scope.
*   📋 **[Phase 01 - Domain Models](./docs/01-requirements/)**: Glossary & Relational mapping.
*   🏗️ **[Phase 02 - ARC32 Specifications](./docs/02-architecture/)**:
    *   **[Reference Architecture blueprint](./docs/02-architecture/reference-architecture-nodejs-arc42.md)**
    *   [C4 Topology (Level 1-3) Specification](./docs/02-architecture/architecture-spec.md)
*   📜 **[Phase 03 - 35 Approved ADRs](./docs/03-adrs/)**: The exhaustive baseline ledger defining the sovereign technology ecosystem.

---

## 🛡️ Sovereign Tech Stack
- **Backend Framework**: NestJS (v10).
- **Persistence**: TypeORM + PostgreSQL (RLS Enforcement).
- **Caching**: 4-Tier Unified Cache (Client + CDN + BFF + Core Redis).
- **API Orchestration**: Kong Gateway + Tier 2 NestJS BFFs.
- **Observability**: OpenTelemetry, Grafana Loki, Jaeger.
- **Monorepo**: Nx orchestrator.

---

## 🚀 Local Environment Boot
```bash
# 1. System install
npm install

# 2. Boot Infrastructure (Redis/PGSQL/Kong)
docker-compose up -d

# 3. Boot Core Services (Port 3000)
npx nx run api:serve
```
