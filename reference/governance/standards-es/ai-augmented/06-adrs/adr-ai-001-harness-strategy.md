# ADR-AI-001: Harness Engineering como estándar para desarrollo y productos agénticos

* **Estado:** Propuesto
* **Fecha:** 2026-05-11
* **Autor:** Agente Arquitecto de IA

## Contexto
La arquitectura corporativa actual no define mecanismos estandarizados sobre cómo los equipos de desarrollo deben incorporar agentes de Inteligencia Artificial en su flujo de trabajo o productos de software. Históricamente, cada equipo ha utilizado enfoques fragmentados (como simples prompt engineering) carentes de reproducibilidad, verificabilidad y seguridad.

## Decisión
Decidimos formalmente adoptar la disciplina de **Harness Engineering** (Ingeniería del Arnés) como el estándar obligatorio para cualquier iniciativa agéntica dentro de la compañía. Esto implica que la inteligencia de una solución no será evaluada únicamente por su prompt o el modelo elegido, sino por la robustez del entorno circundante definido bajo los 4 pilares establecidos:
1. Documentación como Código (`AGENTS.md`).
2. Restricciones Arquitectónicas legibles por máquina.
3. Verificación en capas secuenciales (Hooks -> Pre-commit -> CI).
4. Cosecha periódica de deuda técnica generada por IA.

## Alternativas Consideradas
* **Prompt Engineering Puro:** Descartado por carecer de control de errores determinista y degradarse rápidamente a escalas de producción.
* **Frameworks de Terceros como ínico Estándar:** Descartado (ej. obligar solo a LangChain) debido a la alta volatilidad del ecosistema actual; preferimos estandarizar la estrategia de harness, no la herramienta específica.
* **Sin Estandarización:** Descartado por el alto riesgo de deuda técnica incoherente y fragmentación metodológica.

## Consecuencias
* **Positiva:** Incremento dramático en las tasas de éxito del agente, auditabilidad del comportamiento agéntico y reutilización de patrones de seguridad corporativos.
* **Negativa:** Mayor curva de aprendizaje inicial para configurar los hooks, y el requisito de mantener manualmente el archivo `AGENTS.md`.
* **Trade-off:** Sacrificamos velocidad fugaz ("Hacks") en favor de la estabilidad a largo plazo.

## Referencias
* Mitchell Hashimoto - Harness Engineering (Feb 2026)
* OpenAI - Harness Engineering with Codex (Feb 2026)
* Martin Fowler / Thoughtworks - Harness Engineering (Feb 2026)

---
[Volver al Índice](./README.es.md)
