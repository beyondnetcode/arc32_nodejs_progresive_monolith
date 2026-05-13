# ðŸš€ Estrategia Evolutiva y Tablero de Control ArquitectÃ³nico

> ðŸŒ **NavegaciÃ³n BilingÃ¼e:** [ðŸ‡ºðŸ‡¸ English Version](../../standards/vision/evolutionary-strategy-roadmap.md)

Este documento define la hoja de ruta estratÃ©gica liderada por la Arquitectura Corporativa para transformar el ecosistema desde sus cimientos hasta una plataforma global agnÃ³stica y altamente resiliente.

---

## ðŸ›ï¸ 1. VisiÃ³n y Pilares TÃ©cnicos

Nuestra visiÃ³n consiste en construir un ecosistema donde la **Infraestructura es un Detalle**, asegurando el control soberano absoluto sobre las Reglas de Negocio Core.

*   **Arquitectura Core:** Hexagonal (Puertos y Adaptadores). El dominio reside en el centro y es ciego a la persistencia y frameworks.
*   **Prioridad Absoluta:** Desacoplamiento agresivo. Prohibido acoplar la lÃ³gica a proveedores especÃ­ficos.
*   **Seguridad DinÃ¡mica:** UtilizaciÃ³n del selector configurable `SECURITY_STRATEGY_MODE` para adaptar el aislamiento segÃºn el entorno de ejecuciÃ³n.
*   **Cumplimiento Nativo:** DiseÃ±o regido por los controles de soberanÃ­a del RGPD y la norma ISO/IEC 27001:2022.

---

## ðŸ—ºï¸ 2. Roadmap Evolutivo por Fases

```mermaid
timeline
    title Hoja de Ruta ArquitectÃ³nica (EvoluciÃ³n Temporal)
    Fase 1 : The Lean Foundation (MVP) : Monolito Modular : Contratos API First : Seguridad en Capa de AplicaciÃ³n (AgnÃ³stico)
    Fase 2 : Scale & Decoupling : ExtracciÃ³n de Servicios CrÃ­ticos : ActivaciÃ³n HÃ­brida RLS : Observabilidad Total e I/O Optimizada
    Fase 3 : North Star : Agnosticismo Multi-Cloud : Arquitectura Dirigida por Eventos : Red Zero Trust y Cumplimiento Automatizado
```

### ðŸŸ¢ Fase 1: The Lean Foundation (MVP) â€” Corto Plazo
**Enfoque:** Time-to-Market con Integridad de Dominio.

| Dominio | Estrategia |
| :--- | :--- |
| **Arquitectura** | Monolito Modular con lÃ­mites estrictos ([ADR-0047](../../../architecture/adrs-es/core/0047-architectural-patterns-monolith-soa-microservices.md)). |
| **Persistencia** | Instancia Ãºnica relacional. Seguridad forzada en Capa de AplicaciÃ³n (`APP_AGNOSTIC`). |
| **Foco CrÃ­tico** | DefiniciÃ³n fÃ©rrea de Contratos API First y validaciÃ³n exhaustiva de las reglas de negocio core sin ruido de infraestructura. |

### ðŸŸ¡ Fase 2: Scale & Decoupling â€” Mediano Plazo
**Enfoque:** Eficiencia Operativa y SegregaciÃ³n.

| Dominio | Estrategia |
| :--- | :--- |
| **Arquitectura** | ExtracciÃ³n selectiva de servicios crÃ­ticos mediante gatillos cuantitativos ([ADR-0045](../../../architecture/adrs-es/core/0045-microservice-extraction-readiness-criteria.md)). |
| **Persistencia** | ActivaciÃ³n del Modo HÃ­brido. ImplementaciÃ³n de RLS Nativo (`INFRA_NATIVE`) en producciÃ³n para optimizaciÃ³n de latencia, manteniendo el fallback en cÃ³digo funcional para tests. |
| **Foco CrÃ­tico** | Observabilidad Completa (Tracing distribuido + Logs estructurados) y optimizaciÃ³n radical de la latencia en I/O. |

### ðŸ”´ Fase 3: North Star (Resilience & Sovereignty) â€” Largo Plazo
**Enfoque:** Agnosticismo Total y SoberanÃ­a de Datos.

| Dominio | Estrategia |
| :--- | :--- |
| **Arquitectura** | OrquestaciÃ³n Multi-Cloud plena y Arquitectura Dirigida por Eventos (EDA) robusta. |
| **Persistencia** | MigraciÃ³n dinÃ¡mica de proveedores en tiempo rÃ©cord (< 24h). AbstracciÃ³n de persistencia total. |
| **Foco CrÃ­tico** | Red Zero Trust absoluta y Compliance-as-Code automatizado en cada Pull Request. |

---

## ðŸ“Š 3. Tablero de Observabilidad y KPIs (MÃ©tricas ArquitectÃ³nicas)

Para asegurar la deriva arquitectÃ³nica cero, evaluamos cada fase con el siguiente set de mÃ©tricas deterministas.

### ðŸ“ˆ 3.1 Ãndice de Agnosticismo ($PI$)
Mide el acoplamiento saludable vs. contaminaciÃ³n de infraestructura.

```math
PI = \frac{\text{LÃ­neas de CÃ³digo (Dominio + AplicaciÃ³n)}}{\text{LÃ­neas de CÃ³digo (Infraestructura)}}
```

*   **Meta:** Valor creciente o estable. Si cae, indica "sangrado" de lÃ³gica de negocio hacia el ORM o Framework.
*   ðŸ’¡ **Ejemplo PrÃ¡ctico:**
    *   CÃ³digo de Negocio: 10,000 lÃ­neas.
    *   CÃ³digo de Persistencia/Infra: 2,000 lÃ­neas.
    *   **PI Actual:** $10,000 / 2,000 = 5.0$ (Estado Sano). Si baja a 2.0, se requiere auditorÃ­a urgente.

### âš¡ 3.2 Delta de Rendimiento de Seguridad ($\Delta P$)
Impacto de latencia comparativo entre el filtrado por software vs. el filtrado nativo por hardware.

```math
\Delta P = P95_{\text{APP\_AGNOSTIC}} - P95_{\text{INFRA\_NATIVE}}
```

*   **Meta:** PenalizaciÃ³n porcentual de latencia inferior al 15% en modo AgnÃ³stico.
*   ðŸ’¡ **Ejemplo PrÃ¡ctico:**
    *   Modo Nativo RLS: 40ms de respuesta en lectura.
    *   Modo AgnÃ³stico App: 45ms de respuesta.
    *   **Impacto:** Aumento de 5ms (+12.5%). **PASA EL CONTROL** (Menor al 15%).

### â±ï¸ 3.3 Tiempo de RecuperaciÃ³n y MigraciÃ³n (MTTM)
Esfuerzo real necesario para reemplazar por completo un adaptador de infraestructura crÃ­tica.

*   **Meta:** Menor a 24 horas hombre para servicios crÃ­ticos en la Fase 3.
*   ðŸ’¡ **Ejemplo PrÃ¡ctico:** Un equipo de 3 desarrolladores debe ser capaz de migrar de TypeORM a Drizzle en una sola jornada laboral (8h x 3 = 24h) gracias al desacoplamiento de la interfaz `IRepositoryPort`.

### ðŸ§¹ 3.4 Ratio de Deuda TÃ©cnica Planeada ($RTD$)
GarantÃ­a de salud del cÃ³digo base contra la presiÃ³n de producto.

```math
RTD = \frac{\text{Tickets de RefactorizaciÃ³n}}{\text{Tickets de Funcionalidades}}
```

*   **Meta:** Mantener un ratio constante del 20% para saneamiento continuo.
*   ðŸ’¡ **Ejemplo PrÃ¡ctico:** Por cada 10 User Stories finalizadas en un Sprint, el equipo debe procesar 2 Tickets de Refactoring (`tech-debt`) dedicados a la limpieza del MVP foundation.

---

## âš–ï¸ 4. Manifiesto de Principios e Innegociables

Para evitar el caos evolutivo, se establecen las siguientes prohibiciones tÃ©cnicas:

1.  **ProhibiciÃ³n de LÃ³gica en BD:** Queda estrictamente prohibido el uso de *Procedimientos Almacenados* o *Triggers* que contengan Reglas de Negocio (la BD solo almacena datos).
2.  **Persistencia Ciega:** El Dominio no puede importar librerÃ­as de persistencia, ORMs o anotaciones de base de datos directas.
3.  **Contratos Inmutables:** Una vez publicado el contrato gRPC o Protobuf, no puede haber cambios que rompan la compatibilidad hacia atrÃ¡s sin versionado explÃ­cito.

---

## ðŸ›¡ï¸ 5. Estrategia de Compliance y RecuperaciÃ³n

### Mapeo de Controles ISO 27001 por Entorno

| Control | ImplementaciÃ³n en AWS / Azure | SoluciÃ³n On-Premise / HÃ­brida |
| :--- | :--- | :--- |
| **A.8.1.3 (Activos)** | Azure Policy / IAM Scopes limitados por regiÃ³n para cumplir soberanÃ­a. | Aislamiento fÃ­sico en rack con Firewall perimetral dedicado. |
| **A.10.1.1 (Cripto)** | Cifrado nativo KMS con Llaves Gestionadas por el Cliente (CMK). | HashiCorp Vault + Backup Inmutable desconectado. |

### ðŸ”„ Protocolo de Rollback Operativo (ActivaciÃ³n de RLS)
En caso de degradaciÃ³n de rendimiento masiva al activar el modo `INFRA_NATIVE` en producciÃ³n:
1.  **Trigger:** Alarma P95 > 200% del baseline histÃ³rico.
2.  **AcciÃ³n:** ConmutaciÃ³n de la Feature Flag `SECURITY_STRATEGY_MODE` a `APP_AGNOSTIC` vÃ­a Dashboard Central.
3.  **Efecto:** Tiempo de propagaciÃ³n < 5 segundos. El sistema reabsorbe la lÃ³gica de filtrado en memoria del pod de aplicaciÃ³n, mitigando el cuello de botella en la BD inmediatamente.

---
[? Volver al Índice](./README.es.md)
