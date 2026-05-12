# 📐 Definición del Stack Tecnológico Autorizado — Esqueleto de Referencia

**Tipo de Documento:** Blueprint de Arquitectura  
**Estado:** Aprobado  
**Framework:** bMAD Fase 02 (Arquitectura)  
**Soberanía:** 100% Cloud-Agnostic / Capaz de On-Premise  

---

## 🧭 Referencia de Contexto Ejecutivo

*   **Nombre del Producto:** Plantilla de Referencia To-Do
*   **Tipo de Producto:** Híbrido (SaaS y despliegues locales On-Premise)
*   **Usuarios Principales:** Usuarios de Aplicaciones Integradas (Operadores, Analistas de Negocio), Administradores de Inquilinos B2B
*   **Escala Esperada (Inicial):** < 1,000 inquilinos, ~50 usuarios concurrentes por inquilino (~50,000 conexiones concurrentes activas totales)
*   **Escala Esperada (Objetivo):** > 10,000 inquilinos, ~500 usuarios concurrentes por inquilino (~5,000,000 conexiones concurrentes activas totales)
*   **Tamaño del Equipo:** ~5–10 Ingenieros
*   **Experiencia del Equipo:** Fuerte en NestJS & TypeScript/JavaScript, algo de DevOps (Docker, Kubernetes), sin experiencia en Java
*   **Restricciones Existentes:** Framework NestJS para el Núcleo de Referencia, motor relacional PostgreSQL, caché Redis de alto rendimiento, arquitectura lista para Dapr, capacidad estricta de despliegue K8s on-premise
*   **No Negociables:** Absolutamente cero dependencias de SDKs de proveedores de nube en la capa de dominio principal (Arquitectura Hexagonal estricta); alternativas de infraestructura de código abierto 100% autohospedables.

---

## 1. Runtime y Lenguaje

### 1.1 Lenguaje + Versión
*   **Herramienta Elegida:** **TypeScript v5.4+ ejecutándose en Node.js v20 LTS**
*   **Por qué se eligió:** Permite tipado estático, una rica experiencia de desarrollador y alineación inmediata con la fuerte experiencia en TypeScript del equipo. Node.js v20 LTS asegura soporte empresarial a largo plazo, APIs estables y optimización del runtime V8 nativo de alto rendimiento.
*   **Alternativas Rechazadas:**
    *   *Golang*: Rechazado porque el equipo no tiene experiencia en Golang; introducir un nuevo lenguaje retrasaría severamente el tiempo de salida al mercado.
    *   *Java (Spring Boot)*: Explícitamente rechazado debido a la falta de experiencia del equipo en Java y una mayor huella de memoria en entornos de contenedores.

### 1.2 Sistema de Tipos / Configuración del Compilador
*   **Herramienta Elegida:** **Compilación Estricta de TypeScript vía SWC (`@swc/core`) dentro de Nx Monorepo**
*   **Por qué se eligió:** `strict: true` impone cero implicit-any y comprobaciones estrictas de nulos, previniendo errores comunes en tiempo de ejecución. SWC compila TypeScript hasta 20 veces más rápido que el `tsc` tradicional, acelerando significativamente los ciclos de desarrollo local y las ejecuciones de CI/CD.
*   **Alternativas Rechazadas:**
    *   *tsc (compilador estándar de TypeScript)*: Rechazado como motor de construcción principal debido a los tiempos de compilación lentos bajo configuraciones de monorepo de alta concurrencia, pero retenido exclusivamente para la comprobación de tipos (`tsc --noEmit`).

### 1.3 Cadena de Herramientas de Linting y Formateo
*   **Herramienta Elegida:** **ESLint v8 + Prettier v3 integrado vía Husky y lint-staged**
*   **Por qué se eligió:** Garantiza un formateo de código uniforme y automático y un análisis estático en la etapa de pre-commit, evitando que entre código sin formato o con bugs al repositorio.
*   **Alternativas Rechazadas:**
    *   *TSLint*: Obsoleto; ya no tiene soporte.

---

## 2. Capa de API

### 2.1 Protocolo de API Principal y Framework
*   **Herramienta Elegida:** **Motor de Doble Protocolo: REST (vía NestJS Express) + gRPC (vía NestJS Microservices)**
*   **Por qué se eligió:**
    *   *REST (JSON)*: Sirve como el API de cara al público para integraciones de clientes aguas abajo y la página de inicio de sesión alojada del Esqueleto de Referencia debido a su compatibilidad universal.
    *   *gRPC (Protocol Buffers)*: Impone una comunicación interna de alto rendimiento, baja latencia y segura en tipos (de BFF al Esqueleto de Referencia, o de servicio a servicio) para garantizar que los gráficos de permisos se resuelvan en **menos de 5ms**.
*   **Alternativas Rechazadas:**
    *   *GraphQL*: Rechazado debido a la alta complejidad de caché, la sobrecarga de complejidad de consultas y la dificultad de mantener límites de latencia predecibles por debajo de 5ms bajo anidamiento multi-tenant B2B masivo.

### 2.2 Estándar de Documentación de API
*   **Herramienta Elegida:** **OpenAPI v3 (Swagger) generado dinámicamente vía decoradores de NestJS**
*   **Por qué se eligió:** Asegura que las APIs REST de cara al público estén documentadas automáticamente, sean interactivas y estén completamente sincronizadas con la base de código, con cero mantenimiento manual de documentos.
*   **Alternativas Rechazadas:**
    *   *Colecciones Manuales de Postman*: Alta sobrecarga de mantenimiento y propensas a desincronizarse con las APIs de producción.

### 2.3 Librería de Validación
*   **Herramienta Elegida:** **`class-validator` + `class-transformer`**
*   **Por qué se eligió:** Se integra nativamente con NestJS Pipes para imponer validación declarativa basada en decoradores directamente en los DTOs (Data Transfer Objects) en el ingreso de la red.
*   **Alternativas Rechazadas:**
    *   *Joi / Zod*: Aunque son de alto rendimiento, no se integran tan perfectamente con la inyección de dependencias basada en clases y los decoradores de NestJS como `class-validator`.

---

## 3. Capa de Gateway

### 3.1 Solución de Gateway por Cliente
*   **Herramienta Elegida:** **Kong API Gateway (Edición de Código Abierto)**
*   **Por qué se eligió:** Un gateway de API agnóstico a la nube, ligero y de rendimiento extremadamente alto (construido sobre Nginx) que maneja la limitación de tasa B2B, listas blancas de IP y enrutamiento. Se ejecuta de forma nativa en Kubernetes y es completamente autohospedable en las instalaciones (on-premise).
*   **Alternativas Rechazadas:**
    *   *AWS API Gateway / Azure API Management*: Rechazados porque son propietarios, bloqueados a la nube y no se pueden ejecutar on-premise dentro de las redes locales del cliente.

### 3.2 Mecanismo de Autenticación
*   **Herramienta Elegida:** **JSON Web Tokens (JWT) firmados con RS256 + TLS mutuo (mTLS)**
*   **Por qué se eligió:** Los JWTs permiten sesiones de usuario sin estado, verificadas criptográficamente. mTLS (gestionado por Istio/Linkerd o Kong) asegura todo el tráfico interno de contenedor a contenedor, adhiriéndose a las directrices de Zero Trust.
*   **Alternativas Rechazadas:**
    *   *Stateful Session Cookies*: Restringe el escalado horizontal al requerir sincronización de sesiones o sesiones fijas (sticky) a través de instancias de contenedores distribuidas.

### 3.3 Estrategia de Limitación de Tasa (Rate Limiting)
*   **Herramienta Elegida:** **Rate Limiting de Ventana Deslizante impuesto en Kong Gateway usando Redis**
*   **Por qué se eligió:** Previene intentos de fuerza bruta o de denegación de servicio. Imponer esto en la capa de Gateway usando Redis ahorra ciclos de CPU a nivel de aplicación al descartar el tráfico no deseado antes de que llegue a los pods de NestJS.
*   **Alternativas Rechazadas:**
    *   *Límites de tasa en memoria a nivel de aplicación*: Riesgo de agotamiento de memoria y no comparte el estado de limitación de tasa a través de múltiples pods de aplicación horizontales.

---

## 4. Capa de Dominio y Aplicación

### 4.1 Patrón Arquitectónico
*   **Herramienta Elegida:** **Arquitectura Hexagonal (Puertos y Adaptadores) / Arquitectura Limpia**
*   **Por qué se eligió:** Obligatorio para asegurar que la capa de Dominio central tenga **absolutamente cero dependencias** de NestJS, TypeORM, PostgreSQL o SDKs de nube externos. La lógica core se comunica exclusivamente con interfaces (Puertos), haciendo que el kernel sea completamente soberano y a prueba de futuro.
*   **Alternativas Rechazadas:**
    *   *Arquitectura Estándar de 3 Capas*: Crea un fuerte acoplamiento entre la lógica de negocio, los ORMs de base de datos y los frameworks de red, violando nuestra restricción de soberanía no negociable.

### 4.2 Estrategia de Módulo / Contexto Delimitado
*   **Herramienta Elegida:** **Monolito Modular dentro de Nx Monorepo (Listo para Dapr)**
*   **Por qué se eligió:** Minimiza la complejidad inicial operativa y de despliegue para nuestro equipo de 5-10 ingenieros. Todos los contextos (`Identity`, `Authorization`, `Configuration`, `Audit`) están aislados dentro de límites estrictos de librería en Nx, permitiendo que se dividan en microservicios Dapr independientes sin refactorizar los modelos de dominio centrales.
*   **Alternativas Rechazadas:**
    *   *Microservicios Distribuidos desde el Día 1*: Alta complejidad operativa, sobrecarga de despliegue y latencia de red que abrumarían a un equipo de ingeniería pequeño.

### 4.3 Enfoque CQRS
*   **Herramienta Elegida:** **CQRS Híbrido (agregados BFF + tablas dedicadas de Escritura-Auditoría)** gobernado por **[ADR-0034](../02-adrs/core/0034-cqrs-pattern-applicability-matrix.md)**.
*   **Por qué se eligió:** Separa la intensidad de lectura/escritura sin sobre-ingeniería. Una matriz dedicada dicta que el CQRS Completo solo se desata cuando las proporciones de Lectura:Escritura superan 100:1 o los picos de contención de bloqueo de BD aumentan. Utiliza proyecciones de Redis para consultas BFF y SQL estrictamente ACID para Comandos.
*   **Alternativas Rechazadas:**
    *   *CQRS Universal*: Rechazado debido a la severa inflación de complejidad del código cuando se aplica a entidades CRUD simples.

---

## 5. Capa de Datos

### 5.1 Base de Datos Principal + ORM/Constructor de Consultas
*   **Herramienta Elegida:** **PostgreSQL v16 (Aislamiento de Esquema Por Contexto, [ADR-0031](../02-adrs/core/0031-schema-per-context-domain-event-catalog.md))**
*   **Por qué se eligió:** PostgreSQL 16 proporciona capacidades ACID empresariales. El **Esquema-Por-Contexto** obligatorio garantiza que ningún módulo realice nunca un join SQL directo a través de los datos privados de otro módulo, manteniendo una portabilidad al 100% para futuras extracciones de Microservicios.
*   **Alternativas Rechazadas:**
    *   *Esquema Público Compartido*: Causa un acoplamiento fatal entre módulos, haciendo imposibles los refactores de esquemas internos sin impactos masivos entre equipos.

### 5.2 Estrategia de Migración
*   **Herramienta Elegida:** **Migraciones TypeORM ejecutadas vía Init-Containers de K8s**
*   **Por qué se eligió:** Garantiza que los esquemas de base de datos estén versionados y las migraciones se ejecuten secuencialmente y con éxito antes de que los pods de la aplicación se activen, previniendo la desincronización de esquemas durante actualizaciones progresivas.
*   **Alternativas Rechazadas:**
    *   *TypeORM `synchronize: true`*: Extremadamente peligroso para entornos de producción, ya que puede causar pérdida accidental de datos.

### 5.3 Capa de Caché
*   **Herramienta Elegida:** **Redis v7.2 (Sentinel / Cluster Autohospedado)**
*   **Por qué se eligió:** Proporciona una caché en memoria distribuida, autohospedable y de ultrabaja latencia. Las configuraciones replicadas de Sentinel/Cluster aseguran alta disponibilidad y tiempos de lectura por debajo de 3ms para gráficos de autorización compilados.
*   **Alternativas Rechazadas:**
    *   *Memcached*: Carece de soporte robusto para estructuras de datos (hashes, sets, sorted sets) y failover de replicación nativa.

### 5.4 Almacenamiento de Objetos / Archivos
*   **Herramienta Elegida:** **MinIO (Autohospedado, Compatible con S3)**
*   **Por qué se eligió:** Almacenamiento de objetos de alto rendimiento completamente autohospedable. Implementa exactamente el contrato de API de AWS S3, permitiendo despliegues locales sin dependencia de la nube.
*   **Alternativas Rechazadas:**
    *   *AWS S3*: Rechazado como opción primaria porque es un servicio en la nube propietario que no se puede ejecutar localmente para despliegues on-premise.

### 5.5 Cola de Mensajes / Bus de Eventos
*   **Herramienta Elegida:** **RabbitMQ gobernado por Sagas Distribuidas ([ADR-0035](../02-adrs/core/0035-distributed-saga-pattern-strategy.md)) y Control de Flujo ([ADR-0036](../02-adrs/core/0036-message-bus-delivery-strategy-fifo-dlq.md))**
*   **Por qué se eligió:** Bróker AMQP de alto rendimiento. Todas las transmisiones DEBEN adherirse a las reglas de `[ADR-0036](../02-adrs/core/0036-message-bus-delivery-strategy-fifo-dlq.md)`: **FIFO** para secuencias, **Fuego y Olvido** para efectos secundarios, y **cuarentena obligatoria en DLQ** para píldoras venenosas. Utiliza **Transactional Outbox ([ADR-0033](../02-adrs/core/0033-transactional-outbox-pattern.md))** para prevenir la pérdida de datos por escritura parcial.
*   **Alternativas Rechazadas:**
    *   *Llamadas HTTP Síncronas Directas*: Crea el anti-patrón de "Monolito Distribuido" donde un servicio secundario caído hace que el flujo principal de pago falle.

---

## 6. Estrategia de Multi-tenancy

### 6.1 Modelo de Aislamiento
*   **Herramienta Elegida:** **Base de Datos Compartida con Row-Level Security (RLS) de PostgreSQL**
*   **Por qué se eligió:** Asegura una alta densidad de inquilinos y una sobrecarga de mantenimiento de base de datos ultrabaja. Las políticas RLS de PostgreSQL restringen el acceso dinámicamente basado en el contexto de la transacción activa (`SET LOCAL app.current_tenant = 'tenant_id'`), previniendo filtraciones de datos entre inquilinos a nivel de motor.
*   **Alternativas Rechazadas:**
    *   *Base de datos por inquilino*: Alto costo de infraestructura y severa sobrecarga administrativa al gestionar miles de bases de datos.
    *   *Esquema por inquilino*: Se vuelve difícil de escalar y migrar cuando los recuentos de inquilinos superan los 1,000, causando agotamiento del pool de conexiones.

### 6.2 Mecanismo de Resolución de Inquilino
*   **Herramienta Elegida:** **Interceptor NestJS + Contexto de Sesión de Conexión PostgreSQL**
*   **Por qué se eligió:** Resuelve el `tenant_id` desde las claims del JWT o cabeceras `X-Tenant-ID` en el ingreso, y usa un envoltorio de transacción de base de datos para inyectar el contexto del inquilino en la sesión activa de PostgreSQL dinámicamente.
*   **Alternativas Rechazadas:**
    *   *Filtrado a nivel de aplicación*: Propenso a omisiones de los desarrolladores (olvidar una cláusula `WHERE tenant_id = x`), lo que lleva a vulnerabilidades críticas de filtración de datos. RLS previene esto a nivel de base de datos.

---

## 7. Infraestructura y Despliegue

### 7.1 Contenerización
*   **Herramienta Elegida:** **Docker v25 con compilaciones multi-etapa sin distribución (distroless)**
*   **Por qué se eligió:** Reduce el tamaño de la imagen del contenedor al mínimo absoluto y elimina utilidades de shell estándar, endureciendo significativamente los contenedores de producción contra exploits de ejecución remota.

### 7.2 Orquestación
*   **Herramienta Elegida:** **Kubernetes (K8s v1.28+)**
*   **Por qué se eligió:** Estandariza el despliegue, escalado y autoreparación. Funciona de manera idéntica en nubes públicas (EKS, GKE) y clústeres locales on-premise (MicroK8s, Rancher K3s, OpenShift).

### 7.3 Gestión de Configuración y Secretos
*   **Herramienta Elegida:** **HashiCorp Vault (OSS, Autohospedado)**
*   **Por qué se eligió:** Un almacén de secretos altamente seguro, de grado empresarial y autohospedable. Los secretos se inyectan dinámicamente en los pods de K8s a través de sidecars Vault Agent Injector, asegurando que las credenciales nunca se expongan en texto plano.
*   **Alternativas Rechazadas:**
    *   *Secretos Estándar de K8s*: Almacenados en base64 en texto plano dentro de etcd, lo cual es inseguro sin una integración KMS compleja.

### 7.4 Helm Chart / Estrategia de Despliegue
*   **Herramienta Elegida:** **Charts parametrizados de Helm v3**
*   **Por qué se eligió:** Permite despliegues basados en paquetes, plantillando todos los recursos del Esqueleto de Referencia al tiempo que permite intercambios de parámetros fáciles (ej. alternar entre MinIO local versus S3 en la nube) entre entornos.

---

## 8. Observabilidad

### 8.1 Estándar de Instrumentación
*   **Herramienta Elegida:** **OpenTelemetry (estándar W3C Trace Context)**
*   **Por qué se eligió:** Impuesto por nuestros no negociables. Garantiza que el código de la aplicación permanezca completamente neutral respecto al proveedor. Si cambiamos de Jaeger/Loki a Datadog o New Relic, no tenemos que modificar ni una sola línea de código de aplicación.

### 8.2 Métricas
*   **Herramienta Elegida:** **Prometheus tirando del Coleccionista de OpenTelemetry**
*   **Por qué se eligió:** Agregador de métricas estándar, autohospedable y de rendimiento extremadamente alto para entornos de Kubernetes.

### 8.3 Trazado Distribuido
*   **Herramienta Elegida:** **Jaeger (OSS, Autohospedado)**
*   **Por qué se eligió:** Motor de trazado distribuido autohospedable y altamente fiable que recibe trazas estándar de OpenTelemetry.

### 8.4 Agregación de Logs
*   **Herramienta Elegida:** **Grafana Loki (OSS, Autohospedado)**
*   **Por qué se eligió:** Sistema de agregación de logs extremadamente eficiente que utiliza las mismas etiquetas de metadatos que Prometheus, permitiendo una correlación fluida entre métricas y logs dentro de los tableros de Grafana.

---

## 9. Seguridad

### 9.1 Auth e Identidad
*   **Herramienta Elegida:** **Resolutores OIDC/SAML Federados con Respaldo en Tienda Nativa BCrypt del Esqueleto de Referencia**
*   **Por qué se eligió:** Asegura la federación de identidad de grado empresarial (Okta, Keycloak, Azure AD) de fábrica a través de configuraciones OIDC/SAML, mientras retiene una tabla de usuarios local y segura con hash BCrypt para soportar operaciones on-premise localizadas.

### 9.2 Enfoque RBAC / ABAC
*   **Herramienta Elegida:** **RBAC Jerárquico compilado en gráficos de permisos granulares con evaluación de contexto ABAC**
*   **Por qué se eligió:** Satisface tanto el enrutamiento basado en roles (para el renderizado de UI) como la evaluación precisa de atributos (geofencing, umbrales de acción) requeridos por portales de clientes modernos e integrados.

### 9.3 Herramientas de Auditoría de Dependencias
*   **Herramienta Elegida:** **CLI de Código Abierto Snyk + `npm audit` ejecutado en la pipeline CI/CD**
*   **Por qué se eligió:** Bloquea compilaciones automáticamente si se detectan vulnerabilidades críticas (CVEs) en paquetes npm, protegiendo la cadena de suministro del software.

---

## 10. Experiencia del Desarrollador

### 10.1 Configuración de Desarrollo Local
*   **Herramienta Elegida:** **Especificación de Docker Compose**
*   **Por qué se eligió:** Permite a los desarrolladores levantar la suite completa de dependencias del Esqueleto de Referencia (PostgreSQL, Redis, RabbitMQ, MinIO, Kong Gateway) localmente con un solo comando (`docker compose up -d`), asegurando la consistencia del entorno.

### 10.2 Monorepo vs. Multi-repo
*   **Herramienta Elegida:** **Nx Monorepo**
*   **Por qué se eligió:** Simplifica la gestión de dependencias, permite compartir tipos de TypeScript entre frontend y backend instantáneamente, y utiliza almacenamiento en caché de construcción avanzado para minimizar los tiempos de compilación de CI.

### 10.3 Pirámide de Verificación y Estrategia de Carga ([ADR-0037](../02-adrs/core/0037-performance-concurrency-chaos-strategy.md))
*   **Herramientas Elegidas:**
    *   *Pruebas Unitarias*: Jest (Mocks explícitos obligatorios, cero IO).
    *   *Integración*: Jest + **Testcontainers** (Postgres/Redis activos levantados por ejecución).
    *   *Pruebas de Contrato*: **Pact JS** (Garantiza la seguridad de la API gRPC).
    *   *Carga/Concurrencia*: Inyección TS impulsada por scripts de **k6 (Grafana)** verificando condiciones de carrera.
    *   *Caos*: Terminación programada de pods verificando los Circuit Breakers Distribuidos ([ADR-0011](../02-adrs/core/0011-fault-tolerance-resiliency-patterns.md)).

---

## 11. Estrategia de Gestión de Errores

### 11.1 Cumplimiento de Patrones
*   **Herramienta Elegida:** **Patrón Result Funcional (clase neverthrow / Result<T, E>) ([ADR-0038](../02-adrs/nodejs/0038-error-handling-result-pattern-strategy.md))**
*   **Por qué se eligió:** Elimina caídas silenciosas en tiempo de ejecución por fallos de lógica de negocio. Obliga a la comprobación de errores segura en tipos en tiempo de compilación. Asegura una propagación clara de límites desde la lógica central a los mapeos de controladores REST/gRPC.
*   **Alternativas Rechazadas:**
    *   *Lanzamiento de Excepciones Estándar*: Inseguro, no tipado, y dispersa el flujo de control de gestión de errores de forma invisible a lo largo de la pila de ejecución.

---

## 12. Servicios de Terceros

Para evitar el bloqueo del proveedor de nube y dar soporte a entornos desconectados (offline) y on-premise, **cero integraciones de SaaS externo son obligatorias**. Las integraciones opcionales se abstraen completamente detrás de Puertos de Dominio.

| Nombre del Servicio | Propósito | Por qué NO Internamente | Alternativa Agnóstica a la Nube | Interfaz de Dominio |
| :--- | :--- | :--- | :--- | :--- |
| **Twilio** | Entrega de SMS OTP | Los gateways de operadoras de telecomunicaciones requieren complejos acuerdos globales. | Gateway Local SMTP-a-SMS o Módem SMS autohospedado | `ISmsPort` |
| **SendGrid** | Emails Transaccionales | Gestionar la reputación de IP y las colas de entrega de correo es una sobrecarga operativa masiva. | Servidor SMTP autohospedado Postfix / Haraka | `IEmailPort` |

---

## 13. Registro de Riesgos de Bloqueo del Proveedor (Vendor Lock-in)

| Componente | Solución Elegida | Riesgo de Bloqueo | Estrategia de Mitigación | Gatillo de Reevaluación |
| :--- | :--- | :--- | :--- | :--- |
| **Base de Datos** | PostgreSQL v16 | **Bajo** | Cumplimiento estándar de SQL. La capa de dominio no tiene dependencia directa (desacoplada vía Puertos). | Exceder 20 TB de datos activos |
| **Almacén de Objetos** | MinIO | **Bajo** | MinIO usa exactamente el contrato de API de AWS S3. El intercambio requiere un simple cambio de configuración. | Cuellos de botella en el rendimiento |
| **Almacén de Secretos**| HashiCorp Vault | **Bajo** | La resolución de secretos se abstrae vía inyección de secretos K8s o Adaptador personalizado. | Cambios en el modelo de licencias |
| **Gateway** | Kong Gateway | **Bajo** | La configuración se gestiona a través de recursos Ingress estándar de K8s. | Restricciones de enrutamiento personalizadas |

---

## 14. Registro de Decisiones

### Decisión 1: Runtime Node.js/TypeScript
*   **Opciones Consideradas:** TypeScript (Node.js), Golang, Java (Spring Boot)
*   **Elegido:** **TypeScript (Node.js)**
*   **Razón:** Se alinea con la fuerte experiencia existente del equipo, reduciendo el tiempo de comercialización y manteniendo bajos los costos de desarrollo. SWC mitiga la sobrecarga de compilación.
*   **Revisitar Cuando:** Cualquier compilación crítica de gráfico de permisos limitada por CPU supere los 100ms.

### Decisión 2: PostgreSQL con Row-Level Security (RLS)
*   **Opciones Consideradas:** Base de datos compartida con RLS, Esquema por inquilino, BD por inquilino
*   **Elegido:** **Base de Datos Compartida con RLS**
*   **Razón:** Ofrece alta densidad de empaquetamiento, bajo costo de infraestructura y aprovisionamiento de inquilinos extremadamente simple (<1s), mientras impone el aislamiento a nivel de motor.
*   **Revisitar Cuando:** El grupo de conexiones concurrentes activas de cualquier inquilino individual supere los umbrales de conexión de PostgreSQL, o las leyes de soberanía de datos exijan separación física.

---

## 15. Preguntas Abiertas

1.  **Gateways de SMS On-premise:** ¿Qué hardware SMS local o proveedores de telecomunicaciones están pre-aprobados por los clientes corporativos localizados?
    *   *Información Necesaria:* Contratos de SMS locales activos o especificaciones de hardware del gateway de SMS.
    *   *Resolutor bMAD:* **Agente Dev / Agente Infra** durante el onboarding de la Fase 05.
2.  **Registro Dinámico OIDC:** ¿Deberían las instalaciones on-premise soportar registros dinámicos de clientes OIDC, o deben preconfigurarse estáticamente a través de Helm?
    *   *Información Necesaria:* Capacidades de onboarding de la infraestructura TI del cliente.
    *   *Resolutor bMAD:* **Product Owner / Arquitecto de Soluciones** durante despliegues piloto.
