# 📖 Glossary of Terms (Artifact 1)

This document establishes the standardized, non-ambiguous glossary of terms for the **User Life-Cycle & Permissions Management System (ULPMS)** under the **bMAD Method**.

---

## 🏛️ ULPMS Unified Glossary

| Term | Definition | SSoT Schema Owner |
| :--- | :--- | :--- |
| **User (Usuario)** | A unique human operator or service account registered in the system. Has credentials and assigned Profiles. | `Identity.Users` |
| **Organization (Organización)**| A corporate tenant or company operating within the multi-tenant workspace. Linked to an ERP code. | `Identity.Organizations` |
| **Network (Red)** | A logical network boundary (Private SCM, Public, Shared) governing access policies. | `Identity.Networks` |
| **System (Sistema)** | An independent application or sub-portal registered in the platform (e.g., Inventory, Billing). | `Auth.Systems` |
| **Menu (Menú)** | A structured navigation tree of sidebars and views belonging to a System. | `Auth.Menus` |
| **Option (Opción)** | A specific web page or UI view within a Menu. | `Auth.Options` |
| **Action (Acción)** | A granular operation (e.g., `create`, `read`, `export`) mapped to an API endpoint. | `Auth.Actions` |
| **Profile (Perfil)** | A physical collection of authorizations assigned to Users. | `Auth.Profiles` |
| **Authorization (Autorización)**| The mapping of an Allow/Deny policy to a specific Resource + Action. | `Auth.Authorizations` |
| **Auth Template (Plantilla)** | A reusable versioned blueprint of authorizations used to instantiate Profiles. | `Auth.Templates` |
| **Permission (Permiso)** | The runtime resolved ability of a User to execute an Action, following the precedence rules. | Resolved at Runtime |
| **Multi-Tenancy** | Architectural pattern enabling multiple secure tenants to share the same physical database. | `Core.Architecture` |
