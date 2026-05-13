# [ADR 0014](0014-distributed-caching-strategy-redis.md): Estrategia de CachÃ© Distribuido Multi-Capa

## Estado
Aprobado

## Fecha
2026-05-08

## Contexto
El rendimiento de lectura repetitivo y de alta intensidad durante las horas pico de operaciÃ³n puede agotar completamente los recursos fÃ­sicos de PostgreSQL. Leer catÃ¡logos de configuraciÃ³n genÃ©ricos, realizar bÃºsquedas de estado constantes o acceder frecuentemente a agregados desde discos en bruto conduce a respuestas lentas y escalas de carga inmanejables.

## DecisiÃ³n
Evolucionar hacia una **Estrategia de CachÃ© Escalonado Multi-Capa** integral utilizando almacenamiento en cachÃ© en el borde de CDN y nodos Redis distribuidos para interceptar y resolver las peticiones de lectura lo mÃ¡s cerca posible del usuario:

### Nivel 1: Borde PÃºblico (CDN Opcional y Configurable)
El sistema soporta la integraciÃ³n de una Red de DistribuciÃ³n de Contenidos (CDN) (ej. Cloudflare, Akamai) desplegada delante del Gateway Kong Edge. Esta capa es **totalmente opcional y configurable dinÃ¡micamente** en los ajustes de topologÃ­a de infraestructura; los despliegues a pequeÃ±a escala pueden desactivar esta capa para enrutar directamente al origen, mientras que el escalado Enterprise puede activarla vÃ­a configuraciÃ³n de entorno.
*   **Alcance**: Activos estÃ¡ticos de la aplicaciÃ³n (JS, CSS, imÃ¡genes), archivos de branding multi-tenant, y APIs de catÃ¡logo pÃºblico de solo lectura con baja volatilidad.
*   **Impacto**: Cero utilizaciÃ³n del origen del servidor para las peticiones que coincidan.

### Nivel 2: Borde de AplicaciÃ³n (CachÃ© Redis a Nivel de BFF)
Desplegar namespaces de cachÃ© de Redis vinculados directamente a las instancias NestJS BFF del Tier-2.
*   **Alcance**: Modelos de Vista a medida, respuestas JSON de tableros compilados y segmentos agregados de GraphQL.
*   **Impacto**: Intercepta los ciclos de peticiones repetidas EN EL PERÃMETRO, evitando por completo los recorridos sÃ­ncronos gRPC aguas abajo hacia la capa API central.

### Nivel 3: NÃºcleo Profundo (CachÃ© Redis de AplicaciÃ³n)
Retener namespaces Redis compartidos dedicados que sirvan al dominio de la API Core.
*   **Alcance**: Conjuntos de consultas relacionales, GrÃ¡ficos de AutorizaciÃ³n, matrices de permisos activos y agregados de Dominio deshidratados.
*   **AbstracciÃ³n**: El acceso permanece gobernado estrictamente vÃ­a la interfaz `ICachePort` adhiriÃ©ndose a las reglas de pureza Hexagonal.

## Consecuencias

### Positivas
- Descarga un inmenso volumen de consultas del motor SQL relacional.
- Logra que los picos de latencia de la API se sitÃºen frecuentemente por debajo de <50ms para objetos pre-calentados.
- Impulsa el compromiso del usuario y la fluidez de la experiencia para zonas crÃ­ticas de la aplicaciÃ³n.

### Negativas
- La lÃ³gica de Invalidez de CachÃ© crea un Ã¡rea de superficie no trivial para bugs de sincronizaciÃ³n (regla de "El CachÃ© es difÃ­cil").
- Introduce la configuraciÃ³n de nodos de hardware adicionales relacionados con la persistencia en los blueprints de operaciÃ³n.

## Referencias
- [PatrÃ³n Redis Cache-Aside](https://redis.io/docs/develop/cache/)
- [ADR-0002: Arquitectura Hexagonal Limpia](../adrs/nodejs/0002-clean-architecture-nestjs.md)

---
[? Volver al Índice](./README.es.md)
