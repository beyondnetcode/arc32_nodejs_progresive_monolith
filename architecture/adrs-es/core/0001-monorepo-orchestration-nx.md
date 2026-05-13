# [ADR 0001](0001-monorepo-orchestration-nx.md): OrquestaciÃ³n de Monorepo con Nx

## Estado
Aprobado

## Fecha
2026-05-08

## Contexto
Gestionar mÃºltiples aplicaciones relacionadas (API, Web, librerÃ­as compartidas) como repositorios aislados causa fricciÃ³n: configuraciones de CI/CD duplicadas, deriva de versiones entre el cÃ³digo compartido y configuraciones locales complejas. Se requiere una estrategia de monorepo para mantener todos los artefactos en una Ãºnica base de cÃ³digo coherente.

## DecisiÃ³n
Adoptar **Nx** como la herramienta de orquestaciÃ³n de monorepo, combinada con **espacios de trabajo npm (npm workspaces)** para la resoluciÃ³n nativa de paquetes.

- Todas las aplicaciones residen bajo `apps/`.
- Todas las librerÃ­as compartidas residen bajo `libs/`.
- La pipeline de tareas de Nx (`nx.json`) define los grÃ¡ficos de dependencia de construcciÃ³n, prueba y linting para una cachÃ© inteligente y ejecuciÃ³n en paralelo.
- `eslint-plugin-boundaries` impone reglas estrictas de importaciÃ³n entre capas y espacios de trabajo.

## Consecuencias

### Positivas
- Pipeline de CI/CD unificada: un solo archivo de bloqueo (lockfile), una configuraciÃ³n de lint y un Ãºnico ejecutor de pruebas.
- La CachÃ© de ComputaciÃ³n de Nx mantiene el CI por debajo de 1 minuto para los proyectos sin cambios.
- `dependency-cruiser` impone reglas de capas hexagonales globalmente a travÃ©s de todos los paquetes.

### Negativas
- Los desarrolladores deben aprender las convenciones de la CLI de Nx.
- Los repositorios grandes pueden ser mÃ¡s lentos de clonar sin una configuraciÃ³n de sparse checkout.

## Referencias
- [DocumentaciÃ³n de Nx](https://nx.dev)
- [ADR-0003: EstÃ¡ndares Estrictos de TypeScript](../adrs/nodejs/0003-strict-typescript-standards.md)

---
[? Volver al Índice](./README.es.md)
