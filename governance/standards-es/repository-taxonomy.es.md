# 📜 Política de Taxonomía y Estructuración del Repositorio (Enterprise)

> **Estado:** 🟡 Propuesto | **Versión:** 1.0.0 | **Framework:** BMAD-METHOD & Clean Architecture

Este documento establece la **política oficial e inmutable** de estructuración, taxonomía y gobernanza para este repositorio empresarial.

---

## 🏗️ 1. Estructura Estándar de Directorios (The Blue-Map Layout)

```text
/ (Repository Root)
├── 📜 README.md                 # Portal Ejecutivo (Visión y navegación inicial)
├── 📜 MASTER_INDEX.md           # Ruteo por Rol (Navegación basada en perfiles)
├── 📁 .bmad-core/               # ⚡ MOTOR: Implementación del BMAD-Method (Agentes, Tooling)
├── 📁 .github/                  # 🤖 CI/CD: Workflows, Actions, Templates de PR/Issue
├── 📁 .harness/                 # 🧠 CONTEXTO AI: Reglas base, Playbooks, Prompts y Memoria
├── 📁 governance/            # ⚖️ LEYES: Normativas, Políticas, SDLC y Estándares
├── 📁 architecture/          # 🏗️ PLANOS: ADRs, Blueprints, Diagramas (C4 Model)
├── 📁 src/               # 📦 NEGOCIO: Código fuente encapsulado por dominios (DDD)
├── 📁 03-infrastructure/        # 🛠️ CIMIENTOS: Infraestructura como Código (IaC), DevOps
├── 📁 04-operations/            # 🚀 RUN: Playbooks de Operaciones, Observabilidad, Alertas
└── 📁 knowledge/             # 🎓 APRENDIZAJE: Onboarding, POCs, Ejemplos, Capacitación
```

> [!IMPORTANT]
> **Prohibición de Carpetas "Basura":** Está estrictamente prohibido crear carpetas con nombres como `utils`, `misc`, `temp`, `common`, `shared` sin contexto. Toda pieza de código debe pertenecer a un Dominio, Infraestructura u Operaciones.

## 🗂️ 2. Taxonomía y Convenciones de Nombres

- **Directorios y Archivos Base:** `kebab-case` estricto (ej. `user-management`).
- **ADRs:** `[ID-4-digitos]-[titulo-descriptivo].md` -> `0001-use-postgresql-for-users.md`
- **Naming de Capas en Dominios:**
  - `app-*`: Aplicación o artefacto desplegable (Ej: `app-user-api`).
  - `lib-*`: Librería de dominio o técnica compartida (Ej: `lib-auth-guard`).

## 🧭 3. Estrategia de Navegación (SSoT)

1. **Role-Based Navigation:** Guiada por `MASTER_INDEX.md`.
2. **Docs-as-Code:** Prohibido repetir estándares; siempre enlazar a `governance/`.
3. **Breadcrumbs:** Todo documento Markdown profundo debe contener un enlace de retroceso a `MASTER_INDEX.md`.

## 🧩 4. Separación por Dominios (DDD)

El código en `src/` se organiza por **Capacidad de Negocio**. El código dentro de `user-management` no puede importar directamente archivos internos de otro dominio. La comunicación inter-dominio debe resolverse mediante contratos formales (Interfaces, APIs, Eventos).
