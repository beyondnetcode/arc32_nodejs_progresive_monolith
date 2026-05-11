# Human-in-the-Loop: Puntos de Validación Obligatorios

## Definición y Objetivos
El patrón **Human-in-the-Loop (HITL)** establece barreras forzadas en el flujo de ejecución donde el agente autónomo se ve obligado a pausar su estado y solicitar aprobación humana explícita para poder continuar.

Nuestra arquitectura asume que **NINGÚN AGENTE ES 100% CONFIABLE** en escenarios con ramificaciones en el mundo físico o legal.

## ¿Qué decisiones SIEMPRE requieren aprobación humana?

En este ecosistema corporativo, las siguientes acciones NO pueden ser autónomas:

1.  **Operaciones Destructivas Irreversibles:** Eliminar registros de bases de datos productivas, cancelar suscripciones masivas, borrar repositorios.
2.  **Cambios en Configuración de Infraestructura (Producción):** Modificar reglas de firewall, apagar balanceadores de carga, cambiar cuotas de auto-escalamiento.
3.  **Comunicaciones Externas Firmadas:** Enviar correos masivos a clientes reales, publicar en redes sociales corporativas en nombre de la empresa, enviar ofertas comerciales vinculantes.
4.  **Transacciones Económicas sobre el Umbral:** Cualquier desembolso, movimiento de dinero o reembolso que supere el valor económico configurado como `UMBRAL_AUTO_APROBACION` de cada producto.

## Patrones de Implementación

### A. Interrupción por Tool Callback
El harness intercepta la invocación de la herramienta antes de ser despachada al backend real:
1.  Agente solicita `execute_payment(amount: 5000)`.
2.  Harness detecta que `5000 > limit`.
3.  Harness guarda el estado de la conversación y envía un webhook a un Slack Approval Channel o panel administrativo.
4.  La ejecución queda durmiendo (`Suspended`).
5.  Tras aprobación manual, el webhook despierta al harness y finaliza la tool execution con el resultado real.

### B. Revisión de Plan Pre-Ejecución
Utilizado en conjunto con el patrón Plan-and-Execute. El Agente genera la lista de 10 comandos Bash que va a correr. El sistema renderiza la lista al programador, quien debe pulsar "Aprobar y Ejecutar" para proceder.

## Anti-Patrón Crítico: La Ilusión del Control
**Agentes con acceso irrestricto a herramientas destructivas confiando únicamente en su System Prompt ("Por favor no borres nada importante") es una negligencia operativa severa.** El control debe residir en el código compilado del Harness, no en las intenciones textuales del modelo.
