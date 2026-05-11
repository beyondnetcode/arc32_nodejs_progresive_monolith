# ADR-AI-002: MCP como protocolo estándar de integración agente-servicio

*   **Estatus:** Proposed
*   **Fecha:** 2026-05-11

## Contexto
A medida que los agentes de IA deben interactuar con los servicios de inventario, facturación y logística de la empresa, surge la necesidad de definir una interfaz común. Sin un estándar, cada equipo de producto implementa su propio pegamento propietario (custom wrappers) para exponer endpoints REST hacia sus agentes, dificultando la reutilización interdepartamental y la auditoría centralizada.

## Decisión
Se aprueba el **Model Context Protocol (MCP)** como la capa de integración estandarizada para conectar servicios de backend con cualquier agente autónomo o entorno de desarrollo IA-augmented. Los dominios que deseen "servir" data a agentes corporativos deberán construir y exponer un **MCP Server**.

## Alternativas Consideradas
*   **REST Directo + RAG Dinámico:** Requiere código manual para cada conector y sufre de falta de un catálogo de tools estandarizado y tipado para modelos.
*   **SDK Propietario por Proveedor:** (ej: solo usar Semantic Kernel plugins). Nos ata a un stack específico y limita el uso de herramientas de IDE agénticas modernas (como Claude o Cursor) que son MCP-First.
*   **gRPC para Tool Calling:** Demasiado pesado para orquestadores agénticos basados en JSON y no posee el ecosistema maduro de hosts MCP.

## Consecuencias y Trade-offs
*   ✅ **Interoperabilidad Directa:** Un mismo MCP Server sirve para potenciar el IDE del programador y al Agente del CRM simultáneamente.
*   ✅ **Seguridad unificada:** Facilita la creación de Gateways que auditen las llamadas a tools en un solo formato universal.
*   ⚠️ **Compromiso:** Exige añadir un wrapper de transporte (Stdio o SSE) a microservicios que tradicionalmente solo eran REST/gRPC.

## Referencias
*   Especificación Oficial MCP: https://modelcontextprotocol.io
