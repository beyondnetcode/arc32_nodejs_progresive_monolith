# ADR-AI-004: AGENTS.md como artefacto obligatorio en proyectos que adopten nivel 1+

*   **Estado:** Propuesto
*   **Fecha:** 2026-05-11

## Contexto
Los agentes de inteligencia artificial que entran a un repositorio carecen de memoria histÃ³rica de sesiÃ³n a sesiÃ³n. Sin contexto explÃ­cito, redescubren el entorno cada sesiÃ³n, adivinando los comandos de prueba/lint y a menudo violando convenciones de estilo del equipo, lo que provoca frustraciÃ³n en los desarrolladores que deben arreglar su cÃ³digo ("limpiar el desastre de la IA").

## DecisiÃ³n
Cualquier proyecto que adopte el Nivel 1 de AumentaciÃ³n por IA (AI-Assisted) o superior estÃ¡ OBLIGADO a crear y mantener un archivo `AGENTS.md` en la raÃ­z del proyecto/workspace, siguiendo estrictamente la estructura corporativa definida en `01-harness-engineering/agents-md-standard.md`.

## Consecuencias
*   âœ… **ReducciÃ³n dramÃ¡tica de alucinaciones iniciales:** El agente sabe exactamente cÃ³mo compilar y quÃ© convenciones seguir desde el primer turno de chat.
*   âœ… **Auto-Onboarding de IA:** Facilita el uso fluido de mÃºltiples herramientas CLI de agentes (Claude, Aider, Mentat).
*   âš ï¸ **Mantenimiento:** Los humanos deben acordarse de actualizar el `AGENTS.md` si cambian un comando crÃ­tico de pruebas, o corren el riesgo de desorientar al agente. Se recomienda aÃ±adir una regla dentro del propio archivo que le recuerde al Agente actualizarlo tras cambios arquitectÃ³nicos.

---
[? Volver al Índice](./README.es.md)
