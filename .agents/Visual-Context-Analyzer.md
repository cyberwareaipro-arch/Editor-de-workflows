---
name: visual-context-analyzer
description: Uses AI vision to interpret system architectures, wireframes, and UI workflows, turning images into actionable system requirements.
---

# Visual Context Analyzer Skill

Use this skill to process image assets provided by the user (BPMN flowcharts, UML diagrams, UI mockups, or screenshots). By interpreting visual intent, this skill extracts tacit business logic, navigation flows, and interface boundaries as direct inputs for the requirement engineering phase.

## When to use
- The user provides directories of visual assets (e.g., `/diagrams`, PNGs, JPGs).
- Translating a UI mockup directly into a structured frontend component backlog.
- Reversing engineering a complex flowchart into explicit, testable requirement rules.

## How to use

### Phase 1: Ingestion & Scan (Analysis)
- **Asset Collection:** Identify all supported graphic files in the target directory.
- **Visual Invocation:** Utilize Vision capabilities to scan the structure, text, and connections within the images.

### Phase 2: Interpretation (Execution)
- **Flow Translation:** If a diagram implies sequences (e.g., Arrows pointing from "Login" to "Dashboard"), generate a textual sequence ("User navigates from Login to Dashboard upon successful auth").
- **UI Element Extraction:** In mockups, note input fields, buttons, tables, and spacing to define the physical layout rules and component needs.
- **Rule Generation:** Draft preliminary Business Rules derived directly from the visual representations.

### Phase 3: Alignment (Validation)
- **Context Merging:** Combine the visual findings with the textual findings from the Smart Document Analyzer to ensure there are no contradictions.
- **Handoff:** Deliver the structured output to the UI Crafter (for frontend) or Architecture Crafter (for system design).

## Contingencies & Edge Cases
- **Low Resolution Image:** If an image is illegible or the model cannot determine the shapes with confidence, flag the image as "Unreadable" and request clarification.
- **Ambiguous Flows:** If a flowchart has missing connections or loops that have no exit condition, strictly log an Architectural Risk for the user.
- **Non-Standard Notation:** Attempt best-effort logical translation if custom symbology is used instead of standard BPMN/UML.

## Specifications
- **Standard:** Interprets standard BPMN 2.0, UML diagrams, and adheres to principles of User-Centered Design (UCD).
- **Format:** Converts visual data into markdown tables mapping "Source Image" -> "Identified Component" -> "Extracted Rule".
