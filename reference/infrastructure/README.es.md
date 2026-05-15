# Infraestructura y Orquestación

Este directorio contiene la configuración necesaria para levantar el entorno de desarrollo local y el middleware requerido.

## Componentes

- **Docker Compose**: Orquesta los siguientes servicios:
 - **PostgreSQL**: Base de datos relacional primaria.
 - **Redis**: Caché distribuida y almacenamiento de sesiones.
 - **RabbitMQ**: Bróker de mensajes asíncrono.
 - **Kong Gateway**: Gestión de APIs y seguridad.
 - **Vault**: Gestión de secretos (simulado/OSS).

## Inicio Rápido

1. Asegúrate de tener instalados Docker y Docker Compose.
2. Levanta el entorno:
 ```bash
 docker-compose up -d
 ```
3. Verifica que los servicios estén activos:
 ```bash
 docker ps
 ```

## Archivos de Configuración
- `docker-compose.yml`: Archivo principal de orquestación.
- `kong.yml`: Configuración declarativa de Kong Gateway.

---
[Volver al Índice](../README.es.md)
