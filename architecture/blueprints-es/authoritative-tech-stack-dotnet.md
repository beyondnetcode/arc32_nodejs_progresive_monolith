# ðŸ“ Stack TecnolÃ³gico Autorizado: Ecosistema .NET & C#

> ðŸŒ **NavegaciÃ³n BilingÃ¼e:** [ðŸ‡ºðŸ‡¸ English Version](../../standards/architecture/authoritative-tech-stack-dotnet.md)

**Tipo de Documento:** ApÃ©ndice de Runtime  
**Prerrequisito:** DEBE leerse despuÃ©s de la **[LÃ­nea Base AgnÃ³stica](./authoritative-tech-stack-agnostic.md)**.  
**Ecosistema Objetivo:** Workers de CÃ³mputo Pesado, Interoperabilidad Legacy, Procesamiento por Lotes Empresarial.

---

## ðŸ“‹ 1. Matriz de Cumplimiento Ejecutiva (Mandatos para Proveedores)

Todas las escuadras de ingenierÃ­a que desarrollen dentro del ecosistema .NET DEBEN imponer estrictamente los artefactos autorizados a continuaciÃ³n. Cualquier intento de reemplazo exige un ADR aprobado ANTES de escribir cÃ³digo.

| CategorÃ­a | Herramienta / Framework Aprobado | VersiÃ³n Validada | Â¿ADR Requerido para Cambiar? | Alternativas ExplÃ­citamente Rechazadas |
| :--- | :--- | :--- | :--- | :--- |
| **Runtime Base** | **.NET 8 LTS** | 8.0.x | **SÃ** | .NET Framework 4.8, .NET 7 (STS) |
| **Host Web** | **ASP.NET Core** | 8.0.x | **SÃ** | Hospedaje IIS, Legacy WCF |
| **ORM Relacional** | **EF Core (vÃ­a Npgsql)** | 8.0.x | **NO** (Dapper permitido para LECTURAS) | NHibernate, LINQ-to-SQL |
| **ValidaciÃ³n** | **FluentValidation** | 11.9+ | **NO** | System.ComponentModel (Data Annotations) dentro del Dominio |
| **Pruebas Unitarias** | **xUnit** | 2.6.x | **SÃ** | MSTest, NUnit |
| **Mocks / Stubs** | **Moq 4.x** o **NSubstitute** | Latest | **NO** | WireMock (Permitido solo para mocks de API externos) |
| **Formateo** | **CSharpier** | Latest | **NO** | dotnet format (EstÃ¡ndar) |
| **Observabilidad** | **OpenTelemetry.Extensions.Hosting** | 1.7+ | **SÃ** | Application Insights SDK nativo (Vendor Lock-in) |

---

## ðŸ—ï¸ 2. ImplementaciÃ³n ArquitectÃ³nica (Mapeo .NET)

Para cumplir con el mandato general de arquitectura Hexagonal, se aplican las siguientes reglas de organizaciÃ³n de proyectos .NET:

### 2.1 SegregaciÃ³n de Proyectos (Estructura de la SoluciÃ³n)
1.  **`{BoundedContext}.Domain`**: Plain Old CLR Objects (POCOs). Absolutamente **cero referencias NuGet** fuera de las librerÃ­as fundamentales de `System`. Contiene Entidades de Dominio, Objetos de Valor e Interfaces (Puertos).
2.  **`{BoundedContext}.Application`**: Implementa los comandos CQRS y casos de uso vÃ­a `MediatR`. Coordina la lÃ³gica de dominio sin conocimiento de Bases de Datos.
3.  **`{BoundedContext}.Infrastructure`**: Contiene el **EF Core DbContext**, configuraciones de Npgsql, adaptadores de cliente Redis y clientes de APIs externos.
4.  **`{BoundedContext}.Presentation` (o Web API)**: Punto de entrada que contiene los Controladores ASP.NET o endpoints de Minimal API, mapeando DTOs a Comandos de AplicaciÃ³n.

### 2.2 PolÃ­tica de GestiÃ³n de Errores
Lanzar Excepciones estÃ¡ndar para el control de flujo estÃ¡ **PROHIBIDO**. 
Los equipos DEBEN utilizar el **PatrÃ³n Result** para propagar fallos de lÃ³gica de negocio de forma segura. Se exige el uso de `OneOf<T>` o clases personalizadas `Result<T, TError>` para las respuestas de la Capa de AplicaciÃ³n para garantizar el manejo de errores en tiempo de compilaciÃ³n en los controladores Web.

---

## ðŸ’¾ 3. Detalles de Persistencia (Entity Framework Core)

### 3.1 Aislamiento Multi-Tenancy (RLS)
Al utilizar la estrategia `INFRA_NATIVE` implementando PostgreSQL Row-Level Security en .NET:
*   La capa de Infraestructura DEBE implementar un `TenantResolver` extrayendo el `tenant_id` de las `ClaimsPrincipal`.
*   El `DbContext` DEBE utilizar `connection.CreateCommand()` dentro de los eventos de apertura del contexto para ejecutar:
    ```sql
    SET LOCAL app.current_tenant = @tenantId;
    ```
*   Los Global Query Filters nativos (`HasQueryFilter`) solo se aceptan como un respaldo secundario de seguridad. El RLS impuesto en la conexiÃ³n directa es la puerta de seguridad base.

### 3.2 Migraciones
El uso de `context.Database.Migrate()` automÃ¡tico ejecutado directamente por el host Web durante el inicio de la aplicaciÃ³n estÃ¡ **FUERTEMENTE DESACONSEJADO** para clÃºsteres de producciÃ³n. Utilice los **bundles de scripts SQL** de Entity Framework dentro de Init-Containers de Kubernetes para salvaguardar transacciones atÃ³micas de despliegue.

---

## ðŸš€ 4. Advertencia Final de IntegraciÃ³n para Proveedores

No satisfacer estas definiciones de herramientas estÃ¡ticas bloquearÃ¡ automÃ¡ticamente la aceptaciÃ³n del cÃ³digo de integraciÃ³n.
ðŸ‘‰ Volver al **[Ãndice Maestro Global](../../../MASTER_INDEX.es.md)**

---
[? Volver al Índice](./README.es.md)
