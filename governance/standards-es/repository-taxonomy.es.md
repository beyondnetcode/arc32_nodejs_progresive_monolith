# ðŸ“œ PolÃ­tica de TaxonomÃ­a y EstructuraciÃ³n del Repositorio (Enterprise)

> **Estado:** ðŸŸ¡ Propuesto | **VersiÃ³n:** 3.0.0 | **Framework:** Enterprise Repository Taxonomy & Docs-as-Code

Este documento establece la **polÃ­tica oficial e inmutable** de estructuraciÃ³n, taxonomÃ­a y gobernanza para este repositorio empresarial.

---

## ðŸ—ï¸ 1. Estructura EstÃ¡ndar de Directorios (The Blue-Map Layout)

```text
/ (Repository Root) â€” [CAPA DE GOBERNANZA]
â”œâ”€â”€ ðŸ“œ README.md                 # Portal Ejecutivo (VisiÃ³n y onboarding)
â”œâ”€â”€ ðŸ“œ MASTER_INDEX.md           # Hub de NavegaciÃ³n SSoT
â”œâ”€â”€ ðŸ“ .harness/                 # Contexto de IA (Reglas, Memoria)
â”œâ”€â”€ ðŸ“ governance/               # âš–ï¸ LEYES: PolÃ­ticas, Requisitos y Roadmap
â”œâ”€â”€ ðŸ“ architecture/             # ðŸ—ï¸ PLANOS: ADRs, Blueprints y C4 Model
â”œâ”€â”€ ðŸ“ infrastructure/           # ðŸ› ï¸ CIMIENTOS: IaC, Docker, despliegue
â”œâ”€â”€ ðŸ“ operations/               # ðŸš€ RUN: Observabilidad y Playbooks
â”œâ”€â”€ ðŸ“ knowledge/                # ðŸŽ“ APRENDIZAJE: POCs y Onboarding
â””â”€â”€ ðŸ“ src/                      # [CAPA TÃ‰CNICA / SOURCE]
    â”œâ”€â”€ ðŸ“ apps/                 # Aplicaciones desplegables (app-*)
    â”œâ”€â”€ ðŸ“ libs/                 # LibrerÃ­as compartidas (lib-*)
    â”œâ”€â”€ ðŸ“œ package.json          # OrquestaciÃ³n del Monorepo
    â””â”€â”€ ðŸ“œ nx.json               # Grafo de tareas
```

> [!IMPORTANT]
> **ProhibiciÃ³n de Carpetas "Basura":** EstÃ¡ estrictamente prohibido crear carpetas con nombres como `utils`, `misc`, `temp`, `common`, `shared` sin contexto. Toda pieza de cÃ³digo debe pertenecer a un Dominio, Infraestructura u Operaciones.

## ðŸ—‚ï¸ 2. TaxonomÃ­a y Convenciones de Nombres

- **Directorios y Archivos Base:** `kebab-case` estricto (ej. `user-management`).
- **ADRs:** `[ID-4-digitos]-[titulo-descriptivo].md` -> `0001-use-postgresql-for-users.md`
- **Naming de Capas en Dominios:**
  - `app-*`: AplicaciÃ³n o artefacto desplegable (Ej: `app-user-api`).
  - `lib-*`: LibrerÃ­a de dominio o tÃ©cnica compartida (Ej: `lib-auth-guard`).

## ðŸ§­ 3. Estrategia de NavegaciÃ³n (SSoT)

1. **Role-Based Navigation:** Guiada por `MASTER_INDEX.md`.
2. **Docs-as-Code:** Prohibido repetir estÃ¡ndares; siempre enlazar a `governance/`.
3. **Breadcrumbs:** Todo documento Markdown profundo debe contener un enlace de retroceso a `MASTER_INDEX.md`.

## ðŸ§© 4. SeparaciÃ³n de Responsabilidades

1.  **CÃ³digo Fuente (`src/apps`, `src/libs`)**: Contiene la lÃ³gica de negocio, implementaciones tÃ©cnicas y pruebas unitarias.
2.  **Gobernanza ArquitectÃ³nica (`architecture/`)**: Contiene la justificaciÃ³n de las decisiones (ADRs) y la visiÃ³n tÃ©cnica a largo plazo.
3.  **Gobernanza de Producto (`governance/`)**: Contiene el alcance, los requisitos y la validaciÃ³n de negocio.

EstÃ¡ terminantemente prohibido duplicar informaciÃ³n de gobernanza dentro de los directorios de cÃ³digo fuente. Toda referencia tÃ©cnica debe apuntar a la raÃ­z del repositorio.

---
[? Volver al Índice](./README.es.md)
