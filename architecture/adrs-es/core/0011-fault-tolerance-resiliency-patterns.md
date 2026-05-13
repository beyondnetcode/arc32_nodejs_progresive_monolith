# [ADR 0011](0011-fault-tolerance-resiliency-patterns.md): Patrones de Resiliencia y Tolerancia a Fallos

## Estado
Aprobado

## Fecha
2026-05-08

## Contexto
Los despliegues de misiÃ³n crÃ­tica deben integrarse con APIs volÃ¡tiles de terceros (ej. servicios de aduanas, redes bancarias). Los fallos de red sÃ­ncronos, la latencia excesiva o los tiempos de espera transitorios en los puntos de API externos frecuentemente se propagan en cascada hacia atrÃ¡s, consumiendo hilos de recursos locales y colapsando la disponibilidad de nuestro sistema.

## DecisiÃ³n
Implementar Patrones de Resiliencia explÃ­citos protegiendo todas las salidas del sistema hacia el exterior:

1. **Circuit Breaker Distribuido (Opossum + Redis)**: Envolver las llamadas de red salientes en adaptadores de infraestructura de alto nivel. El estado operativo del circuito (Abierto/Cerrado/Semi-Abierto) DEBE almacenarse en el **ClÃºster Redis** compartido en lugar de la memoria local del proceso. Cuando un Ãºnico nodo de aplicaciÃ³n activa el breaker, el estado se propaga globalmente a travÃ©s del clÃºster instantÃ¡neamente, previniendo llamadas fallidas redundantes de nodos pares.
2. **Reintento con Backoff (Retry with Backoff)**: Configurar interceptores para cÃ³digos transitorios no fatales que ejecuten intentos de backoff exponencial transparentes nativamente dentro de la lÃ³gica del adaptador antes de entregar un resultado de error.
3. **LÃ³gica de Dominio Desacoplada**: El dominio de negocio central debe permanecer 100% agnÃ³stico a estos patrones.
4. **Comprobaciones Activas de Salud en el Borde de Ingreso**: Habilitar la lÃ³gica de circuit breaking upstream de Kong Gateway. Kong monitoriza la capacidad de respuesta de los endpoints y termina las asignaciones de objetivos aguas arriba a nivel del gateway de API si las mÃ©tricas de salud colapsan, protegiendo los nodos de backend de impactos directos de olas de peticiones.

## Consecuencias

### Positivas
- Previene que las interrupciones lentas de dependencias maten de hambre y ahoguen los ciclos de CPU locales.
- Mantiene la disponibilidad local general durante caÃ­das remotas perifÃ©ricas.
- Ofrece flujos de fallo de usuario mucho mÃ¡s seguros que los tiempos de espera infinitos del navegador.

### Negativas
- AÃ±ade lÃ³gica operativa adicional al depurar puntos de integraciÃ³n.
- Requiere una calibraciÃ³n sofisticada de parÃ¡metros (cuÃ¡ntos errores antes de la ruptura, lÃ­mite de timeout, enfriamiento para restauraciÃ³n).

## Referencias
- [Martin Fowler sobre Circuit Breakers](https://martinfowler.com/bliki/CircuitBreaker.html)
- [ADR-0002: Arquitectura Hexagonal Limpia](../adrs/nodejs/0002-clean-architecture-nestjs.md)

---
[? Volver al Índice](./README.es.md)
