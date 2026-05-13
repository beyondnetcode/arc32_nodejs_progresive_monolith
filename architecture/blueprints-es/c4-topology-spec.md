# ðŸ—ï¸ EspecificaciÃ³n de Arquitectura y Especificaciones de Modelado C4

Este documento detalla el riguroso diseÃ±o arquitectÃ³nico de grado empresarial para la plataforma de referencia, conforme al estÃ¡ndar del blueprint **arc42** (ARC32). El diseÃ±o implementa un ecosistema **SaaS Multi-Tenant** avanzado utilizando **Gateways BFF** para gestionar la entrega a clientes.

---

## ðŸ—ºï¸ 1. Estructura EstÃ¡tica del Sistema (Modelo C4)

### Nivel 1: Diagrama de Contexto del Sistema
Define nuestro sistema delimitado dentro del ecosistema empresarial, sus consumidores (inquilinos) y actores externos activos.

```mermaid
graph TD
    subgraph Clients["Ecosistema de Clientes Multi-Tenant"]
        WebPortal["Cliente Web\n[CachÃ© Offline React Query]"]
        MobileApp["Aplicaciones MÃ³viles\n[CachÃ© SQLite Nativa]"]
        ThirdParty["Servicios Externos B2B (claves API)"]
    end

    subgraph EdgeNet["Borde de Red"]
        CDN["CDN (CachÃ© Distribuida Global)"]
    end

    subgraph CoreSystem["[El Sistema de Plataforma de Referencia]"]
        MainCore["NÃºcleo de Monolito Modular"]
        BFFGateway["Gateways de API BFF"]
    end

    subgraph ExternalDependencies["Ecosistema Externo"]
        ExternalIdP["Proveedores de Identidad (Auth0 / Entra ID)"]
        MessageBus["Bus Empresarial (RabbitMQ/Kafka)"]
    end

    WebPortal -->|HTTP/REST| CDN
    MobileApp -->|HTTP/REST| CDN
    ThirdParty -->|gRPC/REST| CDN
    
    CDN -->|Peticiones de Origen| BFFGateway
    BFFGateway -->|Enrutamiento Interno| MainCore
    
    MainCore -->|Validar Confianza| ExternalIdP
    MainCore -->|Emitir Eventos| MessageBus
```

### Nivel 2: Diagrama de Contenedores (Tiempo de EjecuciÃ³n de Alta Densidad)
Demuestra la segregaciÃ³n fÃ­sica de los puntos de entrada de comunicaciÃ³n (BFFs) hasta la infraestructura de la base de datos multi-tenant.

```mermaid
graph TD
    subgraph ClientLayer["Capa -1: NÃºcleo del Cliente"]
        WebClient["Interfaz Web\n[React Query / CachÃ© de Cliente]"]
    end

    subgraph PublicEdge["Capa 0: CachÃ© EstÃ¡tica"]
        CDN["CDN / CachÃ© de Navegador (Opcional)"]
    end

    subgraph EntryLayer["Nivel 1: Ingreso y Enrutamiento"]
        KongGateway["Gateway Kong / GestiÃ³n de APIs"]
    end

    subgraph BFFLayer["Nivel 2: Backend-for-Frontend (BFF)"]
        WebBFF["BFF Web NestJS (GraphQL / REST)"]
        MobileBFF["BFF MÃ³vil NestJS (GraphQL / REST)"]
    end

    subgraph ApplicationLayer["Nivel 3: Contextos de Negocio Centrales"]
        MainAPI["API Core NestJS (Reglas de Dominio)"]
    end

    subgraph StorageLayer["Nivel 4: Persistencia y Estado"]
        PostgresSQL[("PostgreSQL 16 (RLS de Doble Capa)")]
        RedisCache[("CachÃ© Distribuida Redis")]
    end

    WebClient -->|PeticiÃ³n HTTPS| CDN
    CDN -->|ReenvÃ­o DinÃ¡mico| KongGateway
    KongGateway -->|HTTP/REST| WebBFF
    KongGateway -->|HTTP/REST| MobileBFF
    
    WebBFF <-->|Lecturas CachÃ© BFF| RedisCache
    WebBFF -->|gRPC Interno| MainAPI
    
    MobileBFF <-->|Lecturas CachÃ© BFF| RedisCache
    MobileBFF -->|gRPC Interno| MainAPI
    
    MainAPI -->|Aislamiento de Inquilinos de Doble Capa| PostgresSQL
    MainAPI <-->|Lecturas CachÃ© Core| RedisCache
```

### Nivel 3: Diagrama de Componentes de API (Arquitectura Hexagonal)
Desglose del acoplamiento interno dentro de la **API Core de NestJS**.

```mermaid
graph TD
    subgraph HTTP["Adaptadores Externos (Ingreso)"]
        Controller["MainController (REST/gRPC)"]
    end

    subgraph Application["Capa de AplicaciÃ³n"]
        UseCase["BusinessUseCase (CoordinaciÃ³n)"]
        DTO["InputDTO (ValidaciÃ³n)"]
    end

    subgraph Core["Capa de Dominio Core"]
        Entity["DomainEntity (Reglas e Invariantes)"]
        IPersistencePort["IPersistencePort (Interfaz)"]
    end

    subgraph Infrastructure["Adaptadores de Persistencia (Egreso)"]
        TypeOrmAdapter["TypeOrmRepository (ImplementaciÃ³n)"]
    end

    Controller -->|Ejecuta| UseCase
    UseCase -->|Usa| DTO
    UseCase -->|Muta| Entity
    UseCase -.->|Inyecta Interfaz| IPersistencePort
    TypeOrmAdapter -.->|Implementa| IPersistencePort
```

---

## ðŸ“œ 2. El Libro de Decisiones Aprobadas (ADRs)

SegÃºn lo validado por el Arquitecto Principal, estas decisiones fundacionales estÃ¡n **oficialmente Aprobadas** y son obligatorias para la implementaciÃ³n del sistema.

### ðŸŸ¢ Grupo A: Fundamentos y EstÃ¡ndares Core
1.  **[ADR 0001: OrquestaciÃ³n de Monorepo](../adrs-es/core/0001-monorepo-orchestration-nx.md)**: Nx y espacios de trabajo npm para un CI/CD lineal y centralizado.
2.  **[ADR 0002: Arquitectura Hexagonal Limpia](../adrs-es/nodejs/0002-clean-architecture-nestjs.md)**: SeparaciÃ³n de la lÃ³gica core del cÃ³digo del framework.
3.  **[ADR 0003: EstÃ¡ndares Estrictos de TypeScript](../adrs-es/nodejs/0003-strict-typescript-standards.md)**: Tipado absoluto, sin `any`, reglas de ESLint obligatorias.
4.  **[ADR 0005: Seguridad Cero-Costo CodeQL](../adrs-es/core/0005-ci-cd-quality-codeql.md)**: DetecciÃ³n automatizada de vulnerabilidades dentro de la pipeline.
5.  **[ADR 0009: FijaciÃ³n Estricta de Dependencias](../adrs-es/core/0009-strict-dependency-pinning-vulnerability-management.md)**: Bloqueo de actualizaciones dinÃ¡micas para prevenir brechas en la cadena de suministro.

### ðŸŸ  Grupo B: SaaS, Escalabilidad y DistribuciÃ³n
6.  **[ADR 0006: TransiciÃ³n futura a Microservicios vÃ­a Dapr](../adrs-es/core/0006-future-microservices-transition-dapr.md)**: Desacoplamiento de activadores para romper monolitos en redes de nodos de malla.
7.  **[ADR 0007: Observabilidad vÃ­a OpenTelemetry](../adrs-es/nodejs/0007-observability-telemetry-loki-opentelemetry.md)**: Trazado distribuido a travÃ©s de BFF, API y BD.
8.  **[ADR 0008: Patrones BFF](../adrs-es/nodejs/0008-progressive-multimodule-evolution-gateway-bff.md)**: IntegraciÃ³n multi-canal a travÃ©s de capas de traducciÃ³n dedicadas.
9.  **[ADR 0010: Estrategia de Arquitectura Multi-Tenancy SaaS](../adrs-es/core/0010-multi-tenancy-architecture-strategy.md)**: ImplementaciÃ³n de Seguridad a Nivel de Fila (RLS) fÃ­sica dentro de PostgreSQL para garantizar el aislamiento.
10. **[ADR 0011: Circuit Breakers de Tolerancia a Fallos](../adrs-es/core/0011-fault-tolerance-resiliency-patterns.md)**: PrevenciÃ³n de degradaciÃ³n en cascada utilizando `opossum`.
11. **[ADR 0013: TopologÃ­a de RecuperaciÃ³n ante Desastres](../adrs-es/core/0013-cloud-infrastructure-topology-dr.md)**: DiseÃ±o de nodos multi-regiÃ³n.
12. **[ADR 0014: CachÃ© Distribuida](../adrs-es/core/0014-distributed-caching-strategy-redis.md)**: Aliviar la base de datos a travÃ©s de Redis centralizado.
13. **[ADR 0015: Arquitectura Dirigida por Eventos](../adrs-es/core/0015-event-driven-architecture-intra-domain.md)**: MensajerÃ­a asÃ­ncrona entre contextos delimitados.
14. **[ADR 0016: AuditorÃ­a de Negocio Inmutable](../adrs-es/core/0016-immutable-business-audit-trail.md)**: Sistema de registro que graba diffs de estado transaccional completos.

### ðŸ”µ Grupo C: IntegraciÃ³n, Identidad y Gobernanza
15. **[ADR 0020: AbstracciÃ³n de Proveedor de Identidad](../adrs-es/core/0020-identity-provider-abstraction-strategy.md)**: AbstracciÃ³n de puerto para Okta/Entra ID/Auth0.
16. **[ADR 0021: GrÃ¡ficos de Auth de Alto Rendimiento](../adrs-es/nodejs/0021-high-performance-auth-and-graph-compilation.md)**: Requisitos de latencia por debajo de 5ms.
17. **[ADR 0026: MFA y Seguridad Adaptativa](../adrs-es/nodejs/0026-mfa-passwordless-adaptive-authentication.md)**: Soporte para WebAuthn y Passkeys.
18. **[ADR 0027: Protocolos Duales REST y gRPC](../adrs-es/nodejs/0027-dual-protocol-rest-grpc-api-gateway.md)**: Streaming interno de alto rendimiento vÃ­a gRPC.
19. **[ADR 0030: Kong Gateway vs NestJS Gateway](../adrs-es/core/0030-api-gateway-kong-vs-nestjs.md)**: SeparaciÃ³n de proxies de infraestructura de la orquestaciÃ³n de negocio.
20. **[ADR 0029: Primitivas DDD TÃ¡cticas](../adrs-es/nodejs/0029-tactical-ddd-primitives-library.md)**: UtilizaciÃ³n obligatoria de `@nestjslatam/ddd` estandarizado.
21. **[ADR 0032: Matriz de DecisiÃ³n de Protocolo de API](../adrs-es/core/0032-api-protocol-decision-matrix-rest-grpc-graphql.md)**: Marco de evaluaciÃ³n que impone REST para exposiciÃ³n pÃºblica, gRPC para backbones internos y GraphQL para la agregaciÃ³n optimizada de BFF.

### ðŸŸ£ Grupo D: PreparaciÃ³n para la EvoluciÃ³n a Microservicios
22. **[ADR 0031: Esquema por Contexto y CatÃ¡logo de Eventos de Dominio](../adrs-es/core/0031-schema-per-context-domain-event-catalog.md)**: Cada contexto delimitado posee un esquema PostgreSQL dedicado (`auth` | `tasks` | `taxonomy` | `audit`). Toda la comunicaciÃ³n entre contextos se rige por un CatÃ¡logo formal de Eventos de Dominio con contratos de carga Ãºtil tipados, permitiendo la extracciÃ³n de microservicios sin migraciÃ³n.

---
[? Volver al Índice](./README.es.md)
