# Patrón: Multi-Agent Orchestration

Divide y vencerás. Este patrón utiliza una red de agentes especialistas, donde cada uno posee su propio System Prompt, sus propias Tools y un contexto limitado a su función, coordinados por un Supervisor central.

## Beneficios
- Reduce drásticamente las alucinaciones al limitar el número de tools por agente.
- Permite usar diferentes modelos para diferentes tareas (ej: Gemini para leer código, GPT-4o mini para resumir errores).
- Facilita el testing granular de cada especialista por separado.
