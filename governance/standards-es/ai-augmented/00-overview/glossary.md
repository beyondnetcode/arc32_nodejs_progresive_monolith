# Glosario de TÃ©rminos AgÃ©nticos

*   **Harness (ArnÃ©s):** El ecosistema que envuelve a un modelo de lenguaje, proporcionando herramientas, contexto, permisos y verificaciones para interactuar de forma controlada con el mundo real.
*   **Tool Call (Llamada a Herramienta):** Mecanismo en el que el LLM pausa la generaciÃ³n para solicitar formalmente la ejecuciÃ³n de una funciÃ³n o servicio externo proporcionado por el harness.
*   **MCP (Model Context Protocol):** Protocolo abierto y estandarizado (Anthropic, 2024) que unifica las conexiones de modelos de lenguaje con herramientas, fuentes de datos externas y prompts predefinidos.
*   **MCP Server:** El servicio que expone "Recursos" (lectura) y "Herramientas" (escritura/acciÃ³n) vÃ­a el protocolo MCP para ser consumidos por uno o varios agentes.
*   **MCP Client:** El componente de software (IDE, SDK AgÃ©ntico, etc.) que se conecta a un servidor MCP para recuperar las capacidades disponibles y transmitirlas al LLM.
*   **Agent (Agente):** Una instancia de software que envuelve a un LLM, equipada con memoria y herramientas, capaz de decidir recursivamente quÃ© acciones tomar para cumplir una meta compleja.
*   **Multi-Agent:** PatrÃ³n de arquitectura que divide responsabilidades a travÃ©s de mÃºltiples agentes especializados que colaboran, a menudo supervisados por un orquestador central.
*   **Orchestrator (Orquestador):** Componente lÃ³gico que gestiona el flujo de trabajo entre mÃºltiples agentes, determinando la secuenciaciÃ³n de tareas y la agregaciÃ³n de resultados.
*   **AGENTS.md:** Archivo de documentaciÃ³n-como-cÃ³digo obligatorio leÃ­do por el agente al iniciar la sesiÃ³n, que contiene reglas del repositorio y comandos esenciales.
*   **CLAUDE.md:** ImplementaciÃ³n especÃ­fica de archivo de harness dedicada a las interacciones con Claude Code (Anthropic). Similar a AGENTS.md pero con alcances optimizados.
*   **Context Window (Ventana de Contexto):** Cantidad mÃ¡xima de informaciÃ³n (tokens) que un modelo puede "recordar" y procesar simultÃ¡neamente en una Ãºnica llamada de inferencia.
*   **RAG (Retrieval-Augmented Generation):** TÃ©cnica que inyecta datos externos relevantes en la ventana de contexto del modelo dinÃ¡micamente antes de la generaciÃ³n de la respuesta final.
*   **Human-in-the-Loop (HITL):** PatrÃ³n de diseÃ±o que inserta una pausa en el ciclo agÃ©ntico para requerir validaciÃ³n/aprobaciÃ³n humana explÃ­cita para acciones crÃ­ticas.
*   **PostToolUse Hook:** Fragmento de cÃ³digo que se ejecuta automÃ¡ticamente inmediatamente despuÃ©s de que un agente utiliza una herramienta, usualmente para validar el resultado determinÃ­sticamente.
*   **Pre-commit Hook:** Punto de control de Git previo al commit, utilizado para asegurar que los cambios generados por IA cumplan con los estÃ¡ndares de sintaxis y estilo.
*   **System Prompt:** InstrucciÃ³n primaria de alto nivel que define la identidad, tono, reglas irrompibles y lÃ­mites operativos globales del modelo al inicio del hilo.
*   **Harness Engineering:** Disciplina enfocada en optimizar el entorno circundante del modelo (validaciones, superficie de API, permisos) para maximizar las tasas de Ã©xito del agente.
*   **Context Engineering:** Disciplina orientada a filtrar y refinar quÃ© informaciÃ³n exacta se entrega al modelo en cada turno para prevenir el desbordamiento de su ventana de razonamiento.
*   **Prompt Engineering:** TÃ©cnica de refinamiento iterativo para las instrucciones textuales enviadas al LLM para condicionar el formato de salida y la precisiÃ³n.
*   **LLM (Large Language Model):** Modelo base pre-entrenado responsable de la inferencia del lenguaje natural y el razonamiento, el nÃºcleo computacional de los agentes modernos.
*   **Tool (Herramienta):** Unidad bÃ¡sica de funcionalidad externa expuesta por el harness al modelo, descrita en detalle con esquemas JSON para que el modelo sepa cÃ³mo invocarla.
*   **Skill (Habilidad del Agente):** Capacidad compuesta o flujo prediseÃ±ado que agrupa mÃºltiples herramientas para resolver una necesidad funcional repetible (ej. Habilidad de RefactorizaciÃ³n).
*   **Plan-and-Execute (Planificar y Ejecutar):** PatrÃ³n arquitectÃ³nico que obliga al sistema a generar una lista de tareas explÃ­cita (planificaciÃ³n) antes de iniciar la invocaciÃ³n recursiva de herramientas (ejecuciÃ³n).
*   **Verification Layer (Capa de VerificaciÃ³n):** Conjunto secuencial de controles (Linters, Pruebas Unitarias, E2E, Contrato) que validan los artefactos generados por el agente para evitar regresiones silenciosas.

---
[? Volver al Índice](./README.es.md)
