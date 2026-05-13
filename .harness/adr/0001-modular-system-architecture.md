# 🏛️ Harness ADR-001: Modular System Architecture

- **Status**: Accepted
- **Context**: AI agents waste context window tokens parsing excessive documentation, leading to drift, increased costs, and hallucination.
- **Decision**: Implement a distributed modular architecture under `/ai-harness`.
- **Consequences**:
  - Highly focused, single-responsibility documents.
  - Faster agent response times.
  - Extremely cheap token footprints.
