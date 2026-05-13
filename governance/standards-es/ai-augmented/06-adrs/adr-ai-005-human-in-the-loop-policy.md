# ADR-AI-005: PolÃ­tica de Human-in-the-Loop para operaciones con impacto irreversible

*   **Estado:** Propuesto
*   **Fecha:** 2026-05-11

## Contexto
Conceder autonomÃ­a total a un agente para ejecutar funciones con efectos secundarios en el mundo real presenta un riesgo operativo catastrÃ³fico e inaceptable para la organizaciÃ³n. Los agentes pueden alucinar argumentos, entrar en bucles infinitos o ser manipulados vÃ­a inyecciones de prompt indirectas.

## DecisiÃ³n
Definimos categorÃ­as estrictas de operaciones que **SIEMPRE** requieren la interrupciÃ³n del ciclo agÃ©ntico y la aprobaciÃ³n humana fÃ­sica y explÃ­cita. Esto es independiente del nivel de confianza en el modelo o en la suite de pruebas.

**CategorÃ­as de Bloqueo:**
1.  Modificar o borrar datos en entornos productivos.
2.  Enviar notificaciones externas/correos a nombre de la marca.
3.  Operaciones financieras (pagos, reembolsos) por encima del umbral de seguridad corporativo.
4.  Cambios crÃ­ticos en configuraciones de seguridad de red o IAM de nube.

## Consecuencias
*   âœ… **MitigaciÃ³n Extrema del Riesgo:** Previene el escenario del "agente desbocado" borrando servidores o gastando presupuesto ilimitado de la nube.
*   âœ… **Responsabilidad Legal:** Garantiza una traza donde un humano es siempre el firmante final de la acciÃ³n, cubriendo el cumplimiento normativo.
*   âŒ **PÃ©rdida de AutonomÃ­a Pura:** Los flujos agÃ©nticos nocturnos o en tiempo real sufrirÃ¡n latencia de horas esperando la aprobaciÃ³n humana para proceder.

---
[? Volver al Índice](./README.es.md)
