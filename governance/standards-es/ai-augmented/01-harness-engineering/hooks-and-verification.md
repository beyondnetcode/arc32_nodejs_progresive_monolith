# Patrones de VerificaciÃ³n por Capas

Un agente es estadÃ­stico; el software de producciÃ³n debe ser determinista. Para unir ambos mundos, el harness implementa un escudo defensivo secuencial que detecta y auto-corrige errores antes de que impacten en la base de cÃ³digo.

## Las 4 Capas de VerificaciÃ³n

Adoptamos la siguiente jerarquÃ­a de validaciÃ³n basada en el tiempo de feedback y el costo computacional:

| Capa | Disparador | Tiempo Estimado | Componente Responsable del Harness | Ejemplo de AcciÃ³n |
| :--- | :--- | :--- | :--- | :--- |
| **1. PostToolUse Hook** | Tras cada `tool_call` exitoso | Milisegundos (ms) | Runtime / Framework | Ejecutar instantÃ¡neamente el linter o el compilador TS sobre el archivo editado. |
| **2. Pre-commit Hook** | Manual o `git commit` disparado | Segundos (s) | Git Hooks (Husky, Lefthook) | Correr pruebas unitarias especÃ­ficas, validar formato de mensaje de commit y chequeo de tipos. |
| **3. Pipeline de CI** | Git Push / Pull Request | Minutos (min) | GitHub Actions / GitLab CI | Suite completa de pruebas E2E, Pact Contract Testing, escaneo CodeQL/Sonar. |
| **4. RevisiÃ³n Humana** | AprobaciÃ³n de FusiÃ³n (Merge) | Horas (h) | Equipo de IngenierÃ­a | VerificaciÃ³n final de coherencia de negocio, adhesiÃ³n a arquitectura y principios SOLID. |

## Principio de DetecciÃ³n Temprana (Shift-Left AI)
**Cuanto mÃ¡s cerca se detecta el error respecto al modelo, menos tokens se desperdician.**
Si un agente comete un error sintÃ¡ctico en el paso 1 y el harness no avisa hasta el paso 3 (CI), el agente continuarÃ¡ construyendo lÃ³gica defectuosa sobre esa base, resultando en una "AlucinaciÃ³n en Cascada" sumamente costosa de depurar.

## Ejemplos TÃ©cnicos de Hooks

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

### Hook ProgramÃ¡tico (Agent SDK)
Si estÃ¡s construyendo un agente personalizado, el patrÃ³n de validaciÃ³n luce asÃ­:

```typescript
async function onAfterFileEdit(filePath: string) {
  const { execSync } = require('child_process');
  try {
    execSync(`npx eslint ${filePath}`);
  } catch (error) {
    // Retornar el error de compilaciÃ³n al Agente para auto-reparaciÃ³n
    throw new Error(`Fallo en la ValidaciÃ³n del Linter: ${error.message}`);
  }
}
```

## ValidaciÃ³n Determinista vs Basada en LLM
-   **ValidaciÃ³n Determinista (Prioridad):** Compiladores, Linters, Pruebas Unitarias. Resultados 100% binarios. Deben ejecutarse siempre primero.
-   **ValidaciÃ³n Basada en LLM (Secundaria):** Usar un segundo modelo mÃ¡s pequeÃ±o para auditar el cÃ³digo generado (ej., detectando vulnerabilidades de lÃ³gica complejas). Solo usar cuando el anÃ¡lisis estÃ¡tico sea incapaz de inferir el contexto semÃ¡ntico.

---
[? Volver al Índice](./README.es.md)
