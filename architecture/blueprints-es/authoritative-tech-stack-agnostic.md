# ðŸ“ EstÃ¡ndares Universales de Arquitectura Autorizada (LÃ­nea Base AgnÃ³stica)

> ðŸŒ **NavegaciÃ³n BilingÃ¼e:** [ðŸ‡ºðŸ‡¸ English Version](../../standards/architecture/authoritative-tech-stack-agnostic.md)

**Tipo de Documento:** EstÃ¡ndar Corporativo  
**Aplicabilidad:** Obligatorio para todos los Entornos de EjecuciÃ³n (.NET, Node.js, Android)  
**SoberanÃ­a:** 100% AgnÃ³stico a la Nube / Capacidad On-Premise

---

## ðŸ§­ 1. Restricciones Ejecutivas y No Negociables

Independientemente del stack tecnolÃ³gico concreto elegido (Node.js, .NET o Kotlin), cada componente que se integre en el ecosistema DEBE cumplir estrictamente con estos invariantes arquitectÃ³nicos sistÃ©micos. La violaciÃ³n de estas restricciones fallarÃ¡ automÃ¡ticamente la validaciÃ³n de Puertas de Arquitectura.

*   **NÃºcleo ArquitectÃ³nico:** Arquitectura Hexagonal (Puertos y Adaptadores). En la Fase 1, los Puertos (contratos del dominio) y los Adaptadores (implementaciones concretas) son OBLIGATORIOS pero simples y directos. Cada puerto debe tener una sola implementaciÃ³n directa, sin capas adicionales. Los Wrappers anticorrupciÃ³n complejos y fachadas se posponen a fases con integraciÃ³n externa.
*   **PolÃ­tica de Cero SDKs:** La capa de Dominio absoluto DEBE contener CERO referencias, importaciones o dependencias de SDKs de proveedores cloud (AWS, Azure), librerÃ­as ORM o frameworks HTTP especÃ­ficos.
*   **Infraestructura como Detalle:** Las capas de persistencia, buses de mensajerÃ­a y almacenes de cachÃ© SOLO DEBEN interactuarse a travÃ©s de Puertos de Dominio abstractos.
*   **GarantÃ­a de Despliegue Progresivo:** Todos los componentes backend DEBEN ser empaquetados como contenedores estÃ¡ndar (OCI). La complejidad de la infraestructura evoluciona con la madurez del sistema: la Fase 1 admite despliegue sobre cÃ³mputo mÃ­nimo (VM, App Service o Docker Compose); Kubernetes se exige a partir del desacoplamiento de servicios (Fase 3+). La compatibilidad air-gapped se planifica desde el inicio pero su ejecuciÃ³n completa escala con la plataforma.

---

## ðŸ›°ï¸ 2. EstÃ¡ndares de ComunicaciÃ³n y Contratos

La integraciÃ³n entre servicios sigue la doctrina "Primero el Contrato" (*Contract First*) para garantizar la interoperabilidad polÃ­glota.

| Dominio del EstÃ¡ndar | DefiniciÃ³n Requerida | JustificaciÃ³n |
| :--- | :--- | :--- |
| **ComunicaciÃ³n SÃ­ncrona Interna** | **gRPC (Protocol Buffers)** | Obligatorio desde Fase 2 para invocaciones entre servicios remotos ([ADR-0047](../adrs-es/core/0047-architectural-patterns-monolith-soa-microservices.md)). En Fase 1, la invocaciÃ³n es nativa intra-proceso. |
| **EstÃ¡ndar API Web PÃºblica** | **RESTful (OpenAPI v3)** | Interoperabilidad canÃ³nica para integradores de terceros y SDKs Frontend. |
| **Arquitectura de Bus de Eventos** | **AMQP / CloudEvents** | Estructura de eventos autodescriptiva que sigue patrones de Transactional Outbox para una propagaciÃ³n segura. |

---

## ðŸ’¾ 3. Infraestructura Fundacional Transversal

Primitivas centralizadas aprobadas que sirven a la red polÃ­glota. Los adaptadores concretos del entorno de ejecuciÃ³n simplemente deben apuntar a estos protocolos estÃ¡ndar.

### 3.1 Persistencia Relacional (SQL)
*   **Motor Homologado:** PostgreSQL v16+
*   **RestricciÃ³n de Madurez:** REQUERIDO aislamiento de Esquema por Contexto. ESTÃN PROHIBIDOS los SQL Joins directos a travÃ©s de las fronteras de esquemas de contextos delimitados.
*   **PatrÃ³n de Aislamiento:** Estrategia de Seguridad Configurable ([ADR-0044](../adrs-es/core/0044-configurable-security-persistence-strategy.md)). La Seguridad a Nivel de Fila (RLS) nativa es OPCIONAL/RECOMENDADA para densidades multi-tenant, gobernada por el flag `SECURITY_STRATEGY_MODE`.

### 3.2 CachÃ© Distribuida
*   **Motor Homologado:** Redis v7.2+ (Cluster o Sentinel Autohospedado)
*   **Rol:** AceleraciÃ³n de grafos efÃ­meros sub-3ms, estado de limitaciÃ³n de tasa de ventana deslizante.

### 3.3 Almacenamiento de Objetos
*   **Contrato Homologado:** **Protocolo Compatible con S3** (EstÃ¡ndar de facto de la industria) vÃ­a MinIO autohospedado.
*   **JustificaciÃ³n:** El S3-API actÃºa como protocolo de cable universal, facilitando la soberanÃ­a e independencia de la nube.
*   **Regla:** Prohibido el uso directo de SDKs propietarios de proveedores cloud. La lÃ³gica de almacenamiento DEBE interactuar exclusivamente vÃ­a Puertos de Dominio apuntando a endpoints que cumplan con la especificaciÃ³n S3.

---

## ðŸ›¡ï¸ 4. Seguridad Reforzada y PerÃ­metro

### 4.1 Identidad y AutorizaciÃ³n
*   **Protocolo:** FederaciÃ³n OpenID Connect (OIDC) / OAuth 2.0 / SAML 2.0.
*   **Tipo de Token:** VerificaciÃ³n estadÃ­stica de JWTs firmados con RS256.
*   **Cumplimiento:** Red Zero Trust. Se requiere TLS mutuo (mTLS) obligatorio solo al activar la malla de red distribuida (Fase 3+).

### 4.2 Higiene de Secretos
*   **Motor:** HashiCorp Vault (Empresarial o Comunitario Autohospedado).
*   **Regla:** Prohibidos los secretos en texto plano en charts de Helm, repositorios Git o ConfigMaps de K8s. La inyecciÃ³n vÃ­a Sidecar es el ÃšNICO patrÃ³n de consumo aprobado.

---

## ðŸ“Š 5. Observabilidad Empresarial Nativa

La telemetrÃ­a agnÃ³stica al entorno de ejecuciÃ³n es obligatoria. Se prohÃ­be a los equipos bloquear su lÃ³gica en agentes de proveedores SaaS especÃ­ficos.

*   **InstrumentaciÃ³n de Trazas/Logs:** EstÃ¡ndar **OpenTelemetry (W3C Trace Context)**.
*   **JerarquÃ­a de RecolecciÃ³n:** ExtracciÃ³n de mÃ©tricas vÃ­a OpenTelemetry Collector reenviando a la malla Prometheus/Jaeger.
*   **Formato de Logs:** Registro estructurado JSON mandated para una indexaciÃ³n eficiente en Grafana Loki.

---

## ðŸ›³ï¸ 6. ContenerizaciÃ³n y Estrategia de Despliegue

EstandarizaciÃ³n del empaquetado y ejecuciÃ³n para garantizar paridad entre nube y on-premise.

*   **Motor de Contenedores:** **Docker v25+** utilizando compilaciones multi-etapa (multi-stage) con imÃ¡genes base **Distroless** (Google Container Tools) para minimizar la superficie de ataque en producciÃ³n.
*   **OrquestaciÃ³n Progresiva:** En la Fase 1, basta con **Docker Compose** o servicios de contenedor directos (VM, Container Apps). **Kubernetes (K8s v1.28+)** se impone a partir de la Fase 3+ para gestionar servicios desacoplados. Los manifiestos de charts deben ser agnÃ³sticos al sabor de distribuciÃ³n (funcionar en EKS/AKS tanto como en MicroK8s/Rancher).
*   **Gestor de Paquetes:** **Helm v3**. Los charts deben parametrizar completamente los recursos, permitiendo intercambios fÃ¡ciles entre infraestructura real de nube y simuladores locales.

---

## ðŸ§ª 7. PirÃ¡mide de VerificaciÃ³n HolÃ­stica

Obligatorio para garantizar que el software polÃ­glota respeta los contratos antes de desplegar.

*   **Pruebas de IntegraciÃ³n:** Impulsadas por **Testcontainers** (levantando instancias vivas de Postgres/Redis por suite), prohibido simular el motor SQL.
*   **Seguridad de Contratos:** ImplementaciÃ³n de **Pact** (Contract Testing) para asegurar la compatibilidad binaria gRPC y los esquemas OpenAPI entre equipos.
*   **Rendimiento y Carga:** Scripts de **k6 (Grafana)** integrados en la pipeline para verificar latencias, condiciones de carrera y saturaciÃ³n de memoria bajo estrÃ©s.

---

## ðŸ§© 8. Directrices de Servicios de Terceros

Para entornos desconectados (air-gapped), las integraciones externas DEBEN ser opcionales y abstraÃ­das.

| Nombre del Servicio | Caso de Uso | RestricciÃ³n Local / MitigaciÃ³n | Interfaz del Puerto Requerida |
| :--- | :--- | :--- | :--- |
| **Twilio** | SMS OTP / Alertas | Proveer configuraciÃ³n para Gateway SMTP-a-SMS local o mÃ³dem hardware. | `ISmsPort` |
| **SendGrid** | Emails Transaccionales | Alternativa compatible vÃ­a servidor SMTP autohospedado (Postfix/Haraka). | `IEmailPort` |

---

## âš–ï¸ 9. Registro de Riesgos de Bloqueo del Proveedor (Vendor Lock-in)

Todas las decisiones de infraestructura base son auditadas bajo el prisma de soberanÃ­a tecnolÃ³gica.

| Componente | SoluciÃ³n Elegida | Nivel de Riesgo | Estrategia de Salida/MitigaciÃ³n |
| :--- | :--- | :--- | :--- |
| **Base de Datos** | PostgreSQL v16 | **Bajo** | Cumplimiento estÃ¡ndar ANSI SQL. Capa de dominio desacoplada mediante Puertos. |
| **AlmacÃ©n de Objetos** | MinIO (S3 API) | **Bajo** | MinIO replica el 100% de la API de AWS S3. Cambio reversible vÃ­a configuraciÃ³n. |
| **Secretos**| HashiCorp Vault | **Bajo** | ResoluciÃ³n abstraÃ­da por inyecciÃ³n dinÃ¡mica de sidecars nativos de K8s. |
| **Gateway** | Kong Gateway | **Bajo** | La configuraciÃ³n se gestiona a travÃ©s de recursos Ingress estÃ¡ndar del orquestador. |

---

## ðŸš€ 10. PrÃ³ximos Pasos Estructurales para la Lectura

Este documento cubre solo las **leyes universales**. AHORA DEBE identificar su Entorno de EjecuciÃ³n activo y consumir el mapeo de cumplimiento tÃ©cnico concreto:

1.  ðŸ‘‰ **[Stack TecnolÃ³gico EspecÃ­fico para .NET / C#](./authoritative-tech-stack-dotnet.md)**
2.  ðŸ‘‰ **[Stack TecnolÃ³gico EspecÃ­fico para Node.js / TypeScript](./authoritative-tech-stack-nodejs.md)**
3.  ðŸ‘‰ **[Stack TecnolÃ³gico MÃ³vil EspecÃ­fico para Android / Kotlin](./authoritative-tech-stack-android.md)**

---
[? Volver al Índice](./README.es.md)
