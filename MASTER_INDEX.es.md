# 🗺️ Índice Maestro Global (Punto de Entrada Corporativo)

> 🌍 **Navegación Bilingüe:** [🇺🇸 English Version (Master Index)](./MASTER_INDEX.md)

Bienvenido al sistema nervioso central de **arc32**. Este índice maestro sirve como la puerta canónica de enrutamiento para todos los actores que interactúan con este repositorio. Localiza tu perfil a continuación para acceder a la ruta acelerada de lectura que garantiza el cumplimiento técnico y procedimental.

---

## 🚀 1. Rutas Aceleradas por Rol (Navegación Basada en Roles)

Identifica tu relación actual con el proyecto para desbloquear la jerarquía de lectura obligatoria adaptada a tu función.

| Rol Empresarial | Ruta de Lectura Recomendada | Cumplimiento Esperado |
| :--- | :--- | :--- |
| **Proveedor Externo de Software** | 1. [Inicio Rápido del Producto](./governance/standards-es/onboarding/product-quick-start.md)<br>2. [Base de Stack Agnóstica](./architecture/blueprints-es/authoritative-tech-stack-agnostic.md) + [Anexo de Runtime](./architecture/blueprints-es/authoritative-tech-stack.md)<br>3. [Blueprint de Referencia (Deep Dive)](./architecture/blueprints-es/reference-blueprint.md) | Validar el emparejamiento del stack local y el aislamiento de fronteras antes de iniciar la orden de trabajo. |
| **Desarrollador Backend / QA** | 1. [Base de Stack Agnóstica](./architecture/blueprints-es/authoritative-tech-stack-agnostic.md) + [Anexo de Runtime](./architecture/blueprints-es/authoritative-tech-stack.md)<br>2. [Marco de Trabajo SDLC (Construcción)](./governance/sdlc-es/02-engineering/construction-focused-sdlc-framework.md)<br>3. [Mejores Prácticas para Docs SDLC](./governance/sdlc-es/03-documentation/sdlc-documentation-best-practices.md) | Garantizar los umbrales de Unit Test, alineación con el DoD y cero "fugas de lógica" en las Pull Requests. |
| **Arquitecto de Soluciones** | 1. [Blueprint de Referencia](./architecture/blueprints-es/reference-blueprint.md)<br>2. [Roadmap de Estrategia Evolutiva](./governance/standards-es/vision/evolutionary-strategy-roadmap.md)<br>3. [Registros de Decisiones (Hub de ADRs)](./architecture/adrs-es/README.md) | Mantener la integridad de los patrones y evaluar la alineación de nuevos disparadores de extracción de servicios. |
| **Líder de Equipo / Product Manager** | 1. [Roadmap de Estrategia Evolutiva](./governance/standards-es/vision/evolutionary-strategy-roadmap.md)<br>2. [Hub de Gobernanza SDLC Corporativa](./governance/sdlc-es/README.md)<br>3. [Inicio Rápido del Producto](./governance/standards-es/onboarding/product-quick-start.md) | Sincronizar los hitos de entrega con las transiciones de fase de la arquitectura. |

---

## 🛡️ 2. Ruta de Cumplimiento Normativo (Línea Base Global)

Todos los participantes del ecosistema, independientemente de su antigüedad o rol, DEBEN adherirse y hacer cumplir los pilares fundacionales alojados a continuación. El no respetar estos anclajes anula la aceptación de artefactos en el código base.

*   📄 **[Línea Base Agnóstica Universal](./architecture/blueprints-es/authoritative-tech-stack-agnostic.md)**: Restricciones universales de sistemas para todos los runtimes.
*   📄 **[Anexos de Runtime Autorizado](./architecture/blueprints-es/authoritative-tech-stack.md)**: Mapeo de frameworks para Node.js, .NET y Android.
*   📄 **[Blueprint Arquitectónico de Referencia](./architecture/blueprints-es/reference-blueprint.md)**: Fundamentación conceptual para las fronteras hexagonales y lógica de Puertos/Adaptadores.
*   📄 **[Definición de Hecho (DoD) Gobernanza SDLC](./governance/sdlc-es/02-engineering/construction-focused-sdlc-framework.md#✅-4-checklist-de-definición-de-hecho-dod-de-ingeniería)**: Puerta de calidad final que bloquea la integración a producción.
*   📄 **[Checklist de Simplicidad Fase 1](./architecture/blueprints-es/simplicity-checklist-phase-01.md)**: Salvaguarda normativa contra la sobre-ingeniería prematura.

---

## 🏢 3. Mapa Estructural del Ecosistema Hub

A continuación se representa el diseño de agrupación física de los módulos de gobernanza de alto nivel dentro de este espacio de trabajo corporativo.

```mermaid
graph TD
    ROOT[Raíz del Repositorio] --> CS[Hub de Estándares Corporativos]
    ROOT --> SDLC[Hub de SDLC Corporativo]
    
    CS --> Architecture["01-Arquitectura"]
    CS --> ADRs["02-Registros ADR"]
    CS --> Onboard["05-Onboarding"]
    
    SDLC --> Engineering["02-Ingeniería"]
    SDLC --> Docs["03-Documentación"]
```

*   👉 **[Raíz del Centro de Documentación en Español](./governance/standards-es/README.md)**
*   👉 **[Raíz del Centro de Gobernanza SDLC en Español](./governance/sdlc-es/README.md)**
*   👉 **[Mapa de Navegación Central (Volver al README Principal)](./README.es.md#⚡-4-mapa-rápido-de-navegación-central-contexto-español)**
