# ðŸš€ GuÃ­a de Inicio RÃ¡pido â€” Iniciando un Nuevo Producto desde la Referencia

**Rol:** Desarrollador / Arquitecto de Soluciones  
**Objetivo:** Instanciar un repositorio listo para producciÃ³n desde el Framework de Referencia Corporativo.

---

## 1. DescripciÃ³n General
Esta Arquitectura de Referencia estÃ¡ diseÃ±ada para ser **clonada como una plantilla**, no importada como una librerÃ­a `npm`. Ofrece un entorno totalmente configurado con seguridad pre-integrada, gobernanza de monorepo y pipelines de despliegue.

## 2. Prerrequisitos
Antes de inicializar, asegÃºrate de que tu mÃ¡quina local tenga:
*   **Node.js**: v20.x (LTS)
*   **pnpm**: v8.x (o `npm` v10)
*   **Docker y Docker Compose**: v25+ (Requerido para servicios locales)
*   **Nx CLI**: Instalado globalmente vÃ­a `npm install -g nx`

---

## 3. Procedimiento de InicializaciÃ³n

### Paso A: ClonaciÃ³n del Repositorio
Clona el boilerplate corporativo sin preservar los commits histÃ³ricos:
```bash
# 1. Clonar a un nuevo directorio
git clone --depth 1 <corporate-repo-url> mi-nuevo-producto

# 2. Entrar en el proyecto
cd mi-nuevo-producto

# 3. Eliminar la referencia al origen e inicializar un Git limpio
rm -rf .git
git init
git add .
git commit -m "chore: bootstrap project from corporate reference v1.0"
```

### Paso B: InstalaciÃ³n de Dependencias
La referencia utiliza un Monorepo Nx. Ejecuta la instalaciÃ³n en la raÃ­z:
```bash
# Instalar usando lockfile estrictamente fijado
npm ci 
# o si usas pnpm
pnpm install --frozen-lockfile
```

### Paso C: ConfiguraciÃ³n de Infraestructura Local
Levanta la malla de dependencias locales unificada (PostgreSQL, Redis, RabbitMQ, Vault, Kong):
```bash
docker compose up -d
```
*Verifica que todos los contenedores estÃ©n `Up (healthy)` usando `docker ps`.*

---

## 4. Ejecutando el Sandbox de Referencia (Producto To-Do)
Para verificar que tu instalaciÃ³n funciona correctamente, arranca las aplicaciones de demostraciÃ³n:

```bash
# Iniciar el API y el BFF concurrentemente vÃ­a Nx
nx run-many --target=serve --projects=api,web-bff
```
El Sandbox ejecuta el dominio To-Do demostrando:
1.  **NÃºcleo Hexagonal**: LÃ³gica de dominio en typescript puro.
2.  **RLS Multi-Tenant**: Aislamiento de base de datos en sesiones activas.
3.  **Observabilidad**: Trazas inyectadas automÃ¡ticamente.

---

## 5. Crear el Andamiaje (Scaffold) de una Nueva CaracterÃ­stica
No crees archivos manualmente. Utiliza los generadores de Nx para respetar los lÃ­mites obligatorios de librerÃ­a:

```bash
# Generar una nueva librerÃ­a de Contexto Delimitado
nx g @nx/nest:library mi-nuevo-contexto --directory=libs/domain

# Generar un Caso de Uso de caracterÃ­stica dentro de la librerÃ­a
nx g @nx/nest:service use-cases/create-item --project=domain-mi-nuevo-contexto
```

## 6. Puertas Obligatorias de Check-in
Antes de hacer push a tu primer commit, ejecuta la suite de calidad. Si Ã©stas fallan, el CI/CD bloquearÃ¡ tu fusiÃ³n:
```bash
# 1. ComprobaciÃ³n de Lint y Formato
nx run-many -t lint

# 2. PirÃ¡mide de Pruebas (Unitarias/IntegraciÃ³n)
nx run-many -t test

# 3. ComprobaciÃ³n de Vulnerabilidades de Dependencias
npm audit
```

---

## ðŸ†˜ Asistencia
Si encuentras problemas durante el arranque, consulta:
*   ðŸ“œ **[Registros de DecisiÃ³n de Arquitectura](../../../architecture/adrs-es/index.md)**: Para entender POR QUÃ‰ las cosas estÃ¡n configuradas de esta manera.
*   ðŸ“˜ **[EstÃ¡ndares de IngenierÃ­a](../engineering/engineering-manifesto.md)**: Para las directrices de revisiÃ³n de cÃ³digo.

---
[? Volver al Índice](./README.es.md)
