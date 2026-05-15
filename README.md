# arc32: Enterprise Progressive Architecture

[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)]()
[![Method](https://img.shields.io/badge/Method-BMAD--METHOD-blueviolet?style=for-the-badge)]()
[![License](https://img.shields.io/badge/License-MIT-informational?style=for-the-badge)]()

**arc32** is an open technical reference for building products that can start as simple monoliths, grow into modular monoliths, and evolve toward distributed services only when the product, team, and operation justify it.

> Separate conceptually before separating physically.

[English](./README.md) | [Español](./README.es.md)

---

## Start Here

| If you want to... | Go to |
|---|---|
| Understand the whole repository | [Global Master Index](./MASTER_INDEX.md) |
| Learn the architecture model | [Reference Blueprint](./reference/architecture/blueprints/reference-blueprint.md) |
| Review the universal rules | [Agnostic Architecture Baseline](./reference/architecture/blueprints/authoritative-tech-stack-agnostic.md) |
| Explore decisions and trade-offs | [ADR Registry](./reference/architecture/adrs/README.md) |
| Inspect the executable example | [Demo Sandbox](./reference/knowledge/demo/README.md) |

---

## The Architecture Journey

arc32 is intentionally progressive. It does not treat microservices as the default starting point.

```text
Simple Monolith
  -> Modular Monolith
    -> Distributed Modules
      -> Microservices
```

The repository helps teams decide **when to stay simple**, **when to modularize**, and **when distribution is worth the operational cost**.

---

## Repository Map

| Area | What you will find |
|---|---|
| [reference/architecture/](./reference/architecture/blueprints/README.md) | Blueprints, topology, stack profiles, and architectural decisions |
| [reference/governance/](./reference/governance/standards/README.md) | Engineering standards, SDLC, onboarding, and architecture rules |
| [reference/operations/](./reference/operations/README.md) | Observability, runtime support, and operational documentation |
| [reference/infrastructure/](./reference/infrastructure/README.md) | Local platform, gateway, containers, and infrastructure assets |
| [reference/knowledge/](./reference/knowledge/demo/README.md) | Demo documentation, research, examples, and learning material |
| [src/](./src/apps/todo-web/README.md) | Reference implementation and executable sandbox |

For role-based navigation, use the [Global Master Index](./MASTER_INDEX.md).

---

## Recommended First Reads

1. [Architectural Directives](./reference/governance/standards/vision/architectural-directives.md)
2. [Reference Blueprint](./reference/architecture/blueprints/reference-blueprint.md)
3. [Agnostic Architecture Baseline](./reference/architecture/blueprints/authoritative-tech-stack-agnostic.md)
4. [ADR Registry](./reference/architecture/adrs/README.md)
5. [Demo Sandbox](./reference/knowledge/demo/README.md)

---

## Quick Start: Demo Sandbox

```bash
git clone https://github.com/beyondnetcode/arc32_progresive_monolith.git
cd arc32_progresive_monolith/src
npm install

docker-compose -f ../reference/infrastructure/docker-compose.yml up -d
npm run dev
```

The demo exists to show architecture patterns in code. General rules and policies remain in `reference/architecture/` and `reference/governance/`.

---

## Contribution

Contributions are welcome through issues, documentation improvements, ADR reviews, examples, tests, and refinements to the demo.

Before contributing, read:

- [Repository Taxonomy](./reference/governance/standards/repository-taxonomy.md)
- [Engineering Manifesto](./reference/governance/standards/engineering/engineering-manifesto.md)
- [Gitflow ADR](./reference/architecture/adrs/core/0050-gitflow-branching-strategy.md)

---

## License

This project is published as an open technical reference under the repository license.

---

<div align="center">
 <sub>2026 arc32 Ecosystem | BMAD-METHOD | AI-Augmented Engineering</sub>
</div>
