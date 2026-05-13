# Referencia del Harness: La Armadura del Agente

## DefiniciÃ³n Formal de Harness
En esta arquitectura corporativa, definimos el **Harness** (ArnÃ©s) como la infraestructura tÃ©cnica determinista que envuelve a un modelo probabilÃ­stico. Su objetivo es restringir, potenciar y validar las capacidades de razonamiento del LLM, convirtiÃ©ndolo en un agente capaz de operar de forma segura en entornos productivos.

No es el "cerebro" (ese es el modelo); es el "sistema nervioso y el exoesqueleto".

## Capas de un Harness Corporativo

```mermaid
graph TD
    A[Usuario / Disparador] --> B[Capa 1: Prompt de Sistema & Identidad]
    B --> C[Capa 2: SelecciÃ³n del Modelo]
    C <--> D[Capa 3: InyecciÃ³n de Contexto / RAG / MCP]
    C <--> E[Capa 4: CatÃ¡logo de Herramientas]
    E --> F{Capa 5: Permisos & Sandbox}
    F -- Aprobado --> G[EjecuciÃ³n Determinista]
    G --> H[Capa 6: Capas de VerificaciÃ³n / Hooks]
    H --> C
```

## Los Cuatro Pilares de un Harness Robusto

### 1. DocumentaciÃ³n como CÃ³digo (AGENTS.md)
Un agente es un "usuario nuevo" permanente. No asume nada. El primer paso del harness es inyectarle la verdad fundacional del proyecto: comandos de construcciÃ³n, tecnologÃ­as, reglas de estilo y dependencias, centralizadas en el archivo estandarizado `AGENTS.md`.

### 2. Restricciones ArquitectÃ³nicas
Establecer lÃ­mites legibles por mÃ¡quina. En lugar de rogarle al agente que no use una librerÃ­a obsoleta, el harness debe configurar herramientas que prevengan importaciones no autorizadas o usar linters estrictos que fallen si el agente intenta romper los lÃ­mites hexagonales (`eslint-plugin-boundaries`).

### 3. VerificaciÃ³n por Capas
Confiar ciegamente en la salida del LLM es inaceptable. El harness debe implementar un ciclo automatizado de "Red, Green, Refactor":
*   **Hook Post-Herramienta:** Inmediatamente despuÃ©s de una ediciÃ³n, ejecutar el linter.
*   **Pre-commit:** Ejecutar pruebas unitarias para el Ã¡rea modificada.
*   **CI:** Suite de pruebas de regresiÃ³n completa.

### 4. RecolecciÃ³n de Basura (Garbage Collection)
Los agentes pueden generar silenciosamente deuda tÃ©cnica, redundancia o archivos fantasma. Un harness avanzado orquesta "agentes limpiadores" periÃ³dicos (Linter Agents) cuya Ãºnica misiÃ³n es patrullar el cÃ³digo buscando inconsistencias estilÃ­sticas e incongruencias de contexto introducidas por pasadas previas de IA.

---

## Ciclo AgÃ©ntico Base (PseudocÃ³digo)

El motor de ejecuciÃ³n del harness sigue este patrÃ³n de control:

```python
messages = [system_prompt, user_input]

while True:
    # 1. Inferencia del modelo
    response = call_model(messages)
    
    # 2. DetecciÃ³n de llamadas a herramientas
    tool_requests = extract_tool_calls(response)
    
    # Si el modelo no desea usar mÃ¡s herramientas, el ciclo termina.
    if not tool_requests: 
        return response
    
    # 3. EjecuciÃ³n secuencial o paralela de herramientas autorizadas
    for request in tool_requests:
        if check_permissions(request.name):
            result = execute_tool(request.name, request.args)
            
            # Hook de validaciÃ³n inmediata (determinista)
            validated_result = run_post_tool_hooks(request.name, result)
            
            messages.append({
                "role": "tool", 
                "tool_call_id": request.id, 
                "content": validated_result
            })
        else:
            messages.append({
                "role": "tool", 
                "tool_call_id": request.id, 
                "content": "ERROR: Permiso denegado para ejecutar esta herramienta."
            })
```

> [!WARNING]
> **Advertencia sobre la ManipulaciÃ³n del Harness:** El modelo no tiene visibilidad del cÃ³digo fuente de una herramienta a menos que se le provea especÃ­ficamente. Solo entiende la **DescripciÃ³n (Metadatos)** de la misma. Descripciones ambiguas generan alucinaciones de uso catastrÃ³ficas.

---
[? Volver al Índice](./README.es.md)
