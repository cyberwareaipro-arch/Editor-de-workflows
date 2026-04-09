---
name: iac-container-architect
description: Generates strictly secured Infrastructure as Code (IaC) configuration files like Dockerfiles and Kubernetes manifests.
---

# IaC Container Architect Skill

Use this skill to package the finished application into portable, deployable infrastructure. Instead of vague environments, this writes hyper-specific Docker configurations and YAML orchestration manifests to ensure the app runs securely, immutably, and consistently everywhere.

## When to use
- Preparing to host the web application or service.
- The user requests a Docker image or Kubernetes deployment.
- Abstracting database integrations into a self-contained `docker-compose.yml`.

## How to use

### Phase 1: Environment Analysis (Analysis)
- **Evaluate Stack:** Reference the SDD to determine the application's runtime language, required ports, and required external volumes (like databases).
- **Locate Dependencies:** Identify environment variables and file dependencies.

### Phase 2: Architecture Construction (Execution)
- **Dockerfile Writing:** Create a multi-stage Docker build to keep the final image incredibly small. 
- **Security Hardening:** Ensure the container uses a lightweight baseline (like Alpine), drops Root privileges by creating a dedicated `appuser`, and exposes only necessary ports.
- **Orchestration YAML:** Generate `docker-compose.yml` or K8s `deployment.yaml` defining memory limits, readiness probes, and internal networking structures.

### Phase 3: Build Verification (Validation)
- **Dry-run Build:** Instruct the docker daemon locally (if available) to execute `docker compose build` to verify the commands compile correctly without actually pushing to a registry.

## Contingencies & Edge Cases
- **Secret Hardcoding:** If asked to place an `.env` file containing real API keys straight into the Dockerfile, instantly reject and write configuration mapping directly to host-provided environment parameters.
- **Gigantic Dependencies:** If the project requires ML models (e.g., PyTorch) that bloat images to 5GB+, split the architecture into a tiny Application container and a dedicated mounted Volume/Model-serving container.

## Specifications
- **Standard:** Aligns with OCI (Open Container Initiative) standards and Docker Security Best Practices.
- **Format:** Outputs executable `Dockerfile`, `.yml`, or `.yaml` manifest files into the project root.
