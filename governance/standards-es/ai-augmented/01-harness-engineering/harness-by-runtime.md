# Recomendaciones de Harness por Runtime

Recomendaciones oficiales para implementar el harness de acuerdo con los runtimes autorizados en la matriz tecnolÃ³gica corporativa.

---

## ðŸŸ¢ Node.js / TypeScript

El ecosistema de JavaScript es el mÃ¡s maduro en frameworks de soporte agÃ©ntico gracias a su asincronÃ­a y dinamismo naturales.

*   **Frameworks de Harness Recomendados:**
    *   **Vercel AI SDK:** EstÃ¡ndar para streaming rÃ¡pido y salida estructurada.
    *   **LangChain.js / LangGraph:** Para flujos complejos de grafos de estado.
    *   **Mastra:** Recomendado para construir micro-agentes locales ligeros con llamadas a herramientas optimizadas.
*   **Llamadas a Herramientas (Tool Calling):** Usar JSON Schema vÃ­a Zod para definir las interfaces de entrada de las herramientas, garantizando un tipado fuerte (Type-Safety) desde el modelo hasta la ejecuciÃ³n del cÃ³digo.
*   **IntegraciÃ³n AGENTS.md:** Consumir vÃ­a Nx o scripts NPM nativos.
*   **Gobernanza:** IntegraciÃ³n nativa con Husky para verificaciones pre-commit instantÃ¡neas.

---

## ðŸ”µ .NET / C#

El entorno .NET sobresale en robustez tipada y rendimiento en procesos de fondo de larga duraciÃ³n con supervisiÃ³n agÃ©ntica.

*   **Frameworks de Harness Recomendados:** 
    *   **Microsoft Semantic Kernel:** La elecciÃ³n corporativa canÃ³nica para integrar modelos con cÃ³digo C# nativo.
    *   **Microsoft AutoGen:** Para simulaciones multi-agente experimentales.
*   **Llamadas a Herramientas:** Utilizar ReflexiÃ³n nativa de C# y anotaciones/atributos (`[KernelFunction]`) para exponer mÃ©todos de dominio directamente al modelo sin envoltorios pesados.
*   **Casos de Uso TÃ­picos:** Procesamiento de lotes de archivos complejos, extracciÃ³n de entidades en flujos legacy y validaciÃ³n de datos inteligente.
*   **Hooks:** IntegraciÃ³n estricta con `dotnet test` y Roslyn Analyzers durante el pre-commit.

---

## ðŸŸ£ Android / Kotlin

El rol de la IA en dispositivos mÃ³viles estÃ¡ acotado por el consumo de baterÃ­a, la memoria y la latencia.

*   **Alcance Acotado:** Los agentes de Android tÃ­picamente deberÃ­an diseÃ±arse como **clientes** que solicitan orquestaciÃ³n de un agente robusto alojado en el backend. Se desaconsejan los bucles agÃ©nticos recursivos y complejos en el runtime local.
*   **SDKs Recomendados:**
    *   **Google AI SDK para Android:** Para inferencia directa con Gemini en tareas rÃ¡pidas.
    *   **Firebase Genkit:** IntegraciÃ³n simplificada si el ecosistema Firebase ya estÃ¡ implementado.
*   **Casos de Uso:**
    *   UI Generativa DinÃ¡mica basada en el estado actual de la app.
    *   Asistentes de ayuda contextual con capacidad offline (si se usa AICore o modelos pequeÃ±os en el dispositivo).
    *   ExtracciÃ³n de datos estructurados de imÃ¡genes locales (OCR Inteligente).

---
[? Volver al Índice](./README.es.md)
