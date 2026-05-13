# ðŸ“š Mejores PrÃ¡cticas para la DocumentaciÃ³n del SDLC

> ðŸŒ **NavegaciÃ³n BilingÃ¼e:** [ðŸ‡ºðŸ‡¸ English Version](../../sdlc/03-documentation/sdlc-documentation-best-practices.md)

Esta polÃ­tica dicta cÃ³mo el conocimiento tÃ©cnico y arquitectÃ³nico DEBE madurar junto con las entregas de cÃ³digo en todas las fases del ciclo de vida, desde el MVP hasta producciÃ³n.

---

## ðŸ† 1. Objetivos Clave
Prevenir la "putrefacciÃ³n documental" (informaciÃ³n desactualizada) y mantener una fuente Ãºnica, veraz y versionada de la verdad para todo el ecosistema de ingenierÃ­a.

---

## ðŸ› ï¸ 2. EstÃ¡ndares Nucleares EstratÃ©gicos

### ðŸ“¦ A. DocumentaciÃ³n como CÃ³digo (Docs as Code)
Tratar la documentaciÃ³n exactamente igual que al cÃ³digo de producciÃ³n.
*   Almacenar contenido narrativo en Markdown junto al cÃ³digo de la aplicaciÃ³n.
*   Utilizar Control de Versiones estÃ¡ndar (Git) para auditorÃ­a e historial de diferencias (diffs).
*   Someter los documentos a revisiones de cÃ³digo (Pull Requests) para garantizar precisiÃ³n.

### ðŸ”„ B. Ciclo de Vida Sincronizado y Versionado
Los documentos deben madurar exactamente de forma sÃ­ncrona con los incrementos de funcionalidad.
*   **Regla:** NingÃºn cÃ³digo de feature debe integrarse en ramas estables sin su actualizaciÃ³n documental delta.
*   El estado documental DEBE mapearse a los Git Tags de Release (ej: la doc v1.2.0 refleja exactamente la mecÃ¡nica del software v1.2.0).

### ðŸŒ± C. Madurez Incremental (EvoluciÃ³n)
No intentar alcanzar el detalle exhaustivo el DÃ­a 1.
*   **Fase 1 (MVP):** Mantener READMEs minimalistas y atÃ³micos que solo cubran la comprensiÃ³n central de ingenierÃ­a.
*   **Fase 2+ (Escalamiento):** Expandir tutoriales, mapas conceptuales mÃ¡s profundos y diagramas de modos de fallo de forma iterativa.

### ðŸ¤– D. AutomatizaciÃ³n Primero (Auto-Gen)
Maximizar la actualizaciÃ³n no-humana de artefactos para garantizar fiabilidad.
*   Exponer esquemas de API vivos directamente desde los metadatos del cÃ³digo fuente (Swagger/OpenAPI).
*   Aprovechar el lenguaje de marcado Mermaid.js para diagramas directamente dentro del markdown, permitiendo trazabilidad visual sin archivos binarios.

---

## ðŸ” 3. Ciclo de RetroalimentaciÃ³n y Limpieza

1.  **RetroalimentaciÃ³n Continua:** Toda pÃ¡gina publicada DEBE invitar a correcciones vÃ­a creaciÃ³n de tickets simples si los detalles parecen ambiguos.
2.  **AuditorÃ­a de Obsolescencia:** Durante el retiro o la depreciaciÃ³n de cualquier microservicio o funcionalidad, una subtarea explÃ­cita DEBE disparar el borrado de la documentaciÃ³n expirada para limpiar el ruido ambiente.

---
[? Volver al Índice](./README.es.md)
