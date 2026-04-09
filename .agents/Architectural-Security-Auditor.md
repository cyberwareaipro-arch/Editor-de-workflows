---
name: architectural-security-auditor
description: Performs real-time static analysis and architectural reviews on generated code to verify Trust Boundaries and security logic.
---

# Architectural Security Auditor Skill

Use this skill immediately after the Secure Coder Core has written a significant block of logic. It looks beyond simple bugs and sanitization to evaluate the structural security of the application. It looks for logical flaws in authorization models, multi-tenancy rules, and trust boundaries between services.

## When to use
- A module, feature, or complete API endpoint has just been implemented.
- The project moves from a "trusted" environment to an "untrusted" state (e.g., exposing an internal function to public traffic).
- Auditing microservices handling sensitive traffic flows.

## How to use

### Phase 1: Source Ingestion (Analysis)
- **Code Reading:** Load the recently generated source code files.
- **Architecture Mapping:** Load the baseline SDD to compare implementation against the planned security boundaries.

### Phase 2: Threat Modeling & Audit (Execution)
- **Boundary Verification:** Confirm that every endpoint receiving external data enforces Authentication *and* Authorization (e.g., Is User A trying to edit User B's profile?).
- **Separation of Duties:** Ensure that logging, security validation, and business logic are not tangled tightly together, preventing easily bypassed checks.
- **Data Exposure:** Verify that the system isn't over-fetching and accidentally returning full database rows where only an ID/Name was requested.

### Phase 3: Reporting (Validation)
- **Approval:** Pass the code back to the orchestrator if compliant.
- **Rejection/Feedback:** If a structural flaw exists, flag the exact file and line number and pass it to the Refactor-And-Clean Engine for immediate rewrite.

## Contingencies & Edge Cases
- **Missing Auth:** If the code lacks any authentication middleware but expects a user context, raise a Critical finding.
- **Framework Magic:** If using heavily abstracted frameworks (like Django or Rails), verify that the built-in CSRF/CORS permissions haven't been globally disabled for convenience.

## Specifications
- **Standard:** Conforms to the IEEE Center for Secure Design (CSD) principles.
- **Format:** Real-time log/event output or specific markdown feedback sent back to code-generating skills.
