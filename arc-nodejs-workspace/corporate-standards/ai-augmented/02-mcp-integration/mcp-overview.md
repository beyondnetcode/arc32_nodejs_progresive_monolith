# Model Context Protocol (MCP) Overview

## ¿Qué es MCP?
El **Model Context Protocol (MCP)** es un estándar abierto lanzado en 2024 (impulsado inicialmente por Anthropic) que soluciona el problema de la conectividad caótica en el mundo agéntico.

Históricamente, cada framework de IA (LangChain, LlamaIndex, Semantic Kernel) tenía su propia forma de definir conectores a bases de datos o APIs. MCP estandariza esto mediante una arquitectura Cliente-Servidor universal, desacoplando completamente la fuente de datos del modelo de inteligencia artificial que la consume.

## Relevancia para nuestra Arquitectura
Adoptar MCP nos permite convertir nuestros microservicios existentes (TMS, WMS, ERP, CRM) en **Fuentes de Contexto y Herramientas Universales** para CUALQUIER agente corporativo. 

En lugar de construir un chatbot que consuma directamente nuestra API REST con código a medida, creamos un **Servidor MCP de Inventario**. Ese servidor puede conectarse instantáneamente a Claude Code, Cursor, un agente hecho en Python, o una solución .NET, sin escribir código de integración adicional.

## La Analogía del Protocolo
> **MCP es para los Agentes IA lo que REST/OpenAPI fue para los Microservicios en 2010.** Es el protocolo de interoperabilidad canónico que unifica la comunicación.

## Arquitectura MCP Básica

El ecosistema se basa en tres roles bien definidos:

1.  **El Host (Host application):** El software que el usuario opera (IDE como Cursor, Claude Desktop App, una App Web propia).
2.  **El Client (Cliente MCP):** El software incrustado en el Host que inicia la conexión bi-direccional.
3.  **El Server (Servidor MCP):** Un proceso local o remoto que expone capacidades a través de stdio o HTTP/SSE.

### Capacidades que expone un Servidor MCP
*   **Resources:** Equivalente a una operación GET. Lectura de archivos, registros de base de datos, logs.
*   **Tools:** Equivalente a una operación POST/PUT/DELETE. Funciones ejecutables con efectos secundarios (ej: Enviar un email, cancelar un pedido).
*   **Prompts:** Plantillas de prompt predefinidas para simplificar tareas complejas y repetibles.

## Referencia Oficial
Para leer la especificación técnica profunda, visita: [https://modelcontextprotocol.io](https://modelcontextprotocol.io)
