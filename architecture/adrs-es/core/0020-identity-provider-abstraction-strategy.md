# [ADR 0020](0020-identity-provider-abstraction-strategy.md): Estrategia de AbstracciÃ³n de Proveedor de Identidad

## Estado
Aprobado

## Fecha
2026-05-09

## Contexto
Las necesidades de autenticaciÃ³n empresarial migran, cambian y se fragmentan con el tiempo. Vincular los internos del sistema directamente a los SDKs de proveedores (ej. Zitadel, Okta) causa un bloqueo total y deja a la plataforma incapaz de responder a necesidades de despliegue desconectados (air-gapped), requisitos SAML de hubs corporativos externos, o flujos internos estÃ¡ndar heredados de hashing.

## DecisiÃ³n
Separar la verificaciÃ³n de credenciales de la capa de negocio vÃ­a la **inyecciÃ³n polimÃ³rfica de Estrategia** asegurada por una interfaz Hexagonal local (`IAuthenticationPort`):

1. **Bloqueo Cero (Zero Lock-in)**: El nÃºcleo core confÃ­a en una Ãºnica lÃ³gica de Puerto de validaciÃ³n. Solo le importa si las credenciales se resuelven en un vector de usuario verificado.
2. **EjecuciÃ³n DinÃ¡mica**: El resolutor activa los Adaptadores concretos correctos en tiempo de ejecuciÃ³n (vÃ­a banderas de configuraciÃ³n de `Tenant`) alimentÃ¡ndose de:
    - AlmacÃ©n Local (almacenamiento Bcrypt)
    - Proveedores de Identidad Empresarial (Cognito, Azure AD, Okta, Zitadel, Auth0)
    - Endpoints federados generales (OIDC/SAML)
3. **Seguridad Progresiva**: Conectar protocolos actuales que soporten EstÃ¡ndares Modernos (Passkeys, MFA, WebAuthn) nativamente en el pool de proveedores abstraÃ­do.

## Consecuencias

### Positivas
- Alta fluidez de despliegue. Desplegar el mismo cÃ³digo dentro de la nube Azure o dentro de hardware local privado desconectado.
- Los clientes conservan la soberanÃ­a: cada Inquilino (Tenant) empresarial puede configurar y apuntar hacia el AD/SAML de su propia compaÃ±Ã­a.

### Negativas
- Aumenta la complejidad de la factorÃ­a de inicializaciÃ³n requerida para instanciar correctamente los controladores de credenciales adecuados basados en el contexto del host en tiempo de ejecuciÃ³n.

## Referencias
- [ADR-0026: MFA y Passwordless](../adrs/nodejs/0026-mfa-passwordless-adaptive-authentication.md)
- [ADR-0002: Arquitectura Hexagonal Limpia](../adrs/nodejs/0002-clean-architecture-nestjs.md)

---
[? Volver al Índice](./README.es.md)
