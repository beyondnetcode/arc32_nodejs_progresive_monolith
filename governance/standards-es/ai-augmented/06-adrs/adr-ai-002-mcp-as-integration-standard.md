# ADR-AI-002: MCP como protocolo estÃ¡ndar para la integraciÃ³n agente-servicio

*   **Estado:** Propuesto
*   **Fecha:** 2026-05-11

## Contexto
A medida que los agentes de IA deben interactuar con los servicios de inventario, facturaciÃ³n y logÃ­stica de la compaÃ±Ã­a, surge la necesidad de definir una interfaz comÃºn. Sin un estÃ¡ndar, cada equipo de producto implementa su propia pegamento propietario (wrappers personalizados) para exponer endpoints REST a sus agentes, dificultando la reutilizaciÃ³n inter-departamental y la auditorÃ­a centralizada.

## DecisiÃ³n
Se aprueba el **Model Context Protocol (MCP)** como la capa de integraciÃ³n estandarizada para conectar servicios de backend con cualquier agente autÃ³nomo o entorno de desarrollo aumentado por IA. Los dominios que deseen "servir" datos a agentes corporativos DEBEN construir y exponer un **Servidor MCP**.

## Alternativas Consideradas
*   **REST Directo + RAG DinÃ¡mico:** Requiere cÃ³digo manual para cada conector y sufre de falta de un catÃ¡logo de herramientas estandarizado y tipado para los modelos.
*   **SDK Propietario de Proveedor:** (ej. usar solo plugins de Semantic Kernel). Nos ata a un stack especÃ­fico y limita el uso de herramientas IDE agÃ©nticas modernas (como Claude o Cursor) que son MCP-First.
*   **gRPC para Llamada a Herramientas:** Excesivamente pesado para orquestadores agÃ©nticos basados en JSON y carece del ecosistema maduro de hosts MCP.

## Consecuencias y Trade-offs
*   âœ… **Interoperabilidad Directa:** El mismo Servidor MCP sirve simultÃ¡neamente para potenciar tanto el IDE del desarrollador como el Agente del CRM.
*   âœ… **Seguridad Unificada:** Facilita la creaciÃ³n de Gateways que auditan llamadas a herramientas en un formato Ãºnico universal.
*   âš ï¸ **Trade-off:** Exige aÃ±adir una envoltura de transporte (Stdio o SSE) a microservicios que tradicionalmente solo eran REST/gRPC.

## Referencias
*   EspecificaciÃ³n Oficial de MCP: https://modelcontextprotocol.io

---
[? Volver al Índice](./README.es.md)
