# 🏷️ Estrategia de Versionamiento y Auditoría Continua (BMAD)

Para mantener una bitácora de auditoría estricta, rastreable y sincronizada con GitHub, el Método BMAD no depende de la redacción manual de documentos. En su lugar, utilizamos el ecosistema que ya hemos construido (**Conventional Commits**) combinado con la potencia nativa de nuestro orquestador: **Nx Release**.

## 1. El Pilar: Conventional Commits
Dado que ya implementamos `commitlint`, el repositorio conoce exactamente qué tipo de cambio ocurrió.
- `fix(auth): ...` -> Genera un parche automático (ej. `v1.0.0` a `v1.0.1`).
- `feat(api): ...` -> Genera una versión menor automática (ej. `v1.0.1` a `v1.1.0`).
- Si un commit incluye `BREAKING CHANGE` -> Genera una versión mayor (ej. `v1.1.0` a `v2.0.0`).

## 2. Automatización con `nx release`
Nx incluye una suite de versionamiento nativa para monorepos que ejecutará el siguiente ciclo de auditoría con un solo comando (`npx nx release`):

1. **Versionamiento Automático**: Nx analizará todos los commits desde el último despliegue y calculará la nueva versión SemVer (Semantic Versioning) para la API y la Web.
2. **Generación de `CHANGELOG.md`**: Nx creará (o actualizará) un archivo físico `CHANGELOG.md` en la raíz del proyecto. Este archivo será tu **Documento Oficial de Auditoría**, detallando:
   - Nuevas funcionalidades añadidas.
   - Bugs resueltos.
   - Enlaces hipertextuales directos a los hashes de los commits en GitHub para trazabilidad absoluta.
3. **Etiquetado Git (Tagging)**: Creará un tag en Git (ej. `v1.1.0`) apuntando exactamente al estado del código en ese momento.
4. **Sincronización con GitHub Releases**: Si se configura con GitHub Actions, este `CHANGELOG` se publicará automáticamente en la pestaña "Releases" de tu repositorio en la nube.

---

## 3. Beneficios para UMS
* **Cero Esfuerzo Manual**: Nunca más tendrás que escribir un documento de "Notas de Versión" o "Release Notes".
* **Auditoría Forense**: Si falla la versión `v1.2.0` en producción, el `CHANGELOG.md` te dirá exactamente qué commits introdujeron el error y quién los hizo.
* **Transparencia Total**: Los ejecutivos o QA pueden ver en GitHub Releases un documento amigable y legible por humanos que explica qué contiene cada despliegue.

---

## 4. Plan de Acción (Siguiente Paso)
Para activar esto, solo necesitamos:
1. Modificar tu archivo `nx.json` para habilitar el bloque de configuración `"release"`.
2. Probar generar nuestra primera versión `v1.0.0` y nuestro primer `CHANGELOG.md` fundacional.
