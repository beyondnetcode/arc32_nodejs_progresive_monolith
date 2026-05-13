# ðŸ“œ Enterprise Taxonomy & Repository Structuring Policy

> **Status:** ðŸŸ¡ Proposed | **Version:** 1.0.0 | **Framework:** BMAD-METHOD & Clean Architecture

This document establishes the **official and immutable policy** for the structuring, taxonomy, and governance of this enterprise repository.

---

## ðŸ—ï¸ 1. Standard Directory Structure (The Blue-Map Layout)

```text
/ (Repository Root)
â”œâ”€â”€ ðŸ“œ README.md                 # Executive Portal (Vision and initial navigation)
â”œâ”€â”€ ðŸ“œ MASTER_INDEX.md           # Role-Based Routing
â”œâ”€â”€ ðŸ“ .bmad-core/               # âš¡ ENGINE: BMAD-Method implementation (Agents, Tooling)
â”œâ”€â”€ ðŸ“ .github/                  # ðŸ¤– CI/CD: Workflows, Actions, Issue/PR Templates
â”œâ”€â”€ ðŸ“ .harness/                 # ðŸ§  AI CONTEXT: Base rules, Playbooks, Prompts
â”œâ”€â”€ ðŸ“ governance/            # âš–ï¸ LAWS: Policies, SDLC, and Standards
â”œâ”€â”€ ðŸ“ architecture/          # ðŸ—ï¸ BLUEPRINTS: ADRs, Architecture, C4 Models
â”œâ”€â”€ ðŸ“ src/               # ðŸ“¦ BUSINESS: Source code encapsulated by domain (DDD). Contains 100% of the product's source code.
â”œâ”€â”€ ðŸ“ infrastructure/        # ðŸ› ï¸ FOUNDATION: Infrastructure as Code (IaC), DevOps
â”œâ”€â”€ ðŸ“ operations/            # ðŸš€ RUN: Operations Playbooks, Observability
â””â”€â”€ ðŸ“ knowledge/             # ðŸŽ“ LEARNING: Onboarding, POCs, Examples, Training
```

> [!IMPORTANT]
> **Prohibition of "Junk" Folders:** It is strictly forbidden to create folders with names like `utils`, `misc`, `temp`, `common`, `shared` without context. Every piece of code must belong to a Domain, Infrastructure, or Operations.

## ðŸ—‚ï¸ 2. Taxonomy and Naming Conventions

- **Directories and Base Files:** Strict `kebab-case` (e.g. `user-management`).
- **ADRs:** `[4-digit-ID]-[descriptive-title].md` -> `0001-use-postgresql-for-users.md`
- **Layer Naming in Domains:**
  - `app-*`: Deployable application or artifact (e.g. `app-user-api`).
  - `lib-*`: Domain or shared technical library (e.g. `lib-auth-guard`).

## ðŸ§­ 3. Navigation Strategy (SSoT)

1. **Role-Based Navigation:** Guided by `MASTER_INDEX.md`.
2. **Docs-as-Code:** Forbidden to repeat standards; always link to `governance/`.
3. **Breadcrumbs:** Every deep Markdown document must contain a backlink to `MASTER_INDEX.md`.

## ðŸ§© 4. Domain Separation (DDD)

The code in `src/` is organized by **Business Capability**. Code inside `user-management` cannot directly import internal files from another domain. Inter-domain communication must be resolved via formal contracts (Interfaces, APIs, Events).

---
[? Back to Index](./README.md)
