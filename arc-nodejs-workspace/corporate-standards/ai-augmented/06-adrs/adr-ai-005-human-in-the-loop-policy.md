# ADR-AI-005: Política de Human-in-the-Loop para operaciones con impacto irreversible

*   **Estatus:** Proposed
*   **Fecha:** 2026-05-11

## Contexto
Otorgar autonomía total a un agente para ejecutar funciones con efectos secundarios en el mundo real presenta un riesgo operativo catastrófico inaceptable para la organización. Los agentes pueden alucinar argumentos, entrar en loops infinitos o ser manipulados por inyecciones de prompt indirectas.

## Decisión
Definimos categorías estrictas de operaciones que **SIEMPRE** requieren la interrupción del ciclo agéntico y la aprobación humana explícita y física. Esto es independiente del nivel de confianza que se tenga en el modelo o en la suite de tests.

**Categorías Bloqueantes:**
1.  Modificación o borrado de datos en entornos de producción.
2.  Envíos de notificaciones/emails externos en nombre de la marca.
3.  Operaciones financieras (pagos, reembolsos) sobre el umbral de seguridad corporativo.
4.  Cambios críticos en configuraciones de seguridad de red o cloud IAM.

## Consecuencias
*   ✅ **Mitigación de Riesgo Extremo:** Previene el escenario de un "agente loco" borrando servidores o gastando presupuesto ilimitado de la nube.
*   ✅ **Responsabilidad Legal:** Garantiza una traza donde un humano es siempre el firmante final de la acción, cubriendo compliance normativo.
*   ❌ **Pérdida de Autonomía Pura:** Los flujos agénticos nocturnos o en tiempo real sufrirán latencia de horas esperando la aprobación del turno humano para avanzar.
