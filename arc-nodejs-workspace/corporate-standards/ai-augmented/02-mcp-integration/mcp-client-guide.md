# MCP Client Guide: Consumiendo MCP en Aplicaciones

## Introducción
Un **Cliente MCP** es la pieza de software responsable de conectarse a uno o varios Servidores MCP, orquestar las sesiones, leer el catálogo de tools/resources y exponerlos a la lógica de tu aplicación o a la ventana de contexto de tu LLM.

## Casos de Uso de un Cliente
1.  **En el IDE (Uso Local):** Herramientas como Claude Desktop, Cursor o la CLI de Claude actúan como clientes nativos. Se configuran editando el archivo `mcp-config.json` del host.
2.  **En tu propio Backend (Uso Programático):** Tu aplicación NestJS o .NET actúa como cliente para conectarse a MCP Servers remotos expuestos por otros departamentos de la empresa.

## Ejemplo de Consumo en Node.js (TypeScript)

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function runClient() {
  // Configurar transporte hacia un Servidor Local
  const transport = new StdioClientTransport({
    command: "node",
    args: ["/ruta/al/mcp-server.js"]
  });

  const client = new Client({
    name: "mi-agente-aplicacion",
    version: "1.0.0"
  }, {
    capabilities: {}
  });

  // Conectar
  await client.connect(transport);

  // 1. Listar Herramientas Disponibles
  const tools = await client.listTools();
  console.log("Tools disponibles en este MCP Server:", tools);

  // 2. Ejecutar una Herramienta
  const result = await client.callTool({
    name: "inventory_query_stock",
    arguments: { sku: "ABC-123" }
  });

  console.log("Resultado de la Tool:", result);
}
```

## Orquestación con LLMs
La forma canónica de usar un cliente MCP es tomar el array retornado por `client.listTools()`, mapearlo al formato JSON Schema que acepte tu proveedor de LLM (OpenAI `tools`, Anthropic `tools`) e inyectarlo en la llamada del modelo. Cuando el modelo decida invocarla, tu código captura el nombre y argumentos y ejecuta `client.callTool()`.
