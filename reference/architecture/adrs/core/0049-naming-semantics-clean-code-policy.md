# ADR 0049: Naming Semantics & Clean Code Policy

## Status
Accepted

## Context
Lack of unified naming conventions across domains and technical layers leads to cognitive load and increased maintenance costs. We need a strict policy to ensure semantic consistency.

## Decision
Adopt a strict Clean Code naming policy:
- **PascalCase** for classes, interfaces, and types.
- **camelCase** for variables, functions, and properties.
- **kebab-case** for file names and directories.
- **UPPER_SNAKE_CASE** for constants.
- **Descriptive Names**: Avoid abbreviations (e.g., `userRepository` instead of `usrRepo`).
- **Domain Aligned**: Naming must strictly follow the Ubiquitous Language defined in the business glossary.

## Consequences
- **Pros**:
 - High code readability.
 - Seamless transition between different domains for developers.
 - Reduced bugs due to semantic clarity.
- **Cons**:
 - Slightly longer names.
 - Requires automated linting to enforce.

---
[Back to Index](./README.md)
