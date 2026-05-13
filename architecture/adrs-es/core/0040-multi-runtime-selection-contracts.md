# [ADR 0040](0040-multi-runtime-selection-contracts.md): Matriz de SelecciÃ³n de Multi-Runtime y Contratos Entre Runtimes

## 1. Estado
**Estado**: Aprobado  
**Fecha**: 2026-05-11  
**Alcance**: Gobernanza Corporativa (Obligatorio)  

---

## 2. Contexto
Para cumplir con la **VisiÃ³n Corporativa PolÃ­glota**, nuestra organizaciÃ³n autoriza mÃºltiples runtimes de ejecuciÃ³n. Sin embargo, sin una polÃ­tica de selecciÃ³n clara, los equipos pueden seleccionar tecnologÃ­a basÃ¡ndose en preferencias subjetivas en lugar de en la idoneidad del rendimiento. AdemÃ¡s, la comunicaciÃ³n entre runtimes dispares requiere mecanismos explÃ­citos para garantizar la interoperabilidad sin filtrar detalles de implementaciÃ³n del runtime.

---

## 3. DecisiÃ³n

### A. Matriz de SelecciÃ³n de Runtime
Los equipos DEBEN seleccionar el runtime objetivo basÃ¡ndose exclusivamente en el perfil de carga de trabajo especÃ­fico:

| MÃ©trica | Runtime Objetivo | RazÃ³n Fundamental |
| :--- | :--- | :--- |
| **APIs Web, BFF, Ligado a E/S** | **Node.js / TypeScript** | Alta concurrencia de E/S, entrega rÃ¡pida, amplio ecosistema comunitario. |
| **Alto CÃ³mputo, ETL, Lotes (Batch)**| **.NET (C#)** | Rendimiento de multi-hilo superior, cÃ³mputo en bruto tipado, matemÃ¡tica pesada. |
| **Movilidad Operativa** | **Android (Kotlin)** | Acceso directo a perifÃ©ricos de hardware (Scanners, GPS), modo offline estricto. |

### B. Regla de Comunicaciones Entre Runtimes
Se prohÃ­be la dependencia directa del runtime. La comunicaciÃ³n DEBE atravesar lÃ­mites definidos explÃ­citamente:
1.  **Interoperabilidad SÃ­ncrona**: Utiliza obligatoriamente **gRPC (Protocol Buffers)** para transmisiÃ³n segura de tipos y baja latencia entre Node.js y .NET.
2.  **Interoperabilidad AsÃ­ncrona**: Utiliza **RabbitMQ/Kafka** con validaciÃ³n de contrato vÃ­a JSON-Schema o Protobuf.
3.  **Registro de Contratos**: Los contratos deben almacenarse y versionarse centralmente utilizando versionado semÃ¡ntico. Los cambios requieren verificaciÃ³n de compatibilidad hacia atrÃ¡s con **Pact JS/Net**.

---

## 4. Consecuencias

### âœ… Positivas
*   **Costo/Rendimiento Optimizado**: Cada carga de trabajo corre en el motor mÃ¡s eficiente para su perfil de memoria/CPU.
*   **AgnÃ³stico al Talento**: Habilita la contrataciÃ³n simultÃ¡nea a travÃ©s de pools de TypeScript, C# y Android.

### âš ï¸ Negativas
*   **Sobrecarga de Gobernanza**: Requiere mantener plantillas estÃ¡ndar para 3 cadenas de herramientas distintas.

---
[? Volver al Índice](./README.es.md)
