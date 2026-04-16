---
name: vercel-deployment-manager
description: Estandariza y activa el entorno de despliegue en Vercel, gestionando la orquestación (incluyendo Docker / Serverless) y las variables de producción.
---

# Vercel Deployment Manager Skill

Use this skill to standardize, configure, and execute the deployment of the application to the Vercel platform. While Vercel natively handles serverless deployments, this agent manages correct configuration parameters specifically for Docker-based custom runtimes (if applicable) and assures strict `.env` segregation for the Vercel Preview and Production environments.

## When to use
- Connecting a new repository to Vercel for CI/CD automatically.
- Setting up Vercel environment variables specific to a Docker deployment or Serverless architecture.
- Managing standard Production and Preview URLs.

## How to use

### Phase 1: Environment Definition
- **.env.vercel Setup:** Determine and align the correct secrets. Vercel maps these internally, so the agent outputs a `vercel.json` or uses the Vercel CLI to inject them.
- **Docker Configuration:** If deploying a Docker image to Vercel (or Vercel-compatible container deployments), ensure the `Dockerfile` exposes the required port and that Vercel is set to custom builder mode (e.g. `@vercel/docker` if natively supported or integrating with a container registry to trigger Vercel).
- **URL Configuration:** Pre-configure `NEXT_PUBLIC_API_URL` / `APP_URL` using Vercel's absolute system variables like `https://$VERCEL_URL` inside the build context.

### Phase 2: Execution & Activation
- **Vercel CLI / API Sync:** Bind the project and push the environment variables to Vercel (`vercel env add`).
- **Deployment Trigger:** Initiate the production or preview build loop (e.g., executing `vercel --prod` locally or verifying webhook triggers).

### Phase 3: Validation
- **Container Build Checks:** If utilizing Docker under the hood, verify the container builds within the memory limits prescribed by the host platform.
- **Routing Verification:** Check API routes and frontend routes to ensure Vercel edge functions and containers communicate.

## Contingencies & Edge Cases
- **Docker Unsupported Features:** Vercel heavily leans serverless. If a heavy monolithic Docker instance is requested that Vercel restricts, this agent must either adapt it to Vercel Serverless Functions or warn the user to pivot the Docker request solely to Render/AWS.
- **Environment Parity:** Ensure Preview branch deployments do not accidentally overwrite or corrupt the Production database instance by forcing secure split environments for previews.

## Specifications
- **Format:** Orchestrates Vercel configurations and `vercel.json` setups, enforcing strict Docker configurations tailored for serverless/edge if possible.
