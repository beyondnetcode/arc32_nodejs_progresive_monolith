# ðŸ“ˆ Estrategia de AuditorÃ­a Continua y Versionado Automatizado (BMAD-METHOD)

Para mantener un registro de auditorÃ­a estricto y rastreable sincronizado con GitHub, la estrategia Spec-driven AI [BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) no se basa en la redacciÃ³n manual de documentos. En su lugar, aprovechamos el ecosistema que ya hemos construido (**Conventional Commits**) combinado con el poder nativo de nuestro orquestador: **Nx Release**.

## 1. El Pilar: Conventional Commits
Dado que ya hemos implementado `commitlint`, el repositorio sabe exactamente quÃ© tipo de cambio ocurriÃ³.
- `fix(auth): ...` -> Genera un lanzamiento de parche automÃ¡tico (ej. de `v1.0.0` a `v1.0.1`).
- `feat(api): ...` -> Genera un lanzamiento menor automÃ¡tico (ej. de `v1.0.1` a `v1.1.0`).
- Si un commit incluye `BREAKING CHANGE` -> Genera un lanzamiento mayor automÃ¡tico (ej. de `v1.1.0` a `v2.0.0`).

## 2. AutomatizaciÃ³n con `nx release`
Nx incluye una suite de versionado nativa para monorepos que ejecuta el siguiente ciclo de auditorÃ­a con un solo comando (`npx nx release`):

1. **Versionado AutomÃ¡tico**: Nx analiza todos los commits desde el Ãºltimo despliegue y calcula el nuevo SemVer (Versionado SemÃ¡ntico) para el API y las aplicaciones Web.
2. **GeneraciÃ³n de `CHANGELOG.md`**: Nx crea (o actualiza) un archivo `CHANGELOG.md` fÃ­sico en la raÃ­z del proyecto. Este archivo sirve como tu **Documento Oficial de AuditorÃ­a**, detallando:
   - Nuevas caracterÃ­sticas aÃ±adidas.
   - Correcciones de bugs resueltas.
   - Enlaces de hipertexto que apuntan directamente a los hashes de los commits en GitHub para una trazabilidad absoluta.
3. **Etiquetado Git**: Crea una etiqueta en Git (ej. `v1.1.0`) apuntando exactamente al estado de la base de cÃ³digo en ese momento especÃ­fico.
4. **SincronizaciÃ³n con GitHub Releases**: Cuando se configura con GitHub Actions, este `CHANGELOG` se publica automÃ¡ticamente en la pestaÃ±a "Releases" de tu repositorio en la nube.

---

## 3. Beneficios para el Esqueleto de Referencia
* **Cero Esfuerzo Manual**: Se acabÃ³ la redacciÃ³n manual de notas de lanzamiento.
* **AuditorÃ­a Forense**: Si una versiÃ³n como la `v1.2.0` falla en producciÃ³n, el `CHANGELOG.md` te dice exactamente quÃ© commits introdujeron el error y quiÃ©n los hizo.
* **Transparencia Total**: Ejecutivos o QA pueden ver un documento amigable y legible por humanos en GitHub Releases que explica quÃ© contiene cada despliegue.

---

## 4. Plan de AcciÃ³n (PrÃ³ximos Pasos)
Para activar esto, solo necesitamos:
1. Modificar tu archivo `nx.json` para habilitar el bloque de configuraciÃ³n `"release"`.
2. Probar la generaciÃ³n de nuestra primera versiÃ³n `v1.0.0` y nuestro primer `CHANGELOG.md` fundacional.

---
[? Volver al Índice](./README.es.md)
