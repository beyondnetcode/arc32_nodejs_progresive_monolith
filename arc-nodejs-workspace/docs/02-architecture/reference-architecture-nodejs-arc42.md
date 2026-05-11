# 🏛️ Evolutionary Reference Architecture for API-Driven Systems (Node.js Stack)

> [!IMPORTANT]
> **Corporate Reference Architecture Blueprint (ARC32 / Arc42)**: This document defines the corporate standard for building highly decoupled applications that start as a **Modular Monolith** and evolve toward a full **SaaS Multi-Tenant Microservices** mesh. The base project physically implements this international standard.

---

## 1. Introduction and Goals

This reference architecture provides a standardized blueprint for building modern, highly scalable, multi-tenant SaaS systems. All 30 Architectural Decision Records (ADRs) are reflected throughout the diagrams of this document.

### 1.1 Purpose and Applicability
This pattern is designed specifically for systems that:
*   Have a strong orientation towards **intensive API utilization** with multi-channel clients (Web, Mobile, B2B).
*   Require native **SaaS multi-tenant isolation** at the database engine level.
*   Must support **progressive evolution** from Modular Monolith to Distributed Microservices without domain rewrites.
*   Require **asynchronous decoupled communication** via an injectable, swappable event bus.

### 1.2 Mandatory Quality Attributes
| Quality Attribute | Source ADR | Target |
| :--- | :--- | :--- |
| **Progressive Evolution** | ADR-0006, ADR-0008 | Zero-refactoring path to microservices via Dapr |
| **SaaS Multi-Tenancy** | ADR-0010 | Shared DB + PostgreSQL RLS isolation |
| **Strict Decoupling** | ADR-0002, ADR-0003 | ESLint boundary enforcement |
| **Resilience** | ADR-0011 | Circuit breakers via `opossum` |
| **Security** | ADR-0005, ADR-0012, ADR-0020, ADR-0026 | Zero-trust perimeter + RBAC/ABAC |
| **Internal API Latency** | ADR-0014, ADR-0021 | P95 < 50ms via Redis Read-Aside |
| **Observability** | ADR-0007 | OTel + Loki + distributed tracing |
| **Immutable Auditing** | ADR-0016 | Append-only audit ledger |

---

## 2. Architecture Constraints and Baseline Pillars

Any system based on this blueprint must adhere to the following non-negotiable pillars:

*   **Stack Governance (ADR-0001)**: Nx Monorepo + npm Workspaces for centralized dependency governance.
*   **bMAD Engineering Mandate (ADR-0002, ADR-0003)**: SOLID, Clean Code, Hexagonal Architecture, strict TypeScript.
*   **Dependency Safety (ADR-0009)**: All dependency versions pinned. No `^` or `~` ranges. Automated vulnerability scanning in CI.
*   **Quality Gates (ADR-0018)**: Automated testing pyramid. Minimum 70% coverage enforced in CI.
*   **Infrastructure Portability (ADR-0028)**: Self-hosted OSS (MinIO, RabbitMQ, Vault) prioritized over cloud lock-in.

---

## 3. Context and Scope (Operational Model)

### 3.1 General Context Pattern — Full Stack with Gateway Tiers and Injectable Event Bus

This diagram captures the complete system context. It reflects:
- **ADR-0030**: Two-Tier Gateway (Kong Edge + NestJS BFF)
- **ADR-0008**: Progressive Multi-Module evolution with dedicated BFF per client channel
- **ADR-0015**: Injectable `IEventBusPort` abstraction (In-Memory → RabbitMQ → Kafka)
- **ADR-0020**: Pluggable Identity Provider via Strategy Pattern
- **ADR-0007**: OpenTelemetry tracing across all tiers

```mermaid
graph TD
    subgraph Clients["Channel Layer — Client Applications"]
        WebApp["Web App (React / Angular)"]
        MobileApp["Mobile App (iOS / Android)"]
        B2B["B2B Partner (gRPC / REST API Key)"]
    end

    subgraph Tier1["Tier 1 — Edge API Gateway (ADR-0030)"]
        Kong["Kong OSS\n[Rate Limiting · JWT Validation · CORS · Routing]"]
    end

    subgraph Tier2["Tier 2 — BFF Orchestration Layer (ADR-0008)"]
        WebBFF["NestJS Web BFF\n[Aggregation · Payload Shaping]"]
        MobileBFF["NestJS Mobile BFF\n[Compact Responses]"]
        CoreAPI["NestJS Core API\n[Hexagonal Domain · RBAC/ABAC]"]
    end

    subgraph ExternalIntegrations["External Integration Layer"]
        IdP["Federated IdP (Auth0 / Entra ID)\n[ADR-0020, ADR-0026]"]
        
        subgraph EventBusAbstraction["Injectable Event Bus (ADR-0015)"]
            IBusPort["«Port» IEventBusPort"]
            InMemory["In-Memory (Dev/Test)"]
            RabbitMQ["RabbitMQ (Production)"]
            Kafka["Kafka (High-Scale)"]
            IBusPort -.->|Impl| InMemory
            IBusPort -.->|Impl| RabbitMQ
            IBusPort -.->|Impl| Kafka
        end
    end

    subgraph ObsLayer["Observability (ADR-0007)"]
        OTel["OpenTelemetry Collector"]
        Loki["Grafana Loki (Logs)"]
        Jaeger["Jaeger (Traces)"]
        OTel --> Loki
        OTel --> Jaeger
    end

    WebApp -->|HTTPS| Kong
    MobileApp -->|HTTPS| Kong
    B2B -->|gRPC/REST| Kong

    Kong -->|Forward Auth'd Traffic| WebBFF
    Kong -->|Forward Auth'd Traffic| MobileBFF
    Kong -->|Forward Auth'd Traffic| CoreAPI

    WebBFF -->|Orchestrates| CoreAPI
    MobileBFF -->|Orchestrates| CoreAPI

    CoreAPI -->|Validate Claims| IdP
    CoreAPI -->|Publish Events| IBusPort

    CoreAPI -.->|Traces + Logs| OTel
    WebBFF -.->|Traces + Logs| OTel
    Kong -.->|Access Logs| OTel
```

---

## 4. Solution Strategy

### 4.1 Hexagonal Architecture — Ports & Adapters (ADR-0002)
All business logic in the Domain and Application layers has **zero runtime dependencies** on frameworks, ORMs, or cloud services. The infrastructure layer implements pure TypeScript Ports.

### 4.2 SaaS Multi-Tenancy Strategy (ADR-0010)
Shared PostgreSQL schema with **Row-Level Security (RLS)** policies. Tenant context is propagated via `AsyncLocalStorage` and enforced at the database engine — not at the ORM level.

### 4.3 Two-Tier Gateway Pattern (ADR-0030)
| Tier | Technology | Responsibility |
| :--- | :--- | :--- |
| **Tier 1 — Edge** | Kong OSS (NGINX/OpenResty) | Rate Limiting, JWT validation, SSL termination, Routing |
| **Tier 2 — BFF** | NestJS | Data aggregation, payload shaping, client-specific logic |

### 4.4 Injectable Event Bus (ADR-0015)
The domain never imports a concrete message broker. All async communication is routed through `IEventBusPort`. The concrete implementation (In-Memory / RabbitMQ / Kafka) is injected by the NestJS DI container at startup, controlled by an environment variable.

### 4.5 Progressive Evolution Route (ADR-0006)
1.  **Milestone 1 — Modular Monolith**: Single process, logically isolated domain modules.
2.  **Milestone 2 — Service Extraction**: Critical domains extracted as Nx micro-projects with isolated DBs, consumed via gRPC/Dapr.
3.  **Milestone 3 — Full Microservices Mesh**: Dapr Sidecars, Service Mesh, Kong as unified API surface.

---

## 5. Technical Building Blocks — Full Container View

This C4 Level-2 Container diagram reflects **all active ADRs** in their physical runtime positions.

```mermaid
graph TD
    subgraph ClientLayer["Client Channel Layer"]
        WebApp["Web App"]
        MobileApp["Mobile App"]
        B2BClient["B2B Client (API Key)"]
    end

    subgraph EdgeNet["Network Level 0: Static Cache"]
        CDN["CDN (Content Delivery Network)\n[Cloudflare / Akamai / Optional]"]
    end

    subgraph GatewayTier["Gateway Tiers (ADR-0030, ADR-0008, ADR-0027, ADR-0032)"]
        Kong["Kong OSS Edge Gateway\n[Rate Limiting · SSL · JWT · CORS]"]
        WebBFF["NestJS Web BFF\n[REST/GraphQL + Multi-Layer Cache]"]
        MobileBFF["NestJS Mobile BFF\n[Compact Payloads + Multi-Layer Cache]"]
    end

    subgraph CoreTier["Core Application Tier (ADR-0002, ADR-0012, ADR-0016, ADR-0019, ADR-0029)"]
        CoreAPI["NestJS Core API\nHexagonal + Audit + UnitOfWork"]
        FeatureFlags["Feature Flag Engine\n[ADR-0017, ADR-0025]"]
        ConfigPlatform["Config Platform\n[ADR-0024]"]
    end

    subgraph PersistenceTier["Persistence Tier (ADR-0014, ADR-0022)"]
        PgSQL[("PostgreSQL 16\n[Dual-Layer RLS · ADR-0010]")]
        Redis[("Redis Distributed Cluster\n[Multi-Layer Tiered Cache · ADR-0014]")]
        AuditLog[("Audit Log (Append-Only)\n[ADR-0016]")]
    end

    subgraph MessagingTier["Async Messaging Tier (ADR-0015, ADR-0031)"]
        IBusPort["«Port» IEventBusPort"]
        InMemoryBus["In-Memory Bus\n(Dev/Test)"]
        RabbitMQBus["RabbitMQ\n(Production)"]
        IBusPort -.->|Impl| InMemoryBus
        IBusPort -.->|Impl| RabbitMQBus
    end

    subgraph SecurityTier["Security Tier (ADR-0020, ADR-0026, ADR-0021)"]
        IdP["Pluggable IdP Adapter\n[Auth0 / Entra / Zitadel]"]
        AuthGraph["Auth Graph Engine\n[RBAC/ABAC < 5ms · ADR-0021]"]
        MFA["MFA / Passkeys Engine\n[WebAuthn · ADR-0026]"]
    end

    subgraph ObservabilityTier["Observability Tier (ADR-0007)"]
        OTel["OTel Collector"]
        Loki["Grafana Loki"]
        Jaeger["Jaeger Tracing"]
        OTel --> Loki & Jaeger
    end

    subgraph InfraTier["Self-Hosted OSS Infrastructure (ADR-0028)"]
        Vault["HashiCorp Vault\n[Secrets Management]"]
        MinIO["MinIO\n[Object Storage]"]
    end

    WebApp & MobileApp & B2BClient -->|TLS/HTTP| CDN
    CDN -->|Origin Requests| Kong
    Kong -->|Route| WebBFF & MobileBFF & CoreAPI

    WebBFF & MobileBFF -->|gRPC| CoreAPI
    WebBFF & MobileBFF <-->|BFF Cache Reads| Redis
    CoreAPI <-->|Core Cache Reads| Redis

    CoreAPI -->|SQL/Dual-Layer RLS| PgSQL
    CoreAPI --> PgSQL & AuditLog
    CoreAPI --> IBusPort
    CoreAPI --> AuthGraph
    CoreAPI --> FeatureFlags
    CoreAPI --> ConfigPlatform

    AuthGraph --> IdP
    AuthGraph --> MFA
    IdP --> PgSQL

    CoreAPI -.-> OTel
    Kong -.-> OTel
    WebBFF -.-> OTel

    CoreAPI --> Vault
    CoreAPI --> MinIO
```

---

## 6. Runtime View — Request Flow Patterns

### 6.1 Authenticated Request Flow (ADR-0030, ADR-0008, ADR-0021, ADR-0014)

```mermaid
sequenceDiagram
    autonumber
    participant C as Web App
    participant K as Kong (Tier 1)
    participant B as NestJS BFF (Tier 2)
    participant A as Core API
    participant R as Redis Cache
    participant D as PostgreSQL (RLS)

    C->>K: HTTPS Request + JWT
    Note over K: Rate Limit · Validate JWT Signature
    K->>B: Forwarded Request (+ X-Tenant-ID header)
    B->>A: Aggregated Internal Call
    A->>R: Read-Aside Cache Lookup (ADR-0014)
    alt Cache Hit
        R-->>A: Cached Response (< 5ms)
    else Cache Miss
        A->>D: SQL Query (RLS active → tenant scope)
        D-->>A: Tenant-scoped Results
        A->>R: Populate Cache
    end
    A-->>B: Domain Response
    B-->>C: Shaped Payload
```

### 6.2 Asynchronous Event Flow — Injectable Bus (ADR-0015, ADR-0016)

```mermaid
sequenceDiagram
    autonumber
    participant UC as Use Case
    participant Port as IEventBusPort
    participant Bus as Concrete Impl (RabbitMQ / In-Memory)
    participant AuditSvc as Audit Service
    participant AuditDB as Audit Log (Append-Only)

    UC->>Port: publish(DomainEvent)
    Port->>Bus: Dispatch (via injected impl)
    Bus-->>AuditSvc: Deliver event async
    AuditSvc->>AuditDB: INSERT immutable delta (ADR-0016)
    Note over AuditDB: UPDATE/DELETE blocked by DB trigger
```

### 6.3 Resilience Flow — Circuit Breaker (ADR-0011)

```mermaid
sequenceDiagram
    autonumber
    participant A as Core API
    participant CB as Circuit Breaker (opossum)
    participant Ext as External Service

    A->>CB: execute(call)
    alt Circuit CLOSED
        CB->>Ext: Forward call
        Ext-->>CB: Success
        CB-->>A: Result
    else Circuit OPEN (threshold exceeded)
        CB-->>A: Fallback Response (no call made)
        Note over CB: Prevents cascade failure (ADR-0011)
    end
```

---

## 7. Deployment View — Target Cloud Infrastructure (ADR-0013, ADR-0028)

```mermaid
graph TD
    subgraph CloudZoneA["Availability Zone A"]
        KongA["Kong Node"]
        BFFA["NestJS BFF Pod"]
        APIA["Core API Pod"]
        PgPrimary[("PostgreSQL Primary")]
    end

    subgraph CloudZoneB["Availability Zone B (DR — ADR-0013)"]
        KongB["Kong Node"]
        BFFB["NestJS BFF Pod"]
        APIB["Core API Pod"]
        PgReplica[("PostgreSQL Replica")]
    end

    subgraph SharedInfra["Shared Self-Hosted OSS (ADR-0028)"]
        Redis[("Redis Cluster")]
        RabbitMQ["RabbitMQ Cluster"]
        Vault["HashiCorp Vault"]
        MinIO["MinIO Storage"]
    end

    Internet -->|DNS Failover| KongA & KongB
    KongA --> BFFA --> APIA --> PgPrimary
    KongB --> BFFB --> APIB --> PgReplica
    PgPrimary -.->|Streaming Replication| PgReplica
    APIA & APIB <--> Redis
    APIA & APIB --> RabbitMQ
    APIA & APIB --> Vault
```

---

## 8. Transversal Corporate Concepts — Full ADR Matrix

| Architectural Concern | Implementing ADR(s) | Pattern / Technology | Diagram Section |
| :--- | :--- | :--- | :--- |
| **Monorepo Governance** | ADR-0001 | Nx + npm workspaces | §2 |
| **Hexagonal Architecture** | ADR-0002 | Ports & Adapters | §4.1, §5 |
| **TypeScript Standards** | ADR-0003 | Strict mode + ESLint Boundaries | §2 |
| **Frontend Resilience** | ADR-0004 | React Query offline cache | §3.1 |
| **CI/CD Security** | ADR-0005 | CodeQL + GitHub Actions | §2 |
| **Microservices Path** | ADR-0006 | Dapr Sidecar migration triggers | §4.5 |
| **Observability** | ADR-0007 | OpenTelemetry + Loki + Jaeger | §3.1, §5, §6 |
| **BFF Gateway Pattern** | ADR-0008 | NestJS BFF per client channel | §3.1, §4.3, §5 |
| **Dependency Pinning** | ADR-0009 | Exact versions + `npm audit` | §2 |
| **Multi-Tenancy (SaaS)** | ADR-0010 | PostgreSQL RLS + AsyncLocalStorage | §4.2, §5, §6.1 |
| **Circuit Breakers** | ADR-0011 | `opossum` + Exponential Backoff | §5, §6.3 |
| **RBAC/ABAC Authorization** | ADR-0012 | JWT Claims + NestJS Guards | §5 |
| **Cloud DR Topology** | ADR-0013 | Multi-AZ + Streaming Replication | §7 |
| **Distributed Caching** | ADR-0014 | Redis Read-Aside behind `ICachePort` | §5, §6.1 |
| **Event-Driven (Injectable Bus)** | ADR-0015 | `IEventBusPort` → In-Mem / RabbitMQ | §3.1, §4.4, §5, §6.2 |
| **Immutable Audit Trail** | ADR-0016 | Append-only table + DB trigger | §5, §6.2 |
| **Feature Flagging** | ADR-0017 | `IFeatureFlagPort` (Unleash/ConfigCat) | §5 |
| **Testing Pyramid** | ADR-0018 | Unit + Contract (Pact) + E2E | §2 |
| **Result / Functional Patterns** | ADR-0019 | `Result<T,E>` instead of exceptions | §4.1 |
| **Identity Provider Abstraction** | ADR-0020 | Strategy Pattern → Auth0/Entra/Zitadel | §3.1, §5 |
| **Auth Graph Compilation** | ADR-0021 | Redis-cached permission graph < 5ms | §5 |
| **Pluggable Projections** | ADR-0022 | Context-aware read projections | §5 |
| **Centralized Auth Kernel** | ADR-0023 | Shared authorization core kernel | §5 |
| **Config & Feature Platform** | ADR-0024 | Multi-IdP parameter engine | §5 |
| **Feature Flag Abstraction** | ADR-0025 | `IFeatureFlagPort` pluggable providers | §5 |
| **MFA & Passkeys** | ADR-0026 | WebAuthn + Passkeys + TOTP + Adaptive | §5 |
| **Dual Protocol REST/gRPC** | ADR-0027 | REST (external) + gRPC (internal) | §3.1 |
| **Self-Hosted OSS Infra** | ADR-0028 | MinIO + RabbitMQ + Vault OSS | §5, §7 |
| **Tactical DDD Primitives** | ADR-0029 | `@nestjslatam/ddd` via barrel re-exports | §4.1 |
| **Two-Tier Gateway** | ADR-0030 | Kong (Edge) + NestJS BFF (Aggregation) | §3.1, §4.3, §5, §6.1 |

---

## 9. Quality Requirements (NFR Benchmark)

| Metric | Target | Enforcing ADR(s) |
| :--- | :--- | :--- |
| **API Latency (P95)** | < 50ms | ADR-0014, ADR-0021 |
| **Auth Graph Resolution** | < 5ms | ADR-0021 |
| **SAST Vulnerabilities** | 0 High/Critical | ADR-0005, ADR-0009 |
| **Test Coverage** | ≥ 70% | ADR-0018 |
| **Memory Footprint** | Low idle (microservice density) | ADR-0002, ADR-0006 |
| **Tenant Data Bleed** | Zero tolerance | ADR-0010 (RLS enforcement) |

---

## 10. Canonical Reference Implementation

👉 **[Back to Project Root & Quick Start](../../README.md)**

Implemented using:
- **Framework**: NestJS (v10) with strict Hexagonal boundaries.
- **ORM**: TypeORM with native PostgreSQL RLS support.
- **Gateway**: Kong OSS (DB-less YAML) + NestJS BFF layers.
- **Event Bus**: `IEventBusPort` defaulting to In-Memory, injectable with RabbitMQ.
- **Testing**: Jest (unit/integration) + Pact (contract tests).
