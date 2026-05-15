# ADR-AI-003: Criterios de selección y gobernanza para modelos de lenguaje

* **Estado:** Propuesto
* **Fecha:** 2026-05-11

## Contexto
El uso no gobernado de modelos de lenguaje (LLMs) introduce riesgos sistémicos: fugas masivas de privacidad si se cargan datos a APIs públicas gratuitas, dependencia de un único proveedor que puede duplicar precios sin previo aviso, y uso indiscriminado de modelos costosos para tareas computacionalmente triviales.

## Decisión
Adoptar un modelo de gobernanza híbrido:
1. **OSS Autohospedado (Llama 3.x, etc.) como primera opción** para tareas internas que no requieran razonamiento crítico superior ni procesen PII pura.
2. **APIs Comerciales Federadas (AWS Bedrock, Azure AI) íNICAMENTE si existe un DPA firmado** que prohíba el reentrenamiento del modelo con nuestros datos.
3. Uso del **Catálogo de Modelos Oficial**, clasificando los modelos en Tiers (Large, Flash, Local) y asignándolos según la complejidad de la tarea para optimizar costos.

## Alternativas Consideradas
* **Libertad Total de Equipos:** Rechazada de plano por los auditores legales debido al riesgo irrecuperable de filtración de datos de clientes.
* **Proveedor Corporativo ínico (ej. Solo OpenAI):** Descartado para evitar Vendor Lock-In en caídas prolongadas de servicio; preferimos estrategia multi-cloud agnóstica vía adaptadores unificados.

## Consecuencias
* **Blindaje Legal:** Cumplimiento garantizado de regulaciones de privacidad.
* **Eficiencia Financiera:** Reducción del 30-40% en gasto de tokens al forzar el uso de modelos pequeños para tareas no críticas.
* **Mayor Latencia Inicial:** El bootstrapping de clusters de inferencia local para OSS requiere tiempo de configuración de infraestructura GPU inicial.

---
[Volver al Índice](./README.es.md)
