# ADR 0008: Progressive Multi-Module Evolution via BFF Gateway

## Status
Approved

## Context
To guarantee client performance while decoupling front-end and backend development velocities, we must ensure client applications do not directly couple to upstream micro-domain endpoints.

## Decision
We implement the **Backend For Frontend (BFF)** pattern within the monorepo evolution roadmap.

1. **BFF API Layer**: A NestJS-based API handles query aggregation and protocol translation specifically for the user interfaces (e.g., desktop React portal).
2. **Payload Shaping**: The BFF strips unnecessary response fields to speed up mobile and browser payloads.
3. **Decoupling**: Internal context APIs (Auth vs Task vs Billing) remain behind the internal network boundary, accessed only by the authenticated BFF.

## Consequences
- **Pros**: Excellent network overhead reduction, high client velocity.
- **Cons**: Introduces one additional hop in internal networks.
