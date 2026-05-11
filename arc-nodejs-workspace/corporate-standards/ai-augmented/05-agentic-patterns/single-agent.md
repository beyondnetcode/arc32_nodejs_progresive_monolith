# Patrón: Single Agent with Tools

El patrón más simple y común. Un único modelo envuelto por un bucle agéntico que posee acceso directo a un set acotado de herramientas y memoria local del hilo de conversación.

## Cuándo Usarlo
- La tarea no requiere sub-tareas paralelas.
- El número de herramientas es bajo (< 10).
- El dominio de conocimiento está concentrado.

## Flujo
1. Usuario envía prompt.
2. Agente selecciona Tool A.
3. Harness ejecuta Tool A.
4. Agente razona sobre el resultado.
5. Agente responde final al usuario.
