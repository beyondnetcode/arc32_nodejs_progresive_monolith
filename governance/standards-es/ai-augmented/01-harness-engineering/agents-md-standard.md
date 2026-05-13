# EstÃ¡ndar Corporativo AGENTS.md

## Â¿QuÃ© es AGENTS.md?

El archivo `AGENTS.md` es el artefacto de harness de **menor esfuerzo y mayor impacto** en un repositorio. Sirve como la "sesiÃ³n de inducciÃ³n" (onboarding) para cualquier agente de inteligencia artificial (Claude Code, Cursor, Copilot, agentes personalizados) que acceda al espacio de trabajo.

Un agente sin un `AGENTS.md` debe redescubrir el stack, adivinar los comandos de prueba y tropezar con antipatrones conocidos. Con `AGENTS.md`, el agente hereda instantÃ¡neamente el contexto experto acumulado por el equipo humano.

## Estructura EstÃ¡ndar Obligatoria

Cada repositorio que implemente AumentaciÃ³n por IA de Nivel 1 o superior debe poseer un archivo `AGENTS.md` en su directorio raÃ­z con la siguiente estricta anatomÃ­a:

```markdown
## Project (Proyecto)
[DescripciÃ³n concisa de 2 lÃ­neas explicando el propÃ³sito de negocio de este proyecto]

## Build & Run (ConstrucciÃ³n y EjecuciÃ³n)
- Build: `[Comando exacto, ej., npm run build]`
- Test: `[Comando para pruebas unitarias, ej., npx nx run test my-app]`
- Lint: `[Comando de lint y fix, ej., npm run lint -- --fix]`

## Architecture (Arquitectura)
- Runtime: [Node.js vXX / .NET X.X / Android SDK XX]
- DB: [Motor, ej., PostgreSQL 16 + Drizzle ORM]
- Key modules: [Lista corta de mÃ³dulos crÃ­ticos o capas en este repo]

## Conventions (Convenciones)
- [ConvenciÃ³n crÃ­tica 1, ej., Usar la MÃ³nada Result para retornos de servicio]
- [ConvenciÃ³n crÃ­tica 2, ej., Los componentes de UI deben ser Server Components por defecto]

## Agent Rules (Reglas del Agente)
- [Regla previniendo error conocido 1, ej., NUNCA borrar pruebas existentes para hacer pasar un fix]
- [Regla previniendo error conocido 2, ej., Si se edita una entidad de Drizzle, ejecutar 'npm run db:generate' inmediatamente]

## Out of Bounds (Fuera de LÃ­mites)
- [QuÃ© partes del repo NO DEBEN TOCARSE, ej., No modificar archivos en la carpeta /legacy ni flujos de CI/CD]
```

## Principio de Hashimoto para el Harness
Adoptamos la regla evolutiva propuesta por el ecosistema de ingenierÃ­a agÃ©ntica:

> **"Por cada error repetitivo que el agente cometa, se debe aÃ±adir una nueva regla explÃ­cita a la secciÃ³n de Agent Rules de AGENTS.md para prevenir su recurrencia perpetua."**

## AGENTS.md vs CLAUDE.md
-   **`AGENTS.md`**: AgnÃ³stico a la herramienta. Funciona para cualquier agente que consuma el espacio de trabajo (ej., GPT-4o con acceso a terminal, Devin, etc.).
-   **`CLAUDE.md`**: EstÃ¡ndar especÃ­fico reconocido nativamente por `claude-code`. Se recomienda que si usas Claude Code, tengas un `CLAUDE.md` que puede ser un enlace simbÃ³lico o una copia simplificada estrictamente enfocada en los comandos que Claude consume mejor.

---
[? Volver al Índice](./README.es.md)
