# ADR-AI-004: AGENTS.md como artefacto obligatorio en proyectos que adoptan nivel 1+

*   **Estatus:** Proposed
*   **Fecha:** 2026-05-11

## Contexto
Los agentes de inteligencia artificial que entran a un repositorio carecen de memoria histórica de sesión a sesión. Sin contexto explícito, redescubren el entorno en cada sesión, adivinando comandos de test/lint y a menudo violando convenciones estilísticas del equipo, lo que genera frustración en los desarrolladores que deben corregir su código ("Limpiar el desastre de la IA").

## Decisión
Todo proyecto que adopte AI-Augmentation Nivel 1 (AI-Assisted) o superior está obligado a crear y mantener un archivo `AGENTS.md` en el directorio raíz del proyecto/workspace, siguiendo estrictamente la estructura corporativa definida en `01-harness-engineering/agents-md-standard.md`.

## Consecuencias
*   ✅ **Reducción dramática de alucinaciones iniciales:** El agente sabe exactamente cómo compilar y qué convenciones seguir desde el primer turno de chat.
*   ✅ **Auto-Onboarding de IA:** Facilita el uso de múltiples herramientas CLI de agentes (Claude, Aider, Mentat) de forma transparente.
*   ⚠️ **Mantenimiento:** Los humanos deben recordar actualizar `AGENTS.md` si cambian un comando de test crítico, o corren el riesgo de desorientar al agente. Se recomienda agregar una regla en el mismo archivo para que el Agente recuerde actualizarse a sí mismo si cambia la arquitectura.
