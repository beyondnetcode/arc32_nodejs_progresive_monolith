# 🌐 Arquitectura de Referencia Políglota Corporativa (bMAD)

> 🌍 **Selector de Idioma:** [🇪🇸 Español](./README.es.md) | [🇺🇸 English](./README.md)

---

## 💡 1. Introducción y Objetivos Clave

Bienvenido a la **Arquitectura de Referencia Corporativa Unificada**. Este ecosistema sirve como el plano canónico para sistemas digitales empresariales diseñados para escalar dinámicamente desde Monolitos Modulares hasta ecosistemas de nube completamente distribuidos.

### 🎯 Objetivos de Misión Primarios:
*   **Desacoplamiento Absoluto:** Garantizar que la lógica de negocio permanezca 100% agnóstica a frameworks y dialectos de bases de datos mediante la implementación de **Arquitectura Hexagonal** (Puertos y Adaptadores).
*   **Seguridad Primero:** Imponer aislamiento inherente a través de Seguridad de Nivel de Fila (RLS) nativa y separación estricta de inquilinos en la raíz.
*   **Entrega Estandarizada:** Dictar ciclos de vida de desarrollo de software (SDLC) cerrados y regulados que aseguren un 100% de calidad reproducible en todas las cargas de trabajo políglotas.

---

## 🧭 2. Hub Unificado de Navegación Maestro

🚀 **No explores los directorios al azar.** Todas las rutas de cumplimiento y ejecución de flujo de trabajo están gobernadas explícitamente por el perfil del usuario:

1.  👉 **[Índice Maestro Global](./MASTER_INDEX.es.md)**: La línea de salida canónica. Identifica tu rol (Proveedor, Dev, Arquitecto, PM) y encuentra tu jerarquía de lectura obligatoria exacta de inmediato.
2.  🇪🇸 **[Centro de Estándares Corporativos](./arc-corporate-ws/corporate-standards-es/README.md)**: Especificaciones arquitectónicas integrales y pilares de gobernanza en español.
3.  ⚙️ **[Centro de Gobernanza SDLC](./arc-corporate-ws/corporate-sdlc-es/README.md)**: Requisitos detallados de ingeniería del ciclo de vida y Puertas de Calidad.

---

## ⚠️ 3. Disclaimers Críticos y Recomendaciones de Uso

Para interactuar de manera segura con esta federación de activos, todos los miembros DEBEN respetar las siguientes limitaciones sistémicas y reglas de uso:

### 🛑 Disclaimers Importantes:
*   **Solo Laboratorio de Patrones:** La implementación del sandbox es un vehículo de validación de alta fidelidad diseñado para estresar las fronteras arquitectónicas. NO es un producto comercial "de estantería" destinado a producción instantánea de marca blanca.
*   **Intención Educativa:** El código prioriza la limpieza demostrativa sobre las micro-eficiencias densas y optimizadas.
*   **Integridad de Licencia:** Todas las opciones de código abierto han sido revisadas (sanitización post-era BSL), sin embargo, el cumplimiento legal organizacional final reside en el proveedor que adopta el framework.

### ✅ Recomendaciones de Uso Cruciales:
1.  **Nunca Saltarse los Puertos:** No inyectar lógica de frameworks externos dentro de las carpetas `/domain`.
2.  **Sincronización con ADRs:** Cada desviación de estos estándares exige la consulta de las **45 Decisiones Arquitectónicas** existentes antes de realizar cualquier propuesta.
3.  **Adoptar Docs-as-Code:** No se evaluará ninguna pull request si faltan los mapeos de documentación correspondientes.

---

## ⚡ 4. Arquitectura de Alto Nivel y Mapa Rápido del Ecosistema

### 🚀 Federación Políglota Autorizada (Horizonte 2026)
Las cargas de trabajo se distribuyen globalmente según restricciones de entorno validadas ([ADR-0040](./arc-corporate-ws/corporate-standards-es/02-adrs/core/0040-multi-runtime-selection-contracts.md)):

| Entorno de Ejecución | Rol Canónico | Stack Base Autorizado |
| :--- | :--- | :--- |
| **🟢 Node.js / TS** | APIs Transaccionales y BFFs | NestJS 11.1 / Node 24 LTS / Drizzle |
| **🔵 .NET (C#)** | Cómputo Alto / Pesado Async | ASP.NET Core / .NET 10.0 LTS / EF Core |
| **🟣 Android** | Móvil Nativo Desconectado | Kotlin 2.3 / Jetpack Compose 1.11 / Room |

### 🛠️ Directorio de Accesos Rápidos
*   🏛️ **[Blueprint de Referencia](./arc-corporate-ws/corporate-standards-es/01-architecture/reference-blueprint.md)**: Especificación maestra del sistema.
*   🚀 **[Estrategia Evolutiva](./arc-corporate-ws/corporate-standards-es/00-vision/evolutionary-strategy-roadmap.md)**: Tablero de KPIs y horizontes de escala.
*   📜 **[Hub de Registro ADR](./arc-corporate-ws/corporate-standards-es/02-adrs/README.md)**: Búsqueda acelerada de decisiones universales.
*   🧪 **[Sandbox Ejecutable (Demo)](./arc-corporate-ws/demo/README.md)**: Probar patrones de arquitectura en código real y vivo.

---
🤖 **Habilitación Aumentada por IA:** ¿Buscas arquitecturas de agentes MCP y LLM? → [Explorar Módulo de IA](./arc-corporate-ws/corporate-standards-es/ai-augmented/README.md)
