# [ADR 0024](0024-configuration-feature-management-platform.md): Plataforma de GestiÃ³n de CaracterÃ­sticas y ConfiguraciÃ³n

## Estado
Aprobado

## Fecha
2026-05-09

## Contexto
El SaaS moderno demanda agilidad total en tiempo de ejecuciÃ³n. Codificar rÃ­gidamente los enlaces de Proveedores de Identidad, variables operativas (ej. TTL de sesiÃ³n, branding de la empresa) o parÃ¡metros de feature flags directamente en variables de entorno de la aplicaciÃ³n crea una pesada fricciÃ³n de despliegue, invalida la auditorÃ­a inmediata y mata la personalizaciÃ³n flexible especÃ­fica de inquilinos en tiempo de ejecuciÃ³n.

## DecisiÃ³n
Introducir un **Contexto Delimitado de GestiÃ³n de CaracterÃ­sticas y ConfiguraciÃ³n** autoritativo que consolide los comportamientos del sistema:

1. **AlmacÃ©n de IdP DinÃ¡mico**: Trasladar las configuraciones de identidad fuera de los archivos de entorno hacia pools de bases de datos multi-tenant, cifrados con AES-256 haciendo referencia a bÃ³vedas de secretos externas. Permite cambiar los proveedores SSO de los inquilinos instantÃ¡neamente con cero empuje de cÃ³digo.
2. **DinÃ¡mica del Sistema**: Entregar configuraciones JSON versionadas que gobiernan comportamientos (requisitos MFA, branding, acceso a caracterÃ­sticas) leÃ­das directamente por los controladores de la aplicaciÃ³n en la instanciaciÃ³n del ciclo de vida o empujes de sockets en tiempo real.
3. **Marco de Banderas (Flag Framework)**: Desplegar un motor integrado de Banderas Booleanas/Variantes que soporte una profunda segmentaciÃ³n multidimensional (Rol, Entorno, Rama, Grupo) y divisiÃ³n de trÃ¡fico basada en porcentajes.
4. **Capa de Velocidad Redis**: Aislar las evaluaciones de configuraciÃ³n en namespaces Redis dedicados (`cfg:*`, `flags:*`), garantizando evaluaciones de decisiÃ³n sub-3ms en las intersecciones de ejecuciÃ³n.

## Consecuencias

### Positivas
- Verdadero multi-tenancy dinÃ¡mico: los sistemas se adaptan en tiempo real por perfil de empresa sin recargas.
- Seguimiento completo del ciclo de vida: cualquier pivotaje de configuraciÃ³n crea registros histÃ³ricos absolutos.
- Aislamiento directo del riesgo a travÃ©s de puertas de despliegue incremental seguras.

### Negativas
- Modesta expansiÃ³n de la topologÃ­a del esquema de base de datos y de las estrategias de gobernanza de claves Redis activas.

## Referencias
- [ADR-0025: Estrategia de AbstracciÃ³n de Feature Flags](../adrs/core/0025-feature-flag-provider-abstraction.md)
- [ADR-0014: Estrategia de CachÃ© Redis](../adrs/core/0014-distributed-caching-strategy-redis.md)

---
[? Volver al Índice](./README.es.md)
