# 🏛️ ADR-0002: Adoption of Structured Minimal APIs for .NET Services

- **Status**: Accepted
- **Context**: .NET 8/9 and future roadmaps prioritize Minimal APIs as the foundational high-performance routing engine. Legacy MVC Controllers rely heavily on runtime reflection, hindering Native AOT compilation and increasing memory footprints in containerized environments.
- **Decision**: Adopt **Structured Minimal APIs** as the primary architectural standard for all new enterprise API developments.
- **Consequences**:
  - **Performance**: Immediate reduction in memory overhead and cold-start times.
  - **Tooling**: Full Native AOT compilation readiness.
  - **Enforcement**: Direct registration of endpoints in `Program.cs` is **Banned**. Developers must use modular route group mapping (via `MapGroup` extension methods or an established library like FastEndpoints) to ensure clean bounded contexts and team-isolation in mono-repos.
  - **Testing**: Leverage `WebApplicationFactory` for out-of-process endpoint integration testing.
