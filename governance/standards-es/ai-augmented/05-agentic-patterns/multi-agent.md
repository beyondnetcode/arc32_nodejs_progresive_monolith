# PatrÃ³n: OrquestaciÃ³n Multi-Agente

Divide y vencerÃ¡s. Este patrÃ³n utiliza una red de agentes especializados, donde cada uno posee su propio System Prompt, sus propias herramientas y contexto acotado a su rol especÃ­fico, coordinados por un Supervisor central.

## Beneficios
- Reduce drÃ¡sticamente las alucinaciones al limitar el nÃºmero de herramientas por agente.
- Permite usar diferentes modelos para diferentes tareas (ej., Gemini para leer cÃ³digo, GPT-4o mini para resumir errores).
- Facilita las pruebas granulares de cada especialista de forma aislada.

---
[? Volver al Índice](./README.es.md)
