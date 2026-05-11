# Plantilla: Documentación de Tool Corporativa

Utilice esta plantilla para dar de alta cualquier nueva herramienta aprobada dentro del catálogo de herramientas de la Arquitectura Corporativa.

---

# Tool: {nombre_unico_en_snake_case}

## Metadata
- **Dominio:** [Inventario / Logística / Autenticación / Finanzas / Soporte]
- **Runtime Principal:** [Node.js / .NET / Python / MCP Server]
- **Estado de Gobernanza:** [En Evaluación / Aprobada / Deprecada]
- **Versión Actual:** X.Y.Z

## Descripción para el Modelo
> [!NOTE]
> Copie y pegue exactamente el string que se pasa al LLM en el campo description del tool call.

"ESTA HERRAMIENTA HACE [ACCIÓN] CUANDO [CONDICIÓN]. UTILÍZALA PARA [OBJETIVO]. NO LA UTILICES SI [RESTRICCIÓN]."

## Parámetros de Entrada
Definición JSON Schema o tabla de Zod/Type:

| Nombre | Tipo | Requerido | Descripción Detallada para el Modelo |
| :--- | :--- | :--- | :--- |
| `param1` | `string` | ✅ Sí | El identificador del recurso en formato UUID. |
| `param2` | `number` | ❌ No | Valor de ajuste opcional. Valor por defecto: 1.0. |

## Esquema de Respuesta (Salida)
Qué espera recibir el agente para continuar razonando.

| Campo | Tipo | Descripción del Valor |
| :--- | :--- | :--- |
| `status` | `string` | Estado de la operación (`SUCCESS`, `ERROR_RETRY`, `ERROR_FATAL`). |
| `data` | `object` | El payload de retorno necesario para la tarea. |

## Ejemplo Real de Uso

**Request de la IA:**
```json
{
  "tool_name": "nombre_tool",
  "arguments": { "param1": "valor" }
}
```

**Response del Backend:**
```json
{
  "status": "SUCCESS",
  "payload": { "result": "ok" }
}
```

## Permisos & Roles Requeridos
¿Qué identidades de agentes o APIs pueden invocar esta capacidad?
*   Rol: `agent-customer-support-write`
*   Sandbox activado: `Sí/No`

## Notas de Seguridad y Rate Limits
Efectos secundarios en sistemas externos, datos de PII que fluyen a través de la tool, límites de invocación por minuto, etc.
