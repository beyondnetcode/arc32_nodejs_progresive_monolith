# ADR 0027: Dual-Protocol API Strategy (REST & gRPC)

## Status
Approved

## Date
2026-05-09

## Context
Exposing internal inter-microservice chatter via standard JSON HTTP/1.1 REST APIs leads to massive performance degradation (verbose strings, text decoding cycles). However, absolute external exposure must remain standard REST to preserve third-party developer accessibility. One single protocol will not satisfy both internal efficiency and external compatibility.

## Decision
Orchestrate a strict **Dual-Protocol Runtime Edge** paired with Kong Gateway orchestration:

1. **Standard REST (Public)**: All browser agents, client portal apps, and B2B gateways consume secure, documented JSON REST APIs over standard HTTPS.
2. **Binary gRPC (Internal)**: Any mission-critical internal authorization handshake, machine-to-machine token check, or cross-service stream transmits strictly over binary Google Remote Procedure Call (gRPC) leveraging dense Protocol Buffer payloads.
3. **Unified Sourcing**: Drive internal contracts natively using master `.proto` definitions tracked central in the Nx monorepo `libs/contracts`, automatically compiling clean Typescript code-gen bindings.

## Consequences

### Positive
- Collapses internal payload bandwidth footprint.
- Drastically accelerates backend-to-backend validation latency using multiplexed HTTP/2 pipelines.
- Preserves simple public swagger discoverability for global corporate developers.

### Negative
- Developers must generate and compile Proto libraries locally, slightly complicating local developer workstation ramp-up time.

## References
- [ADR-0002: Clean Architecture](./0002-clean-architecture-nestjs.md)
- [gRPC Official Site](https://grpc.io/)