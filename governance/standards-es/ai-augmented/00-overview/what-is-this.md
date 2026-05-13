# QuÃ© es esta secciÃ³n y cÃ³mo usarla

## Diferencia Fundamental: La IA como Herramienta vs La IA como Componente

Es crucial distinguir entre dos formas de incorporar la Inteligencia Artificial en nuestro ecosistema:

1.  **IA como Herramienta de Desarrollo:** El uso de copilotos (GitHub Copilot, Claude Code) durante el ciclo de vida del software para acelerar la escritura de cÃ³digo, refactorizaciÃ³n o depuraciÃ³n. No requiere cambios en la arquitectura del producto.
2.  **IA Integrada en el Producto:** Cuando el producto incorpora agentes, llamadas a modelos o flujos agÃ©nticos para resolver problemas de negocio en tiempo de ejecuciÃ³n. Esto requiere una estricta supervisiÃ³n arquitectÃ³nica.

## Por quÃ© la IngenierÃ­a del Harness Importa MÃ¡s que el Modelo

A menudo se asume que la inteligencia de una soluciÃ³n agÃ©ntica depende al 100% del modelo elegido. Los datos empÃ­ricos muestran lo contrario:

*   **Caso LangChain:** LogrÃ³ mejorar el rendimiento del agente de un **52.8% a un 66.5%** Ãºnicamente cambiando el harness, sin modificar el modelo subyacente.
*   **Caso Can.ac (Benchmark Hashline, 2026):** Un investigador logrÃ³ un incremento en la tasa de Ã©xito de un **6.7% a un 68.3%** estrictamente alterando el formato de ediciÃ³n y validaciÃ³n provisto por el harness.

El **harness** (arnÃ©s) es el entorno seguro y estructurado que le damos al modelo para operar: herramientas bien descritas, reglas claras, contextos delimitados y sistemas de validaciÃ³n automatizados.

## La EvoluciÃ³n de la IngenierÃ­a con IA

El enfoque de la industria ha madurado rÃ¡pidamente hacia entornos mÃ¡s deterministas:

| Fase | PerÃ­odo | Enfoque Principal | DescripciÃ³n |
| :--- | :--- | :--- | :--- |
| **Prompt Engineering** | 2022â€”2024 | Optimizar Instrucciones | "Pedir bien" para obtener una respuesta aceptable en formato texto. |
| **Context Engineering** | 2025 | Construir Ventanas de Contexto | Uso de RAG, memoria dinÃ¡mica y MCP para dar el dato correcto en el momento justo. |
| **Harness Engineering** | 2026 | DiseÃ±ar el Entorno de EjecuciÃ³n | DefiniciÃ³n de restricciones arquitectÃ³nicas, hooks de verificaciÃ³n, permisos y bucles de control deterministas. |

## CuÃ¡ndo NO Adoptar esta SecciÃ³n

No todos los proyectos se benefician de la integraciÃ³n agÃ©ntica. Se desaconseja la adopciÃ³n de esta arquitectura aumentada en los siguientes escenarios:

*   **Equipos sin Madurez Base:** Si el equipo no ha implementado una pirÃ¡mide de pruebas robusta, CI/CD o arquitectura limpia, la IA multiplicarÃ¡ exponencialmente la deuda tÃ©cnica.
*   **Productos MVP no Validados:** Los costos y la latencia de los flujos agÃ©nticos usualmente ralentizan el ciclo inicial de validaciÃ³n de mercado.
*   **Sistemas Ultra-CrÃ­ticos sin SupervisiÃ³n:** Operaciones estrictas en tiempo real o decisiones que afectan directamente vidas humanas sin un checkpoint determinista o supervisiÃ³n humana (Human-in-the-loop).

---
[? Volver al Índice](./README.es.md)
