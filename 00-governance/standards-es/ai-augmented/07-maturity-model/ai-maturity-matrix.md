# Matriz de Madurez Aumentada por IA

Herramienta de diagnóstico para que los equipos identifiquen su nivel de integración tecnológica y gobernanza respecto a los agentes de IA.

## Matriz 3 Niveles x 5 Dimensiones

| Dimensión | Nivel 1: IA Asistida | Nivel 2: IA Integrada | Nivel 3: IA Orquestada |
| :--- | :--- | :--- | :--- |
| **Documentación** | `AGENTS.md` presente en la raíz con comandos básicos y reglas del equipo. | Servidores MCP internos auto-documentados listados oficialmente en el Catálogo de Herramientas corporativo. | Patrones multi-agente con orquestadores diagramados en C4 y ADRs específicos de IA. |
| **Herramientas** | Uso pasivo de herramientas de IDE (Claude Code, Cursor, GitHub Copilot). | El producto expone sus propias APIs como Servidores MCP consumidos por los modelos. | Sistema con ciclo agéntico de llamada recursiva a herramientas completo y memoria semántica. |
| **Verificación** | Presencia de `pre-commit hooks` y linter automatizado local post-edición. | Pipeline de CI ejecuta tests automatizados (evals) validando que el output del LLM no rompa contratos. | Agentes de verificación dedicados patrullan el ecosistema y auditan anomalías en segundo plano. |
| **Modelos** | Uso libre de modelos autorizados usando API keys individuales del desarrollador. | Selección formal de modelos vía ADR corporativo basado en benchmarks y costo por token. | Estrategia multi-modelo híbrida basada en roles con gobernanza activa y alertas de costo en tiempo real. |
| **Seguridad** | Restricción total: los agentes del IDE no poseen credenciales ni acceso a DB de producción. | Acceso limitado del agente a producción vía Servidores MCP con auth explícita y límites acotados. | Sandbox completo para herramientas de código y Log de Auditoría inmutable para cada Tool Call, garantizando trazabilidad completa. |

## Criterios Objetivos por Nivel (Certificación)

Para certificar que su producto pertenece a un nivel específico, el equipo debe presentar la siguiente evidencia ante la auditoría de arquitectura:

### Evidencia Requerida para Nivel 1:
- [ ] Existencia del archivo `.husky/pre-commit` (o equivalente) validando la sintaxis del código generado.
- [ ] Archivo `AGENTS.md` actualizado en los últimos 30 días.

### Evidencia Requerida para Nivel 2:
- [ ] Esquema JSON del catálogo de herramientas publicado en la wiki del equipo.
- [ ] Logs de CI demostrando ejecución de suites de prueba invocando mocks del modelo.
- [ ] Documento firmado que confirme que el backend no expone PII no tokenizada al LLM.

### Evidencia Requerida para Nivel 3:
- [ ] Dashboard de costos de tokens desglosado por agente / funcionalidad.
- [ ] Demostración física del interruptor "Human-in-the-Loop" bloqueando una transacción simulada.
- [ ] Diagrama de arquitectura multi-agente aprobado por el comité.
