# ðŸ›ï¸ Arquitectura de Referencia Corporativa (Multi-Runtime / arc42)

> [!IMPORTANT]
> **Blueprint de Referencia Corporativo Unificado**: Este documento define el estÃ¡ndar global para la arquitectura de software en toda la organizaciÃ³n. Si bien la implementaciÃ³n fÃ­sica canÃ³nica utiliza Node.js, las restricciones arquitectÃ³nicas y los principios de diseÃ±o son agnÃ³sticos y aplicables a los entornos de ejecuciÃ³n aprobados (.NET / Android) para diversas cargas de trabajo.

---

## 1. IntroducciÃ³n y Metas

Esta arquitectura de referencia proporciona un plano estandarizado para construir sistemas modernos y altamente escalables.

### 1.1 PropÃ³sito y Aplicabilidad
Este patrÃ³n estÃ¡ diseÃ±ado especÃ­ficamente para sistemas que:
*   Tienen una fuerte orientaciÃ³n hacia la **utilizaciÃ³n intensiva de APIs** con clientes multi-canal (Web, MÃ³vil, B2B).
*   Requieren **aislamiento SaaS multi-tenant** nativo a nivel del motor de base de datos ([ADR-0010](../adrs-es/core/0010-multi-tenancy-architecture-strategy.md)).
*   Deben soportar una **evoluciÃ³n progresiva** desde un Monolito Modular hacia Microservicios Distribuidos.

> [!IMPORTANT]
> **Canon de EvoluciÃ³n Progresiva**: La arquitectura evoluciona en complejidad incremental. La Fase 1 es deliberadamente simple y no exige tecnologÃ­as, patrones o procesos que excedan las necesidades de un monolito modular. Cada requisito adicional se introduce en la fase donde la arquitectura lo justifica objetivamente, no antes.

### 1.2 Estrategia Corporativa Multi-Runtime (PolÃ­glota)
La organizaciÃ³n promueve una arquitectura polÃ­glota deliberada donde los entornos de ejecuciÃ³n se eligen estrictamente en funciÃ³n de la idoneidad para la carga de trabajo, validados vÃ­a ADR:

| Runtime | Rol CanÃ³nico | Caso de Uso TÃ­pico |
| :--- | :--- | :--- |
| **Node.js / TypeScript** | Runtime Principal | APIs REST/gRPC, OrquestaciÃ³n BFF, Servicios Web Transaccionales, Frontend SSR. |
| **.NET (C#)** | Alto Procesamiento | ComputaciÃ³n por lotes, pipelines ETL, Tareas computacionales pesadas, interoperabilidad Legada. |
| **Android (Kotlin/Java)** | Cliente MÃ³vil Nativo | Apps operativas industriales, captura offline, integraciÃ³n de hardware de escaneo/GPS. |

> **Regla de Contratos**: La comunicaciÃ³n entre distintos runtimes DEBE utilizar estrictamente definiciones de contrato explÃ­citas y versionadas (OpenAPI para HTTP, Protobuf para gRPC, AsyncAPI para MensajerÃ­a) garantizando absoluta opacidad de la implementaciÃ³n.

### 1.3 Atributos de Calidad Obligatorios
| Atributo de Calidad | Origen ADR | Objetivo |
| :--- | :--- | :--- |
| **EvoluciÃ³n Progresiva** | [ADR-0006](../adrs-es/core/0006-future-microservices-transition-dapr.md), [ADR-0008](../adrs-es/nodejs/0008-progressive-multimodule-evolution-gateway-bff.md) | Camino de cero refactorizaciÃ³n hacia microservicios vÃ­a Dapr |
| **Multi-Tenancy SaaS** | [ADR-0010](../adrs-es/core/0010-multi-tenancy-architecture-strategy.md) | Aislamiento de Doble Capa (ORM + PostgreSQL RLS) |
| **Desacoplamiento Estricto** | [ADR-0002](../adrs-es/nodejs/0002-clean-architecture-nestjs.md), [ADR-0003](../adrs-es/nodejs/0003-strict-typescript-standards.md) | AplicaciÃ³n de lÃ­mites vÃ­a ESLint |
| **Resiliencia** | [ADR-0011](../adrs-es/core/0011-fault-tolerance-resiliency-patterns.md) | Circuit Breakers Distribuidos (Redis + Kong) |
| **Seguridad** | [ADR-0005](../adrs-es/core/0005-ci-cd-quality-codeql.md), [ADR-0012](../adrs-es/nodejs/0012-advanced-authorization-rbac-abac.md), [ADR-0020](../adrs-es/core/0020-identity-provider-abstraction-strategy.md), [ADR-0026](../adrs-es/nodejs/0026-mfa-passwordless-adaptive-authentication.md) | PerÃ­metro Zero-trust + RBAC/ABAC |
| **Latencia de API Interna** | [ADR-0014](../adrs-es/core/0014-distributed-caching-strategy-redis.md), [ADR-0021](../adrs-es/nodejs/0021-high-performance-auth-and-graph-compilation.md) | CachÃ© de 4 Niveles (Cliente + CDN + BFF + Core) |
| **Observabilidad** | [ADR-0007](../adrs-es/nodejs/0007-observability-telemetry-loki-opentelemetry.md), [ADR-0046](../adrs-es/core/0046-dapr-observabilidad-unificada.md) | OTel + Loki + trazado distribuido |
| **AuditorÃ­a Inmutable** | [ADR-0016](../adrs-es/core/0016-immutable-business-audit-trail.md) | Registro de auditorÃ­a de solo adiciÃ³n |
| **SoberanÃ­a TecnolÃ³gica** | [ADR-0002](../adrs-es/nodejs/0002-clean-architecture-nestjs.md), [ADR-0028](../adrs-es/core/0028-self-hosted-hybrid-infrastructure-on-premise.md) | Infra/AOP 100% intercambiable sin impacto en la lÃ³gica |

#### ðŸ” Marcos EstratÃ©gicos Complementarios
Para comprender profundamente la postura matemÃ¡tica y de riesgo de esta arquitectura, consulte:
*   ðŸ‘‰ **[EvaluaciÃ³n de Madurez y Patrones de DiseÃ±o](../vision/maturity-evaluation.md)**
*   ðŸ‘‰ **[AnÃ¡lisis EstratÃ©gico del Teorema CAP](./cap-strategic-analysis.md)**
*   ðŸ‘‰ **[Escenarios de Despliegue Multi-Cloud](./multi-cloud-deployment-scenarios.md)**

---

## 2. Restricciones de Arquitectura y Pilares Base

Cualquier sistema basado en este blueprint debe adherirse a los siguientes pilares no negociables:

*   **Gobernanza del Stack ([ADR-0001](../adrs-es/core/0001-monorepo-orchestration-nx.md))**: Nx Monorepo + npm Workspaces para una gobernanza centralizada de dependencias.
*   **Mandato de IngenierÃ­a BMAD-METHOD ([ADR-0002](../adrs-es/nodejs/0002-clean-architecture-nestjs.md), [ADR-0003](../adrs-es/nodejs/0003-strict-typescript-standards.md))**: SOLID, CÃ³digo Limpio, Arquitectura Hexagonal (Puertos/Adaptadores simples obligatorios), TypeScript estricto.
*   **Seguridad de Dependencias ([ADR-0009](../adrs-es/core/0009-strict-dependency-pinning-vulnerability-management.md))**: Todas las versiones de dependencias fijadas. Sin rangos `^` o `~`. Escaneo automatizado de vulnerabilidades en CI.
*   **Puertas de Calidad ([ADR-0018](../adrs-es/core/0018-testing-pyramid-quality-gates.md))**: PirÃ¡mide de pruebas automatizada. MÃ­nimo 70% de cobertura obligatoria en CI.
*   **Portabilidad de Infraestructura ([ADR-0028](../adrs-es/core/0028-self-hosted-hybrid-infrastructure-on-premise.md))**: Prioridad de OSS autohospedado (MinIO, RabbitMQ, Vault) sobre el bloqueo de nube.

---

## 3. Contexto y Alcance (Modelo Operativo)

### 3.1 PatrÃ³n de Contexto General â€” Stack Completo con Niveles de Gateway y Bus de Eventos Inyectable

Este diagrama captura el contexto completo del sistema. Refleja:
- **[ADR-0030](../adrs-es/core/0030-api-gateway-kong-vs-nestjs.md)**: Gateway de Dos Niveles (Kong Edge + NestJS BFF)
- **[ADR-0008](../adrs-es/nodejs/0008-progressive-multimodule-evolution-gateway-bff.md)**: EvoluciÃ³n Progresiva Multi-MÃ³dulo con BFF dedicado por canal de cliente
- **[ADR-0015](../adrs-es/core/0015-event-driven-architecture-intra-domain.md)**: AbstracciÃ³n Inyectable `IEventBusPort` (En Memoria â†’ RabbitMQ â†’ Kafka)
- **[ADR-0020](../adrs-es/core/0020-identity-provider-abstraction-strategy.md)**: Proveedor de Identidad Conectable vÃ­a PatrÃ³n Strategy
- **[ADR-0007](../adrs-es/nodejs/0007-observability-telemetry-loki-opentelemetry.md)**: Trazado OpenTelemetry en todos los niveles

```mermaid
graph TD
    subgraph Clients["Capa de Canales â€” Aplicaciones Cliente"]
        WebApp["Web App\n[CachÃ© React Query Â· ADR-0004]"]
        MobileApp["Mobile App\n[Persistencia Offline Â· ADR-0004]"]
        B2B["Socio B2B (gRPC / Clave API REST)"]
    end

    subgraph NetEdge["Borde de Red (Opcional)"]
        CDN["CDN (Content Delivery Network)\n[CachÃ© Multi-Capa Â· ADR-0014]"]
    end

    subgraph Tier1["Tier 1 â€” Edge API Gateway (ADR-0030)"]
        Kong["Kong OSS\n[LÃ­mites de Tasa Â· ValidaciÃ³n JWT Â· CORS Â· Enrutamiento]"]
    end

    subgraph Tier2["Tier 2 â€” Capa de OrquestaciÃ³n BFF (ADR-0008)"]
        WebBFF["NestJS Web BFF\n[AgregaciÃ³n Â· CachÃ© BFF]"]
        MobileBFF["NestJS Mobile BFF\n[Respuestas Compactas Â· CachÃ© BFF]"]
        CoreAPI["NestJS Core API\n[Dominio Hexagonal Â· RBAC/ABAC]"]
    end

    subgraph ExternalIntegrations["Capa de IntegraciÃ³n Externa"]
        IdP["IdP Federado (Auth0 / Entra ID)\n[ADR-0020, ADR-0026]"]
        
        subgraph EventBusAbstraction["Bus de Eventos Inyectable (ADR-0015, ADR-0031)"]
            IBusPort["Â«PortÂ» IEventBusPort"]
            InMemory["En-Memoria (Dev/Test)"]
            RabbitMQ["RabbitMQ (ProducciÃ³n)"]
            Kafka["Kafka (Alta Escala)"]
            IBusPort -.->|Impl| InMemory
            IBusPort -.->|Impl| RabbitMQ
            IBusPort -.->|Impl| Kafka
        end
    end

    subgraph ObsLayer["Observabilidad (ADR-0007)"]
        OTel["Coleccionista OpenTelemetry"]
        Loki["Grafana Loki (Logs)"]
        Jaeger["Jaeger (Trazas)"]
        OTel --> Loki
        OTel --> Jaeger
    end

    WebApp & MobileApp & B2B -->|TLS/HTTP| CDN
    CDN -->|ReenvÃ­o DinÃ¡mico| Kong

    Kong -->|Ruta| WebBFF
    Kong -->|Ruta| MobileBFF
    Kong -->|Ruta B2B| CoreAPI

    WebBFF -->|gRPC Interno| CoreAPI
    MobileBFF -->|gRPC Interno| CoreAPI

    CoreAPI -->|Validar Claims| IdP
    CoreAPI -->|Publicar Eventos| IBusPort

    CoreAPI -.->|Trazas + Logs| OTel
    WebBFF -.->|Trazas + Logs| OTel
    Kong -.->|Logs de Acceso| OTel
```

---

## 4. Estrategia de SoluciÃ³n

### 4.1 Arquitectura Hexagonal â€” Puertos y Adaptadores ([ADR-0002](../adrs-es/nodejs/0002-clean-architecture-nestjs.md))
Toda la lÃ³gica de negocio en las capas de Dominio y AplicaciÃ³n tiene **cero dependencias en tiempo de ejecuciÃ³n** de frameworks, ORMs o servicios en la nube. La capa de infraestructura implementa Puertos de TypeScript puros.

### 4.2 Estrategia de Multi-Tenancy SaaS ([ADR-0010](../adrs-es/core/0010-multi-tenancy-architecture-strategy.md))
Emplea **Defensa de Aislamiento de Doble Capa**. (Capa 1) Los adaptadores de persistencia aÃ±aden automÃ¡ticamente el filtro `tenant_id` a las consultas genÃ©ricas. (Capa 2) Las polÃ­ticas de **Row-Level Security (RLS)** de PostgreSQL compartido imponen una contenciÃ³n estricta de la sesiÃ³n a nivel del motor SQL como mecanismo infalible absoluto.

### 4.3 PatrÃ³n de Gateway de Dos Niveles ([ADR-0030](../adrs-es/core/0030-api-gateway-kong-vs-nestjs.md))
| Nivel | TecnologÃ­a | Responsabilidad |
| :--- | :--- | :--- |
| **Tier 1 â€” Edge** | Kong OSS (NGINX/OpenResty) | Rate Limiting, validaciÃ³n JWT, terminaciÃ³n SSL, Enrutamiento |
| **Tier 2 â€” BFF** | NestJS | AgregaciÃ³n de datos, formateo de cargas Ãºtiles, lÃ³gica especÃ­fica del cliente |

### 4.4 Bus de Eventos Inyectable ([ADR-0015](../adrs-es/core/0015-event-driven-architecture-intra-domain.md))
El dominio nunca importa un brÃ³ker de mensajes concreto. Toda la comunicaciÃ³n asÃ­ncrona se enruta a travÃ©s de `IEventBusPort`. La implementaciÃ³n concreta (En Memoria / RabbitMQ / Kafka) es inyectada por el contenedor DI de NestJS al inicio, controlada por una variable de entorno.

### 4.5 Ruta de EvoluciÃ³n Progresiva ([ADR-0006](../adrs-es/core/0006-future-microservices-transition-dapr.md))
1.  **Hito 1 â€” Monolito Modular**: Proceso Ãºnico, mÃ³dulos de dominio lÃ³gicamente aislados.
2.  **Hito 2 â€” ExtracciÃ³n de Servicios**: Dominios crÃ­ticos extraÃ­dos como microproyectos Nx con BDs aisladas, consumidos vÃ­a gRPC/Dapr.
3.  **Hito 3 â€” Malla Completa de Microservicios**: Dapr Sidecars, Malla de Servicios, Kong como superficie de API unificada.

---

## 5. Bloques de ConstrucciÃ³n TÃ©cnica â€” Vista Completa de Contenedores

Este diagrama de Contenedor Nivel-2 de C4 refleja **todos los ADRs activos** en sus posiciones fÃ­sicas de tiempo de ejecuciÃ³n.

```mermaid
graph TD
    subgraph ClientLayer["Capa de Canales de Cliente (ADR-0004)"]
        WebApp["Web App\n[React Query / Stale-While-Revalidate]"]
        MobileApp["Mobile App\n[Almacenamiento Offline Nativo]"]
        B2BClient["Cliente B2B (Clave API)"]
    end

    subgraph EdgeNet["Red Nivel 0: CachÃ© EstÃ¡tica"]
        CDN["CDN (Content Delivery Network)\n[Cloudflare / Akamai / Opcional]"]
    end

    subgraph GatewayTier["Niveles de Gateway (ADR-0030, ADR-0008, ADR-0027, ADR-0032)"]
        Kong["Gateway Edge Kong OSS\n[Rate Limiting Â· SSL Â· JWT Â· CORS]"]
        WebBFF["NestJS Web BFF\n[REST/GraphQL + CachÃ© Multi-Capa]"]
        MobileBFF["NestJS Mobile BFF\n[Cargas Compactas + CachÃ© Multi-Capa]"]
    end

    subgraph CoreTier["Nivel de AplicaciÃ³n Core (ADR-0002, ADR-0012, ADR-0016, ADR-0019, ADR-0029)"]
        CoreAPI["NestJS Core API\nHexagonal + AuditorÃ­a + UnitOfWork"]
        FeatureFlags["Motor de Feature Flags\n[ADR-0017, ADR-0025]"]
        ConfigPlatform["Plataforma de ConfiguraciÃ³n\n[ADR-0024]"]
    end

    subgraph PersistenceTier["Nivel de Persistencia (ADR-0014, ADR-0022)"]
        PgSQL[("PostgreSQL 16\n[Dual-Layer RLS Â· ADR-0010]")]
        Redis[("ClÃºster Distribuido Redis\n[CachÃ© Escalonada Multi-Capa Â· ADR-0014]")]
        AuditLog[("Registro AuditorÃ­a (Append-Only)\n[ADR-0016]")]
    end

    subgraph MessagingTier["Nivel MensajerÃ­a AsÃ­ncrona (ADR-0015, ADR-0031)"]
        IBusPort["Â«PortÂ» IEventBusPort"]
        InMemoryBus["Bus En-Memoria\n(Dev/Test)"]
        RabbitMQBus["RabbitMQ\n(ProducciÃ³n)"]
        IBusPort -.->|Impl| InMemoryBus
        IBusPort -.->|Impl| RabbitMQBus
    end

    subgraph SecurityTier["Nivel de Seguridad (ADR-0020, ADR-0026, ADR-0021)"]
        IdP["Adaptador IdP Conectable\n[Auth0 / Entra / Zitadel]"]
        AuthGraph["Motor GrÃ¡fico de AutorizaciÃ³n\n[RBAC/ABAC < 5ms Â· ADR-0021]"]
        MFA["Motor MFA / Passkeys\n[WebAuthn Â· ADR-0026]"]
    end

    subgraph ObservabilityTier["Nivel de Observabilidad (ADR-0007)"]
        OTel["Coleccionista OTel"]
        Loki["Grafana Loki"]
        Jaeger["Trazado Jaeger"]
        OTel --> Loki & Jaeger
    end

    subgraph InfraTier["Infraestructura OSS Autohospedada (ADR-0028)"]
        Vault["HashiCorp Vault\n[GestiÃ³n de Secretos]"]
        MinIO["MinIO\n[Almacenamiento de Objetos]"]
    end

    WebApp & MobileApp & B2BClient -->|TLS/HTTP| CDN
    CDN -->|Peticiones de Origen| Kong
    Kong -->|Ruta| WebBFF & MobileBFF & CoreAPI

    WebBFF & MobileBFF -->|gRPC| CoreAPI
    WebBFF & MobileBFF <-->|Lecturas CachÃ© BFF| Redis
    CoreAPI <-->|Lecturas CachÃ© Core| Redis

    CoreAPI -->|SQL/Dual-Layer RLS| PgSQL
    CoreAPI --> PgSQL & AuditLog
    CoreAPI --> IBusPort
    CoreAPI --> AuthGraph
    CoreAPI --> FeatureFlags
    CoreAPI --> ConfigPlatform

    AuthGraph --> IdP
    AuthGraph --> MFA
    IdP --> PgSQL

    CoreAPI -.-> OTel
    Kong -.-> OTel
    WebBFF -.-> OTel

    CoreAPI --> Vault
    CoreAPI --> MinIO
```

---

## 6. Vista de Tiempo de EjecuciÃ³n â€” Patrones de Flujo de PeticiÃ³n

### 6.1 Flujo de PeticiÃ³n Autenticada ([ADR-0030](../adrs-es/core/0030-api-gateway-kong-vs-nestjs.md), [ADR-0008](../adrs-es/nodejs/0008-progressive-multimodule-evolution-gateway-bff.md), [ADR-0021](../adrs-es/nodejs/0021-high-performance-auth-and-graph-compilation.md), [ADR-0014](../adrs-es/core/0014-distributed-caching-strategy-redis.md))

```mermaid
sequenceDiagram
    autonumber
    participant C as Web App
    participant CL as CachÃ© Cliente (ADR-0004)
    participant CDN as CDN (Capa 1)
    participant B as NestJS BFF (Capa 2)
    participant R as Redis Distribuido
    participant A as Core API (Capa 3)
    participant D as PostgreSQL (RLS)

    C->>CL: Consultar Estado (React Query)
    alt Acierto de CachÃ© (Renderizado Inmediato)
        CL-->>C: Datos (Stale-While-Revalidate)
    end
    C->>CDN: PeticiÃ³n HTTPS (Fetch/ActualizaciÃ³n en Segundo Plano)
    alt Acierto CDN
        CDN-->>C: Devolver Contenido EstÃ¡tico
    else Fallo CDN
        CDN->>B: Reenviar PeticiÃ³n a Origen
        B->>R: BÃºsqueda en CachÃ© BFF (Modelos de Vista)
        alt Acierto CachÃ© BFF
            R-->>B: Devolver Respuesta Compuesta
            B-->>CDN: Respuesta Cacheable
            CDN-->>C: Contenido Entregado
            C->>CL: Sincronizar CachÃ© del Cliente
        else Fallo CachÃ© BFF
            B->>A: Llamada gRPC (ADR-0032)
            A->>R: BÃºsqueda CachÃ© Core (Permisos/Datos)
            alt Acierto Core
                R-->>A: Objeto de Dominio
            else Fallo Core
                A->>D: Consulta SQL (Aislamiento Doble Capa)
                D-->>A: Resultados Filtrados
                A->>R: Poblar CachÃ© Core
            end
            A-->>B: Respuesta gRPC
            B->>R: Poblar CachÃ© BFF
            B-->>CDN: Cuerpo Completamente Compuesto
            CDN-->>C: Entregar Respuesta
            C->>CL: Poblar/Sincronizar CachÃ© Cliente
        end
    end
```

### 6.2 Flujo de Eventos AsÃ­ncronos â€” Bus Inyectable ([ADR-0015](../adrs-es/core/0015-event-driven-architecture-intra-domain.md), [ADR-0016](../adrs-es/core/0016-immutable-business-audit-trail.md))

```mermaid
sequenceDiagram
    autonumber
    participant UC as Caso de Uso
    participant Port as IEventBusPort
    participant Bus as Impl Concreta (RabbitMQ / En-Memoria)
    participant AuditSvc as Servicio de AuditorÃ­a
    participant AuditDB as Registro AuditorÃ­a (Append-Only)

    UC->>Port: publish(DomainEvent)
    Port->>Bus: Despachar (vÃ­a impl inyectada)
    Bus-->>AuditSvc: Entregar evento asÃ­ncronamente
    AuditSvc->>AuditDB: INSERT delta inmutable (ADR-0016)
    Note over AuditDB: UPDATE/DELETE bloqueados por trigger de BD
```

### 6.3 Flujo de Resiliencia â€” Circuit Breaker ([ADR-0011](../adrs-es/core/0011-fault-tolerance-resiliency-patterns.md))

```mermaid
sequenceDiagram
    autonumber
    participant A as API Core
    participant CB as Circuit Breaker (opossum)
    participant Ext as Servicio Externo

    A->>CB: execute(llamada)
    alt Circuito CERRADO
        CB->>Ext: Reenviar llamada
        Ext-->>CB: Ã‰xito
        CB-->>A: Resultado
    else Circuito ABIERTO (umbral excedido)
        CB-->>A: Respuesta Alternativa (sin llamada ejecutada)
        Note over CB: Previene fallo en cascada (ADR-0011)
    end
```

---

## 7. Vista de Despliegue â€” Infraestructura Cloud Objetivo ([ADR-0013](../adrs-es/core/0013-cloud-infrastructure-topology-dr.md), [ADR-0028](../adrs-es/core/0028-self-hosted-hybrid-infrastructure-on-premise.md))
> [!IMPORTANT]
> **Estrategia de Despliegue Progresivo**: El diagrama siguiente representa la arquitectura de despliegue objetivo en estado maduro (**Fase 3+**). De acuerdo con el principio de Complejidad Progresiva, en la **Fase 1 (Monolito)** se permite la ejecuciÃ³n directa de los contenedores en hosts de cÃ³mputo mÃ­nimo (VMs, Container Apps o Docker Compose), escalando hacia clÃºsteres gestionados Ãºnicamente cuando la descomposiciÃ³n modular lo requiera.

```mermaid
graph TD
    subgraph CloudZoneA["Zona de Disponibilidad A"]
        KongA["Nodo Kong"]
        BFFA["Pod NestJS BFF"]
        APIA["Pod Core API"]
        PgPrimary[("PostgreSQL Primario")]
    end

    subgraph CloudZoneB["Zona de Disponibilidad B (DR â€” ADR-0013)"]
        KongB["Nodo Kong"]
        BFFB["Pod NestJS BFF"]
        APIB["Pod Core API"]
        PgReplica[("PostgreSQL RÃ©plica")]
    end

    subgraph SharedInfra["OSS Autohospedado Compartido (ADR-0028)"]
        Redis[("ClÃºster Redis")]
        RabbitMQ["ClÃºster RabbitMQ"]
        Vault["HashiCorp Vault"]
        MinIO["Almacenamiento MinIO"]
    end

    Internet -->|DNS Failover| KongA & KongB
    KongA --> BFFA --> APIA --> PgPrimary
    KongB --> BFFB --> APIB --> PgReplica
    PgPrimary -.->|ReplicaciÃ³n en Streaming| PgReplica
    APIA & APIB <--> Redis
    APIA & APIB --> RabbitMQ
    APIA & APIB --> Vault
```

---

## 8. Conceptos Corporativos Transversales â€” Matriz ADR Completa

| PreocupaciÃ³n ArquitectÃ³nica | ADR(s) Implementado(s) | PatrÃ³n / TecnologÃ­a | SecciÃ³n del Diagrama |
| :--- | :--- | :--- | :--- |
| **Gobernanza de Monorepo** | [ADR-0001](../adrs-es/core/0001-monorepo-orchestration-nx.md) | Nx + npm workspaces | Â§2 |
| **Arquitectura Hexagonal** | [ADR-0002](../adrs-es/nodejs/0002-clean-architecture-nestjs.md) | Puertos y Adaptadores | Â§4.1, Â§5 |
| **EstÃ¡ndares de TypeScript** | [ADR-0003](../adrs-es/nodejs/0003-strict-typescript-standards.md) | Modo estricto + ESLint Boundaries | Â§2 |
| **Resiliencia en Frontend** | [ADR-0004](../adrs-es/nodejs/0004-frontend-offline-resilience.md) | CachÃ© offline de React Query | Â§3.1 |
| **Seguridad CI/CD** | [ADR-0005](../adrs-es/core/0005-ci-cd-quality-codeql.md) | CodeQL + GitHub Actions | Â§2 |
| **Camino a Microservicios** | [ADR-0006](../adrs-es/core/0006-future-microservices-transition-dapr.md) | Triggers de migraciÃ³n Dapr Sidecar | Â§4.5 |
| **Observabilidad** | [ADR-0007](../adrs-es/nodejs/0007-observability-telemetry-loki-opentelemetry.md) | OpenTelemetry + Loki + Jaeger | Â§3.1, Â§5, Â§6 |
| **PatrÃ³n de Gateway BFF** | [ADR-0008](../adrs-es/nodejs/0008-progressive-multimodule-evolution-gateway-bff.md) | NestJS BFF por canal de cliente | Â§3.1, Â§4.3, Â§5 |
| **FijaciÃ³n de Dependencias** | [ADR-0009](../adrs-es/core/0009-strict-dependency-pinning-vulnerability-management.md) | Versiones exactas + `npm audit` | Â§2 |
| **Multi-Tenancy (SaaS)** | [ADR-0010](../adrs-es/core/0010-multi-tenancy-architecture-strategy.md) | PostgreSQL RLS + AsyncLocalStorage | Â§4.2, Â§5, Â§6.1 |
| **Circuit Breakers** | [ADR-0011](../adrs-es/core/0011-fault-tolerance-resiliency-patterns.md) | `opossum` + Exponential Backoff | Â§5, Â§6.3 |
| **AutorizaciÃ³n RBAC/ABAC** | [ADR-0012](../adrs-es/nodejs/0012-advanced-authorization-rbac-abac.md) | JWT Claims + NestJS Guards | Â§5 |
| **TopologÃ­a Cloud DR** | [ADR-0013](../adrs-es/core/0013-cloud-infrastructure-topology-dr.md) | Multi-AZ + ReplicaciÃ³n en Streaming | Â§7 |
| **CachÃ© Distribuida** | [ADR-0014](../adrs-es/core/0014-distributed-caching-strategy-redis.md) | CachÃ© Escalonada Multi-Capa tras `ICachePort` | Â§5, Â§6.1 |
| **Orientado a Eventos (Bus Inyectable)** | [ADR-0015](../adrs-es/core/0015-event-driven-architecture-intra-domain.md) | `IEventBusPort` â†’ En-Mem / RabbitMQ | Â§3.1, Â§4.4, Â§5, Â§6.2 |
| **Pista de AuditorÃ­a Inmutable** | [ADR-0016](../adrs-es/core/0016-immutable-business-audit-trail.md) | Tabla append-only + trigger de BD | Â§5, Â§6.2 |
| **Feature Flagging** | [ADR-0017](../adrs-es/core/0017-feature-flagging-strategy.md) | `IFeatureFlagPort` (Unleash/ConfigCat) | Â§5 |
| **PirÃ¡mide de Pruebas** | [ADR-0018](../adrs-es/core/0018-testing-pyramid-quality-gates.md) | Unitarias + Contrato (Pact) + E2E | Â§2 |
| **Patrones Funcionales / Result** | [ADR-0019](../adrs-es/core/0019-tactical-design-patterns-future-proofing.md) | `Result<T,E>` en lugar de excepciones | Â§4.1 |
| **AbstracciÃ³n de Proveedor Identidad** | [ADR-0020](../adrs-es/core/0020-identity-provider-abstraction-strategy.md) | Strategy Pattern â†’ Auth0/Entra/Zitadel | Â§3.1, Â§5 |
| **CompilaciÃ³n de GrÃ¡fico de Auth** | [ADR-0021](../adrs-es/nodejs/0021-high-performance-auth-and-graph-compilation.md) | GrÃ¡fico de permisos en cachÃ© Redis < 5ms | Â§5 |
| **Proyecciones Conectables** | [ADR-0022](../adrs-es/nodejs/0022-contextual-auth-and-pluggable-projections.md) | Proyecciones de lectura conscientes del contexto | Â§5 |
| **NÃºcleo de AutenticaciÃ³n Centralizado** | [ADR-0023](../adrs-es/nodejs/0023-centralized-TODO-vs-decentralized-access.md) | NÃºcleo compartido de autorizaciÃ³n | Â§5 |
| **Plataforma de Config & Features** | [ADR-0024](../adrs-es/core/0024-configuration-feature-management-platform.md) | Motor de parÃ¡metros multi-IdP | Â§5 |
| **AbstracciÃ³n de Feature Flags** | [ADR-0025](../adrs-es/core/0025-feature-flag-provider-abstraction.md) | Proveedores conectables de `IFeatureFlagPort` | Â§5 |
| **MFA y Passkeys** | [ADR-0026](../adrs-es/nodejs/0026-mfa-passwordless-adaptive-authentication.md) | WebAuthn + Passkeys + TOTP + Adaptativo | Â§5 |
| **Protocolo Dual REST/gRPC** | [ADR-0027](../adrs-es/nodejs/0027-dual-protocol-rest-grpc-api-gateway.md) | REST (externo) + gRPC (interno) | Â§3.1 |
| **Infraestructura OSS Autohospedada** | [ADR-0028](../adrs-es/core/0028-self-hosted-hybrid-infrastructure-on-premise.md) | MinIO + RabbitMQ + Vault OSS | Â§5, Â§7 |
| **Primitivas DDD TÃ¡cticas** | [ADR-0029](../adrs-es/nodejs/0029-tactical-ddd-primitives-library.md) | `@nestjslatam/ddd` vÃ­a re-exportaciones | Â§4.1 |
| **Gateway de Dos Niveles** | [ADR-0030](../adrs-es/core/0030-api-gateway-kong-vs-nestjs.md) | Kong (Edge) + NestJS BFF (AgregaciÃ³n) | Â§3.1, Â§4.3, Â§5, Â§6.1 |
| **CatÃ¡logo de Eventos de Dominio** | [ADR-0031](../adrs-es/core/0031-schema-per-context-domain-event-catalog.md) | ExtracciÃ³n multi-esquema + Contratos AsÃ­ncronos | Â§5, Â§6.2 |
| **SelecciÃ³n de Protocolo** | [ADR-0032](../adrs-es/core/0032-api-protocol-decision-matrix-rest-grpc-graphql.md) | gRPC (Int) vs REST (Ext) vs GraphQL | Â§3.1, Â§5, Â§6.1 |
| **Transactional Outbox** | [ADR-0033](../adrs-es/core/0033-transactional-outbox-pattern.md) | DB AtÃ³mica + GarantÃ­a atÃ³mica de eventos | Â§6.2 |
| **SeparaciÃ³n CQRS** | [ADR-0034](../adrs-es/core/0034-cqrs-pattern-applicability-matrix.md) | Matriz de EvaluaciÃ³n para Modelos de Lectura/Escritura | Â§5, Â§6.1 |
| **Sagas Distribuidas** | [ADR-0035](../adrs-es/core/0035-distributed-saga-pattern-strategy.md) | Estrategia de TransacciÃ³n Compensatoria | Â§6.2 |
| **Estrategia de MensajerÃ­a** | [ADR-0036](../adrs-es/core/0036-message-bus-delivery-strategy-fifo-dlq.md) | PolÃ­ticas FIFO vs Disparar y Olvidar vs DLQ | Â§6.2 |
| **Pruebas de Rendimiento** | [ADR-0037](../adrs-es/core/0037-performance-concurrency-chaos-strategy.md) | Carga K6 + VerificaciÃ³n de Contratos Pact | Â§5, Â§6.3 |
| **GestiÃ³n de Errores** | [ADR-0038](../adrs-es/nodejs/0038-error-handling-result-pattern-strategy.md) | PatrÃ³n Result + LÃ­mites Unificados | Â§5, Â§6.3 |
| **Selector de Despliegue** | [ADR-0039](../adrs-es/core/0039-deployment-topology-abstraction-switcher.md) | AbstracciÃ³n de TopologÃ­a basada en Factory | Â§7 |
| **SelecciÃ³n PolÃ­glota** | [ADR-0040](../adrs-es/core/0040-multi-runtime-selection-contracts.md) | Matriz de Carga de Trabajo y Contratos Type-Safe | Â§1.2 |
| **Arquitectura CanÃ³nica .NET** | [ADR-0041](../adrs-es/dotnet/0041-canonical-dotnet-backend-architecture.md) | Clean Arch C# / Minimal APIs | Â§1.2 |
| **Arquitectura CanÃ³nica Android** | [ADR-0042](../adrs-es/android/0042-canonical-android-mobile-architecture.md) | Kotlin Nativo / Compose / Offline | Â§1.2 |

---

## 9. Requisitos de Calidad (NFR Benchmark)

| MÃ©trica | Objetivo | ADR(s) Aplicables |
| :--- | :--- | :--- |
| **Latencia de API (P95)** | < 50ms | [ADR-0014](../adrs-es/core/0014-distributed-caching-strategy-redis.md), [ADR-0021](../adrs-es/nodejs/0021-high-performance-auth-and-graph-compilation.md) |
| **ResoluciÃ³n de GrÃ¡fico de Auth** | < 5ms | [ADR-0021](../adrs-es/nodejs/0021-high-performance-auth-and-graph-compilation.md) |
| **Vulnerabilidades SAST** | 0 Altas/CrÃ­ticas | [ADR-0005](../adrs-es/core/0005-ci-cd-quality-codeql.md), [ADR-0009](../adrs-es/core/0009-strict-dependency-pinning-vulnerability-management.md) |
| **Cobertura de Pruebas** | â‰¥ 70% | [ADR-0018](../adrs-es/core/0018-testing-pyramid-quality-gates.md) |
| **Huella de Memoria** | Baja inactividad (densidad de microservicios) | [ADR-0002](../adrs-es/nodejs/0002-clean-architecture-nestjs.md), [ADR-0006](../adrs-es/core/0006-future-microservices-transition-dapr.md) |
| **FiltraciÃ³n de Datos de Tenencia** | Tolerancia cero | [ADR-0010](../adrs-es/core/0010-multi-tenancy-architecture-strategy.md) (Aislamiento Doble Capa) |

---

## 10. ImplementaciÃ³n de Referencia CanÃ³nica

ðŸ‘‰ **[Volver a la RaÃ­z del Proyecto y GuÃ­a de Inicio](../../README.md)**

Implementado usando:
- **Framework**: NestJS (v10) con lÃ­mites estrictamente hexagonales.
- **ORM**: TypeORM con soporte nativo de PostgreSQL RLS.
- **Gateway**: Kong OSS (YAML sin BD) + capas de NestJS BFF.
- **Bus de Eventos**: `IEventBusPort` por defecto en Memoria, inyectable con RabbitMQ.
- **Pruebas**: Jest (unitarias/integraciÃ³n) + Pact (pruebas de contrato).

---

## 11. Riesgos y Deuda TÃ©cnica

Seguimiento estratÃ©gico de las limitaciones actuales del diseÃ±o y riesgos del sistema reconocidos.

### 11.1 Riesgos Inherentes
| ID del Riesgo | DescripciÃ³n | Estrategia de MitigaciÃ³n | Severidad |
| :--- | :--- | :--- | :--- |
| **R-01** | **Rendimiento de BD Compartida** | El empaquetamiento fÃ­sico de la BD crea un dominio de fallo Ãºnico. | Imponer replicaciÃ³n de lectura estricta y techos de tiempo de espera de consulta. | Media |
| **R-02** | **Desbordamiento de RabbitMQ** | Picos de mensajes en memoria durante interrupciones. | Control de Flujo / Cuotas obligatorias segÃºn **[ADR-0036](../adrs-es/core/0036-message-bus-delivery-strategy-fifo-dlq.md)**. | Alta |
| **R-03** | **Acoplamiento PolÃ­glota gRPC** | Cambios de protocolo no compatibles con versiones anteriores. | VerificaciÃ³n obligatoria de contratos **Pact JS** en CI. | Alta |

### 11.2 Deuda TÃ©cnica Conocida
*   **HinchazÃ³n de Monorepo**: A medida que el conteo de librerÃ­as supere las 200+, la gestiÃ³n de cachÃ© Nx requerirÃ¡ la migraciÃ³n de almacenamiento en cachÃ© local a la nube.
*   **Vulnerabilidad de LibrerÃ­a de DÃ­a Cero**: Los ciclos de actualizaciÃ³n rÃ¡pidos impuestos por la fijaciÃ³n estricta de dependencias ([ADR-0009](../adrs-es/core/0009-strict-dependency-pinning-vulnerability-management.md)) pueden consumir entre el 5% y 10% del ancho de banda de desarrollo mensual.

---

## 12. Glosario de Conceptos ArquitectÃ³nicos

Nomenclatura de referencia utilizada por este blueprint.

*   **ACL (Anti-Corruption Layer)**: AÃ­sla el modelo de dominio interno de esquemas/contratos externos.
*   **BFF (Backend for Frontend)**: API de borde de un solo propÃ³sito que optimiza las cargas Ãºtiles para un cliente especÃ­fico.
*   **Bounded Context**: LÃ­mite estratÃ©gico de lÃ³gica propietario de su propio esquema de base de datos privado.
*   **Arquitectura Limpia**: Paradigma de diseÃ±o donde el flujo de control siempre apunta hacia adentro, hacia las dependencias.
*   **Circuit Breaker Distribuido**: Mecanismo para detener la entrega de peticiones a servicios aguas arriba con fallas compartiendo el estado entre pods vÃ­a Redis.
*   **Arquitectura Hexagonal**: Ver *Puertos y Adaptadores*.
*   **Puerto**: Contrato explÃ­cito (Interfaz) que requiere la aplicaciÃ³n para comunicarse con sistemas externos.
*   **RLS (Row-Level Security)**: Seguridad nativa del motor de BD que restringe las filas de la tabla al usuario de la sesiÃ³n activa.
*   **PatrÃ³n Saga**: GestiÃ³n de la consistencia transaccional distribuida a travÃ©s de eventos de compensaciÃ³n.

---
[? Volver al Índice](./README.es.md)
