# [ADR 0039](0039-deployment-topology-abstraction-switcher.md): AbstracciÃ³n de TopologÃ­a de Despliegue y Conmutador de Entorno

## 1. Estado
**Estado**: Aprobado  
**Fecha**: 2026-05-11  
**Decisores**: Junta de Arquitectura Empresarial  
**Consultados**: Equipo DevOps, Consejo de Seguridad  

---

## 2. Contexto
La Arquitectura de Referencia Corporativa estÃ¡ diseÃ±ada explÃ­citamente para ser **AgnÃ³stica al Despliegue (Principio P2)**. El mismo binario/contenedor compilado debe ser capaz de ejecutarse en dos modos operativos distintos sin requerir recompilaciÃ³n o ramificaciÃ³n de cÃ³digo:
1.  **Modo SaaS Cloud**: Alta densidad, multi-tenant, expuesto a internet, integrado con CDN de borde y Proveedores de Identidad globales.
2.  **Modo Localizado On-Premise**: Desplegado dentro de la VPN/Intranet aislada de un cliente, usando hardware local SMTP/SMS, y tablas de usuarios locales estrictas con BCrypt.

Actualmente, los lÃ­mites lÃ³gicos explÃ­citos previenen la duplicaciÃ³n de cÃ³digo, pero falta un mecanismo unificado para **cambiar los comportamientos de infraestructura dinÃ¡micamente en tiempo de ejecuciÃ³n**, arriesgando la proliferaciÃ³n de sentencias `if` dispersas por los mÃ³dulos.

---

## 3. DecisiÃ³n
Decretamos una estrategia de **AbstracciÃ³n Estricta Dirigida por FactorÃ­a** para el intercambio de despliegue:

1.  **Selector de Entorno Unificado**: Introducir una variable de entorno obligatoria `DEPLOYMENT_TOPOLOGY` con los valores enum `[SAAS_CLOUD, ON_PREMISE_ISOLATED]`.
2.  **InyecciÃ³n de ConfiguraciÃ³n en el Arranque**: El sistema NO DEBE contener lÃ³gica condicional dentro de los Casos de Uso de AplicaciÃ³n. Todo el intercambio DEBE ocurrir a nivel del Contenedor de InyecciÃ³n de Dependencias (DI) durante el arranque de la aplicaciÃ³n (Entrada principal).
3.  **PatrÃ³n Strategy para Adaptadores**: Cualquier comportamiento que requiera controladores externos distintos (ej., SendGrid para SaaS vs SMTP Haraka Local para On-Premise) DEBE implementar un puerto `Adapter` estandarizado. El contenedor DI vincularÃ¡ condicionalmente la implementaciÃ³n correcta basada en el token de TopologÃ­a.
4.  **Sobrescritura de Feature Flags**: Las banderas de configuraciÃ³n derivadas del interruptor de TopologÃ­a DEBEN exponerse al frontend vÃ­a un endpoint de `SystemConfig`, instruyendo a los clientes de la interfaz a desactivar dinÃ¡micamente caracterÃ­sticas exclusivas de SaaS (como la federaciÃ³n SSO global) en modo Local.

---

## 4. Alternativas Consideradas

### OpciÃ³n A: Ramas especÃ­ficas por entorno / binarios distintos
*   **DescripciÃ³n**: Mantener un repositorio o rama separado para On-Premise.
*   **RazÃ³n del Rechazo**: Viola la Fuente Ãšnica de la Verdad. Carga de mantenimiento masiva rastreando arreglos de bugs a travÃ©s de mÃºltiples artefactos de liberaciÃ³n.

### OpciÃ³n B: Sentencias Condicionales En LÃ­nea (`if (mode === 'saas')`)
*   **DescripciÃ³n**: Comprobar el modo de despliegue directamente dentro de los mÃ©todos del servicio.
*   **RazÃ³n del Rechazo**: ViolaciÃ³n desastrosa de SOLID y Arquitectura Limpia. Contamina la lÃ³gica core con conocimiento del entorno, volviendo las pruebas altamente complejas.

---

## 5. Consecuencias

### âœ… Positivas
*   **Despliegue Sin RecodificaciÃ³n**: La misma imagen Docker corre en la nube de producciÃ³n O dentro de un centro de datos corporativo privado.
*   **LÃ³gica Limpia**: La lÃ³gica de negocio permanece 100% pura e ignorante de dÃ³nde reside fÃ­sicamente.
*   **ConfiguraciÃ³n Predecible**: La configuraciÃ³n de infraestructura se centraliza en ConfigMaps de Kubernetes y montajes de Vault.

### âš ï¸ Negativas / Deuda TÃ©cnica
*   **Superficie de ConfiguraciÃ³n Incrementada**: Los equipos de DevOps deben configurar explÃ­citamente los Valores de Helm para impulsar correctamente la lÃ³gica de inyecciÃ³n en el arranque para ambas matrices.

---

## 6. VerificaciÃ³n y Cumplimiento
*   **Puerta**: Las pruebas unitarias deben instanciar ambas variantes del adaptador para garantizar un cumplimiento de contrato idÃ©ntico.
*   **Checklist de Cumplimiento**: Un Pull Request que introduzca una dependencia de infraestructura DEBE incluir la lÃ³gica de vinculaciÃ³n dinÃ¡mica dentro de la factorÃ­a central `InfraModule`.

---
[? Volver al Índice](./README.es.md)
