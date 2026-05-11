# Harness Recommendations by Runtime

Recomendaciones oficiales para implementar el harness según los runtimes aprobados en la matriz tecnológica corporativa.

---

## 🟢 Node.js / TypeScript

El ecosistema JavaScript es el más maduro en frameworks de soporte agéntico gracias a su asincronía y dinamismo natural.

*   **Frameworks de Harness Recomendados:**
    *   **Vercel AI SDK:** Estándar para streaming y structured output rápido.
    *   **LangChain.js / LangGraph:** Para flujos complejos de State Graph.
    *   **Mastra:** Recomendado para la construcción ligera de micro-agentes locales con tool-calling optimizado.
*   **Tool Calling:** Utilizar JSON Schema vía Zod para definir las interfaces de entrada de las herramientas, garantizando tipado fuerte (Type-Safety) desde el modelo hasta la ejecución del código.
*   **AGENTS.md Integraion:** Consumir vía Nx o NPM scripts nativos.
*   **Gobernanza:** Integración nativa con Husky para verificaciones pre-commit instantáneas.

---

## 🔵 .NET / C#

El entorno .NET destaca por su robustez tipada y rendimiento en procesos background de larga duración con supervisión agéntica.

*   **Framework de Harness Recomendado:** 
    *   **Microsoft Semantic Kernel:** La opción canónica corporativa para integrar modelos con código nativo C#.
    *   **Microsoft AutoGen:** Para simulaciones multi-agente experimentales.
*   **Tool Calling:** Utilización de Reflection nativo de C# y anotaciones/atributos (`[KernelFunction]`) para exponer métodos del dominio directamente al modelo sin wrappers pesados.
*   **Casos de Uso Típicos:** Procesamiento Batch de archivos complejos, extracción de entidades en flujos legacy y validación inteligente de data.
*   **Hooks:** Integración estricta con `dotnet test` y Roslyn Analyzers en tiempo de pre-commit.

---

## 🟣 Android / Kotlin

El rol de la IA en dispositivos móviles está acotado por el consumo de batería, memoria y latencia. 

*   **Alcance Acotado:** Los agentes en Android deben ser diseñados típicamente como **clientes** que solicitan orquestación a un agente robusto alojado en Backend. Se desaconseja la ejecución de loops agénticos recursivos complejos en local.
*   **SDKs Recomendados:**
    *   **Google AI SDK for Android:** Para inferencia directa con Gemini en tareas rápidas.
    *   **Firebase Genkit:** Integración simplificada si ya se cuenta con ecosistema Firebase.
*   **Casos de Uso:**
    *   Interfaces Generativas Dinámicas basadas en el estado actual de la app.
    *   Asistentes de ayuda contextual offline (si se usa AICore o modelos on-device pequeños).
    *   Extracción de datos estructurados desde imágenes locales (OCR Inteligente).
