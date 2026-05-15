# Guía de Adopción: Modelos de Arquitectura Aumentada por IA

Incorporar capacidades agénticas no debe ser un "Big Bang". Proponemos un modelo evolutivo de 3 niveles incrementales de madurez.

## Niveles de Adopción

### Nivel 1 - IA Asistida (Desarrollo Asistido)
El equipo adopta la IA estrictamente como un acelerador en el proceso de construcción de software. El producto final no sufre alteraciones lógicas.
* **Impacto en Arquitectura:** Cero.
* **Características:** Uso de Claude Code, Copilot, o agentes de terminal. Mantienen un archivo `AGENTS.md` en el repositorio como harness mínimo.
* **Enfoque:** Incrementar la experiencia del desarrollador (DX).

### Nivel 2 - IA Integrada (Funcional Integrada)
El producto incorpora la capacidad de consultar modelos de lenguaje para enriquecer funcionalidades específicas y predecibles.
* **Impacto en Arquitectura:** Medio (Invocaciones a servicios de inferencia externos).
* **Características:** Se implementan llamadas estructuradas a LLMs para clasificación de tickets, extracción de datos estructurados, o auto-resúmenes. Uso de MCP para estandarizar cómo los agentes internos consumen datos corporativos.
* **Enfoque:** Automatización de tareas cognitivas de bajo riesgo.

### Nivel 3 - IA Orquestada (Orquestación Autónoma)
El producto es liderado por un ciclo agéntico dinámico capaz de tomar decisiones y ejecutar planes multi-paso.
* **Impacto en Arquitectura:** Alto (Frameworks agénticos y máquinas de estado complejas).
* **Características:** Agentes autónomos utilizando un catálogo robusto de herramientas. Emplea patrones Multi-Agente, razonamiento recursivo y orquestadores deterministas con validaciones Human-in-the-Loop integradas.
* **Enfoque:** Autonomía operativa supervisada.

---

## Criterios de Subida de Nivel

Para avanzar al siguiente nivel de madurez, el equipo de arquitectura del producto debe validar:

1. **De L1 a L2**: 
 - [] Cobertura de pruebas unitarias > 70% en el dominio afectado.
 - [] Definición clara del caso de uso (evitando el LLM como martillo para todo).
 - [] Estimación inicial de tokens/costos registrada y validada.
2. **De L2 a L3**:
 - [] Auditoría/trazabilidad de logs de las llamadas al LLM implementada.
 - [] Flujo funcional de Human-in-the-Loop para acciones destructivas o financieras.
 - [] Definiciones de herramientas con un 90% de idempotencia comprobada.

## Checklist de Prerrequisitos Generales

Antes de iniciar cualquier iniciativa agéntica (incluso Nivel 1):
- [] Contar con un repositorio git con reglas de protección de rama.
- [] Automatizar linters y chequeos de tipos en el ciclo de CI.
- [] Tener permisos corporativos autorizados para el uso de modelos (DPA firmado).
- [] Crear el archivo de harness inicial `AGENTS.md` basado en el estándar corporativo.

---
[Volver al Índice](./README.es.md)
