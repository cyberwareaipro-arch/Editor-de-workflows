---
name: definition-of-ready-validator
description: Reviews the outputs of Phase 2 to ensure all prerequisites are met before committing to code implementation.
---

# Definition Of Ready Validator Skill

Use this skill as the final gatekeeper before coding begins. It double-checks that the APIs, database schemas, and external dependencies prepared in Phase 2 are fully specified, avoiding mid-sprint "blockers" where the agent realizes something was missing to build the required feature.

## When to use
- Concluding Phase 2 of the workflow (Context/Prep/Design).
- Right before invoking the Secure Coder Core or UI Crafter.
- Validating whether a designated Sprint task is actually achievable.

## How to use

### Phase 1: Context Aggregation (Analysis)
- **Collect Artifacts:** Fetch the current Sprint's user stories via the Sprint Planner Engine, the Swagger/OpenAPI files, and the database schema files.

### Phase 2: Cross-Examination (Execution)
- **Dependency Coverage:** Verify every tool, language, and external library defined in the architecture is present and secured via Dependency Guardian.
- **Schema Coverage:** Ensure the database has tables for the data required by the Sprint.
- **Interface Coverage:** Verify that no story requires an API endpoint that hasn't been documented yet.

### Phase 3: Gate Status (Validation)
- **Approval:** If all stories trace cleanly to defined, ready schemas, authorize Phase 3 Execution.
- **Rejection:** If any user story lacks an architectural prerequisite, explicitly fail the check and halt progress.

## Contingencies & Edge Cases
- **Unknown "Hows":** If a story asks to "Implement AI model integration", but there's no defined API or model service in the architecture yet, fail the DoR immediately.
- **Incomplete Mockups:** If the UI Crafter is needed but no visual rules or mockups exist for the frontend, return the task to the visual/design phases.

## Specifications
- **Standard:** Enforces the "Definition of Ready" (DoR) commonly defined by the Agile Alliance.
- **Format:** Generates a brief validation checklist or summary log, rejecting or accepting the state transition.
