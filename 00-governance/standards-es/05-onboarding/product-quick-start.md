# 🚀 Guía de Inicio Rápido — Iniciando un Nuevo Producto desde la Referencia

**Rol:** Desarrollador / Arquitecto de Soluciones  
**Objetivo:** Instanciar un repositorio listo para producción desde el Framework de Referencia Corporativo.

---

## 1. Descripción General
Esta Arquitectura de Referencia está diseñada para ser **clonada como una plantilla**, no importada como una librería `npm`. Ofrece un entorno totalmente configurado con seguridad pre-integrada, gobernanza de monorepo y pipelines de despliegue.

## 2. Prerrequisitos
Antes de inicializar, asegúrate de que tu máquina local tenga:
*   **Node.js**: v20.x (LTS)
*   **pnpm**: v8.x (o `npm` v10)
*   **Docker y Docker Compose**: v25+ (Requerido para servicios locales)
*   **Nx CLI**: Instalado globalmente vía `npm install -g nx`

---

## 3. Procedimiento de Inicialización

### Paso A: Clonación del Repositorio
Clona el boilerplate corporativo sin preservar los commits históricos:
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

### Paso B: Instalación de Dependencias
La referencia utiliza un Monorepo Nx. Ejecuta la instalación en la raíz:
```bash
# Instalar usando lockfile estrictamente fijado
npm ci 
# o si usas pnpm
pnpm install --frozen-lockfile
```

### Paso C: Configuración de Infraestructura Local
Levanta la malla de dependencias locales unificada (PostgreSQL, Redis, RabbitMQ, Vault, Kong):
```bash
docker compose up -d
```
*Verifica que todos los contenedores estén `Up (healthy)` usando `docker ps`.*

---

## 4. Ejecutando el Sandbox de Referencia (Producto To-Do)
Para verificar que tu instalación funciona correctamente, arranca las aplicaciones de demostración:

```bash
# Iniciar el API y el BFF concurrentemente vía Nx
nx run-many --target=serve --projects=api,web-bff
```
El Sandbox ejecuta el dominio To-Do demostrando:
1.  **Núcleo Hexagonal**: Lógica de dominio en typescript puro.
2.  **RLS Multi-Tenant**: Aislamiento de base de datos en sesiones activas.
3.  **Observabilidad**: Trazas inyectadas automáticamente.

---

## 5. Crear el Andamiaje (Scaffold) de una Nueva Característica
No crees archivos manualmente. Utiliza los generadores de Nx para respetar los límites obligatorios de librería:

```bash
# Generar una nueva librería de Contexto Delimitado
nx g @nx/nest:library mi-nuevo-contexto --directory=libs/domain

# Generar un Caso de Uso de característica dentro de la librería
nx g @nx/nest:service use-cases/create-item --project=domain-mi-nuevo-contexto
```

## 6. Puertas Obligatorias de Check-in
Antes de hacer push a tu primer commit, ejecuta la suite de calidad. Si éstas fallan, el CI/CD bloqueará tu fusión:
```bash
# 1. Comprobación de Lint y Formato
nx run-many -t lint

# 2. Pirámide de Pruebas (Unitarias/Integración)
nx run-many -t test

# 3. Comprobación de Vulnerabilidades de Dependencias
npm audit
```

---

## 🆘 Asistencia
Si encuentras problemas durante el arranque, consulta:
*   📜 **[Registros de Decisión de Arquitectura](../02-adrs/index.md)**: Para entender POR QUÉ las cosas están configuradas de esta manera.
*   📘 **[Estándares de Ingeniería](../03-engineering/engineering-manifesto.md)**: Para las directrices de revisión de código.
