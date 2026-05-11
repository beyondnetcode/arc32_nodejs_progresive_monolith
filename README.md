# 🌐 Corporate Polyglot Reference Architecture (bMAD)

Bienvenido a la **Arquitectura de Referencia Corporativa Unificada**. Este repositorio sirve como la base autorizada y el blueprint canónico para la construcción de ecosistemas digitales empresariales políglotas que evolucionan dinámicamente desde Monolitos Modulares hacia Microservicios distribuidos.

La arquitectura implementa el **Método BMAD**, asegurando cumplimiento estricto de fronteras hexagonales, desacoplamiento por contextos delimitados y un gobierno tecnológico agnóstico a la nube.

---

## 🎯 Propósito Dual del Repositorio

El contenido está estrictamente segmentado para separar el Gobierno Corporativo del Laboratorio de Pruebas:

### 🏛️ 1. Capa de Estándares Corporativos (EAC)
**Para Arquitectos, Líderes Técnicos y Proveedores.**
Contiene la "Ley Corporativa": 42 ADRs aprobados, blueprints arc42, matrices de madurez y el dictamen de auditoría legal de stack 2026.
👉 **[Navegar Estándares Corporativos](./arc-nodejs-workspace/corporate-standards/README.md)**

### 🧪 2. Capa Demo / Sandbox (To-Do Application)
**Para Ingenieros de Software y QA.**
Contiene la implementación de referencia ejecutable que valida físicamente el Clean Architecture, el Row-Level Security (RLS) y la Observabilidad.
👉 **[Explorar Aplicación Sandbox](./arc-nodejs-workspace/demo/README.md)**

---

## 🚀 Ecosistema Políglota Autorizado (Matriz 2026)
La arquitectura no es exclusiva de Node.js; es una federación políglota que distribuye cargas de trabajo según idoneidad técnica (ADR-0040):

| Runtime | Rol Canónico | Stack Tecnológico Validado |
| :--- | :--- | :--- |
| **🟢 Node.js / TS** | APIs Transaccionales y BFF | NestJS 11.1 / Node 24 LTS / Drizzle |
| **🔵 .NET (C#)** | High Compute / Workers / Batch | ASP.NET Core / .NET 10.0 LTS / EF Core |
| **🟣 Android** | Aplicaciones Móviles Offline | Kotlin 2.3 / Jetpack Compose 1.11 / Room |

---

## 📚 Mapa Rápido de Navegación Central

### 🧠 Directivas Arquitectónicas
*   **[🏛️ Blueprint Corporativo Multi-Runtime](./arc-nodejs-workspace/corporate-standards/01-architecture/reference-blueprint.md)**: La especificación maestra del sistema (arc42).
*   **[📜 Historial de Decisiones (ADRs)](./arc-nodejs-workspace/corporate-standards/02-adrs/README.md)**: Registro de las 42 decisiones tecnológicas definitivas.

### 🛠️ Estándares y Blindaje
*   **[🔬 Dictamen de Auditoría Stack 2026](./arc-nodejs-workspace/corporate-standards/03-engineering/detailed-stack-audit-2026.md)**: Verificación crítica de licencias (Post-BSL/SSPL) y versiones activas.
*   **[🛡️ Manifiesto de Ingeniería Global](./arc-nodejs-workspace/corporate-standards/03-engineering/engineering-manifesto.md)**: Normativa de SOLID, Clean Code y OWASP.

### 🚦 Gobernanza de Lanzamiento
*   **[📈 Estrategia de Versionado Nx](./arc-nodejs-workspace/corporate-standards/04-governance/release-audit-strategy.md)**: Mecanismo automatizado de releases y SemVer.

---

## 🚀 Guía de Adopción (Quick Start)

¿Estás iniciando un nuevo proyecto a partir de esta referencia?
No crees nada desde cero. Sigue la guía oficial de andamiaje para clonar, configurar dependencias y levantar tu infraestructura local en minutos:

👉 **[Leer el Product Quick-Start Official Manual](./arc-nodejs-workspace/corporate-standards/05-onboarding/product-quick-start.md)**

---
**🔒 Estatus Legal del Repositorio**: 100% Sanitizado. Licencias Apache 2.0 / MIT / BSD-3 (Valkey, OpenTofu, OpenBao validados).

---

## 🤖 AI-Augmented Architecture (Opcional)

Extensión opcional para equipos y productos que desean incorporar agentes IA,
harness engineering y MCP en su arquitectura. No modifica ni reemplaza ningún
estándar corporativo existente.

→ [Explorar sección AI-Augmented](./arc-nodejs-workspace/corporate-standards/ai-augmented/README.md)

