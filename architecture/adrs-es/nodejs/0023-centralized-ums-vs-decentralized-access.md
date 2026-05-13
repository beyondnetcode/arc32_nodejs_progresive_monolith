# [ADR 0023](0023-centralized-TODO-vs-decentralized-access.md): Estrategia de NÃºcleo de AutorizaciÃ³n Centralizado

## Estado
Aprobado

## Fecha
2026-05-09

## Contexto
Los clÃºsteres de plataformas empresariales sufren de silos de identidad inconexos. Repartir la verificaciÃ³n de roles a travÃ©s de las aplicaciones aguas abajo invita a una imposiciÃ³n de polÃ­ticas fragmentada, agujeros de seguridad ocultos, una latencia administrativa masiva y una auditabilidad legal fragmentada. Requerimos un "kernel" de autorizaciÃ³n consolidado.

## DecisiÃ³n
Comprometerse a construir y desplegar el sistema como el **NÃºcleo de AutorizaciÃ³n Centralizado** que sirve a todas las herramientas de la compaÃ±Ã­a satÃ©lites:

1. **ConsolidaciÃ³n de Kernel**: Centralizar la responsabilidad de analizar identidades, agregar Ã¡rboles de roles activos y ejecutar puertas lÃ³gicas en un Ãºnico dominio altamente endurecido (hardened).
2. **Entrega Desacoplada**: Retener la abstracciÃ³n funcional: la validaciÃ³n de identidad (encontrar *quiÃ©n*) se mantiene desacoplada de la compilaciÃ³n de autorizaciÃ³n lÃ³gica (conceder *quÃ©*), delegada limpiamente a travÃ©s de capas de inyecciÃ³n de Estrategia establecidas.
3. **Salida Multi-ProyecciÃ³n**: Producir cargas Ãºtiles canÃ³nicas de permisos formateadas al vuelo ya sea en Ã¡rboles JSON pesados para el renderizado de portales o en conjuntos de claims JWT comprimidos eficientes para la verificaciÃ³n interna de microservicios.
4. **Velocidad Masiva**: Anclar la estabilidad de recuperaciÃ³n sobre clÃºsteres de Redis Distribuidos ejecutando resoluciones de permisos bajo **presupuestos de latencia total <5ms**.

## Consecuencias

### Positivas
- SeparaciÃ³n de preocupaciones (SoC) absoluta. Las aplicaciones aguas abajo se enfocan solo en el flujo de negocio, dejando la seguridad de autenticaciÃ³n al kernel consolidado.
- Registro de gobernanza singular y autoritativo de todos los accesos al sistema y mutaciones de privilegios.
- Velocidades de respuesta excepcionales vÃ­a almacenamiento en cachÃ© Distribuido de MÃºltiples Capas.

### Negativas
- Forma un punto Ãºnico de fallo arquitectÃ³nico si no se escala fuertemente y se hace redundante a travÃ©s de clÃºsteres de zona.

## Referencias
- [ADR-0021: Grafo de AutorizaciÃ³n de Alto Rendimiento](../adrs/nodejs/0021-high-performance-auth-and-graph-compilation.md)
- [ADR-0022: AutorizaciÃ³n Contextual y Proyecciones](../adrs/nodejs/0022-contextual-auth-and-pluggable-projections.md)

---
[? Volver al Índice](./README.es.md)
