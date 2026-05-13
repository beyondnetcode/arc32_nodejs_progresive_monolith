# ðŸ§ª Plan de Pruebas de Contrato de IntegraciÃ³n (EspecificaciÃ³n Pact)

Este documento establece el plan estratÃ©gico y las directrices de integraciÃ³n continua para las **Pruebas de Contrato Dirigidas por el Consumidor** (Consumer-Driven Contract Testing) a travÃ©s de los dominios de SCM/Esqueleto de Referencia bajo la **estrategia BMAD-METHOD**.

---

## ðŸ›ï¸ 1. Â¿Por quÃ© Pruebas de Contrato?

En un monorepo modular que evoluciona activamente hacia servicios distribuidos, las Pruebas Unitarias estÃ¡ndar son insuficientes para verificar la seguridad de la integraciÃ³n entre mÃ³dulos, y las pruebas de integraciÃ³n de extremo a extremo (E2E) son lentas, frÃ¡giles y costosas.

Resolvemos esto utilizando **Pruebas de Contrato Dirigidas por el Consumidor** (aprovechando **Pact JS**). Las pruebas de contrato aseguran que los cambios en una API o contrato de Evento por parte de un proveedor no rompan a los consumidores activos aguas abajo, desplazando a la izquierda la seguridad de la integraciÃ³n hacia la pipeline CI/CD como se especifica en el **[ADR 0018](../../../architecture/adrs-es/core/0018-testing-pyramid-quality-gates.md)**.

---

## ðŸ”„ 2. Flujo de Trabajo de Contrato Dirigido por el Consumidor

Las pruebas de contrato operan bajo un modelo "Dirigido por el Consumidor". El consumidor (ej. MÃ³dulo de FacturaciÃ³n) define las cargas Ãºtiles esperadas de peticiÃ³n/respuesta, y el proveedor (ej. MÃ³dulo de Inventario) debe satisfacer ese contrato antes de fusionar el cÃ³digo.

```mermaid
sequenceDiagram
    autonumber
    participant Cons as Consumidor (FacturaciÃ³n)
    participant Pact as Pact Broker / AlmacÃ©n Local de Contratos
    participant Prov as Proveedor (Inventario)

    Note over Cons: Escribir Prueba de Contrato y Definir Mock de Carga Ãštil
    Cons->>Pact: 1. Generar y Publicar Archivo de Contrato Pact JSON
    Note over Prov: La Pipeline CI Dispara la VerificaciÃ³n del Proveedor
    Pact->>Prov: 2. Obtener Contratos Activos
    Note over Prov: Reproducir Peticiones Contra el Controlador de API
    Prov-->>Pact: 3. Publicar Resultados de VerificaciÃ³n Pasan o Fallan
    Note over Pact: El Pact Broker comprueba Can I Deploy
```

---

## âš™ï¸ 3. Ejemplo de Contrato Concreto (EspecificaciÃ³n Pact)

El siguiente contrato especifica una interacciÃ³n activa entre el **MÃ³dulo de FacturaciÃ³n (Consumidor)** y el **MÃ³dulo de Inventario (Proveedor)**:

### A. La DefiniciÃ³n del Contrato (Archivo Pact JSON)
```json
{
  "consumer": { "name": "BillingModule" },
  "provider": { "name": "InventoryModule" },
  "interactions": [
    {
      "description": "A request for verified container weight",
      "request": {
        "method": "GET",
        "path": "/api/v1/containers/CONT-998822/weight"
      },
      "response": {
        "status": 200,
        "headers": { "Content-Type": "application/json" },
        "body": {
          "containerId": "CONT-998822",
          "verifiedWeight": 24500.50,
          "isWeighed": true
        }
      }
    }
  ]
}
```

---

## ðŸ›¡ï¸ 4. IntegraciÃ³n CI/CD y Puertas de Calidad

Para automatizar la aplicaciÃ³n de contratos y prevenir que los cambios disruptivos lleguen a producciÃ³n:

1.  **Commit lint y GeneraciÃ³n Local**: Cuando un desarrollador modifica cÃ³digo del consumidor (FacturaciÃ³n), las pruebas locales generan un nuevo contrato pact `.json`.
2.  **VerificaciÃ³n del Pact Broker**: La pipeline CI/CD empuja los archivos pact a un Pact Broker interno (o los guarda en una carpeta compartida del espacio de trabajo durante la ejecuciÃ³n del monorepo).
3.  **Puerta de VerificaciÃ³n del Proveedor**: La pipeline CI del Proveedor (Inventario) ejecuta:
    `npm run test:contract:provider`
    Si un desarrollador del proveedor intenta renombrar `verifiedWeight` a `vgm_weight`, la prueba de contrato falla inmediatamente, bloqueando la Pull Request automÃ¡ticamente antes de que ocurra cualquier despliegue.
4.  **Comprobaciones Can-I-Deploy**: Antes de liberar una versiÃ³n a producciÃ³n, la pipeline de liberaciÃ³n consulta al Pact Broker para verificar que la versiÃ³n especÃ­fica del consumidor es totalmente compatible con la versiÃ³n activa del proveedor.

---
[? Volver al Índice](./README.es.md)
