# [ADR 0030](0030-api-gateway-kong-vs-nestjs.md): Estrategia de Gateway de API - Kong Edge vs NestJS BFF

## Estado
Aprobado

## Fecha
2026-05-10

## Contexto
Utilizar hilos de la aplicaciÃ³n Node.js para realizar enrutamiento de infraestructura a nivel de red puro, limitaciÃ³n de tasa de volumen masivo o terminaciÃ³n SSL genÃ©rica desperdicia bucles de eventos de un solo hilo en sobrecarga, degradando la velocidad crÃ­tica de la aplicaciÃ³n. Por el contrario, empujar fusiones complejas de cargas Ãºtiles de API o agregados recursivos de bases de datos en scripts Lua de proxy sin procesar crea un atasco operativo.

## DecisiÃ³n
Formalizar un rÃ­gido **Modelo de Gateway Distribuido de Dos Capas** para desacoplar correctamente la infraestructura de la orquestaciÃ³n:

1. **Capa 1 - Edge Gateway (Kong OSS)**: Barrera de alto rendimiento basada en NGINX. Se sitÃºa literalmente en el perÃ­metro del clÃºster pÃºblico. Gestiona solo reglas transversales no funcionales: SSL, estrangulamiento de claves de API, validaciÃ³n de firma de origen JWT simple, reenvÃ­o de ruta y reglas WAF.
2. **Capa 2 - Gateway de AplicaciÃ³n (NestJS BFF)**: LÃ³gica de Node personalizada desplegada de forma segura dentro de la zona de seguridad de Capa 1. Responsable de componer respuestas de datos heterogÃ©neos, eliminar PII para formatos de UI genÃ©ricos, adaptar las cargas Ãºtiles del dispositivo y gestionar la mecÃ¡nica de cookies del usuario.

### Arquitectura Actualizada de Dos Capas

```mermaid
graph TD
    U["Clientes PÃºblicos (Mobile / Web)"] -->|TLS/HTTP| K["[Capa 1] Kong Edge Gateway"]
    
    subgraph SecureCluster["Red Protegida"]
        K -->|ReenvÃ­o| W["[Capa 2] NestJS Web BFF"]
        K -->|ReenvÃ­o| M["[Capa 2] NestJS Mobile BFF"]
        
        W --> API["NÃºcleo Plataforma Referencia"]
        W --> TMS["Transport Service"]
        M --> API
    end
```

## Consecuencias

### Positivas
- Separa las preocupaciones binarias en bruto de la agregaciÃ³n lÃ³gica. Node no desperdicia ciclos bloqueando DDOS/Spams.
- Capacidad de escala de rendimiento extremo. El nÃºcleo de NGINX devora cÃ³modamente volÃºmenes de trÃ¡fico que Node solo no puede.
- Mejora el aislamiento del backend (la Capa 1 protege explÃ­citamente a la Capa 2).

### Negativas
- AÃ±ade una variable de latencia de segundo salto (tÃ­picamente insignificante <1ms de sobrecarga si se despliega correctamente).
- Introduce el ciclo de vida del stack operativo de gestiÃ³n de Kong.

## Referencias
- [ADR-0008: Patrones Progresivos de BFF](../adrs/nodejs/0008-progressive-multimodule-evolution-gateway-bff.md)
- [ADR-0027: Borde de Protocolo Dual](../adrs/nodejs/0027-dual-protocol-rest-grpc-api-gateway.md)

---
[? Volver al Índice](./README.es.md)
