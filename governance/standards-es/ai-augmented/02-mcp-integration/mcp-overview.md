# Vista General de Model Context Protocol (MCP)

## Â¿QuÃ© es MCP?
El **Model Context Protocol (MCP)** es un estÃ¡ndar abierto lanzado en 2024 (inicialmente impulsado por Anthropic) que resuelve el problema de la conectividad caÃ³tica en el mundo agÃ©ntico.

HistÃ³ricamente, cada framework de IA (LangChain, LlamaIndex, Semantic Kernel) tenÃ­a su propia forma de definir conectores a bases de datos o APIs. MCP estandariza esto vÃ­a una arquitectura Cliente-Servidor universal, desacoplando completamente la fuente de datos del modelo de lenguaje que la consume.

## Relevancia para nuestra Arquitectura
Adoptar MCP nos permite convertir nuestros microservicios existentes (TMS, WMS, ERP, CRM) en **Fuentes Universales de Contexto y Herramientas** para CUALQUIER agente corporativo.

En lugar de construir un chatbot que consuma nuestra API REST directamente con cÃ³digo personalizado, creamos un **Servidor MCP de Inventario**. Ese servidor puede conectarse instantÃ¡neamente a Claude Code, Cursor, a un agente en Python, o a una soluciÃ³n .NET, sin necesidad de escribir cÃ³digo de integraciÃ³n adicional.

## AnalogÃ­a del Protocolo
> **MCP es para los Agentes de IA lo que REST/OpenAPI fue para los Microservicios en 2010.** Es el estÃ¡ndar de interoperabilidad canÃ³nico que unifica la comunicaciÃ³n.

## Arquitectura BÃ¡sica de MCP

El ecosistema se apoya en tres roles bien definidos:

1.  **Host (AplicaciÃ³n Anfitriona):** El software que opera el usuario (IDE como Cursor, Claude Desktop App, nuestra propia Web App).
2.  **Client (Cliente MCP):** El software embebido en el Host que inicia la conexiÃ³n bidireccional.
3.  **Server (Servidor MCP):** Un proceso local o remoto que expone capacidades a travÃ©s de stdio o HTTP/SSE.

### Capacidades Expuestas por un Servidor MCP
*   **Recursos (Resources):** Equivalente a una operaciÃ³n GET. Lectura de archivos, registros de bases de datos, logs.
*   **Herramientas (Tools):** Equivalente a una operaciÃ³n POST/PUT/DELETE. Funciones ejecutables con efectos secundarios (ej. Enviar un correo, cancelar una orden).
*   **Prompts:** Plantillas de prompts predefinidas que simplifican tareas complejas y repetibles.

## Referencia Oficial
Para leer la especificaciÃ³n tÃ©cnica profunda, visite: [https://modelcontextprotocol.io](https://modelcontextprotocol.io)

---
[? Volver al Índice](./README.es.md)
