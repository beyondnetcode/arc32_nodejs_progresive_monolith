# [ADR 0049](0049-naming-semantics-clean-code-policy.md): EstÃ¡ndares de SemÃ¡ntica y Nomenclatura Clean Code (E2E y Global)

## 1. Metadata
*   **ADR ID:** 0049
*   **TÃ­tulo:** EstÃ¡ndares de SemÃ¡ntica y Nomenclatura Clean Code (E2E y Global)
*   **Estado:** Aprobado (Propuesto)
*   **Autores:** Oficina de Arquitectura Enterprise
*   **Revisores:** Junta ArquitectÃ³nica Corporativa, Oficina del CTO
*   **Fecha:** 2026-05-13
*   **Tags:** `Governance`, `Clean-Code`, `Naming-Conventions`, `Maintainability`, `E2E-Standards`
*   **ADRs Relacionados:** 
    *   [ADR-0002: Arquitectura Hexagonal Limpia con NestJS](../nodejs/0002-clean-architecture-nestjs.md)
    *   [ADR-0003: EstÃ¡ndares Estrictos de TypeScript](../nodejs/0003-strict-typescript-standards.md)

---

## ðŸš€ Resumen Ejecutivo
La legibilidad del cÃ³digo es el factor determinante de la velocidad de evoluciÃ³n de un sistema a largo plazo. Este ADR establece una polÃ­tica corporativa obligatoria sobre la semÃ¡ntica y nomenclatura de cÃ³digo (E2E), garantizando que cualquier desarrollador o herramienta de IA pueda comprender la intenciÃ³n del cÃ³digo sin ambigÃ¼edades, reduciendo drÃ¡sticamente la deuda tÃ©cnica cognitiva en todo el monorepo.

---

## 2. Contexto del Problema
La falta de una polÃ­tica global y unificada de nomenclatura genera los siguientes problemas:
1.  **Carga Cognitiva Elevada:** Nombres inconsistentes obligan a los desarrolladores a "descifrar" el cÃ³digo en lugar de leerlo.
2.  **FricciÃ³n en ColaboraciÃ³n E2E:** Diferentes convenciones entre Frontend y Backend dificultan el seguimiento de flujos de datos.
3.  **Ineficiencia de Herramientas de IA:** Los modelos de lenguaje (LLMs) generan mejores sugerencias y documentaciÃ³n cuando el cÃ³digo sigue estÃ¡ndares semÃ¡nticos claros.
4.  **Mantenibilidad Degradada:** Nombres genÃ©ricos (ej. `data`, `info`, `process`) ocultan errores lÃ³gicos y dificultan la refactorizaciÃ³n.

---

## 3. DecisiÃ³n EstratÃ©gica
Se impone el cumplimiento de los estÃ¡ndares de **Clean Code** para toda la nomenclatura y semÃ¡ntica en el ciclo de vida de desarrollo (E2E).

### 3.1. Convenciones TÃ©cnicas de Casing
-   **`lowerCamelCase`**: Variables, instancias de objetos, funciones y miembros de interfaces.
-   **`PascalCase`**: Clases, interfaces, tipos, enTODO y componentes de UI.
-   **`UPPER_SNAKE_CASE`**: Constantes globales inmutables y variables de entorno.
-   **`kebab-case`**: Nombres de archivos, selectores CSS y rutas de API (endpoint segments).

### 3.2. Reglas SemÃ¡nticas Obligatorias
1.  **Nombres que Revelan la IntenciÃ³n:** El nombre debe explicar por quÃ© existe, quÃ© hace y cÃ³mo se usa. Si un nombre requiere un comentario explicativo, el nombre ha fallado.
2.  **Verbos para Funciones:** Toda funciÃ³n o mÃ©todo debe iniciar con un verbo de acciÃ³n (ej. `fetchUser`, `calculateTax`, `isPaymentValid`).
3.  **Prefijos para Booleanos:** Obligatorio el uso de prefijos interrogativos/estatales: `is`, `has`, `can`, `should`, `did` (ej. `isValid`, `hasPermission`).
4.  **Evitar Abreviaciones:** Prohibido el uso de abreviaciones no estÃ¡ndar (usar `request` en lugar de `req`, `index` en lugar de `i` - excepto en loops triviales).
5.  **No Codificar el Tipo (Anti-Hungarian):** No incluir el tipo de dato en el nombre (evitar `userArray`, usar `users`; evitar `priceString`, usar `formattedPrice`).

---

## 4. PolÃ­tica de Cumplimiento (Enforcement Policy)
Esta utilizaciÃ³n es una **PolÃ­tica Requerida** y se auditarÃ¡ mediante:

1.  **Gatillos de Calidad en CI (ESLint):**
    -   Se habilitarÃ¡ el plugin `@typescript-eslint/naming-convention` con configuraciÃ³n estricta.
    -   Cualquier violaciÃ³n de casing o prefijos bloquearÃ¡ el despliegue.
2.  **RevisiÃ³n de CÃ³digo (Peer Review):**
    -   La "SemÃ¡ntica Pobre" es motivo suficiente para rechazar un Pull Request.
3.  **IA-Assisted Validation:**
    -   Las herramientas de asistencia (Copilot, Cursor, etc.) deben ser instruidas mediante `.cursorrules` o equivalentes para validar el cumplimiento de este ADR.
4.  **Regla del Boy Scout:**
    -   Se espera que todo desarrollador que modifique un archivo refactorice los nombres inconsistentes cercanos para alinearlos a este estÃ¡ndar.

---

## 5. Consecuencias

### Positivas:
-   **CÃ³digo Autodocumentado:** ReducciÃ³n de la necesidad de comentarios de bloque extensos.
-   **Interoperabilidad E2E:** Modelos consistentes desde la DB hasta la UI.
-   **Velocidad de Debugging:** LocalizaciÃ³n mÃ¡s rÃ¡pida de errores gracias a nombres precisos.
-   **AlineaciÃ³n con IA:** Maximiza la precisiÃ³n de las herramientas de generaciÃ³n de cÃ³digo.

### Negativas:
-   **Curva de AdaptaciÃ³n:** Requiere disciplina consciente durante las primeras semanas de adopciÃ³n.
-   **Verbose Code:** Algunos nombres pueden volverse mÃ¡s largos (ej. `remainingRetries` vs `retries`).

---

## 6. Referencias
-   *Clean Code: A Handbook of Agile Software Craftsmanship* (Robert C. Martin).
-   [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html).
-   [ADR-0003: EstÃ¡ndares Estrictos de TypeScript](../nodejs/0003-strict-typescript-standards.md)

---
[? Volver al Índice](./README.es.md)
