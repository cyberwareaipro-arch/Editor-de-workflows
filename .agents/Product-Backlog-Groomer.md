---
name: product-backlog-groomer
description: Breaks down high-level requirements into Epics and prioritized User Stories in a BACKLOG.md.
---

# Product Backlog Groomer Skill

Use this skill to translate the general software requirements into actionable, ticket-style items. It prioritizes tasks based on value delivery, formatting them consistently to maintain an active, "living" backlog file.

## When to use
- Translating an SRS into actionable chunks for the agent.
- Mid-project, when new requirements are discovered and need prioritizing.
- Before every Sprint Planning session to ensure the backlog is clean and ordered.

## How to use

### Phase 1: Decomposition (Analysis)
- **Read Requirements:** Take the SRS and the Effort Estimation outputs.
- **Identify Epics:** Group related functional requirements into large-scale "Epics".

### Phase 2: Grooming (Execution)
- **Slice Stories:** Break down Epics into small, independent User Stories.
- **Apply INVEST:** Ensure every story is Independent, Negotiable, Valuable, Estimable, Small, and Testable.
- **Prioritize:** Order the backlog so that core, high-risk, high-value infrastructure is built first.

### Phase 3: Artifact Generation (Validation)
- **Create/Update File:** Write or append the results to the `BACKLOG.md` file in the project directory.
- **Review:** Confirm no single User Story encapsulates too much complexity.

## Contingencies & Edge Cases
- **Vague Stories:** If a requirement cannot be made "Testable" or "Estimable", tag it with `[NEEDS CLARIFICATION]` and place it at the bottom of the backlog.
- **Dependencies:** If Story A strictly relies on Story B, enforce priority ordering in the list and note the dependency explicitly.

## Specifications
- **Standard:** Complies with INVEST Agile principles.
- **Format:** Markdown file (`BACKLOG.md`) utilizing checkbox lists or tabular format with columns: ID, Epic, Story Description, Priority, and Status.
