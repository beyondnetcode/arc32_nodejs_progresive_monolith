# Infrastructure & Orchestration

This directory contains the necessary configuration to spin up the local development environment and the required middleware.

## Components

- **Docker Compose**: Orchestrates the following services:
 - **PostgreSQL**: Primary relational database.
 - **Redis**: Distributed cache and session store.
 - **RabbitMQ**: Asynchronous message broker.
 - **Kong Gateway**: API management and security.
 - **Vault**: Secrets management (simulated/OSS).

## Getting Started

1. Ensure you have Docker and Docker Compose installed.
2. Run the environment:
 ```bash
 docker-compose up -d
 ```
3. Verify services are running:
 ```bash
 docker ps
 ```

## Configuration Files
- `docker-compose.yml`: Main orchestration file.
- `kong.yml`: Kong Gateway declarative configuration.

---
[Back to Index](../README.md)
