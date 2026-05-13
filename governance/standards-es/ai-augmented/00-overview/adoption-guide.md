# GuÃ­a de AdopciÃ³n: Modelos de Arquitectura Aumentada por IA

Incorporar capacidades agÃ©nticas no debe ser un "Big Bang". Proponemos un modelo evolutivo de 3 niveles incrementales de madurez.

## Niveles de AdopciÃ³n

### ðŸŸ¢ Nivel 1 â€” IA Asistida (Desarrollo Asistido)
El equipo adopta la IA estrictamente como un acelerador en el proceso de construcciÃ³n de software. El producto final no sufre alteraciones lÃ³gicas.
*   **Impacto en Arquitectura:** Cero.
*   **CaracterÃ­sticas:** Uso de Claude Code, Copilot, o agentes de terminal. Mantienen un archivo `AGENTS.md` en el repositorio como harness mÃ­nimo.
*   **Enfoque:** Incrementar la experiencia del desarrollador (DX).

### ðŸŸ¢ Nivel 2 â€” IA Integrada (Funcional Integrada)
El producto incorpora la capacidad de consultar modelos de lenguaje para enriquecer funcionalidades especÃ­ficas y predecibles.
*   **Impacto en Arquitectura:** Medio (Invocaciones a servicios de inferencia externos).
*   **CaracterÃ­sticas:** Se implementan llamadas estructuradas a LLMs para clasificaciÃ³n de tickets, extracciÃ³n de datos estructurados, o auto-resÃºmenes. Uso de MCP para estandarizar cÃ³mo los agentes internos consumen datos corporativos.
*   **Enfoque:** AutomatizaciÃ³n de tareas cognitivas de bajo riesgo.

### ðŸ”µ Nivel 3 â€” IA Orquestada (OrquestaciÃ³n AutÃ³noma)
El producto es liderado por un ciclo agÃ©ntico dinÃ¡mico capaz de tomar decisiones y ejecutar planes multi-paso.
*   **Impacto en Arquitectura:** Alto (Frameworks agÃ©nticos y mÃ¡quinas de estado complejas).
*   **CaracterÃ­sticas:** Agentes autÃ³nomos utilizando un catÃ¡logo robusto de herramientas. Emplea patrones Multi-Agente, razonamiento recursivo y orquestadores deterministas con validaciones Human-in-the-Loop integradas.
*   **Enfoque:** AutonomÃ­a operativa supervisada.

---

## Criterios de Subida de Nivel

Para avanzar al siguiente nivel de madurez, el equipo de arquitectura del producto debe validar:

1.  **De L1 a L2**: 
    -   [ ] Cobertura de pruebas unitarias > 70% en el dominio afectado.
    -   [ ] DefiniciÃ³n clara del caso de uso (evitando el LLM como martillo para todo).
    -   [ ] EstimaciÃ³n inicial de tokens/costos registrada y validada.
2.  **De L2 a L3**:
    -   [ ] AuditorÃ­a/trazabilidad de logs de las llamadas al LLM implementada.
    -   [ ] Flujo funcional de Human-in-the-Loop para acciones destructivas o financieras.
    -   [ ] Definiciones de herramientas con un 90% de idempotencia comprobada.

## Checklist de Prerrequisitos Generales

Antes de iniciar cualquier iniciativa agÃ©ntica (incluso Nivel 1):
- [ ] Contar con un repositorio git con reglas de protecciÃ³n de rama.
- [ ] Automatizar linters y chequeos de tipos en el ciclo de CI.
- [ ] Tener permisos corporativos autorizados para el uso de modelos (DPA firmado).
- [ ] Crear el archivo de harness inicial `AGENTS.md` basado en el estÃ¡ndar corporativo.

---
[? Volver al Índice](./README.es.md)
