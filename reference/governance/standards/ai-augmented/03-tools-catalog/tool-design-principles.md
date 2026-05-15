# Design Principles for Intelligent Tools

## Context
An LLM does not see the code; it only sees the documentation. An exquisitely written tool with poorly described metadata results in a useless agent.

Following these 5 principles maximizes the likelihood of a successful tool-call by 90%.

---

## 1. Semantic Determinism (Clear Naming)
The tool name must be highly explicit and avoid professional jargon unrelated to the action.
* `do_work`
* `process_data`
* `calculate_shipping_tax`
* `fetch_user_by_email`

## 2. The Principle of Hyper-Explicitness in Descriptions
A description is not for a human, it's for a vector space search engine.
* `"Queries products."`
* `"Retrieves the detailed catalog of active products. REQUIRED when the user asks for availability, prices, or stock levels. Do NOT use this for billing queries."`

## 3. Strict Schemas (Zod / JSON Schema)
Never define an argument as a loose `string`. Use `enTODO` and constraints whenever possible to restrict the model's "creativity."
* **Vague Argument:** `status: string`
* **Strict Argument:** `status: "PENDING" | "SHIPPED" | "DELIVERED"`

## 4. High Idempotence (Safe to Retry)
Agents frequently enter recursive retry loops upon failure. If a tool fails halfway through, executing it again MUST NOT generate duplicate side effects (e.g., charging a credit card twice). Tools must accept `idempotency_key` where relevant.

## 5. Semantic Error Handling
If the tool fails, return a textual explanation helping the model understand how to fix the call.
* `HTTP 500 Internal Server Error` (The agent gives up).
* `{"error": "Invalid Format", "details": "Zip code must be 5 numeric digits. Found 'ABC4'. Please correct and retry."}` (The agent reasons, reformulates, and calls again successfully).

---
[Back to Index](./README.md)
