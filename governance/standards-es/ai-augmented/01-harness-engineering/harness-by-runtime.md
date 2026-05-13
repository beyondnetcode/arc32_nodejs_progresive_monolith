# Recomendaciones de Harness por Runtime

Recomendaciones oficiales para implementar el harness de acuerdo con los runtimes autorizados en la matriz tecnológica corporativa.

---

## 🟢 Node.js / TypeScript

El ecosistema de JavaScript es el más maduro en frameworks de soporte agéntico gracias a su asincronía y dinamismo naturales.

*   **Frameworks de Harness Recomendados:**
    *   **Vercel AI SDK:** Estándar para streaming rápido y salida estructurada.
    *   **LangChain.js / LangGraph:** Para flujos complejos de grafos de estado.
    *   **Mastra:** Recomendado para construir micro-agentes locales ligeros con llamadas a herramientas optimizadas.
*   **Llamadas a Herramientas (Tool Calling):** Usar JSON Schema vía Zod para definir las interfaces de entrada de las herramientas, garantizando un tipado fuerte (Type-Safety) desde el modelo hasta la ejecución del código.
*   **Integración AGENTS.md:** Consumir vía Nx o scripts NPM nativos.
*   **Gobernanza:** Integración nativa con Husky para verificaciones pre-commit instantáneas.

---

## 🔵 .NET / C#

El entorno .NET sobresale en robustez tipada y rendimiento en procesos de fondo de larga duración con supervisión agéntica.

*   **Frameworks de Harness Recomendados:** 
    *   **Microsoft Semantic Kernel:** La elección corporativa canónica para integrar modelos con código C# nativo.
    *   **Microsoft AutoGen:** Para simulaciones multi-agente experimentales.
*   **Llamadas a Herramientas:** Utilizar Reflexión nativa de C# y anotaciones/atributos (`[KernelFunction]`) para exponer métodos de dominio directamente al modelo sin envoltorios pesados.
*   **Casos de Uso Típicos:** Procesamiento de lotes de archivos complejos, extracción de entidades en flujos legacy y validación de datos inteligente.
*   **Hooks:** Integración estricta con `dotnet test` y Roslyn Analyzers durante el pre-commit.

---

## 🟣 Android / Kotlin

El rol de la IA en dispositivos móviles está acotado por el consumo de batería, la memoria y la latencia.

*   **Alcance Acotado:** Los agentes de Android típicamente deberían diseñarse como **clientes** que solicitan orquestación de un agente robusto alojado en el backend. Se desaconsejan los bucles agénticos recursivos y complejos en el runtime local.
*   **SDKs Recomendados:**
    *   **Google AI SDK para Android:** Para inferencia directa con Gemini en tareas rápidas.
    *   **Firebase Genkit:** Integración simplificada si el ecosistema Firebase ya está implementado.
*   **Casos de Uso:**
    *   UI Generativa Dinámica basada en el estado actual de la app.
    *   Asistentes de ayuda contextual con capacidad offline (si se usa AICore o modelos pequeños en el dispositivo).
    *   Extracción de datos estructurados de imágenes locales (OCR Inteligente).
