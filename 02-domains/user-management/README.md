# 🌐 Corporate Reference Platform Architecture (BMAD-METHOD)

## 🎯 Repository Purpose
This is the authorized canonical base for constructing scalable, multi-tenant, and polyglot digital products within the organization. The system implements a Progressive Modular Monolith mathematically designed to evolve surgically toward microservices without domain rewriting.

This repository possesses a strict physical segmentation to shield immutable laws against experimentation:

---

### 🏛️ Layer 1: Corporate Standards (CSL)
**For**: Tech Leads, Architects, Vendors, and Teams starting a development.
Here resides the "Law": 44 authorized ADRs, the arc42 Blueprint, 2026 stack audit opinions, and global engineering standards.
👉 **[See Corporate Standards](./corporate-standards/README.md)**

---

### 🧪 Layer 2: Demo / Sandbox App (To-Do)
**For**: Developers and QA Engineers wishing to execute real code.
Includes the demonstrative application validating hexagonal boundaries, Row-Level Security (RLS), and distributed telemetry.
👉 **[Explore Demo Application](./demo/README.md)**

---

## 🚀 Official Authorized Runtimes (Horizon 2026)
The architecture is agnostic and authorizes the following selection matrix based on workload ([ADR-0040](./corporate-standards/02-adrs/core/0040-multi-runtime-selection-contracts.md)):

| Runtime | Validated Ecosystem | Canonical Role | Guide Status |
| :--- | :--- | :--- | :--- |
| **Node.js / TS** | NestJS 11.1 / Node 24 LTS | Transactional APIs and BFF | [[ADR 0002]](./corporate-standards/02-adrs/nodejs/0002-clean-architecture-nestjs.md) / [[0003]](./corporate-standards/02-adrs/nodejs/0003-strict-typescript-standards.md) |
| **.NET (C#)** | ASP.NET Core / .NET 10 LTS | High Compute / Batch / Workers | [[ADR 0041]](./corporate-standards/02-adrs/dotnet/0041-canonical-dotnet-backend-architecture.md) |
| **Android** | Kotlin 2.3 / Compose 1.11 | Native Mobile Applications | [[ADR 0042]](./corporate-standards/02-adrs/android/0042-canonical-android-mobile-architecture.md) |

---

## 📚 Quick Adoption Guide
Starting a new corporate product?
Follow the step-by-step manual to clone, configure, and scaffold your first bounded context:
👉 **[Consult the Product Quick-Start (Getting Started)](./corporate-standards/05-onboarding/product-quick-start.md)**

---
**🔒 Repository Shielding Level**: Sanitized Status. Complies with Apache 2.0 / BSD licenses (Post-SSPL/BSL validated May 2026).
