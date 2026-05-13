# [ADR 0048](0048-enterprise-minimal-apis-adoption.md): Estrategia de Endpoints en APIs .NET

## 1. Estado
**Estado**: Propuesto  
**Fecha**: 2026-05-13  
**Alcance**: Stack TecnolÃ³gico - APIs .NET  

---

## 2. Contexto
En .NET 8/9/10, las **Minimal APIs** son maduras para producciÃ³n (*production-ready*) y Microsoft las posiciona como el futuro de ASP.NET Core. Para garantizar eficiencia, rendimiento y gobernanza tÃ©cnica a gran escala, necesitamos definir cuÃ¡ndo adoptar cada modelo en la organizaciÃ³n.

---

## 3. DecisiÃ³n
Se adopta una **estrategia hÃ­brida** con los siguientes criterios de selecciÃ³n especÃ­ficos:

### A. Criterios de SelecciÃ³n

*   **Minimal APIs**:
    *   Nuevos microservicios de alto rendimiento.
    *   Servicios serverless y event-driven.
    *   Backend-for-Frontend (BFFs).
    *   MÃ³dulos desarrollados bajo Vertical Slice Architecture.
*   **Controllers Tradicionales**:
    *   APIs enterprise con lÃ³gica de filtros MVC complejos.
    *   MÃ³dulos legacy en mantenimiento activo.
    *   Servicios que requieren lÃ³gica de model binding avanzado no soportada en Minimal APIs.

### B. EstÃ¡ndares para Minimal APIs
Para mitigar el desorden del cÃ³digo, se imponen las siguientes reglas no negociables:
*   **Handlers**: Deben definirse como mÃ©todos de clase dedicados (prohibidas las lambdas inline).
*   **OrganizaciÃ³n**: Uso obligatorio de *Extension Methods* por cada mÃ³dulo de funcionalidad (Feature Module).
*   **Estructura**: Uso de `MapGroup` por recurso con polÃ­ticas (policies) de seguridad y CORS compartidas.
*   **SDK Corporativo**: UtilizaciÃ³n del SDK base corporativo para abstraer helpers de registro, versionamiento y observabilidad de los endpoints.

---

## 4. Consecuencias

### ðŸŸ¢ Positivas
*   **Rendimiento**: Mejor performance y compatibilidad Native AOT en nuevos servicios.
*   **EvoluciÃ³n**: AdopciÃ³n incremental controlada sin forzar reescrituras masivas.

### ðŸ”´ Negativas
*   **Curva de Aprendizaje**: Los equipos de desarrollo deben dominar ambos patrones operativos simultÃ¡neamente.
*   **FricciÃ³n de Onboarding**: Al coexistir dos modelos diferentes, se requiere documentaciÃ³n robusta para prevenir confusiones.

---

## 5. RevisiÃ³n
Evaluar en **Q2 del siguiente aÃ±o** si la madurez del ecosistema permite deprecar formalmente el uso de Controllers en todos los nuevos proyectos de software.

---
[? Volver al Índice](./README.es.md)
