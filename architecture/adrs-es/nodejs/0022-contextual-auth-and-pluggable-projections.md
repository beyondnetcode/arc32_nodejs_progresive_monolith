# [ADR 0022](0022-contextual-auth-and-pluggable-projections.md): AutenticaciÃ³n Contextual y Proyecciones de Salida Enchufables

## Estado
Aprobado

## Fecha
2026-05-08

## Contexto
Los planos de ejecuciÃ³n SaaS enfrentan una pesada fricciÃ³n de integraciÃ³n: los microservicios ligeros necesitan formatos de tokens binarios condensados pequeÃ±os para prevenir el hinchazÃ³n de datos, mientras que los clientes Frontend pesados (Angular/React) demandan salidas completas de Ã¡rboles JSON recursivos para dibujar dinÃ¡micamente los menÃºs de navegaciÃ³n. Codificar rÃ­gidamente un Ãºnico formato de salida limita ya sea la eficiencia del ancho de banda o la velocidad de la aplicaciÃ³n.

## DecisiÃ³n
Separar la lÃ³gica de ValidaciÃ³n de Identidad enteramente de las capacidades de composiciÃ³n de salida, imponiendo proyectores especializados en tiempo de ejecuciÃ³n:

1. **Mapa de Proyectores Enchufables**: El servicio Core emite un modelo de permisos universal. Proyectores enchufables dedicados capturan esta carga Ãºtil y la reformatean adaptada a los consumidores (ej., un compresor JWT para servicios internos, un generador de grafos JSON rico para agentes de navegador).
2. **Enrutamiento de Nodo Contextual**: Soporte de diseÃ±o nativo para resolver la jerarquÃ­a bajando a travÃ©s del Inquilino, hasta llegar dinÃ¡micamente bajo demanda al enrutamiento del nodo de Sucursal fÃ­sica ("Sede").
3. **CachÃ© de Lectura EstÃ¡ndar**: Enrutar todas las proyecciones a travÃ©s de puentes Redis de Alto Rendimiento, reteniendo las metas comunes de ejecuciÃ³n de destino por debajo del milisegundo para endpoints de validaciÃ³n de lectura intensiva.

## Consecuencias

### Positivas
- Unifica la gobernanza bajo una Ãºnica fuente de seguridad, respetando las variadas tolerancias de protocolos aguas abajo.
- Empodera nativamente los flujos de autorizaciÃ³n sensibles a la ubicaciÃ³n y especÃ­ficos de los nodos sin hacks de base de datos.

### Negativas
- Aumenta el volumen de cÃ³digo inicial para soportar varias plantillas de proyecciÃ³n.
- Requiere sincronÃ­a de invalidaciÃ³n de cachÃ© a travÃ©s de los diferentes formatos compilados.

## Referencias
- [ADR-0021: Grafo Auth de Alto Rendimiento](../adrs/nodejs/0021-high-performance-auth-and-graph-compilation.md)
- [ADR-0020: Estrategia de IdP](../adrs/core/0020-identity-provider-abstraction-strategy.md)

---
[? Volver al Índice](./README.es.md)
