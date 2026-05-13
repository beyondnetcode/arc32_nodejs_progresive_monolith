# ðŸ—ºï¸ Escenarios de Despliegue Multi-Nube y Cumplimiento

> ðŸŒ **NavegaciÃ³n BilingÃ¼e:** [ðŸ‡ºðŸ‡¸ English Version](../../standards/architecture/multi-cloud-deployment-scenarios.md)

Este documento detalla las arquitecturas de despliegue aprobadas para la Arquitectura Corporativa, considerando controles rigurosos de soberanÃ­a de datos, seguridad y la adaptabilidad del selector de estrategia de seguridad (`SECURITY_STRATEGY_MODE`).

---

## ðŸŒ 1. IntroducciÃ³n al Cumplimiento Operativo

Cualquier implementaciÃ³n fÃ­sica de la arquitectura debe satisfacer las directrices del **RGPD** (Reglamento General de ProtecciÃ³n de Datos) y la norma **ISO/IEC 27001:2022**, especÃ­ficamente en los dominios de A.8 (Seguridad de los Activos) y A.10 (CriptografÃ­a).

| Vector de Control | EstÃ¡ndar Corporativo | Enfoque en Arquitectura Hexagonal |
| :--- | :--- | :--- |
| **SoberanÃ­a** | RestricciÃ³n geogrÃ¡fica fÃ­sica. | Adaptadores de persistencia especÃ­ficos por regiÃ³n legal. |
| **Cifrado** | En reposo (AES-256) y trÃ¡nsito (TLS 1.3). | Terminado en TLS de Gateway, encriptaciÃ³n nativa de BD. |
| **SegregaciÃ³n** | Control de Acceso Basado en Atributos (ABAC). | LÃ³gica delegada al Selector (`INFRA_NATIVE` vs `APP_AGNOSTIC`). |

---

## ðŸ”µ 2. Escenario AZURE: Cumplimiento Estricto Empresarial

Orientado a sectores altamente regulados (Banca, Salud) que requieren auditorÃ­a exhaustiva y cifrado "hardware-backed".

### 2.1 Blueprint de Red y Seguridad
```mermaid
graph TD
    subgraph VNet["Azure Virtual Network (Hub & Spoke)"]
        subgraph DMZ["DMZ Subnet"]
            AFD["Azure Front Door (WAF v2)"]
            AGW["App Gateway (TLS Term)"]
        end
        subgraph AppTier["AKS Cluster Subnet"]
            AKS["AKS Pods\n(Config: SECURITY_STRATEGY_MODE=INFRA_NATIVE)"]
            ACFG["App Config + Key Vault"]
        end
        subgraph DataTier["Private Link Subnet"]
            SQL["Azure SQL Hyperscale\n(Always Encrypted + RLS)"]
        end
    end
    
    Internet((Usuarios)) --> AFD
    AFD --> AGW
    AGW --> AKS
    AKS -.-> ACFG
    AKS -->|Private Link| SQL
```

### 2.2 ImplementaciÃ³n de Seguridad
- **Modo:** `INFRA_NATIVE` forzoso. La seguridad a nivel de fila se delega a polÃ­ticas de SQL Server nativas, asegurando que incluso los administradores de DB sin la clave maestra no vean datos de inquilinos.
- **GestiÃ³n de Flag:** Las etiquetas de entorno en **Azure App Configuration** inyectan dinÃ¡micamente el valor al contenedor en tiempo de arranque.

### 2.3 Infraestructura como CÃ³digo (Bicep Sample)
```bicep
// HabilitaciÃ³n de RLS y Cifrado Avanzado en Azure SQL
resource sqlServer 'Microsoft.Sql/servers@2023-05-01-preview' = {
  name: 'sql-bmad-prod'
  location: 'westeurope' // Cumplimiento de RegiÃ³n UE
  properties: {
    administratorLogin: 'sysadmin'
    // Restringir a Microsoft Entra Auth solo
    minimalTlsVersion: '1.2'
    publicNetworkAccess: 'Disabled'
  }
}

resource sqlDB 'Microsoft.Sql/servers/databases@2023-05-01-preview' = {
  parent: sqlServer
  name: 'sqldb-tenants'
  location: 'westeurope'
  sku: {
    name: 'GP_Gen5_4'
  }
  properties: {
    zoneRedundant: true
  }
}

// Azure Policy para restringir Regiones (SoberanÃ­a)
resource policyAssignment 'Microsoft.Authorization/policyAssignments@2023-04-01' = {
  name: 'restrict-to-europe'
  properties: {
    policyDefinitionId: '/providers/Microsoft.Authorization/policyDefinitions/e56962a6-4747-49cd-b67b-bf8b01975c4c'
    parameters: {
      listOfAllowedLocations: {
        value: [
          'westeurope'
          'northeurope'
        ]
      }
    }
  }
}
```

### 2.4 Matrices Operativas
**Matriz de Cumplimiento:**
| Control ISO 27001 | Requisito | SoluciÃ³n Azure |
| :--- | :--- | :--- |
| **A.10.1.1** | PolÃ­tica CriptogrÃ¡fica | Cifrado DeterminÃ­stico Always Encrypted gestionado en Key Vault. |
| **A.8.1.3** | Uso Aceptable de Activos | Azure Policy impide aprovisionar recursos fuera de fronteras de la UE. |

**AnÃ¡lisis CAP:**
- **Resultado:** **CP** (Consistencia y Tolerancia a Particiones).
- **Impacto:** Azure SQL con redundancia de zona garantiza consistencia fuerte en transacciones concurrentes, a costa de latencia imperceptible en escrituras sÃ­ncronas inter-zona.

---

## ðŸŸ  3. Escenario AWS: Resiliencia Global y Privacidad Total

Orientado a escalado global con aislamiento total de red, donde las llaves de cifrado pertenecen y son rotadas exclusivamente por el cliente (CMK).

### 3.1 Blueprint de Red y Seguridad
```mermaid
graph TD
    subgraph VPC["AWS VPC (Sin salida directa a IGW)"]
        subgraph PublicSubnets["Public / NAT (Opcional)"]
            ALB["AWS ALB (TLS 1.3)"]
        end
        subgraph PrivateAppSubnets["App Subnets (Multi-AZ)"]
            EKS["EKS Node Groups\n(Pods w/ IAM Roles for SA)"]
        end
        subgraph PrivateDataSubnets["Data Subnets"]
            Aurora["Amazon Aurora Postgres\n(Multi-AZ Cluster)"]
        end
        VPCE["VPC Endpoints\n(KMS, Secrets Mgr, S3)"]
    end
    
    Users((TrÃ¡fico)) --> ALB
    ALB --> EKS
    EKS --> Aurora
    EKS -.-> VPCE
```

### 3.2 ImplementaciÃ³n de Seguridad
- **Privacidad de Red:** Los pods de la aplicaciÃ³n no tienen acceso directo a Internet. Toda comunicaciÃ³n con servicios AWS (KMS para llaves de cifrado) se realiza mediante **VPC Endpoint Services (PrivateLink)**.
- **Estrategia HÃ­brida:** Permite rotar a `APP_AGNOSTIC` para bases de datos secundarias NoSQL (como DynamoDB) donde RLS no sea nativo, manteniendo el cifrado transparente vÃ­a CMK.

### 3.3 Infraestructura como CÃ³digo (Terraform Sample)
```hcl
# DefiniciÃ³n de Cluster Aurora con CMK de Cliente
resource "aws_kms_key" "db_encryption_key" {
  description             = "KMS Key for Customer Data Compliance"
  deletion_window_in_days = 7
  enable_key_rotation     = true # ISO 27001 A.10.1.2
}

resource "aws_rds_cluster" "aurora_cluster" {
  cluster_identifier      = "bmad-aurora-cluster"
  engine                 = "aurora-postgresql"
  database_name          = "corporate_db"
  master_username        = "admin"
  master_password        = var.db_password
  
  storage_encrypted      = true
  kms_key_id            = aws_kms_key.db_encryption_key.arn
  
  vpc_security_group_ids = [aws_security_group.data_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.private_subnets.name
  
  # Resiliencia Multi-AZ
  availability_zones     = ["us-east-1a", "us-east-1b", "us-east-1c"]
  backtrack_window       = 259200 # 72 Horas de recuperaciÃ³n de desastres
}
```

### 3.4 Matrices Operativas
**Matriz de Cumplimiento:**
| Control ISO 27001 | Requisito | SoluciÃ³n AWS |
| :--- | :--- | :--- |
| **A.13.1.1** | Controles de Red | El trÃ¡fico no cruza Internet PÃºblica gracias a PrivateLink Endpoints. |
| **RGPD Art. 32** | SeudonimizaciÃ³n | SeparaciÃ³n fÃ­sica de llaves KMS y datos PostgreSQL encriptados. |

**AnÃ¡lisis CAP:**
- **Resultado:** **AP** (Disponibilidad y Tolerancia a Particiones).
- **Impacto:** Configurado con Aurora Reader Endpoints, el sistema prioriza responder lecturas desde cualquier AZ activa, manejando una rÃ©plica eventual sub-10ms.

---

## ðŸŸ¢ 4. Escenario ON-PREMISE: Control Total y SoberanÃ­a Extrema

DiseÃ±ado para implementaciones gubernamentales o instalaciones locales aisladas (Air-Gapped) donde la soberanÃ­a fÃ­sica es absoluta.

### 4.1 Blueprint de Red y Seguridad
```mermaid
graph TD
    subgraph Datacenter["Datacenter FÃ­sico Corporativo"]
        FW["Hardware Firewall (NGFW)"]
        subgraph K8sCluster["Kubernetes Cluster (RKE2)"]
            AppPods["Pods de AplicaciÃ³n\n(Carga DinÃ¡mica)"]
            Vault["HashiCorp Vault (Cluster Local)"]
        end
        subgraph BareMetalData["Persistencia FÃ­sica"]
            PostgresHAP["PostgreSQL Bare Metal\n(Patroni / Repmgr)"]
            Backup["Veeam / Backup Inmutable"]
        end
    end
    
    CorporateNetwork --> FW
    FW --> AppPods
    AppPods -.-> Vault
    AppPods --> PostgresHAP
    PostgresHAP --> Backup
```

### 4.2 ImplementaciÃ³n de Seguridad
- **Modo:** Generalmente configurado en `APP_AGNOSTIC` inyectado mediante **HashiCorp Vault**, ya que permite una auditorÃ­a criptogrÃ¡fica de accesos en capas superiores antes de llegar a motores DB que puedan no soportar RLS dinÃ¡mico corporativo avanzado.
- **Respaldo:** Estrategia de backups inmutables con retenciÃ³n estricta de 5 aÃ±os localmente para cumplir con leyes de auditorÃ­a de datos financieros.

### 4.3 Infraestructura como CÃ³digo (Terraform for Vault)
```hcl
# ConfiguraciÃ³n de inyecciÃ³n de secretos y Flags mediante Vault
resource "vault_mount" "kvv2" {
  path        = "secret"
  type        = "kv"
  options     = { version = "2" }
  description = "Secret storage for App Settings"
}

resource "vault_kv_secret_v2" "app_config" {
  mount = vault_mount.kvv2.path
  name  = "production/application-settings"
  
  data_json = jsonencode({
    SECURITY_STRATEGY_MODE = "APP_AGNOSTIC"
    DB_ENCRYPTION_KEY      = var.master_onprem_key
  })
}

# Regla de acceso para el Pod ServiceAccount
resource "vault_policy" "app_reader" {
  name   = "app-policy"
  policy = <<EOT
path "secret/data/production/application-settings" {
  capabilities = ["read"]
}
EOT
}
```

### 4.4 Matrices Operativas
**Matriz de Cumplimiento:**
| Requisito Legal | Control | SoluciÃ³n On-Premise |
| :--- | :--- | :--- |
| **SoberanÃ­a Absoluta** | LocalizaciÃ³n FÃ­sica | Los datos nunca salen de la propiedad fÃ­sica de la empresa. |
| **ISO 27001 A.12.3** | Respaldos | Estrategia de Respaldo en Cinta / Almacenamiento Objeto S3 Local Inmutable. |

**AnÃ¡lisis CAP:**
- **Resultado:** **CP** (Foco extremo en consistencia local).
- **Impacto:** Latencias ultrabajas (< 1ms) al estar la computaciÃ³n y los datos en la misma red fÃ­sica cableada. Riesgo de disponibilidad ante desastres naturales a menos que se despliegue un sitio de rÃ©plica DR secundario.

---

## ðŸŸ£ 5. Escenario HÃBRIDO: Emergencia y TransiciÃ³n ElÃ¡stica

Orientado a absorber picos de trÃ¡fico repentinos o cuando la regulaciÃ³n permite computaciÃ³n en nube pero exige persistencia local (Leyes de ProtecciÃ³n de Datos restrictivas).

### 5.1 Blueprint de Red y Seguridad
```mermaid
graph TD
    subgraph PublicCloud["Nube PÃºblica (AWS/Azure)"]
        LB["Cloud Load Balancer"]
        AppNodes["Compute Nodes (Front-end / BFF)\n(App-Layer Logic)"]
    end
    subgraph Conex["Conectividad Segura"]
        VPN["Site-to-Site VPN / DirectConnect"]
    end
    subgraph OnPrem["Datacenter On-Premise"]
        SecFW["Firewall Perimetral"]
        CoreDB[("Base de Datos Maestra\n(Datos PII)")]
    end
    
    Internet --> LB
    LB --> AppNodes
    AppNodes --> VPN
    VPN --> SecFW
    SecFW --> CoreDB
```

### 5.2 Flujo de Datos y OptimizaciÃ³n de Latencia
Al operar en un entorno hÃ­brido, la latencia de red introduce cuellos de botella significativos en el intercambio de datos SQL.

**OptimizaciÃ³n bajo `APP_AGNOSTIC`:**
1.  El adaptador de infraestructura de la aplicaciÃ³n en la nube **no** realiza consultas genÃ©ricas seguidas de filtrado en memoria (lo cual inundarÃ­a la VPN con datos innecesarios).
2.  El selector inyecta el contexto de seguridad (`tenant_id`, `user_roles`) directamente en la clÃ¡usula `WHERE` de la sentencia SQL enviada.
3.  **Beneficio de Latencia:** Solo viaja por la VPN el set de datos estrictamente filtrado y autorizado. La auditorÃ­a se realiza en la capa de aplicaciÃ³n Cloud y se escribe asÃ­ncronamente a un log local redundante.

### 5.3 Matrices Operativas
**Matriz de Cumplimiento:**
| Control ISO 27001 | Requisito | SoluciÃ³n HÃ­brida |
| :--- | :--- | :--- |
| **RGPD Art. 44** | Transferencias Internacionales | Los datos residen en territorio nacional (On-Prem), solo se procesan volatilmente en la nube mediante tÃºneles IPSec. |

**AnÃ¡lisis CAP:**
- **Impacto de Red:** El sistema estÃ¡ altamente expuesto a la **P** (ParticiÃ³n de red). Una caÃ­da de la conexiÃ³n DirectConnect/VPN deja inoperativa la nube.
- **Estrategia de MitigaciÃ³n:** Se requiere un patrÃ³n de Circuit Breaker local en la nube con cachÃ© distribuida de solo-lectura (ej. Valkey/Redis) para mantener la disponibilidad degradada ante caÃ­das de enlace.

---

## ðŸ“œ 6. Resumen Directivo para la Toma de Decisiones

| Variable | Azure | AWS | On-Premise | HÃ­brido |
| :--- | :--- | :--- | :--- | :--- |
| **Complejidad Ops** | Media | Media-Alta | Alta | MÃ¡xima |
| **Flexibilidad de Flag** | Recomendado `INFRA` | Mixto | Recomendado `APP` | Recomendado `APP` |
| **Agilidad de Escala** | MÃ¡xima | MÃ¡xima | Limitada | Alta (Compute) |
| **Compliance Overhead** | Bajo (Out-of-the-box) | Medio | Alto (Manual) | Muy Alto |

---
[? Volver al Índice](./README.es.md)
