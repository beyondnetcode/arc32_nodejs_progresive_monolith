# 🚀 Getting Started Guide — Initiating a New Product from Reference

**Role:** Developer / Solutions Architect  
**Objective:** Instantiate a production-ready repository from the Corporate Reference Framework.

---

## 1. Overview
This Reference Architecture is designed to be **cloned as a template**, not imported as an `npm` library. It delivers a fully configured environment with pre-baked security, monorepo governance, and deployment pipelines.

## 2. Prerequisites
Before initializing, ensure your local machine has:
*   **Node.js**: v20.x (LTS)
*   **pnpm**: v8.x (or `npm` v10)
*   **Docker & Docker Compose**: v25+ (Required for local services)
*   **Nx CLI**: Installed globally via `npm install -g nx`

---

## 3. Initialization Procedure

### Step A: Repository Cloning
Clone the corporate boilerplate without preserving historical commits:
```bash
# 1. Clone to a new directory
git clone --depth 1 <corporate-repo-url> my-new-product

# 2. Move into the project
cd my-new-product

# 3. Remove origin reference and initialize fresh Git
rm -rf .git
git init
git add .
git commit -m "chore: bootstrap project from corporate reference v1.0"
```

### Step B: Dependency Installation
The reference uses an Nx Monorepo. Execute root installation:
```bash
# Install using strictly pinned lockfile
npm ci 
# or if using pnpm
pnpm install --frozen-lockfile
```

### Step C: Local Infrastructure Setup
Spin up the unified local dependency mesh (PostgreSQL, Redis, RabbitMQ, Vault, Kong):
```bash
docker compose up -d
```
*Verify all containers are `Up (healthy)` using `docker ps`.*

---

## 4. Running the Reference Sandbox (To-Do Product)
To verify your installation works correctly, boot up the demo applications:

```bash
# Start the API and BFF concurrently via Nx
nx run-many --target=serve --projects=api,web-bff
```
The Sandbox runs the To-Do domain demonstrating:
1.  **Hexagonal Core**: Pure typescript domain logic.
2.  **Multi-Tenant RLS**: Database isolation in active sessions.
3.  **Observability**: Traces injected automatically.

---

## 5. Scaffold a New Feature
Do not create files manually. Utilize the Nx generators to respect mandatory library boundaries:

```bash
# Generate a new Bounded Context library
nx g @nx/nest:library my-new-context --directory=libs/domain

# Generate a feature Use Case inside the library
nx g @nx/nest:service use-cases/create-item --project=domain-my-new-context
```

## 6. Mandatory Check-in Gates
Before pushing your first commit, run the quality suite. If these fail, CI/CD will block your merge:
```bash
# 1. Lint & Formatting check
nx run-many -t lint

# 2. Testing Pyramid (Unit/Integration)
nx run-many -t test

# 3. Dependency Vulnerability Check
npm audit
```

---

## 🆘 Assistance
If you encounter issues during bootstrap, refer to:
*   📜 **[Architecture Decision Records](../03-adrs/index.md)**: To understand WHY things are configured this way.
*   📘 **[Engineering Standards](../04-artifacts/engineering-standards.md)**: For code review guidelines.
