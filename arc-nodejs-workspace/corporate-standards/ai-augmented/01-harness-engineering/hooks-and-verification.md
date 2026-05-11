# Patrones de Verificación en Capas

Un agente es estadístico, el software de producción debe ser determinista. Para unir ambos mundos, el harness implementa un escudo defensivo secuencial que detecta y autocorrige errores antes de que impacten el codebase.

## Las 4 Capas de Verificación

Adoptamos la siguiente jerarquía de validación basada en el tiempo de feedback y el coste computacional:

| Capa | Trigger | Tiempo Estimado | Responsable del Harness | Ejemplo de Acción |
| :--- | :--- | :--- | :--- | :--- |
| **1. PostToolUse Hook** | Después de cada `tool_call` exitoso | Milisegundos (ms) | Runtime / Framework | Ejecutar instantáneamente el linter o el compilador de TS sobre el archivo editado. |
| **2. Pre-commit Hook** | `git commit` manual o gatillado | Segundos (s) | Git Hooks (Husky, Lefthook) | Correr unit tests específicos, validar formato de mensajes commit y type-check. |
| **3. CI Pipeline** | Git Push / Pull Request | Minutos (min) | GitHub Actions / GitLab CI | Suite de pruebas E2E completa, Pact Contract Testing, Escaneo de CodeQL/Sonar. |
| **4. Human Review** | Merge Approval | Horas (h) | El Equipo de Ingeniería | Revisión final de coherencia de negocio, arquitectura y adherencia a principios SOLID. |

## Principio de Detección Temprana (Shift-Left AI)
**Cuanto más cerca del modelo se detecte el error, menos tokens se desperdician.**
Si un agente comete un error sintáctico en el paso 1 y el harness no le avisa hasta el paso 3 (CI), el agente continuará construyendo lógica errónea sobre esa base, resultando en una "Alucinación en Cascada" sumamente costosa de depurar.

## Ejemplo Técnico de Hooks

### Node.js / TypeScript (Husky + lint-staged)
En entornos Node, se debe configurar el harness local para gatillar el autocorrector tras las ediciones:

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

### Hook Programático (SDK del Agente)
Si estás construyendo un agente personalizado, el patrón de validación luce así:

```typescript
async function onAfterFileEdit(filePath: string) {
  const { execSync } = require('child_process');
  try {
    execSync(`npx eslint ${filePath}`);
  } catch (error) {
    // Retornamos el error de compilación al Agente para que lo auto-repare
    throw new Error(`Linter Validation Failed: ${error.message}`);
  }
}
```

## Verificación Determinista vs Basada en LLM
-   **Validación Determinista (Prioritaria):** Compiladores, Linters, Tests Unitarios. Resultados 100% binarios. Siempre deben ejecutarse primero.
-   **Validación LLM-Based (Secundaria):** Usar un segundo modelo más pequeño para auditar el código generado (ej: detectar vulnerabilidades de lógica complejas). Solo usar cuando el análisis estático es incapaz de inferir el contexto semántico.
