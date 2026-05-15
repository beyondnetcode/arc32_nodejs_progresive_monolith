# arc32: Arquitectura Progresiva Enterprise

[![Status](https://img.shields.io/badge/Status-Activo-brightgreen?style=for-the-badge)]()
[![Method](https://img.shields.io/badge/Metodo-BMAD--METHOD-blueviolet?style=for-the-badge)]()
[![License](https://img.shields.io/badge/License-MIT-informational?style=for-the-badge)]()

**arc32** es una referencia técnica abierta para construir productos que puedan empezar como monolitos simples, crecer hacia monolitos modulares y evolucionar hacia servicios distribuidos solo cuando el producto, el equipo y la operación lo justifiquen.

> Separar conceptualmente antes de separar físicamente.

[English](./README.md) | [Español](./README.es.md)

---

## Empieza Aquí

| Si quieres... | Ve a |
|---|---|
| Entender todo el repositorio | [Índice Maestro Global](./MASTER_INDEX.es.md) |
| Aprender el modelo arquitectónico | [Blueprint de Referencia](./architecture/blueprints-es/reference-blueprint.md) |
| Revisar las reglas universales | [Línea Base Arquitectónica Agnóstica](./architecture/blueprints-es/authoritative-tech-stack-agnostic.md) |
| Explorar decisiones y trade-offs | [Registro ADR](./architecture/adrs-es/README.md) |
| Inspeccionar el ejemplo ejecutable | [Demo Sandbox](./knowledge/demo/README.md) |

---

## El Viaje Arquitectónico

arc32 es intencionalmente progresivo. No trata los microservicios como punto de partida por defecto.

```text
Monolito Simple
  -> Monolito Modular
    -> Módulos Distribuidos
      -> Microservicios
```

El repositorio ayuda a decidir **cuándo mantenerse simple**, **cuándo modularizar** y **cuándo la distribución justifica su costo operacional**.

---

## Mapa del Repositorio

| Área | Qué encontrarás |
|---|---|
| [architecture/](./architecture/blueprints-es/README.md) | Blueprints, topología, perfiles de stack y decisiones arquitectónicas |
| [governance/](./governance/standards-es/README.md) | Estándares de ingeniería, SDLC, onboarding y reglas de arquitectura |
| [operations/](./operations/README.es.md) | Observabilidad, soporte runtime y documentación operacional |
| [infrastructure/](./infrastructure/README.es.md) | Plataforma local, gateway, contenedores y activos de infraestructura |
| [knowledge/](./knowledge/demo/README.md) | Documentación demo, investigación, ejemplos y material de aprendizaje |
| [src/](./src/apps/todo-web/README.md) | Implementación de referencia y sandbox ejecutable |

Para navegación por rol, usa el [Índice Maestro Global](./MASTER_INDEX.es.md).

---

## Primeras Lecturas Recomendadas

1. [Directivas Arquitectónicas](./governance/standards-es/vision/architectural-directives.md)
2. [Blueprint de Referencia](./architecture/blueprints-es/reference-blueprint.md)
3. [Línea Base Arquitectónica Agnóstica](./architecture/blueprints-es/authoritative-tech-stack-agnostic.md)
4. [Registro ADR](./architecture/adrs-es/README.md)
5. [Demo Sandbox](./knowledge/demo/README.md)

---

## Inicio Rápido: Demo Sandbox

```bash
git clone https://github.com/beyondnetcode/arc32_progresive_monolith.git
cd arc32_progresive_monolith/src
npm install

docker-compose -f ../infrastructure/docker-compose.yml up -d
npm run dev
```

La demo existe para mostrar patrones arquitectónicos en código. Las reglas y políticas generales permanecen en `architecture/` y `governance/`.

---

## Contribución

Las contribuciones son bienvenidas mediante issues, mejoras documentales, revisión de ADRs, ejemplos, pruebas y refinamientos de la demo.

Antes de contribuir, revisa:

- [Taxonomía del Repositorio](./governance/standards-es/repository-taxonomy.es.md)
- [Manifiesto de Ingeniería](./governance/standards-es/engineering/engineering-manifesto.md)
- [ADR Gitflow](./architecture/adrs-es/core/0050-estrategia-ramas-gitflow.md)

---

## Licencia

Este proyecto se publica como referencia técnica abierta bajo la licencia del repositorio.

---

<div align="center">
 <sub>2026 Ecosistema arc32 | BMAD-METHOD | Ingeniería Aumentada por IA</sub>
</div>
