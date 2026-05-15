# Gobernanza de Modelos: DPA, Privacidad y Control de Costos

Operar con LLMs requiere proteger legalmente los activos de datos de la compañía y delimitar económicamente el gasto operativo.

## 1. Privacidad de Datos & DPA (Obligatorio)
NUNCA ingrese código fuente, PII confidencial, o datos financieros privados en niveles web "gratuitos" o "para consumidores" (ej., ChatGPT / Claude Web gratuito estándar sin inicio de sesión Enterprise).

* **Política:** SOLO consumimos APIs que declaren oficialmente cero retención para propósitos de entrenamiento bajo un DPA (Data Processing Agreement) Enterprise ejecutado.
* **Enrutamiento Aprobado:** Todas las llamadas a modelos DEBEN atravesar gateways corporativos (ej., Azure OpenAI, AWS Bedrock, Vertex AI) que garanticen matemáticamente que los datos permanecen dentro de la jurisdicción de la VPC y no se utilizan para reentrenar globalmente los modelos base.

## 2. Cuotas de Tokens & Gestión de Presupuesto
Un bucle agéntico no monitoreado puede consumir cientos de dólares en minutos si entra en un bucle recursivo infinito.

* **Pasos Máximos:** Todos los bucles de agentes deben poseer un límite inquebrantable (hard cap) de iteraciones recursivas (Recomendado: `max_iterations = 10`).
* **Interruptor de Circuito de Presupuesto:** Implementar una ventana deslizante de consumo a nivel de envoltura HTTP. Si el costo agregado de un flujo de ejecución cruza el `LIMIT_USD` (configurable por entorno), el wrapper lanza instantáneamente un error `402 Payment Required / Quota Exceeded`, desconectando al agente.

## 3. Mitigación de Bloqueo de Proveedor (Vendor Lock-in)
El panorama de los LLMs cambia cada 3 meses. Atar todo nuestro backend explícitamente al SDK propietario de un único proveedor representa un alto riesgo sistémico.

* **Política de Estandarización:** Usar conectores uniformes como el **formato SDK de OpenAI** (aceptado como estándar de facto por múltiples proveedores alternativos) u orquestadores como **LiteLLM** / **Vercel AI SDK** para desacoplar la interfaz de la implementación subyacente.
* Cambiar de `modelo-A` a `modelo-B` idealmente solo debería requerir el cambio de una variable de entorno (`LLM_MODEL_ID`).

---
[Volver al Índice](./README.es.md)
