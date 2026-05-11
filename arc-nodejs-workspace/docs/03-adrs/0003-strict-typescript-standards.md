# ADR 0003: Strict TypeScript Standards

## Status
Approved

## Date
2026-05-08

## Context
Loosely typed TypeScript (`any` usage, missing return types, implicit `any` from libraries) creates the same class of bugs as plain JavaScript while maintaining a false sense of type safety. This negates the primary value of TypeScript in enterprise development.

## Decision
Enforce strict TypeScript configuration and ESLint rules across the entire monorepo.

**`tsconfig.json` mandatory flags:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

**ESLint mandatory rules:**
- `@typescript-eslint/no-explicit-any`: error
- `@typescript-eslint/explicit-function-return-type`: error
- `@typescript-eslint/no-floating-promises`: error
- `eslint-plugin-boundaries`: enforces layer import rules (Core cannot import Infrastructure)

All rules are enforced in CI — PRs with TypeScript errors are blocked from merging.

## Consequences

### Positive
- Eliminates an entire class of null/undefined runtime errors at compile time.
- Enforces self-documenting code via explicit return types.
- `eslint-plugin-boundaries` makes hexagonal layer violations a build error, not a code review finding.

### Negative
- Higher initial development overhead — developers must be explicit about all types.
- Third-party libraries with poor TypeScript definitions require careful wrapper typing.

## References
- [ADR-0001: Monorepo Orchestration](./0001-monorepo-orchestration-nx.md)
- [ADR-0002: Clean Hexagonal Architecture](./0002-clean-architecture-nestjs.md)