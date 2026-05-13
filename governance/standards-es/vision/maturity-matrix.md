# Modelo de Madurez de Arquitectura del Esqueleto de Referencia (AMM)

## Referencia del Framework: TOGAF ACMM & Well-Architected Framework

## Estado
Aprobado

## Fecha
2026-05-10

## Contexto y PropÃ³sito
Como Director TÃ©cnico y Arquitecto Empresarial, es crÃ­tico medir la calidad objetiva y la evoluciÃ³n del Sistema de Referencia utilizando estÃ¡ndares internacionalmente reconocidos.

Este documento de evaluaciÃ³n aprovecha un marco hÃ­brido combinando el **TOGAF Architecture Capability Maturity Model (ACMM)** (para la madurez de procesos empresariales y gobernanza) y el **Cloud Well-Architected Framework (WAF)** (para la madurez tÃ©cnica y nativa de la nube en pilares como Seguridad, Fiabilidad y Excelencia Operativa).

---

## 1. DefiniciÃ³n de Niveles de Madurez (Basado en TOGAF ACMM)

Evaluamos el Esqueleto de Referencia a travÃ©s de 5 niveles estÃ¡ndar de madurez:

*   **Nivel 1: Inicial (Ad-Hoc)** - Sin arquitectura formal. Los procesos de TI son caÃ³ticos, no documentados y reactivos.
*   **Nivel 2: Bajo Desarrollo** - El proceso de arquitectura bÃ¡sico estÃ¡ en marcha. Existen algunos estÃ¡ndares pero no se aplican de manera consistente.
*   **Nivel 3: Definido** - La arquitectura estÃ¡ bien definida, documentada (C4 Model, ADRs) e integrada en el SDLC.
*   **Nivel 4: Gestionado** - La arquitectura se mide cuantitativamente (CodeQL, Sonar, Cobertura) y se gobierna automÃ¡ticamente.
*   **Nivel 5: Optimizado** - Mejora continua de la arquitectura (evoluciÃ³n de Dapr, desacoplamiento progresivo, auto-escalado).

---

## 2. EvaluaciÃ³n de Madurez Actual del Esqueleto de Referencia (Pilares Well-Architected)

Evaluamos la arquitectura del Esqueleto de Referencia frente a los 5 pilares crÃ­ticos del Well-Architected Framework.

### ðŸ›¡ï¸ Pilar 1: Seguridad y Cumplimiento
**Nivel de Madurez Actual: 4 (Gestionado)**
*   **Evidencia**: 
    *   Pipeline de Seguridad Cero-Costo implementado vÃ­a CodeQL ([ADR-0005](../../../architecture/adrs-es/core/0005-ci-cd-quality-codeql.md)).
    *   FijaciÃ³n Estricta de Dependencias previene ataques a la Cadena de Suministro ([ADR-0009](../../../architecture/adrs-es/core/0009-strict-dependency-pinning-vulnerability-management.md)).
    *   Aislamiento de Datos impuesto a nivel de BD usando Row-Level Security (RLS) para multi-tenancy ([ADR-0010](../../../architecture/adrs-es/core/0010-multi-tenancy-architecture-strategy.md)).
    *   Pistas de AuditorÃ­a Inmutables vÃ­a CDC ([ADR-0016](../../../architecture/adrs-es/core/0016-immutable-business-audit-trail.md)).
*   **Camino al Nivel 5**: Implementar pruebas de penetraciÃ³n automatizadas en CI y rotaciÃ³n dinÃ¡mica de secretos a travÃ©s de HashiCorp Vault.

### âš¡ Pilar 2: Eficiencia de Rendimiento
**Nivel de Madurez Actual: 4 (Gestionado)**
*   **Evidencia**: 
    *   CompilaciÃ³n de GrÃ¡ficos de AutorizaciÃ³n de Alto Rendimiento bajo <5ms usando Redis ([ADR-0021](../../../architecture/adrs-es/nodejs/0021-high-performance-auth-and-graph-compilation.md)).
    *   Estrategia de Protocolo Dual (REST para pÃºblico, gRPC para velocidad interna) ([ADR-0027](../../../architecture/adrs-es/nodejs/0027-dual-protocol-rest-grpc-api-gateway.md)).
    *   Cargas optimizadas para Frontend a travÃ©s del Gateway BFF ([ADR-0008](../../../architecture/adrs-es/nodejs/0008-progressive-multimodule-evolution-gateway-bff.md)).
*   **Camino al Nivel 5**: Implementar auto-escalado serverless y algoritmos de cachÃ© predictiva.

### ðŸ”„ Pilar 3: Fiabilidad y Resiliencia
**Nivel de Madurez Actual: 3 (Definido) -> Avanzando al 4**
*   **Evidencia**: 
    *   Resiliencia Offline en Frontend vÃ­a React Query ([ADR-0004](../../../architecture/adrs-es/nodejs/0004-frontend-offline-resilience.md)).
    *   Tolerancia a Fallos vÃ­a Circuit Breakers (`opossum`) y Reintentos ([ADR-0011](../../../architecture/adrs-es/core/0011-fault-tolerance-resiliency-patterns.md)).
    *   LÃ­mites de DR Multi-RegiÃ³n para Infraestructura Cloud propuestos ([ADR-0013](../../../architecture/adrs-es/core/0013-cloud-infrastructure-topology-dr.md)).
*   **Camino al Nivel 5**: Ejecutar simulacros regulares de IngenierÃ­a del Caos (Chaos Monkey) y despliegue multi-regiÃ³n completamente activo-activo.

### ðŸ› ï¸ Pilar 4: Excelencia Operativa
**Nivel de Madurez Actual: 4 (Gestionado)**
*   **Evidencia**: 
    *   OrquestaciÃ³n de Monorepo vÃ­a Nx asegura builds deterministas ([ADR-0001](../../../architecture/adrs-es/core/0001-monorepo-orchestration-nx.md)).
    *   TelemetrÃ­a Completa usando LGTM y OpenTelemetry ([ADR-0007](../../../architecture/adrs-es/nodejs/0007-observability-telemetry-loki-opentelemetry.md)).
    *   Uso de Feature Flags permite desacoplar el despliegue de la liberaciÃ³n ([ADR-0017](../../../architecture/adrs-es/core/0017-feature-flagging-strategy.md)).
    *   Puertas de Calidad imponen >70% de cobertura de pruebas estrictamente vÃ­a CI ([ADR-0018](../../../architecture/adrs-es/core/0018-testing-pyramid-quality-gates.md)).
*   **Camino al Nivel 5**: Lograr despliegues automatizados Blue/Green totalmente autÃ³nomos y sin tiempo de inactividad, con detecciÃ³n de anomalÃ­as impulsada por IA en los logs.

### ðŸ—ï¸ Pilar 5: Mantenibilidad y Extensibilidad (Arquitectura Limpia)
**Nivel de Madurez Actual: 4 (Gestionado)**
*   **Evidencia**: 
    *   LÃ­mites Hexagonales estrictos desacoplando el nÃºcleo de la infraestructura ([ADR-0002](../../../architecture/adrs-es/nodejs/0002-clean-architecture-nestjs.md)).
    *   Patrones de DiseÃ±o TÃ¡ctico (MÃ³nada Result) blindando el futuro del core ([ADR-0019](../../../architecture/adrs-es/core/0019-tactical-design-patterns-future-proofing.md)).
    *   Arquitectura Dirigida por Eventos desacoplando mÃ³dulos de dominio ([ADR-0015](../../../architecture/adrs-es/core/0015-event-driven-architecture-intra-domain.md)).
    *   Estrategias de mitigaciÃ³n de Vendor Lock-In claramente definidas (Feature Flags, IdPs).
*   **Camino al Nivel 5**: TransiciÃ³n fluida de Monolito Modular a Microservicios Dapr con cero cambios en el cÃ³digo de dominio ([ADR-0006](../../../architecture/adrs-es/core/0006-future-microservices-transition-dapr.md)).

---

## 3. Resumen Ejecutivo y CalificaciÃ³n

Basado en los criterios TOGAF ACMM aplicados a nuestra arquitectura actual impulsada por BMAD-METHOD:

**PuntuaciÃ³n Global de Madurez ArquitectÃ³nica del Esqueleto de Referencia: 3.8 / 5.0 (De Definido a Gestionado)**

La arquitectura del Esqueleto de Referencia estÃ¡ actualmente en transiciÃ³n de un sistema perfectamente documentado (Nivel 3) a un sistema totalmente automatizado y gobernado (Nivel 4). La aplicaciÃ³n estricta de ADRs, lÃ­mites estÃ¡ticos (`eslint-plugin-boundaries`), y puertas de calidad CI/CD asegura que el sistema no se degrade en deuda tÃ©cnica.

Para alcanzar el **Nivel 5 (Optimizado)**, la organizaciÃ³n de ingenierÃ­a debe centrarse en la IngenierÃ­a del Caos, despliegues Multi-RegiÃ³n Activo-Activo, y la eventual divisiÃ³n en microservicios Dapr a medida que la carga operativa lo demande.

---

## DimensiÃ³n AI-Augmented (Opcional)

Para productos que adoptan la secciÃ³n AI-Augmented, existe una matriz de madurez
complementaria con 3 niveles: AI-Assisted, AI-Integrated, AI-Orchestrated.

â†’ [Ver matriz de madurez AI](../ai-augmented/07-maturity-model/ai-maturity-matrix.md)

---
[? Volver al Índice](./README.es.md)
