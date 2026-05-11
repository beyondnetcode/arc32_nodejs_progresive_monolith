# ADR 0011: Fault Tolerance and Resiliency Patterns

## Status
Approved

## Date
2026-05-08

## Context
Mission-critical deployments must integrate with volatile third-party APIs (e.g., customs services, bank networks). Synchronous network failures, excessive latency, or transient timeouts at external API points frequently cascade backwards, eating local resource threads and crashing our system availability.

## Decision
Implement explicit Resilience Patterns protecting all outbound system exits:

1. **Circuit Breaker (Opossum)**: Wrap outbound network calls in high-level infrastructure adapters using the Circuit Breaker pattern. If target endpoint errors surpass established thresholds, the circuit switches to "Open" immediately, returning explicit errors before even attempting the slow call, thus saving local execution time and thread pools.
2. **Retry with Backoff**: Configure interceptors for non-fatal transient codes to execute transparent exponential backoff attempts natively within adapter logic before handing up an error result.
3. **Decoupled Domain logic**: The core business domain must remain 100% agnostic to these patterns. It invokes a standard port, and receives either the business entity response or a standardized `DomainException` mapped inside the failing adapter.

## Consequences

### Positive
- Prevents slow dependency outages from starving and drowning local CPU cycles.
- Maintains overall local availability during peripheral remote crashes.
- Delivers much safer user failure flows than infinite browser timeouts.

### Negative
- Adds extra operational logic when debugging integration points.
- Requires sophisticated parameter calibration (how many errors before break, timeout limit, restore cooldown).

## References
- [Martin Fowler on Circuit Breakers](https://martinfowler.com/bliki/CircuitBreaker.html)
- [ADR-0002: Clean Hexagonal Architecture](./0002-clean-architecture-nestjs.md)