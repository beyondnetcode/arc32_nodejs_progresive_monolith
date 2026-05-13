# [ADR 0027](0027-dual-protocol-rest-grpc-api-gateway.md): Estrategia de API de Protocolo Dual (REST y gRPC)

## Estado
Aprobado

## Fecha
2026-05-09

## Contexto
Exponer la charla interna entre microservicios vÃ­a APIs REST estÃ¡ndar JSON HTTP/1.1 conduce a una degradaciÃ³n masiva del rendimiento (cadenas detalladas, ciclos de decodificaciÃ³n de texto). Sin embargo, la exposiciÃ³n externa absoluta debe permanecer como REST estÃ¡ndar para preservar la accesibilidad de desarrolladores externos. Un Ãºnico protocolo no satisfarÃ¡ tanto la eficiencia interna como la compatibilidad externa.

## DecisiÃ³n
Orquestar un **Borde de Tiempo de EjecuciÃ³n de Protocolo Dual** estricto emparejado con la orquestaciÃ³n del Gateway Kong:

1. **REST EstÃ¡ndar (PÃºblico)**: Todos los agentes de navegador, aplicaciones de portales de clientes y gateways B2B consumen APIs REST JSON seguras y documentadas sobre HTTPS estÃ¡ndar.
2. **gRPC Binario (Interno)**: Cualquier apretÃ³n de manos de autorizaciÃ³n interno crÃ­tico para la misiÃ³n, verificaciÃ³n de token de mÃ¡quina a mÃ¡quina o stream entre servicios se transmite estrictamente sobre llamada a procedimiento remoto de Google (gRPC) binaria, aprovechando cargas Ãºtiles densas de Protocol Buffers.
3. **Abastecimiento Unificado**: Impulsar los contratos internos nativamente utilizando definiciones maestras `.proto` seguidas centralmente en el monorepo Nx en `libs/contracts`, compilando automÃ¡ticamente enlaces (bindings) limpios de cÃ³digo generado en Typescript.

## Consecuencias

### Positivas
- Colapsa la huella de ancho de banda de las cargas Ãºtiles internas.
- Acelera drÃ¡sticamente la latencia de validaciÃ³n de backend a backend utilizando pipelines HTTP/2 multiplexados.
- Preserva la simplicidad del descubrimiento vÃ­a Swagger pÃºblico para desarrolladores corporativos globales.

### Negativas
- Los desarrolladores deben generar y compilar librerÃ­as Proto localmente, complicando ligeramente el tiempo de rampa de las estaciones de trabajo de desarrollo locales.

## Referencias
- [ADR-0002: Arquitectura Limpia](../adrs/nodejs/0002-clean-architecture-nestjs.md)
- [Sitio Oficial de gRPC](https://grpc.io/)

---
[? Volver al Índice](./README.es.md)
