# Vista General de Model Context Protocol (MCP)

## ¿Qué es MCP?
El **Model Context Protocol (MCP)** es un estándar abierto lanzado en 2024 (inicialmente impulsado por Anthropic) que resuelve el problema de la conectividad caótica en el mundo agéntico.

Históricamente, cada framework de IA (LangChain, LlamaIndex, Semantic Kernel) tenía su propia forma de definir conectores a bases de datos o APIs. MCP estandariza esto vía una arquitectura Cliente-Servidor universal, desacoplando completamente la fuente de datos del modelo de lenguaje que la consume.

## Relevancia para nuestra Arquitectura
Adoptar MCP nos permite convertir nuestros microservicios existentes (TMS, WMS, ERP, CRM) en **Fuentes Universales de Contexto y Herramientas** para CUALQUIER agente corporativo.

En lugar de construir un chatbot que consuma nuestra API REST directamente con código personalizado, creamos un **Servidor MCP de Inventario**. Ese servidor puede conectarse instantáneamente a Claude Code, Cursor, a un agente en Python, o a una solución .NET, sin necesidad de escribir código de integración adicional.

## Analogía del Protocolo
> **MCP es para los Agentes de IA lo que REST/OpenAPI fue para los Microservicios en 2010.** Es el estándar de interoperabilidad canónico que unifica la comunicación.

## Arquitectura Básica de MCP

El ecosistema se apoya en tres roles bien definidos:

1. **Host (Aplicación Anfitriona):** El software que opera el usuario (IDE como Cursor, Claude Desktop App, nuestra propia Web App).
2. **Client (Cliente MCP):** El software embebido en el Host que inicia la conexión bidireccional.
3. **Server (Servidor MCP):** Un proceso local o remoto que expone capacidades a través de stdio o HTTP/SSE.

### Capacidades Expuestas por un Servidor MCP
* **Recursos (Resources):** Equivalente a una operación GET. Lectura de archivos, registros de bases de datos, logs.
* **Herramientas (Tools):** Equivalente a una operación POST/PUT/DELETE. Funciones ejecutables con efectos secundarios (ej. Enviar un correo, cancelar una orden).
* **Prompts:** Plantillas de prompts predefinidas que simplifican tareas complejas y repetibles.

## Referencia Oficial
Para leer la especificación técnica profunda, visite: [https://modelcontextprotocol.io](https://modelcontextprotocol.io)

---
[Volver al Índice](./README.es.md)
