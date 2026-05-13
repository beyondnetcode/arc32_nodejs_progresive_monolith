# ADR-AI-005: Política de Human-in-the-Loop para operaciones con impacto irreversible

*   **Estado:** Propuesto
*   **Fecha:** 2026-05-11

## Contexto
Conceder autonomía total a un agente para ejecutar funciones con efectos secundarios en el mundo real presenta un riesgo operativo catastrófico e inaceptable para la organización. Los agentes pueden alucinar argumentos, entrar en bucles infinitos o ser manipulados vía inyecciones de prompt indirectas.

## Decisión
Definimos categorías estrictas de operaciones que **SIEMPRE** requieren la interrupción del ciclo agéntico y la aprobación humana física y explícita. Esto es independiente del nivel de confianza en el modelo o en la suite de pruebas.

**Categorías de Bloqueo:**
1.  Modificar o borrar datos en entornos productivos.
2.  Enviar notificaciones externas/correos a nombre de la marca.
3.  Operaciones financieras (pagos, reembolsos) por encima del umbral de seguridad corporativo.
4.  Cambios críticos en configuraciones de seguridad de red o IAM de nube.

## Consecuencias
*   ✅ **Mitigación Extrema del Riesgo:** Previene el escenario del "agente desbocado" borrando servidores o gastando presupuesto ilimitado de la nube.
*   ✅ **Responsabilidad Legal:** Garantiza una traza donde un humano es siempre el firmante final de la acción, cubriendo el cumplimiento normativo.
*   ❌ **Pérdida de Autonomía Pura:** Los flujos agénticos nocturnos o en tiempo real sufrirán latencia de horas esperando la aprobación humana para proceder.
