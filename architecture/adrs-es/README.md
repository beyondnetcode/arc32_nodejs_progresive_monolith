# ðŸ“œ Navegador de Registros de DecisiÃ³n ArquitectÃ³nica (ADR)

> ðŸŒ **NavegaciÃ³n BilingÃ¼e:** [ðŸ‡ºðŸ‡¸ English Version](../../architecture/adrs/README.md)

Bienvenido al repositorio legal del sistema. Todas las decisiones contenidas aquÃ­ han sido aprobadas por la Junta ArquitectÃ³nica Corporativa.

---

## <a name="universal-core"></a>ðŸŒ 1. NÃºcleo Universal (AgnÃ³stico al Runtime)
Decisiones aplicables a cualquier producto construido sobre el framework, independientemente del lenguaje.

*   [ADR 0001: OrquestaciÃ³n de Monorepo (Nx)](./core/0001-monorepo-orchestration-nx.md)
*   [ADR 0005: Calidad CI/CD (CodeQL)](./core/0005-ci-cd-quality-codeql.md)
*   [ADR 0006: Futuros Microservicios (Dapr)](./core/0006-future-microservices-transition-dapr.md)
*   [ADR 0009: FijaciÃ³n Estricta de Dependencias](./core/0009-strict-dependency-pinning-vulnerability-management.md)
*   [ADR 0010: Estrategia Multi-Tenancy RLS](./core/0010-multi-tenancy-architecture-strategy.md)
*   [ADR 0011: Patrones de Resiliencia](./core/0011-fault-tolerance-resiliency-patterns.md)
*   [ADR 0013: TopologÃ­a Cloud & DR](./core/0013-cloud-infrastructure-topology-dr.md)
*   [ADR 0014: CachÃ© Distribuido (Redis)](./core/0014-distributed-caching-strategy-redis.md)
*   [ADR 0015: Bus de Eventos Inyectable](./core/0015-event-driven-architecture-intra-domain.md)
*   [ADR 0016: Pista de AuditorÃ­a Inmutable](./core/0016-immutable-business-audit-trail.md)
*   [ADR 0017: Estrategia de Feature Flagging](./core/0017-feature-flagging-strategy.md)
*   [ADR 0018: TeorÃ­a de la PirÃ¡mide de Pruebas](./core/0018-testing-pyramid-quality-gates.md)
*   [ADR 0019: DiseÃ±o Funcional TÃ¡ctico](./core/0019-tactical-design-patterns-future-proofing.md)
*   [ADR 0020: AbstracciÃ³n de IdP](./core/0020-identity-provider-abstraction-strategy.md)
*   [ADR 0024: Plataforma de ConfiguraciÃ³n y CaracterÃ­sticas](./core/0024-configuration-feature-management-platform.md)
*   [ADR 0025: AbstracciÃ³n de Proveedor de Feature Flags](./core/0025-feature-flag-provider-abstraction.md)
*   [ADR 0028: Infraestructura OSS Autohospedada](./core/0028-self-hosted-hybrid-infrastructure-on-premise.md)
*   [ADR 0030: API Gateway (Kong vs Nest)](./core/0030-api-gateway-kong-vs-nestjs.md)
*   [ADR 0031: Esquema Aislado Por Contexto](./core/0031-schema-per-context-domain-event-catalog.md)
*   [ADR 0032: Matriz de SelecciÃ³n de Protocolo](./core/0032-api-protocol-decision-matrix-rest-grpc-graphql.md)
*   [ADR 0033: Outbox Transaccional](./core/0033-transactional-outbox-pattern.md)
*   [ADR 0034: Aplicabilidad de CQRS](./core/0034-cqrs-pattern-applicability-matrix.md)
*   [ADR 0035: Sagas Distribuidas](./core/0035-distributed-saga-pattern-strategy.md)
*   [ADR 0036: Estrategia de Entrega del Bus de Mensajes](./core/0036-message-bus-delivery-strategy-fifo-dlq.md)
*   [ADR 0037: Rendimiento & VerificaciÃ³n del Caos](./core/0037-performance-concurrency-chaos-strategy.md)
*   [ADR 0039: Conmutador de TopologÃ­a de Despliegue](./core/0039-deployment-topology-abstraction-switcher.md)
*   **[ADR 0040: Matriz Multi-Runtime & Contratos](./core/0040-multi-runtime-selection-contracts.md)** *(Gobernanza RaÃ­z)*
*   [ADR 0044: Estrategia de Persistencia de Seguridad Configurable](./core/0044-configurable-security-persistence-strategy.md)
*   [ADR 0045: Criterios de AceptaciÃ³n para ExtracciÃ³n de Microservicios](./core/0045-microservice-extraction-readiness-criteria.md)
*   [ADR 0046: AdopciÃ³n de Dapr y Observabilidad Unificada](./core/0046-dapr-observabilidad-unificada.md)
*   [ADR 0047: Marco de Selección: Monolito vs SOA vs Microservicios](./core/0047-architectural-patterns-monolith-soa-microservices.md)
*   [ADR 0048: Taxonomía Empresarial y BMAD-METHOD](./core/0048-enterprise-taxonomy-bmad-method.md)
*   [ADR 0049: Estándares de Semántica y Nomenclatura Clean Code](./core/0049-naming-semantics-clean-code-policy.md)
*   [ADR 0050: Estandarización de la Estrategia de Ramas Gitflow](./core/0050-estrategia-ramas-gitflow.md)

---

## <a name="nodejs-typescript"></a>ðŸŸ¢ 2. Ecosistema Node.js / TypeScript
Decisiones vinculadas al runtime primario para APIs y BFFs.

*   [ADR 0002: Arquitectura Limpia NestJS](./nodejs/0002-clean-architecture-nestjs.md)
*   [ADR 0003: EstÃ¡ndares TS Estrictos](./nodejs/0003-strict-typescript-standards.md)
*   [ADR 0004: Resiliencia Offline del Frontend](./nodejs/0004-frontend-offline-resilience.md)
*   [ADR 0007: Observabilidad TelemetrÃ­a OTel](./nodejs/0007-observability-telemetry-loki-opentelemetry.md)
*   [ADR 0008: EvoluciÃ³n Progresiva del BFF](./nodejs/0008-progressive-multimodule-evolution-gateway-bff.md)
*   [ADR 0012: Guardias Auth RBAC/ABAC](./nodejs/0012-advanced-authorization-rbac-abac.md)
*   [ADR 0021: CompilaciÃ³n de Grafo Auth](./nodejs/0021-high-performance-auth-and-graph-compilation.md)
*   [ADR 0022: Proyecciones Contextuales](./nodejs/0022-contextual-auth-and-pluggable-projections.md)
*   [ADR 0023: LÃ­mite de Kernel Centralizado](./nodejs/0023-centralized-TODO-vs-decentralized-access.md)
*   [ADR 0026: ImplementaciÃ³n Adaptativa de MFA](./nodejs/0026-mfa-passwordless-adaptive-authentication.md)
*   [ADR 0027: ConfiguraciÃ³n Node de Protocolo Dual](./nodejs/0027-dual-protocol-rest-grpc-api-gateway.md)
*   [ADR 0029: Primitivas DDD TÃ¡cticas](./nodejs/0029-tactical-ddd-primitives-library.md)
*   [ADR 0038: ImplementaciÃ³n TS del PatrÃ³n Result](./nodejs/0038-error-handling-result-pattern-strategy.md)
*   [ADR 0043: Estrategia de Acceso a Datos y ORM](./nodejs/0043-data-access-orm-strategy.md)

---

## <a name="net-c"></a>ðŸ”µ 3. Ecosistema .NET (C#)
Decisiones vinculadas a runtimes de alto cÃ³mputo.

*   **[ADR 0041: Arquitectura de Backend CanÃ³nica .NET](./dotnet/0041-canonical-dotnet-backend-architecture.md)**
*   [ADR 0048: Estrategia de Endpoints en APIs .NET](./dotnet/0048-enterprise-minimal-apis-adoption.md)

---

## <a name="android-native"></a>ðŸŸ£ 4. Ecosistema Nativo Android (Kotlin)
Decisiones vinculadas a clientes mÃ³viles resilientes.

*   **[ADR 0042: Arquitectura CanÃ³nica MÃ³vil Android](./android/0042-canonical-android-mobile-architecture.md)**

---

## ADRs para Arquitectura Aumentada por IA (SecciÃ³n Opcional)

| ID | TÃ­tulo | Estado |
|----|--------|--------|
| ADR-AI-001 | Harness Engineering como estÃ¡ndar agÃ©ntico | Propuesto |
| ADR-AI-002 | MCP como protocolo de integraciÃ³n agente-servicio | Propuesto |
| ADR-AI-003 | Criterios de selecciÃ³n y gobernanza de modelos | Propuesto |
| ADR-AI-004 | AGENTS.md como artefacto obligatorio (nivel 1+) | Propuesto |
| ADR-AI-005 | PolÃ­tica de Human-in-the-Loop para operaciones irreversibles | Propuesto |

ðŸ‘‰ [Ver todos los ADRs de IA](../../governance/standards-es/ai-augmented/06-adrs/README.md)

---
[? Volver al Nivel Superior](../README.es.md)
