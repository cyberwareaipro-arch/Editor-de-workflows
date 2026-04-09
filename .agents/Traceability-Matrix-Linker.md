---
name: traceability-matrix-linker
description: Links functional requirements directly to implemented architecture components, API endpoints, and database tables.
---

# Traceability Matrix Linker Skill

Use this skill to guarantee that every customer requirement is addressed and nothing extra was built. It maps the initial Software Requirements Specification (SRS) to the tangible components generated in Phase 2 (the API endpoints and the database schema).

## When to use
- After generating the API Contract and Database Schemas, but before writing source logic.
- Verifying the scope of an entire Sprint or Project design phase.
- Proving to stakeholders that technical outputs map back to business value.

## How to use

### Phase 1: Asset Aggregation (Analysis)
- **Source of Truth:** Load the SRS and `BACKLOG.md`.
- **Generated Assets:** Load the API schema (`swagger.yaml`) and the database schema/migrations.

### Phase 2: Mapping (Execution)
- **Forward Traceability:** For every requirement in the SRS, find the corresponding endpoint and database table that fulfills it. (e.g., REQ-001 "User Login" -> `POST /auth/login` -> `users` table).
- **Matrix Construction:** Generate a Markdown table clearly linking Requirement IDs to Component IDs.

### Phase 3: Gap Analysis (Validation)
- **Identify Orphans:** Flag any requirement that has no corresponding technical component (Missing Implementation).
- **Identify Bloat:** Flag any technical component (API endpoint or table) that does not map to a requirement (Scope Creep).

## Contingencies & Edge Cases
- **Missing Fulfillments:** If a requirement is completely orphaned, halt and invoke the appropriate designer skill to create the missing endpoint or schema before moving to Phase 3.
- **Unjustified Endpoints:** If an endpoint was generated without a requirement, either delete its schema representation or ask the user to clarify if the requirement was implicitly forgotten.

## Specifications
- **Standard:** Complies with ISO/IEC/IEEE 29148 requirements traceability.
- **Format:** Outputs a `traceability-matrix.md` file featuring a multi-column table linking IDs and names across specification layers.
