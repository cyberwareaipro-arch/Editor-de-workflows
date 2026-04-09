---
name: state-machine-designer
description: Designs Finite State Machines for complex business logic to prevent critical logical progression bugs.
---

# State Machine Designer Skill

Use this skill when dealing with entities that change status over time (e.g., Orders, Workflows, User Lifecycle). It enforces strict states and transitions, preventing impossible logic (like shipping an unpaid order) before any code is written.

## When to use
- Encountering a user story related to multi-step processes or "wizards".
- A database entity has a `status` or `state` column.
- Designing carts, payment flows, or approval chains.

## How to use

### Phase 1: Logic Extraction (Analysis)
- **Review Requirements:** Scan the user stories and business rules for transitional verbs (e.g., "approve", "cancel", "fail", "ship").
- **Identify Entities:** Locate the specific models in the SDD and Secure Schema Modeler that hold state.

### Phase 2: Finite State Machine (Execution)
- **Define States:** List all possible valid nodes (e.g., `DRAFT`, `PENDING_PAYMENT`, `PAID`, `SHIPPED`).
- **Define Transitions:** Explicitly declare which states can transition to which and what events trigger the move.
- **Identify Dead Ends:** Clarify final sink states (e.g., `CANCELLED`, `DELIVERED`).

### Phase 3: Artifact Delivery (Validation)
- **State Table Creation:** Generate a transition matrix mapping `[Current State]` + `[Event]` -> `[Next State]`.
- **Diagram Generation:** Output Mermaid.js state diagrams for visual confirmation of the flow.

## Contingencies & Edge Cases
- **Infinite Loops:** If a state machine has a loop that cannot terminate under required business conditions, report it as a logic flaw in the specifications.
- **Unreachable States:** Ensure every defined state has at least one valid transition path directed to it.
- **Extraneous Complexity:** If a state machine is drafted for a simple binary flag (e.g., `is_active` True/False), decline and instruct the use of standard conditionals instead.

## Specifications
- **Standard:** Complies with UML state machine notation and ISO/IEC 19505 standard for diagrammatic logic.
- **Format:** Yields structured text (JSON/YAML objects for code integration) alongside Markdown/Mermaid diagrams.
