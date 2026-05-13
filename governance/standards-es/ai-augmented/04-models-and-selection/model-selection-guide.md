# Guía de Selección de Modelos y Árbol de Complejidad

## Axioma de Costo vs Capacidad de Razonamiento
No todo problema demanda el "Modelo Más Inteligente".
Elegir el último modelo de frontera (ej., Opus, GPT-4o, Ultra) para una tarea simple de clasificación de texto resulta en un **incremento de 10x a 50x en el costo financiero** y una latencia inaceptable.

Adoptamos un árbol jerárquico para emparejar el problema con el motor adecuado.

---

## Los 3 Niveles (Tiers) de Operación

| Nivel | Ejemplo de Categoría de Modelo | Caso de Uso Recomendado | Peso de Costo |
| :--- | :--- | :--- | :--- |
| **Tier 1: Flash / Haiku** | Gemini 1.5 Flash / Claude 3.5 Haiku | Resúmenes de alta velocidad, extracción de etiquetas, clasificación rápida, autocompletado de código simple. | $ (Mínimo) |
| **Tier 2: Pro / Sonnet** | Gemini 1.5 Pro / Claude 3.5 Sonnet | Programación general, refactorización, ejecución multi-herramienta, razonamiento complejo, modelado de datos. | $$ (Optimizado) |
| **Tier 3: Ultra / Opus** | Gemini 1.0 Ultra / GPT-4 Turbo / Claude 3 Opus | Planificación estratégica multi-paso, matemáticas complejas, auditoría legal profunda, conciliación de múltiples documentos. | $$$$ (Extremo) |

---

## Árbol de Decisión de Selección

Hágase las siguientes preguntas secuenciales para determinar el modelo mínimo viable:

1.  **¿Es esta una transformación 1 a 1?** (ej., La Entrada A produce la Salida B con reglas simples)
    *   👉 Use **Tier 1 (Flash)**.
2.  **¿Requiere el uso de Herramientas Externas (MCP)?**
    *   👉 **Si es Sí (1-2 herramientas):** Pruebe Tier 1 primero.
    *   👉 **Si es Sí (> 3 herramientas complejas):** Avance a **Tier 2 (Pro/Sonnet)** para prevenir alucinaciones en argumentos JSON.
3.  **¿Supera el contexto los 100k tokens?** (ej., leer un repositorio completo de código o 5 PDFs largos)
    *   👉 Se mandan modelos de ventana alta como **Gemini 1.5 Pro** (hasta 2M de tokens).
4.  **¿Es este un sistema productivo crítico que genera salidas legales/financieras?**
    *   👉 Se manda **Tier 2 o Tier 3** respaldado por una pipeline determinista Human-in-the-Loop.

## Métrica de Benchmarking
Definimos **RPT (Razonamiento Por Token)** como nuestra métrica interna de rendimiento. Cuando se lanza un nuevo modelo, nuestro Comité de IA ejecuta una suite automatizada de 5 tareas de dominio estándar. Solo los modelos que pasan estas pruebas son autorizados oficialmente para su adición al catálogo productivo.
