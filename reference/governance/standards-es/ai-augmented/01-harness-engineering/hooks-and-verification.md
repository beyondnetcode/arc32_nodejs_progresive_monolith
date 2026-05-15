# Patrones de Verificación por Capas

Un agente es estadístico; el software de producción debe ser determinista. Para unir ambos mundos, el harness implementa un escudo defensivo secuencial que detecta y auto-corrige errores antes de que impacten en la base de código.

## Las 4 Capas de Verificación

Adoptamos la siguiente jerarquía de validación basada en el tiempo de feedback y el costo computacional:

| Capa | Disparador | Tiempo Estimado | Componente Responsable del Harness | Ejemplo de Acción |
| :--- | :--- | :--- | :--- | :--- |
| **1. PostToolUse Hook** | Tras cada `tool_call` exitoso | Milisegundos (ms) | Runtime / Framework | Ejecutar instantáneamente el linter o el compilador TS sobre el archivo editado. |
| **2. Pre-commit Hook** | Manual o `git commit` disparado | Segundos (s) | Git Hooks (Husky, Lefthook) | Correr pruebas unitarias específicas, validar formato de mensaje de commit y chequeo de tipos. |
| **3. Pipeline de CI** | Git Push / Pull Request | Minutos (min) | GitHub Actions / GitLab CI | Suite completa de pruebas E2E, Pact Contract Testing, escaneo CodeQL/Sonar. |
| **4. Revisión Humana** | Aprobación de Fusión (Merge) | Horas (h) | Equipo de Ingeniería | Verificación final de coherencia de negocio, adhesión a arquitectura y principios SOLID. |

## Principio de Detección Temprana (Shift-Left AI)
**Cuanto más cerca se detecta el error respecto al modelo, menos tokens se desperdician.**
Si un agente comete un error sintáctico en el paso 1 y el harness no avisa hasta el paso 3 (CI), el agente continuará construyendo lógica defectuosa sobre esa base, resultando en una "Alucinación en Cascada" sumamente costosa de depurar.

## Ejemplos Técnicos de Hooks

### Node.js / TypeScript (Husky + lint-staged)
En entornos Node, el harness local debe configurarse para disparar el auto-corrector tras las ediciones:

```json
// .lintstagedrc
{
 "*.ts": [
 "eslint --fix",
 "prettier --write",
 "jest --bail --findRelatedTests"
]
}
```

### Hook Programático (Agent SDK)
Si estás construyendo un agente personalizado, el patrón de validación luce así:

```typescript
async function onAfterFileEdit(filePath: string) {
 const { execSync } = require('child_process');
 try {
 execSync(`npx eslint ${filePath}`);
 } catch (error) {
 // Retornar el error de compilación al Agente para auto-reparación
 throw new Error(`Fallo en la Validación del Linter: ${error.message}`);
 }
}
```

## Validación Determinista vs Basada en LLM
- **Validación Determinista (Prioridad):** Compiladores, Linters, Pruebas Unitarias. Resultados 100% binarios. Deben ejecutarse siempre primero.
- **Validación Basada en LLM (Secundaria):** Usar un segundo modelo más pequeño para auditar el código generado (ej., detectando vulnerabilidades de lógica complejas). Solo usar cuando el análisis estático sea incapaz de inferir el contexto semántico.

---
[Volver al Índice](./README.es.md)
