# Patterns Overview: Catálogo de Patrones Agénticos

## ¿Cuándo necesitas un agente?
No cualquier problema con LLMs requiere un bucle agéntico autónomo. Si la tarea puede resolverse en una única llamada directa al modelo (One-shot completion), **no utilices un agente**. Los agentes añaden latencia, coste computacional y no-determinismo que solo se justifica si hay una exploración dinámica del problema.

Utiliza agentes cuando el resultado del Paso 1 condiciona cuál debe ser el Paso 2, y el árbol de decisiones es demasiado grande para programarlo con código tradicional.

## Matriz de Patrones Disponibles

| Patrón | Caso de Uso Canónico | Complejidad | Human-in-Loop |
| :--- | :--- | :--- | :--- |
| **Single Agent** | Tarea acotada (ej: generar un readme, arreglar un bug sintáctico específico) con herramientas limitadas. | Baja | Opcional |
| **Plan & Execute** | Tareas que requieren secuencialidad lógica garantizada (ej: Refactorizar 5 archivos en orden). | Media | Recomendado |
| **Multi-Agent** | Sistemas donde convergen múltiples dominios de experiencia (ej: Agente Arquitecto + Agente QA + Agente Ciberseguridad). | Alta | Obligatorio |
| **Human-in-the-Loop** | Decisiones operacionales que modifican el mundo real con consecuencias legales, financieras o físicas. | Variable | Obligatorio |

## El Principio de Boris Tane
Adoptamos la directriz de Boris Tane como ley arquitectónica interna:

> **"Separar la planificación de la ejecución es la decisión arquitectónica más importante que tomarás en tu agente."**

Cuando permitimos que un agente planifique y ejecute paso a paso sin control intermedio, el agente "olvida" el plan original a mitad de camino. Separar el planificador (Planner) del ejecutor (Executor) nos permite validar la ruta ANTES de que el sistema gaste dinero y tiempo en la ejecución errónea.
