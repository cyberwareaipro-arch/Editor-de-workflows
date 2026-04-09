---
name: load-and-stress-simulator
description: Writes and executes load testing scripts to measure system performance and latency under concurrent stress.
---

# Load And Stress Simulator Skill

Use this skill to determine if the software can handle real-world traffic. It prevents launching an app that works fine for one user but crashes entirely when 100 users hit it at once. It measures latency against the Non-Functional Requirements defined in the SRS.

## When to use
- Towards the end of the Sprint cycle, after functional testing is verified.
- Preparing for a production launch or beta release.
- Validating the performance characteristics of the Concurrency Safe Coder's outputs.

## How to use

### Phase 1: Context Preparation (Analysis)
- **Review Constraints:** Identify the target requests-per-second (RPS) or concurrent user requirements from the SRS.
- **Identify Targets:** Select the heaviest, most critical API endpoints (e.g., search queries, checkout processes).

### Phase 2: Script Construction (Execution)
- **Tool Selection:** Default to tools like `k6` (JavaScript) or generating JMeter plans based on the environment context.
- **Scenario Writing:** Write a script that simulates a realistic user journey rather than just pinging a single endpoint endlessly (e.g., Login -> Get Profile -> Add Item to Cart -> Checkout).
- **Ramp-up Configuration:** Define the virtual user (VU) curve, starting slow and scaling past the required RPS limit to find the break point.

### Phase 3: Execution & Reporting (Validation)
- **Run the Stress Test:** Execute the script locally against the staging or local environment.
- **Measure Bounds:** Monitor the response times (p95, p99) and error rates.
- **Pass/Fail Eval:** If the response time exceeds SRS guidelines (e.g., requirement: <200ms, actual: 800ms), report a Performance Incident to the Orchestrator, failing the test.

## Contingencies & Edge Cases
- **Database Pollution:** Prevent stress tests from filling the database with garbage rows. Ensure the script triggers the `Down` migration or a strict teardown block upon completion.
- **Third Party Overload:** Never execute stress tests against production external third-party APIs (e.g., actual payment gateways); always use their sandbox or a mock.

## Specifications
- **Standard:** Complies with ISO/IEC 25023 defining Performance Efficiency.
- **Format:** Generates `.js` (k6) or specialized simulation script files and runs them via shell.
