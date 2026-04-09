---
name: api-contract-designer
description: Designs and generates standard API contracts (e.g., OpenAPI/Swagger) before backend implementation begins.
---

# API Contract Designer Skill

Use this skill to establish clear boundaries and communication formats for the system. It designs the endpoints, HTTP methods, request payloads, and response schemas, ensuring that frontend and backend developers (or agent components) have a unified contract.

## When to use
- Designing a web service, microservice array, or RESTful/GraphQL API.
- Before writing any routing logic or backend controllers.
- Translating functional requirements into network communication schemas.

## How to use

### Phase 1: Endpoint Strategy (Analysis)
- **Review Scope:** Read the SDD and User Stories to determining what actions the client needs to perform.
- **Resource Mapping:** Identify the core nouns/entities (e.g., Users, Products, Orders) and map them to standard CRUD operations.

### Phase 2: Schema Definition (Execution)
- **Method Assignment:** Define GET, POST, PUT, PATCH, DELETE operations.
- **Data Modeling:** Create strict JSON schemas for inputs and outputs, ensuring data validation (e.g., `email` string formats, `minimum` integer values).
- **Security Headers:** Define the authentication requirements for each endpoint (e.g., Bearer tokens, API Keys).

### Phase 3: Artifact Generation (Validation)
- **File Creation:** Write a standard `openapi.yaml` or `swagger.json` file to the project repository.
- **Completeness Check:** Validate that the schema syntax is correct and the endpoints cover all required actions from the SRS.

## Contingencies & Edge Cases
- **Non-RESTful Requirements:** If the system requires real-time streams (WebSockets) or GraphQL, generate AsyncAPI schemas or `.graphql` schema definitions instead of standard OpenAPI.
- **Data Leakage:** If the generated response schema includes sensitive fields (e.g., returning password hashes), flag and immediately remove the fields from the DTO (Data Transfer Object) definition.

## Specifications
- **Standard:** Complies with the OpenAPI Specification (OAS 3.0+).
- **Format:** Outputs a formal `.yaml` or `.json` schema definition file.
