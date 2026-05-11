# MCP Security: Permisos y Guardarraíles

La conexión directa de un motor de inferencia no-determinista (LLM) con tus APIs de backend presenta nuevos vectores de ataque. Un agente "convencido" mediante jailbreak puede intentar abusar de las tools que posee. Por ello, la seguridad en el harness MCP es no negociable.

## Modelo de Mínimo Privilegio
Aplica el principio de menor privilegio a nivel de Tooling:

*   **Separación por Rol:** Un agente encargado de reportes de BI NUNCA debe recibir acceso a un Servidor MCP que exponga tools de escritura (`DELETE`, `UPDATE`).
*   **Scopes Dinámicos:** El harness debe filtrar el catálogo de tools que inyecta al LLM basándose en la identidad del usuario final que está operando tras el agente.

## Guardarraíles Obligatorios para Producción

Para que un MCP Server sea aprobado por Seguridad Corporativa, debe implementar:

1.  **Autenticación Robusta:** 
    *   Si se usa HTTP/SSE, validación de tokens mTLS o tokens Bearer de corta duración (OAuth2).
    *   No depender de la seguridad por oscuridad de la red interna.
2.  **Auditoría Irrevocable (Audit Log):** 
    *   Cada llamada de tipo `CallTool` debe grabarse en una base de datos inmutable con: `timestamp`, `agente_id`, `usuario_humano_id`, `tool_name`, `input_arguments` y `hash_de_respuesta`.
3.  **Rate Limiting Adaptativo:**
    *   Limitar no solo peticiones/segundo, sino costo económico acumulado (ej: no más de $10 USD en llamadas a la API de geolocalización por agente por hora).
4.  **Sandbox de Ejecución:**
    *   Las tools que permitan ejecutar scripts, queries SQL raw, o comandos de sistema DEBEN ejecutarse en contenedores efímeros (Docker/gVisor) con acceso de red estrictamente bloqueado o whitelistado.

## La Gran Advertencia de Veracidad

> [!CAUTION]
> **El modelo no valida la verdad.** El LLM asume que CUALQUIER RESPUESTA que devuelve una herramienta es la verdad absoluta y construirá su razonamiento sobre ella. 
> Si un atacante compromete tu MCP Server para que retorne data falsa, engañará instantáneamente a tu Agente. La integridad de los datos de salida de tu tool es tan importante como la sanitización de los inputs.

## Aprobación Humana Obligatoria (Human-in-the-Loop)
Cualquier tool catalogada como **"Destructiva"** (Borrar base de datos, cancelar suscripción, ejecutar pago masivo) requiere que el harness intercepte la llamada, la ponga en estado `PENDIENTE_APROBACION` y espere a que un humano haga click en un botón físico antes de ejecutar el código en el backend.
