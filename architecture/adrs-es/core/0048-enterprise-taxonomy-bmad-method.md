# ADR-0048: EstandarizaciÃ³n de TaxonomÃ­a Empresarial y Layout (Enterprise Standards)

## Estado
Aceptado

## Contexto
A medida que el ecosistema evoluciona hacia un Monolito Progresivo, la proliferaciÃ³n de carpetas anidadas y la falta de convenciones estrictas de nombres han generado una alta carga cognitiva para los equipos de ingenierÃ­a. Se requerÃ­a una polÃ­tica inmutable que unificara la estructura de directorios, la separaciÃ³n por dominios y la ubicaciÃ³n de los artefactos de gobernanza en la raÃ­z del repositorio, garantizando el principio de **Docs-as-Code**.

Esta estandarizaciÃ³n tambiÃ©n optimiza la interacciÃ³n con agentes de Inteligencia Artificial mediante el soporte de la metodologÃ­a **BMAD-METHOD**, pero el driver principal es la mantenibilidad y la arquitectura enterprise.

## DecisiÃ³n
Se ha decidido adoptar la **TaxonomÃ­a Enterprise v3.0 (Separated Governance & Source)** como el estÃ¡ndar arquitectÃ³nico oficial. Esta polÃ­tica impone la segregaciÃ³n absoluta entre la gobernanza documental (RaÃ­z) y la implementaciÃ³n tÃ©cnica (`src/`).

Las reglas inmutables son:
1.  **Portal de Gobernanza (RaÃ­z)**: Los dominios transversales de gobernanza deben vivir exclusivamente en la raÃ­z del repositorio:
    *   `governance/`: VisiÃ³n, requisitos (BMAD Phase 00-01) y roadmap (Phase 05).
    *   `architecture/`: ADRs (Phase 03) y Blueprints (Phase 02).
    *   `infrastructure/`: Configuraciones de plataforma e IaC.
    *   `operations/`: Observabilidad y monitoreo.
    *   `knowledge/`: Onboarding y POCs.
2.  **Source Root (`src/`)**: Ãšnico contenedor de la implementaciÃ³n tÃ©cnica. No debe contener carpetas redundantes de dominio intermedio (ej. NO usar `src/TODO/`).
3.  **Monorepo Standard (Nx)**: Dentro de `src/`, el cÃ³digo se organiza siguiendo las mejores prÃ¡cticas de Nx:
    *   `src/apps/`: Aplicaciones desplegables.
    *   `src/libs/`: LibrerÃ­as compartidas.
    *   `src/package.json` & `src/nx.json`: El motor tÃ©cnico reside en la raÃ­z de `src/`.
4.  **LÃ­mites de Responsabilidad**: El cÃ³digo fuente debe ser agnÃ³stico a la documentaciÃ³n de negocio, permitiendo que la gobernanza evolucione sin afectar el build path.

## Consecuencias
### Positivas:
* **Mejora del Developer Experience (DX):** La navegaciÃ³n se simplifica radicalmente y se guÃ­a a travÃ©s del `MASTER_INDEX.md`.
* **Escalabilidad Inmediata:** La clara separaciÃ³n en `src` facilita la futura extracciÃ³n de microservicios (Microservice Extraction Readiness).
* **Mejor InteracciÃ³n con IA:** Los agentes como Cline/Windsurf/Cursor tienen ahora un "Contexto AI" aislado y optimizado (`.harness`) sin generar ruido visual en la raÃ­z.

### Negativas/Riesgos:
* **Refactoring Inicial:** ImplicÃ³ un cambio mayor ("Breaking Change" a nivel de carpetas) que requiriÃ³ actualizar `nx.json`, `package.json` y re-escribir hipervÃ­nculos internos en toda la documentaciÃ³n.
* **Curva de Aprendizaje:** Los nuevos desarrolladores deben ser capacitados obligatoriamente sobre la polÃ­tica de taxonomÃ­a (ubicada en `governance/standards/repository-taxonomy.md`) antes de crear nuevas carpetas.

---
[? Volver al Índice](./README.es.md)
