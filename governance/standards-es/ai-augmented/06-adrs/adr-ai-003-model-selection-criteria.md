# ADR-AI-003: Criterios de selecciÃ³n y gobernanza para modelos de lenguaje

*   **Estado:** Propuesto
*   **Fecha:** 2026-05-11

## Contexto
El uso no gobernado de modelos de lenguaje (LLMs) introduce riesgos sistÃ©micos: fugas masivas de privacidad si se cargan datos a APIs pÃºblicas gratuitas, dependencia de un Ãºnico proveedor que puede duplicar precios sin previo aviso, y uso indiscriminado de modelos costosos para tareas computacionalmente triviales.

## DecisiÃ³n
Adoptar un modelo de gobernanza hÃ­brido:
1.  **OSS Autohospedado (Llama 3.x, etc.) como primera opciÃ³n** para tareas internas que no requieran razonamiento crÃ­tico superior ni procesen PII pura.
2.  **APIs Comerciales Federadas (AWS Bedrock, Azure AI) ÃšNICAMENTE si existe un DPA firmado** que prohÃ­ba el reentrenamiento del modelo con nuestros datos.
3.  Uso del **CatÃ¡logo de Modelos Oficial**, clasificando los modelos en Tiers (Large, Flash, Local) y asignÃ¡ndolos segÃºn la complejidad de la tarea para optimizar costos.

## Alternativas Consideradas
*   **Libertad Total de Equipos:** Rechazada de plano por los auditores legales debido al riesgo irrecuperable de filtraciÃ³n de datos de clientes.
*   **Proveedor Corporativo Ãšnico (ej. Solo OpenAI):** Descartado para evitar Vendor Lock-In en caÃ­das prolongadas de servicio; preferimos estrategia multi-cloud agnÃ³stica vÃ­a adaptadores unificados.

## Consecuencias
*   âœ… **Blindaje Legal:** Cumplimiento garantizado de regulaciones de privacidad.
*   âœ… **Eficiencia Financiera:** ReducciÃ³n del 30-40% en gasto de tokens al forzar el uso de modelos pequeÃ±os para tareas no crÃ­ticas.
*   âŒ **Mayor Latencia Inicial:** El bootstrapping de clusters de inferencia local para OSS requiere tiempo de configuraciÃ³n de infraestructura GPU inicial.

---
[? Volver al Índice](./README.es.md)
