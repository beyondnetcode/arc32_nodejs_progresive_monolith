# Estándar Corporativo AGENTS.md

## ¿Qué es AGENTS.md?

El archivo `AGENTS.md` es el artefacto de harness de **menor esfuerzo y mayor impacto** en un repositorio. Actúa como la "sesión de inducción" (onboarding) para cualquier agente de inteligencia artificial (Claude Code, Cursor, Copilot, agentes personalizados) que acceda al workspace.

Un agente sin un `AGENTS.md` debe redescubrir el stack, adivinar los comandos de test y tropezar con antipatrones conocidos. Con `AGENTS.md`, el agente hereda instantáneamente el contexto experto acumulado por el equipo humano.

## Estructura Estándar Obligatoria

Todo repositorio que implemente IA-Aumentada Nivel 1 o superior debe poseer un archivo `AGENTS.md` en su raíz con la siguiente anatomía estricta:

```markdown
## Project
[Descripción concisa de 2 líneas que explique el propósito de negocio de este proyecto]

## Build & Run
- Build: `[Comando exacto, ej: npm run build]`
- Test: `[Comando para unit tests, ej: npx nx run test my-app]`
- Lint: `[Comando de linting y fix, ej: npm run lint -- --fix]`

## Architecture
- Runtime: [Node.js vXX / .NET X.X / Android SDK XX]
- DB: [Motor, ej: PostgreSQL 16 + Drizzle ORM]
- Key modules: [Lista corta de los módulos o capas críticas de este repo]

## Conventions
- [Convención crítica 1, ej: Usar Result Monad para retornos de servicios]
- [Convención crítica 2, ej: Los componentes de UI deben ser Server Components por defecto]

## Agent Rules
- [Regla que previene error conocido 1, ej: NUNCA borres tests existentes para hacer pasar un fix]
- [Regla que previene error conocido 2, ej: Si editas una entidad Drizzle, ejecuta 'npm run db:generate' inmediatamente]

## Out of Bounds
- [Qué partes del repo NO DEBES TOCAR, ej: No modificar archivos en carpeta /legacy o workflows de CI/CD]
```

## Principio de Hashimoto para Harness
Adoptamos la regla evolutiva propuesta por el ecosistema de ingeniería agéntica:

> **"Por cada error repetitivo que cometa el agente, se debe añadir una nueva regla explícita en la sección Agent Rules del AGENTS.md para evitar su recurrencia perpetua."**

## AGENTS.md vs CLAUDE.md
-   **`AGENTS.md`**: Es agnóstico a la herramienta. Funciona para cualquier agente que consuma el workspace (ej. GPT-4o con terminal access, Devin, etc.).
-   **`CLAUDE.md`**: Es un estándar específico reconocido nativamente por `claude-code`. Se recomienda que si usas Claude Code, tengas un `CLAUDE.md` que puede ser un link simbólico o una copia simplificada centrada estrictamente en los comandos que Claude consume mejor.
