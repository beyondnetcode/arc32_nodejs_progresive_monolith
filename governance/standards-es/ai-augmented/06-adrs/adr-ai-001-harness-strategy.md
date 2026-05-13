# ADR-AI-001: Harness Engineering como estÃ¡ndar para desarrollo y productos agÃ©nticos

*   **Estado:** Propuesto
*   **Fecha:** 2026-05-11
*   **Autor:** Agente Arquitecto de IA

## Contexto
La arquitectura corporativa actual no define mecanismos estandarizados sobre cÃ³mo los equipos de desarrollo deben incorporar agentes de Inteligencia Artificial en su flujo de trabajo o productos de software. HistÃ³ricamente, cada equipo ha utilizado enfoques fragmentados (como simples prompt engineering) carentes de reproducibilidad, verificabilidad y seguridad.

## DecisiÃ³n
Decidimos formalmente adoptar la disciplina de **Harness Engineering** (IngenierÃ­a del ArnÃ©s) como el estÃ¡ndar obligatorio para cualquier iniciativa agÃ©ntica dentro de la compaÃ±Ã­a. Esto implica que la inteligencia de una soluciÃ³n no serÃ¡ evaluada Ãºnicamente por su prompt o el modelo elegido, sino por la robustez del entorno circundante definido bajo los 4 pilares establecidos:
1. DocumentaciÃ³n como CÃ³digo (`AGENTS.md`).
2. Restricciones ArquitectÃ³nicas legibles por mÃ¡quina.
3. VerificaciÃ³n en capas secuenciales (Hooks -> Pre-commit -> CI).
4. Cosecha periÃ³dica de deuda tÃ©cnica generada por IA.

## Alternativas Consideradas
*   **Prompt Engineering Puro:** Descartado por carecer de control de errores determinista y degradarse rÃ¡pidamente a escalas de producciÃ³n.
*   **Frameworks de Terceros como Ãšnico EstÃ¡ndar:** Descartado (ej. obligar solo a LangChain) debido a la alta volatilidad del ecosistema actual; preferimos estandarizar la estrategia de harness, no la herramienta especÃ­fica.
*   **Sin EstandarizaciÃ³n:** Descartado por el alto riesgo de deuda tÃ©cnica incoherente y fragmentaciÃ³n metodolÃ³gica.

## Consecuencias
*   âœ… **Positiva:** Incremento dramÃ¡tico en las tasas de Ã©xito del agente, auditabilidad del comportamiento agÃ©ntico y reutilizaciÃ³n de patrones de seguridad corporativos.
*   âŒ **Negativa:** Mayor curva de aprendizaje inicial para configurar los hooks, y el requisito de mantener manualmente el archivo `AGENTS.md`.
*   âš ï¸ **Trade-off:** Sacrificamos velocidad fugaz ("Hacks") en favor de la estabilidad a largo plazo.

## Referencias
*   Mitchell Hashimoto â€” Harness Engineering (Feb 2026)
*   OpenAI â€” Harness Engineering with Codex (Feb 2026)
*   Martin Fowler / Thoughtworks â€” Harness Engineering (Feb 2026)

---
[? Volver al Índice](./README.es.md)
