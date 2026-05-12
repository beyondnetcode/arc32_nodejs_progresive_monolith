# 📐 Universal Authoritative Architecture Standards (Agnostic Baseline)

> 🌍 **Bilingual Navigation:** [🇪🇸 Versión en Español](../../corporate-standards-es/01-architecture/authoritative-tech-stack-agnostic.md)

**Document Type:** Corporate Standard  
**Applicability:** Mandatory for all Runtimes (.NET, Node.js, Android)  
**Sovereignty:** 100% Cloud-Agnostic / On-Premise Capable

---

## 🧭 1. Executive Constraints & Non-Negotiables

Regardless of the concrete technology stack chosen (Node.js, .NET, or Kotlin), every component integrating into the ecosystem MUST strictly adhere to these systemic architectural invariants. Violation of these constraints will automatically fail Architecture Gate validation.

*   **Architectural Core:** STRICT Hexagonal Architecture (Ports & Adapters). 
*   **Zero SDK Policy:** The absolute Domain layer MUST contain ZERO references, imports, or dependencies to Cloud-Provider SDKs (AWS, Azure), ORM libraries, or specific HTTP Frameworks.
*   **Infrastructure as Detail:** Persistence layers, message buses, and caching stores MUST only be interacted with via abstract Domain Ports.
*   **Deployment Guarantee:** All backend components MUST be deployable both on managed Kubernetes (EKS/AKS) AND physically disconnected air-gapped On-Premise environments.

---

## 🛰️ 2. Communication & Contract Standards

Inter-service integration follows the "Contract First" doctrine to guarantee polyglot interoperability.

| Standard Domain | Required Definition | Rationale |
| :--- | :--- | :--- |
| **Internal Sync Communication** | **gRPC (Protocol Buffers)** | High-performance binary multiplexing ensuring type-safe cross-runtime invocations under 5ms. |
| **Public Web API Standard** | **RESTful (OpenAPI v3)** | Canonical interoperability for third-party Integrators and downstream Frontend SDKs. |
| **Async Event Bus Architecture** | **AMQP / CloudEvents** | Self-describing event structure following Transactional Outbox patterns for safe propagation. |

---

## 💾 3. Cross-Cutting Foundation Infrastructure

Approved centralized primitives serving the polyglot mesh. Concrete Runtime Adapters must simply point to these standard protocols.

### 3.1 Relational Persistence (SQL)
*   **Homologated Engine:** PostgreSQL v16+
*   **Maturity Constraint:** Schema-per-Context isolation REQUIRED. Direct SQL Joins across bounded context schema boundaries are FORBIDDEN.
*   **Isolation Pattern:** Row-Level Security (RLS) mandatory for multi-tenant density protection.

### 3.2 Distributed Caching
*   **Homologated Engine:** Redis v7.2+ (Self-hosted Cluster or Sentinel)
*   **Role:** Sub-3ms ephemeral graph acceleration, sliding-window rate limiting state.

### 3.3 Object Storage
*   **Homologated Contract:** **S3-Compatible API** via self-hostable MinIO.
*   **Rule:** Direct native blob SDKs are prohibited. Only S3-API verified clients are permitted.

---

## 🛡️ 4. Hardened Security & Perimeter

### 4.1 Identity & Authorization
*   **Protocol:** OpenID Connect (OIDC) / OAuth 2.0 / SAML 2.0 Federation.
*   **Token Type:** Statistically verify RS256 signed JWTs.
*   **Enforcement:** Zero Trust networking. Mutual TLS (mTLS) requested for all internal mesh traffic.

### 4.2 Secret Hygiene
*   **Engine:** HashiCorp Vault (Enterprise or Community Self-hosted).
*   **Rule:** No plaintext secrets in Helm charts, Git repositories, or K8s ConfigMaps. Sidecar injection is the ONLY approved consumption pattern.

---

## 📊 5. Native Enterprise Observability

Runtime-agnostic telemetry is mandatory. Teams are forbidden from locking their logic into specific SaaS vendor agents.

*   **Tracing/Logs Instrumentation:** **OpenTelemetry (W3C Trace Context)** standard.
*   **Collector Hierarchy:** Metrics pulling via OpenTelemetry Collector forwarding into Prometheus/Jaeger mesh.
*   **Log Format:** JSON Structured Logging mandated for efficient Grafana Loki indexing.

---

## 🛳️ 6. Containerization & Deployment Strategy

Standardization of packaging and execution to guarantee cloud and on-premise parity.

*   **Container Engine:** **Docker v25+** utilizing multi-stage builds with **Distroless** (Google Container Tools) base images to minimize production attack surface.
*   **Orchestration:** **Kubernetes (K8s v1.28+)**. Manifests must be agnostic to distribution flavor (function on EKS/AKS as well as MicroK8s/Rancher).
*   **Package Management:** **Helm v3**. Charts MUST fully parameterize resources, allowing easy swap-outs between real cloud infrastructure and local simulators.

---

## 🧪 7. Holistic Verification Pyramid

Mandatory to guarantee that polyglot software respects contracts before rollout.

*   **Integration Testing:** Driven by **Testcontainers** (spinning up live Postgres/Redis instances per suite). Simulating the SQL engine via in-memory fakes is forbidden.
*   **Contract Safety:** Implementation of **Pact** (Contract Testing) to guarantee gRPC binary compatibility and OpenAPI schema synchronization between teams.
*   **Performance & Load:** **k6 (Grafana)** scripts integrated into the CI pipeline verifying latencies, race conditions, and memory saturation under stress.

---

## 🧩 8. Third-Party Services Guidelines

For air-gapped environments, external SaaS integrations MUST be optional and abstracted.

| Service Name | Use Case | Local Constraint / Mitigation | Required Domain Port Interface |
| :--- | :--- | :--- | :--- |
| **Twilio** | SMS OTP / Alerts | Provide configuration for local SMTP-to-SMS Gateway or hardware modem. | `ISmsPort` |
| **SendGrid** | Transactional Emails | Compatible fallback via self-hosted SMTP server (Postfix/Haraka). | `IEmailPort` |

---

## ⚖️ 9. Vendor Lock-in Risk Registry

All base infrastructure choices are audited through the lens of technological sovereignty.

| Component | Chosen Solution | Risk Level | Exit / Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **Database** | PostgreSQL v16 | **Low** | ANSI SQL standard compliance. Domain layer decoupled via Ports. |
| **Object Storage** | MinIO (S3 API) | **Low** | MinIO replicas 100% of the AWS S3 API. Simple config reversal. |
| **Secrets**| HashiCorp Vault | **Low** | Resolution abstracted by dynamic injection via native K8s sidecars. |
| **Gateway** | Kong Gateway | **Low** | Configuration is managed via standard orchestrator Ingress resources. |

---

## 🚀 10. Structural Next-Steps for Reading

This document covers only the **universal laws**. You MUST now identify your active Runtime and consume the concrete technical compliance mapping:

1.  👉 **[.NET / C# Specific Technology Stack](./authoritative-tech-stack-dotnet.md)**
2.  👉 **[Node.js / TypeScript Specific Technology Stack](./authoritative-tech-stack-nodejs.md)**
3.  👉 **[Android / Kotlin Mobile Specific Technology Stack](./authoritative-tech-stack-android.md)**
