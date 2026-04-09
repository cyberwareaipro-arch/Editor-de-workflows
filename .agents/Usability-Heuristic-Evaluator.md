---
name: usability-heuristic-evaluator
description: Evaluates generated UIs against Nielsen's Heuristics to ensure human-friendly error prevention and clear system status.
---

# Usability Heuristic Evaluator Skill

Use this skill to perform automated subjective QA on the Frontend. It acts as an artificial proxy for a human user, looking at the code structure of the UI to verify it isn't just "functioning," but is actually usable, predictable, and forgiving.

## When to use
- After the UI Crafter completes a set of visually interactive components.
- During E2E testing to verify the Frontend conforms to human-centric principles.
- Automatically analyzing screenshots of generated UIs.

## How to use

### Phase 1: UI Ingestion (Analysis)
- **Code Scan:** Read the compiled `.html` or framework component data.
- **Action Identification:** Locate all interactive elements (forms, buttons, modals, navigation links).

### Phase 2: Heuristic Evaluation (Execution)
- **System Status Check:** Verify that long-running operations triggered by buttons have explicit loading states or spinners documented in the code.
- **Error Prevention:** Verify that destructive actions (e.g., "Delete Account") require confirmation dialogs and that "Save" buttons are cleanly disabled if required fields are empty.
- **User Control:** Ensure there is always a clear "Cancel" or "Go Back" interaction available in modal dialogs or multi-step wizards.

### Phase 3: Feedback (Validation)
- **Compliance Matrix:** Determine if the interface passes standard heuristic checks.
- **Rework Generation:** If it fails (e.g., "Submit button stays active while loading, risking double-submission"), send explicit directives back to the UI Crafter to fix the code.

## Contingencies & Edge Cases
- **Missing Copy:** If the UI uses generic text like `Button 1` or `Error Code 59X`, flag a heuristic violation for "Match between system and real world" demanding user-friendly terminology.

## Specifications
- **Standard:** Complies with Jakob Nielsen's 10 General Principles for Interaction Design.
- **Format:** Generates subjective analysis logs internally, guiding UI refactoring.
