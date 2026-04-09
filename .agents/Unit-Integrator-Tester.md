---
name: unit-integrator-tester
description: Writes and executes isolated unit and integration test scripts covering both happy paths and edge cases.
---

# Unit Integrator Tester Skill

Use this skill whenever code is pushed for verification. Following the strategy from the Master Test Planner, it physically generates the test files (using frameworks like Jest, PyTest, or JUnit) and runs them in the terminal to validate correctness.

## When to use
- Fulfilling the testing requirements defined in the sprint.
- Implementing "Red" tests before coding in a TDD workflow.
- Re-running test suites after refactoring legacy code.

## How to use

### Phase 1: Test Design (Analysis)
- **Review Logic:** Read the component source code and the corresponding API schema or requirements.
- **Identify Paths:** Explicitly outline the "Happy Path" (expected success), "Failure Path" (expected errors), and "Boundary/Edge Cases".

### Phase 2: Test Implementation (Execution)
- **Mock Dependencies:** Isolate unit tests by generating mocks/stubs for external databases, network calls, or heavy library imports.
- **Write Assertions:** Write tests that assert strict equality or schema matching, avoiding fragile tests that break on minor harmless UI changes.

### Phase 3: Execution & Result (Validation)
- **Run Framework:** Trigger the test runner locally in the environment (e.g., `npm test`, `pytest`).
- **Success Hand-off:** If tests pass (exit code 0), mark the component as verified and notify the Orchestrator.
- **Failure Hand-off:** If tests fail, do *not* fix them directly. Pass the raw console output to the Test Incident Reporter.

## Contingencies & Edge Cases
- **Missing Mocks:** If an integration test accidentally hits a real production database, halt the test suite immediately and enforce local container usage or strict mocking.
- **Flaky Tests:** If a test fails arbitrarily due to asynchronous timing issues, rewrite the assertion using robust waiting/polling mechanisms instead of hardcoded `sleep()` commands.

## Specifications
- **Standard:** Follows IEEE 1008 (Software Unit Testing) and ISTQB principles.
- **Format:** Generates `.spec.ts`, `test_*.py` files and runs shell execution commands.
