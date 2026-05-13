# [ADR 0005](0005-ci-cd-quality-codeql.md): Puertas de Calidad de Seguridad CI/CD con CodeQL

## Estado
Aprobado

## Fecha
2026-05-08

## Contexto
Las vulnerabilidades de seguridad introducidas a travÃ©s del cÃ³digo (inyecciÃ³n SQL, poluciÃ³n de prototipo, deserializaciÃ³n insegura) se pasan por alto frecuentemente en las revisiones manuales de cÃ³digo. AdemÃ¡s, las dependencias de terceros pueden introducir CVEs conocidos que no se detectan sin un escaneo automatizado. La seguridad debe imponerse mecÃ¡nicamente, no dejarse a la revisiÃ³n humana.

## DecisiÃ³n
Integrar **GitHub CodeQL** y **npm audit** como puertas de calidad obligatorias en la pipeline de CI/CD.

**Puertas de la pipeline:**

1. **AnÃ¡lisis EstÃ¡tico CodeQL** â€” Se ejecuta en cada pull request. Escanea patrones de vulnerabilidad OWASP Top 10 en el cÃ³digo fuente de TypeScript. Los PRs con hallazgos `High` (Altos) o `Critical` (CrÃ­ticos) se bloquean para su fusiÃ³n.

2. **Escaneo de Vulnerabilidades de Dependencias** â€” `npm audit --audit-level=high` se ejecuta en CI. Cualquier dependencia con un CVE `High` o `Critical` bloquea la pipeline.

3. **DetecciÃ³n de Secretos** â€” El escaneo de secretos integrado de GitHub se habilita en el repositorio para detectar claves de API o credenciales comprometidas accidentalmente.

**SLA:** Todos los hallazgos `Critical` deben resolverse dentro de 24 horas. Hallazgos `High` dentro de 72 horas.

## Consecuencias

### Positivas
- Las vulnerabilidades de seguridad se capturan en el momento del PR, antes de llegar a cualquier entorno.
- Cero costo de infraestructura adicional â€” CodeQL es gratuito para repositorios pÃºblicos y de GitHub Team.
- Crea una pista de auditorÃ­a documentada de decisiones de seguridad para requisitos de cumplimiento.

### Negativas
- Los escaneos de CodeQL aÃ±aden aproximadamente entre 2-5 minutos a la duraciÃ³n de la pipeline de CI.
- Los falsos positivos requieren supresiÃ³n manual con comentarios de justificaciÃ³n documentados.

## Referencias
- [DocumentaciÃ³n de GitHub CodeQL](https://docs.github.com/en/code-security/code-scanning)
- [ADR-0009: FijaciÃ³n Estricta de Dependencias](../adrs/core/0009-strict-dependency-pinning-vulnerability-management.md)

---
[? Volver al Índice](./README.es.md)
