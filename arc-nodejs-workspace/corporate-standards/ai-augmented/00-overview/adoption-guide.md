# Guía de Adopción: Modelos de IA Aumentada

La incorporación de capacidades agénticas no debe ser un "Big Bang". Proponemos un modelo evolutivo de 3 niveles de madurez creciente.

## Niveles de Adopción

### 🟢 Nivel 1 — AI-Assisted (Asistido en Desarrollo)
El equipo adopta la IA estrictamente como acelerador en el proceso de construcción de software. El producto final no sufre alteraciones lógicas.
*   **Impacto en Arquitectura:** Cero.
*   **Características:** Uso de Claude Code, Copilot o agentes de terminal. Mantienen un archivo `AGENTS.md` en el repositorio como harness mínimo.
*   **Foco:** Aumentar el developer experience (DX).

### 🟡 Nivel 2 — AI-Integrated (Integrado en Funcionalidad)
El producto incorpora la capacidad de consultar modelos de lenguaje para enriquecer funcionalidades específicas y predecibles.
*   **Impacto en Arquitectura:** Medio (Invocación a servicios externos de inferencia).
*   **Características:** Se implementan llamadas estructuradas a LLMs para clasificación de tickets, extracción de datos estructurados o resúmenes automáticos. Uso de MCP para estandarizar cómo los agentes internos consumen datos corporativos.
*   **Foco:** Automatización de tareas cognitivas de bajo riesgo.

### 🔴 Nivel 3 — AI-Orchestrated (Orquestación Autónoma)
El producto es liderado por un ciclo agéntico dinámico capaz de tomar decisiones y ejecutar planes multi-paso.
*   **Impacto en Arquitectura:** Alto (Frameworks agénticos y state machines complejas).
*   **Características:** Agentes autónomos que utilizan un catálogo de tools robusto. Emplean patrones Multi-Agent, razonamiento recursivo y orquestadores deterministas con validaciones Human-in-the-Loop integradas.
*   **Foco:** Autonomía operativa supervisada.

---

## Criterios de Salto de Nivel

Para avanzar al siguiente nivel de madurez, el equipo de arquitectura de producto debe validar:

1.  **De L1 a L2**: 
    -   ✅ Cobertura de tests unitarios > 70% en el dominio afectado.
    -   ✅ Definición clara del caso de uso (evitar LLM como martillo para todo).
    -   ✅ Registro y validación de tokens/costes estimado inicial.
2.  **De L2 a L3**:
    -   ✅ Auditoría de logs/trazabilidad de llamadas LLM implementada.
    -   ✅ Flujo Human-in-the-Loop funcional para acciones destructivas o financieras.
    -   ✅ Definición de tools con idempotencia demostrada en un 90%.

## Checklist de Prerrequisitos Generales

Antes de iniciar cualquier iniciativa agéntica (incluso Nivel 1):
- [ ] Contar con un repositorio git con branch protection rules.
- [ ] Tener linters y type-check automáticos en el ciclo CI.
- [ ] Disponer de permisos corporativos autorizados para el consumo del modelo (DPA firmado).
- [ ] Crear el archivo de harness inicial `AGENTS.md` basado en el estándar corporativo.
