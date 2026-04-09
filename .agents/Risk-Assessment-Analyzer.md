---
name: risk-assessment-analyzer
description: Proactively identifies technical and security risks from the user prompt and proposes mitigations.
---

# Risk Assessment Analyzer Skill

Use this skill early in the planning phase to evaluate the proposed project for potential hazards. It identifies dependencies on third-party integrations, compliance issues, and security vulnerabilities, generating a formal risk matrix and mitigation strategy.

## When to use
- Receiving a new project prompt or complex feature request.
- Evaluating a proposed architecture with multiple external dependencies.
- Identifying security, privacy, or performance bottlenecks before actual design.

## How to use

### Phase 1: Evaluation (Analysis)
- **Prompt Scanning:** Read the user's input scanning for risky keywords (e.g., "payments", "third-party API", "user data", "real-time").
- **Classification:** Categorize found risks into Security, Technical, Operational, and Compliance types.

### Phase 2: Matrix Generation (Execution)
- **Risk Scoring:** Assign a likelihood and impact score to each identified risk.
- **Mitigation Planning:** Draft proactive mitigation strategies for each high-level risk that can be built into the architecture.
- **Matrix Creation:** Compile the findings into a structured Risk Matrix document.

### Phase 3: Integration (Validation)
- **Architecture Feed:** Pass the proposed mitigations forward to the Architecture Viewpoint Crafter skill to ensure they are integrated.
- **User Disclosure:** Present the high-severity risks to the user for awareness.

## Contingencies & Edge Cases
- **Vague Scopes:** If the project scope is entirely undefined, generate a generalized risk matrix based on standard web/software application vulnerabilities (e.g., OWASP Top 10).
- **Zero Identified Risks:** If no risks are apparent, force a review of operational resilience (e.g., what happens if the server goes offline?).

## Specifications
- **Standard:** Complies with ISO 31000 (Risk Management) and IEEE 16326.
- **Format:** Markdown document, typically containing a table evaluating Likelihood vs. Impact with attached Mitigation strategies.
