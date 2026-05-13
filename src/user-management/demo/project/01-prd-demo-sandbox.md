# 📄 Product Requirements Document (PRD)

> 🌍 **Bilingual Navigation:** [🇪🇸 Versión en Español](./01-prd-demo-sandbox-es.md)

**Product:** ARC32 Reference Sandbox ("To-Do Labs")  
**Product Owner:** Product Manager [BMAD Role]  
**Current Phase:** MVP (Phase 1)

---

## 🎯 1. Executive Summary
This product is not a commercial end-user application. It is a **Pattern Laboratory** specifically engineered to physically validate that the corporate architectural standards defined in the ADRs operate harmoniously within a real software lifecycle. Its success is measured by the rigidity and cleanliness of its architectural boundaries, not by user-facing feature bloat.

## 🚀 2. Vision and Key Value Proposition
Demonstrate via executable live code the deployment of a highly reactive ecosystem enforcing **Row-Level Security (RLS)** and **Hexagonal Architecture**, maintaining the core business logic fully shielded from persistence engine iterations or framework transitions.

## 📋 3. Functional Requirements
| ID | Requirement | Critical Description |
| :--- | :--- | :--- |
| **REQ-01** | Identity Management | User registration, login, and mandatory `tenantId`-injected JWT issuance. |
| **REQ-02** | Task CRUD | Creation, Listing, Filtering, and state updating for atomic per-user items. |
| **REQ-03** | Categorization | Dedicated folder assignment for organization grouping buckets. |

## 🏗️ 4. Non-Functional Requirements & Accepted Technical Debt
1.  **Domain Isolation:** Strict ban on `@nestjs` or native database library imports inside the `/domain` core module.
2.  **Native SQL Isolation:** The sandbox must force backend pooling middleware to preset the session local `app.current_tenant` context context before executing ANY query.
3.  **Eventual Consistency:** Explicitly deferred to Phase 2 via Outbox implementations. Phase 1 safely tolerates synchronous intra-module communication.

---

## ⚖️ 5. Demo Success Criteria
1.  **Security:** Run a raw `SELECT` in the Context of User A and prove User B data is completely invisible at the wire level.
2.  **Agnosticism:** Hot-swap database infrastructure adapters to `InMemory` test harness iterations without modifying a single character inside Domain or Application logic layers.
