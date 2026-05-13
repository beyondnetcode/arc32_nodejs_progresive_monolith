# Human-in-the-Loop: Puntos de ValidaciÃ³n Obligatorios

## DefiniciÃ³n y Objetivos
El patrÃ³n **Human-in-the-Loop (HITL)** establece barreras forzadas en el flujo de ejecuciÃ³n donde el agente autÃ³nomo estÃ¡ obligado a pausar su estado y solicitar la aprobaciÃ³n humana explÃ­cita y fÃ­sica para continuar.

Nuestra arquitectura asume que **NINGÃšN AGENTE ES 100% CONFIABLE** en escenarios con ramificaciones en el mundo fÃ­sico o legal.

## Â¿QuÃ© decisiones requieren SIEMPRE aprobaciÃ³n humana?

En este ecosistema corporativo, las siguientes acciones NO pueden ser autÃ³nomas:

1.  **Operaciones Destructivas Irreversibles:** Borrado de registros en bases de datos de producciÃ³n, cancelaciones masivas de suscripciones, borrado de repositorios.
2.  **Cambios de ConfiguraciÃ³n de Infraestructura (ProducciÃ³n):** ModificaciÃ³n de reglas de firewall, apagado de balanceadores de carga, cambio de cuotas de auto-escalado.
3.  **Comunicaciones Externas Firmadas:** EnvÃ­o de correos masivos a clientes reales, publicaciÃ³n en redes sociales corporativas en nombre de la marca, envÃ­o de ofertas comerciales vinculantes.
4.  **Transacciones EconÃ³micas Sobre el Umbral:** Cualquier desembolso, movimiento de dinero o reembolso que supere el `AUTO_APPROVAL_THRESHOLD` configurado para cada producto.

## Patrones de ImplementaciÃ³n

### A. InterrupciÃ³n vÃ­a Tool Callback (Retrollamada de Herramienta)
El harness intercepta la invocaciÃ³n de la herramienta ANTES de que sea despachada al backend real:
1.  El Agente solicita `execute_payment(amount: 5000)`.
2.  El Harness detecta que `5000 > limit`.
3.  El Harness guarda el estado de la conversaciÃ³n y envÃ­a un webhook a un Canal de AprobaciÃ³n de Slack o panel administrativo.
4.  La ejecuciÃ³n se pone a dormir (`Suspended`).
5.  Tras la aprobaciÃ³n manual, el webhook despierta al harness y concluye la ejecuciÃ³n de la herramienta con el resultado real.

### B. RevisiÃ³n del Plan Pre-EjecuciÃ³n
Usado en conjunto con el patrÃ³n Plan-and-Execute. El Agente genera la lista de 10 comandos Bash que pretende correr. El sistema renderiza la lista al desarrollador, quien debe pulsar "Aprobar y Ejecutar" para proceder.

## Anti-PatrÃ³n CrÃ­tico: La IlusiÃ³n de Control
**Agentes con acceso irrestricto a herramientas destructivas confiando solo en su System Prompt ("Por favor no borres nada importante") representan una negligencia operativa severa.** El control DEBE residir en el cÃ³digo compilado del Harness, no en las intenciones textuales del modelo.

---
[? Volver al Índice](./README.es.md)
