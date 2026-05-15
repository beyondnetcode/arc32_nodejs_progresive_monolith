# Repository Approved Tools Inventory

This is a baseline of approved generic tools currently usable inside the monorepo ecosystem to empower our internal agents.

## 1. Filesystem Interaction (Provided by Host / Shell)
* **`read_file`**: Read contents of a text file safely.
* **`write_to_file`**: Overwrites or creates text files. Requires verification hooks after run.
* **`ls / list_dir`**: Recursively list structure of a directory.
* **`grep_search`**: Fast substring search across codebase.

## 2. Software Life-Cycle Tools (Executed via Terminal Harness)
* **`run_command`**: Execute arbitrary bash/ps1 commands. **CRITICAL**: Highly restricted. Cannot be run in CI/CD without hard sandbox.
* **`npm_run`**: Specifically scoped to execute standard repository script triggers defined in `package.json`.
* **`git_commit`**: Allows agent to checkpoint progress automatically.

## 3. Corporate MCP Catalog (Under Active Development)
* *Coming Soon*: `confluence_search` - To provide centralized architecture context.
* *Coming Soon*: `jira_update_ticket` - To sync development progress with administrative tickets.
* *Coming Soon*: `sentry_fetch_issue` - To feed real production error logs to debug-agents.

---
[Back to Index](./README.md)
