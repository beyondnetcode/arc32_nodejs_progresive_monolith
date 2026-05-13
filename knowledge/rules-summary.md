# BMAD-METHOD Rules Summary

| ID | Title | Agents Scope | Trigger | Description |
| :--- | :--- | :--- | :--- | :--- |
| **R-01** | Bilingual Documentation Sync | `po`, `architect`, `analyst`, `dev`, `qa`, `sm` | Any document or artifact update | Must simultaneously update both Spanish and English versions to keep them in sync. |
| **R-02** | Contextual Architecture Awareness (Context7) | `architect`, `dev` | Any task involving architectural context | Always resolve and load the live project context using context7 before executing. |
| **R-03** | UTF-8 and Markdown Encoding Integrity | `po`, `architect`, `analyst`, `dev`, `qa`, `sm` | Finalizing document output | All outputs must be 100% UTF-8 clean without corrupted glyphs or special characters. |
| **R-04** | Diagram Language Consistency | `po`, `architect`, `analyst` | Creating or updating diagrams | Diagram labels must strictly match the language of the document they belong to. |
| **R-05** | Tech Stack Coherence Enforcement | `architect`, `dev`, `analyst` | Processing technical references | All tech references must be validated against the approved project tech stack. |
| **R-06** | UC and Story Separation of Concerns | `po`, `analyst`, `architect` | Creation or update of UCs/stories | Properly classify artifacts (FUNCTIONAL, TECHNICAL, TECHNICAL_ENABLER) and split mixed stories. |
| **R-07** | UC Traceability on Diagram Updates | `po`, `architect`, `analyst` | UC creation or update | Identify and update all impacted diagrams, logging changes and the triggering UC ID. |
| **R-08** | Authentication Flow Completeness | `architect`, `analyst`, `po` | Diagraming or documenting auth flows | Auth flows must explicitly represent both IDP and Internal paths and their decision point. |
| **R-09** | Functional Readability Standard | `po`, `analyst` | Writing functional documentation | Functional artifacts must use plain language without technical jargon. |
| **R-10** | Audit Report Format on Verification Tasks | `qa`, `sm`, `architect` | Executing verification or audit | Audits must produce a structured report containing artifact, location, issue type, severity, and fix. |
| **R-11** | PO-first Architect-second Execution Order | `po`, `architect`, `sm` | Tasks needing functional and tech analysis | Execute PO agent first, then Architect agent; never parallelize or reverse this order. |
| **R-12** | Naming and Tagging Convention Enforcement | `po`, `analyst`, `architect`, `dev`, `qa`, `sm` | Artifact creation or update | Strictly apply project naming conventions, category prefixes, and tags to all artifacts. |
