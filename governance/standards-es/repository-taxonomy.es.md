# 📜 Política de Taxonomía y Estructuración del Repositorio (Enterprise)

> **Estado:** 🟡 Propuesto | **Versión:** 3.0.0 | **Framework:** BMAD-METHOD & Enterprise Taxonomy

Este documento establece la **política oficial e inmutable** de estructuración, taxonomía y gobernanza para este repositorio empresarial.

---

## 🏗️ 1. Estructura Estándar de Directorios (The Blue-Map Layout)

```text
/ (Repository Root) — [CAPA DE GOBERNANZA]
├── 📜 README.md                 # Portal Ejecutivo (Visión y onboarding)
├── 📜 MASTER_INDEX.md           # Hub de Navegación SSoT
├── 📁 .harness/                 # Contexto de IA (Reglas, Memoria)
├── 📁 governance/               # ⚖️ LEYES: Políticas, Requisitos y Roadmap
├── 📁 architecture/             # 🏗️ PLANOS: ADRs, Blueprints y C4 Model
├── 📁 infrastructure/           # 🛠️ CIMIENTOS: IaC, Docker, despliegue
├── 📁 operations/               # 🚀 RUN: Observabilidad y Playbooks
├── 📁 knowledge/                # 🎓 APRENDIZAJE: POCs y Onboarding
└── 📁 src/                      # [CAPA TÉCNICA / SOURCE]
    ├── 📁 apps/                 # Aplicaciones desplegables (app-*)
    ├── 📁 libs/                 # Librerías compartidas (lib-*)
    ├── 📜 package.json          # Orquestación del Monorepo
    └── 📜 nx.json               # Grafo de tareas
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

## 🧩 4. Separación de Responsabilidades

1.  **Código Fuente (`src/apps`, `src/libs`)**: Contiene la lógica de negocio, implementaciones técnicas y pruebas unitarias.
2.  **Gobernanza Arquitectónica (`architecture/`)**: Contiene la justificación de las decisiones (ADRs) y la visión técnica a largo plazo.
3.  **Gobernanza de Producto (`governance/`)**: Contiene el alcance, los requisitos y la validación de negocio.

Está terminantemente prohibido duplicar información de gobernanza dentro de los directorios de código fuente. Toda referencia técnica debe apuntar a la raíz del repositorio.
