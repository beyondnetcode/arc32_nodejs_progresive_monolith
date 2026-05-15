# Glosario de Términos Agénticos

* **Harness (Arnés):** El ecosistema que envuelve a un modelo de lenguaje, proporcionando herramientas, contexto, permisos y verificaciones para interactuar de forma controlada con el mundo real.
* **Tool Call (Llamada a Herramienta):** Mecanismo en el que el LLM pausa la generación para solicitar formalmente la ejecución de una función o servicio externo proporcionado por el harness.
* **MCP (Model Context Protocol):** Protocolo abierto y estandarizado (Anthropic, 2024) que unifica las conexiones de modelos de lenguaje con herramientas, fuentes de datos externas y prompts predefinidos.
* **MCP Server:** El servicio que expone "Recursos" (lectura) y "Herramientas" (escritura/acción) vía el protocolo MCP para ser consumidos por uno o varios agentes.
* **MCP Client:** El componente de software (IDE, SDK Agéntico, etc.) que se conecta a un servidor MCP para recuperar las capacidades disponibles y transmitirlas al LLM.
* **Agent (Agente):** Una instancia de software que envuelve a un LLM, equipada con memoria y herramientas, capaz de decidir recursivamente qué acciones tomar para cumplir una meta compleja.
* **Multi-Agent:** Patrón de arquitectura que divide responsabilidades a través de múltiples agentes especializados que colaboran, a menudo supervisados por un orquestador central.
* **Orchestrator (Orquestador):** Componente lógico que gestiona el flujo de trabajo entre múltiples agentes, determinando la secuenciación de tareas y la agregación de resultados.
* **AGENTS.md:** Archivo de documentación-como-código obligatorio leído por el agente al iniciar la sesión, que contiene reglas del repositorio y comandos esenciales.
* **CLAUDE.md:** Implementación específica de archivo de harness dedicada a las interacciones con Claude Code (Anthropic). Similar a AGENTS.md pero con alcances optimizados.
* **Context Window (Ventana de Contexto):** Cantidad máxima de información (tokens) que un modelo puede "recordar" y procesar simultáneamente en una única llamada de inferencia.
* **RAG (Retrieval-Augmented Generation):** Técnica que inyecta datos externos relevantes en la ventana de contexto del modelo dinámicamente antes de la generación de la respuesta final.
* **Human-in-the-Loop (HITL):** Patrón de diseño que inserta una pausa en el ciclo agéntico para requerir validación/aprobación humana explícita para acciones críticas.
* **PostToolUse Hook:** Fragmento de código que se ejecuta automáticamente inmediatamente después de que un agente utiliza una herramienta, usualmente para validar el resultado determinísticamente.
* **Pre-commit Hook:** Punto de control de Git previo al commit, utilizado para asegurar que los cambios generados por IA cumplan con los estándares de sintaxis y estilo.
* **System Prompt:** Instrucción primaria de alto nivel que define la identidad, tono, reglas irrompibles y límites operativos globales del modelo al inicio del hilo.
* **Harness Engineering:** Disciplina enfocada en optimizar el entorno circundante del modelo (validaciones, superficie de API, permisos) para maximizar las tasas de éxito del agente.
* **Context Engineering:** Disciplina orientada a filtrar y refinar qué información exacta se entrega al modelo en cada turno para prevenir el desbordamiento de su ventana de razonamiento.
* **Prompt Engineering:** Técnica de refinamiento iterativo para las instrucciones textuales enviadas al LLM para condicionar el formato de salida y la precisión.
* **LLM (Large Language Model):** Modelo base pre-entrenado responsable de la inferencia del lenguaje natural y el razonamiento, el núcleo computacional de los agentes modernos.
* **Tool (Herramienta):** Unidad básica de funcionalidad externa expuesta por el harness al modelo, descrita en detalle con esquemas JSON para que el modelo sepa cómo invocarla.
* **Skill (Habilidad del Agente):** Capacidad compuesta o flujo prediseñado que agrupa múltiples herramientas para resolver una necesidad funcional repetible (ej. Habilidad de Refactorización).
* **Plan-and-Execute (Planificar y Ejecutar):** Patrón arquitectónico que obliga al sistema a generar una lista de tareas explícita (planificación) antes de iniciar la invocación recursiva de herramientas (ejecución).
* **Verification Layer (Capa de Verificación):** Conjunto secuencial de controles (Linters, Pruebas Unitarias, E2E, Contrato) que validan los artefactos generados por el agente para evitar regresiones silenciosas.

---
[Volver al Índice](./README.es.md)
