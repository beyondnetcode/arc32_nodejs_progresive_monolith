# Enterprise Taxonomy & Repository Structuring Policy

> **Status:** Accepted | **Version:** 4.0.0 | **Framework:** BMAD-METHOD & Docs-as-Code

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
 reference/ # REFERENCE CORPUS: Architecture, governance, knowledge, operations, and infrastructure
   architecture/ # BLUEPRINTS: ADRs, architecture, C4 models, stack profiles
   governance/ # LAWS: Policies, SDLC, standards, onboarding, documentation rules
   knowledge/ # LEARNING: Demo documentation, research, POCs, examples
   operations/ # RUN: Operations playbooks and observability assets
   infrastructure/ # FOUNDATION: Local platform, gateway, containers, infrastructure assets
 src/ # SOURCE: Executable reference implementation and technical sandbox
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
2. **Docs-as-Code:** Forbidden to repeat standards; always link to the canonical artifact under `reference/`.
3. **Breadcrumbs:** Every deep Markdown document must contain a backlink to `MASTER_INDEX.md`.

## 4. Domain Separation (DDD)

The code in `src/` is organized by **Business Capability**. Code inside `user-management` cannot directly import internal files from another domain. Inter-domain communication must be resolved via formal contracts (Interfaces, APIs, Events).

## 5. Root Directory Policy

The repository root must remain intentionally small and navigable. Public discovery starts in `README.md` and `MASTER_INDEX.md`; deep architectural, governance, operational, infrastructure, and knowledge artifacts live under `reference/`.

Only these categories are allowed at root:

- Public navigation files (`README.md`, `README.es.md`, `MASTER_INDEX.md`, `MASTER_INDEX.es.md`, `LICENSE`).
- Tooling and platform dot-folders (`.github/`, `.harness/`, `.bmad-core/`, editor and automation configuration).
- `src/` for executable implementation.
- `reference/` for the documentation and architecture corpus.

---
[Back to Reference Hub](../../../README.md)
