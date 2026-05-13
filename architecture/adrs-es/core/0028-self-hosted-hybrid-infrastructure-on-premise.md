# [ADR 0028](0028-self-hosted-hybrid-infrastructure-on-premise.md): Infraestructura HÃ­brida de CÃ³digo Abierto Autohospedada

## Estado
Aprobado

## Fecha
2026-05-09

## Contexto
Confiar Ãºnicamente en proveedores de nube serverless cautivos (ej., AWS SQS, DynamoDB, Cognito) mata la capacidad de desplegar en redes corporativas soberanas de clientes desconectados (air-gapped) localmente (on-premise). Las curvas de precios en la nube se expanden salvajemente bajo un alto rendimiento. Requerimos soberanÃ­a tecnolÃ³gica absoluta que se refleje sin problemas en nubes pÃºblicas Y clÃºsteres de hardware desconectados.

## DecisiÃ³n
Gobernar estrictamente la selecciÃ³n de herramientas internas basÃ¡ndose en el **Principio del 100% de CÃ³digo Abierto, Autohospedable y Extensibilidad Plug-and-Play**:

1. **Infraestructura como Puerto**: NINGÃšN SDK/LibrerÃ­a de infraestructura concreta de los productos enumerados a continuaciÃ³n puede cruzar jamÃ¡s a las capas de Dominio/AplicaciÃ³n. Deben estar estrictamente encapsulados detrÃ¡s de `Ports` de TypeScript puro. Cambiar MinIO por AWS S3 o RabbitMQ por Kafka requiere editar ÃšNICAMENTE un solo archivo de Adaptador de Infraestructura.
2. **MinIO (Almacenamiento de Objetos)**: Estandarizar en el motor compatible con S3. Ejecutar directamente en el clÃºster de Kubernetes local.
3. **RabbitMQ (Bus)**: Impulsar la comunicaciÃ³n asÃ­ncrona vÃ­a brÃ³kers AMQP de cÃ³digo abierto en lugar de colas propietarias.
4. **Vault y KeyCloak**: Manejar la distribuciÃ³n local nativa de secretos y pools de credenciales localizados usando ecosistemas CNCF probados.
5. **PostgreSQL/Redis Directos**: Impulsar el almacenamiento en cachÃ© y el estado a travÃ©s de motores v16+ nativos desplegados vÃ­a Helm, saltÃ¡ndose las limitaciones de BD gestionadas envueltas por el proveedor.

## Consecuencias

### Positivas
- 100% Cloud Neutral: El cÃ³digo se despliega en cualquier lugar, desde el Mac de un ingeniero hasta un clÃºster militar aislado, con cero refactorizaciÃ³n.
- Transparencia total de costos: Elimina las opacas facturas de escalado basadas en transacciones.

### Negativas
- Incrementa la sobrecarga administrativa. El DevOps local debe mantener la replicaciÃ³n, las copias de seguridad y los parches de escala que las principales nubes tÃ­picamente manejan automÃ¡ticamente.

## Referencias
- [ADR-0013: TopologÃ­a Cloud](../adrs/core/0013-cloud-infrastructure-topology-dr.md)
- [Referencia de DefiniciÃ³n de Stack](../../02-architecture/stack.md)

---
[? Volver al Índice](./README.es.md)
