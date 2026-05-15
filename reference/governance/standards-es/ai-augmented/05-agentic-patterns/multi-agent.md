# Patrón: Orquestación Multi-Agente

Divide y vencerás. Este patrón utiliza una red de agentes especializados, donde cada uno posee su propio System Prompt, sus propias herramientas y contexto acotado a su rol específico, coordinados por un Supervisor central.

## Beneficios
- Reduce drásticamente las alucinaciones al limitar el número de herramientas por agente.
- Permite usar diferentes modelos para diferentes tareas (ej., Gemini para leer código, GPT-4o mini para resumir errores).
- Facilita las pruebas granulares de cada especialista de forma aislada.

---
[Volver al Índice](./README.es.md)
