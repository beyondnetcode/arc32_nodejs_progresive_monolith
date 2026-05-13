# ⚖️ Global Rules (Context-Optimized)

Binding directives. Zero fluff.

| ID | Rule | Constraint |
|---|---|---|
| **R-01** | Bilingual Sync | Spanish and English docs/diagrams must stay 100% in sync. |
| **R-02** | Context7 | Always consult `context7` for live architecture limits before technical tasks. |
| **R-03** | UTF-8 Clean | Document outputs must be pure UTF-8; no encoding artifacts allowed. |
| **R-04** | Label Lang | Diagram labels must strictly match document language. |
| **R-05** | Tech Stack | Validate all technical mentions against the approved tech stack only. |
| **R-06** | Split Stories | Separate FUNCTIONAL, TECHNICAL, and ENABLER. Never mix business with impl details. |
| **R-07** | Traceability | When a UC changes, update all relevant diagrams & log: [Doc, Type, Change, UC ID]. |
| **R-08** | Auth Path | Authentication designs must explicitly show both IDP and Internal flows. |
| **R-09** | Readability | Functional docs use plain language; no technical jargon. |
| **R-10** | Audit Format | Audits output: [Document, Location, Issue Type, Severity, Recommended Fix]. |
| **R-11** | Order | Dual tasks execute: 1. PO (functional) -> 2. Architect (technical). No parallel execution. |
| **R-12** | Conventions | Strictly enforce naming prefixes & taxonomies before merges. |
