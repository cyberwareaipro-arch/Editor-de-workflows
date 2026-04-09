---
name: sqa-realtime-monitor
description: Acts as an invisible Software Quality Assurance auditor, measuring cyclomatic complexity and forcing refactors of messy code.
---

# SQA Realtime Monitor Skill

Use this skill continuously in the background during Phase 3 (Implementation). It assesses the "health" of the generated codebase by acting like a strict linter. If cyclomatic complexity spikes or code becomes tightly coupled and duplicated, the SQA Monitor halts progress to enforce cleanliness.

## When to use
- Instantly after the Secure Coder Core or UI Crafter outputs a new file or modifies an existing one.
- Before committing code into version control (as a pre-commit check proxy).
- Auditing legacy codebases that lack tests and structure.

## How to use

### Phase 1: Code Scanning (Analysis)
- **Read Output:** Analyze the raw code that was just written.
- **Metrics Tooling:** Conceptually (or literally, via shell) measure lines-of-code per function, variable shadowing, duplicate blocks, and Cyclomatic Complexity.

### Phase 2: Quality Assessment (Execution)
- **Complexity Threshold:** If a function has more than 3 nested conditionals or excessive variable scope, mark it as `FAILED_COMPLEXITY`.
- **Maintainability Index:** Ensure naming conventions are clear and self-documenting according to the project SDD.

### Phase 3: Governance (Validation)
- **Approval:** If the script passes the quality limits, approve it for the Test Planner phase.
- **Rejection/Feedback:** If the script fails, generate an explicit "Refactor Request" listing the exact lines and the specific SOLID violation occurring, handing the file to the Refactor-And-Clean Engine.

## Contingencies & Edge Cases
- **Unavoidable Spikes:** Sometimes domain logic (like a massive parsing map) triggers complexity warnings. The SQA Monitor should allow user-directed waivers via comment tags (e.g., `// sqa-ignore-complexity`) if strongly justified in the PR notes.
- **Language Nuances:** Adapt complexity measuring limits based on the language (e.g., standard Go error handling inherently creates high line counts; adjust severity limits accordingly).

## Specifications
- **Standard:** Satisfies IEEE 730 Software Quality Assurance standards.
- **Format:** Operates via automated log feedback loops within the agent's context rather than generating separate files for the user.
