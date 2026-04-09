---
name: test-incident-reporter
description: Translates raw terminal test failures into structured, actionable Incident Reports.
---

# Test Incident Reporter Skill

Use this skill when automated tests fail. Instead of playing guessing games with the code, this skill rigorously parses the stack trace, identifies the exact point of logical deviation, and drafts a structured Incident Report to ensure the subsequent fix is precise.

## When to use
- `Unit-Integrator-Tester` returns a non-zero exit code.
- CI/CD pipeline drops a failure log.
- `DAST-Security-Scanner` flags an intrusion vulnerability.

## How to use

### Phase 1: Log Parsing (Analysis)
- **Read Stack Trace:** Ingest the raw terminal error log.
- **Identify Failure Point:** Pinpoint the exact file name and line number where the assertion failed or the exception was thrown.

### Phase 2: Structuring the Incident (Execution)
- **Context Synthesis:** Identify what the test was *trying* to do (e.g., "Verify authentication rejection on expired token") versus what *actually* happened (e.g., "Returned 200 OK instead of 401").
- **Drafting:** Write the "Test Incident Report" detailing:
  - Incident ID / Timestamp
  - Target Component
  - Expected vs Actual Behavior
  - Stack Trace Snippet

### Phase 3: Delegation (Validation)
- **Handoff:** Pass the structured Incident Report directly to the Autonomous Healer skill for patching.

## Contingencies & Edge Cases
- **Ambiguous Errors:** If the test suite crashed catastrophically (e.g., SyntaxError preventing tests from running), flag the incident as a "Compilation Failure" rather than a "Logic Failure".
- **Infinite Test Loops:** If the error is a Timeout or Out of Memory exception, specifically flag performance constraints so the Healer doesn't just tweak logic but actually refactors for efficiency.

## Specifications
- **Standard:** Follows ISO/IEC/IEEE 29119 Software Testing (Incident Reporting) standards.
- **Format:** Generates brief markdown Incident Reports intended for internal agent processing.
