---
name: multi-environment-swagger-designer
description: Designs and generates comprehensive, multi-environment OpenAPI/Swagger contracts with embedded QA boundaries.
---

# Multi-Environment Swagger Designer Skill

Use this skill to establish an advanced, production-ready API Contract that inherently supports multiple deployment tiers (e.g., Development, Staging, Production). This prevents the common error of hardcoding localhost URIs into production contracts or sharing dev-only endpoints with external clients.

## When to use
- Designing a web service, microservice array, or RESTful API meant for tiered deployment.
- Upgrading a basic Swagger document to support full CI/CD deployment stages.
- When you need strict environment-specific variables defined directly in the API Schema.

## How to use

### Phase 1: Endpoint & Environment Strategy (Analysis)
- **Review Scope:** Read the SDD to map out standard CRUD operations and custom endpoints.
- **Environment Mapping:** Explicitly define the infrastructure environments required (e.g., `dev.api.example.com`, `staging.api.example.com`, `api.example.com`).

### Phase 2: Schema Definition (Execution)
- **Servers Block:** Construct the root `servers` array in the OpenAPI document to include all environments with descriptive variables (e.g., `{tier}.api.com` where `tier` defaults to `dev`).
- **Data Modeling & Auth:** Define the schemas, DTOs, and global security schemes (e.g., Bearer, API Keys) supporting environment-specific overrides if applicable.
- **Endpoint Segmentation:** If certain endpoints are strictly for internal testing (e.g., `/dev/seed_database`), tag them appropriately or construct environment-specific `paths` exclusions.

### Phase 3: Artifact Generation (Validation)
- **File Creation:** Write a standard, fully populated `openapi.yaml` or `swagger.yaml` file.
- **Linting:** Ensure the API definition compiles correctly against strict OpenAPI 3.0+ linting standards.

## Contingencies & Edge Cases
- **Missing Domain Names:** If the actual production URL is unknown, default to variable-based generic URIs (e.g., `https://{env}.project-placeholder.com`) and prompt the Orchestrator to update it once known.
- **Environment Specific Auth:** If production requires OAuth2 but Dev uses simple API Keys, document BOTH inside the `securitySchemes` block with clear descriptions of when they apply.

## Specifications
- **Standard:** Complies with OpenAPI Specification (OAS 3.0+).
- **Format:** Outputs a formal `.yaml` schema definition file equipped with the `servers` array.
