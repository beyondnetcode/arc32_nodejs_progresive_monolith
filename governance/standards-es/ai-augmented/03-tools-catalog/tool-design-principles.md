# Principios de DiseÃ±o para Herramientas Inteligentes

## Contexto
Un LLM no ve el cÃ³digo; solo ve la documentaciÃ³n. Una herramienta exquisitamente escrita con metadatos mal descritos resulta en un agente inÃºtil.

Seguir estos 5 principios maximiza la probabilidad de una llamada a herramienta exitosa en un 90%.

---

## 1. Determinismo SemÃ¡ntico (Nombres Claros)
El nombre de la herramienta debe ser altamente explÃ­cito y evitar jerga profesional no relacionada con la acciÃ³n.
*   âŒ `do_work`
*   âŒ `process_data`
*   âœ… `calculate_shipping_tax`
*   âœ… `fetch_user_by_email`

## 2. El Principio de Hiper-Explicidad en las Descripciones
Una descripciÃ³n no es para un humano, es para un motor de bÃºsqueda de espacio vectorial.
*   âŒ `"Consulta productos."`
*   âœ… `"Recupera el catÃ¡logo detallado de productos activos. REQUERIDO cuando el usuario pregunta por disponibilidad, precios, o niveles de stock. NO usar esto para consultas de facturaciÃ³n."`

## 3. Esquemas Estrictos (Zod / JSON Schema)
Nunca defina un argumento como un simple `string`. Use `enTODO` y restricciones siempre que sea posible para restringir la "creatividad" del modelo.
*   **Argumento Vago:** `status: string`
*   **Argumento Estricto:** `status: "PENDING" | "SHIPPED" | "DELIVERED"`

## 4. Alta Idempotencia (Seguro de Reintentar)
Los agentes entran frecuentemente en bucles recursivos de reintento ante fallos. Si una herramienta falla a mitad del camino, ejecutarla de nuevo NO DEBE generar efectos secundarios duplicados (ej., cobrar a una tarjeta de crÃ©dito dos veces). Las herramientas deben aceptar una `idempotency_key` cuando sea relevante.

## 5. Manejo de Errores SemÃ¡ntico
Si la herramienta falla, retorne una explicaciÃ³n textual ayudando al modelo a entender cÃ³mo arreglar la llamada.
*   âŒ `HTTP 500 Internal Server Error` (El agente se rinde).
*   âœ… `{"error": "Formato InvÃ¡lido", "details": "El cÃ³digo postal debe ser de 5 dÃ­gitos numÃ©ricos. Se encontrÃ³ 'ABC4'. Por favor corrija y reintente."}` (El agente razona, reformula y llama de nuevo con Ã©xito).

---
[? Volver al Índice](./README.es.md)
