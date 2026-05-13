# Vista General de Patrones: Catálogo de Patrones Agénticos

## ¿Cuándo necesitas un agente?
No todo problema de LLM requiere un bucle agéntico autónomo. Si la tarea puede resolverse en una sola llamada directa al modelo (One-shot completion), **no use un agente**. Los agentes añaden latencia, costo computacional y no-determinismo que solo se justifica si hay una exploración dinámica del problema.

Use agentes cuando el resultado del Paso 1 condicione cuál debe ser el Paso 2, y el árbol de decisión sea demasiado grande para programarse con código determinista tradicional.

## Matriz de Patrones Disponibles

| Patrón | Caso de Uso Canónico | Complejidad | Human-in-Loop |
| :--- | :--- | :--- | :--- |
| **Single Agent** | Tarea acotada (ej., generar un readme, arreglar un bug sintáctico específico) con herramientas limitadas. | Baja | Opcional |
| **Plan & Execute** | Tareas que requieren secuencialidad lógica garantizada (ej., Refactorizar 5 archivos en orden estricto). | Media | Recomendado |
| **Multi-Agent** | Sistemas donde confluyen múltiples dominios de expertise (ej., Agente Arquitecto + Agente QA + Agente Ciberseguridad). | Alta | Obligatorio |
| **Human-in-the-Loop** | Decisiones operativas que modifican el mundo real con consecuencias legales, financieras o físicas. | Variable | Obligatorio |

## El Principio de Boris Tane
Adoptamos la directiva de Boris Tane como ley arquitectónica interna:

> **"Separar la planificación de la ejecución es la decisión arquitectónica más importante que tomarás en tu agente."**

Cuando permitimos que un agente planifique y ejecute paso a paso sin control intermedio, el agente "olvida" el plan original a mitad de camino. Separar al Planner (Planificador) del Executor (Ejecutor) nos permite validar la ruta ANTES de que el sistema gaste dinero y tiempo en ejecuciones erróneas.
