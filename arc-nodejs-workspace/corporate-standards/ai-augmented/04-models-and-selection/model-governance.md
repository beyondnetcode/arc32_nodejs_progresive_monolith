# Model Governance: Políticas, Costos y Privacidad

El uso caótico de modelos de lenguaje crea fugas de datos, dispara la facturación en la nube y genera dependencias críticas de vendedores monopólicos. Esta sección define las leyes irrompibles de gobernanza de modelos en la compañía.

## 🛑 Política de Protección de Datos (PII y Secretos)
1.  **Ningún modelo** puede procesar datos PII de clientes (Emails, Nombres, Tarjetas), secretos industriales o código privado sin la existencia de un **Contrato DPA (Data Processing Agreement)** activo firmado entre el área legal y el proveedor del modelo (OpenAI Enterprise, Anthropic Console, AWS Bedrock, Azure AI).
2.  Prohibido el uso de cuentas gratuitas tipo "ChatGPT Free" o herramientas web públicas para subir fragmentos de código del repositorio corporativo.

## 📊 Monitoreo de Costos
*   Cada microservicio o producto que consuma LLMs debe inyectar un `X-Project-ID` o `ClientTag` en sus cabeceras API para permitir el **Showback/Chargeback de Costos Mensuales** al departamento correspondiente.
*   Se prohíbe el uso de ciclos agénticos recursivos (Infinite Loops) sin un límite estricto de ejecución (`MaxRecursionStep = 10`). Si el agente no resuelve en N pasos, debe fallar determinísticamente.

## ✅ Catálogo de Modelos Aprobados (Por Defecto)

Adoptamos una estrategia **OSS-First / Hosted-Second**:

*   **Tier 1: Self-Hosted (Seguridad Máxima)**
    *   Llama 3.x (Meta) desplegado en clusters propios (vLLM / Ollama).
    *   Qwen 2 o Mistral para razonamientos ligeros.
*   **Tier 2: APIs Comerciales Federadas (Máximo Poder)**
    *   **Claude 3.5 Sonnet** (Anthropic) vía AWS Bedrock / GCP Vertex.
    *   **GPT-4o** (OpenAI) vía Azure OpenAI Service.
    *   **Gemini 1.5 Pro** (Google) vía Vertex AI.

## 🔄 Proceso de Aprobación de Nuevos Modelos
Para introducir una nueva versión de modelo en producción:
1.  **Propuesta:** El equipo presenta el caso de uso y por qué los modelos existentes no son suficientes.
2.  **Evaluación Benchmark:** Se ejecuta un benchmark con 100 prompts del dominio real y se mide el delta de coste/rendimiento.
3.  **ADR Submission:** Creación de un Architectural Decision Record autorizando la inclusión del modelo en el catálogo corporativo.
4.  **Aprobación:** Visto bueno del Arquitecto Líder de IA y del CISO (Oficial de Seguridad de la Información).
