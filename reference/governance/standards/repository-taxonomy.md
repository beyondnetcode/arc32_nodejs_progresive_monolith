# Enterprise Taxonomy & Repository Structuring Policy

> **Status:** ¡ Proposed | **Version:** 1.0.0 | **Framework:** BMAD-METHOD & Clean Architecture

This document establishes the **official and immutable policy** for the structuring, taxonomy, and governance of this enterprise repository.

---

## 1. Standard Directory Structure (The Blue-Map Layout)

```text
/ (Repository Root)
 README.md # Executive Portal (Vision and initial navigation)
 MASTER_INDEX.md # Role-Based Routing
 .bmad-core/ # Jump to: ENGINE: BMAD-Method implementation (Agents, Tooling)
 .github/ # CI/CD: Workflows, Actions, Issue/PR Templates
 .harness/ # AI CONTEXT: Base rules, Playbooks, Prompts
 governance/ # LAWS: Policies, SDLC, and Standards
 architecture/ # BLUEPRINTS: ADRs, Architecture, C4 Models
 src/ # BUSINESS: Source code encapsulated by domain (DDD). Contains 100% of the product's source code.
 infrastructure/ # FOUNDATION: Infrastructure as Code (IaC), DevOps
 operations/ # RUN: Operations Playbooks, Observability
-- knowledge/ # LEARNING: Onboarding, POCs, Examples, Training
```

> [!IMPORTANT]
> **Prohibition of "Junk" Folders:** It is strictly forbidden to create folders with names like `utils`, `misc`, `temp`, `common`, `shared` without context. Every piece of code must belong to a Domain, Infrastructure, or Operations.

## 2. Taxonomy and Naming Conventions

- **Directories and Base Files:** Strict `kebab-case` (e.g. `user-management`).
- **ADRs:** `[4-digit-ID]-[descriptive-title].md` -> `0001-use-postgresql-for-users.md`
- **Layer Naming in Domains:**
 - `app-*`: Deployable application or artifact (e.g. `app-user-api`).
 - `lib-*`: Domain or shared technical library (e.g. `lib-auth-guard`).

## 3. Navigation Strategy (SSoT)

1. **Role-Based Navigation:** Guided by `MASTER_INDEX.md`.
2. **Docs-as-Code:** Forbidden to repeat standards; always link to `governance/`.
3. **Breadcrumbs:** Every deep Markdown document must contain a backlink to `MASTER_INDEX.md`.

## 4. Domain Separation (DDD)

The code in `src/` is organized by **Business Capability**. Code inside `user-management` cannot directly import internal files from another domain. Inter-domain communication must be resolved via formal contracts (Interfaces, APIs, Events).

---
[Back to Index](./README.md)
