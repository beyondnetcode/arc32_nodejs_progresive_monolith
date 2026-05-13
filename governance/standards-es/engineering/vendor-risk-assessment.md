# EvaluaciÃ³n de Bloqueo de Proveedor (Vendor Lock-In) y Riesgo Financiero

## Estado
Aprobado

## Fecha
2026-05-10

## Contexto
A medida que el Sistema de Referencia adopta varios frameworks, bases de datos y herramientas de terceros, debemos evaluar continuamente las decisiones de **"Construir vs. Comprar"** para prevenir cargas financieras inesperadas, conflictos de licencias o el bloqueo del proveedor.

Este documento sirve como lÃ­nea base arquitectÃ³nica para evaluar el stack tecnolÃ³gico actual frente a la escalabilidad de costos, el cumplimiento de cÃ³digo abierto y el mantenimiento operativo.

---

## 1. Frameworks Core y Lenguajes
**Estado:** âœ… Riesgo Cero

El nÃºcleo de la aplicaciÃ³n estÃ¡ completamente aislado del bloqueo de proveedor gracias a la estricta adherencia a la Arquitectura Hexagonal ([ADR-0002](../../../architecture/adrs-es/nodejs/0002-clean-architecture-nestjs.md)).
* **TypeScript & Node.js**: CÃ³digo Abierto (Apache 2.0 / MIT).
* **NestJS**: CÃ³digo Abierto (MIT), framework empresarial altamente adoptado.
* **Nx Monorepo**: CÃ³digo Abierto (MIT). *Nota: Nx Cloud ofrece cachÃ© SaaS, pero el cachÃ© local es 100% gratuito.*

---

## 2. Riesgos de Infraestructura Identificados y Mitigaciones

### ðŸ›‘ Riesgo Financiero Alto: Proveedor de Identidad (IdP)
* **Contexto**: [ADR-0020](../../../architecture/adrs-es/core/0020-identity-provider-abstraction-strategy.md) abstrae el Proveedor de Identidad, permitiendo integraciones con soluciones SaaS como Auth0 o Azure Entra ID.
* **El Riesgo**: Las plataformas comerciales SaaS de Identidad facturan por Usuarios Activos Mensuales (MAU) o tokens M2M. A una alta escala B2C o B2B, los costos operativos pueden dispararse exponencialmente.
* **Estrategia de MitigaciÃ³n**: Si los costos de licencia se vuelven prohibitivos, el adaptador de infraestructura debe cambiarse a **Keycloak** (100% CÃ³digo Abierto y gratuito). Sin embargo, esto traslada el costo financiero de la licencia al mantenimiento de DevOps (escalado de Kubernetes, gestiÃ³n de base de datos).

### âš ï¸ Riesgo de Licenciamiento Medio: CachÃ© Distribuido Redis
* **Contexto**: [ADR-0014](../../../architecture/adrs-es/core/0014-distributed-caching-strategy-redis.md) impone Redis para el almacenamiento en cachÃ©.
* **El Riesgo**: Redis Inc. cambiÃ³ recientemente su licencia de BSD a RSALv2 (Fuente Disponible, no estrictamente CÃ³digo Abierto OSI). Aunque es gratuito para uso interno, plantea preocupaciones legales para el alojamiento de servicios gestionados.
* **Estrategia de MitigaciÃ³n**: En caso de requisitos estrictos de cumplimiento de cÃ³digo abierto o despliegue autohospedado ([ADR-0028](../../../architecture/adrs-es/core/0028-self-hosted-hybrid-infrastructure-on-premise.md)), el equipo de operaciones estÃ¡ autorizado a usar **Valkey** (el fork de CÃ³digo Abierto de Redis de la Linux Foundation) como un reemplazo directo.

### âš ï¸ Riesgo de Mantenimiento Medio: Motor de Feature Flags
* **Contexto**: [ADR-0017](../../../architecture/adrs-es/core/0017-feature-flagging-strategy.md) utiliza adaptadores de Infraestructura para Feature Flags (ej. Unleash, ConfigCat).
* **El Riesgo**: Las plataformas comerciales como LaunchDarkly o Unleash Enterprise tienen altas cuotas de suscripciÃ³n. La versiÃ³n gratuita y de cÃ³digo abierto de Unleash requiere autohospedaje.
* **Estrategia de MitigaciÃ³n**: El equipo del producto debe determinar si existe el ancho de banda de DevOps para alojar y mantener el servidor Unleash de cÃ³digo abierto. Si no, se debe asignar presupuesto para una alternativa SaaS rentable como ConfigCat. La base de cÃ³digo central no se verÃ¡ afectada debido al `IFeatureTogglePort`.

### ðŸŸ¢ Riesgo Bajo: Stack de Observabilidad
* **Contexto**: [ADR-0007](../../../architecture/adrs-es/nodejs/0007-observability-telemetry-loki-opentelemetry.md) utiliza el stack LGTM (Loki, Grafana, Tempo) y OpenTelemetry.
* **El Riesgo**: Grafana utiliza una licencia AGPLv3.
* **Estrategia de MitigaciÃ³n**: Mientras el equipo del Esqueleto de Referencia solo consuma Grafana internamente para monitorizaciÃ³n y no distribuya una versiÃ³n modificada del cÃ³digo fuente de Grafana como un producto comercial, el riesgo legal o financiero es cero.

---

## ConclusiÃ³n
La arquitectura actual del Esqueleto de Referencia ha sido diseÃ±ada deliberadamente para minimizar el bloqueo. Cualquier herramienta comercial (IdP, Feature Flags, Base de Datos) se mantiene completamente fuera de los lÃ­mites del dominio utilizando puertos y adaptadores, asegurando que el negocio pueda pivotar instantÃ¡neamente a alternativas de cÃ³digo abierto si los modelos de precios de los proveedores cambian.

---
[? Volver al Índice](./README.es.md)
