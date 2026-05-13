# Gobernanza de Modelos: DPA, Privacidad y Control de Costos

Operar con LLMs requiere proteger legalmente los activos de datos de la compaÃ±Ã­a y delimitar econÃ³micamente el gasto operativo.

## 1. Privacidad de Datos & DPA (Obligatorio)
NUNCA ingrese cÃ³digo fuente, PII confidencial, o datos financieros privados en niveles web "gratuitos" o "para consumidores" (ej., ChatGPT / Claude Web gratuito estÃ¡ndar sin inicio de sesiÃ³n Enterprise).

*   **PolÃ­tica:** SOLO consumimos APIs que declaren oficialmente cero retenciÃ³n para propÃ³sitos de entrenamiento bajo un DPA (Data Processing Agreement) Enterprise ejecutado.
*   **Enrutamiento Aprobado:** Todas las llamadas a modelos DEBEN atravesar gateways corporativos (ej., Azure OpenAI, AWS Bedrock, Vertex AI) que garanticen matemÃ¡ticamente que los datos permanecen dentro de la jurisdicciÃ³n de la VPC y no se utilizan para reentrenar globalmente los modelos base.

## 2. Cuotas de Tokens & GestiÃ³n de Presupuesto
Un bucle agÃ©ntico no monitoreado puede consumir cientos de dÃ³lares en minutos si entra en un bucle recursivo infinito.

*   **Pasos MÃ¡ximos:** Todos los bucles de agentes deben poseer un lÃ­mite inquebrantable (hard cap) de iteraciones recursivas (Recomendado: `max_iterations = 10`).
*   **Interruptor de Circuito de Presupuesto:** Implementar una ventana deslizante de consumo a nivel de envoltura HTTP. Si el costo agregado de un flujo de ejecuciÃ³n cruza el `LIMIT_USD` (configurable por entorno), el wrapper lanza instantÃ¡neamente un error `402 Payment Required / Quota Exceeded`, desconectando al agente.

## 3. MitigaciÃ³n de Bloqueo de Proveedor (Vendor Lock-in)
El panorama de los LLMs cambia cada 3 meses. Atar todo nuestro backend explÃ­citamente al SDK propietario de un Ãºnico proveedor representa un alto riesgo sistÃ©mico.

*   **PolÃ­tica de EstandarizaciÃ³n:** Usar conectores uniformes como el **formato SDK de OpenAI** (aceptado como estÃ¡ndar de facto por mÃºltiples proveedores alternativos) u orquestadores como **LiteLLM** / **Vercel AI SDK** para desacoplar la interfaz de la implementaciÃ³n subyacente.
*   Cambiar de `modelo-A` a `modelo-B` idealmente solo deberÃ­a requerir el cambio de una variable de entorno (`LLM_MODEL_ID`).

---
[? Volver al Índice](./README.es.md)
