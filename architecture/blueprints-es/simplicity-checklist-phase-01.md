# âœ… Checklist de AutoevaluaciÃ³n de Simplicidad â€” Arquitectura de Fase 1

Este documento sirve como salvaguarda contra la sobre-ingenierÃ­a prematura. Antes de aprobar una lÃ­nea base de Fase 1, el arquitecto y el equipo de desarrollo deben responder afirmativamente a las siguientes preguntas para validar que no se estÃ¡ introduciendo carga operativa o de desarrollo innecesaria.

> ðŸŽ¯ **Principio Rector**: *"Cualquier complejidad que no sea estrictamente necesaria para un monolito inicial DEBE posponerse a fases posteriores."*

---

## ðŸ” Lista de ValidaciÃ³n de Simplicidad

- [ ] **1. ComunicaciÃ³n Intra-Proceso**: Â¿Los mÃ³dulos interactÃºan mediante llamadas a funciones directas en el mismo hilo/proceso en lugar de invocar APIs REST/gRPC de red internas?
- [ ] **2. CÃ³mputo de Despliegue MÃ­nimo**: Â¿Se ha evitado el uso de orquestadores complejos (Kubernetes, Nomad) en favor de soluciones directas (Docker Compose, App Services o una VM estÃ¡ndar)?
- [ ] **3. InyecciÃ³n AsÃ­ncrona Simplificada**: Â¿Se ha implementado un EventBus "In-Memory" para el desarrollo inicial, posponiendo el levantamiento de clÃºsteres RabbitMQ/Kafka hasta el desacoplamiento real?
- [ ] **4. Patrones Transaccionales Simples**: Â¿Se han evitado patrones distribuidos como **Saga**, **Transactional Outbox** o **CQRS**, confiando en transacciones ACID nativas de la base de datos mientras exista un solo esquema?
- [ ] **5. Puertos Esenciales Sin Wrappers**: Â¿Se han utilizado Puertos (Contratos) y Adaptadores (Implementaciones directas) OBLIGATORIOS para proteger el dominio, evitando wrappers complejos o capas de anti-corrupciÃ³n redundantes?
- [ ] **6. Seguridad de Red Local**: Â¿Se han pospuesto los requisitos de malla de servicio mTLS o firewall interno, confiando en el aislamiento de la infraestructura del host Ãºnico?
- [ ] **7. Observabilidad Suficiente**: Â¿La telemetrÃ­a se enfoca exclusivamente en logs estructurados JSON y mÃ©tricas base, posponiendo el trazado distribuido complejo hasta que haya mÃºltiples saltos de red?
- [ ] **8. DocumentaciÃ³n Justo a Tiempo**: Â¿Se han redactado notas de diseÃ±o y diagramas ligeros enfocados en el dominio en lugar de generar blueprints arc42 exhaustivos antes de codificar?
- [ ] **9. Un Solo DataStore**: Â¿Toda la persistencia y estado reside en el motor Postgres/Redis base sin introducir motores especializados o bases de datos de grafos/bÃºsqueda de forma prematura?
- [ ] **10. Controladores Ligeros**: Â¿El API Gateway (ej. Kong) se utiliza solo para enrutamiento externo bÃ¡sico, sin programar lÃ³gica de negocio personalizada dentro de sus plugins?

---
âš ï¸ **Nota de Gobernanza**: Si mÃ¡s de 3 Ã­tems en este checklist NO se cumplen, la arquitectura se considera en riesgo de Hipertrofia Prematura y debe ser revisada para su simplificaciÃ³n antes de iniciar la Fase de ConstrucciÃ³n.

---
[? Volver al Índice](./README.es.md)
