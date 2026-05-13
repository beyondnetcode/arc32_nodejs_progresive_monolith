# Principios de Diseño para Herramientas Inteligentes

## Contexto
Un LLM no ve el código; solo ve la documentación. Una herramienta exquisitamente escrita con metadatos mal descritos resulta en un agente inútil.

Seguir estos 5 principios maximiza la probabilidad de una llamada a herramienta exitosa en un 90%.

---

## 1. Determinismo Semántico (Nombres Claros)
El nombre de la herramienta debe ser altamente explícito y evitar jerga profesional no relacionada con la acción.
*   ❌ `do_work`
*   ❌ `process_data`
*   ✅ `calculate_shipping_tax`
*   ✅ `fetch_user_by_email`

## 2. El Principio de Hiper-Explicidad en las Descripciones
Una descripción no es para un humano, es para un motor de búsqueda de espacio vectorial.
*   ❌ `"Consulta productos."`
*   ✅ `"Recupera el catálogo detallado de productos activos. REQUERIDO cuando el usuario pregunta por disponibilidad, precios, o niveles de stock. NO usar esto para consultas de facturación."`

## 3. Esquemas Estrictos (Zod / JSON Schema)
Nunca defina un argumento como un simple `string`. Use `enums` y restricciones siempre que sea posible para restringir la "creatividad" del modelo.
*   **Argumento Vago:** `status: string`
*   **Argumento Estricto:** `status: "PENDING" | "SHIPPED" | "DELIVERED"`

## 4. Alta Idempotencia (Seguro de Reintentar)
Los agentes entran frecuentemente en bucles recursivos de reintento ante fallos. Si una herramienta falla a mitad del camino, ejecutarla de nuevo NO DEBE generar efectos secundarios duplicados (ej., cobrar a una tarjeta de crédito dos veces). Las herramientas deben aceptar una `idempotency_key` cuando sea relevante.

## 5. Manejo de Errores Semántico
Si la herramienta falla, retorne una explicación textual ayudando al modelo a entender cómo arreglar la llamada.
*   ❌ `HTTP 500 Internal Server Error` (El agente se rinde).
*   ✅ `{"error": "Formato Inválido", "details": "El código postal debe ser de 5 dígitos numéricos. Se encontró 'ABC4'. Por favor corrija y reintente."}` (El agente razona, reformula y llama de nuevo con éxito).
