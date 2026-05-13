# 📐 Stack Tecnológico Autorizado: Ecosistema .NET & C#

> 🌍 **Navegación Bilingüe:** [🇺🇸 English Version](../../corporate-standards/01-architecture/authoritative-tech-stack-dotnet.md)

**Tipo de Documento:** Apéndice de Runtime  
**Prerrequisito:** DEBE leerse después de la **[Línea Base Agnóstica](./authoritative-tech-stack-agnostic.md)**.  
**Ecosistema Objetivo:** Workers de Cómputo Pesado, Interoperabilidad Legacy, Procesamiento por Lotes Empresarial.

---

## 📋 1. Matriz de Cumplimiento Ejecutiva (Mandatos para Proveedores)

Todas las escuadras de ingeniería que desarrollen dentro del ecosistema .NET DEBEN imponer estrictamente los artefactos autorizados a continuación. Cualquier intento de reemplazo exige un ADR aprobado ANTES de escribir código.

| Categoría | Herramienta / Framework Aprobado | Versión Validada | ¿ADR Requerido para Cambiar? | Alternativas Explícitamente Rechazadas |
| :--- | :--- | :--- | :--- | :--- |
| **Runtime Base** | **.NET 8 LTS** | 8.0.x | **SÍ** | .NET Framework 4.8, .NET 7 (STS) |
| **Host Web** | **ASP.NET Core** | 8.0.x | **SÍ** | Hospedaje IIS, Legacy WCF |
| **ORM Relacional** | **EF Core (vía Npgsql)** | 8.0.x | **NO** (Dapper permitido para LECTURAS) | NHibernate, LINQ-to-SQL |
| **Validación** | **FluentValidation** | 11.9+ | **NO** | System.ComponentModel (Data Annotations) dentro del Dominio |
| **Pruebas Unitarias** | **xUnit** | 2.6.x | **SÍ** | MSTest, NUnit |
| **Mocks / Stubs** | **Moq 4.x** o **NSubstitute** | Latest | **NO** | WireMock (Permitido solo para mocks de API externos) |
| **Formateo** | **CSharpier** | Latest | **NO** | dotnet format (Estándar) |
| **Observabilidad** | **OpenTelemetry.Extensions.Hosting** | 1.7+ | **SÍ** | Application Insights SDK nativo (Vendor Lock-in) |

---

## 🏗️ 2. Implementación Arquitectónica (Mapeo .NET)

Para cumplir con el mandato general de arquitectura Hexagonal, se aplican las siguientes reglas de organización de proyectos .NET:

### 2.1 Segregación de Proyectos (Estructura de la Solución)
1.  **`{BoundedContext}.Domain`**: Plain Old CLR Objects (POCOs). Absolutamente **cero referencias NuGet** fuera de las librerías fundamentales de `System`. Contiene Entidades de Dominio, Objetos de Valor e Interfaces (Puertos).
2.  **`{BoundedContext}.Application`**: Implementa los comandos CQRS y casos de uso vía `MediatR`. Coordina la lógica de dominio sin conocimiento de Bases de Datos.
3.  **`{BoundedContext}.Infrastructure`**: Contiene el **EF Core DbContext**, configuraciones de Npgsql, adaptadores de cliente Redis y clientes de APIs externos.
4.  **`{BoundedContext}.Presentation` (o Web API)**: Punto de entrada que contiene los Controladores ASP.NET o endpoints de Minimal API, mapeando DTOs a Comandos de Aplicación.

### 2.2 Política de Gestión de Errores
Lanzar Excepciones estándar para el control de flujo está **PROHIBIDO**. 
Los equipos DEBEN utilizar el **Patrón Result** para propagar fallos de lógica de negocio de forma segura. Se exige el uso de `OneOf<T>` o clases personalizadas `Result<T, TError>` para las respuestas de la Capa de Aplicación para garantizar el manejo de errores en tiempo de compilación en los controladores Web.

---

## 💾 3. Detalles de Persistencia (Entity Framework Core)

### 3.1 Aislamiento Multi-Tenancy (RLS)
Al utilizar la estrategia `INFRA_NATIVE` implementando PostgreSQL Row-Level Security en .NET:
*   La capa de Infraestructura DEBE implementar un `TenantResolver` extrayendo el `tenant_id` de las `ClaimsPrincipal`.
*   El `DbContext` DEBE utilizar `connection.CreateCommand()` dentro de los eventos de apertura del contexto para ejecutar:
    ```sql
    SET LOCAL app.current_tenant = @tenantId;
    ```
*   Los Global Query Filters nativos (`HasQueryFilter`) solo se aceptan como un respaldo secundario de seguridad. El RLS impuesto en la conexión directa es la puerta de seguridad base.

### 3.2 Migraciones
El uso de `context.Database.Migrate()` automático ejecutado directamente por el host Web durante el inicio de la aplicación está **FUERTEMENTE DESACONSEJADO** para clústeres de producción. Utilice los **bundles de scripts SQL** de Entity Framework dentro de Init-Containers de Kubernetes para salvaguardar transacciones atómicas de despliegue.

---

## 🚀 4. Advertencia Final de Integración para Proveedores

No satisfacer estas definiciones de herramientas estáticas bloqueará automáticamente la aceptación del código de integración.
👉 Volver al **[Índice Maestro Global](../../../MASTER_INDEX.es.md)**
