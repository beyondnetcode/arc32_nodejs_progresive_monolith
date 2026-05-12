# 🌐 Corporate Polyglot Reference Architecture (bMAD)

> 🌍 **Language Selector:** [🇺🇸 English](./README.md) | [🇪🇸 Español](./README.es.md)

---

## 💡 1. Introduction & Key Objectives

Welcome to the **Unified Corporate Reference Architecture**. This ecosystem serves as the canonical blueprint for enterprise digital systems designed to scale dynamically from Modular Monoliths into fully distributed cloud ecosystems.

### 🎯 Primary Mission Objectives:
*   **Decoupling Absolute:** Ensure business logic remains 100% agnostic of frameworks and database dialects through rigorous **Hexagonal Architecture** (Ports & Adapters).
*   **Security First:** Enforce inherent Isolation through native Row-Level Security (RLS) and strict tenant separation at the root level.
*   **Standardized Delivery:** Dictate clear, gated software development lifecycles (SDLC) ensuring 100% reproducible quality across polyglot workloads.

---

## 🧭 2. Unified Master Navigation Hub

🚀 **Do not explore the directories randomly.** All compliance and workflow execution routes are governed explicitly by persona:

1.  👉 **[Global Master Index](./MASTER_INDEX.md)**: The canonical starting line. Identify your role (Vendor, Dev, Architect, PM) and find your exact compulsory reading hierarchy immediately.
2.  🇺🇸 **[Corporate Standards Center](./arc-corporate-ws/corporate-standards/README.md)**: Comprehensive architectural specifications and governance pillars.
3.  ⚙️ **[SDLC Governance Center](./arc-corporate-ws/corporate-sdlc/README.md)**: Detailed lifecycle engineering requirements and quality Gates.

---

## ⚠️ 3. Critical Disclaimers & Usage Recommendations

To interact safely with this asset federation, all members MUST respect the following systemic limitations and usage rules:

### 🛑 Important Disclaimers:
*   **Pattern Laboratory Only:** The sandbox implementation is a high-fidelity validation vehicle designed to stress-test architectural boundaries. It is NOT an off-the-shelf commercial product intended for instant white-label production.
*   **Educational Intent:** The code prioritizes demonstrative cleanliness over dense, optimized micro-efficiencies.
*   **License Integrity:** All open-source choices have been vetted (Post-BSL era sanitization), however, final organizational legal compliance resides with the adopting vendor.

### ✅ Crucial Usage Recommendations:
1.  **Never Bypass Ports:** Do not inject external framework logic into the `/domain` folders.
2.  **Sync with ADRs:** Every deviation from these standards demands the consultation of the existing **45 Architectural Decisions** before proposal.
3.  **Adopt Docs-as-Code:** No pull requests will be evaluated if corresponding documentation mappings are missing.

---

## ⚡ 4. High-Level Architecture & Ecosystem Quick Map

### 🚀 Authorized Polyglot Federation (Horizon 2026)
 Workloads distribute globally according to validated runtime constraints ([ADR-0040](./arc-corporate-ws/corporate-standards/02-adrs/core/0040-multi-runtime-selection-contracts.md)):

| Runtime | Canonical Role | Authorized Baseline Stack |
| :--- | :--- | :--- |
| **🟢 Node.js / TS** | Transactional APIs & BFFs | NestJS 11.1 / Node 24 LTS / Drizzle |
| **🔵 .NET (C#)** | High Compute / Heavy Async | ASP.NET Core / .NET 10.0 LTS / EF Core |
| **🟣 Android** | Offline Native Mobile | Kotlin 2.3 / Jetpack Compose 1.11 / Room |

### 🛠️ Fast Shortcuts Directory
*   🏛️ **[Reference Blueprint](./arc-corporate-ws/corporate-standards/01-architecture/reference-blueprint.md)**: Master system specification.
*   🚀 **[Evolutionary Strategy](./arc-corporate-ws/corporate-standards/00-vision/evolutionary-strategy-roadmap.md)**: KPI dashboard and scale horizons.
*   📜 **[ADR Registry Hub](./arc-corporate-ws/corporate-standards/02-adrs/README.md)**: Fast-track lookup for universal decisions.
*   🧪 **[Executable Sandbox Demo](./arc-corporate-ws/demo/README.md)**: Test architecture patterns in live running code.

---
🤖 **AI-Augmented Enablement:** Seeking MCP and LLM agent architectures? → [Explore AI Module](./arc-corporate-ws/corporate-standards/ai-augmented/README.md)
