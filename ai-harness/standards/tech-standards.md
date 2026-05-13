# 🎯 Architectural & Coding Standards

Minimum viable tech constraints.

## Primary Stack Boundaries
- **Backend & Frontend**: TypeScript / JavaScript
- **Alternative Backend**: C# (.NET Core / Enterprise Services)

## Architecture Directives
1. **Ports & Adapters**: Core domain logic must remain infrastructure agnostic.
2. **Database Access**: Multi-tenant isolation via Row Level Security (RLS).
3. **Authentication**: Dual-path enforcement (External IDP + Internal Credentials).

## Coding Baseline
- **Linting Rules**: Strict TypeScript enabled. Unused imports banned.
- **Testing**: Consumer-Driven Contract Tests (Pact) required for all core integrations.
