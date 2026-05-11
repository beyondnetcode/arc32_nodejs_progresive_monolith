# Guía de Autoevaluación de Madurez Agéntica

Este cuestionario permite a los Tech Leads diagnosticar instantáneamente en qué fase de integración de IA se encuentra su producto actual y qué deben resolver para escalar.

## Autotest Rápido

Responde SÍ o NO a las siguientes sentencias:

### Bloque A (Nivel 1)
1. ¿Existe un `AGENTS.md` en el repositorio? `[ ]`
2. ¿El equipo usa un Linter automático antes de commitear cambios sugeridos por IA? `[ ]`
3. ¿Se ha configurado al menos una regla de `Agent Rules` para prevenir un bug repetitivo? `[ ]`
> *Si marcaste todos SÍ, cumples el Nivel 1 (AI-Assisted).*

### Bloque B (Nivel 2)
4. ¿El producto invoca directamente un LLM en tiempo de ejecución (ej. NestJS service llamando a GPT)? `[ ]`
5. ¿Se han empaquetado endpoints internos bajo un conector MCP Server? `[ ]`
6. ¿Las tools expuestas al modelo tienen validación Zod o JSON Schema estricta? `[ ]`
> *Si marcaste todos SÍ, has escalado al Nivel 2 (AI-Integrated).*

### Bloque C (Nivel 3)
7. ¿Existe un flujo que detiene la ejecución de la IA para esperar una confirmación humana? `[ ]`
8. ¿Están registradas el 100% de las tool calls en un log de auditoría inmutable? `[ ]`
9. ¿Existe una cuota de gasto límite que detiene el consumo si el agente enloquece? `[ ]`
> *Si marcaste todos SÍ, posees la madurez del Nivel 3 (AI-Orchestrated).*

---

## Siguientes Pasos
Una vez determinado tu nivel actual, agenda una revisión de revisión con el CoE (Center of Excellence) de Inteligencia Artificial para autorizar el acceso a credenciales avanzadas de backend o clusters de modelos corporativos.
