# [ADR 0032](0032-api-protocol-decision-matrix-rest-grpc-graphql.md): Matriz de SelecciÃ³n de Protocolo de API (REST vs gRPC vs GraphQL)

## Estado
Aprobado

## Fecha
2026-05-11

## Contexto
A medida que el monolito modular evoluciona hacia un ecosistema multi-mÃ³dulo con mÃºltiples BFFs (Backend For Frontends), apps mÃ³viles e integraciones corporativas externas, la selecciÃ³n del protocolo de comunicaciÃ³n correcto para cada ruta de interacciÃ³n es crÃ­tica. Emplear una estrategia de "talla Ãºnica" conduce a un trÃ¡fico interno con bajo rendimiento (REST) o a clientes de navegador excesivamente complejos (gRPC/Protobuf). Necesitamos un marco decisivo que guÃ­e a los desarrolladores sobre quÃ© protocolo exacto adoptar en funciÃ³n del lÃ­mite de interacciÃ³n y del tipo de consumidor.

## DecisiÃ³n
Establecemos una **Matriz de Ajuste de Protocolo Estricta** adaptada a niveles arquitectÃ³nicos especÃ­ficos:

### 1. ComunicaciÃ³n Interna Servicio-a-Servicio
ðŸ“œ **MANDATO: gRPC (Protocol Buffers sobre HTTP/2)**
*   **Alcance**: Llamadas sÃ­ncronas entre contextos delimitados internos (ej., el contexto de Pedidos validando la autorizaciÃ³n del usuario con el contexto de Identidad).
*   **RazÃ³n fundamental**: Alto rendimiento, la serializaciÃ³n binaria colapsa el uso del ancho de banda, y seguridad de tipos estricta a travÃ©s de contratos `.proto` unificados.

### 2. IntegraciÃ³n Externa y Terceros PÃºblicos
ðŸ“œ **MANDATO: REST (JSON sobre HTTPS)**
*   **Alcance**: Integraciones de clientes externos, conexiones de gateways corporativos legacy, y APIs pÃºblicas globales para desarrolladores.
*   **RazÃ³n fundamental**: Universalidad en la industria, consumo trivial vÃ­a librerÃ­as HTTP estÃ¡ndar, depuraciÃ³n/pruebas mÃ¡s sencillas, y documentaciÃ³n interactiva amplia (OpenAPI/Swagger).

### 3. Portales Frontend y OrquestaciÃ³n de BFF DinÃ¡mica
ðŸ“œ **MANDATO: REST (Primario) / GraphQL (Enriquecimiento Dirigido)**
*   **Flujos EstÃ¡ndar**: Por defecto a APIs REST convencionales para comandos transaccionales (Crear/Actualizar).
*   **Escenarios de Lectura Ricos/Anidados**: Adoptar **GraphQL** estrictamente al nivel de BFF NestJS cuando una pantalla requiera agregaciÃ³n de datos compleja (obtener Entidades, TaxonomÃ­as asociadas, AuditorÃ­as y relaciones simultÃ¡neamente) para prevenir el over-fetching mÃ³vil/web y los mÃºltiples roundtrips secuenciales.

### Ãrbol de DecisiÃ³n de SelecciÃ³n

| Escenario | Protocolo Preferido | JustificaciÃ³n |
| :--- | :--- | :--- |
| **MÃ¡quina-a-MÃ¡quina (Interno)** | **gRPC** | Baja latencia, compactaciÃ³n binaria, fuertemente tipado. |
| **Cargas/Streams de Archivos** | **gRPC / REST** | Capacidad de streaming nativa o multipart simple. |
| **Open API PÃºblica / Docs Desarrollador** | **REST** | EstÃ¡ndar absoluto, adopciÃ³n de proveedores mÃ¡s fÃ¡cil. |
| **Tableros Agregados de Alta Densidad** | **GraphQL** | Resuelve el under-fetching / bÃºsquedas recursivas. |
| **RecuperaciÃ³n de Datos MÃ³viles Bajo Consumo**| **GraphQL** | El cliente define estrictamente la forma de los datos hasta el bit. |
| **CRUD EstÃ¡ndar (Guardar Usuario, Borrar Tarea)**| **REST** | Cacheabilidad predecible, semÃ¡ntica HTTP nativa. |

## Directrices de Arquitectura
- **Aislamiento de GraphQL**: La lÃ³gica de tiempo de ejecuciÃ³n de GraphQL DEBE existir solo dentro de los nodos de aplicaciÃ³n BFF del Tier-2. Las definiciones de API de dominio core nunca soportan nativamente resolutores de GraphQL para evitar la fuga de restricciones especÃ­ficas de la vista hacia la lÃ³gica de negocio del dominio.
- **CentralizaciÃ³n de Protobuf**: Todos los esquemas de servicios gRPC internos (.proto) se alojan y versionan en un espacio de trabajo unificado `libs/contracts` para evitar modelos de interfaz con deriva (drift).

## Consecuencias

### Positivas
- La aplicaciÃ³n correcta de herramientas optimiza la huella de red general.
- Empodera la velocidad del frontend permitiendo actualizaciones dinÃ¡micas de consultas de vista sin forzar ciclos de despliegue del backend (vÃ­a GraphQL).
- Asegura la mÃ¡xima escalabilidad para interconexiones de microservicios vÃ­a conductos binarios multiplexados.

### Negativas
- Los desarrolladores deben navegar por tres ecosistemas de protocolos concurrentes.
- Introduce costos de configuraciÃ³n para capas de ejecuciÃ³n GraphQL y herramientas de gobernanza de esquemas dentro de los stacks BFF.

## Referencias
- [ADR-0027: Estrategia de Protocolo Dual](../adrs/nodejs/0027-dual-protocol-rest-grpc-api-gateway.md)
- [ADR-0030: Patrones de Gateway de Dos Capas](../adrs/core/0030-api-gateway-kong-vs-nestjs.md)

---
[? Volver al Índice](./README.es.md)
