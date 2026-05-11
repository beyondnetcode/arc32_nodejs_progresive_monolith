# 🌐 Corporate Polyglot Reference Architecture (bMAD)

Welcome to the **Unified Corporate Reference Architecture**. This repository serves as the authorized foundation and canonical blueprint for constructing enterprise polyglot digital ecosystems that dynamically evolve from Modular Monoliths into distributed Microservices.

The architecture implements the **bMAD Method**, ensuring strict adherence to hexagonal boundaries, decoupling by bounded contexts, and cloud-agnostic technology governance.

---

## 🎯 Dual Purpose of the Repository

The content is strictly segmented to separate Corporate Governance from the Sandbox:

### 🏛️ 1. Corporate Standards Layer (CSL)
**For Architects, Tech Leads, and Vendors.**
Contains the "Corporate Law": 42 approved ADRs, arc42 blueprints, maturity matrices, and the 2026 stack legal audit opinion.
👉 **[Browse Corporate Standards](./arc-corporate-ws/corporate-standards/README.md)**

### 🧪 2. Demo / Sandbox Layer (To-Do Application)
**For Software Engineers and QA.**
Contains the executable reference implementation validating Clean Architecture, Row-Level Security (RLS), and Observability.
👉 **[Explore Sandbox Application](./arc-corporate-ws/demo/README.md)**

---

## 🚀 Authorized Polyglot Ecosystem (2026 Matrix)
The architecture is not exclusive to Node.js; it is a polyglot federation that distributes workloads according to technical suitability (ADR-0040):

| Runtime | Canonical Role | Validated Tech Stack |
| :--- | :--- | :--- |
| **🟢 Node.js / TS** | Transactional APIs and BFF | NestJS 11.1 / Node 24 LTS / Drizzle |
| **🔵 .NET (C#)** | High Compute / Workers / Batch | ASP.NET Core / .NET 10.0 LTS / EF Core |
| **🟣 Android** | Offline Mobile Applications | Kotlin 2.3 / Jetpack Compose 1.11 / Room |

---

## 📚 Central Navigation Quick Map

### 🧠 Architectural Directives
*   **[🏛️ Corporate Multi-Runtime Blueprint](./arc-corporate-ws/corporate-standards/01-architecture/reference-blueprint.md)**: The master system specification (arc42).
*   **[📜 Decision History (ADRs)](./arc-corporate-ws/corporate-standards/02-adrs/README.md)**: Register of the 42 definitive technology decisions.

### 🛠️ Standards and Shielding
*   **[🔬 2026 Stack Audit Opinion](./arc-corporate-ws/corporate-standards/03-engineering/detailed-stack-audit-2026.md)**: Critical verification of licenses (Post-BSL/SSPL) and active versions.
*   **[🛡️ Global Engineering Manifesto](./arc-corporate-ws/corporate-standards/03-engineering/engineering-manifesto.md)**: Normative policy for SOLID, Clean Code, and OWASP.

### 🚦 Release Governance
*   **[📈 Nx Versioning Strategy](./arc-corporate-ws/corporate-standards/04-governance/release-audit-strategy.md)**: Automated mechanism for releases and SemVer.

---

## 🚀 Adoption Guide (Quick Start)

Are you starting a new project from this reference?
Don't build anything from scratch. Follow the official scaffolding guide to clone, configure dependencies, and spin up your local infrastructure in minutes:

👉 **[Read the Product Quick-Start Official Manual](./arc-corporate-ws/corporate-standards/05-onboarding/product-quick-start.md)**

---
**🔒 Repository Legal Status**: 100% Sanitized. Apache 2.0 / MIT / BSD-3 licenses (Valkey, OpenTofu, OpenBao validated).

---

## 🤖 AI-Augmented Architecture (Optional)

Optional extension for teams and products looking to incorporate AI agents,
harness engineering, and MCP into their architecture. Does not modify or replace any
existing corporate standard.

→ [Explore AI-Augmented section](./arc-corporate-ws/corporate-standards/ai-augmented/README.md)
