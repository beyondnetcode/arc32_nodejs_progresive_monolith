# 🤖 Arquitectura Aumentada por IA

> 🌐 **Navegación Bilingüe:** [🇺🇸 English Version](../../corporate-standards/ai-augmented/README.md)

## ¿Qué es esto?
Esta sección es una extensión opcional de la arquitectura de referencia corporativa para equipos que buscan incorporar agentes de IA. Define los estándares para aprovechar agentes autónomos, harness engineering, Model Context Protocol (MCP), herramientas y flujos de trabajo aumentados por IA.

## ¿Para quién es?
Diseñado para equipos de producto e ingenieros que deseen integrar agentes de IA de manera controlada, segura y escalable en su ciclo de vida de desarrollo o en las características de sus productos finales.

## Nota de Adopción Obligatoria
> [!IMPORTANT]
> **Esta sección es completamente opcional.** Ningún producto está obligado a adoptarla. Los estándares corporativos base no dependen de ella, y el ecosistema opera perfectamente sin implementarla. La adopción es estrictamente Opt-In.

---

## 🗺️ Mapa de Navegación

| Módulo | Descripción |
|--------|-------------|
| [00 - Vista General](./00-overview/what-is-this.md) | Introducción, guía de adopción de 3 niveles y glosario agéntico básico. |
| [01 - Harness Engineering](./01-harness-engineering/harness-reference.md) | Diseño del entorno que envuelve al modelo: pilares, estándar AGENTS.md y validación por capas. |
| [02 - Integración MCP](./02-mcp-integration/mcp-overview.md) | Model Context Protocol para estandarizar la conexión del agente con servicios y datos. |
| [03 - Catálogo de Herramientas](./03-tools-catalog/tool-design-principles.md) | Principios de diseño para herramientas deterministas consumibles por agentes autónomos. |
| [04 - Modelos y Selección](./04-models-and-selection/model-selection-guide.md) | Criterios de gobernanza, costos y selección del modelo adecuado para cada caso de uso. |
| [05 - Patrones Agénticos](./05-agentic-patterns/patterns-overview.md) | Catálogo de patrones de diseño para agente único, multi-agente y planificación dinámica. |
| [06 - ADRs de IA](./06-adrs/README.md) | Registro de Decisiones Arquitectónicas específicas para el ecosistema agéntico. |
| [07 - Modelo de Madurez](./07-maturity-model/ai-maturity-matrix.md) | Matriz de evaluación de madurez agéntica a través de 5 dimensiones operativas. |

---

## 📜 Decisiones Arquitectónicas (AI ADRs)
- [ADR-AI-001: Estrategia de Harness](./06-adrs/adr-ai-001-harness-strategy.md)
- [ADR-AI-002: Estándar MCP](./06-adrs/adr-ai-002-mcp-as-integration-standard.md)
- [ADR-AI-003: Criterios de Selección de Modelo](./06-adrs/adr-ai-003-model-selection-criteria.md)
- [ADR-AI-004: Gobernanza de AGENTS.md](./06-adrs/adr-ai-004-agents-md-governance.md)
- [ADR-AI-005: Política de Human-in-the-Loop](./06-adrs/adr-ai-005-human-in-the-loop-policy.md)
