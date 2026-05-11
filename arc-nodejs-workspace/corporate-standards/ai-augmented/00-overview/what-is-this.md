# Qué es esta sección y cómo usarla

## Diferencia Fundamental: AI como Herramienta vs AI como Componente

Es crucial distinguir entre dos formas de incorporar Inteligencia Artificial en nuestro ecosistema:

1.  **IA como Herramienta de Desarrollo (AI as a Tool):** El uso de copilotos (GitHub Copilot, Claude Code) durante el ciclo de vida del software para acelerar la escritura de código, refactorización o depuración. No requiere cambios en la arquitectura del producto.
2.  **IA Integrada en el Producto (AI as a Component):** Cuando el producto incorpora agentes, llamadas a modelos o flujos agénticos para resolver problemas de negocio en tiempo de ejecución. Esto requiere supervisión arquitectónica estricta.

## Por qué el Harness Engineering importa más que el Modelo

A menudo se asume que la inteligencia de una solución agéntica depende 100% del modelo elegido. Los datos empíricos demuestran lo contrario:

*   **Caso LangChain:** Logró mejorar el rendimiento de su agente del **52.8% al 66.5%** cambiando únicamente el harness, sin modificar el modelo subyacente.
*   **Caso Can.ac (Hashline Benchmark, 2026):** Un investigador consiguió que un modelo pasara de una tasa de éxito del **6.7% al 68.3%** cambiando estrictamente el formato de edición y validación provisto por el harness.

El **harness** es el entorno seguro y estructurado que le damos al modelo para operar: herramientas bien descritas, reglas claras, contextos acotados y sistemas de validación automáticos.

## La Evolución de la Ingeniería con IA

El enfoque de la industria ha madurado rápidamente hacia entornos más deterministas:

| Fase | Período | Foco Principal | Descripción |
| :--- | :--- | :--- | :--- |
| **Prompt Engineering** | 2022–2024 | Optimizar la instrucción | "Preguntar bien" para obtener una respuesta aceptable en formato de texto. |
| **Context Engineering** | 2025 | Construir ventanas de contexto | Uso de RAG, memoria dinámica y MCP para dar los datos correctos en el momento justo. |
| **Harness Engineering** | 2026 | Diseñar el entorno operativo | Definición de restricciones arquitectónicas, hooks de verificación, permisos y bucles de control deterministas. |

## Cuándo NO adoptar esta sección

No todos los proyectos se benefician de la integración agéntica. Se desaconseja la adopción de esta arquitectura aumentada en los siguientes escenarios:

*   **Equipos sin madurez base:** Si el equipo no tiene implementada una pirámide de testing robusta, CI/CD, o clean architecture, la IA multiplicará la deuda técnica técnica existente exponencialmente.
*   **Productos MVP no validados:** Los costos y la latencia de flujos agénticos suelen ralentizar la iteración inicial de validación de mercado.
*   **Sistemas ultra-críticos sin supervisión:** Operaciones de tiempo real estricto o decisiones que afecten directamente vidas humanas sin un checkpoint determinista o supervisión humana (Human-in-the-loop).
