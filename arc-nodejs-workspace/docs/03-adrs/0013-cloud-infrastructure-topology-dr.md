# ADR 0013: Cloud Infrastructure Topology and Disaster Recovery (DR)

## Status
Approved

## Date
2026-05-08

## Context
The business operations handled by this architecture demand 24/7 continuous execution stability. A datacenter component failure or broad availability zone blackout cannot bring operational critical path processing offline for manual hours. Our distribution plan across target cloud topologies requires explicit policy definitions.

## Decision
Design infrastructure topology targeting Cloud-Native patterns enforcing high resilience and instant failover potential:

1. **Automated Orchestration**: Containers are strictly deployed into managed cluster platforms (e.g., Kubernetes - AKS/EKS or Container Apps) capable of autonomous Horizontal Pod Autoscaling (HPA) to balance burst events.
2. **Multi-AZ Strategy**: Standard operation occurs active-active across several explicit Availability Zones. A secondary backup region remains in warm-standby for immediate disaster pivot.
3. **Global Network Entry**: Deploy a unified external point of ingress (e.g., Cloudflare/Azure Front Door) to analyze health and perform instant routing redirect across regions if local cluster degradation is detected.

## Consequences

### Positive
- Preserves seamless uptime commitments to global corporate operational chains.
- Mitigates damage potential from vendor or structural zone outages.

### Negative
- Active-Active distribution mathematically doubles infrastructure run-costs.
- Requires sophisticated CI/CD pipelines engineered for multi-target orchestration setups.

## References
- [ADR-0011: Fault Tolerance](./0011-fault-tolerance-resiliency-patterns.md)
- [ADR-0028: Self-Hosted Hybrid Strategy](./0028-self-hosted-hybrid-infrastructure-on-premise.md)