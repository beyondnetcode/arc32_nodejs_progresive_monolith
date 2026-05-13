# [ADR 0008](0008-progressive-multimodule-evolution-gateway-bff.md): EvoluciÃ³n Progresiva Multi-MÃ³dulo con API Gateway y Patrones BFF

## Estado
Aprobado

## Fecha
2026-05-08

## Contexto
Actualmente, el repositorio de la Plataforma de Referencia opera como un monolito modular. Sin embargo, la plataforma estÃ¡ destinada a escalar hacia un portal unificado para mÃºltiples mÃ³dulos corporativos futuros (GestiÃ³n de Transporte - TMS, GestiÃ³n de AlmacÃ©n - WMS). Estos deben ser servicios independientes y desacoplados con bases de datos aisladas.

Sin una capa Backend For Frontend (BFF), los clientes diversos (web rica, mÃ³vil de bajo ancho de banda, B2B) forzarÃ­an endpoints genÃ©ricos, conduciendo al over-fetching y a una gestiÃ³n rÃ­gida del estado del cliente. Necesitamos una estructura para soportar diversos contratos de cliente sin acoplarlos estrechamente a los microservicios del backend.

## DecisiÃ³n
Adoptar una **Arquitectura de Gateway Backend For Frontend (BFF) Distribuida y Multi-MÃ³dulo Progresiva**:

1. **Gateways BFF Dedicados**: Adaptar gateways dedicados para cada tipo de cliente en lugar de compartir un Ãºnico punto de entrada genÃ©rico:
   - **Web BFF**: Maneja sesiones basadas en cookies y agrega cargas Ãºtiles para visualizaciones de escritorio ricas.
   - **Mobile BFF**: Comprime datos, combina roundtrips para redes de alta latencia y traduce a cargas Ãºtiles optimizadas para mÃ³viles.
   - **B2B API Gateway**: Maneja la limitaciÃ³n de tasa (rate-limiting) y la autenticaciÃ³n con Clave de API para socios externos.

2. **Aislamiento Aguas Abajo**: Los clientes pÃºblicos NUNCA se comunican directamente con los servicios internos (TMS, WMS). Todo el trÃ¡fico fluye a travÃ©s de los BFFs asignados que actÃºan como fronteras de seguridad y composiciÃ³n.

3. **TraducciÃ³n de Protocolos**: Permitir la comunicaciÃ³n interna de microservicios vÃ­a gRPC de alta velocidad mientras se traduce a HTTP/REST estÃ¡ndar en el borde del BFF.

### Resumen de la Arquitectura del Sistema

```mermaid
graph TD
    Web["AplicaciÃ³n Web React"] -->|HTTP/Cookies| WebBFF["Web BFF Gateway"]
    Mobile["AplicaciÃ³n Cliente MÃ³vil"] -->|HTTP/JSON| MobileBFF["Mobile BFF Gateway"]
    B2B["Integraciones B2B Externas"] -->|HTTPS/Clave API| B2BGateway["B2B API Gateway"]

    subgraph InternalNetwork["Zona de Confianza Interna (gRPC)"]
        WebBFF --> CoreAPI["API Plataforma Referencia"]
        WebBFF --> TMS["Servicio TMS"]
        MobileBFF --> CoreAPI
        MobileBFF --> TMS
        B2BGateway --> WMS["Servicio WMS"]
    end
```

## Consecuencias

### Positivas
- **Rendimiento del Cliente**: Las aplicaciones mÃ³viles obtienen exactamente lo que necesitan, reduciendo el uso de datos y los recorridos de red (roundtrips).
- **Escalabilidad Independiente**: Escalar el BFF MÃ³vil independientemente del BFF Web basado en el trÃ¡fico de dispositivos en tiempo real.
- **Contratos Desacoplados**: Modificar las APIs internas aguas abajo sin romper las versiones de frontend existentes.

### Negativas
- **ProliferaciÃ³n de Gateways**: Gestionar bases de cÃ³digo separadas para diferentes BFFs incrementa la complejidad de CI/CD.
- Requiere disciplina para mantener la lÃ³gica de negocio fuera del BFF (solo deberÃ­a orquestar y componer).

## Referencias
- [ADR-0030: Kong Gateway vs NestJS BFF](../adrs/core/0030-api-gateway-kong-vs-nestjs.md)

---
[? Volver al Índice](./README.es.md)
