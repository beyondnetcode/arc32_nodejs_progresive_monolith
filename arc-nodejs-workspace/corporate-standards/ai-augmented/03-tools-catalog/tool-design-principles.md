# Tool Design Principles: Creando APIs para Inteligencia Artificial

Construir herramientas para agentes IA no es idéntico a construir APIs para desarrolladores humanos. Los humanos leen documentación externa; los agentes solo "leen" el esquema JSON y la descripción que les pasas en tiempo de ejecución.

## Los 5 Principios de Diseño Corporativo

### 1. Nombre Inequívoco y Ultra-Claro
El modelo utiliza el nombre de la herramienta para filtrar rápidamente en su matriz de atención inicial. Evita nombres internos difusos.
*   ❌ Malo: `execute_action_v2`, `process_data`, `run_job`.
*   ✅ Bueno: `cancel_subscription_by_email`, `search_product_by_sku`, `calculate_tax_for_invoice`.

### 2. Responsabilidad Única (Single Responsibility)
No intentes hacer una "Mega-Tool" genérica que haga 10 cosas pasando un flag. Los modelos se confunden con argumentos condicionales complejos.
*   ❌ Malo: Una tool `manage_inventory(action: 'delete'|'add'|'check')`.
*   ✅ Bueno: Tres tools separadas: `inventory_query`, `inventory_add`, `inventory_delete`.

### 3. Salida Predictiva y Autosuficiente
El modelo debe ser capaz de entender el resultado de la herramienta sin tener que adivinar.
*   Incluye siempre un campo de `status` legible (`SUCCESS`, `FAILED`, `UNAUTHORIZED`).
*   Si hay un error, el mensaje no debe ser un stack trace técnico, sino una explicación útil que el agente pueda usar para re-intentar (ej: *"Error: El SKU proporcionado tiene 8 dígitos, pero el sistema requiere 10. Añade dos ceros al inicio y re-intenta"*).

### 4. Idempotencia Mandatoria
Los agentes sufren loops de repetición ante una alta latencia de red. Pueden invocar la misma herramienta dos veces asumiendo que la primera falló.
*   Toda herramienta de escritura (`POST`, `DELETE`) debe incluir una clave de idempotencia o una validación interna que impida efectos colaterales duplicados si el agente re-envía el mismo payload en menos de 5 minutos.

### 5. Descripción Escrita para el Modelo, NO para el Humano
La descripción es el **Prompt de Selección**. No expliques quién la programó o en qué sprint. Di EXACTAMENTE cuándo usarla y, lo más importante, cuándo NO usarla.
*   *Ejemplo:* "Utiliza esta herramienta para obtener el listado de precios de mayoreo. NO LA USES si el cliente es un consumidor final (Retail); para ese caso usa `fetch_retail_prices`."

---

## La Lección de la Sobrecarga de Herramientas
Datos obtenidos de la telemetría de frameworks líderes (como Vercel AI) demuestran que **inyectar demasiadas tools reduce drásticamente la tasa de éxito de la tarea**. 

> **Regla de Oro:** Es preferible dar 5 herramientas perfectas y específicas a un agente que darle un "pasillo libre" a 100 APIs genéricas del backend. El 80% del ruido desaparece y la inteligencia emerge.

## Comparativa: Mala vs Buena Documentación de Tool

| Aspecto | Mala Práctica ❌ | Buena Práctica ✅ |
| :--- | :--- | :--- |
| **Nombre** | `updateDB` | `update_user_shipping_address` |
| **Descripción** | "Actualiza la fila en la tabla usuarios" | "Permite modificar la dirección física de entrega para futuros pedidos. Requiere el ID de usuario y una dirección validada por Google Maps." |
| **Argumentos** | `data: string` | `zipCode: string (pattern \d{5})`, `streetName: string` |
| **Respuesta** | `{"ok": true}` | `{"status": "UPDATED", "new_eta_delivery": "3 days"}` |
