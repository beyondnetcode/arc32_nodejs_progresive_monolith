# MCP Security: Permissions and Guardrails

Connecting a non-deterministic inference engine (LLM) directly with your backend APIs introduces new attack vectors. An agent "convinced" via jailbreak may try to abuse its tools. Therefore, security in the MCP harness is non-negotiable.

## Minimum Privilege Model
Apply the least privilege principle at the Tooling level:

* **Separation by Role:** A BI report agent must NEVER receive access to an MCP Server exposing write tools (`DELETE`, `UPDATE`).
* **Dynamic Scopes:** The harness must filter the tool catalog injected into the LLM based on the identity of the final user operating through the agent.

## Mandatory Guardrails for Production

For an MCP Server to be approved by Corporate Security, it must implement:

1. **Robust Authentication:** 
 * If using HTTP/SSE, validation of mTLS tokens or short-lived Bearer tokens (OAuth2).
 * Do not rely on security through obscurity within the internal network.
2. **Irrevocable Audit Log:** 
 * Each `CallTool` request must be recorded in an immutable database with: `timestamp`, `agent_id`, `human_user_id`, `tool_name`, `input_arguments`, and `response_hash`.
3. **Adaptive Rate Limiting:**
 * Limit not just requests/second, but cumulative financial cost (e.g., no more than $10 USD in geolocated API calls per agent per hour).
4. **Execution Sandbox:**
 * Tools enabling the execution of scripts, raw SQL queries, or system commands MUST run in ephemeral containers (Docker/gVisor) with strictly blocked or whitelisted network access.

## The Great Warning of Veracity

> [!CAUTION]
> **The model does not validate truth.** The LLM assumes ANY RESPONSE returned by a tool is absolute truth and will build its reasoning upon it.
> If an attacker compromises your MCP Server to return fake data, they will instantly deceive your Agent. Tool output data integrity is just as important as input sanitization.

## Mandatory Human-in-the-Loop
Any tool categorized as **"Destructive"** (Delete database, cancel massive subscription, execute bulk payment) requires the harness to intercept the call, set the status to `PENDING_APPROVAL`, and wait for a human to physically click a button before running backend code.

---
[Back to Index](./README.md)
