# Patrón: Plan-and-Execute (Planificar y Ejecutar)

Forzamos al ecosistema a desacoplar la intención estratégica de la implementación táctica.

1.  **El Planificador (Planner):** Recibe la petición y genera un DAG (Grafo Acíclico Dirigido) de pasos secuenciales o paralelos.
2.  **Checkpoint (Opcional):** Pausa para revisión humana del Plan.
3.  **El Ejecutor (Executor):** Un bucle de trabajo que toma el primer ítem del plan, lo completa, lo marca como hecho y avanza al siguiente hasta agotar la cola.
