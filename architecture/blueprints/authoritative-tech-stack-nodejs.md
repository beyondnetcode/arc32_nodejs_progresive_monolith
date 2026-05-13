# ðŸ“ Authoritative Tech Stack: Node.js & TypeScript Ecosystem

> ðŸŒ **Bilingual Navigation:** [ðŸ‡ªðŸ‡¸ VersiÃ³n en EspaÃ±ol](./authoritative-tech-stack-nodejs.es.md)

**Document Type:** Runtime Addendum  
**Prerequisite:** MUST be read after the **[Agnostic Baseline](./authoritative-tech-stack-agnostic.md)**.  

---

## ðŸ“‹ 1. Executive Compliance Matrix (Vendor Mandates)

| Category | Approved Tool / Framework | Validated Version | ADR Required to Swap? | Explicitly Rejected Alternatives |
| :--- | :--- | :--- | :--- | :--- |
| **Runtime Base** | **Node.js (LTS)** | 20.x | **YES** | Bun, Deno (until further audit) |
| **Web Host** | **NestJS (Express Engine)** | 10.x+ | **YES** | Fastify (unless ADR approved), Bare Express |
| **Relational ORM** | **TypeORM** or **Drizzle** | Latest | **NO** | Sequelize, Prisma (requires performance ADR) |
| **Validation** | **class-validator** | Latest | **NO** | Zod (except for API contracts) |
| **Testing Engine** | **Jest** | 29.x | **YES** | Mocha, Ava |
| **Monorepo Orchestrator**| **Nx** | 18.x+ | **YES** | Turborepo, Lerna |

---

## ðŸ—ï¸ 2. Architecture Organization (Nx Workspace)

Node.js solutions MUST utilize strict library isolation enforced by **Nx tags**:
1.  **`type:domain`**: Zero external imports. Pure TS objects.
2.  **`type:application`**: Contains NestJS-agnostic logic, purely dependency-injected command handlers.
3.  **`type:infrastructure`**: Contains NestJS concrete modules, ORM entities, and adapters.
4.  **`type:api`**: Entry point NestJS application shell.

---

## ðŸ’¾ 3. Specific Runtime Tools

*   **Compiler:** `@swc/core` for 20x faster CI/CD compilation.
*   **Linting:** ESLint v8 strict mode + Prettier configuration.

---
ðŸ‘‰ Back to **[Global Master Index](../../../MASTER_INDEX.md)**

---
[? Back to Index](./README.md)
