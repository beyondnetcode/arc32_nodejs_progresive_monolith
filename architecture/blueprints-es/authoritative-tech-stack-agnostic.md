# Estándares Universales de Arquitectura Autorizada (Línea Base Agnóstica)

> **Navegación Bilingüe:** [English Version](../../standards/architecture/authoritative-tech-stack-agnostic.md)

**Tipo de Documento:** Estándar Corporativo 
**Aplicabilidad:** Obligatorio para todos los Entornos de Ejecución (.NET, Node.js, Android) 
**Soberanía:** 100% Agnóstico a la Nube / Capacidad On-Premise

---

## 1. Restricciones Ejecutivas y No Negociables

Independientemente del stack tecnológico concreto elegido (Node.js, .NET o Kotlin), cada componente que se integre en el ecosistema DEBE cumplir estrictamente con estos invariantes arquitectónicos sistémicos. La violación de estas restricciones fallará automáticamente la validación de Puertas de Arquitectura.

* **Núcleo Arquitectónico:** Arquitectura Hexagonal (Puertos y Adaptadores). En la Fase 1, los Puertos (contratos del dominio) y los Adaptadores (implementaciones concretas) son OBLIGATORIOS pero simples y directos. Cada puerto debe tener una sola implementación directa, sin capas adicionales. Los Wrappers anticorrupción complejos y fachadas se posponen a fases con integración externa.
* **Política de Cero SDKs:** La capa de Dominio absoluto DEBE contener CERO referencias, importaciones o dependencias de SDKs de proveedores cloud (AWS, Azure), librerías ORM o frameworks HTTP específicos.
* **Infraestructura como Detalle:** Las capas de persistencia, buses de mensajería y almacenes de caché SOLO DEBEN interactuarse a través de Puertos de Dominio abstractos.
* **Garantía de Despliegue Progresivo:** Todos los componentes backend DEBEN ser empaquetados como contenedores estándar (OCI). La complejidad de la infraestructura evoluciona con la madurez del sistema: la Fase 1 admite despliegue sobre cómputo mínimo (VM, App Service o Docker Compose); Kubernetes se exige a partir del desacoplamiento de servicios (Fase 3+). La compatibilidad air-gapped se planifica desde el inicio pero su ejecución completa escala con la plataforma.

---

## 2. Estándares de Comunicación y Contratos

La integración entre servicios sigue la doctrina "Primero el Contrato" (*Contract First*) para garantizar la interoperabilidad políglota.

| Dominio del Estándar | Definición Requerida | Justificación |
| :--- | :--- | :--- |
| **Comunicación Síncrona Interna** | **gRPC (Protocol Buffers)** | Obligatorio desde Fase 2 para invocaciones entre servicios remotos ([ADR-0047](../adrs-es/core/0047-architectural-patterns-monolith-soa-microservices.md)). En Fase 1, la invocación es nativa intra-proceso. |
| **Estándar API Web Pública** | **RESTful (OpenAPI v3)** | Interoperabilidad canónica para integradores de terceros y SDKs Frontend. |
| **Arquitectura de Bus de Eventos** | **AMQP / CloudEvents** | Estructura de eventos autodescriptiva que sigue patrones de Transactional Outbox para una propagación segura. |

---
| **Comunicación Síncrona Interna** | **gRPC (Protocol Buffers)** | Obligatorio desde Fase 2 para invocaciones entre servicios remotos ([ADR-0047](../adrs-es/core/0047-architectural-patterns-monolith-soa-microservices.md)). En Fase 1, la invocación es nativa intra-proceso. |
| **Estándar API Web Pública** | **RESTful (OpenAPI v3)** | Interoperabilidad canónica para integradores de terceros y SDKs Frontend. |
| **Arquitectura de Bus de Eventos** | **AMQP / CloudEvents** | Estructura de eventos autodescriptiva que sigue patrones de Transactional Outbox para una propagación segura. |

---

## 3. Infraestructura Fundacional Transversal

Primitivas centralizadas aprobadas que sirven a la red políglota. Los adaptadores concretos del entorno de ejecución simplemente deben apuntar a estos protocolos estándar.

### 3.1 Persistencia Relacional (SQL)
* **Estrategia de Motores:** Selección Dependiente del Runtime ([ADR-0051](../adrs-es/core/0051-estrategia-motor-base-datos-empresarial.md)).
 * **Servicios .NET:** Microsoft SQL Server (Última versión).
 * **Servicios Node.js:** PostgreSQL v16+.
* **Restricción de Madurez:** REQUERIDO aislamiento de Esquema por Contexto. ESTÁN PROHIBIDOS los SQL Joins directos a través de las fronteras de esquemas de contextos delimitados.
* **Estándares de Diseño:** Todo el modelado de datos DEBE cumplir con los estándares definidos en el [ADR-0054](../adrs-es/core/0054-estandares-diseño-normalizacion-base-datos.md) (línea base 3NF para SQL).
* **Patrón de Aislamiento:** Estrategia de Seguridad Configurable ([ADR-0044](../adrs-es/core/0044-configurable-security-persistence-strategy.md)). La Seguridad a Nivel de Fila (RLS) nativa es OPCIONAL/RECOMENDADA para densidades multi-tenant, gobernada por el flag `SECURITY_STRATEGY_MODE`.

### 3.2 Caché Distribuida
* **Motor Homologado:** Redis v7.2+ (Cluster o Sentinel Autohospedado)
* **Rol:** Aceleración de grafos efímeros sub-3ms, estado de limitación de tasa de ventana deslizante.

### 3.3 Almacenamiento de Objetos
* **Contrato Homologado:** **Protocolo Compatible con S3** (Estándar de facto de la industria) vía MinIO autohospedado.
* **Justificación:** El S3-API actúa como protocolo de cable universal, facilitando la soberanía e independencia de la nube.
* **Regla:** Prohibido el uso directo de SDKs propietarios de proveedores cloud. La lógica de almacenamiento DEBE interactuar exclusivamente vía Puertos de Dominio apuntando a endpoints que cumplan con la especificación S3.

---

## ¡ 4. Seguridad Reforzada y Perímetro

### 4.1 Identidad y Autorización
* **Protocolo:** Federación OpenID Connect (OIDC) / OAuth 2.0 / SAML 2.0.
* **Tipo de Token:** Verificación estadística de JWTs firmados con RS256.
* **Cumplimiento:** Red Zero Trust. Se requiere TLS mutuo (mTLS) obligatorio solo al activar la malla de red distribuida (Fase 3+).

### 4.2 Higiene de Secretos
* **Motor:** HashiCorp Vault (Empresarial o Comunitario Autohospedado).
* **Regla:** Prohibidos los secretos en texto plano en charts de Helm, repositorios Git o ConfigMaps de K8s. La inyección vía Sidecar es el íNICO patrón de consumo aprobado.

---

## 5. Observabilidad Empresarial Nativa

La telemetría agnóstica al entorno de ejecución es obligatoria. Se prohíbe a los equipos bloquear su lógica en agentes de proveedores SaaS específicos.

* **Instrumentación de Trazas/Logs:** Estándar **OpenTelemetry (W3C Trace Context)**.
* **Jerarquía de Recolección:** Extracción de métricas vía OpenTelemetry Collector reenviando a la malla Prometheus/Jaeger.
* **Formato de Logs:** Registro estructurado JSON mandated para una indexación eficiente en Grafana Loki.

---

## 6. Contenerización y Estrategia de Despliegue

Estandarización del empaquetado y ejecución para garantizar paridad entre nube y on-premise.

* **Motor de Contenedores:** **Docker v25+** utilizando compilaciones multi-etapa (multi-stage) con imágenes base **Distroless** (Google Container Tools) para minimizar la superficie de ataque en producción.
* **Orquestación Progresiva:** En la Fase 1, basta con **Docker Compose** o servicios de contenedor directos (VM, Container Apps). **Kubernetes (K8s v1.28+)** se impone a partir de la Fase 3+ para gestionar servicios desacoplados. Los manifiestos de charts deben ser agnósticos al sabor de distribución (funcionar en EKS/AKS tanto como en MicroK8s/Rancher).
* **Gestor de Paquetes:** **Helm v3**. Los charts deben parametrizar completamente los recursos, permitiendo intercambios fáciles entre infraestructura real de nube y simuladores locales.

---

## 7. Pirámide de Verificación Holística

Obligatorio para garantizar que el software políglota respeta los contratos antes de desplegar.

* **Pruebas de Integración:** Impulsadas por **Testcontainers** (levantando instancias vivas de Postgres/Redis por suite), prohibido simular el motor SQL.
* **Seguridad de Contratos:** Implementación de **Pact** (Contract Testing) para asegurar la compatibilidad binaria gRPC y los esquemas OpenAPI entre equipos.
* **Rendimiento y Carga:** Scripts de **k6 (Grafana)** integrados en la pipeline para verificar latencias, condiciones de carrera y saturación de memoria bajo estrés.

---

## 8. Directrices de Servicios de Terceros

Para entornos desconectados (air-gapped), las integraciones externas DEBEN ser opcionales y abstraídas.

| Nombre del Servicio | Caso de Uso | Restricción Local / Mitigación | Interfaz del Puerto Requerida |
| :--- | :--- | :--- | :--- |
| **Twilio** | SMS OTP / Alertas | Proveer configuración para Gateway SMTP-a-SMS local o módem hardware. | `ISmsPort` |
| **SendGrid** | Emails Transaccionales | Alternativa compatible vía servidor SMTP autohospedado (Postfix/Haraka). | `IEmailPort` |

---

## 9. Registro de Riesgos de Bloqueo del Proveedor (Vendor Lock-in)

Todas las decisiones de infraestructura base son auditadas bajo el prisma de soberanía tecnológica.

| Componente | Solución Elegida | Nivel de Riesgo | Estrategia de Salida/Mitigación |
| :--- | :--- | :--- | :--- |
| **Base de Datos** | PostgreSQL v16 | **Bajo** | Cumplimiento estándar ANSI SQL. Capa de dominio desacoplada mediante Puertos. |
| **Almacén de Objetos** | MinIO (S3 API) | **Bajo** | MinIO replica el 100% de la API de AWS S3. Cambio reversible vía configuración. |
| **Secretos**| HashiCorp Vault | **Bajo** | Resolución abstraída por inyección dinámica de sidecars nativos de K8s. |
| **Gateway** | Kong Gateway | **Bajo** | La configuración se gestiona a través de recursos Ingress estándar del orquestador. |

---

## 10. Próximos Pasos Estructurales para la Lectura

Este documento cubre solo las **leyes universales**. AHORA DEBE identificar su Entorno de Ejecución activo y consumir el mapeo de cumplimiento técnico concreto:

1. -> **[Stack Tecnológico Específico para .NET / C#](./authoritative-tech-stack-dotnet.md)**
2. -> **[Stack Tecnológico Específico para Node.js / TypeScript](./authoritative-tech-stack-nodejs.md)**
3. -> **[Stack Tecnológico Móvil Específico para Android / Kotlin](./authoritative-tech-stack-android.md)**

---
[Volver al Índice](./README.md)
