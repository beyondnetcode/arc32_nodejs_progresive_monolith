# 🦅 Antigravity & Gemini Harness Index

Master entry point for AI agent context orchestration.

## 📋 Context Loading Architecture
To minimize token usage, load only the specific documents needed for the active scope:

- **/rules**: Binding core governance rules. Read `global-rules.md` on startup.
- **/agents**: Agent personas and scope specifications.
- **/standards**: Formatting, architectural, and documentation baselines.
- **/playbooks**: Structured workflows for recurring engineering and devops tasks.
- **/templates**: Empty blueprints for user stories, ADRs, and specifications.
- **/adr**: Harness-specific architectural decision records.

## 🛑 Compliance Enforcement
Before executing tasks, agents must resolve:
1. `ai-harness/.antigravityignore` (Exclusion boundaries).
2. `ai-harness/rules/global-rules.md` (Execution limits).
