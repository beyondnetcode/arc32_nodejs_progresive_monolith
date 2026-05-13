# Qué es esta sección y cómo usarla

## Diferencia Fundamental: La IA como Herramienta vs La IA como Componente

Es crucial distinguir entre dos formas de incorporar la Inteligencia Artificial en nuestro ecosistema:

1.  **IA como Herramienta de Desarrollo:** El uso de copilotos (GitHub Copilot, Claude Code) durante el ciclo de vida del software para acelerar la escritura de código, refactorización o depuración. No requiere cambios en la arquitectura del producto.
2.  **IA Integrada en el Producto:** Cuando el producto incorpora agentes, llamadas a modelos o flujos agénticos para resolver problemas de negocio en tiempo de ejecución. Esto requiere una estricta supervisión arquitectónica.

## Por qué la Ingeniería del Harness Importa Más que el Modelo

A menudo se asume que la inteligencia de una solución agéntica depende al 100% del modelo elegido. Los datos empíricos muestran lo contrario:

*   **Caso LangChain:** Logró mejorar el rendimiento del agente de un **52.8% a un 66.5%** únicamente cambiando el harness, sin modificar el modelo subyacente.
*   **Caso Can.ac (Benchmark Hashline, 2026):** Un investigador logró un incremento en la tasa de éxito de un **6.7% a un 68.3%** estrictamente alterando el formato de edición y validación provisto por el harness.

El **harness** (arnés) es el entorno seguro y estructurado que le damos al modelo para operar: herramientas bien descritas, reglas claras, contextos delimitados y sistemas de validación automatizados.

## La Evolución de la Ingeniería con IA

El enfoque de la industria ha madurado rápidamente hacia entornos más deterministas:

| Fase | Período | Enfoque Principal | Descripción |
| :--- | :--- | :--- | :--- |
| **Prompt Engineering** | 2022—2024 | Optimizar Instrucciones | "Pedir bien" para obtener una respuesta aceptable en formato texto. |
| **Context Engineering** | 2025 | Construir Ventanas de Contexto | Uso de RAG, memoria dinámica y MCP para dar el dato correcto en el momento justo. |
| **Harness Engineering** | 2026 | Diseñar el Entorno de Ejecución | Definición de restricciones arquitectónicas, hooks de verificación, permisos y bucles de control deterministas. |

## Cuándo NO Adoptar esta Sección

No todos los proyectos se benefician de la integración agéntica. Se desaconseja la adopción de esta arquitectura aumentada en los siguientes escenarios:

*   **Equipos sin Madurez Base:** Si el equipo no ha implementado una pirámide de pruebas robusta, CI/CD o arquitectura limpia, la IA multiplicará exponencialmente la deuda técnica.
*   **Productos MVP no Validados:** Los costos y la latencia de los flujos agénticos usualmente ralentizan el ciclo inicial de validación de mercado.
*   **Sistemas Ultra-Críticos sin Supervisión:** Operaciones estrictas en tiempo real o decisiones que afectan directamente vidas humanas sin un checkpoint determinista o supervisión humana (Human-in-the-loop).
