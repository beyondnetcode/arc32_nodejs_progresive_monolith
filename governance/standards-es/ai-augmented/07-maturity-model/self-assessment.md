# GuÃ­a de AutoevaluaciÃ³n de Madurez AgÃ©ntica

Este cuestionario permite a los Tech Leads diagnosticar instantÃ¡neamente la fase de integraciÃ³n de IA de su producto actual y quÃ© se requiere para escalar.

## Autotest RÃ¡pido

Responda SÃ o NO a las siguientes afirmaciones:

### Bloque A (Nivel 1)
1. Â¿Existe el archivo `AGENTS.md` en el repositorio? `[ ]`
2. Â¿Utiliza el equipo un Linter automÃ¡tico antes de commitear cambios sugeridos por IA? `[ ]`
3. Â¿Se ha configurado al menos una `Agent Rule` para prevenir un bug repetitivo? `[ ]`
> *Si marcÃ³ todas como SÃ, cumple con el Nivel 1 (IA Asistida).*

### Bloque B (Nivel 2)
4. Â¿El producto invoca directamente a un LLM durante el runtime (ej. servicio NestJS llamando a GPT)? `[ ]`
5. Â¿Se han empaquetado endpoints internos bajo un conector de Servidor MCP? `[ ]`
6. Â¿Las herramientas expuestas al modelo poseen validaciÃ³n estricta con Zod o JSON Schema? `[ ]`
> *Si marcÃ³ todas como SÃ, ha escalado al Nivel 2 (IA Integrada).*

### Bloque C (Nivel 3)
7. Â¿Existe un flujo que detenga la ejecuciÃ³n de la IA para esperar confirmaciÃ³n humana explÃ­cita? `[ ]`
8. Â¿El 100% de las llamadas a herramientas se graban en un log de auditorÃ­a inmutable? `[ ]`
9. Â¿Existe una cuota lÃ­mite de presupuesto que detenga el consumo si el agente enloquece? `[ ]`
> *Si marcÃ³ todas como SÃ, posee la madurez del Nivel 3 (IA Orquestada).*

---

## PrÃ³ximos Pasos
Una vez determinado su nivel actual, agende una revisiÃ³n de alineaciÃ³n con el CoE (Centro de Excelencia) de IA para autorizar el acceso a credenciales de backend avanzadas o clÃºsteres de modelos corporativos.

---
[? Volver al Índice](./README.es.md)
