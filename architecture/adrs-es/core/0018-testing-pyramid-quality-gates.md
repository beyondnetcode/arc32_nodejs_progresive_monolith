# [ADR 0018](0018-testing-pyramid-quality-gates.md): PirÃ¡mide de Pruebas y Puertas de Calidad Automatizadas

## Estado
Aprobado

## Fecha
2026-05-08

## Contexto
Sin requisitos de pruebas rÃ­gidos, la regresiÃ³n gradual de la base de cÃ³digo convierte rÃ¡pidamente monolitos mantenibles en paquetes de legado inestables. Requerimos criterios de prueba estrictos que limiten la confianza de ejecuciÃ³n impuesta automÃ¡ticamente antes de que el cÃ³digo entre en los flujos de ramas objetivo.

## DecisiÃ³n
Comprometerse con una jerarquÃ­a de pruebas de software estÃ¡ndar y el bloqueo mecÃ¡nico de despliegues:

1. **Capa Unitaria (RÃ¡pida)**: Dominar el volumen total de pruebas usando ejecuciones estÃ¡ndar de Jest que aÃ­slen las clases core y de aplicaciÃ³n puras. Las pruebas no deben ejecutar E/S o arranques de contenedores.
2. **Capa de IntegraciÃ³n (Segura)**: Probar los adaptadores de Persistencia y Gateway contra bases de datos activas usando motores de testcontainers (ej. PostgreSQL/Redis activos en contenedores efÃ­meros).
3. **Capa e2e (Completa)**: Desplegar rutinas `supertest` aisladas que orquesten rutas HTTP completas (Controlador -> Servicio -> Base de Datos) probando la seguridad de lÃ­mites externos reales y el transporte.
4. **Puertas Binarias**: La pipeline CI niega rigurosamente el procesamiento de commits de fusiÃ³n que hagan colapsar los umbrales generales de cobertura de pruebas por debajo de los mÃ­nimos corporativos establecidos (**lÃ­nea base del 70%**).

## Consecuencias

### Positivas
- Protege contra cascadas de regresiÃ³n a velocidad de liberaciÃ³n infinita.
- Fomenta la confianza de refactorizaciÃ³n segura del desarrollador.

### Negativas
- AdiciÃ³n marginal de tiempo requerida durante la fase de creaciÃ³n de rutinas complejas.
- Requiere orquestaciÃ³n activa (testcontainers) para mantener la optimizaciÃ³n de velocidad local.

## Referencias
- [ADR-0005: Puertas de Seguridad](../adrs/core/0005-ci-cd-quality-codeql.md)

---
[? Volver al Índice](./README.es.md)
