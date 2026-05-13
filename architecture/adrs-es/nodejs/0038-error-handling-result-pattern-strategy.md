# [ADR 0038](0038-error-handling-result-pattern-strategy.md): Estrategia Empresarial de Manejo de Errores y PatrÃ³n Result

## Estado
Aprobado

## Fecha
2026-05-11

## Contexto
Los bloques JavaScript estÃ¡ndar `try/catch` hacen que los flujos de error sean invisibles para el Sistema de Tipos. Las funciones afirman devolver `Datos`, pero implÃ­citamente colapsan en tiempo de ejecuciÃ³n con excepciones arbitrarias. Esto conduce a una lÃ³gica de manejo de errores fragmentada y dispersa por el cÃ³digo, haciendo imposible distinguir con seguridad entre errores **Transitorios** (pequeÃ±os fallos de red de infraestructura) y **No Transitorios** (violaciones de Reglas de Negocio).

## DecisiÃ³n
Establecer un marco de PropagaciÃ³n de Errores fuertemente tipado y unificado basado en el **PatrÃ³n Result** (Manejo de Errores Funcional):

### 1. Principio: Los Errores son Valores (El PatrÃ³n Result)
Mandar que TODOS los Casos de Uso de AplicaciÃ³n y Entidades de Dominio devuelvan errores explÃ­citamente en lugar de lanzarlos.
*   **Firma de Retorno**: `Promise<Result<SuccessType, DomainError>>`
*   **ImplementaciÃ³n**: Usar una envoltura ligera de la clase `Result<T, E>` (ej., inspirada en `neverthrow`).
*   **Beneficio**: El compilador de Typescript OBLIGA a quien llama a manejar explÃ­citamente la rama de fallo usando verificaciones `.isOk()` / `.isFail()` o `.match()`.

### 2. Matriz de ClasificaciÃ³n de Errores
| Clase de Error | Tipo | Mecanismo de RecuperaciÃ³n | CÃ³digo HTTP Final |
| :--- | :--- | :--- | :--- |
| **LÃ³gica de Negocio (No Transitorio)** | Esperado | **PatrÃ³n Result**. Pasado por cadena explÃ­cita. | 400, 403, 409, 422 |
| **Infraestructura (Transitorio)** | Inesperado | **Reintento con Backoff** ([ADR-0011](../core/0011-fault-tolerance-resiliency-patterns.md)). Si es permanente, lanzar excepciÃ³n genÃ©rica. | 500, 503 |
| **ViolaciÃ³n de Seguridad** | Guardado | TerminaciÃ³n Inmediata. Manejado por la capa Guard de NestJS. | 401, 403 |

### 3. PropagaciÃ³n y Mapeo de LÃ­mites
1.  **Capa de Dominio**: Devuelve un `Result.fail(new InsufficientFundsError())` en bruto. NO se permiten cÃ³digos HTTP.
2.  **Capa de AplicaciÃ³n**: Orquesta la lÃ³gica. Si un Paso falla, realiza un cortocircuito y devuelve el mismo `Result`.
3.  **Capa de Adaptador / Controlador**: El **LÃ­mite de TraducciÃ³n**. Mapea explÃ­citamente las subclases de `DomainError` en CÃ³digos de Respuesta HTTP especÃ­ficos usando un mapeador limpio.
4.  **Captura Global (Catch-All)**: Un **Filtro de Excepciones de NestJS** dedicado captura solo los fallos de infraestructura verdaderamente no manejados, elimina los rastros de pila (stack traces) internos, asigna un `TraceId` estÃ¡ndar de OTel, y entrega un JSON opaco de "Error Interno del Servidor".

## Consecuencias

### Positivas
- 100% Seguridad de Tipos: No puedes compilar cÃ³digo que ignore un error de negocio explÃ­cito.
- SeparaciÃ³n total de los fallos de Infraestructura respecto a la imposiciÃ³n de reglas lÃ³gicas.
- Contratos de error pÃºblicos uniformados a travÃ©s de todas las superficies de API.

### Negativas
- Introduce una ligera sobrecarga sintÃ¡ctica en la estructura del cÃ³digo (mapeo anidado).
- Requiere capacitaciÃ³n a los desarrolladores para cambiar de `throw new Error()` a `return Result.fail()`.

## Referencias
- [Railway Oriented Programming](https://fsharpforfunandprofit.com/rop/)
- [ADR-0002: Arquitectura Hexagonal Limpia](../adrs/nodejs/0002-clean-architecture-nestjs.md)
- [ADR-0011: Tolerancia a Fallos](../adrs/core/0011-fault-tolerance-resiliency-patterns.md)

---
[? Volver al Índice](./README.es.md)
