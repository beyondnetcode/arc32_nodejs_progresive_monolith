# ADR-0048: Estandarización de Taxonomía Empresarial y Layout (BMAD-METHOD)

## Estado
Aceptado

## Contexto
A medida que el ecosistema evoluciona hacia un Monolito Progresivo, la proliferación de carpetas anidadas y la falta de convenciones estrictas de nombres han generado confusión cognitiva ("Cognitive Load") para los desarrolladores y dificultades para el enrutamiento de agentes de Inteligencia Artificial (BMAD-Method).
Se requería una política inmutable que unificara la estructura de directorios, la separación por dominios y la ubicación de los artefactos de gobernanza en la raíz del repositorio, garantizando el principio de Single Source of Truth (SSoT) en la documentación (Docs-as-Code).

## Decisión
Se ha decidido evolucionar el estándar hacia el modelo **Source-Centric Monorepo (v2.0)**. Esta política impone la segregación absoluta entre la gobernanza humana (Raíz) y la maquinaria técnica (Src).

Las reglas clave obligatorias son:
1.  **The Blue-Map Layout (v2.0)**: La raíz del proyecto es un **Portal de Gobernanza** que solo contiene documentación ejecutiva (`README`, `MASTER_INDEX`) y carpetas de alto nivel (`governance/`, `architecture/`).
2.  **Centralización Técnica (`src/.workspace/`)**: Todo artefacto relacionado con build, dependencias, tooling o configuración técnica del monorepo (`package.json`, `nx.json`, `node_modules`, etc.) debe vivir exclusivamente dentro de `src/.workspace/`.
3.  **Encapsulamiento DDD**: El código y su lógica de dominio residen en `src/[dominio]/`, siendo unidades autónomas que contienen su propio código, gobernanza local y arquitectura.
4.  **Naming Conventions**: Uso estricto de `kebab-case` y prefijos `app-` / `lib-`.
5.  **Directivas de Plataforma**: Solo se permiten en la raíz archivos requeridos por el host (ej. `.github/`, `.gitignore`) o el contexto de IA (`.harness/`).

## Consecuencias
### Positivas:
* **Mejora del Developer Experience (DX):** La navegación se simplifica radicalmente y se guía a través del `MASTER_INDEX.md`.
* **Escalabilidad Inmediata:** La clara separación en `src` facilita la futura extracción de microservicios (Microservice Extraction Readiness).
* **Mejor Interacción con IA:** Los agentes como Cline/Windsurf/Cursor tienen ahora un "Contexto AI" aislado y optimizado (`.harness`) sin generar ruido visual en la raíz.

### Negativas/Riesgos:
* **Refactoring Inicial:** Implicó un cambio mayor ("Breaking Change" a nivel de carpetas) que requirió actualizar `nx.json`, `package.json` y re-escribir hipervínculos internos en toda la documentación.
* **Curva de Aprendizaje:** Los nuevos desarrolladores deben ser capacitados obligatoriamente sobre la política de taxonomía (ubicada en `governance/standards/repository-taxonomy.md`) antes de crear nuevas carpetas.
