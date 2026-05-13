# 📖 Engineering & DevOps Playbooks

Actionable runbooks for repeated tasks.

## Playbook 01: Document Sanitization
**Objective**: Maintain UTF-8 compliance and clear Mojibake.
**Workflow**:
1. Execute `python bmad-core/scripts/cleanup_markdown_encoding.py`.
2. Review output for modified files.
3. Stage, commit as `docs: sanitize markdown encoding`, and push.

## Playbook 02: Architecture Validation (Context7)
**Objective**: Run architectural impact analysis before coding.
**Workflow**:
1. Load `context7.json`.
2. Cross-reference module boundaries with requested changes.
3. Generate technical story under strict boundary constraints.
