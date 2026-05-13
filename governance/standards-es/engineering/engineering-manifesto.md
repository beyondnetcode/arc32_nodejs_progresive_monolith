# ðŸ›ï¸ EstÃ¡ndares Globales de IngenierÃ­a y GuÃ­as para Desarrolladores (Manifiesto [bMAD](https://github.com/bmad-code-org/BMAD-METHOD))

## 1. ðŸŒŸ Principios Core de IngenierÃ­a (Obligatorios)
Todo cÃ³digo, wrappers y diseÃ±os arquitectÃ³nicos dentro de este monorepo **DEBEN** adherirse estrictamente a los siguientes principios. Las revisiones de cÃ³digo rechazarÃ¡n cualquier Pull Request que viole estos fundamentos:

*   **SOLID**: Responsabilidad Ãšnica, Abierto/Cerrado, SustituciÃ³n de Liskov, SegregaciÃ³n de Interfaces e InversiÃ³n de Dependencias.
*   **DRY (Don't Repeat Yourself)**: Eliminar la duplicaciÃ³n innecesaria. Consolidar la lÃ³gica compartida en utilidades o librerÃ­as compartidas (shared-kernel).
*   **KISS (Keep It Simple, Stupid)**: Evitar la sobre-ingenierÃ­a. Escribir cÃ³digo que sea fÃ¡cil de leer, entender y depurar.
*   **YAGNI (You Aren't Gonna Need It)**: No aÃ±adir funcionalidad, abstracciones o herramientas hasta que sean estrictamente necesarias.
*   **SoC (Separation of Concerns)**: Mantener las capas completamente aisladas. Un controlador no debe escribir lÃ³gica de negocio; un caso de uso no debe ejecutar SQL puro.
*   **Clean Code y Arquitectura Limpia**: Proteger el dominio. Los Puertos (interfaces) y Adaptadores (implementaciones simples) son OBLIGATORIOS desde la Fase 1 para evitar acoplamiento tÃ©cnico estructural. La complejidad adicional (wrappers) se difiere.
*   **Seguro por DiseÃ±o & OWASP**: Validar todas las entradas (DTOs), sanear las salidas, imponer RBAC de forma nativa y prevenir inyecciones SQL/NoSQL por defecto.

---

## 2. ðŸ›¡ï¸ Domain-Driven Design (DDD): Opcional y PragmÃ¡tico
Aunque nuestra arquitectura soporta DDD tÃ¡ctico y estratÃ©gico:
**DDD es estrictamente OPCIONAL**.
Solo se utilizarÃ¡ cuando aÃ±ada un valor tangible a un dominio de negocio complejo. **No** debe considerarse una camisa de fuerza obligatoria o restrictiva para la arquitectura. Para operaciones simples CRUD (Crear, Leer, Actualizar, Borrar), los Casos de Uso Hexagonales estÃ¡ndar y los Mapeadores de Datos son mÃ¡s que suficientes. La aplicaciÃ³n excesiva de DDD a entidades simples se considera un anti-patrÃ³n (Sobre-ingenierÃ­a).

---

## 3. ðŸš« Anti-patrones ArquitectÃ³nicos y de CÃ³digo (Estrictamente Prohibidos)
Para garantizar una alta mantenibilidad y una baja deuda tÃ©cnica, se prohÃ­ben explÃ­citamente las siguientes prÃ¡cticas:
*   **Alto Acoplamiento**: Dependencias directas en herramientas concretas de terceros dentro del Core. (Viola DIP).
*   **Clases Dios / MÃ³dulos MÃ¡gicos**: Clases que manejan el enrutamiento, la validaciÃ³n, la lÃ³gica de negocio y el guardado en la base de datos simultÃ¡neamente.
*   **Bloqueo de Proveedor sin Adaptadores**: Escribir a fuego (hardcoding) SDKs (ej. AWS SDK, Unleash, Redis) fuera de los Puertos/Adaptadores de Infraestructura aislados.
*   **CÃ³digo Espagueti e Infierno de Callbacks**: Falta de async/await estructurado o mÃ³nadas funcionales (como el PatrÃ³n Result).
*   **Excepciones Ignoradas**: Capturar errores sin registrarlos adecuadamente o devolver genÃ©ricos 500s sin IDs de traza.

---

## 4. ðŸ§© Puertos y Adaptadores: QuÃ© es Esencial vs. Accidental
Para evitar deuda estructural tÃ©cnica y garantizar que el nÃºcleo de dominio nunca se contamine con detalles de frameworks o infraestructura, la arquitectura hexagonal no se "pospone", sino que se implementa de forma simplificada.

| Concepto | Â¿Esencial o Accidental? | Â¿Fase 1? | Â¿Fase 2+? |
| :--- | :--- | :--- | :--- |
| **Puerto (Interfaz/Contrato)** | **Esencial** | **OBLIGATORIO** | Obligatorio |
| **Adaptador (ImplementaciÃ³n directa)** | **Esencial** | **OBLIGATORIO, simple** | Puede evolucionar |
| **Wrapper anticorrupciÃ³n complejo** | Accidental | Prohibido (posponer) | Permitido si hay integraciÃ³n externa |
| **Fachada / Capa adicional** | Accidental | Prohibido (posponer) | Permitido si es justificado por ADR |

> âš ï¸ **Regla de Oro**: Un adaptador simple en Fase 1 es una sola clase que implementa el puerto y llama directamente a la librerÃ­a (ej. TypeORM o Prisma), sin crear capas de abstracciÃ³n intermedias redundantes.

---

## 5. âš™ï¸ Gobernanza TÃ©cnica y Mecanismos de AplicaciÃ³n
La revisiÃ³n humana es imperfecta. Confiamos en la **AplicaciÃ³n Automatizada** para asegurar que estos principios sean sostenibles a lo largo del tiempo dentro de la estrategia BMAD-METHOD:

1.  **Linters y Reglas ArquitectÃ³nicas**:
    *   `eslint-plugin-boundaries` fallarÃ¡ automÃ¡ticamente la construcciÃ³n si un desarrollador importa una capa exterior (infraestructura) en una capa interior (core).
2.  **AnÃ¡lisis EstÃ¡tico de CÃ³digo**:
    *   `eslint-plugin-sonarjs` se ejecuta localmente para detectar complejidad cognitiva, deuda cognitiva y olores de cÃ³digo (code smells) antes de que se cree un commit.
3.  **Puertas de Calidad y Validaciones CI/CD**:
    *   GitHub Actions bloquearÃ¡ la fusiÃ³n si las pruebas fallan o si la construcciÃ³n se rompe.
4.  **Pruebas Automatizadas y Umbrales de Cobertura**:
    *   Las pruebas Unitarias y E2E son obligatorias. SonarQube/Jest impondrÃ¡n un umbral duro de **>70% de Cobertura de CÃ³digo**.
5.  **Escaneo de Dependencias y Seguridad**:
    *   Obligatorio `npm audit --audit-level=high` en las pipelines CI/CD para bloquear dependencias vulnerables. GitHub CodeQL se ejecuta de forma asÃ­ncrona para detectar vulnerabilidades OWASP.
6.  **Cumplimiento de EstÃ¡ndares de CodificaciÃ³n**:
    *   Prettier y ESLint se imponen a travÃ©s de ganchos `pre-commit` de Husky. El cÃ³digo que no estÃ© formateado correctamente no podrÃ¡ ser commiteado.

---

## 6. ðŸŽ¯ Matriz de Prioridad de DecisiÃ³n
Cada vez que se toma una decisiÃ³n tÃ©cnica (ej. escribir un nuevo ADR, elegir una librerÃ­a o diseÃ±ar un mÃ³dulo), el arquitecto y los desarrolladores deben priorizar los siguientes atributos, en orden:
1.  **Mantenibilidad**
2.  **Escalabilidad**
3.  **Extensibilidad**
4.  **Desacoplamiento**
5.  **Observabilidad**
6.  **Seguridad**
7.  **Resiliencia**
8.  **Testabilidad**
9.  **Rendimiento**
10. **Claridad ArquitectÃ³nica**

---

## 7. ðŸ“‰ Complejidad de Plataforma Progresiva
> [!IMPORTANT]
> **Canon de EvoluciÃ³n Progresiva**: La arquitectura evoluciona en complejidad incremental. La Fase 1 es deliberadamente simple y no exige tecnologÃ­as, patrones o procesos que excedan las necesidades de un monolito modular. Cada requisito adicional se introduce en la fase donde la arquitectura lo justifica objetivamente, no antes.

La infraestructura nunca debe sobrecargar los ciclos de desarrollo tempranos. La carga operativa debe escalar simÃ©tricamente con la madurez de la arquitectura, tal como define el [Reference Blueprint](../../standards-es/architecture/reference-blueprint.md):
- **Fase 1 (Monolito Modular):** Despliegue ligero en contenedores estÃ¡ndar (OCI) sobre mÃ¡quinas virtuales, App Services o Docker Compose. No se requiere clÃºster de orquestaciÃ³n.
- **Fase 2 (MÃ³dulos Desacoplables):** InstrumentaciÃ³n de telemetrÃ­a y manifiestos listos para orquestaciÃ³n, manteniendo el despliegue simplificado.
- **Fase 3+ (Servicios Distribuidos):** Se activa obligatoriamente la orquestaciÃ³n mediante **Kubernetes** gestionado o autohospedado.
La preparaciÃ³n para escenarios fÃ­sicamente desconectados (Air-Gapped) se garantiza mediante la abstracciÃ³n de SDKs desde el inicio, pero su ejecuciÃ³n fÃ­sica avanza con la madurez del producto.

---

## 8. ðŸ“ Checklist de Calidad de Pull Request
Antes de enviar un PR, los desarrolladores deben verificar:
- [ ] No se filtra lÃ³gica de capa externa en el Dominio.
- [ ] Los intereses transversales (Registro, CachÃ©) usan Decoradores o Puertos (No hay lÃ³gica de herramientas a fuego en el core).
- [ ] DDD solo se utilizÃ³ si la complejidad del dominio lo justificaba; de lo contrario, se usÃ³ la Arquitectura Limpia estÃ¡ndar.
- [ ] La cobertura de pruebas para la nueva funcionalidad es >70%.
- [ ] `npm run lint` y `npm run test` locales pasan con Ã©xito.

---
[? Volver al Índice](./README.es.md)
