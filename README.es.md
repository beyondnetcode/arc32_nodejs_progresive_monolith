# 🌐 Arquitectura de Referencia Políglota Corporativa (BMAD-METHOD)

> 🌍 **Selector de Idioma:** [🇪🇸 Español](./README.es.md) | [🇺🇸 English](./README.md)

---

## 💡 1. Introducción y Objetivos Clave

Bienvenido a la **Arquitectura de Referencia Corporativa Unificada**. Este ecosistema sirve como el plano canónico para sistemas digitales empresariales diseñados para escalar dinámicamente desde Monolitos Modulares hasta ecosistemas de nube completamente distribuidos.

### 🎯 Objetivos de Misión Primarios:
*   **Agnosticismo Radical de Infraestructura:** Tratar a la persistencia y a los proveedores de nube como simples "detalles de implementación", blindando el dominio puro y permitiendo migraciones tecnológicas masivas en tiempo récord (<24h).
*   **Soberanía de Datos y Seguridad Dinámica:** Garantizar aislamiento absoluto cumpliendo nativamente con **ISO 27001 y GDPR** mediante una estrategia de seguridad híbrida configurable (`SECURITY_STRATEGY_MODE`), ajustando la lógica entre la Capa de Aplicación y Hardware Nativo bajo demanda.
*   **Evolución Basada en Métricas Técnicas:** Gobernar la transición de Monolito Modular a Microservicios Distribuidos no por tendencia, sino bajo controles matemáticos estrictos como el Índice de Agnosticismo ($PI$) y el Ratio de Deuda Técnica ($RTD$).
*   **Cero Confianza y Cumplimiento Automatizado:** Blindar el perímetro corporativo inyectando controles de **Compliance-as-Code** y redes Zero-Trust directamente en los pipelines de CI/CD desde el primer día.

---

## 🧭 2. Hub Unificado de Navegación Maestro

🚀 **No explores los directorios al azar.** Todas las rutas de cumplimiento y ejecución de flujo de trabajo están gobernadas explícitamente por el perfil del usuario:

1.  👉 **[Índice Maestro Global](./MASTER_INDEX.es.md)**: La línea de salida canónica. Identifica tu rol (Proveedor, Dev, Arquitecto, PM) y encuentra tu jerarquía de lectura obligatoria exacta de inmediato.
2.  🇪🇸 **[Centro de Estándares Corporativos](./00-governance/standards-es/README.md)**: Especificaciones arquitectónicas integrales y pilares de gobernanza en español.
3.  ⚙️ **[Centro de Gobernanza SDLC](./00-governance/sdlc-es/README.md)**: Requisitos detallados de ingeniería del ciclo de vida y Puertas de Calidad.

---

## ⚠️ 3. Disclaimers Críticos y Recomendaciones de Uso

Para interactuar de manera segura con esta federación de activos, todos los miembros DEBEN respetar las siguientes limitaciones sistémicas y reglas de uso:

### 🛑 Disclaimers Importantes:
*   **Solo Laboratorio de Patrones:** La implementación del sandbox es un vehículo de validación de alta fidelidad diseñado para estresar las fronteras arquitectónicas. NO es un producto comercial "de estantería" destinado a producción instantánea de marca blanca.
*   **Intención Educativa:** El código prioriza la limpieza demostrativa sobre las micro-eficiencias densas y optimizadas.
*   **Integridad de Licencia:** Todas las opciones de código abierto han sido revisadas (sanitización post-era BSL), sin embargo, el cumplimiento legal organizacional final reside en el proveedor que adopta el framework.

### ✅ Recomendaciones de Uso Cruciales:
1.  **Nunca Saltarse los Puertos:** No inyectar lógica de frameworks externos dentro de las carpetas `/domain`.
2.  **Sincronización con ADRs:** Cada desviación de estos estándares exige la consulta de las **46 Decisiones Arquitectónicas** existentes antes de realizar cualquier propuesta.
3.  **Adoptar Docs-as-Code:** No se evaluará ninguna pull request si faltan los mapeos de documentación correspondientes.

---

## ⚡ 4. Arquitectura de Alto Nivel y Mapa Rápido del Ecosistema

### 🚀 Federación Políglota Autorizada (Horizonte 2026)
Las cargas de trabajo se distribuyen globalmente según restricciones de entorno validadas ([ADR-0040](./01-architecture/adrs-es/core/0040-multi-runtime-selection-contracts.md)):

| Entorno de Ejecución | Rol Canónico | Stack Base Autorizado |
| :--- | :--- | :--- |
| **🟢 Node.js / TS** | APIs Transaccionales y BFFs | NestJS 11.1 / Node 24 LTS / Drizzle |
| **🔵 .NET (C#)** | Cómputo Alto / Pesado Async | ASP.NET Core / .NET 10.0 LTS / EF Core |
| **🟣 Android** | Móvil Nativo Desconectado | Kotlin 2.3 / Jetpack Compose 1.11 / Room |

### 🛠️ Directorio de Accesos Rápidos
*   📂 **[Política de Taxonomía del Repositorio](./00-governance/standards-es/repository-taxonomy.es.md)**: Estructura de directorios y convenciones de nombres.
*   🏛️ **[Blueprint de Referencia](./01-architecture/blueprints-es/reference-blueprint.md)**: Especificación maestra del sistema.
*   🚀 **[Estrategia Evolutiva](./00-governance/standards-es/00-vision/evolutionary-strategy-roadmap.md)**: Tablero de KPIs y horizontes de escala.
*   📜 **[Hub de Registro ADR](./01-architecture/adrs-es/README.md)**: Búsqueda acelerada de decisiones universales.
*   🧪 **[Sandbox Ejecutable (Demo)](./arc-corporate-ws/demo/README.md)**: Probar patrones de arquitectura en código real y vivo.

---
🤖 **Habilitación Aumentada por IA:** ¿Buscas arquitecturas de agentes MCP y LLM? → [Explorar Módulo de IA](./00-governance/standards-es/ai-augmented/README.md)
