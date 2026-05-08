# ADR 0017: Feature Flagging Strategy for Progressive Delivery

## Status
Proposed

## Date
2026-05-08

## Context
Deploying new, complex, or risky features often requires halting the system or risking production stability. We need a mechanism to deploy code to production in a dormant state and enable it for specific users, tenants, or globally at runtime without recompiling or redeploying the application.

## Decision
We will implement a **Feature Flagging (Toggle)** architecture:

1. **Dynamic Toggles (Infrastructure Adapter)**: We will use a dedicated feature flag management system (like Unleash, LaunchDarkly, or a custom in-house Postgres module). Crucially, the Core will only depend on an `IFeatureTogglePort`. The actual tool (e.g., Unleash SDK) will be strictly confined to an Infrastructure Adapter. Changing from Unleash to LaunchDarkly will require zero changes to the Domain or Application layers.
2. **Progressive Rollouts**: Code branches for new features within Use Cases will evaluate the `IFeatureTogglePort`. This allows for A/B testing, Canary releases (enabling a feature for only 5% of users), and instant "kill switches" if a new feature causes critical errors.

## Consequences
* **Pros**: Decouples deployment from release. Enables trunk-based development and zero-downtime rollbacks for failing features.
* **Cons**: Introduces "Toggle Debt" (old feature flags left in the code base must be manually cleaned up after successful rollouts). Adds slight overhead to code execution paths.
