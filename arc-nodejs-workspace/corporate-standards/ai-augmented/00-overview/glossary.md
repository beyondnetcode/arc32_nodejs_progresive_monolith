# Glosario de Términos Agénticos

*   **Harness:** El ecosistema que envuelve a un modelo de lenguaje proporcionándole herramientas, contexto, permisos y verificaciones para interactuar de forma controlada con el mundo real.
*   **Tool Call:** Mecanismo en el cual el LLM detiene su generación de texto para solicitar formalmente la ejecución de una función o servicio externo provisto por el harness.
*   **MCP (Model Context Protocol):** Protocolo abierto y estandarizado (Anthropic, 2024) que unifica la conexión de modelos de lenguaje con herramientas, fuentes de datos externas y prompts predefinidos.
*   **MCP Server:** El servicio que expone "Resources" (lectura) y "Tools" (escritura/acción) a través del protocolo MCP para ser consumidos por uno o varios agentes.
*   **MCP Client:** El componente de software (IDE, SDK agéntico, etc.) que se conecta a un servidor MCP para obtener el catálogo de capacidades disponibles y transmitírselas al LLM.
*   **Agent (Agente):** Una instancia de software que envuelve un LLM, dotada de memoria y tools, capaz de decidir de forma recursiva qué acciones tomar para cumplir un objetivo complejo.
*   **Multi-Agent:** Patrón de arquitectura donde se dividen las responsabilidades en varios agentes especializados que colaboran, a menudo bajo la supervisión de un orquestador central.
*   **Orchestrator:** El componente lógico que gestiona el flujo de trabajo entre múltiples agentes, decidiendo el orden de las tareas y la agregación de los resultados.
*   **AGENTS.md:** Archivo de documentación como código obligatorio, diseñado para ser leído por el agente al iniciar la sesión, conteniendo reglas del repositorio y comandos esenciales.
*   **CLAUDE.md:** Implementación específica del archivo de harness dedicada a las interacciones con Claude Code (Anthropic). Funcionalmente similar a AGENTS.md pero con scopes optimizados.
*   **Context Window:** La cantidad máxima de información (tokens) que un modelo puede "recordar" y procesar de forma simultánea en una única llamada de inferencia.
*   **RAG (Retrieval-Augmented Generation):** Técnica que inyecta datos externos y relevantes en la ventana de contexto del modelo dinámicamente antes de generar la respuesta final.
*   **Human-in-the-Loop (HITL):** Patrón de diseño que inserta una pausa en el ciclo agéntico para requerir la validación o aprobación humana explícita ante acciones críticas.
*   **PostToolUse Hook:** Fragmento de código que se ejecuta automáticamente inmediatamente después de que un agente utiliza una herramienta, usualmente para validar el resultado determinísticamente.
*   **Pre-commit Hook:** Punto de control gatillado por Git antes de finalizar un commit, usado para asegurar que los cambios generados por la IA cumplen estándares de sintaxis y estilo.
*   **System Prompt:** La instrucción primaria de alto nivel dada al modelo al inicio del hilo, que define su identidad, tono, reglas irrompibles y límites operativos globales.
*   **Harness Engineering:** Disciplina centrada en optimizar el entorno circundante del modelo (validaciones, API surface, permisos) para maximizar la tasa de éxito operativo del agente.
*   **Context Engineering:** Disciplina orientada a filtrar y refinar qué información exacta se entrega al modelo en cada turno para no desbordar su ventana de razonamiento.
*   **Prompt Engineering:** Técnica de refinamiento iterativo de la instrucción escrita enviada al LLM para condicionar el formato y precisión de su respuesta textual.
*   **LLM (Large Language Model):** El modelo base pre-entrenado encargado de la inferencia de lenguaje natural y el razonamiento, núcleo computacional de cualquier agente moderno.
*   **Tool:** La unidad básica de funcionalidad externa que el harness expone al modelo, descrita detalladamente con esquemas JSON para que el modelo sepa cómo invocarla.
*   **Skill (Agent Skill):** Una capacidad compuesta o flujo prediseñado que agrupa múltiples tools para resolver una necesidad funcional repetible (ej: Skill de Refactorización).
*   **Plan-and-Execute:** Patrón arquitectónico que fuerza al sistema a generar una lista de pasos explícita (planificación) antes de comenzar la invocación recursiva de tools (ejecución).
*   **Verification Layer (Capa de Verificación):** La suite secuencial de controles (Linters, Unit Tests, E2E, Contract) que validan los artefactos generados por el agente para evitar regresiones silenciosas.
