# 🧪 Use Case Specifications (Artifact 2)

This document formalizes the main functional transactions, pre-conditions, actors, and flows within the **User Life-Cycle & Permissions Management System (ULPMS)** under the **bMAD Method**.

---

## 🏛️ 1. Caso de Uso 1: User Authentication via External IdP

*   **Primary Actor**: SCM Corporate User.
*   **Preconditions**: User is registered in the ULPMS database and holds a valid HR employee reference.
*   **Main Flow**:
    1. User accesses the SCM portal and clicks "Login with Corporate SSO".
    2. The application redirects the user to the external IdP (Keycloak/Azure AD) using OAuth 2.0 Auth Code Flow with PKCE.
    3. User authenticates successfully on the IdP portal.
    4. IdP redirects back to the SCM portal with an Authorization Code.
    5. The SCM backend exchanges the code for a secure access token (JWT) containing employee claims.
    6. The system verifies the `employee_reference` against the local database, initializes the user session, and returns the application cookie.
*   **Alternative Flows**:
    *   *IdP Inaccessible*: The system falls back to a temporary local credentials authentication page for pre-authorized IT Administrators only.

---

## 🧭 2. Caso de Uso 2: Build User Authorization Graph

*   **Primary Actor**: Authentication Guard / API Gateway.
*   **Preconditions**: User is successfully authenticated.
*   **Main Flow**:
    1. User dispatches an API request with their active session token.
    2. The Authorization Engine retrieves all Profiles assigned to the User.
    3. The engine fetches all authorizations linked to those Profiles, resolving any inherited Template policies.
    4. The engine applies the **Explicit-Deny Precedence** rules to compile the final list of allowed Actions and Resources.
    5. The system builds a lightweight hierarchical JSON Graph (Systems ➔ Menus ➔ Options ➔ Actions) and caches it in Redis (TTL < 1 hour) to ensure p95 response times < 200ms.
*   **Alternative Flows**:
    *   *No Profile Assigned*: The system returns an empty authorization graph with a warning flag, allowing the user to view the portal base shell but blocking all sub-applications.

---

## 📋 3. Caso de Uso 3: Create & Instantiate Auth Template

*   **Primary Actor**: Global IT Administrator.
*   **Preconditions**: Systems, Menus, and Actions are already registered in the system.
*   **Main Flow**:
    1. IT Administrator navigates to the Template Manager and clicks "Create New Template".
    2. Administrator defines the template name (e.g., `OperatorBaseline`) and initial version (`v1.0.0`).
    3. Administrator selects the authorized Systems, Menus, and Actions, saving the template.
    4. Administrator selects a Profile (or creates a new one) and links it to the newly created Template.
    5. The ULPMS automatically propagates the authorizations to all Users holding that Profile, logging the transaction in the immutable audit ledger.
*   **Alternative Flows**:
    *   *Incompatible Major Version*: If the template requires a newer system version not supported by the local profile's client, the system displays a validation warning prior to saving.
