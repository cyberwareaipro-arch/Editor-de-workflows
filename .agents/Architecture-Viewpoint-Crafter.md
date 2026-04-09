---
name: architecture-viewpoint-crafter
description: Generates architectural proposals using foundational viewpoints and paradigms based on requirements.
---

# Architecture Viewpoint Crafter Skill

Use this skill to transform software requirements into a structured architectural design. It proposes system architectures utilizing standard viewpoints (Logical, Physical, Deployment, etc.) and selects the appropriate paradigms (MVC, Microservices, Event-Driven, etc.) best suited to the project needs.

## When to use
- Software requirements (SRS) have been defined and approved.
- Deciding on the high-level system structure before writing any code.
- Needing a visual or descriptive representation of how components interact.

## How to use

### Phase 1: Requirements Mapping (Analysis)
- **Understand Constraints:** Analyze the non-functional requirements (scalability, security, latency) from the SRS.
- **Paradigm Selection:** Determine the best-fit architectural pattern (e.g., Monolithic vs. Microservices) based on project scope.

### Phase 2: Viewpoint Generation (Execution)
- **Logical View:** Define the core domain and business logic components.
- **Development View:** Outline the system's software modules and component organization.
- **Physical/Deployment View:** Describe how the software maps to the hardware/infrastructure.

### Phase 3: Alignment (Validation)
- **Traceability Check:** Ensure that the proposed architecture satisfies every major requirement listed in the SRS.

## Contingencies & Edge Cases
- **Over-engineering:** If the requirements describe a simple CRUD app, default to a robust but simple MVC monolith rather than distributed microservices, unless specified otherwise.
- **Missing Information:** If deployment targets (e.g., AWS vs Local) are unknown, explicitly state assumptions or ask the user.
- **Conflicting Paradigms:** If the user requests incompatible architecture patterns, explain the trade-offs and propose a standardized solution.

## Specifications
- **Standard:** Complies with ISO/IEC/IEEE 42010 (Architecture Description) practices.
- **Output Format:** Markdown document detailing the chosen architectural style, viewpoints, and system boundaries, potentially generating Mermaid.js diagrams for visual representation.
