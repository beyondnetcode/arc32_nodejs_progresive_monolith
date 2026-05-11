# ADR-AI-001: Harness Engineering como estándar para desarrollo y productos agénticos

*   **Estatus:** Proposed
*   **Fecha:** 2026-05-11
*   **Autor:** Agente Arquitecto AI

## Contexto
La arquitectura corporativa actual no define mecanismos estandarizados sobre cómo los equipos de desarrollo deben incorporar agentes de Inteligencia Artificial en su flujo de trabajo o dentro de sus productos de software. Históricamente, cada equipo ha utilizado aproximaciones fragmentadas (como el simple prompt engineering) que carecen de reproducibilidad, verificabilidad y seguridad.

## Decisión
Decidimos adoptar formalmente la disciplina de **Harness Engineering** como el estándar obligatorio para cualquier iniciativa agéntica en la compañía. Esto implica que no se evaluará la inteligencia de una solución solo por su prompt o por el modelo elegido, sino por la robustez del entorno circundante definido bajo los 4 pilares establecidos:
1. Documentación como Código (`AGENTS.md`).
2. Restricciones Arquitectónicas legibles por máquinas.
3. Verificación en capas secuenciales (Hooks -> Pre-commit -> CI).
4. Recolección periódica de deuda técnica generada por IA.

## Alternativas Consideradas
*   **Prompt Engineering Puro:** Descartado porque carece de control de errores determinista y se degrada rápidamente ante escalas de producción.
*   **Frameworks de terceros como estándar único:** Descartado (ej: forzar solo LangChain) debido a la alta volatilidad del ecosistema actual; preferimos estandarizar la estrategia de harness, no la herramienta.
*   **No Estandarizar:** Descartado por el alto riesgo de deuda técnica incoherente y fragmentación metodológica.

## Consecuencias
*   ✅ **Positivas:** Incremento drástico en la tasa de éxito de agentes, auditabilidad del comportamiento agéntico y reutilización de patrones de seguridad corporativos.
*   ❌ **Negativas:** Mayor curva de aprendizaje inicial al configurar hooks, y el requerimiento de mantener actualizado el archivo `AGENTS.md` manualmente.
*   ⚠️ **Compromisos:** Sacrificamos velocidad efímera ("Hacks") en favor de estabilidad a largo plazo.

## Referencias
*   Mitchell Hashimoto — Harness Engineering (Feb 2026)
*   OpenAI — Harness Engineering with Codex (Feb 2026)
*   Martin Fowler / Thoughtworks — Harness Engineering (Feb 2026)
