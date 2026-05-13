# Guía del Cliente MCP: Consumo de MCP en Aplicaciones

## Introducción
Un **Cliente MCP** es el componente de software responsable de conectarse a uno o múltiples Servidores MCP, orquestar sesiones, leer el catálogo de herramientas/recursos y exponerlos a la lógica de tu aplicación o a la ventana de contexto del LLM.

## Casos de Uso del Cliente
1.  **En el IDE (Uso Local):** Herramientas como Claude Desktop, Cursor o la CLI de Claude actúan como clientes nativos. Se configuran editando el archivo `mcp-config.json` del host.
2.  **En tu propio Backend (Uso Programático):** Tu aplicación NestJS o .NET actúa como un cliente que se conecta a Servidores MCP remotos expuestos por otros departamentos de la compañía.

## Ejemplo de Consumo en Node.js (TypeScript)

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function runClient() {
  // Configurar el transporte a un Servidor Local
  const transport = new StdioClientTransport({
    command: "node",
    args: ["/ruta/al/mcp-server.js"]
  });

  const client = new Client({
    name: "mi-app-agente",
    version: "1.0.0"
  }, {
    capabilities: {}
  });

  // Conectar
  await client.connect(transport);

  // 1. Listar Herramientas Disponibles
  const tools = await client.listTools();
  console.log("Herramientas disponibles en este Servidor MCP:", tools);

  // 2. Ejecutar una Herramienta
  const result = await client.callTool({
    name: "inventory_query_stock",
    arguments: { sku: "ABC-123" }
  });

  console.log("Resultado de la Herramienta:", result);
}
```

## Orquestación con LLM
La forma canónica de usar un cliente MCP es tomando el array devuelto por `client.listTools()`, mapeándolo al formato JSON Schema aceptado por tu proveedor de LLM (OpenAI `tools`, Anthropic `tools`), e inyectándolo en la llamada al modelo. Cuando el modelo decide invocar una, tu código captura el nombre y los argumentos y ejecuta `client.callTool()`.
