---
name: master-test-planner
description: Develops the overarching test strategy, determining which components need unit, integration, or E2E tests based on criticality.
---

# Master Test Planner Skill

Use this skill at the onset of Phase 4 (Verification). Instead of blindly writing tests for everything, this skill acts as a QA Architect. It reviews the generated code and requirements to formulate an efficient, targeted Testing Strategy that maximizes coverage where failure risk is highest.

## When to use
- Transitioning from Implementation (Phase 3) into formal Testing (Phase 4).
- When a new complex Epic has been fully coded and requires validation before deployment.
- Designing the overarching CI/CD pipeline test requirements.

## How to use

### Phase 1: Code & Requirement Review (Analysis)
- **Assess Criticality:** Cross-reference the Traceability Matrix and Risk Assessment. Identify core modules (e.g., Payment, Security) vs low-priority modules (e.g., Footer UI).
- **Identify Coverage Gaps:** Scan the workspace to map out what existing tests are already handled by the TDD Commiter.

### Phase 2: Strategy Generation (Execution)
- **Unit Testing Plan:** Identify standalone functions, models, and independent algorithms that require high-speed isolated tests.
- **Integration Testing Plan:** Map out endpoints and database queries that must be tested sequentially in a dedicated environment.
- **E2E Testing Plan:** Define critical user journeys (e.g., "User Registration to Checkout") that require full browser/system automation.
- **Create Plan Document:** Generate a formal Master Test Plan document outlining the expected test suites and tools (e.g., Jest, PyTest, Cypress).

### Phase 3: Delegation (Validation)
- **Task Assignment:** Pass the specific testing directives down to the Unit Integrator Tester and Acceptance Criteria Tester for physical execution.

## Contingencies & Edge Cases
- **Missing Code:** If the code to be tested does not map correctly to the API Contract, halt test planning and reject the phase transition back to Secure Coder Core.
- **Resource Constraints:** If the effort estimation determines the agent cannot execute massive E2E tests, strategically skip E2E in favor of heavy unit testing and API Integration testing.

## Specifications
- **Standard:** Complies with ISO/IEC/IEEE 29119 Software Testing Processes.
- **Format:** Generates a `test-plan.md` or directly constructs issue-tickets for the testing sub-agents.
