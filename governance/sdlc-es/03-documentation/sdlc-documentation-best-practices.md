# ðŸ“š Mejores Prácticas para la Documentación del SDLC

> ðŸŒ **Navegación Bilingí¼e:** [ðŸ‡ºðŸ‡¸ English Version](../../sdlc/03-documentation/sdlc-documentation-best-practices.md)

Esta polí­tica dicta cómo el conocimiento técnico y arquitectónico DEBE madurar junto con las entregas de código en todas las fases del ciclo de vida, desde el MVP hasta producción.

---

## ðŸ† 1. Objetivos Clave
Prevenir la "putrefacción documental" (información desactualizada) y mantener una fuente íºnica, veraz y versionada de la verdad para todo el ecosistema de ingenierí­a.

---

## ðŸ› ï¸ 2. Estándares Nucleares Estratégicos

### ðŸ“¦ A. Documentación como Código (Docs as Code)
Tratar la documentación exactamente igual que al código de producción.
*   Almacenar contenido narrativo en Markdown junto al código de la aplicación.
*   Utilizar Control de Versiones estándar (Git) para auditorí­a e historial de diferencias (diffs).
*   Someter los documentos a revisiones de código (Pull Requests) para garantizar precisión.

### ðŸ”„ B. Ciclo de Vida Sincronizado y Versionado
Los documentos deben madurar exactamente de forma sí­ncrona con los incrementos de funcionalidad.
*   **Regla:** Ningíºn código de feature debe integrarse en ramas estables sin su actualización documental delta.
*   El estado documental DEBE mapearse a los Git Tags de Release (ej: la doc v1.2.0 refleja exactamente la mecánica del software v1.2.0).

### ðŸŒ± C. Madurez Incremental (Evolución)
No intentar alcanzar el detalle exhaustivo el Dí­a 1.
*   **Fase 1 (MVP):** Mantener READMEs minimalistas y atómicos que solo cubran la comprensión central de ingenierí­a.
*   **Fase 2+ (Escalamiento):** Expandir tutoriales, mapas conceptuales más profundos y diagramas de modos de fallo de forma iterativa.

### ðŸ¤– D. Automatización Primero (Auto-Gen)
Maximizar la actualización no-humana de artefactos para garantizar fiabilidad.
*   Exponer esquemas de API vivos directamente desde los metadatos del código fuente (Swagger/OpenAPI).
*   Aprovechar el lenguaje de marcado Mermaid.js para diagramas directamente dentro del markdown, permitiendo trazabilidad visual sin archivos binarios.

### E. Legibilidad de Historias Funcionales
Los requisitos funcionales deben ser legibles por Product Owners y Analistas de Negocio antes de ser utiles para ingenieria.
*   Las Historias Funcionales DEBEN separar proposito de negocio, actores, flujos, reglas de negocio y criterios de aceptacion del detalle de implementacion.
*   APIs, payloads, protocolos, base de datos, cache, controles de seguridad y restricciones de runtime DEBEN ubicarse en una seccion dedicada de Requisitos Tecnicos.
*   Ver el [Estandar de Redaccion de Historias Funcionales](./functional-story-writing-standard.md).

---

## ðŸ” 3. Ciclo de Retroalimentación y Limpieza

1.  **Retroalimentación Continua:** Toda página publicada DEBE invitar a correcciones ví­a creación de tickets simples si los detalles parecen ambiguos.
2.  **Auditorí­a de Obsolescencia:** Durante el retiro o la depreciación de cualquier microservicio o funcionalidad, una subtarea explí­cita DEBE disparar el borrado de la documentación expirada para limpiar el ruido ambiente.

---
[? Volver al Índice](./README.es.md)
