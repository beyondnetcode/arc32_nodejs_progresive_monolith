# ADR-0048: Estandarización de Taxonomía Empresarial y Layout (Enterprise Standards)

## Estado
Aceptado

## Contexto
A medida que el ecosistema evoluciona hacia un Monolito Progresivo, la proliferación de carpetas anidadas y la falta de convenciones estrictas de nombres han generado una alta carga cognitiva para los equipos de ingeniería. Se requería una política inmutable que unificara la estructura de directorios, la separación por dominios y la ubicación de los artefactos de gobernanza en la raíz del repositorio, garantizando el principio de **Docs-as-Code**.

Esta estandarización también optimiza la interacción con agentes de Inteligencia Artificial mediante el soporte de la metodología **BMAD-METHOD**, pero el driver principal es la mantenibilidad y la arquitectura enterprise.

## Decisión
Se ha decidido adoptar la **Taxonomía Enterprise v3.0 (Separated Governance & Source)** como el estándar arquitectónico oficial. Esta política impone la segregación absoluta entre la gobernanza documental (Raíz) y la implementación técnica (`src/`).

Las reglas inmutables son:
1.  **Portal de Gobernanza (Raíz)**: Los dominios transversales de gobernanza deben vivir exclusivamente en la raíz del repositorio:
    *   `governance/`: Visión, requisitos (BMAD Phase 00-01) y roadmap (Phase 05).
    *   `architecture/`: ADRs (Phase 03) y Blueprints (Phase 02).
    *   `infrastructure/`: Configuraciones de plataforma e IaC.
    *   `operations/`: Observabilidad y monitoreo.
    *   `knowledge/`: Onboarding y POCs.
2.  **Source Root (`src/`)**: Único contenedor de la implementación técnica. No debe contener carpetas redundantes de dominio intermedio (ej. NO usar `src/TODO/`).
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
