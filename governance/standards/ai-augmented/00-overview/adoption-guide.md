# Adoption Guide: AI-Augmented Architecture Models

Incorporating agentic capabilities should not be a "Big Bang". We propose an evolutionary model of 3 increasing maturity levels.

## Adoption Levels

### ðŸŸ¢ Level 1 â€” AI-Assisted (Development Assisted)
The team adopts AI strictly as an accelerator in the software construction process. The final product undergoes no logical alterations.
*   **Architecture Impact:** Zero.
*   **Characteristics:** Usage of Claude Code, Copilot, or terminal agents. They maintain an `AGENTS.md` file in the repository as a minimum harness.
*   **Focus:** Increase developer experience (DX).

### ðŸŸ¡ Level 2 â€” AI-Integrated (Functional Integrated)
The product incorporates the ability to query language models to enrich specific and predictable functionalities.
*   **Architecture Impact:** Medium (Invocations to external inference services).
*   **Characteristics:** Structured calls to LLMs are implemented for ticket classification, structured data extraction, or auto-summarization. Use of MCP to standardize how internal agents consume corporate data.
*   **Focus:** Automation of low-risk cognitive tasks.

### ðŸ”´ Level 3 â€” AI-Orchestrated (Autonomous Orchestration)
The product is led by a dynamic agentic cycle capable of making decisions and executing multi-step plans.
*   **Architecture Impact:** High (Agentic frameworks and complex state machines).
*   **Characteristics:** Autonomous agents utilizing a robust tool catalog. Employs Multi-Agent patterns, recursive reasoning, and deterministic orchestrators with integrated Human-in-the-Loop validations.
*   **Focus:** Supervised operational autonomy.

---

## Level Upgrade Criteria

To advance to the next maturity level, the product architecture team must validate:

1.  **From L1 to L2**: 
    -   âœ… Unit test coverage > 70% in the affected domain.
    -   âœ… Clear definition of the use case (avoiding LLM as a hammer for everything).
    -   âœ… Initial token/cost estimate registered and validated.
2.  **From L2 to L3**:
    -   âœ… Log audit/traceability of LLM calls implemented.
    -   âœ… Functional Human-in-the-Loop workflow for destructive or financial actions.
    -   âœ… Tool definitions with 90% proven idempotence.

## General Prerequisites Checklist

Before starting any agentic initiative (even Level 1):
- [ ] Have a git repository with branch protection rules.
- [ ] Automate linters and type-checking in the CI cycle.
- [ ] Have authorized corporate permissions for model usage (signed DPA).
- [ ] Create the initial `AGENTS.md` harness file based on the corporate standard.

---
[? Back to Index](./README.md)
