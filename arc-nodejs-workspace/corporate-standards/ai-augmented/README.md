# 🤖 AI-Augmented Architecture

## ¿Qué es esto?
Esta sección es una extensión opcional de la arquitectura de referencia corporativa para equipos que buscan incorporar agentes IA. Define estándares para potenciar la arquitectura mediante el uso de agentes autónomos, harness engineering, Model Context Protocol (MCP), herramientas y flujos de trabajo AI-augmented.

## ¿Para quién es?
Diseñado para equipos de producto e ingenieros que desean incorporar agentes IA de forma controlada, segura y escalable en su ciclo de desarrollo o en las funcionalidades de sus productos finales.

## Nota de Adopción Obligatoria
> [!IMPORTANT]
> **Esta sección es completamente opcional.** Ningún producto está obligado a adoptarla. Los estándares corporativos base no dependen de ella, y el ecosistema funciona perfectamente sin implementarla. La adopción es estrictamente Opt-In.

---

## 📂 Mapa de Navegación

| Módulo | Descripción |
|--------|-------------|
| [00 - Overview](./00-overview/what-is-this.md) | Introducción, guía de adopción en 3 niveles y glosario agéntico básico. |
| [01 - Harness Engineering](./01-harness-engineering/harness-reference.md) | Diseño del entorno que envuelve al modelo: pilares, estándar AGENTS.md y validación en capas. |
| [02 - MCP Integration](./02-mcp-integration/mcp-overview.md) | Model Context Protocol para estandarizar la conexión de agentes con servicios y datos. |
| [03 - Tools Catalog](./03-tools-catalog/tool-design-principles.md) | Principios de diseño de herramientas deterministas consumibles por agentes autónomos. |
| [04 - Models & Selection](./04-models-and-selection/model-selection-guide.md) | Criterios de gobernanza, costos y selección del modelo adecuado para cada caso de uso. |
| [05 - Agentic Patterns](./05-agentic-patterns/patterns-overview.md) | Catálogo de patrones de diseño para agentes únicos, multi-agente y planificación dinámica. |
| [06 - ADRs AI](./06-adrs/README.md) | Registro de Decisiones Arquitectónicas específicas para el ecosistema agéntico. |
| [07 - Maturity Model](./07-maturity-model/ai-maturity-matrix.md) | Matriz de evaluación de madurez agéntica en 5 dimensiones operativas. |

---

## 📜 Decisiones Arquitectónicas (ADRs AI)
- [ADR-AI-001: Harness Strategy](./06-adrs/adr-ai-001-harness-strategy.md)
- [ADR-AI-002: MCP Standard](./06-adrs/adr-ai-002-mcp-as-integration-standard.md)
- [ADR-AI-003: Model Selection Criteria](./06-adrs/adr-ai-003-model-selection-criteria.md)
- [ADR-AI-004: AGENTS.md Governance](./06-adrs/adr-ai-004-agents-md-governance.md)
- [ADR-AI-005: Human-in-the-Loop Policy](./06-adrs/adr-ai-005-human-in-the-loop-policy.md)
