# [ADR 0047](0047-architectural-patterns-monolith-soa-microservices.md): Marco de SelecciÃ³n y EvoluciÃ³n ArquitectÃ³nica: Monolito vs. SOA vs. Microservicios

## 1. Metadata
*   **ADR ID:** 0047
*   **TÃ­tulo:** Marco de SelecciÃ³n y EvoluciÃ³n ArquitectÃ³nica: Monolito vs. SOA vs. Microservicios
*   **Estado:** Aprobado
*   **Autores:** Oficina de Arquitectura Enterprise
*   **Revisores:** Junta ArquitectÃ³nica Corporativa, Oficina del CTO
*   **Fecha:** 2026-05-12
*   **Tags:** `Governance`, `Architecture-Patterns`, `Scalability`, `Decision-Framework`
*   **ADRs Relacionados:** 
    *   [ADR-0006: TransiciÃ³n Futura a Microservicios con Dapr](./0006-future-microservices-transition-dapr.md)
    *   [ADR-0032: Matriz de SelecciÃ³n de Protocolos](./0032-api-protocol-decision-matrix-rest-grpc-graphql.md)
    *   [ADR-0045: Criterios de ExtracciÃ³n de Microservicios](./0045-microservice-extraction-readiness-criteria.md)

---

## ðŸš€ Resumen Ejecutivo (Para el CTO)

La mala elecciÃ³n de un patrÃ³n arquitectÃ³nico inicial o de transiciÃ³n es la principal fuente de quiebra tÃ©cnica en organizaciones de tecnologÃ­a moderna. Adoptar microservicios prematuramente destruye el *Time-to-Market* por sobrecarga operativa, mientras que mantener un monolito acoplado en exceso impide el escalamiento organizacional de equipos distribuidos.

Este ADR establece la postura corporativa: la arquitectura evoluciona simÃ©tricamente a la complejidad del negocio y al tamaÃ±o de la organizaciÃ³n. Se prohÃ­be la imposiciÃ³n dogmÃ¡tica de arquitecturas distribuidas. Todo sistema nuevo arranca como un **Monolito Modular** protegido por Puertos y Adaptadores, y migra hacia **Microservicios** o **SOA** Ãºnicamente cuando los drivers de negocio u operativos lo demanden objetivamente segÃºn los umbrales numÃ©ricos definidos en este registro.

---

## 2. Contexto del Problema

Las organizaciones se enfrentan a desafÃ­os dinÃ¡micos de escalado. La falta de un marco de referencia estÃ¡ndar para decidir el estilo arquitectÃ³nico de nuevos productos o la modernizaciÃ³n de sistemas legados genera los siguientes escenarios de fracaso corporativo:

1.  **Sobre-IngenierÃ­a Prematura en Startups/Nuevas Iniciativas:** ImplementaciÃ³n de microservicios con menos de 10 ingenieros, resultando en una parÃ¡lisis operativa donde el 80% del esfuerzo se consume en infraestructura y redes en lugar de valor de negocio.
2.  **Efecto de Gran Bola de Lodo en Medianas Empresas:** Monolitos que iniciaron bien pero perdieron sus lÃ­mites lÃ³gicos, requiriendo ciclos de regresiÃ³n de semanas y despliegues que fallan constantemente por acoplamiento lateral de cÃ³digo y base de datos.
3.  **ParÃ¡lisis por IntegraciÃ³n en Grandes Corporativos (Enterprise):** Ecosistemas hÃ­bridos donde decenas de plataformas comerciales (SaaS, ERPs legados) y desarrollos internos intentan comunicarse sin una estrategia clara de contratos, resultando en dependencias en cascada frÃ¡giles.

Este documento mitiga dichos riesgos estableciendo reglas de decisiÃ³n claras, cuantificables y alineadas a la realidad del negocio.

---

## 3. Drivers ArquitectÃ³nicos

La evaluaciÃ³n de cada alternativa se pondera contra 15 drivers crÃ­ticos, priorizados corporativamente:

1.  **Time-to-Market (TTM):** Velocidad para llevar una funcionalidad de idea a producciÃ³n.
2.  **AutonomÃ­a de Equipos:** Capacidad de un equipo para diseÃ±ar, desarrollar y desplegar cÃ³digo sin requerir sincronizaciÃ³n con otros equipos.
3.  **Complejidad Operacional:** Nivel de especializaciÃ³n tÃ©cnica en DevOps y plataformas requerida para operar el sistema.
4.  **Mantenibilidad:** Facilidad para comprender, depurar y modificar el cÃ³digo fuente.
5.  **Escalabilidad (CÃ³mputo/Datos):** Eficiencia para manejar incrementos de carga en funciones especÃ­ficas del sistema.
6.  **Resiliencia / Aislamiento de Fallos:** Capacidad de evitar que el colapso de un dominio tumbe el ecosistema completo.
7.  **Integraciones Legacy:** Habilidad para convivir y extraer valor de sistemas antiguos o comerciales preexistentes.
8.  **Frecuencia de Despliegue:** Cantidad de despliegues exitosos posibles en un perÃ­odo (diario, semanal, mensual).
9.  **Costos Iniciales vs. Operativos:** Eficiencia presupuestaria a corto y largo plazo.
10. **Observabilidad:** Esfuerzo para diagnosticar un error en la interacciÃ³n del flujo de negocio.
11. **Testing:** Complejidad del ciclo de pruebas unitarias, integraciÃ³n y extremo a extremo (E2E).
12. **Gobernanza de Datos:** CentralizaciÃ³n vs. descentralizaciÃ³n del ciclo de vida del dato.
13. **Vendor Lock-in:** Grado de acoplamiento a un proveedor Cloud u On-Premise.
14. **Cloud Readiness:** Facilidad de ejecuciÃ³n en arquitecturas Cloud Native vs Servidores tradicionales.
15. **Compliance:** Requisitos de cumplimiento regulatorio de aislamiento fÃ­sico o regional.

---

## 4. Opciones Evaluadas

### OpciÃ³n A â€” Monolito (Con enfoque en Monolito Modular / Hexagonal)

Consiste en un artefacto de despliegue Ãºnico que aloja toda la lÃ³gica de negocio del dominio. El estÃ¡ndar corporativo exige el sub-patrÃ³n de **Monolito Modular** con **Arquitectura Hexagonal**, donde el aislamiento es absoluto a nivel de cÃ³digo aunque el proceso de runtime y el esquema de base de datos estÃ©n unificados (o separados lÃ³gicamente).

*   **Ventajas:**
    *   Baja latencia intra-proceso (llamadas de memoria).
    *   RefactorizaciÃ³n trivial.
    *   CI/CD directo y de bajo costo operacional.
    *   Transaccionalidad ACID nativa garantizada por el motor de base de datos.
    *   Pruebas E2E simplificadas sin mocks de red excesivos.
*   **Desventajas:**
    *   Ãšnico punto de fallo de despliegue (un error fatal en un mÃ³dulo puede tumbar todo el proceso).
    *   Acaparamiento de memoria/CPU heterogÃ©neo (el mÃ³dulo A escala todo el sistema innecesariamente).
    *   SaturaciÃ³n de equipos a partir de >25-30 ingenieros trabajando concurrentemente.
*   **CuÃ¡ndo Usar:** Fase 1 de cualquier producto; validaciÃ³n de mercado (MVP); equipos con <15 ingenieros; dominios altamente transaccionales.
*   **Costos y Complejidad:** MÃ­nimos al inicio. El costo escala de forma no lineal solo si se degrada el aislamiento de mÃ³dulos.

### OpciÃ³n B â€” SOA (Service-Oriented Architecture)

Es un paradigma centrado en la integraciÃ³n empresarial. Los sistemas exponen sus capacidades mediante servicios interoperables con contratos estrictos (generalmente SOAP o REST) y gobernados tÃ­picamente por un bus de servicios empresarial (ESB). SOA se enfoca en la reutilizaciÃ³n de componentes existentes por encima del desarrollo de nuevos servicios modulares.

*   **Ventajas:**
    *   Excelente para la coexistencia de tecnologÃ­as dispares (Mainframes, Java, .NET, SaaS).
    *   Contratos de integraciÃ³n rÃ­gidos que garantizan consistencia organizacional.
    *   Facilita la orquestaciÃ³n compleja de flujos empresariales heterogÃ©neos.
*   **Desventajas:**
    *   **Efecto Cuello de Botella en ESB:** El bus de servicios tiende a absorber lÃ³gica de negocio pesada, volviÃ©ndose imposible de escalar o mantener.
    *   SincronizaciÃ³n pesada y latencia alta entre servicios.
    *   Gobernanza centralizada y burocrÃ¡tica de contratos.
*   **CuÃ¡ndo Usar:** Grandes corporativos que deben unificar plataformas empaquetadas existentes (ERPs, CRMs, Core Bancarios Legacy) con canales digitales modernos.

### OpciÃ³n C â€” Microservicios

DescomposiciÃ³n de una aplicaciÃ³n en un conjunto de servicios pequeÃ±os, autÃ³nomos, desplegables de forma independiente y alineados estrictamente con Bounded Contexts de Domain-Driven Design (DDD). Cada microservicio posee su propio almacenamiento de datos (*Database-per-service*) y se comunica mediante red utilizando protocolos ligeros (REST, gRPC, Pub/Sub).

*   **Ventajas:**
    *   AutonomÃ­a operativa total: Un equipo puede desplegar 50 veces al dÃ­a sin afectar al resto.
    *   Escalabilidad selectiva de recursos.
    *   Aislamiento de fallas absoluto: Si el servicio de notificaciones muere, el core de pagos sigue funcionando.
    *   Facilidad para adoptar stacks polÃ­glotas optimizados por caso de uso.
*   **Desventajas:**
    *   **Complejidad Distribuida:** Transacciones distribuidas complejas (PatrÃ³n Saga), latencia de red inherente.
    *   Exige madurez severa en DevOps, CI/CD, Observabilidad y AutomatizaciÃ³n.
    *   Consistencia eventual forzosa de datos.
*   **CuÃ¡ndo Usar:** Sistemas de escala masiva (>1M RPM); organizaciones con mÃºltiples equipos independientes trabajando en sub-dominios paralelos; requerimientos heterogÃ©neos de disponibilidad o seguridad.

---

## 5. Matriz Comparativa

| CaracterÃ­stica | Monolito Modular | SOA Tradicional / Corporativo | Microservicios Cloud-Native |
| :--- | :--- | :--- | :--- |
| **Complejidad Inicial** | ðŸŸ¢ Muy Baja | ðŸŸ¡ Alta | ðŸ”´ CrÃ­tica |
| **Time-to-Market Inicial**| ðŸŸ¢ Inmediato | ðŸŸ¡ Lento | ðŸ”´ Muy Lento |
| **AutonomÃ­a de Equipos** | ðŸŸ¡ Limitada (>25 devs) | ðŸŸ¡ Intermedia | ðŸŸ¢ MÃ¡xima |
| **Escalabilidad CÃ³mputo**| ðŸŸ¡ Vertical / HomogÃ©nea | ðŸŸ¢ Horizontal | ðŸŸ¢ Granular / Selectiva |
| **Consistencia de Datos**| ðŸŸ¢ Fuertemente ACID | ðŸŸ¢ Centralizada / Distribuida | ðŸ”´ Consistencia Eventual |
| **DepuraciÃ³n / Debugging**| ðŸŸ¢ Simple (Local) | ðŸŸ¡ Compleja (Remota) | ðŸ”´ Extremadamente Compleja |
| **Despliegue (DevOps)** | ðŸŸ¢ Docker Compose / VM | ðŸŸ¡ Servidores Centralizados | ðŸ”´ Kubernetes / Service Mesh |
| **Observabilidad** | ðŸŸ¢ EstÃ¡ndar Logs/APM | ðŸŸ¡ Seguimiento ESB | ðŸ”´ Trazado Distribuido W3C |
| **Tolerancia a Fallos** | ðŸ”´ Nula (Un solo proceso) | ðŸŸ¡ Media | ðŸŸ¢ Excelente (Circuit Breaker)|
| **Costo Operativo Base** | ðŸŸ¢ Muy Bajo ($) | ðŸ”´ Alto ($$$) | ðŸ”´ CrÃ­tico ($$$$) |

---

## 6. Framework de DecisiÃ³n (Ãrbol LÃ³gico y Modelo de PuntuaciÃ³n)

### ðŸŒ² Diagrama de Ãrbol de DecisiÃ³n (Mermaid)

```mermaid
graph TD
    A[Â¿Iniciando un nuevo producto / MVP?] -->|SÃ­| B{Â¿El equipo tiene < 20 ingenieros?}
    B -->|SÃ­| C[Monolito Modular]
    B -->|No| D{Â¿Se tienen dominios funcionales con ciclos de cambio radicalmente aislados?}
    D -->|SÃ­| E[Microservicios]
    D -->|No| C
    A -->|No, ModernizaciÃ³n / Escalamiento| F{Â¿El objetivo es integrar plataformas Legacy/ERP con canales modernos?}
    F -->|SÃ­| G[SOA / Arquitectura HÃ­brida con API Gateway]
    F -->|No, re-escribir sistema de alta escala| H{Â¿Se posee madurez DevOps probada y cultura de automatizaciÃ³n?}
    H -->|No| I[Capacitar y Evolucionar Monolito a Modular]
    H -->|SÃ­| E
```

### ðŸ“ Checklist CrÃ­tico para HabilitaciÃ³n de Microservicios
Antes de autorizar la migraciÃ³n a Microservicios, un equipo DEBE poder responder **"SÃ­"** a un mÃ­nimo de 4 de los siguientes 5 puntos (Gobernanza Corporativa):

1.  [ ] **CI/CD Maduro:** Â¿Podemos desplegar de forma automatizada en <10 minutos sin interacciÃ³n humana manual?
2.  [ ] **Monitoreo de ProducciÃ³n:** Â¿Tenemos instrumentado logs centralizados y trazado distribuido operacional?
3.  [ ] **SeparaciÃ³n de Datos:** Â¿Se comprende y acepta el impacto de refactorizar la base de datos compartida a un modelo descentralizado con consistencia eventual?
4.  [ ] **Personal de Plataforma:** Â¿Contamos con un equipo de Platform Engineering capaz de operar clÃºsteres K8s, mallas o nubes hÃ­bridas?
5.  [ ] **Dolor Real de Escalado:** Â¿Hemos identificado empÃ­ricamente un cuello de botella en producciÃ³n que NO puede resolverse con escalado vertical o aislamiento de colas en el monolito?

---

## 7. SeÃ±ales de EvoluciÃ³n ArquitectÃ³nica (EvoluciÃ³n Progresiva)

### ðŸ”´ CuÃ¡ndo migrar del Monolito a Microservicios:
*   **SaturaciÃ³n de Pull Requests:** Los ingenieros pasan mÃ¡s tiempo resolviendo conflictos de fusiÃ³n de cÃ³digo o haciendo fila para desplegar que escribiendo cÃ³digo de valor.
*   **Escalabilidad Desproporcionada:** Un mÃ³dulo especÃ­fico consume el 90% de los recursos y obliga a levantar instancias gigantescas del monolito entero a un costo insostenible.
*   **Requisitos de Seguridad/Cumplimiento Divergentes:** Un sub-dominio maneja datos sensibles (ej. PCI DSS) y para no auditar todo el monolito, se requiere extraerlo fÃ­sicamente.

### ðŸš« CuÃ¡ndo NO migrar a Microservicios (Falsos Amigos):
*   **"El cÃ³digo es desordenado":** Migrar un monolito espagueti a microservicios resulta en un **Monolito Distribuido Espagueti**, lo cual es exponencialmente peor. Primero se ordena el cÃ³digo como Monolito Modular.
*   **"Queremos usar tecnologÃ­as de moda":** La arquitectura no debe decidirse por CV-Driven Development (desarrollo impulsado por currÃ­culum).
*   **"Somos un equipo de 5 personas":** No hay ancho de banda suficiente para mantener la gobernanza y red de microservicios.

---

## 8. Anti-Patterns y Errores Comunes

1.  **The Distributed Monolith (Monolito Distribuido):** Servicios que estÃ¡n fÃ­sicamente separados pero se llaman de manera sÃ­ncrona y secuencial por HTTP para completar cada transacciÃ³n sencilla. Rompe la disponibilidad de forma geomÃ©trica ($0.99^5 = 0.95$).
2.  **Nanoservicios:** DescomposiciÃ³n atÃ³mica ridÃ­cula (un servicio para "CrearUsuario", otro para "ActualizarUsuario"). Genera una maraÃ±a inmanejable de redes y dependencias.
3.  **Base de Datos Compartida (Shared DB Integration):** MÃºltiples microservicios atacando las mismas tablas en la base de datos centralizada. Viola el aislamiento de datos, haciendo que un cambio de schema rompa todos los servicios a la vez.
4.  **Gobernanza Inteligente en Red Tonta (LÃ³gica pesada en ESB/API Gateway):** Escribir scripts complejos de transformaciÃ³n de datos y lÃ³gica de negocio dentro del Gateway o ESB. Concentra el core business fuera del cÃ³digo de dominio controlado.

---

## 9. RecomendaciÃ³n ArquitectÃ³nica por Tipo de OrganizaciÃ³n

1.  **Startups / MVP:** **Monolito Modular (Obligatorio).** Foco absoluto en encontrar el Product-Market Fit. Cero complejidad operativa prematura.
2.  **SaaS Multi-Tenant:** **Monolito Modular en Fase Inicial -> Microservicios para el Core de alto cÃ³mputo en Madurez.** Permite gestionar el aislamiento RLS nativo eficientemente antes de dispersar la informaciÃ³n.
3.  **Fintech / E-commerce a Gran Escala:** **Arquitectura HÃ­brida.** Microservicios impulsados por eventos para el procesamiento de transacciones y cobros (alta disponibilidad y escalabilidad granular), con Monolito Modular para el Back-office Administrativo.
4.  **Banca / Corporativos Tradicionales:** **SOA / IntegraciÃ³n vÃ­a API Gateway.** Convive con el Core Legacy a travÃ©s de capas de abstracciÃ³n y expone APIs ligeras hacia el exterior para modernizaciÃ³n escalonada.

---

## 10. Estrategia de EvoluciÃ³n CanÃ³nica (MetodologÃ­a Strangler Fig)

La evoluciÃ³n del monolito se ejecuta mediante el patrÃ³n **Strangler Fig** gobernado por el API Gateway Corporativo, eliminando el riesgo de "Big Bang rewrite":

```mermaid
flowchart LR
    subgraph "Fase 1: Monolito Modular"
    M1[Core Monolith]
    end
    
    subgraph "Fase 2: IntroducciÃ³n Gateway"
    GW[API Gateway] --> M1
    end
    
    subgraph "Fase 3: ExtracciÃ³n Granular"
    GW2[API Gateway] --> M2[Extracted Microservice]
    GW2 --> M1_2[Remaining Monolith]
    end
```

1.  **Paso 1 (Modularizar):** Refactorizar el Monolito dividiendo en directorios o librerÃ­as fÃ­sicas limpias en el monorepo bajo Puertos y Adaptadores.
2.  **Paso 2 (API Gateway):** Colocar Kong/API Gateway enfrente del monolito. Toda comunicaciÃ³n externa viaja por ahÃ­.
3.  **Paso 3 (Extraer Datos):** Isolar el esquema de datos del sub-dominio elegido en el motor base.
4.  **Paso 4 (Extraer Servicio):** Convertir la librerÃ­a interna en un proceso de red independiente (Microproyecto Nx), redirigiendo el trÃ¡fico en el Gateway de forma transparente.

---

## 11. Consecuencias de la AdopciÃ³n

### Positivas (Beneficios Esperados):
*   **Eficiencia Presupuestaria:** ReducciÃ³n del 60% de costos de infraestructura iniciales al evitar clÃºsteres sobredimensionados para MVPs.
*   **Claridad Organizacional:** Los lÃ­deres tÃ©cnicos saben exactamente bajo quÃ© mÃ©tricas solicitar la descomposiciÃ³n de un sistema sin discusiones dogmÃ¡ticas.
*   **Baja Deuda Estructural:** Dado que el monolito modular exige Puertos y Adaptadores, la eventual migraciÃ³n a microservicios no requiere reescribir la lÃ³gica de negocio central.

### Negativas (Riesgos Aceptados):
*   **Resistencia de IngenierÃ­a:** Algunos ingenieros con sesgo Cloud-Native podrÃ­an percibir el enfoque "Monolith First" como un paso atrÃ¡s tÃ©cnicamente, requiriendo mentorÃ­a cultural sobre economÃ­a de la arquitectura.
*   **Mayor Rigor Interno:** Mantener limpio un Monolito Modular exige el uso riguroso de herramientas de anÃ¡lisis de fronteras estÃ¡ticas (`eslint-plugin-boundaries` o `ArchUnit`) para evitar filtraciones de capas.

---

## ðŸŽ¯ ConclusiÃ³n EstratÃ©gica
No existen balas de plata. El **Monolito** no es una tecnologÃ­a obsoleta, es un patrÃ³n optimizado para velocidad inicial y cohesiÃ³n. Los **Microservicios** no son la meta, son una herramienta para resolver problemas masivos de concurrencia y autonomÃ­a organizacional a costa de una complejidad operativa extrema. **SOA** es el puente que permite a las corporaciones convivir de manera eficiente con sus sistemas legados.

Este ADR define la postura corporativa pragmÃ¡tica: **Modularidad estricta siempre, distribuciÃ³n de red solo cuando duela.**

---
[? Volver al Índice](./README.es.md)
