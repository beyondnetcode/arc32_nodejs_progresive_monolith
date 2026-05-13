# [ADR 0044](0044-configurable-security-persistence-strategy.md): Estrategia de Persistencia de Seguridad Configurable (Agnosticismo vs. RLS Nativo)

## Estado
Propuesto

## Fecha
2026-05-12

## Contexto
Necesitamos implementar Seguridad a Nivel de Fila (RLS) para garantizar la integridad y visibilidad de los datos, pero bajo una Arquitectura Hexagonal que prioriza la extensibilidad y el agnosticismo tecnolÃ³gico.
Rendirnos exclusivamente ante las capacidades nativas del motor de base de datos nos encadena a proveedores especÃ­ficos (vendor lock-in). Inversamente, filtrar Ãºnicamente en memoria a nivel de binario podrÃ­a degradar el rendimiento bajo condiciones de alta concurrencia por sobrecarga de transferencia de datos. Requerimos un modelo donde el Dominio retenga el control total de la lÃ³gica de visibilidad pero conserve la libertad de apalancar optimizaciones nativas de infraestructura donde existan.

## DecisiÃ³n
Adoptar una **Estrategia de Persistencia Configurable** utilizando el patrÃ³n Strategy en la capa de Infraestructura. El modo de operaciÃ³n activo serÃ¡ determinado mediante un flag estructural en el arranque del sistema (`SECURITY_STRATEGY_MODE`).

1.  **Domain Policies (Fuente de Verdad)**: Todos los criterios de visibilidad se definen como **Specifications** puras dentro de la capa Core del Dominio.
2.  **InyecciÃ³n de Estrategia**: La fÃ¡brica de persistencia evalÃºa el flag para decidir quÃ© adaptador instanciar:
    *   **Agnostic Adapter (`APP_FILTER`)**: Traduce la Specification de dominio a un filtro de cÃ³digo ejecutable (ej. predicados a nivel de cÃ³digo), garantizando el funcionamiento en CUALQUIER motor (NoSQL, In-Memory).
    *   **Native Adapter (`INFRA_NATIVE`)**: Traduce la misma Specification a construcciones nativas del motor (ej. contexto `SET SESSION`, polÃ­ticas RLS nativas o SQL optimizado).

## Notas de ImplementaciÃ³n / Mapeo

| Componente | Responsabilidad |
| :--- | :--- |
| **Domain Policy** | Define los criterios de visibilidad como Specifications puras. |
| **Feature Flag** | `SECURITY_STRATEGY_MODE` (Valores: `APP_FILTER`, `INFRA_NATIVE`). |
| **Persistence Factory** | Decide quÃ© adaptador instanciar basÃ¡ndose en el flag. |
| **Agnostic Adapter** | Traduce la Specification a un filtro de cÃ³digo (Binario/En Memoria). |
| **Native Adapter** | Traduce la Specification a un contexto `SET SESSION` + SQL nativo. |

## Consecuencias

### Positivas
- **Portabilidad Total**: Control absoluto sobre el intercambio de infraestructura. El binario opera satisfactoriamente incluso en bases de datos sin soporte de RLS.
- **Facilidad de Testing**: Permite ejecutar pruebas unitarias de lÃ³gica de seguridad extremadamente rÃ¡pidas en memoria sin dependencias de contenedores de BD reales.
- **Control Evolutivo**: El dominio sigue siendo el dueÃ±o exclusivo de las reglas de visibilidad.

### Negativas / Riesgos
- **Paridad de LÃ³gica**: Exige que los desarrolladores mantengan y garanticen la equivalencia lÃ³gica entre ambos adaptadores.
- **Duplicidad en Pruebas**: Requiere parametrizaciÃ³n de la suite de pruebas de integraciÃ³n para garantizar cobertura sobre ambas estrategias activas.

### Impacto en CAP & Sistema
- **Latencia**: El modo `APP_FILTER` puede incrementar el consumo de ancho de banda (recuperando conjuntos mÃ¡s grandes para filtrar localmente), mientras que `INFRA_NATIVE` optimiza el trÃ¡fico pero podrÃ­a sobrecargar el inicio de conexiones si no hay un buen pooling.
- **Consistencia**: IdÃ©ntica en ambas estrategias puesto que la autoridad de la regla reside invariablemente en el Dominio.

## Referencias
- [ADR-0002: Arquitectura Hexagonal Limpia con NestJS](../adrs/nodejs/0002-clean-architecture-nestjs.md)
- [ADR-0010: Estrategia de Arquitectura Multi-Tenancy](../adrs/core/0010-multi-tenancy-architecture-strategy.md)

---
[? Volver al Índice](./README.es.md)
