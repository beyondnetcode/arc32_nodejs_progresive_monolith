# Guía de Autoevaluación de Madurez Agéntica

Este cuestionario permite a los Tech Leads diagnosticar instantáneamente la fase de integración de IA de su producto actual y qué se requiere para escalar.

## Autotest Rápido

Responda Sí o NO a las siguientes afirmaciones:

### Bloque A (Nivel 1)
1. ¿Existe el archivo `AGENTS.md` en el repositorio? `[]`
2. ¿Utiliza el equipo un Linter automático antes de commitear cambios sugeridos por IA? `[]`
3. ¿Se ha configurado al menos una `Agent Rule` para prevenir un bug repetitivo? `[]`
> *Si marcó todas como Sí, cumple con el Nivel 1 (IA Asistida).*

### Bloque B (Nivel 2)
4. ¿El producto invoca directamente a un LLM durante el runtime (ej. servicio NestJS llamando a GPT)? `[]`
5. ¿Se han empaquetado endpoints internos bajo un conector de Servidor MCP? `[]`
6. ¿Las herramientas expuestas al modelo poseen validación estricta con Zod o JSON Schema? `[]`
> *Si marcó todas como Sí, ha escalado al Nivel 2 (IA Integrada).*

### Bloque C (Nivel 3)
7. ¿Existe un flujo que detenga la ejecución de la IA para esperar confirmación humana explícita? `[]`
8. ¿El 100% de las llamadas a herramientas se graban en un log de auditoría inmutable? `[]`
9. ¿Existe una cuota límite de presupuesto que detenga el consumo si el agente enloquece? `[]`
> *Si marcó todas como Sí, posee la madurez del Nivel 3 (IA Orquestada).*

---

## Próximos Pasos
Una vez determinado su nivel actual, agende una revisión de alineación con el CoE (Centro de Excelencia) de IA para autorizar el acceso a credenciales de backend avanzadas o clústeres de modelos corporativos.

---
[Volver al Índice](./README.es.md)
