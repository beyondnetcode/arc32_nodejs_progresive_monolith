# MCP Server Guide: Exponiendo Capacidades Corporativas

## ¿Cuándo construir un MCP Server?
Se debe construir un MCP Server corporativo cuando necesitemos exponer capacidades de negocio específicas de nuestros servicios del backend hacia ecosistemas agénticos (ya sea para acelerar el desarrollo interno o potenciar una feature de cara al cliente), garantizando que la misma interfaz sirva para múltiples herramientas IA simultáneamente.

---

## Estructura Base en Node.js (TypeScript)

Usando el SDK oficial de `@modelcontextprotocol/sdk`:

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

// 1. Instanciar el Servidor
const server = new Server({
  name: "corporate-inventory-server",
  version: "1.0.0",
}, {
  capabilities: {
    tools: {}, // Exponemos capacidades de escritura/acción
  },
});

// 2. Registrar el Catálogo de Herramientas (ListTools)
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "inventory_query_stock",
        description: "Consulta el stock disponible de un SKU específico en un almacén concreto.",
        inputSchema: {
          type: "object",
          properties: {
            sku: { type: "string", description: "El identificador único del producto" },
            warehouseId: { type: "string", description: "ID del almacén" }
          },
          required: ["sku"],
        },
      },
    ],
  };
});

// 3. Resolver la ejecución de la herramienta (CallTool)
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "inventory_query_stock") {
    const { sku } = request.params.arguments as { sku: string };
    // Llamada interna a tu servicio de dominio o repositorio
    const stock = await fetchStockFromDatabase(sku); 
    return {
      content: [{ type: "text", text: JSON.stringify({ sku, availableStock: stock }) }],
    };
  }
  throw new Error("Tool not found");
});

// 4. Arrancar el transporte (Usualmente stdio para uso local o CI)
const transport = new StdioServerTransport();
await server.connect(transport);
```

---

## Estructura Equivalente en .NET (C#)

Empleando el soporte MCP incrustado en Semantic Kernel o el SDK oficial de .NET:

```csharp
using Microsoft.ModelContextProtocol;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddMCPServer("corporate-inventory-server")
    .AddTool("inventory_query_stock", "Consulta el stock disponible de un SKU específico", async (string sku) => 
    {
         var stock = await myInventoryService.GetStockAsync(sku);
         return new ToolResult { Content = stock.ToString() };
    });

var app = builder.Build();
app.UseMCPServer(); // Exponer vía SSE (Server-Sent Events) por HTTP
app.Run();
```

---

## Convenciones de Naming Corporativas

Adoptamos la notación **`Snake_Case`** separada por dominio jerárquico para evitar colisiones entre diferentes MCP Servers de la compañía:

*   ✅ **Correcto:** `inventory_query`, `shipment_track`, `auth_revoke_token`.
*   ❌ **Incorrecto:** `query`, `trackShipment` (CamelCase no recomendado en prompts genéricos), `doIt`.

## Checklist MCP Server "Production Ready"

Un MCP Server NO es apto para producción si no cumple con:
- [ ] **Autenticación del Host:** Validación estricta de quién invoca al transport (vía Token o Header en SSE).
- [ ] **Rate Limiting:** Protección ante un agente en bucle infinito que consuma tu base de datos en segundos.
- [ ] **Log de Auditoría Centralizado:** Cada tool call ejecutada debe reportar ID de Agente, Tool invocada y Argumentos.
- [ ] **Manejo de Errores Seguro:** Si falla el backend, retornar un mensaje útil para la IA sin filtrar Stack Traces o secretos sensibles del servidor.
