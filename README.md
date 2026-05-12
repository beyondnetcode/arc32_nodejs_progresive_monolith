# 🌐 Corporate Polyglot Reference Architecture (bMAD)

> 🌍 **Language / Idioma:** [🇺🇸 English](./README.md) | [🇪🇸 Español](./README.es.md)

---

## 💡 1. Introduction

Welcome to the **Unified Corporate Reference Architecture**. This repository serves as the authorized foundation and canonical blueprint for constructing enterprise polyglot digital ecosystems that dynamically evolve from Modular Monoliths into distributed Microservices.

The architecture implements the **bMAD Method**, ensuring strict adherence to hexagonal boundaries, decoupling by bounded contexts, and cloud-agnostic technology governance.

---

## 🔗 2. Cross-Documentation Frameworks & Global References

These core frameworks govern the entire architecture regardless of the implementation language or locale.

### 🚀 Authorized Polyglot Ecosystem (Horizon 2026)
The architecture is not exclusive to Node.js; it is a polyglot federation that distributes workloads according to technical suitability ([ADR-0040](./arc-corporate-ws/corporate-standards/02-adrs/core/0040-multi-runtime-selection-contracts.md)):

| Runtime | Canonical Role | Validated Tech Stack |
| :--- | :--- | :--- |
| **🟢 Node.js / TS** | Transactional APIs and BFF | NestJS 11.1 / Node 24 LTS / Drizzle |
| **🔵 .NET (C#)** | High Compute / Workers / Batch | ASP.NET Core / .NET 10.0 LTS / EF Core |
| **🟣 Android** | Offline Mobile Applications | Kotlin 2.3 / Jetpack Compose 1.11 / Room |

### 🧪 Implementation Sandbox (Executable Codebase)
**For Software Engineers and QA.** Contains the executable reference implementation validating Clean Architecture, Row-Level Security (RLS), and Observability.
👉 **[Explore Sandbox Application (Demo)](./arc-corporate-ws/demo/README.md)**

**🔒 Legal Status:** 100% Sanitized. Apache 2.0 / MIT / BSD-3 licenses (Valkey, OpenTofu, OpenBao validated).

---

## 🗺️ 3. Official Documentation Index (Choose Language)

Navigate directly to the comprehensive set of standards, blueprints, and architecture decision records in your preferred language:

*   🇺🇸 **[English Documentation Center](./arc-corporate-ws/corporate-standards/README.md)**: Comprehensive standards and governance in English.
*   ⚙️ **[English SDLC Governance Center](./arc-corporate-ws/corporate-sdlc/README.md)**: Lifecycle and delivery standards in English.
*   🇪🇸 **[Centro de Documentación en Español](./arc-corporate-ws/corporate-standards-es/README.md)**: Estándares integrales y gobernanza en Español.
*   ⚙️ **[Centro de Gobernanza SDLC en Español](./arc-corporate-ws/corporate-sdlc-es/README.md)**: Estándares de ciclo de vida y entrega en Español.

---

## ⚡ 4. Central Navigation Quick Map (English Context)

### 🧠 Architectural Directives
*   **[🏛️ Corporate Multi-Runtime Blueprint](./arc-corporate-ws/corporate-standards/01-architecture/reference-blueprint.md)**: The master system specification (arc42).
*   **[🚀 Evolutionary Strategy & Roadmap](./arc-corporate-ws/corporate-standards/00-vision/evolutionary-strategy-roadmap.md)**: Long-term vision and KPI dashboard ($PI$, $RTD$).
*   **[☁️ Multi-Cloud Deployment Scenarios](./arc-corporate-ws/corporate-standards/01-architecture/multi-cloud-deployment-scenarios.md)**: Azure, AWS, On-Prem, and Hybrid blueprints.
*   **[📜 Decision History (ADRs)](./arc-corporate-ws/corporate-standards/02-adrs/README.md)**: Register of the 45 definitive technology decisions.
    *   *Quick Access By Domain:* [🌐 Core](./arc-corporate-ws/corporate-standards/02-adrs/README.md#universal-core) | [🟢 Node.js](./arc-corporate-ws/corporate-standards/02-adrs/README.md#nodejs-typescript) | [🔵 .NET](./arc-corporate-ws/corporate-standards/02-adrs/README.md#net-c) | [🟣 Mobile](./arc-corporate-ws/corporate-standards/02-adrs/README.md#android-native)

### 🛠️ Standards and Shielding
*   **[🔬 2026 Stack Audit Opinion](./arc-corporate-ws/corporate-standards/03-engineering/detailed-stack-audit-2026.md)**: Critical verification of licenses (Post-BSL/SSPL) and active versions.
*   **[🛡️ Global Engineering Manifesto](./arc-corporate-ws/corporate-standards/03-engineering/engineering-manifesto.md)**: Normative policy for SOLID, Clean Code, and OWASP.

### 🚦 Release Governance & Adoption
*   **[📈 Nx Versioning Strategy](./arc-corporate-ws/corporate-standards/04-governance/release-audit-strategy.md)**: Automated mechanism for releases and SemVer.
*   **[🚀 Product Quick-Start Manual](./arc-corporate-ws/corporate-standards/05-onboarding/product-quick-start.md)**: The official scaffolding and environment guide.

### 🤖 AI-Augmented Architecture (Optional)
Optional extension for teams incorporating AI agents and MCP into their architecture.
→ [Explore AI-Augmented section](./arc-corporate-ws/corporate-standards/ai-augmented/README.md)
