# 🗺️ Mapa Maestro de Navegación - Base de Conocimiento UMS

Bienvenido a la documentación técnica maestra del **User Management System (UMS)**. Esta base de conocimiento está estructurada bajo el estándar **bMAD Method (fases secuenciales numéricas)** para garantizar la máxima descuidabilidad, trazabilidad y soporte para desarrolladores humanos y copilotos de IA.

---

## 🧭 Índice de Navegación por Fases

### 🎯 [Fase 00 - Visión de Producto](./00-product/)
Define el contexto de negocio, los pilares estratégicos del producto y el mapa de stakeholders.
*   📄 **[Visión de Producto](./00-product/product-vision.md)**: Pilares de identidad soberana, delegación de autenticación y multi-tenancy.
*   📄 **[Contexto de Negocio](./00-product/business-context.md)**: Problema, solución y diagramas conceptuales de integración.
*   📄 **[Alcance y Límites](./00-product/scope.md)**: Capacidades In-Scope y Out-of-Scope detalladas.
*   📄 **[Objetivos Estratégicos (OKRs)](./00-product/objectives.md)**: Métricas y KRs de seguridad, performance y autogestión.
*   📄 **[Mapa de Stakeholders](./00-product/stakeholders.md)**: Matriz de responsabilidades y expectativas de roles técnicos y de negocio.

---

### 📋 [Fase 01 - Requerimientos Funcionales](./01-requirements/)
Detalla las reglas de negocio, flujos interactivos, diagramas conceptuales de base de datos y la definición formal del Ubiquitous Language.
*   📄 **[Glosario de Términos (Ubiquitous Language)](./01-requirements/glossary.md)**: Diccionario formal DDD del core del dominio.
*   📄 **[Modelo de Datos Conceptual](./01-requirements/conceptual-data-model.md)**: Lógica relacional PostgreSQL y políticas RLS.
*   📄 **[Matriz de Permisos Detallada](./01-requirements/permission-matrix-example.md)**: Lógica fina de accesos (RBAC/ABAC) y regla de negación explícita.
*   📂 **[Casos de Uso Atómicos](./01-requirements/usecases/)**:
    *   [UC-01: Autenticación de Usuario](./01-requirements/usecases/uc-01-user-authentication.md)
    *   [UC-02: Compilación de Grafo de Autorización](./01-requirements/usecases/uc-02-build-authorization-graph.md)
    *   [UC-03: Instanciación de Plantilla de Políticas](./01-requirements/usecases/uc-03-create-authorization-template.md)

---

### 🏗️ [Fase 02 - Arquitectura de Software](./02-architecture/)
Contiene la especificación arquitectónica del sistema basada en el estándar C4 Model.
*   📄 **[Especificación Maestra C4](./02-architecture/architecture-spec.md)**: Diagramas técnicos de Nivel 1 (Contexto), Nivel 2 (Contenedor) y Nivel 3 (Componente).

---

### 📜 [Fase 03 - Decisiones de Arquitectura (ADRs)](./03-adrs/)
La bitácora cronológica e inmutable de decisiones críticas de diseño en formato MADR.
*   📄 **[Bitácora de ADRs](./03-adrs/)**: Accede al índice completo de las 19 decisiones de arquitectura activas (desde Nx Monorepo, Clean Architecture, RLS, hasta Dapr y OpenTelemetry).

---

### 🛠️ [Fase 04 - Estándares de Ingeniería y Artefactos](./04-artifacts/)
Documentación técnica, guías de código limpio, estándares de seguridad y planes de calidad técnica.
*   📄 **[Estándares Globales de Ingeniería](./04-artifacts/engineering-standards.md)**: SOLID, Clean Architecture, OWASP compliance y guías DDD.
*   📄 **[Plan de Pruebas de Contratos](./04-artifacts/contract-testing-plan.md)**: Integración segura utilizando Pact JS.
*   📄 **[Estrategia de Observabilidad Distribuida](./04-artifacts/observability-strategy.md)**: Telemetría unificada mediante OpenTelemetry y Grafana Loki.
*   📄 **[Análisis de Brechas y Deuda Técnica](./04-artifacts/gap-analysis-and-optimization-plan.md)**: Evaluación de madurez y plan de mitigación técnica.

---

### 📈 [Fase 05 - Roadmap de Despliegue y Releases](./05-roadmap/)
Estrategias de release de código, automatización y despliegue continuo.
*   📄 **[Estrategia de Versionamiento y Auditoría](./05-roadmap/versioning-and-audit-strategy.md)**: Gestión de tags y publicaciones mediante Nx Release.
