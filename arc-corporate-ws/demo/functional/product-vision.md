# 🎯 Product Vision — Enterprise SaaS Reference Architecture Skeleton

## 1. Executive Summary

The **ARC32 Reference Skeleton** is a developer-facing **instructional architecture blueprint** whose demonstration vehicle is a production-grade **Enterprise SaaS Multi-Tenant To-Do Platform**.

> **Two layers. One repository.**
>
> | Layer | What it IS | Why it matters |
> | :--- | :--- | :--- |
> | **The Skeleton** | An architectural instructional framework | Teaches enterprise patterns (Hexagonal, BFF, SaaS) with zero business domain noise |
> | **The Demo App** | A fully-featured SaaS multi-tenant To-Do system | Proves the skeleton is not theoretical — every pattern is physically implemented and runnable |

By choosing the universally-understood "To-Do" domain, all cognitive load is directed toward **mastering the architecture**, not learning the business rules. A developer who studies this repository will know exactly how to build any enterprise-grade SaaS system on Node.js.

---

## 2. Strategic Pillars

### A. Architecture as the Product
- The architecture **is** the deliverable. Maximum adherence to **Dependency Inversion** (SOLID), explicit **Ports and Adapters**, and high maintainability indices are the ultimate KPIs.
- The To-Do domain is the simplest possible canvas to demonstrate these patterns without business complexity obscuring the structural intent.
- It showcases exactly how to organize a Monorepo using Nx and how to achieve layer boundaries that pass strict `dependency-cruiser` audits.

### B. Enterprise SaaS Demo Application
- The demo application is **not** a toy. It implements the full enterprise SaaS capability set:
  - **Multi-Tenancy** via PostgreSQL Row-Level Security (RLS).
  - **Two-Tier API Gateway** (Kong Edge + NestJS BFF) per ADR-0030, ADR-0008.
  - **Injectable Event Bus** (In-Memory → RabbitMQ) per ADR-0015.
  - **Immutable Audit Trail** per ADR-0016.
  - **Distributed Caching** per ADR-0014.
- Any of these capabilities can be replicated as-is into a production system simply by replacing the `Task` domain with the target business domain.

### C. Observability & Resilience by Default
- Production telemetry is not an afterthought. Distributed tracing via OpenTelemetry and log aggregation via Loki are fully wired from day one per ADR-0007.
- Fault tolerance patterns (Circuit Breakers, Retries) are demonstrated at the infrastructure adapter level per ADR-0011.

### D. Testing Pyramid Pre-configured
- The skeleton eliminates setup paralysis. It ships with 100% pre-configured setups for:
  - **Unit Testing** — Pure domain logic (zero infrastructure mocks).
  - **Integration Testing** — Adapter-level wiring with real Postgres/Redis.
  - **Contract Testing** — Pact consumer/provider contracts.
- Per ADR-0018, a 70% coverage gate is enforced in CI.

---

## 3. Core Philosophy & Future Readiness

By keeping the Domain Core completely pure and decoupled from external frameworks, this repository proves how a monolithic application can remain clean enough to evolve gracefully into independent microservices without a rewrite. It embodies the concept of a **Progressive Monolith** (ADR-0006).

The 30 approved ADRs are not aspirational — they are **implemented, tested, and running** in the demo application. They form the reusable institutional knowledge base that any engineering team can adopt as their own architectural baseline.
