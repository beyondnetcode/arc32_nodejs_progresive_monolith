# Matriz de Madurez AI-Augmented

Herramienta de diagnóstico para que los equipos identifiquen su nivel de integración tecnológica y gobierno en materia de agentes IA.

## Matriz 3 Niveles x 5 Dimensiones

| Dimensión | Nivel 1: AI-Assisted | Nivel 2: AI-Integrated | Nivel 3: AI-Orchestrated |
| :--- | :--- | :--- | :--- |
| **Documentación** | `AGENTS.md` presente en la raíz con comandos y reglas básicas del equipo. | MCP Servers internos auto-documentados con listado oficial en Tool Catalog corporativo. | Patrones multi-agente con orquestadores diagramados en C4 y ADRs específicos por agente. |
| **Herramientas (Tools)** | Uso pasivo de herramientas en el IDE (Claude Code, Cursor, GitHub Copilot). | El producto expone sus propias APIS como MCP Servers que son consumidos por modelos. | Sistema con ciclo agéntico de tool-calling recursivo completo y memoria semántica. |
| **Verificación** | Presencia de `pre-commit hooks` y linter post-edición automatizado en local. | CI Pipeline ejecuta tests automatizados (evals) para validar que el output del LLM no rompe contratos. | Agentes de verificación dedicados patrullan el ecosistema y auditan anomalías en segundo plano. |
| **Modelos** | Uso libre de cualquier modelo autorizado usando llaves de API individuales de desarrollador. | Selección formal del modelo vía ADR corporativo basada en benchmarks y costo por token. | Estrategia híbrida de multi-modelos por rol con gobernanza activa, alertas de costo en tiempo real. |
| **Seguridad** | Restricción total: los agentes del IDE no poseen credenciales ni acceso a base de datos productiva. | Acceso limitado de agentes a producción vía MCP Servers con autenticación explícita y Scopes limitados. | Sandboxización completa para tools de código y Audit Log inmutable de cada Tool Call para trazabilidad total. |

## Criterios Objetivos por Nivel (Certificación)

Para certificar que tu producto pertenece a un nivel específico, el equipo debe presentar la siguiente evidencia ante la auditoría de arquitectura:

### Evidencia Requerida para Nivel 1:
- [ ] Existencia del archivo `.husky/pre-commit` (o equivalente) validando la sintaxis del código generado.
- [ ] Archivo `AGENTS.md` actualizado en los últimos 30 días.

### Evidencia Requerida para Nivel 2:
- [ ] Esquema JSON del catálogo de herramientas publicado en la wiki del equipo.
- [ ] Logs de CI demostrando que se corren suites de pruebas que invocan mocks del modelo.
- [ ] Documento firmado confirmando que el backend no expone PII sin tokenizar al LLM.

### Evidencia Requerida para Nivel 3:
- [ ] Dashboard de costos de tokens desglosado por agente / feature.
- [ ] Demostración física del interruptor "Human-in-the-Loop" bloqueando una transacción simulada.
- [ ] Diagrama de arquitectura multi-agente aprobada por el comité.
