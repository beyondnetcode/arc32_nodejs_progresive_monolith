# Catálogo de Tools Corporativas Aprobadas

Este documento contiene el listado oficial de herramientas aprobadas por el comité de arquitectura para ser consumidas por agentes de IA.

## 📦 Dominio: Gestión de Proyectos y Workspace
Herramientas estandarizadas para interactuar con el ecosistema de desarrollo.

| Tool Name | Descripción Resumida | Estado |
| :--- | :--- | :--- |
| `workspace_search` | Busca patrones de texto en el codebase utilizando ripgrep. | Aprobada |
| `workspace_read_file` | Lee el contenido completo de un archivo del workspace. | Aprobada |
| `workspace_write_file` | Escribe o edita contenido en un archivo específico. | Aprobada (Requiere Sandbox) |

## 🛒 Dominio: Inventario y Operaciones (Experimental)
Herramientas conectadas a servicios de backend reales.

| Tool Name | Descripción Resumida | Estado |
| :--- | :--- | :--- |
| `inventory_check_stock` | Consulta stock disponible vía MCP Server oficial. | En Evaluación |
| `order_track_shipment` | Rastrea el estatus de envío usando el ID de seguimiento. | Aprobada |

---
> Para añadir una nueva herramienta a esta lista, envíe un ADR tipo Pull Request utilizando la [Plantilla de Catálogo](./tool-catalog-template.md).
