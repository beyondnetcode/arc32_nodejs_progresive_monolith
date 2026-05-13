# [ADR 0003](0003-strict-typescript-standards.md): EstÃ¡ndares Estrictos de TypeScript

## Estado
Aprobado

## Fecha
2026-05-08

## Contexto
El TypeScript dÃ©bilmente tipado (uso de `any`, falta de tipos de retorno, `any` implÃ­cito proveniente de librerÃ­as) crea la misma clase de bugs que el JavaScript plano mientras mantiene una falsa sensaciÃ³n de seguridad de tipos. Esto anula el valor principal de TypeScript en el desarrollo empresarial.

## DecisiÃ³n
Imponer una configuraciÃ³n estricta de TypeScript y reglas de ESLint a travÃ©s de todo el monorepo.

**Banderas obligatorias en `tsconfig.json`:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

**Reglas obligatorias de ESLint:**
- `@typescript-eslint/no-explicit-any`: error
- `@typescript-eslint/explicit-function-return-type`: error
- `@typescript-eslint/no-floating-promises`: error
- `eslint-plugin-boundaries`: impone las reglas de importaciÃ³n de capas (Core no puede importar de Infraestructura)

Todas las reglas se imponen en CI â€” los PRs con errores de TypeScript se bloquean impidiendo su fusiÃ³n.

## Consecuencias

### Positivas
- Elimina toda una clase de errores en tiempo de ejecuciÃ³n de nulo/indefinido en el momento de la compilaciÃ³n.
- Impone cÃ³digo autodocumentado a travÃ©s de tipos de retorno explÃ­citos.
- `eslint-plugin-boundaries` hace que las violaciones de capas hexagonales sean un error de construcciÃ³n, no un hallazgo de revisiÃ³n de cÃ³digo.

### Negativas
- Mayor sobrecarga de desarrollo inicial â€” los desarrolladores deben ser explÃ­citos con todos los tipos.
- Las librerÃ­as de terceros con definiciones de TypeScript pobres requieren un envoltorio de tipado cuidadoso.

## Referencias
- [ADR-0001: OrquestaciÃ³n de Monorepo](../adrs/core/0001-monorepo-orchestration-nx.md)
- [ADR-0002: Arquitectura Hexagonal Limpia](../adrs/nodejs/0002-clean-architecture-nestjs.md)

---
[? Volver al Índice](./README.es.md)
