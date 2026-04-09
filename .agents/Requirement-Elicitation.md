---
name: requirement-elicitation
description: Extracts and formalizes functional and non-functional requirements from user prompts.
---

# Requirement Elicitation Skill

Use this skill at the very beginning of a project to analyze the initial user prompt, extracting both functional (what it must do) and non-functional (performance, security) requirements. This establishes the baseline Software Requirements Specification (SRS).

## When to use
- Receiving an initial project idea or prompt from the user.
- Clarifying vague or incomplete feature requests.
- Establishing the foundational goals before any architectural design begins.

## How to use

### Phase 1: Elicitation (Analysis)
- **Prompt Dissection:** Read the user's input and identify explicit and implicit features.
- **Categorization:** Separate capabilities into Functional Requirements (FR) and Non-Functional Requirements (NFR).

### Phase 2: Formalization (Execution)
- **Drafting the SRS:** Structure the extracted information into a standard Software Requirements Specification format.
- **Idenfication of Constraints:** Explicitly document strict business rules, performance standards, and security mandates.

### Phase 3: Consensus (Validation)
- **Completeness Check:** Verify that goals are measurable, testable, and unambiguous.
- **User Approval:** Present the structured requirements to the user for validation and sign-off before proceeding.

## Contingencies & Edge Cases
- **Ambiguous Inputs:** If the prompt lacks necessary details (e.g., target audience, platform), ask highly specific clarifying questions.
- **Contradictory Requirements:** Flag conflicting goals (e.g., "must use 10MB of RAM" vs "must load 10GB datasets in memory") and request resolution.
- **Scope Creep Warning:** If the prompt implies an overly broad scope, explicitly suggest a Minimum Viable Product (MVP) boundary.

## Specifications
- **Standard:** Adheres to ISO/IEC/IEEE 29148 standards for requirements engineering.
- **Output Format:** Generates an `SRS.md` or similar markdown artifact using structured bullet points, requirement IDs (e.g., REQ-001), and clear constraints.
