---
name: acceptance-criteria-tester
description: Ensures the generated code specifically answers the functional User Stories and Definition of Done using Behavior-Driven Development tools.
---

# Acceptance Criteria Tester Skill

Use this skill bridge the gap between technical assertions (Unit Tests) and business requirements (User Stories). It treats the requirement as the source of truth, validating that the software behaves exactly as requested by the initial prompt.

## When to use
- A Sprint task is marked tentatively "completed" by the execution phase.
- Assisting the Master Test Planner to map tests back to business value.
- Final Functional Validation before Deployment.

## How to use

### Phase 1: Criteria Translation (Analysis)
- **Fetch the Story:** Read the specific User Story from `BACKLOG.md`.
- **Gherkin Translation:** Translate the acceptance criteria into BDD format (Given [Context], When [Event], Then [Outcome]).

### Phase 2: Execution Link (Execution)
- **Generate Test Files:** Output standard `.feature` files (e.g., Cucumber) or structured End-to-End assertions mapping to the Gherkin statements.
- **Run the Criteria:** Execute the behavior tests against the local or staging build of the application.

### Phase 3: Final Verification (Validation)
- **The Definition of Done:** Prove that every acceptance criteria check passes successfully.
- **Approval:** Check off the Sprint task in the orchestrator memory. If it fails, report exactly which `When->Then` branch failed back to the developers.

## Contingencies & Edge Cases
- **Vague Criteria:** If the original story didn't have measurable acceptance criteria defined (e.g., just says "Make it nice"), halt and invoke the Product Backlog Groomer or alert the user to clarify.
- **Technical Passing, Functional Failing:** If the unit tests pass but the given business scenario fails (e.g., the function correctly adds two numbers, but the requirement was to calculate tax percentages), flag this as a critical translation error in Phase 2 logic design.

## Specifications
- **Standard:** Adheres to Behavior-Driven Development (BDD) principles and Given-When-Then phrasing.
- **Format:** Generates `.feature` files and manages functional CI assertion flows.
