# CatÃ¡logo de Modelos Autorizados (Horizonte Mayo 2026)

A continuaciÃ³n se presentan las Ãºnicas familias de LLM autorizadas por el ComitÃ© de Arquitectura para su integraciÃ³n en productos corporativos. Cualquier modelo no listado requiere un ticket de autorizaciÃ³n temporal para pruebas.

## Familias Comerciales Autorizadas (VÃ­a Gateway Corporativo)

### â˜ï¸ Familia Google Gemini
*   **Gemini 1.5 Pro**: Recomendado para lectura masiva de cÃ³digo debido a su ventana de tokens de 2M. Capacidad superior para razonamiento estructural entre repositorios.
*   **Gemini 1.5 Flash**: Recomendado para extracciÃ³n barata y rÃ¡pida de metadatos estructurados de imÃ¡genes o grandes volÃºmenes de texto.

### â˜ï¸ Familia Anthropic Claude
*   **Claude 3.5 Sonnet**: Benchmark global actual para codificaciÃ³n de software nativo y llamadas deterministas a herramientas. Designado como modelo primario para IDEs y agentes locales.
*   **Claude 3.5 Haiku**: El rendimiento mÃ¡s rÃ¡pido para clasificaciÃ³n con latencia inferior a un segundo.

### â˜ï¸ Familia OpenAI GPT
*   **GPT-4o**: Altamente robusto para lÃ³gica de workflows legados y llamadas complejas a funciones donde la compatibilidad nativa requiere el estÃ¡ndar histÃ³rico de OpenAI.
*   **o1 (Serie de Razonamiento)**: Autorizado solo para cÃ¡lculos cientÃ­ficos o tareas intensas de optimizaciÃ³n algorÃ­tmica. Bloqueado para chatbots conversacionales debido al alto costo por token de razonamiento.

## Familias Open Source / Locales Autorizadas (Autohospedadas)

### ðŸ  Serie Meta Llama 3.x
*   **Llama 3.1 70B / 405B**: Alternativa primaria para soberanÃ­a de datos absoluta. Debe correr en clÃºsteres internos de Kubernetes/GPU (vLLM).
*   **Llama 3.1 8B**: Para runtimes en el borde (edge) o micro-agentes embebidos rÃ¡pidos.

---
*Nota: Los modelos listados aquÃ­ se derivan de tablas de clasificaciÃ³n estÃ¡ndar de la industria y superan nuestros benchmarks internos de RPT (Reasoning Per Token).*

---
[? Volver al Índice](./README.es.md)
