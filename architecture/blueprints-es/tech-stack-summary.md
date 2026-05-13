# âš¡ Cheat Sheet del Stack TecnolÃ³gico de Node.js Progresivo (Referencia RÃ¡pida)

Esta hoja de trucos sirve como referencia autoritativa y de alta densidad de herramientas por capa arquitectÃ³nica para desarrolladores y agentes autÃ³nomos que trabajan en la Arquitectura de Referencia Progresiva de Node.js.

---

### 1. Runtime y Lenguaje
*   **Entorno de EjecuciÃ³n:** Node.js v20 LTS
*   **Lenguaje:** TypeScript v5.4+ (Modo Estricto)
*   **Motor Compilador:** SWC (`@swc/core`) dentro de Nx Monorepo
*   **Calidad de CÃ³digo:** ESLint v8 + Prettier v3
*   **Puertas de Calidad Git:** Husky + lint-staged

### 2. Capa de API
*   **Protocolos Internos:** gRPC (NestJS Microservices)
*   **Protocolos Externos:** API REST (NestJS Express)
*   **EstÃ¡ndar de ValidaciÃ³n:** `class-validator` + `class-transformer`
*   **DocumentaciÃ³n de API:** OpenAPI v3 (Swagger) vÃ­a decoradores NestJS

### 3. Capa de Gateway
*   **API Gateway:** Kong Gateway (EdiciÃ³n de CÃ³digo Abierto)
*   **GestiÃ³n de SesiÃ³n:** JSON Web Tokens (JWT) firmados con RS256
*   **Seguridad Interna:** TLS mutuo (mTLS) vÃ­a Malla de Servicios Istio
*   **LimitaciÃ³n de Tasa:** Limitador de Tasa de Ventana Deslizante (plugin Kong Redis)

### 4. Capa de Dominio y AplicaciÃ³n
*   **PatrÃ³n ArquitectÃ³nico:** Arquitectura Hexagonal (Puertos y Adaptadores)
*   **Estrategia de Monorepo:** Nx Monorepo
*   **PatrÃ³n de EjecuciÃ³n:** Monolito Modular (Listo para Dapr)
*   **PatrÃ³n de SegregaciÃ³n:** CQRS HÃ­brido (Regulado por Matriz [ADR-0034](../adrs-es/core/0034-cqrs-pattern-applicability-matrix.md))
*   **InyecciÃ³n de Dependencias:** Contenedor DI nativo de NestJS

### 5. Capa de Datos
*   **Base de Datos Relacional Principal:** PostgreSQL v16 (Aislamiento Esquema Por Contexto, [ADR-0031](../adrs-es/core/0031-schema-per-context-domain-event-catalog.md))
*   **Mapeo Relacional (ORM):** TypeORM (TypeScript)
*   **Consultas de Alto Rendimiento:** Driver nativo `pg`
*   **Motor de MigraciÃ³n de Esquema:** Migraciones TypeORM vÃ­a Init-Containers de Kubernetes
*   **CachÃ© en Memoria:** Redis v7.2 (Replicaciones Sentinel / Cluster)
*   **AlmacÃ©n de Objetos y Activos:** MinIO (Compatible con S3, Autohospedado)
*   **BrÃ³ker de Mensajes AsÃ­ncrono:** RabbitMQ gobernado por control de flujo ([ADR-0036](../adrs-es/core/0036-message-bus-delivery-strategy-fifo-dlq.md)) y Outbox ([ADR-0033](../adrs-es/core/0033-transactional-outbox-pattern.md))

### 6. Estrategia de Multi-tenancy
*   **Modelo de Aislamiento de Datos:** Base de Datos Compartida con Row-Level Security (RLS)
*   **Contexto de ResoluciÃ³n de Inquilino:** ExtracciÃ³n de claims de JWT vÃ­a Guards de NestJS
*   **ImposiciÃ³n de Aislamiento:** InyecciÃ³n dinÃ¡mica de sesiÃ³n de transacciÃ³n de base de datos (`SET LOCAL app.current_tenant`)

### 7. Infraestructura y Despliegue
*   **Motor de Contenedores:** Docker v25 (ImÃ¡genes node distroless multi-etapa)
*   **Plataforma Orquestadora:** Kubernetes (K8s v1.28+)
*   **GestiÃ³n de Secretos y Claves:** HashiCorp Vault (OSS, Autohospedado)
*   **Empaquetador de Despliegue:** Charts parametrizados de Helm v3

### 8. Observabilidad
*   **EstÃ¡ndar de InstrumentaciÃ³n:** OpenTelemetry (SDKs Neutrales al Proveedor)
*   **Agregador de Logs:** Grafana Loki (OSS)
*   **Trazas Distribuidas:** Jaeger (OSS)
*   **Servidor de MÃ©tricas:** Motor de ExtracciÃ³n Prometheus (Pulling)

### 9. Seguridad
*   **Registros de Auth:** OIDC y SAML Federados + AlmacÃ©n BCrypt Nativo del Esqueleto de Referencia
*   **Control de Acceso:** RBAC JerÃ¡rquico + Control de Acceso Basado en Atributos (ABAC)
*   **AuditorÃ­a de Dependencias:** CLI de Snyk + `npm audit` dentro de las pipelines de CI/CD

### 10. Estrategia de GestiÃ³n de Errores
*   **EstÃ¡ndar de PatrÃ³n:** PatrÃ³n Result Funcional (`neverthrow`) segÃºn [ADR-0038](../adrs-es/nodejs/0038-error-handling-result-pattern-strategy.md)
*   **Barrera Global:** NestJS ExceptionFilter capturando IDs de traza interna opacos.

### 11. Experiencia del Desarrollador (DevEx)
*   **Servicios Locales:** EspecificaciÃ³n de Docker Compose
*   **Framework de Pruebas Unitarias:** Jest
*   **Pruebas de IntegraciÃ³n:** Jest + Supertest con **Testcontainers**
*   **VerificaciÃ³n de Contratos:** Pact JS (Impulsado por el consumidor de microservicios)
*   **InyecciÃ³n de Rendimiento:** Scripts dinÃ¡micos de TypeScript de **k6** (Grafana)
*   **Pruebas End-to-End (E2E):** Playwright

---
[? Volver al Índice](./README.es.md)
