# Matriz de Madurez Aumentada por IA

Herramienta de diagnÃ³stico para que los equipos identifiquen su nivel de integraciÃ³n tecnolÃ³gica y gobernanza respecto a los agentes de IA.

## Matriz 3 Niveles x 5 Dimensiones

| DimensiÃ³n | Nivel 1: IA Asistida | Nivel 2: IA Integrada | Nivel 3: IA Orquestada |
| :--- | :--- | :--- | :--- |
| **DocumentaciÃ³n** | `AGENTS.md` presente en la raÃ­z con comandos bÃ¡sicos y reglas del equipo. | Servidores MCP internos auto-documentados listados oficialmente en el CatÃ¡logo de Herramientas corporativo. | Patrones multi-agente con orquestadores diagramados en C4 y ADRs especÃ­ficos de IA. |
| **Herramientas** | Uso pasivo de herramientas de IDE (Claude Code, Cursor, GitHub Copilot). | El producto expone sus propias APIs como Servidores MCP consumidos por los modelos. | Sistema con ciclo agÃ©ntico de llamada recursiva a herramientas completo y memoria semÃ¡ntica. |
| **VerificaciÃ³n** | Presencia de `pre-commit hooks` y linter automatizado local post-ediciÃ³n. | Pipeline de CI ejecuta tests automatizados (evals) validando que el output del LLM no rompa contratos. | Agentes de verificaciÃ³n dedicados patrullan el ecosistema y auditan anomalÃ­as en segundo plano. |
| **Modelos** | Uso libre de modelos autorizados usando API keys individuales del desarrollador. | SelecciÃ³n formal de modelos vÃ­a ADR corporativo basado en benchmarks y costo por token. | Estrategia multi-modelo hÃ­brida basada en roles con gobernanza activa y alertas de costo en tiempo real. |
| **Seguridad** | RestricciÃ³n total: los agentes del IDE no poseen credenciales ni acceso a DB de producciÃ³n. | Acceso limitado del agente a producciÃ³n vÃ­a Servidores MCP con auth explÃ­cita y lÃ­mites acotados. | Sandbox completo para herramientas de cÃ³digo y Log de AuditorÃ­a inmutable para cada Tool Call, garantizando trazabilidad completa. |

## Criterios Objetivos por Nivel (CertificaciÃ³n)

Para certificar que su producto pertenece a un nivel especÃ­fico, el equipo debe presentar la siguiente evidencia ante la auditorÃ­a de arquitectura:

### Evidencia Requerida para Nivel 1:
- [ ] Existencia del archivo `.husky/pre-commit` (o equivalente) validando la sintaxis del cÃ³digo generado.
- [ ] Archivo `AGENTS.md` actualizado en los Ãºltimos 30 dÃ­as.

### Evidencia Requerida para Nivel 2:
- [ ] Esquema JSON del catÃ¡logo de herramientas publicado en la wiki del equipo.
- [ ] Logs de CI demostrando ejecuciÃ³n de suites de prueba invocando mocks del modelo.
- [ ] Documento firmado que confirme que el backend no expone PII no tokenizada al LLM.

### Evidencia Requerida para Nivel 3:
- [ ] Dashboard de costos de tokens desglosado por agente / funcionalidad.
- [ ] DemostraciÃ³n fÃ­sica del interruptor "Human-in-the-Loop" bloqueando una transacciÃ³n simulada.
- [ ] Diagrama de arquitectura multi-agente aprobado por el comitÃ©.

---
[? Volver al Índice](./README.es.md)
