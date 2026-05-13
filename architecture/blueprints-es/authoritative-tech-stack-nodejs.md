# ðŸ“ Stack TecnolÃ³gico Autorizado: Ecosistema Node.js & TypeScript

> ðŸŒ **NavegaciÃ³n BilingÃ¼e:** [ðŸ‡ºðŸ‡¸ English Version](./authoritative-tech-stack-nodejs.md)

**Tipo de Documento:** ApÃ©ndice de Runtime  
**Prerrequisito:** DEBE leerse despuÃ©s de la **[LÃ­nea Base AgnÃ³stica](./authoritative-tech-stack-agnostic.md)**.  

---

## ðŸ“‹ 1. Matriz de Cumplimiento Ejecutiva (Mandatos para Proveedores)

| CategorÃ­a | Herramienta / Framework Aprobado | VersiÃ³n Validada | Â¿ADR Requerido para Cambiar? | Alternativas ExplÃ­citamente Rechazadas |
| :--- | :--- | :--- | :--- | :--- |
| **Runtime Base** | **Node.js (LTS)** | 20.x | **SÃ** | Bun, Deno (hasta prÃ³xima auditorÃ­a) |
| **Host Web** | **NestJS (Motor Express)** | 10.x+ | **SÃ** | Fastify (requiere ADR aprobado), Express Puro |
| **ORM Relacional** | **TypeORM** o **Drizzle** | Ãšltima | **NO** | Sequelize, Prisma (requiere ADR de rendimiento) |
| **ValidaciÃ³n** | **class-validator** | Ãšltima | **NO** | Zod (excepto para contratos de API externos) |
| **Motor de Pruebas** | **Jest** | 29.x | **SÃ** | Mocha, Ava |
| **Orquestador Monorepo**| **Nx** | 18.x+ | **SÃ** | Turborepo, Lerna |

---

## ðŸ—ï¸ 2. OrganizaciÃ³n ArquitectÃ³nica (Espacio de Trabajo Nx)

Las soluciones Node.js DEBEN utilizar aislamiento estricto de librerÃ­as impuesto mediante **tags de Nx**:
1.  **`type:domain`**: Cero importaciones externas. Objetos TS puros.
2.  **`type:application`**: Contiene lÃ³gica agnÃ³stica a NestJS, manejadores de comandos puramente por inyecciÃ³n de dependencias.
3.  **`type:infrastructure`**: Contiene mÃ³dulos concretos de NestJS, entidades ORM y adaptadores.
4.  **`type:api`**: CascarÃ³n de la aplicaciÃ³n NestJS de punto de entrada.

---

## ðŸ’¾ 3. Herramientas de Runtime EspecÃ­ficas

*   **Compilador:** `@swc/core` para compilaciÃ³n 20 veces mÃ¡s rÃ¡pida en CI/CD.
*   **Linting:** ESLint v8 modo estricto + configuraciÃ³n de Prettier.

---
ðŸ‘‰ Volver al **[Ãndice Maestro Global](../../../MASTER_INDEX.es.md)**

---
[? Volver al Índice](./README.es.md)
