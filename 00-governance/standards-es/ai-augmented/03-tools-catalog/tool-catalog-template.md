# Plantilla de Documentación de Herramienta

Cualquier herramienta personalizada expuesta al agente debe seguir este patrón de documentación interna canónico para habilitar una evaluación apropiada antes de pasar a producción.

---

## [NOMBRE_SISTEMA_HERRAMIENTA]
*(Ej., `order_management_cancel_order`)*

### Intento y Racional
Explique brevemente **por qué** existe esta herramienta y en qué escenario el modelo debe invocarla.

### Firma y Argumentos
| Argumento | Tipo | ¿Requerido? | Descripción y Rango |
| :--- | :--- | :--- | :--- |
| `arg_uno` | `string` | Sí | Explicación del uso. |
| `arg_two` | `enum` | No | Conjunto de valores permitidos `[A, B, C]`. |

### Estrategia de Verificación Determinista
¿Cómo se valida la integridad de la salida?
- [ ] Cobertura de pruebas unitarias (%)
- [ ] Validación de Esquema JSON
- [ ] Aserciones de precondición (Ej., No se puede cancelar una orden ya entregada)

### Tabla de Efectos Secundarios
*   **¿Modifica Base de Datos?** [Sí/No]
*   **¿Envía Notificación externa?** [Sí/No]
*   **¿Costo financiero por uso?** [Costo aproximado en cómputo/llamadas a API]

### Ejemplo de Uso para el Modelo
```json
{
  "name": "order_management_cancel_order",
  "arguments": {
    "orderId": "TX-9812",
    "reason": "CUSTOMER_REQUEST"
  }
}
```
