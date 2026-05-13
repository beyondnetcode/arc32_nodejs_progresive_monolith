# ADR-AI-004: AGENTS.md como artefacto obligatorio en proyectos que adopten nivel 1+

*   **Estado:** Propuesto
*   **Fecha:** 2026-05-11

## Contexto
Los agentes de inteligencia artificial que entran a un repositorio carecen de memoria histórica de sesión a sesión. Sin contexto explícito, redescubren el entorno cada sesión, adivinando los comandos de prueba/lint y a menudo violando convenciones de estilo del equipo, lo que provoca frustración en los desarrolladores que deben arreglar su código ("limpiar el desastre de la IA").

## Decisión
Cualquier proyecto que adopte el Nivel 1 de Aumentación por IA (AI-Assisted) o superior está OBLIGADO a crear y mantener un archivo `AGENTS.md` en la raíz del proyecto/workspace, siguiendo estrictamente la estructura corporativa definida en `01-harness-engineering/agents-md-standard.md`.

## Consecuencias
*   ✅ **Reducción dramática de alucinaciones iniciales:** El agente sabe exactamente cómo compilar y qué convenciones seguir desde el primer turno de chat.
*   ✅ **Auto-Onboarding de IA:** Facilita el uso fluido de múltiples herramientas CLI de agentes (Claude, Aider, Mentat).
*   ⚠️ **Mantenimiento:** Los humanos deben acordarse de actualizar el `AGENTS.md` si cambian un comando crítico de pruebas, o corren el riesgo de desorientar al agente. Se recomienda añadir una regla dentro del propio archivo que le recuerde al Agente actualizarlo tras cambios arquitectónicos.
