# 🌐 Corporate Polyglot Reference Architecture 

> 🌍 **Language Selector:** [🇺🇸 English](./README.md) | [🇪🇸 Español](./README.es.md)

---

## 💡 1. Introduction & Key Objectives

Welcome to the **Unified Corporate Reference Architecture**. This ecosystem serves as the canonical blueprint for enterprise digital systems designed to scale dynamically from Modular Monoliths into fully distributed cloud ecosystems.

### 🎯 Primary Mission Objectives:
*   **Radical Infrastructure Agnosticism:** Treating persistence layers and global cloud providers strictly as "implementation details," protecting the absolute core domain to facilitate lightning-fast stack migrations (<24h).
*   **Data Sovereignty & Dynamic Security:** Enforcing ironclad multi-tenant isolation natively compliant with **ISO 27001 & GDPR** via an on-demand configurable security runtime (`SECURITY_STRATEGY_MODE`), hot-swapping logic between App-Tier and Native Hardware tiers.
*   **Metric-Driven Evolutionary Progression:** Governing the transition from Modular Monoliths to Event-Driven Microservices not by hype, but strictly via quantitative KPIs such as the Agnosticism Index ($PI$) and Planned Tech Debt Ratio ($RTD$).
*   **Automated Zero-Trust Compliance:** Hardening the corporate perimeter by injecting persistent **Compliance-as-Code** benchmarks and Zero-Trust networking directly into CI/CD delivery pipelines from day zero.

---

## 🧭 2. Unified Master Navigation Hub

🚀 **Do not explore the directories randomly.** All compliance and workflow execution routes are governed explicitly by persona:

1.  👉 **[Global Master Index](./MASTER_INDEX.md)**: The canonical starting line. Identify your role (Vendor, Dev, Architect, PM) and find your exact compulsory reading hierarchy immediately.
2.  🇺🇸 **[Corporate Standards Center](./governance/standards/README.md)**: Comprehensive architectural specifications and governance pillars.
3.  ⚙️ **[SDLC Governance Center](./governance/sdlc/README.md)**: Detailed lifecycle engineering requirements and quality Gates.

---

## ⚠️ 3. Critical Disclaimers & Usage Recommendations

To interact safely with this asset federation, all members MUST respect the following systemic limitations and usage rules:

### 🛑 Important Disclaimers:
*   **Pattern Laboratory Only:** The sandbox implementation is a high-fidelity validation vehicle designed to stress-test architectural boundaries. It is NOT an off-the-shelf commercial product intended for instant white-label production.
*   **Educational Intent:** The code prioritizes demonstrative cleanliness over dense, optimized micro-efficiencies.
*   **License Integrity:** All open-source choices have been vetted (Post-BSL era sanitization), however, final organizational legal compliance resides with the adopting vendor.

### ✅ Crucial Usage Recommendations:
1.  **Never Bypass Ports:** Do not inject external framework logic into the `/domain` folders.
2.  **Sync with ADRs:** Every deviation from these standards demands the consultation of the existing **46 Architectural Decisions** before proposal.
3.  **Adopt Docs-as-Code:** No pull requests will be evaluated if corresponding documentation mappings are missing.

---

## ⚡ 4. High-Level Architecture & Ecosystem Quick Map

### 🚀 Authorized Polyglot Federation (Horizon 2026)
 Workloads distribute globally according to validated runtime constraints ([ADR-0040](./architecture/adrs/core/0040-multi-runtime-selection-contracts.md)):

| Runtime | Canonical Role | Authorized Baseline Stack |
| :--- | :--- | :--- |
| **🟢 Node.js / TS** | Transactional APIs & BFFs | NestJS 11.1 / Node 24 LTS / Drizzle |
| **🔵 .NET (C#)** | High Compute / Heavy Async | ASP.NET Core / .NET 10.0 LTS / EF Core |
| **🟣 Android** | Offline Native Mobile | Kotlin 2.3 / Jetpack Compose 1.11 / Room |

### 🛠️ Fast Shortcuts Directory
*   📂 **[Repository Taxonomy Policy](./governance/standards/repository-taxonomy.md)**: Standard directory structure and naming conventions.
*   🏛️ **[Reference Blueprint](./architecture/blueprints/reference-blueprint.md)**: Master system specification.
*   🚀 **[Evolutionary Strategy](./governance/standards/vision/evolutionary-strategy-roadmap.md)**: KPI dashboard and scale horizons.
*   📜 **[ADR Registry Hub](./architecture/adrs/README.md)**: Fast-track lookup for universal decisions.
*   🧪 **[Executable Sandbox Demo](./arc-corporate-ws/demo/README.md)**: Test architecture patterns in live running code.

---
🤖 **AI-Augmented Enablement:** Seeking MCP and LLM agent architectures? → [Explore AI Module](./governance/standards/ai-augmented/README.md)
