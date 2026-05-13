# Vista General de Patrones: CatÃ¡logo de Patrones AgÃ©nticos

## Â¿CuÃ¡ndo necesitas un agente?
No todo problema de LLM requiere un bucle agÃ©ntico autÃ³nomo. Si la tarea puede resolverse en una sola llamada directa al modelo (One-shot completion), **no use un agente**. Los agentes aÃ±aden latencia, costo computacional y no-determinismo que solo se justifica si hay una exploraciÃ³n dinÃ¡mica del problema.

Use agentes cuando el resultado del Paso 1 condicione cuÃ¡l debe ser el Paso 2, y el Ã¡rbol de decisiÃ³n sea demasiado grande para programarse con cÃ³digo determinista tradicional.

## Matriz de Patrones Disponibles

| PatrÃ³n | Caso de Uso CanÃ³nico | Complejidad | Human-in-Loop |
| :--- | :--- | :--- | :--- |
| **Single Agent** | Tarea acotada (ej., generar un readme, arreglar un bug sintÃ¡ctico especÃ­fico) con herramientas limitadas. | Baja | Opcional |
| **Plan & Execute** | Tareas que requieren secuencialidad lÃ³gica garantizada (ej., Refactorizar 5 archivos en orden estricto). | Media | Recomendado |
| **Multi-Agent** | Sistemas donde confluyen mÃºltiples dominios de expertise (ej., Agente Arquitecto + Agente QA + Agente Ciberseguridad). | Alta | Obligatorio |
| **Human-in-the-Loop** | Decisiones operativas que modifican el mundo real con consecuencias legales, financieras o fÃ­sicas. | Variable | Obligatorio |

## El Principio de Boris Tane
Adoptamos la directiva de Boris Tane como ley arquitectÃ³nica interna:

> **"Separar la planificaciÃ³n de la ejecuciÃ³n es la decisiÃ³n arquitectÃ³nica mÃ¡s importante que tomarÃ¡s en tu agente."**

Cuando permitimos que un agente planifique y ejecute paso a paso sin control intermedio, el agente "olvida" el plan original a mitad de camino. Separar al Planner (Planificador) del Executor (Ejecutor) nos permite validar la ruta ANTES de que el sistema gaste dinero y tiempo en ejecuciones errÃ³neas.

---
[? Volver al Índice](./README.es.md)
