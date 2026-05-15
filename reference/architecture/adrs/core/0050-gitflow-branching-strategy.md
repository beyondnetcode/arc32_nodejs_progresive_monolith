# ADR 0050: Gitflow Branching Strategy Standardization

## Status
Accepted

## Context
As the ecosystem grows with multiple satellite systems and contributors, the lack of a unified branching strategy has led to inconsistent release cycles, difficulty in tracking production-ready code, and occasional regressions. We need a robust, standardized workflow to manage features, releases, and hotfixes.

## Decision
We will adopt **Gitflow** as the mandatory branching strategy for all satellite systems within the arc32 ecosystem.

### Branching Model:
1. **`main`**: Stores the official release history. All code in `main` must be production-ready.
2. **`develop`**: Serves as an integration branch for features. This is where the "next release" is built.
3. **`feature/*`**: Used for developing new features. They branch off from `develop` and must be merged back into `develop` via Pull Request.
4. **`release/*`**: Used when `develop` has acquired enough features for a release. Only bug fixes and metadata updates are allowed here. Merges into both `main` and `develop`.
5. **`hotfix/*`**: Used to quickly patch production releases. Branch off from `main` and merge into both `main` and `develop`.

### Pull Request (PR) Requirements:
- All merges into `develop` and `main` must be performed through Pull Requests.
- PRs must pass all automated CI checks (Linting, Tests, Security Audit).
- Mandatory peer review is required before merging.

## Consequences
- **Pros**:
 - Clear distinction between production-ready code and work-in-progress.
 - Systematic approach to releases and emergency patches.
 - Improved collaboration and code quality through mandatory PRs and reviews.
- **Cons**:
 - Higher administrative overhead compared to simpler models (like Trunk-Based Development).
 - Requires developers to be disciplined with branch switching and merging.

---
[Back to Index](./README.md)
