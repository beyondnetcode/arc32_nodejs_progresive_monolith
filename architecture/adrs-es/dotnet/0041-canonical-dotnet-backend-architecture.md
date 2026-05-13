# [ADR 0041](0041-canonical-dotnet-backend-architecture.md): Arquitectura de Backend CanÃ³nica para .NET (C#)

## 1. Estado
**Estado**: Aprobado  
**Fecha**: 2026-05-11  
**Alcance**: Stack TecnolÃ³gico - EspecÃ­fico de .NET  

---

## 2. Contexto
Para las cargas de trabajo de cÃ³mputo de alta intensidad, la organizaciÃ³n ha autorizado **.NET (C#)**. Para prevenir estÃ¡ndares fragmentados, debemos establecer un blueprint arquitectÃ³nico canÃ³nico alineado con los principios existentes de Hexagonal/Limpia para que los proyectos Node.js y .NET se sientan sintÃ¡cticamente simÃ©tricos para el equipo de la plataforma.

---

## 3. DecisiÃ³n
El marco canÃ³nico de .NET consiste en:

### A. ConfiguraciÃ³n Core
*   **Runtime**: .NET 8+ (Soporte a Largo Plazo - LTS).
*   **Framework**: ASP.NET Core (APIs MÃ­nimas optimizadas para contenerizaciÃ³n ligera).
*   **Estilo**: Arquitectura Limpia (Clean Architecture). El proyecto de Dominio posee cero dependencias de Entity Framework o ASP.NET.

### B. Directivas de DiseÃ±o
*   **InyecciÃ³n de Dependencias**: Microsoft.Extensions.DependencyInjection nativa.
*   **Base de Datos/ORM**: Entity Framework Core para CRUD transaccional; **Dapper** autorizado para cargas de trabajo de lectura intensiva de ETL/Lotes sensibles al rendimiento.
*   **ValidaciÃ³n**: FluentValidation (reflejando la intenciÃ³n del class-validator de Node).
*   **Flujo de Errores**: Basado en Tipos de Retorno usando librerÃ­as como `OneOf` u objetos `Result` personalizados, coincidiendo con la mentalidad funcional del [ADR-0038](../nodejs/0038-error-handling-result-pattern-strategy.md).
*   **AsÃ­ncronos/Trabajadores**: Uso de `BackgroundService` (IHostedService) para procesamiento nativo de lotes de alta concurrencia.

### C. EstÃ¡ndar de Pruebas
*   **Unitarias**: xUnit + FluentAssertions.
*   **IntegraciÃ³n**: WebApplicationFactory + **Testcontainers.NET**.
*   **Contratos**: PactNet (verificando contratos de consumidores con BFFs de Node.js).

---

## 4. Consecuencias

### ðŸŸ¢ Positivas
*   **Alta Eficiencia**: Rendimiento de concurrencia masivo para pools de trabajadores.
*   **SimetrÃ­a de DiseÃ±o**: Un desarrollador cambiando de Node.js a .NET encontrarÃ¡ la misma separaciÃ³n de Dominio/AplicaciÃ³n/Infraestructura, reduciendo la fricciÃ³n.

### ðŸ”´ Negativas
*   **Huella Operativa**: Estado inactivo de memoria ligeramente mayor comparado con scripts node ligeros, mitigado por trimming y compilaciÃ³n AOT.

---
[? Volver al Índice](./README.es.md)
