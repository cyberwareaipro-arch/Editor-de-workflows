---
name: render-deployment-manager
description: Estandariza y activa el entorno de despliegue en Render, enlazando la aplicación con una base de datos Aiven MySQL.
---

# Render Deployment Manager Skill

Use this skill to standardize, configure, and orchestrate the deployment of the application to the Render platform. This agent ensures the application correctly provisions or connects to an Aiven MySQL database and that all environment variables are securely injected into the Render service environment.

## When to use
- Deploying a production or staging release to Render.
- Updating environment variables on Render.
- Migrating the database connection from local/other providers to Aiven MySQL on Render.

## How to use

### Phase 1: Environment Definition
- **.env.render Setup:** Validate a `.env.render` file or output a configuration map meant for Render's Environment Variable settings.
- **Aiven MySQL Integration:** Configure `DATABASE_URL` with the connection string strictly pointing to the Aiven MySQL database (safeguarding the password/credentials).
- **URL Configuration:** Standardize production base URLs. Assign `APP_URL` and `NEXT_PUBLIC_API_URL` to the `.onrender.com` domain or the configured custom domain.

### Phase 2: Execution & Activation
- **Render Configuration (render.yaml):** Generate or update the Infrastructure as Code `render.yaml` blueprint to reflect the web service and the environment map.
- **Build & Start Commands:** Ensure standard commands are set for the service (e.g., `npm install`, `npm run build`, `npm start`).

### Phase 3: Validation
- **Deployment Build:** Monitor the Render build pipeline (via CLI/API if accessible).
- **Aiven Verification:** Ensure standard DB migrations run successfully against the Aiven instance upon deployment.
- **Healtchecks:** Verify the public Render URL replies with a 2xx status code.

## Contingencies & Edge Cases
- **Secret Hardcoding:** Never place the Aiven DB password inside plain-text files. Ensure it is injected as an encrypted secret in Render's dashboard.
- **Connection Limits:** Aiven MySQL may have connection limits based on the tier. If utilizing serverless, ensure connection pooling logic is enabled.

## Specifications
- **Format:** Operates on Render `render.yaml` or Render API inputs to set Aiven MySQL variables and custom URLs securely.
