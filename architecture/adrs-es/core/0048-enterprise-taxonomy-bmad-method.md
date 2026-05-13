# ADR-0048: Estandarización de Taxonomía Empresarial y Layout (BMAD-METHOD)

## Estado
Aceptado

## Contexto
A medida que el ecosistema evoluciona hacia un Monolito Progresivo, la proliferación de carpetas anidadas y la falta de convenciones estrictas de nombres han generado confusión cognitiva ("Cognitive Load") para los desarrolladores y dificultades para el enrutamiento de agentes de Inteligencia Artificial (BMAD-Method).
Se requería una política inmutable que unificara la estructura de directorios, la separación por dominios y la ubicación de los artefactos de gobernanza en la raíz del repositorio, garantizando el principio de Single Source of Truth (SSoT) en la documentación (Docs-as-Code).

## Decisión
Se ha decidido evolucionar el estándar hacia la **Taxonomía Enterprise v3.0 (Separated Governance & Source)**. Esta política impone una arquitectura de repositorio de dos capas para maximizar la visibilidad del negocio y la limpieza técnica.

Las reglas inmutables son:
1.  **Portal de Gobernanza (Raíz)**: Los dominios transversales de gobernanza deben vivir exclusivamente en la raíz del repositorio:
    *   `governance/`: Visión, requisitos (BMAD Phase 00-01) y roadmap (Phase 05).
    *   `architecture/`: ADRs (Phase 03) y Blueprints (Phase 02).
    *   `infrastructure/`: Configuraciones de plataforma e IaC.
    *   `operations/`: Observabilidad y monitoreo.
    *   `knowledge/`: Onboarding y POCs.
2.  **Source Root (`src/`)**: Único contenedor de la implementación técnica. No debe contener carpetas redundantes de dominio intermedio (ej. NO usar `src/ums/`).
3.  **Monorepo Standard (Nx)**: Dentro de `src/`, el código se organiza siguiendo las mejores prácticas de Nx:
    *   `src/apps/`: Aplicaciones desplegables.
    *   `src/libs/`: Librerías compartidas.
    *   `src/package.json` & `src/nx.json`: El motor técnico reside en la raíz de `src/`.
4.  **Límites de Responsabilidad**: El código fuente debe ser agnóstico a la documentación de negocio, permitiendo que la gobernanza evolucione sin afectar el build path.

## Consecuencias
### Positivas:
* **Mejora del Developer Experience (DX):** La navegación se simplifica radicalmente y se guía a través del `MASTER_INDEX.md`.
* **Escalabilidad Inmediata:** La clara separación en `src` facilita la futura extracción de microservicios (Microservice Extraction Readiness).
* **Mejor Interacción con IA:** Los agentes como Cline/Windsurf/Cursor tienen ahora un "Contexto AI" aislado y optimizado (`.harness`) sin generar ruido visual en la raíz.

### Negativas/Riesgos:
* **Refactoring Inicial:** Implicó un cambio mayor ("Breaking Change" a nivel de carpetas) que requirió actualizar `nx.json`, `package.json` y re-escribir hipervínculos internos en toda la documentación.
* **Curva de Aprendizaje:** Los nuevos desarrolladores deben ser capacitados obligatoriamente sobre la política de taxonomía (ubicada en `governance/standards/repository-taxonomy.md`) antes de crear nuevas carpetas.
