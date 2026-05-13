# 📐 Authoritative Tech Stack: .NET & C# Ecosystem

> 🌍 **Bilingual Navigation:** [🇪🇸 Versión en Español](../../corporate-standards-es/01-architecture/authoritative-tech-stack-dotnet.md)

**Document Type:** Runtime Addendum  
**Prerequisite:** MUST be read after the **[Agnostic Baseline](./authoritative-tech-stack-agnostic.md)**.  
**Target Ecosystem:** Heavy-Compute Workers, Legacy Interoperability, Enterprise Batching.

---

## 📋 1. Executive Compliance Matrix (Vendor Mandates)

All engineering squads developing within the .NET ecosystem MUST strictly enforce the authorized artifacts below. Any replacement attempts demand an approved ADR BEFORE writing code.

| Category | Approved Tool / Framework | Validated Version | ADR Required to Swap? | Explicitly Rejected Alternatives |
| :--- | :--- | :--- | :--- | :--- |
| **Runtime Base** | **.NET 8 LTS** | 8.0.x | **YES** | .NET Framework 4.8, .NET 7 (STS) |
| **Web Host** | **ASP.NET Core** | 8.0.x | **YES** | IIS Hosting, Legacy WCF |
| **Relational ORM** | **EF Core (via Npgsql)** | 8.0.x | **NO** (Dapper allowed for READS) | NHibernate, LINQ-to-SQL |
| **Validation** | **FluentValidation** | 11.9+ | **NO** | System.ComponentModel (Data Annotations) inside Domain |
| **Unit Testing** | **xUnit** | 2.6.x | **YES** | MSTest, NUnit |
| **Mocking / Stubs** | **Moq 4.x** or **NSubstitute** | Latest | **NO** | WireMock (Allowed for API mocks only) |
| **Formatting** | **CSharpier** | Latest | **NO** | dotnet format (Standard) |
| **Observability** | **OpenTelemetry.Extensions.Hosting** | 1.7+ | **YES** | Application Insights native SDK (Vendor Lock-in) |

---

## 🏗️ 2. Architecture Implementation (.NET Mapping)

To comply with the overall Hexagonal architecture mandate, the following .NET project organization rules are enforced:

### 2.1 Project Segregation (Solution Structure)
1.  **`{BoundedContext}.Domain`**: Plain Old CLR Objects (POCOs). Absolutely **zero NuGet references** outside fundamental `System` libraries. Contains Domain Entities, Value Objects, and Interfaces (Ports).
2.  **`{BoundedContext}.Application`**: Implements CQRS commands and use cases via `MediatR`. Coordinates domain logic without knowing about Databases.
3.  **`{BoundedContext}.Infrastructure`**: Contains **EF Core DbContext**, Npgsql configurations, Redis client adapters, and external API clients.
4.  **`{BoundedContext}.Presentation` (or Web API)**: Entry point containing ASP.NET Controllers or Minimal API endpoints, mapping DTOs to Application Commands.

### 2.2 Error Management Policy
Standard Exception Throwing for control flow is **PROHIBITED**. 
Teams MUST utilize the **Result Pattern** to propagate business logic failures safely. The use of `OneOf<T>` or custom `Result<T, TError>` classes is mandated for Application Layer responses to guarantee compile-time error handling in the Web controllers.

---

## 💾 3. Persistence Details (Entity Framework Core)

### 3.1 Multi-Tenancy Isolation (RLS)
When utilizing the `INFRA_NATIVE` strategy via PostgreSQL Row-Level Security in .NET:
*   The Infrastructure layer MUST implement a `TenantResolver` extracting `tenant_id` from `ClaimsPrincipal`.
*   The `DbContext` MUST utilize `connection.CreateCommand()` inside the context opening events to execute:
    ```sql
    SET LOCAL app.current_tenant = @tenantId;
    ```
*   Native Global Query Filters (`HasQueryFilter`) are only accepted as a secondary safety fallback. RLS enforced on the raw connection is the baseline security gate.

### 3.2 Migrations
Automatic `context.Database.Migrate()` executed directly by the Web host during application startup is **STRONGLY DISCOURAGED** for production clusters. Utilize Entity Framework **SQL Script bundles** inside Kubernetes Init-Containers to safeguard deployment atomic transactions.

---

## 🚀 4. Final Integration Warning for Vendors

Failure to satisfy these static tooling definitions will automatically block integration code acceptance. 
👉 Back to **[Global Master Index](../../../MASTER_INDEX.md)**
