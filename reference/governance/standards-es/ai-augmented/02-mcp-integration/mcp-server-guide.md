# Guía del Servidor MCP: Exposición de Capacidades Corporativas

## ¿Cuándo construir un Servidor MCP?
Se debe construir un Servidor MCP corporativo cuando las capacidades de negocio específicas de nuestros servicios de backend necesiten ser expuestas a ecosistemas agénticos (ya sea para acelerar el desarrollo interno o empoderar características de cara al usuario), garantizando que la misma interfaz sirva simultáneamente a múltiples herramientas de IA.

---

## Estructura Base en Node.js (TypeScript)

Usando el SDK oficial `@modelcontextprotocol/sdk`:

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

// 1. Instanciar Servidor
const server = new Server({
 name: "servidor-inventario-corporativo",
 version: "1.0.0",
}, {
 capabilities: {
 tools: {}, // Exponiendo capacidades de escritura/acción
 },
});

// 2. Registrar Catálogo de Herramientas (ListTools)
server.setRequestHandler(ListToolsRequestSchema, async () => {
 return {
 tools: [
 {
 name: "inventory_query_stock",
 description: "Consulta el stock disponible de un SKU específico en un almacén específico.",
 inputSchema: {
 type: "object",
 properties: {
 sku: { type: "string", description: "Identificador único del producto" },
 warehouseId: { type: "string", description: "ID del Almacén" }
 },
 required: ["sku"],
 },
 },
],
 };
});

// 3. Resolver ejecución de la herramienta (CallTool)
server.setRequestHandler(CallToolRequestSchema, async (request) => {
 if (request.params.name === "inventory_query_stock") {
 const { sku } = request.params.arguments as { sku: string };
 // Llamada interna a tu servicio de dominio o repositorio
 const stock = await fetchStockFromDatabase(sku); 
 return {
 content: [{ type: "text", text: JSON.stringify({ sku, availableStock: stock }) }],
 };
 }
 throw new Error("Herramienta no encontrada");
});

// 4. Iniciar transporte (Usualmente stdio para uso local o CI)
const transport = new StdioServerTransport();
await server.connect(transport);
```

---

## Estructura Equivalente en .NET (C#)

Empleando el soporte embebido de MCP en Semantic Kernel o el SDK oficial de .NET:

```csharp
using Microsoft.ModelContextProtocol;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddMCPServer("servidor-inventario-corporativo")
 .AddTool("inventory_query_stock", "Consulta el stock disponible de un SKU específico", async (string sku) => 
 {
 var stock = await myInventoryService.GetStockAsync(sku);
 return new ToolResult { Content = stock.ToString() };
 });

var app = builder.Build();
app.UseMCPServer(); // Exponer vía SSE (Server-Sent Events) sobre HTTP
app.Run();
```

---

## Convenciones de Nomenclatura Corporativa

Adoptamos la notación **`Snake_Case`** separada por dominio jerárquico para prevenir colisiones entre diferentes Servidores MCP de la compañía:

* **Correcto:** `inventory_query`, `shipment_track`, `auth_revoke_token`.
* **Incorrecto:** `query`, `trackShipment` (No se recomienda CamelCase en prompts genéricos), `doIt`.

## Checklist de Servidor MCP Listo para Producción

Un Servidor MCP NO es apto para producción si le falta:
- [] **Autenticación del Host:** Validación estricta de transporte (vía Token o Cabecera SSE).
- [] **Limitación de Tasa (Rate Limiting):** Protección contra un agente en bucle infinito que consuma la base de datos en segundos.
- [] **Log de Auditoría Centralizado:** Cada llamada a herramienta ejecutada debe reportar el ID de Agente, Herramienta invocada y Argumentos.
- [] **Manejo de Errores Seguro:** Si el backend falla, retornar un mensaje útil para la IA sin filtrar Stack Traces o secretos del servidor.

---
[Volver al Índice](./README.es.md)
