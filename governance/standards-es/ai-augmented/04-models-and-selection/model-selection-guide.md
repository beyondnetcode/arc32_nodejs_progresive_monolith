# GuÃ­a de SelecciÃ³n de Modelos y Ãrbol de Complejidad

## Axioma de Costo vs Capacidad de Razonamiento
No todo problema demanda el "Modelo MÃ¡s Inteligente".
Elegir el Ãºltimo modelo de frontera (ej., Opus, GPT-4o, Ultra) para una tarea simple de clasificaciÃ³n de texto resulta en un **incremento de 10x a 50x en el costo financiero** y una latencia inaceptable.

Adoptamos un Ã¡rbol jerÃ¡rquico para emparejar el problema con el motor adecuado.

---

## Los 3 Niveles (Tiers) de OperaciÃ³n

| Nivel | Ejemplo de CategorÃ­a de Modelo | Caso de Uso Recomendado | Peso de Costo |
| :--- | :--- | :--- | :--- |
| **Tier 1: Flash / Haiku** | Gemini 1.5 Flash / Claude 3.5 Haiku | ResÃºmenes de alta velocidad, extracciÃ³n de etiquetas, clasificaciÃ³n rÃ¡pida, autocompletado de cÃ³digo simple. | $ (MÃ­nimo) |
| **Tier 2: Pro / Sonnet** | Gemini 1.5 Pro / Claude 3.5 Sonnet | ProgramaciÃ³n general, refactorizaciÃ³n, ejecuciÃ³n multi-herramienta, razonamiento complejo, modelado de datos. | $$ (Optimizado) |
| **Tier 3: Ultra / Opus** | Gemini 1.0 Ultra / GPT-4 Turbo / Claude 3 Opus | PlanificaciÃ³n estratÃ©gica multi-paso, matemÃ¡ticas complejas, auditorÃ­a legal profunda, conciliaciÃ³n de mÃºltiples documentos. | $$$$ (Extremo) |

---

## Ãrbol de DecisiÃ³n de SelecciÃ³n

HÃ¡gase las siguientes preguntas secuenciales para determinar el modelo mÃ­nimo viable:

1.  **Â¿Es esta una transformaciÃ³n 1 a 1?** (ej., La Entrada A produce la Salida B con reglas simples)
    *   ðŸ‘‰ Use **Tier 1 (Flash)**.
2.  **Â¿Requiere el uso de Herramientas Externas (MCP)?**
    *   ðŸ‘‰ **Si es SÃ­ (1-2 herramientas):** Pruebe Tier 1 primero.
    *   ðŸ‘‰ **Si es SÃ­ (> 3 herramientas complejas):** Avance a **Tier 2 (Pro/Sonnet)** para prevenir alucinaciones en argumentos JSON.
3.  **Â¿Supera el contexto los 100k tokens?** (ej., leer un repositorio completo de cÃ³digo o 5 PDFs largos)
    *   ðŸ‘‰ Se mandan modelos de ventana alta como **Gemini 1.5 Pro** (hasta 2M de tokens).
4.  **Â¿Es este un sistema productivo crÃ­tico que genera salidas legales/financieras?**
    *   ðŸ‘‰ Se manda **Tier 2 o Tier 3** respaldado por una pipeline determinista Human-in-the-Loop.

## MÃ©trica de Benchmarking
Definimos **RPT (Razonamiento Por Token)** como nuestra mÃ©trica interna de rendimiento. Cuando se lanza un nuevo modelo, nuestro ComitÃ© de IA ejecuta una suite automatizada de 5 tareas de dominio estÃ¡ndar. Solo los modelos que pasan estas pruebas son autorizados oficialmente para su adiciÃ³n al catÃ¡logo productivo.

---
[? Volver al Índice](./README.es.md)
