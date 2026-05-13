# ADR-0048: Estandarización de Taxonomía Empresarial y Layout (BMAD-METHOD)

## Estado
Aceptado

## Contexto
A medida que el ecosistema evoluciona hacia un Monolito Progresivo, la proliferación de carpetas anidadas y la falta de convenciones estrictas de nombres han generado confusión cognitiva ("Cognitive Load") para los desarrolladores y dificultades para el enrutamiento de agentes de Inteligencia Artificial (BMAD-Method).
Se requería una política inmutable que unificara la estructura de directorios, la separación por dominios y la ubicación de los artefactos de gobernanza en la raíz del repositorio, garantizando el principio de Single Source of Truth (SSoT) en la documentación (Docs-as-Code).

## Decisión
Se ha decidido adoptar e imponer la **Política de Taxonomía y Estructuración del Repositorio (Enterprise)** como un estándar global, inmutable y heredable para este repositorio y todos los ecosistemas satélites.

Las reglas clave obligatorias son:
1. **The Blue-Map Layout:** La raíz del proyecto debe mantenerse plana y estrictamente dividida por capas de abstracción (`governance`, `architecture`, `src`, `03-infrastructure`, `04-operations`, `knowledge`).
2. **Prohibición de Carpetas Comunes:** No se permiten carpetas como `utils`, `misc` o `shared` a nivel global ni de dominio sin un contexto de negocio justificado.
3. **Encapsulamiento DDD:** Todo el código fuente de las aplicaciones y librerías debe migrarse desde un enfoque técnico (ej. `apps/` y `libs/`) hacia un enfoque de Dominio (`src/[nombre-del-dominio]`).
4. **Naming Conventions:** Uso estricto de `kebab-case` y prefijos para identificar tipos de artefactos (`app-`, `lib-`).
5. **Dot-Folders para Tooling:** Herramientas técnicas como la IA (`.harness`), automatizaciones (`.github`) o motores (`.bmad-core`) deben ubicarse en carpetas ocultas que comienzan con punto.

## Consecuencias
### Positivas:
* **Mejora del Developer Experience (DX):** La navegación se simplifica radicalmente y se guía a través del `MASTER_INDEX.md`.
* **Escalabilidad Inmediata:** La clara separación en `src` facilita la futura extracción de microservicios (Microservice Extraction Readiness).
* **Mejor Interacción con IA:** Los agentes como Cline/Windsurf/Cursor tienen ahora un "Contexto AI" aislado y optimizado (`.harness`) sin generar ruido visual en la raíz.

### Negativas/Riesgos:
* **Refactoring Inicial:** Implicó un cambio mayor ("Breaking Change" a nivel de carpetas) que requirió actualizar `nx.json`, `package.json` y re-escribir hipervínculos internos en toda la documentación.
* **Curva de Aprendizaje:** Los nuevos desarrolladores deben ser capacitados obligatoriamente sobre la política de taxonomía (ubicada en `governance/standards/repository-taxonomy.md`) antes de crear nuevas carpetas.
