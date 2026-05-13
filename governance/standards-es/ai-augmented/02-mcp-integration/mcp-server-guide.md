# GuÃ­a del Servidor MCP: ExposiciÃ³n de Capacidades Corporativas

## Â¿CuÃ¡ndo construir un Servidor MCP?
Se debe construir un Servidor MCP corporativo cuando las capacidades de negocio especÃ­ficas de nuestros servicios de backend necesiten ser expuestas a ecosistemas agÃ©nticos (ya sea para acelerar el desarrollo interno o empoderar caracterÃ­sticas de cara al usuario), garantizando que la misma interfaz sirva simultÃ¡neamente a mÃºltiples herramientas de IA.

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
    tools: {}, // Exponiendo capacidades de escritura/acciÃ³n
  },
});

// 2. Registrar CatÃ¡logo de Herramientas (ListTools)
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "inventory_query_stock",
        description: "Consulta el stock disponible de un SKU especÃ­fico en un almacÃ©n especÃ­fico.",
        inputSchema: {
          type: "object",
          properties: {
            sku: { type: "string", description: "Identificador Ãºnico del producto" },
            warehouseId: { type: "string", description: "ID del AlmacÃ©n" }
          },
          required: ["sku"],
        },
      },
    ],
  };
});

// 3. Resolver ejecuciÃ³n de la herramienta (CallTool)
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
    .AddTool("inventory_query_stock", "Consulta el stock disponible de un SKU especÃ­fico", async (string sku) => 
    {
         var stock = await myInventoryService.GetStockAsync(sku);
         return new ToolResult { Content = stock.ToString() };
    });

var app = builder.Build();
app.UseMCPServer(); // Exponer vÃ­a SSE (Server-Sent Events) sobre HTTP
app.Run();
```

---

## Convenciones de Nomenclatura Corporativa

Adoptamos la notaciÃ³n **`Snake_Case`** separada por dominio jerÃ¡rquico para prevenir colisiones entre diferentes Servidores MCP de la compaÃ±Ã­a:

*   âœ… **Correcto:** `inventory_query`, `shipment_track`, `auth_revoke_token`.
*   âŒ **Incorrecto:** `query`, `trackShipment` (No se recomienda CamelCase en prompts genÃ©ricos), `doIt`.

## Checklist de Servidor MCP Listo para ProducciÃ³n

Un Servidor MCP NO es apto para producciÃ³n si le falta:
- [ ] **AutenticaciÃ³n del Host:** ValidaciÃ³n estricta de transporte (vÃ­a Token o Cabecera SSE).
- [ ] **LimitaciÃ³n de Tasa (Rate Limiting):** ProtecciÃ³n contra un agente en bucle infinito que consuma la base de datos en segundos.
- [ ] **Log de AuditorÃ­a Centralizado:** Cada llamada a herramienta ejecutada debe reportar el ID de Agente, Herramienta invocada y Argumentos.
- [ ] **Manejo de Errores Seguro:** Si el backend falla, retornar un mensaje Ãºtil para la IA sin filtrar Stack Traces o secretos del servidor.

---
[? Volver al Índice](./README.es.md)
