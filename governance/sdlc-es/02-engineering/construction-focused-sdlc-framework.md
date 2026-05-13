# âš™ï¸ Marco de Trabajo SDLC con Ã‰nfasis en la ConstrucciÃ³n

> ðŸŒ **NavegaciÃ³n BilingÃ¼e:** [ðŸ‡ºðŸ‡¸ English Version](../../sdlc/02-engineering/construction-focused-sdlc-framework.md)

Este estÃ¡ndar normativo consolida la gobernanza que controla la progresiÃ³n del Ciclo de Vida de Desarrollo de Software (SDLC), estableciendo hitos de salida rigurosos y mecanismos de control especializados para la capa de construcciÃ³n.

---

## ðŸ“– 1. Glosario Central (TerminologÃ­a Clave)

*   **Hito (Milestone):** Un evento objetivo discreto que marca el final absoluto de una fase del ciclo de vida.
*   **Artefacto:** Un documento fÃ­sico, diagrama o definiciÃ³n de sistema inmutable resultante de las actividades de la fase.
*   **DefiniciÃ³n de Hecho (DoD):** El checklist no negociable que cualquier entregable DEBE satisfacer antes de poder transicionar legalmente a la siguiente fase.
*   **Puerta de Calidad (Gate Review):** Paso de verificaciÃ³n formal que evalÃºa las mÃ©tricas de calidad antes de habilitar la progresiÃ³n del despliegue.

---

## ðŸ—ºï¸ 2. Ciclo de Vida SDLC de Alto Nivel (Matriz Corporativa)

```mermaid
timeline
    title LÃ­nea de Tiempo del Ciclo de Vida SDLC
    Fase 1: ConcepciÃ³n : Enmarcado PRD : Alcance Congelado
    Fase 2: DiseÃ±o : Blueprint ArquitectÃ³nico : LÃ­nea Base de DiseÃ±o
    Fase 3: ConstrucciÃ³n : ComposiciÃ³n de CÃ³digo Fuente : Build Exitoso
    Fase 4: ValidaciÃ³n : RegresiÃ³n QA / UAT : RC Firmado
    Fase 5: Entrega : Despliegue en Entorno : ProducciÃ³n Viva
```

| Nombre de la Fase | Actividades Clave | Artefactos Principales | Hito de Salida |
| :--- | :--- | :--- | :--- |
| **1. ConcepciÃ³n y Descubrimiento** | ValidaciÃ³n de mercado, perfilado de Personas, acotaciÃ³n del alcance. | Requisitos del Producto (PRD), Mapa de OKRs. | **Business Sign-Off** (Alcance Congelado). |
| **2. DiseÃ±o y Arquitectura** | SelecciÃ³n de patrones, esquemas DB, contratos de API. | Notas de DiseÃ±o (F1) / Blueprint (arc42) completo (F2+). | **LÃ­nea Base de DiseÃ±o**. |
| **3. ConstrucciÃ³n** | CodificaciÃ³n, composiciÃ³n de subcomponentes, integraciÃ³n interna. | CÃ³digo Fuente, Pruebas Automatizadas, Docs de CÃ³digo. | **Build Exitoso** (Merge de PR Autorizado). |
| **4. ValidaciÃ³n y QA** | VerificaciÃ³n de regresiones, pruebas de penetraciÃ³n, flujos de UAT. | Reporte de Pruebas, AceptaciÃ³n de QA. | **Release Candidate** (RC) Sellado. |
| **5. Entrega y Operaciones** | Despliegue en entorno destino, monitoreo de rendimiento. | Notas de Lanzamiento, Dashboard de Observabilidad. | **ProducciÃ³n Viva** (Monitoreo Nominal). |

---

## ðŸ—ï¸ 3. ProfundizaciÃ³n: Gobernanza de la Etapa de ConstrucciÃ³n

La etapa de construcciÃ³n es el latido del corazÃ³n de la ingenierÃ­a. Para evitar la regresiÃ³n estructural, exige el cumplimiento de los siguientes sub-ciclos de retroalimentaciÃ³n continua.

### ðŸ”„ 3.1 Sub-fases de ConstrucciÃ³n (Ciclo Interno)

```mermaid
graph LR
    A[1. Prep Entorno] --> B[2. CÃ³digo Dominio]
    B --> C[3. Tests Unitarios]
    C --> D[4. IntegraciÃ³n]
    D --> E[5. Scan CI]
    E --> F[6. Peer Review]
    F --> G((DefiniciÃ³n de Hecho))
    
    style G fill:#28a745,color:#fff
```

1.  **PreparaciÃ³n del Entorno:** Establecimiento de estrategias de ramificaciÃ³n (GitFlow/Trunk), aseguramiento de secretos locales y finalizaciÃ³n de servidores Mock de API.
2.  **ComposiciÃ³n de Dominio:** CodificaciÃ³n de entidades de negocio puras y aplicaciÃ³n de validaciones estrictas antes de conectar la infraestructura.
3.  **Cosecha de Pruebas Unitarias Automatizadas:** CreaciÃ³n paralela de aserciones de prueba aisladas que garantizan que la lÃ³gica central se comporta segÃºn lo diseÃ±ado.
4.  **Convergencia de IntegraciÃ³n:** FusiÃ³n de adaptadores de persistencia de infraestructura, vinculaciÃ³n a esquemas de base de datos y ejecuciÃ³n de evaluaciones de subsistemas cableados.
5.  **Disparo de IntegraciÃ³n Continua (CI):** EjecuciÃ³n automatizada al hacer push para validar linting, aplicaciÃ³n de estilos de cÃ³digo y pruebas de sanidad de regresiÃ³n.
6.  **RevisiÃ³n de CÃ³digo por Pares (Peer Review):** EvaluaciÃ³n humana estricta que verifica fugas de seguridad, adopciÃ³n de antipatrones y adherencia a las directrices arquitectÃ³nicas.

### ðŸ“Š 3.2 MÃ©tricas de Umbral de Calidad

La progresiÃ³n del cÃ³digo impone controles matemÃ¡ticos para detener ciclos de entrega inestables:

| MÃ©trica | Umbral MÃ­nimo Aceptable | JustificaciÃ³n |
| :--- | :--- | :--- |
| **Cobertura de CÃ³digo** | $\ge 80\%$ de rutas de lÃ³gica de negocio. | Salvaguardar bifurcaciones crÃ­ticas de decisiÃ³n. |
| **Complejidad CiclomÃ¡tica** | $\le 15$ por mÃ©todo/funciÃ³n. | Garantiza que la lÃ³gica siga siendo mantenible. |
| **Ãndice de Vulnerabilidad** | **Cero** alertas CVE Altas/CrÃ­ticas toleradas. | Cumplimiento estricto del perÃ­metro de seguridad. |
| **Deuda TÃ©cnica** | Ratio $< 5\%$ del volumen total del proyecto. | GuardiÃ¡n inmediato de refactorizaciÃ³n. |

---

## âœ… 4. Checklist de DefiniciÃ³n de Hecho (DoD) de IngenierÃ­a

Una iteraciÃ³n de construcciÃ³n SOLO se considera legÃ­timamente finalizada cuando todos los marcadores obtienen validaciÃ³n:

*   [ ] **Cobertura Automatizada:** El cÃ³digo ha sido instrumentado con pruebas y pasa la validaciÃ³n de umbral localmente y en CI.
*   [ ] **AnÃ¡lisis EstÃ¡tico:** El cÃ³digo superÃ³ el escaneo estÃ¡tico de ESLint/Prettier y SonarQube sin excepciones crÃ­ticas de "code smell".
*   [ ] **Firma de RevisiÃ³n:** Se recibiÃ³ un mÃ­nimo de una (1) aprobaciÃ³n de un Lead o desarrollador Par designado.
*   [ ] **DocumentaciÃ³n Interna:** Las funciones explÃ­citas incluyen anotaciones en lÃ­nea, y el ADR o guÃ­a externa correspondiente ha sido actualizado.
*   [ ] **Nativo en Observabilidad:** Los nuevos manejadores incluyen contadores de telemetrÃ­a bÃ¡sicos y salidas de logs estructurados.
*   [ ] **Build Limpio:** El contenedor binario compila con Ã©xito sin advertencias de entorno intermitentes.

---
[? Volver al Índice](./README.es.md)
