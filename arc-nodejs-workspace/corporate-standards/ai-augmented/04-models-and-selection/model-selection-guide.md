# Model Selection Guide: Criterios para elegir modelos

## Principio Base
> **El modelo es un Commodity; el Harness es la Ventaja Competitiva.**

Nunca intentes resolver con un modelo más caro y grande un problema que puede solucionarse optimizando el Harness (mejores descripciones de tools, mejor contexto RAG, o validaciones deterministas). Solo escala de modelo cuando el razonamiento abstracto del modelo actual haya tocado su techo técnico empírico.

## Árbol de Decisión Corporativo

Utilice las siguientes reglas para seleccionar el Tier de Modelo adecuado:

1.  **¿La latencia debe ser < 500ms y la tarea es simple?** (ej: extracción de JSON, clasificación de tokens, routing inicial).
    *   👉 **Modelos Small / Fast:** *Haiku, GPT-4o-mini, Gemini 1.5 Flash.*
2.  **¿La tarea requiere razonamiento complejo, generación de código políglota o planeamiento multi-paso?**
    *   👉 **Modelos Large / Pro:** *Claude 3.5 Sonnet, GPT-4o, Gemini 1.5 Pro.*
3.  **¿Debes procesar documentos gigantes (Libros, Codebases enteros) de una sola vez?**
    *   👉 **Modelos Extended Context:** *Gemini 1.5 Pro (1M+ tokens window).*
4.  **¿Hay restricciones Legales/PII extremas o ausencia total de Internet?**
    *   👉 **Modelos On-Premise / Self-Hosted:** *Llama 3.x, Mistral, Qwen 2.*

## Criterios de Evaluación de la Arquitectura

Antes de aprobar la integración de un nuevo modelo a la plataforma, el equipo de arquitectura valida:

*   **Compatibilidad con Tool Calling Nativ:** ¿El modelo soporta nativamente Function Calling o debemos hacer "parser" manual de texto? (Prioridad alta al soporte nativo).
*   **Licencia de Uso Comercial:** ¿La licencia del modelo OSS permite explícitamente uso comercial sin regalar royalties? (Llama 3.1 OK, otros requieren revisión legal).
*   **Política de Privacidad de Datos (Data Privacy Agreement):** ¿El proveedor firma un DPA que garantice que **NUESTROS DATOS NO SE USAN PARA ENTRENAR** sus futuros modelos? Si no lo firma, queda prohibido para cualquier dato no-público.
*   **Soporte MCP:** Facilidad para integrarse como cliente del ecosistema Model Context Protocol.
*   **Latencia de Región:** Presencia del endpoint en la misma región Cloud (ej: Azure East US, AWS us-east-1) que nuestros microservicios para minimizar RTT.

> [!WARNING]
> **Trampa de la Optimización:** Un modelo que ha sido fuertemente ajustado (fine-tuned) para funcionar con un framework específico puede rendir drásticamente peor al ser trasplantado a un harness diferente. Evalúa siempre con benchmarks reales de tu propio dominio.
