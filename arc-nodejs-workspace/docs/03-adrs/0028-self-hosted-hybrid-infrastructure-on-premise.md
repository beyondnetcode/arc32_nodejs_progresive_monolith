# ADR 0028: Self-Hosted, Open-Source Hybrid Infrastructure

## Status
Approved

## Date
2026-05-09

## Context
Relying solely on locked-in serverless cloud vendors (e.g., AWS SQS, DynamoDB, Cognito) kills ability to deploy to sovereign air-gapped corporate client networks on-premise. Cloud pricing curves expand wildly under high throughput. We require absolute tech sovereignty that seamlessly mirrors across public clouds AND disconnected hardware clusters.

## Decision
Strictly govern internal tooling selection based on the **100% Open-Source and Self-Hostable Principle**:

1. **MinIO (Object Storage)**: Standardize on the S3-compatible engine. Run in local Kubernetes cluster directly.
2. **RabbitMQ (Bus)**: Drive asynchronous communication via open source AMQP brokers instead of proprietary queues.
3. **Vault & KeyCloak**: Handle native local secrets distribution and localized credentials pools using proven CNCF ecosystems.
4. **Direct PostgreSQL/Redis**: Drive caching and state through native v16+ engines deployed via Helm, bypassing vendor-wrapped managed DB limitations.

## Consequences

### Positive
- 100% Cloud Neutral: Code deploys anywhere from an engineer's Mac to an isolated military cluster with zero refactoring.
- Total cost transparency: Eliminates opaque transaction-based scaling bills.

### Negative
- Increases administrative overhead. Local DevOps must maintain replication, backups, and scale patching that major clouds typically handle automatically.

## References
- [ADR-0013: Cloud Topology](./0013-cloud-infrastructure-topology-dr.md)
- [Stack Definition Reference](../../02-architecture/stack.md)