# GuÃ­a del Cliente MCP: Consumo de MCP en Aplicaciones

## IntroducciÃ³n
Un **Cliente MCP** es el componente de software responsable de conectarse a uno o mÃºltiples Servidores MCP, orquestar sesiones, leer el catÃ¡logo de herramientas/recursos y exponerlos a la lÃ³gica de tu aplicaciÃ³n o a la ventana de contexto del LLM.

## Casos de Uso del Cliente
1.  **En el IDE (Uso Local):** Herramientas como Claude Desktop, Cursor o la CLI de Claude actÃºan como clientes nativos. Se configuran editando el archivo `mcp-config.json` del host.
2.  **En tu propio Backend (Uso ProgramÃ¡tico):** Tu aplicaciÃ³n NestJS o .NET actÃºa como un cliente que se conecta a Servidores MCP remotos expuestos por otros departamentos de la compaÃ±Ã­a.

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

## OrquestaciÃ³n con LLM
La forma canÃ³nica de usar un cliente MCP es tomando el array devuelto por `client.listTools()`, mapeÃ¡ndolo al formato JSON Schema aceptado por tu proveedor de LLM (OpenAI `tools`, Anthropic `tools`), e inyectÃ¡ndolo en la llamada al modelo. Cuando el modelo decide invocar una, tu cÃ³digo captura el nombre y los argumentos y ejecuta `client.callTool()`.

---
[? Volver al Índice](./README.es.md)
