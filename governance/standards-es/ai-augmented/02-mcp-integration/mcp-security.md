# Seguridad en MCP: Permisos y Guardrails

Conectar un motor de inferencia no determinista (LLM) directamente con tus APIs de backend introduce nuevos vectores de ataque. Un agente "convencido" vÃ­a jailbreak puede intentar abusar de sus herramientas. Por lo tanto, la seguridad en el harness MCP no es negociable.

## Modelo de MÃ­nimo Privilegio
Aplicar el principio de menor privilegio a nivel de Herramientas:

*   **SeparaciÃ³n por Rol:** Un agente de reportes de BI NUNCA debe recibir acceso a un Servidor MCP que exponga herramientas de escritura (`DELETE`, `UPDATE`).
*   **Alcances DinÃ¡micos:** El harness debe filtrar el catÃ¡logo de herramientas inyectado en el LLM basÃ¡ndose en la identidad del usuario final que estÃ¡ operando a travÃ©s del agente.

## Guardrails Obligatorios para ProducciÃ³n

Para que un Servidor MCP sea aprobado por Seguridad Corporativa, debe implementar:

1.  **AutenticaciÃ³n Robusta:** 
    *   Si se usa HTTP/SSE, validaciÃ³n de tokens mTLS o tokens Bearer de corta duraciÃ³n (OAuth2).
    *   No confiar en la seguridad por oscuridad dentro de la red interna.
2.  **Log de AuditorÃ­a Irrevocable:** 
    *   Cada peticiÃ³n `CallTool` debe registrarse en una base de datos inmutable con: `timestamp`, `agent_id`, `human_user_id`, `tool_name`, `input_arguments` y `response_hash`.
3.  **LimitaciÃ³n de Tasa Adaptativa (Rate Limiting):**
    *   Limitar no solo peticiones/segundo, sino el costo financiero acumulado (ej., no mÃ¡s de $10 USD en llamadas a APIs geolocalizadas por agente por hora).
4.  **Sandbox de EjecuciÃ³n:**
    *   Las herramientas que permitan la ejecuciÃ³n de scripts, queries SQL en bruto o comandos del sistema DEBEN correr en contenedores efÃ­meros (Docker/gVisor) con acceso de red estrictamente bloqueado o con lista blanca (whitelisted).

## La Gran Advertencia de Veracidad

> [!CAUTION]
> **El modelo no valida la verdad.** El LLM asume que CUALQUIER RESPUESTA devuelta por una herramienta es la verdad absoluta y construirÃ¡ su razonamiento sobre ella.
> Si un atacante compromete tu Servidor MCP para que devuelva datos falsos, engaÃ±arÃ¡ instantÃ¡neamente a tu Agente. La integridad de los datos de salida de la herramienta es tan importante como la sanitizaciÃ³n de la entrada.

## Human-in-the-Loop Obligatorio
Cualquier herramienta categorizada como **"Destructiva"** (Borrar base de datos, cancelar suscripciÃ³n masiva, ejecutar pago por lote) requiere que el harness intercepte la llamada, establezca el estado en `PENDING_APPROVAL` (Pendiente de AprobaciÃ³n) y espere a que un humano haga clic fÃ­sicamente en un botÃ³n antes de ejecutar el cÃ³digo del backend.

---
[? Volver al Índice](./README.es.md)
