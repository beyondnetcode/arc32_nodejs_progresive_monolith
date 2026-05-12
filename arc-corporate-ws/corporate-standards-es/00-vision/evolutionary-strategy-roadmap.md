# 🚀 Estrategia Evolutiva y Tablero de Control Arquitectónico

> 🌍 **Navegación Bilingüe:** [🇺🇸 English Version](../../corporate-standards/00-vision/evolutionary-strategy-roadmap.md)

Este documento define la hoja de ruta estratégica liderada por la Arquitectura Corporativa para transformar el ecosistema desde sus cimientos hasta una plataforma global agnóstica y altamente resiliente.

---

## 🏛️ 1. Visión y Pilares Técnicos

Nuestra visión consiste en construir un ecosistema donde la **Infraestructura es un Detalle**, asegurando el control soberano absoluto sobre las Reglas de Negocio Core.

*   **Arquitectura Core:** Hexagonal (Puertos y Adaptadores). El dominio reside en el centro y es ciego a la persistencia y frameworks.
*   **Prioridad Absoluta:** Desacoplamiento agresivo. Prohibido acoplar la lógica a proveedores específicos.
*   **Seguridad Dinámica:** Utilización del selector configurable `SECURITY_STRATEGY_MODE` para adaptar el aislamiento según el entorno de ejecución.
*   **Cumplimiento Nativo:** Diseño regido por los controles de soberanía del RGPD y la norma ISO/IEC 27001:2022.

---

## 🗺️ 2. Roadmap Evolutivo por Fases

### 🟢 Fase 1: The Lean Foundation (MVP) — Corto Plazo
**Enfoque:** Time-to-Market con Integridad de Dominio.

| Dominio | Estrategia |
| :--- | :--- |
| **Arquitectura** | Monolito Modular con límites estrictos. |
| **Persistencia** | Instancia única relacional. Seguridad forzada en Capa de Aplicación (`APP_AGNOSTIC`). |
| **Foco Crítico** | Definición férrea de Contratos API First y validación exhaustiva de las reglas de negocio core sin ruido de infraestructura. |

### 🟡 Fase 2: Scale & Decoupling — Mediano Plazo
**Enfoque:** Eficiencia Operativa y Segregación.

| Dominio | Estrategia |
| :--- | :--- |
| **Arquitectura** | Extracción selectiva de servicios críticos mediante gatillos cuantitativos ([ADR-0045](../02-adrs/core/0045-microservice-extraction-readiness-criteria.md)). |
| **Persistencia** | Activación del Modo Híbrido. Implementación de RLS Nativo (`INFRA_NATIVE`) en producción para optimización de latencia, manteniendo el fallback en código funcional para tests. |
| **Foco Crítico** | Observabilidad Completa (Tracing distribuido + Logs estructurados) y optimización radical de la latencia en I/O. |

### 🔴 Fase 3: North Star (Resilience & Sovereignty) — Largo Plazo
**Enfoque:** Agnosticismo Total y Soberanía de Datos.

| Dominio | Estrategia |
| :--- | :--- |
| **Arquitectura** | Orquestación Multi-Cloud plena y Arquitectura Dirigida por Eventos (EDA) robusta. |
| **Persistencia** | Migración dinámica de proveedores en tiempo récord (< 24h). Abstracción de persistencia total. |
| **Foco Crítico** | Red Zero Trust absoluta y Compliance-as-Code automatizado en cada Pull Request. |

---

## 📊 3. Tablero de Observabilidad y KPIs (Métricas Arquitectónicas)

Para asegurar la deriva arquitectónica cero, evaluamos cada fase con el siguiente set de métricas deterministas.

### 📈 3.1 Índice de Agnosticismo ($PI$)
Mide el acoplamiento saludable vs. contaminación de infraestructura.
$$PI = \frac{\text{Líneas de Código (Dominio + Aplicación)}}{\text{Líneas de Código (Infraestructura)}}$$
*   **Meta:** El valor de $PI$ debe ser creciente o mantenerse estable en el tiempo. Si cae, indica una filtración de lógica de negocio hacia la capa de persistencia o dependencias externas.

### ⚡ 3.2 Delta de Rendimiento de Seguridad ($\Delta P$)
Impacto de latencia comparativo entre los modos de seguridad.
$$\Delta P = P95_{\text{APP\_AGNOSTIC}} - P95_{\text{INFRA\_NATIVE}}$$
*   **Meta:** La penalización porcentual en modo `APP_AGNOSTIC` para procesos transaccionales críticos debe ser **menor al 15%**.

### ⏱️ 3.3 Tiempo de Recuperación y Migración (MTTM)
Esfuerzo en Horas/Hombre necesario para reemplazar un Adaptador de Persistencia completo (ej: cambiar TypeORM por Drizzle o MySQL por PostgreSQL).
*   **Meta:** Menor a 24 horas hombre para servicios críticos al llegar a la Fase 3.

### 🧹 3.4 Ratio de Deuda Técnica Planeada ($RTD$)
Garantía de salud del código base contra la presión de producto.
$$RTD = \frac{\text{Tickets de Refactorización / Deuda}}{\text{Tickets de Nuevas Funcionalidades}}$$
*   **Meta:** Mantener un ratio constante del **20%** para la limpieza iterativa de 'atajos' técnicos tomados durante el MVP.

---

## ⚖️ 4. Manifiesto de Principios e Innegociables

Para evitar el caos evolutivo, se establecen las siguientes prohibiciones técnicas:

1.  **Prohibición de Lógica en BD:** Queda estrictamente prohibido el uso de *Procedimientos Almacenados* o *Triggers* que contengan Reglas de Negocio (la BD solo almacena datos).
2.  **Persistencia Ciega:** El Dominio no puede importar librerías de persistencia, ORMs o anotaciones de base de datos directas.
3.  **Contratos Inmutables:** Una vez publicado el contrato gRPC o Protobuf, no puede haber cambios que rompan la compatibilidad hacia atrás sin versionado explícito.

---

## 🛡️ 5. Estrategia de Compliance y Recuperación

### Mapeo de Controles ISO 27001 por Entorno

| Control | Implementación en AWS / Azure | Solución On-Premise / Híbrida |
| :--- | :--- | :--- |
| **A.8.1.3 (Activos)** | Azure Policy / IAM Scopes limitados por región para cumplir soberanía. | Aislamiento físico en rack con Firewall perimetral dedicado. |
| **A.10.1.1 (Cripto)** | Cifrado nativo KMS con Llaves Gestionadas por el Cliente (CMK). | HashiCorp Vault + Backup Inmutable desconectado. |

### 🔄 Protocolo de Rollback Operativo (Activación de RLS)
En caso de degradación de rendimiento masiva al activar el modo `INFRA_NATIVE` en producción:
1.  **Trigger:** Alarma P95 > 200% del baseline histórico.
2.  **Acción:** Conmutación de la Feature Flag `SECURITY_STRATEGY_MODE` a `APP_AGNOSTIC` vía Dashboard Central.
3.  **Efecto:** Tiempo de propagación < 5 segundos. El sistema reabsorbe la lógica de filtrado en memoria del pod de aplicación, mitigando el cuello de botella en la BD inmediatamente.
