# Plantilla de DocumentaciÃ³n de Herramienta

Cualquier herramienta personalizada expuesta al agente debe seguir este patrÃ³n de documentaciÃ³n interna canÃ³nico para habilitar una evaluaciÃ³n apropiada antes de pasar a producciÃ³n.

---

## [NOMBRE_SISTEMA_HERRAMIENTA]
*(Ej., `order_management_cancel_order`)*

### Intento y Racional
Explique brevemente **por quÃ©** existe esta herramienta y en quÃ© escenario el modelo debe invocarla.

### Firma y Argumentos
| Argumento | Tipo | Â¿Requerido? | DescripciÃ³n y Rango |
| :--- | :--- | :--- | :--- |
| `arg_uno` | `string` | SÃ­ | ExplicaciÃ³n del uso. |
| `arg_two` | `enum` | No | Conjunto de valores permitidos `[A, B, C]`. |

### Estrategia de VerificaciÃ³n Determinista
Â¿CÃ³mo se valida la integridad de la salida?
- [ ] Cobertura de pruebas unitarias (%)
- [ ] ValidaciÃ³n de Esquema JSON
- [ ] Aserciones de precondiciÃ³n (Ej., No se puede cancelar una orden ya entregada)

### Tabla de Efectos Secundarios
*   **Â¿Modifica Base de Datos?** [SÃ­/No]
*   **Â¿EnvÃ­a NotificaciÃ³n externa?** [SÃ­/No]
*   **Â¿Costo financiero por uso?** [Costo aproximado en cÃ³mputo/llamadas a API]

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

---
[? Volver al Índice](./README.es.md)
