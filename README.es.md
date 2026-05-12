# 🌐 Arquitectura de Referencia Políglota Corporativa (bMAD)

> 🌍 **Idioma / Language:** [🇪🇸 Español](./README.es.md) | [🇺🇸 English](./README.md)

---

## 💡 1. Introducción

Bienvenido a la **Arquitectura de Referencia Corporativa Unificada**. Este repositorio sirve como la base autorizada y el plano canónico para la construcción de ecosistemas digitales empresariales políglotas que evolucionan dinámicamente desde Monolitos Modulares hacia Microservicios distribuidos.

La arquitectura implementa el **Método bMAD**, asegurando la adherencia estricta a fronteras hexagonales, desacoplamiento por contextos delimitados y gobernanza tecnológica agnóstica a la nube.

---

## 🔗 2. Marcos Documentación Cross y Referencias Globales

Estos marcos centrales gobiernan toda la arquitectura, independientemente del lenguaje de implementación o la región.

### 🚀 Ecosistema Políglota Autorizado (Horizonte 2026)
La arquitectura no es exclusiva de Node.js; es una federación políglota que distribuye las cargas de trabajo según la idoneidad técnica ([ADR-0040](./arc-corporate-ws/corporate-standards-es/02-adrs/core/0040-multi-runtime-selection-contracts.md)):

| Entorno de Ejecución | Rol Canónico | Stack Tecnológico Validado |
| :--- | :--- | :--- |
| **🟢 Node.js / TS** | APIs Transaccionales y BFF | NestJS 11.1 / Node 24 LTS / Drizzle |
| **🔵 .NET (C#)** | Cómputo Alto / Workers / Batch | ASP.NET Core / .NET 10.0 LTS / EF Core |
| **🟣 Android** | Aplicaciones Móviles Offline | Kotlin 2.3 / Jetpack Compose 1.11 / Room |

### 🧪 Sandbox de Implementación (Código Ejecutable)
**Para Ingenieros de Software y QA.** Contiene la implementación de referencia ejecutable que valida Arquitectura Limpia, Seguridad a Nivel de Fila (RLS) y Observabilidad.
👉 **[Explorar Aplicación Sandbox (Demo)](./arc-corporate-ws/demo/README.md)**

**🔒 Estatus Legal:** 100% Sanitizado. Licencias Apache 2.0 / MIT / BSD-3 (Valkey, OpenTofu, OpenBao validadas).

---

## 🗺️ 3. Índice de Documentación Oficial (Elegir Idioma)

Navegue directamente al conjunto completo de estándares, blueprints y registros de decisiones de arquitectura en su idioma de preferencia:

*   🇪🇸 **[Centro de Documentación en Español](./arc-corporate-ws/corporate-standards-es/README.md)**: Estándares integrales y gobernanza en Español.
*   ⚙️ **[Centro de Gobernanza SDLC en Español](./arc-corporate-ws/corporate-sdlc-es/README.md)**: Estándares de ciclo de vida y entrega en Español.
*   🇺🇸 **[English Documentation Center](./arc-corporate-ws/corporate-standards/README.md)**: Comprehensive standards and governance in English.
*   ⚙️ **[English SDLC Governance Center](./arc-corporate-ws/corporate-sdlc/README.md)**: Lifecycle and delivery standards in English.

---

## ⚡ 4. Mapa de Navegación Rápida Central (Contexto Español)

### 🧠 Directivas Arquitectónicas
*   **[🏛️ Blueprint Corporativo Multi-Runtime](./arc-corporate-ws/corporate-standards-es/01-architecture/reference-blueprint.md)**: La especificación maestra del sistema (arc42).
*   **[🚀 Estrategia Evolutiva y Tablero](./arc-corporate-ws/corporate-standards-es/00-vision/evolutionary-strategy-roadmap.md)**: Visión a largo plazo y KPIs ($PI$, $RTD$).
*   **[☁️ Escenarios de Despliegue Multi-Cloud](./arc-corporate-ws/corporate-standards-es/01-architecture/multi-cloud-deployment-scenarios.md)**: Blueprints para Azure, AWS, On-Prem e Híbrido.
*   **[📜 Historial de Decisiones (ADRs)](./arc-corporate-ws/corporate-standards-es/02-adrs/README.md)**: Registro de las 45 decisiones tecnológicas definitivas.
    *   *Acceso Rápido por Dominio:* [🌐 Core](./arc-corporate-ws/corporate-standards-es/02-adrs/README.md#universal-core) | [🟢 Node.js](./arc-corporate-ws/corporate-standards-es/02-adrs/README.md#nodejs-typescript) | [🔵 .NET](./arc-corporate-ws/corporate-standards-es/02-adrs/README.md#net-c) | [🟣 Móvil](./arc-corporate-ws/corporate-standards-es/02-adrs/README.md#android-native)

### 🛠️ Estándares y Blindaje
*   **[🔬 Opinión de Auditoría de Stack 2026](./arc-corporate-ws/corporate-standards-es/03-engineering/detailed-stack-audit-2026.md)**: Verificación crítica de licencias (Post-BSL/SSPL) y versiones activas.
*   **[🛡️ Manifiesto de Ingeniería Global](./arc-corporate-ws/corporate-standards-es/03-engineering/engineering-manifesto.md)**: Política normativa para SOLID, Código Limpio y OWASP.

### 🚦 Gobernanza de Lanzamientos y Adopción
*   **[📈 Estrategia de Versionado Nx](./arc-corporate-ws/corporate-standards-es/04-governance/release-audit-strategy.md)**: Mecanismo automatizado para lanzamientos y SemVer.
*   **[🚀 Manual de Inicio Rápido de Productos](./arc-corporate-ws/corporate-standards-es/05-onboarding/product-quick-start.md)**: La guía oficial de andamiaje y configuración del entorno.

### 🤖 Arquitectura Aumentada por IA (Opcional)
Extensión opcional para equipos que buscan incorporar agentes de IA y MCP en su arquitectura.
→ [Explorar sección de Arquitectura Aumentada por IA](./arc-corporate-ws/corporate-standards-es/ai-augmented/README.md)
