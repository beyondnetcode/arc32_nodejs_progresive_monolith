# [ADR 0026](0026-mfa-passwordless-adaptive-authentication.md): Plataforma Adaptativa de MFA y Passwordless

## Estado
Aprobado

## Fecha
2026-05-09

## Contexto
La validaciÃ³n convencional de contraseÃ±as y el MFA por SMS estÃ¡tico en bruto es fuertemente vulnerable a la ingenierÃ­a social agresiva y a los vectores de phishing. Los clientes corporativos demandan cumplimiento de Zero-Trust, requiriendo mecanismos criptogrÃ¡ficos resistentes al phishing junto con experiencias sin fricciÃ³n que no agoten a los usuarios finales.

## DecisiÃ³n
Desplegar un **Marco de MFA Adaptativo Gestionado por Riesgo** que impulse la pipeline de autenticaciÃ³n Core:

1. **Primero Passwordless (Sin ContraseÃ±a)**: Infundir WebAuthn nativo (Passkeys) en los flujos de autenticaciÃ³n, empoderando a los usuarios finales para vincular hardware de alta seguridad (TouchID, FaceID, Yubikeys) nativamente a los inicios de sesiÃ³n.
2. **PuntuaciÃ³n Adaptativa**: Desplegar puntos de control en la pipeline sin estado que inspeccionen metadatos (vectores IP, anomalÃ­as de huella digital, verificaciones de viajes imposibles por ubicaciÃ³n). Producir matrices de riesgo internas.
3. **Aumento DinÃ¡mico (Dynamic Step-Up)**: Alejarse de las fricciones de "siempre encendido". Disparar solicitudes de mÃºltiples factores dinÃ¡micamente solo ante violaciones del umbral de puntuaciÃ³n de riesgo o peticiones que toquen rutas transaccionales crÃ­ticas para el negocio.
4. **Gobernanza por Inquilino**: Permitir que cada perfil de Inquilino (Tenant) empresarial active, configure y mande su umbral exacto de postura de seguridad preferida.

## Consecuencias

### Positivas
- Establece la mejor defensa en su clase contra el Phishing coincidiendo con los estrictos estÃ¡ndares NIST SP 800-63B.
- Eleva dramÃ¡ticamente el rendimiento de los operadores al reducir la fatiga de validaciÃ³n redundante en vectores de dispositivos seguros y establecidos.

### Negativas
- Curva de aprendizaje de incorporaciÃ³n inicial para perfiles de operadores no tÃ©cnicos.
- MÃ­nima sobrecarga de procesamiento de criptografÃ­a requerida por cada inicio de sesiÃ³n.

## Referencias
- [ADR-0020: AbstracciÃ³n de IdP](../adrs/core/0020-identity-provider-abstraction-strategy.md)
- [GuÃ­a Oficial de WebAuthn](https://webauthn.guide/)

---
[? Volver al Índice](./README.es.md)
