# ADR-AI-003: Criterios de selección y gobernanza de modelos de lenguaje

*   **Estatus:** Proposed
*   **Fecha:** 2026-05-11

## Contexto
El uso no gobernado de modelos de lenguaje (LLMs) introduce riesgos sistémicos: fugas masivas de privacidad si se suben datos a APIs públicas gratuitas, dependencia de un solo vendor que puede duplicar precios sin aviso, y uso indiscriminado de modelos caros para tareas computacionalmente triviales.

## Decisión
Adoptar un modelo de gobierno híbrido:
1.  **OSS Self-Hosted (Llama 3.x, etc.) como primera opción** para tareas internas que no requieran razonamiento crítico superior o traten con PII cruda.
2.  **APIs Comerciales Federadas (AWS Bedrock, Azure AI) ÚNICAMENTE si hay un DPA firmado** que prohíba el entrenamiento del modelo con nuestros datos.
3.  Uso del **Catálogo Oficial de Modelos**, que clasifica los modelos en Tiers (Large, Flash, Local) asignándolos según la complejidad de la tarea para optimizar costes.

## Alternativas Consideradas
*   **Libertad Total por Equipo:** Rechazado rotundamente por los auditores legales debido al riesgo insalvable de fugas de datos de clientes.
*   **Proveedor Único Corporativo (Ej: Solo OpenAI):** Descartado para evitar el Vendor Lock-In ante caídas de servicio prolongadas; preferimos una estrategia multi-cloud agnóstica a través de adaptadores unificados.

## Consecuencias
*   ✅ **Blindaje Legal:** Garantía de cumplimiento con regulaciones de privacidad.
*   ✅ **Eficiencia Financiera:** Reducción del 30-40% en gastos de tokens al forzar el uso de modelos pequeños para tareas no-críticas.
*   ❌ **Mayor latencia inicial:** La puesta en marcha de clusters de inferencia locales para OSS requiere tiempo e infraestructura de GPU inicial.
