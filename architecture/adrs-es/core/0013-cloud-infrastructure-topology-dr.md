# [ADR 0013](0013-cloud-infrastructure-topology-dr.md): TopologÃ­a de Infraestructura Cloud y RecuperaciÃ³n ante Desastres (DR)

## Estado
Aprobado

## Fecha
2026-05-08

## Contexto
Las operaciones de negocio manejadas por esta arquitectura demandan una estabilidad de ejecuciÃ³n continua las 24 horas del dÃ­a, los 7 dÃ­as de la semana. El fallo de un componente del centro de datos o un apagÃ³n amplio de una zona de disponibilidad no pueden dejar fuera de lÃ­nea el procesamiento de la ruta crÃ­tica operativa durante horas manuales. Nuestro plan de distribuciÃ³n a travÃ©s de las topologÃ­as de nube objetivo requiere definiciones de polÃ­tica explÃ­citas.

## DecisiÃ³n
DiseÃ±ar la topologÃ­a de infraestructura apuntando a patrones Cloud-Native que impongan alta resiliencia y potencial de failover instantÃ¡neo:

1. **OrquestaciÃ³n Automatizada**: El despliegue evoluciona por fase arquitectÃ³nica. Mientras que la Fase 1 exige solo contenedores OCI estÃ¡ndar sobre cÃ³mputo simple (VMs, Compose), el despliegue en plataformas de clÃºster gestionadas capaces de HPA se activa estrictamente a partir de la Fase 3.
2. **Estrategia Multi-AZ**: La operaciÃ³n estÃ¡ndar ocurre de forma activo-activo a travÃ©s de varias Zonas de Disponibilidad (Availability Zones) explÃ­citas. Una regiÃ³n de respaldo secundaria permanece en warm-standby para un pivot de desastre inmediato.
3. **Entrada de Red Global**: Desplegar un punto unificado de ingreso externo (ej. Cloudflare/Azure Front Door) para analizar la salud y realizar redirecciÃ³n de enrutamiento instantÃ¡nea entre regiones si se detecta degradaciÃ³n del clÃºster local.

## Consecuencias

### Positivas
- Preserva los compromisos de tiempo de actividad (uptime) sin interrupciones para las cadenas operativas corporativas globales.
- Mitiga el daÃ±o potencial de interrupciones estructurales o de zonas de proveedores.

### Negativas
- La distribuciÃ³n Activo-Activo duplica matemÃ¡ticamente los costos de ejecuciÃ³n de infraestructura.
- Requiere pipelines CI/CD sofisticados diseÃ±ados para configuraciones de orquestaciÃ³n de mÃºltiples objetivos.

## Referencias
- [ADR-0011: Tolerancia a Fallos](../adrs/core/0011-fault-tolerance-resiliency-patterns.md)
- [ADR-0028: Estrategia HÃ­brida Autohospedada](../adrs/core/0028-self-hosted-hybrid-infrastructure-on-premise.md)

---
[? Volver al Índice](./README.es.md)
