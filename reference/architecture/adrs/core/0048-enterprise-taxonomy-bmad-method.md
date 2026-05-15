# ADR-0048: Enterprise Taxonomy Standardization and Layout (BMAD-METHOD)

## Status
Accepted

## Context
As the ecosystem evolves into a Progressive Monolith, the proliferation of nested folders and the lack of strict naming conventions have generated cognitive load for developers and difficulties for the routing of Artificial Intelligence agents (BMAD-Method).
An immutable policy was required to unify the directory structure, the separation by domains, and the location of governance artifacts at the root of the repository, ensuring the principle of Single Source of Truth (SSoT) in documentation (Docs-as-Code).

## Decision
It has been decided to adopt and enforce the **Enterprise Taxonomy and Repository Structuring Policy** as a global, immutable, and inheritable standard for this repository and all satellite ecosystems.

The mandatory key rules are:
1. **The Blue-Map Layout:** The project root must be kept flat and strictly divided by layers of abstraction (`governance`, `architecture`, `src`, `03-infrastructure`, `04-operations`, `knowledge`).
2. **Prohibition of Common Folders:** Folders like `utils`, `misc`, or `shared` are not allowed at the global or domain level without a justified business context.
3. **DDD Encapsulation:** All source code of applications and libraries must be migrated from a technical approach (e.g., `apps/` and `libs/`) to a Domain approach (`src/[domain-name]`).
4. **Naming Conventions:** Strict use of `kebab-case` and prefixes to identify artifact types (`app-`, `lib-`).
5. **Dot-Folders for Tooling:** Technical tools such as AI (`.harness`), automations (`.github`), or engines (`.bmad-core`) must be placed in hidden folders starting with a dot.

## Consequences
### Positive:
* **Improved Developer Experience (DX):** Navigation is radically simplified and guided through the `MASTER_INDEX.md`.
* **Immediate Scalability:** The clear separation in `src` facilitates the future extraction of microservices (Microservice Extraction Readiness).
* **Better AI Interaction:** Agents like Cline/Windsurf/Cursor now have an isolated and optimized "AI Context" (`.harness`) without generating visual noise at the root.

### Negative/Risks:
* **Initial Refactoring:** It implied a major change (Breaking Change at the folder level) that required updating `nx.json`, `package.json`, and rewriting internal hyperlinks throughout the documentation.
* **Learning Curve:** New developers must be obligatorily trained on the taxonomy policy (located in `governance/standards/repository-taxonomy.md`) before creating new folders.

---
[Back to Index](./README.md)
