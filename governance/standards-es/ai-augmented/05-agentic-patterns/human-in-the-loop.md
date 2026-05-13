# Human-in-the-Loop: Puntos de Validación Obligatorios

## Definición y Objetivos
El patrón **Human-in-the-Loop (HITL)** establece barreras forzadas en el flujo de ejecución donde el agente autónomo está obligado a pausar su estado y solicitar la aprobación humana explícita y física para continuar.

Nuestra arquitectura asume que **NINGÚN AGENTE ES 100% CONFIABLE** en escenarios con ramificaciones en el mundo físico o legal.

## ¿Qué decisiones requieren SIEMPRE aprobación humana?

En este ecosistema corporativo, las siguientes acciones NO pueden ser autónomas:

1.  **Operaciones Destructivas Irreversibles:** Borrado de registros en bases de datos de producción, cancelaciones masivas de suscripciones, borrado de repositorios.
2.  **Cambios de Configuración de Infraestructura (Producción):** Modificación de reglas de firewall, apagado de balanceadores de carga, cambio de cuotas de auto-escalado.
3.  **Comunicaciones Externas Firmadas:** Envío de correos masivos a clientes reales, publicación en redes sociales corporativas en nombre de la marca, envío de ofertas comerciales vinculantes.
4.  **Transacciones Económicas Sobre el Umbral:** Cualquier desembolso, movimiento de dinero o reembolso que supere el `AUTO_APPROVAL_THRESHOLD` configurado para cada producto.

## Patrones de Implementación

### A. Interrupción vía Tool Callback (Retrollamada de Herramienta)
El harness intercepta la invocación de la herramienta ANTES de que sea despachada al backend real:
1.  El Agente solicita `execute_payment(amount: 5000)`.
2.  El Harness detecta que `5000 > limit`.
3.  El Harness guarda el estado de la conversación y envía un webhook a un Canal de Aprobación de Slack o panel administrativo.
4.  La ejecución se pone a dormir (`Suspended`).
5.  Tras la aprobación manual, el webhook despierta al harness y concluye la ejecución de la herramienta con el resultado real.

### B. Revisión del Plan Pre-Ejecución
Usado en conjunto con el patrón Plan-and-Execute. El Agente genera la lista de 10 comandos Bash que pretende correr. El sistema renderiza la lista al desarrollador, quien debe pulsar "Aprobar y Ejecutar" para proceder.

## Anti-Patrón Crítico: La Ilusión de Control
**Agentes con acceso irrestricto a herramientas destructivas confiando solo en su System Prompt ("Por favor no borres nada importante") representan una negligencia operativa severa.** El control DEBE residir en el código compilado del Harness, no en las intenciones textuales del modelo.
