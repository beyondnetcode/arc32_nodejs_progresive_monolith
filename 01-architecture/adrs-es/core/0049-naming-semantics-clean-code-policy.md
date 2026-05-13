# [ADR 0049](0049-naming-semantics-clean-code-policy.md): Estándares de Semántica y Nomenclatura Clean Code (E2E y Global)

## 1. Metadata
*   **ADR ID:** 0049
*   **Título:** Estándares de Semántica y Nomenclatura Clean Code (E2E y Global)
*   **Estado:** Aprobado (Propuesto)
*   **Autores:** Oficina de Arquitectura Enterprise
*   **Revisores:** Junta Arquitectónica Corporativa, Oficina del CTO
*   **Fecha:** 2026-05-13
*   **Tags:** `Governance`, `Clean-Code`, `Naming-Conventions`, `Maintainability`, `E2E-Standards`
*   **ADRs Relacionados:** 
    *   [ADR-0002: Arquitectura Hexagonal Limpia con NestJS](../nodejs/0002-clean-architecture-nestjs.md)
    *   [ADR-0003: Estándares Estrictos de TypeScript](../nodejs/0003-strict-typescript-standards.md)

---

## 🚀 Resumen Ejecutivo
La legibilidad del código es el factor determinante de la velocidad de evolución de un sistema a largo plazo. Este ADR establece una política corporativa obligatoria sobre la semántica y nomenclatura de código (E2E), garantizando que cualquier desarrollador o herramienta de IA pueda comprender la intención del código sin ambigüedades, reduciendo drásticamente la deuda técnica cognitiva en todo el monorepo.

---

## 2. Contexto del Problema
La falta de una política global y unificada de nomenclatura genera los siguientes problemas:
1.  **Carga Cognitiva Elevada:** Nombres inconsistentes obligan a los desarrolladores a "descifrar" el código en lugar de leerlo.
2.  **Fricción en Colaboración E2E:** Diferentes convenciones entre Frontend y Backend dificultan el seguimiento de flujos de datos.
3.  **Ineficiencia de Herramientas de IA:** Los modelos de lenguaje (LLMs) generan mejores sugerencias y documentación cuando el código sigue estándares semánticos claros.
4.  **Mantenibilidad Degradada:** Nombres genéricos (ej. `data`, `info`, `process`) ocultan errores lógicos y dificultan la refactorización.

---

## 3. Decisión Estratégica
Se impone el cumplimiento de los estándares de **Clean Code** para toda la nomenclatura y semántica en el ciclo de vida de desarrollo (E2E).

### 3.1. Convenciones Técnicas de Casing
-   **`lowerCamelCase`**: Variables, instancias de objetos, funciones y miembros de interfaces.
-   **`PascalCase`**: Clases, interfaces, tipos, enums y componentes de UI.
-   **`UPPER_SNAKE_CASE`**: Constantes globales inmutables y variables de entorno.
-   **`kebab-case`**: Nombres de archivos, selectores CSS y rutas de API (endpoint segments).

### 3.2. Reglas Semánticas Obligatorias
1.  **Nombres que Revelan la Intención:** El nombre debe explicar por qué existe, qué hace y cómo se usa. Si un nombre requiere un comentario explicativo, el nombre ha fallado.
2.  **Verbos para Funciones:** Toda función o método debe iniciar con un verbo de acción (ej. `fetchUser`, `calculateTax`, `isPaymentValid`).
3.  **Prefijos para Booleanos:** Obligatorio el uso de prefijos interrogativos/estatales: `is`, `has`, `can`, `should`, `did` (ej. `isValid`, `hasPermission`).
4.  **Evitar Abreviaciones:** Prohibido el uso de abreviaciones no estándar (usar `request` en lugar de `req`, `index` en lugar de `i` - excepto en loops triviales).
5.  **No Codificar el Tipo (Anti-Hungarian):** No incluir el tipo de dato en el nombre (evitar `userArray`, usar `users`; evitar `priceString`, usar `formattedPrice`).

---

## 4. Política de Cumplimiento (Enforcement Policy)
Esta utilización es una **Política Requerida** y se auditará mediante:

1.  **Gatillos de Calidad en CI (ESLint):**
    -   Se habilitará el plugin `@typescript-eslint/naming-convention` con configuración estricta.
    -   Cualquier violación de casing o prefijos bloqueará el despliegue.
2.  **Revisión de Código (Peer Review):**
    -   La "Semántica Pobre" es motivo suficiente para rechazar un Pull Request.
3.  **IA-Assisted Validation:**
    -   Las herramientas de asistencia (Copilot, Cursor, etc.) deben ser instruidas mediante `.cursorrules` o equivalentes para validar el cumplimiento de este ADR.
4.  **Regla del Boy Scout:**
    -   Se espera que todo desarrollador que modifique un archivo refactorice los nombres inconsistentes cercanos para alinearlos a este estándar.

---

## 5. Consecuencias

### Positivas:
-   **Código Autodocumentado:** Reducción de la necesidad de comentarios de bloque extensos.
-   **Interoperabilidad E2E:** Modelos consistentes desde la DB hasta la UI.
-   **Velocidad de Debugging:** Localización más rápida de errores gracias a nombres precisos.
-   **Alineación con IA:** Maximiza la precisión de las herramientas de generación de código.

### Negativas:
-   **Curva de Adaptación:** Requiere disciplina consciente durante las primeras semanas de adopción.
-   **Verbose Code:** Algunos nombres pueden volverse más largos (ej. `remainingRetries` vs `retries`).

---

## 6. Referencias
-   *Clean Code: A Handbook of Agile Software Craftsmanship* (Robert C. Martin).
-   [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html).
-   [ADR-0003: Estándares Estrictos de TypeScript](../nodejs/0003-strict-typescript-standards.md)
