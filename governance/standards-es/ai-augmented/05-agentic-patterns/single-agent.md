# PatrÃ³n: Agente Ãšnico con Herramientas (Single Agent with Tools)

El patrÃ³n mÃ¡s sencillo y comÃºn. Un Ãºnico modelo envuelto por un bucle agÃ©ntico que posee acceso directo a un conjunto acotado de herramientas y memoria local del hilo de conversaciÃ³n.

## CuÃ¡ndo Usar
- La tarea no requiere sub-tareas paralelas.
- El nÃºmero de herramientas es pequeÃ±o (< 10).
- El dominio de conocimiento estÃ¡ altamente concentrado.

## Flujo de Trabajo
1. El usuario envÃ­a el prompt.
2. El Agente selecciona la Herramienta A.
3. El Harness ejecuta la Herramienta A.
4. El Agente razona sobre el resultado.
5. El Agente entrega la respuesta final al usuario.

---
[? Volver al Índice](./README.es.md)
