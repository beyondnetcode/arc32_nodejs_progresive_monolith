# Política de Taxonomía y Estructuración del Repositorio (Enterprise)

> **Estado:** Aceptado | **Versión:** 4.0.0 | **Framework:** Enterprise Repository Taxonomy & Docs-as-Code

Este documento establece la **política oficial e inmutable** de estructuración, taxonomía y gobernanza para este repositorio empresarial.

---

## 1. Estructura Estándar de Directorios (The Blue-Map Layout)

```text
/ (Repository Root) - [CAPA DE GOBERNANZA]
 README.md # Portal Ejecutivo (Visión y onboarding)
 MASTER_INDEX.md # Hub de Navegación SSoT
 .harness/ # Contexto de IA (Reglas, Memoria)
 reference/ # CORPUS DE REFERENCIA: Arquitectura, gobernanza, conocimiento, operaciones e infraestructura
   architecture/ # PLANOS: ADRs, blueprints, C4 model y perfiles de stack
   governance/ # LEYES: Políticas, SDLC, estándares, onboarding y reglas documentales
   knowledge/ # APRENDIZAJE: Documentación demo, investigación, POCs y ejemplos
   operations/ # RUN: Playbooks operacionales y observabilidad
   infrastructure/ # CIMIENTOS: Plataforma local, gateway, contenedores y activos de infraestructura
 src/ # SOURCE: Implementación ejecutable de referencia y sandbox técnico
```

> [!IMPORTANT]
> **Prohibición de Carpetas "Basura":** Está estrictamente prohibido crear carpetas con nombres como `utils`, `misc`, `temp`, `common`, `shared` sin contexto. Toda pieza de código debe pertenecer a un Dominio, Infraestructura u Operaciones.

## 2. Taxonomía y Convenciones de Nombres

- **Directorios y Archivos Base:** `kebab-case` estricto (ej. `user-management`).
- **ADRs:** `[ID-4-digitos]-[titulo-descriptivo].md` -> `0001-use-postgresql-for-users.md`
- **Naming de Capas en Dominios:**
 - `app-*`: Aplicación o artefacto desplegable (Ej: `app-user-api`).
 - `lib-*`: Librería de dominio o técnica compartida (Ej: `lib-auth-guard`).

## 3. Estrategia de Navegación (SSoT)

1. **Role-Based Navigation:** Guiada por `MASTER_INDEX.md`.
2. **Docs-as-Code:** Prohibido repetir estándares; siempre enlazar al artefacto canónico bajo `reference/`.
3. **Breadcrumbs:** Todo documento Markdown profundo debe contener un enlace de retroceso a `MASTER_INDEX.md`.

## 4. Separación de Responsabilidades

1. **Código Fuente (`src/apps`, `src/libs`)**: Contiene la lógica de negocio, implementaciones técnicas y pruebas unitarias.
2. **Gobernanza Arquitectónica (`reference/architecture/`)**: Contiene la justificación de las decisiones (ADRs) y la visión técnica a largo plazo.
3. **Gobernanza de Producto y Proceso (`reference/governance/`)**: Contiene estándares, SDLC, onboarding, políticas y reglas documentales.
4. **Conocimiento y Demo (`reference/knowledge/`)**: Contiene documentación funcional, técnica, investigación, POCs y material de aprendizaje.

Está terminantemente prohibido duplicar información de gobernanza dentro de los directorios de código fuente. Toda referencia técnica debe apuntar al artefacto canónico correspondiente dentro de `reference/`.

## 5. Política de Raíz del Repositorio

La raíz debe mantenerse pequeña, legible y navegable. El descubrimiento público empieza en `README.md` y `MASTER_INDEX.md`; los artefactos profundos de arquitectura, gobernanza, operaciones, infraestructura y conocimiento viven bajo `reference/`.

Solo estas categorías están permitidas en raíz:

- Archivos públicos de navegación (`README.md`, `README.es.md`, `MASTER_INDEX.md`, `MASTER_INDEX.es.md`, `LICENSE`).
- Dot-folders de tooling y plataforma (`.github/`, `.harness/`, `.bmad-core/`, configuración de editores y automatización).
- `src/` para implementación ejecutable.
- `reference/` para el corpus documental y arquitectónico.

---
[Volver al Hub de Referencia](../../../README.es.md)
