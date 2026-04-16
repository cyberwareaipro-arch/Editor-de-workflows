---
name: local-deployment-manager
description: Estandariza y activa el entorno de despliegue local utilizando una base de datos MySQL local o en contenedor.
---

# Local Deployment Manager Skill

Use this skill to standardize, configure, and activate the local development environment. It ensures that the project consistently connects to a Local MySQL instance and that all local URLs and environment parameters are correctly defined for development and testing.

## When to use
- Seeting up a new developer's machine.
- Bootstrapping the application for local testing.
- Switching from a production/staging context back to local development.

## How to use

### Phase 1: Environment Definition
- **.env.local Setup:** Ensure a `.env.local` or `.env` file exists with the standardized Local configuration.
- **Database Connection:** Define `DATABASE_URL` or equivalent variables pointing to the local MySQL instance (e.g., `mysql://user:password@127.0.0.1:3306/local_db`).
- **URL Configuration:** Stardardize base URLs like `NEXT_PUBLIC_API_URL=http://localhost:3000/api` or `APP_URL=http://localhost:3000`.

### Phase 2: Execution & Activation
- **Dependency Check:** Verify that local dependencies (like a running local MySQL server or a `docker-compose.yml` defining the local database) are active.
- **Server Initialization:** Trigger the local development server (e.g., `npm run dev` or equivalent) with the local environment context.

### Phase 3: Validation
- **Connectivity Check:** Ping the local database to ensure the connection is established correctly.
- **Health Endpoint:** Verify that the local URL returns a healthy status code.

## Contingencies & Edge Cases
- **Missing Local MySQL:** If the local MySQL instance is down or missing, suggest launching a local Docker container for MySQL to standardize the dependency.
- **Port Conflicts:** If `localhost:3000` or `3306` are in use, automatically suggest or increment the port in the `.env` configuration.

## Specifications
- **Format:** Validates and generates a `.env` specific for local development. outputs success logs confirming `http://localhost:*` endpoints.
