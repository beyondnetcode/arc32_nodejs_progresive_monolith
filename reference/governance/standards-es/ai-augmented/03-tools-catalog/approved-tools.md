# Inventario de Herramientas Aprobadas en el Repositorio

Esta es una línea base de herramientas genéricas aprobadas y actualmente utilizables dentro del ecosistema del monorepo para potenciar a nuestros agentes internos.

## 1. Interacción con Sistema de Archivos (Provistas por Host / Shell)
* **`read_file`**: Lee el contenido de un archivo de texto de forma segura.
* **`write_to_file`**: Sobrescribe o crea archivos de texto. Requiere hooks de verificación después de ejecutarse.
* **`ls / list_dir`**: Lista de forma recursiva la estructura de un directorio.
* **`grep_search`**: Búsqueda rápida de subcadenas a lo largo de la base de código.

## 2. Herramientas del Ciclo de Vida del Software (Ejecutadas vía Terminal Harness)
* **`run_command`**: Ejecuta comandos bash/ps1 arbitrarios. **CRíTICO**: Altamente restringido. No se puede correr en CI/CD sin un sandbox estricto.
* **`npm_run`**: Acotado específicamente para ejecutar disparadores de scripts estándar del repositorio definidos en `package.json`.
* **`git_commit`**: Permite al agente hacer checkpoint de progreso automáticamente.

## 3. Catálogo MCP Corporativo (Bajo Desarrollo Activo)
* *Próximamente*: `confluence_search` - Para proveer contexto de arquitectura centralizada.
* *Próximamente*: `jira_update_ticket` - Para sincronizar el progreso del desarrollo con los tickets administrativos.
* *Próximamente*: `sentry_fetch_issue` - Para alimentar a los debug-agents con logs de errores reales de producción.

---
[Volver al Índice](./README.es.md)
