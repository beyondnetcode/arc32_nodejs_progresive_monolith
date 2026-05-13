# Inventario de Herramientas Aprobadas en el Repositorio

Esta es una lÃ­nea base de herramientas genÃ©ricas aprobadas y actualmente utilizables dentro del ecosistema del monorepo para potenciar a nuestros agentes internos.

## 1. InteracciÃ³n con Sistema de Archivos (Provistas por Host / Shell)
*   **`read_file`**: Lee el contenido de un archivo de texto de forma segura.
*   **`write_to_file`**: Sobrescribe o crea archivos de texto. Requiere hooks de verificaciÃ³n despuÃ©s de ejecutarse.
*   **`ls / list_dir`**: Lista de forma recursiva la estructura de un directorio.
*   **`grep_search`**: BÃºsqueda rÃ¡pida de subcadenas a lo largo de la base de cÃ³digo.

## 2. Herramientas del Ciclo de Vida del Software (Ejecutadas vÃ­a Terminal Harness)
*   **`run_command`**: Ejecuta comandos bash/ps1 arbitrarios. **CRÃTICO**: Altamente restringido. No se puede correr en CI/CD sin un sandbox estricto.
*   **`npm_run`**: Acotado especÃ­ficamente para ejecutar disparadores de scripts estÃ¡ndar del repositorio definidos en `package.json`.
*   **`git_commit`**: Permite al agente hacer checkpoint de progreso automÃ¡ticamente.

## 3. CatÃ¡logo MCP Corporativo (Bajo Desarrollo Activo)
*   *PrÃ³ximamente*: `confluence_search` - Para proveer contexto de arquitectura centralizada.
*   *PrÃ³ximamente*: `jira_update_ticket` - Para sincronizar el progreso del desarrollo con los tickets administrativos.
*   *PrÃ³ximamente*: `sentry_fetch_issue` - Para alimentar a los debug-agents con logs de errores reales de producciÃ³n.

---
[? Volver al Índice](./README.es.md)
