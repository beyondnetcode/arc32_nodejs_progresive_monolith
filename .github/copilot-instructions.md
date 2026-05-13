# BMAD-METHOD Agent Instructions for VS Code & Antigravity

As an AI assistant (including GitHub Copilot, Antigravity, and other VS Code AI extensions), you must strictly follow the active BMAD-METHOD global rules in this workspace.

## 🚨 MANDATORY REFERENCE RULES
Before generating code, documentation, or processing architectural decisions, you must ALWAYS load and reference the enforceable instructions defined in the following local paths:
- **Primary Enforceable Rules:** `./bmad-core/rules/global-rules.md`
- **Declarative System Config:** `./.bmad/rules/project-rules.yaml`

## 🔑 KEY BEHAVIORS ENFORCED
1. **Bilingual Documentation Sync (R-01):** Simultaneously update both English (`docs/en/...`) and Spanish (`docs/es/...`) documents and diagrams. Never allow them to drift.
2. **Contextual Architecture Awareness (R-02):** Before any architectural task, utilize the project's architecture tool `context7` to validate live boundaries.
3. **Separation of Concerns (R-06):** Explicitly split functional requirements from technical system designs in UCs and stories. No mixed content.
4. **Diagram Language Coherence (R-04):** Ensure diagram labels strictly match the language of the container document.
5. **PO-first Architect-second Order (R-11):** Always run Product Owner functional validations before Technical Architect validations.

Refer to `docs/rules-summary.md` for an immediate summary table of all 12 governing rules.
