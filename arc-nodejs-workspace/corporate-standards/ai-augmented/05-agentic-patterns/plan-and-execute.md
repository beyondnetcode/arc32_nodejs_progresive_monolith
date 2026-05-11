# Patrón: Plan-and-Execute

Forzamos al ecosistema a desacoplar la intención estratégica de la implementación táctica. 

1.  **El Planificador:** Recibe la petición y genera un DAG (Directed Acyclic Graph) de pasos secuenciales o paralelos.
2.  **Punto de Control (Opcional):** Se detiene para revisión humana del Plan.
3.  **El Ejecutor:** Un bucle worker que toma el primer ítem del plan, lo completa, marca como hecho y avanza al siguiente hasta vaciar la lista.
