# [ADR 0025](0025-feature-flag-provider-abstraction.md): Estrategia de AbstracciÃ³n de Proveedor de Feature Flags

## Estado
Aprobado

## Fecha
2026-05-09

## Contexto
Incorporar Feature Flags introduce riesgos de bloqueo de proveedor. Codificar rÃ­gidamente la lÃ³gica del SDK directamente desde plataformas propietarias (Unleash, ConfigCat, LaunchDarkly) viola principios core al incrustar comportamientos no estÃ¡ndar directamente dentro de los casos de uso de negocio. Requerimos intercambiabilidad total de proveedores en caliente.

## DecisiÃ³n
Subsumir la invocaciÃ³n de selectores de caracterÃ­sticas (feature toggles) bajo los principios clÃ¡sicos de Puerto Hexagonal:

1. **Puerto CanÃ³nico**: El repositorio central define `IFeatureFlagPort`, detallando contratos de ejecuciÃ³n universales (`evaluate()`, `isHealthy()`) enteramente aislados de la sintaxis de librerÃ­as comerciales.
2. **Infraestructura Enchufable**: Confinar todos los SDKs concretos de terceros en capas de Adaptador externas explÃ­citas. Soportamos estrategias de respaldo internas de Postgres junto con mÃ³dulos nativos de LaunchDarkly, ConfigCat o Azure simultÃ¡neamente.
3. **ResoluciÃ³n DinÃ¡mica**: Instanciar el adaptador del proveedor correcto vÃ­a inyectores de dependencia NestJS en tiempo de ejecuciÃ³n que miren claves de configuraciÃ³n activas especÃ­ficas.

## Consecuencias

### Positivas
- Inmunidad completa a picos de precios externos o problemas de estabilidad de la plataforma (respaldo local inmediato).
- Alta compatibilidad futura con respecto a la eventual estandarizaciÃ³n en los esquemas openFeature de la CNCF.

### Negativas
- Costo de mantenimiento asociado al sostenimiento de mÃºltiples clases de adaptadores especializados orientados a diversos formatos de proveedores.

## Referencias
- [ADR-0024: Plataforma de ConfiguraciÃ³n](../adrs/core/0024-configuration-feature-management-platform.md)
- [ADR-0002: Arquitectura Hexagonal](../adrs/nodejs/0002-clean-architecture-nestjs.md)

---
[? Volver al Índice](./README.es.md)
