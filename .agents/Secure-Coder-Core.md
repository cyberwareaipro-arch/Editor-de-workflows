---
name: secure-coder-core
description: Acts as the primary backend code generator, inherently applying OWASP security standards to newly written code.
---

# Secure Coder Core Skill

Use this skill when transitioning from architecture to active implementation (Phase 3). Instead of just generating functional logic, this skill treats security as the baseline, actively sanitizing inputs, handling sessions, and protecting secrets in every file it produces.

## When to use
- Writing core business logic, controllers, models, or service layers.
- Fulfilling the coding requirements for a User Story.
- Developing backend endpoints that interact with a database or user input.

## How to use

### Phase 1: Context Intake (Analysis)
- **Read Specs:** Parse the API Contract Designer and State Machine Designer outputs.
- **Check Security Matrix:** Read the Risk Assessment outputs to map known mitigation targets into code logic.

### Phase 2: Secure Implementation (Execution)
- **Input Sanitization:** Automatically wrap request parameters with language-specific validation layers (e.g., Zod for TS, Pydantic for Python) preventing XSS and SQL injection.
- **Secret Management:** Never hardcode credentials; always read from `.env` or system environment secrets.
- **Logic Writing:** Construct the core algorithm matching the user story requirements without omitting best practices for error checking.

### Phase 3: Internal Review (Validation)
- **Sanity Check:** Ensure the code compiles logically and that there are no obvious logic vulnerabilities like exposed token returns.
- **Output:** Save the raw scripts to the designated file structure prepared by the SOLID Engine.

## Contingencies & Edge Cases
- **Incomplete Requirements:** If the user story says "Process Payment" but no provider is defined, refuse to hardcode a mock provider unless specifically requested for testing.
- **Unsafe Instructions:** If the user prompt specifically requests an insecure pattern (e.g., "just `eval()` this script"), refuse the prompt entirely and offer a secure sandboxing alternative.

## Specifications
- **Standard:** Strictly adheres to the OWASP Top 10 vulnerabilities list.
- **Format:** Native language code output (.py, .ts, .go, .java) properly injected into the project structure.
