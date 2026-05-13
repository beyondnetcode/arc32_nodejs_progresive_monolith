# [ADR 0017](0017-feature-flagging-strategy.md): Estrategia de Feature Flagging para Entrega Progresiva

## Estado
Aprobado

## Fecha
2026-05-09

## Contexto
Impulsar nuevas expansiones funcionales a producciÃ³n conlleva un riesgo operativo elevado. Para rebajar los techos de riesgo, el cÃ³digo debe liberarse desactivado dentro de rutas de tiempo de ejecuciÃ³n dirigidas, desbloqueÃ¡ndose especÃ­ficamente para clientes Alpha, datos demogrÃ¡ficos de usuarios graduales, o clÃºsteres enteros sin invocar re-despliegues de pipeline o migraciones de base de datos.

## DecisiÃ³n
Tratar el enrutamiento dinÃ¡mico de caracterÃ­sticas como una **InyecciÃ³n de Infraestructura** estÃ¡ndar, completamente disjunta de las arquitecturas de persistencia:

1. **Desacoplamiento de Servicios**: Evitar la creaciÃ³n de tablas fÃ­sicas `toggles` en la base de datos. Utilizar planos de gestiÃ³n SaaS externos autoritativos (ej. ConfigCat, Unleash, LaunchDarkly) nativamente a travÃ©s de espejos locales SDK eficientes en tiempo de ejecuciÃ³n.
2. **InversiÃ³n Hexagonal**: Las bases de cÃ³digo se comunican estrictamente con interfaces abstractas locales (`IFeatureTogglePort`). Los proveedores concretos implementan mÃ³dulos adaptadores ocultos que evalÃºan expresiones de forma segura fuera del hilo principal.
3. **Evaluadores en Tiempo de EjecuciÃ³n**: Enrutar bifurcaciones dentro de los comandos del servicio utilizando verificaciones de toggle inyectadas para interruptores canarios inmediatos sin intervenciÃ³n (zero-touch) y rollbacks instantÃ¡neos.

## Consecuencias

### Positivas
- Permite ingenierÃ­a Trunk-Based desacoplada: las fusiones (merges) no equivalen a lanzamientos.
- Concede controles operativos instantÃ¡neos (Kill Switch) a personal no tÃ©cnico fuera de los lÃ­mites de CI.

### Negativas
- Acumula "Deuda TÃ©cnica" si las banderas no estÃ¡n programadas para su eliminaciÃ³n tras la estabilizaciÃ³n.
- Introduce bifurcaciones lÃ³gicas dinÃ¡micas que inflan la complejidad ciclomÃ¡tica de las pruebas.

## Referencias
- [ADR-0025: AbstracciÃ³n de Feature Flags](../adrs/core/0025-feature-flag-provider-abstraction.md)
- [ADR-0024: GestiÃ³n de ConfiguraciÃ³n](../adrs/core/0024-configuration-feature-management-platform.md)

---
[? Volver al Índice](./README.es.md)
