---
name: sprint-planner-engine
description: Selects feasible User Stories from the BACKLOG.md to create a focused Sprint Backlog and Sprint Goal.
---

# Sprint Planner Engine Skill

Use this skill to scope out the next development cycle safely. By reading the `BACKLOG.md` and utilizing effort estimations, it pulls a sub-segment of User Stories to work on (Sprint Backlog). This bounds the scope and prevents context overload in a single execution loop.

## When to use
- Starting a iteration (Sprint) via the Agile Sprint Orchestrator.
- Proceeding to the Implementation Phase from the backlog.
- When an execution run finishes, and the agent needs its next batch of tasks.

## How to use

### Phase 1: Context Aggregation (Analysis)
- **Review Scope:** Parse the `BACKLOG.md` filtering out items by top Priority.
- **Review Capacity:** Load the estimations from the Effort Estimation Engine to determine maximum cycle capacity.

### Phase 2: Selection & Scoping (Execution)
- **Select Stories:** Pluck User Stories sequentially from the top of the backlog until the combined effort hits the conservative safety limit of the agent.
- **Formulate Goal:** Define a unified "Sprint Goal" string summarizing what this batch of stories will achieve together (e.g., "Implement the fundamental User Authentication backend").

### Phase 3: Artifact Updates (Validation)
- **Tag Backlog:** Mark the selected stories in `BACKLOG.md` with status `[SPRINT PENDING]` or `[IN-PROGRESS]`.
- **Generate Sprint Tasking:** Produce a focused, localized task instruction queue just for this sprint (e.g., a temporary `sprint-tasks.json`).

## Contingencies & Edge Cases
- **Oversized Stories:** If the topmost priority story exceeds the entire Sprint capacity itself, actively refuse it. Call on the Product Backlog Groomer to split the story down further.
- **Missing Estimates:** If stories lack token/effort estimations, halt planning and invoke the Effort Estimation Engine first.

## Specifications
- **Standard:** Complies with Scrum Guide principles specifically on Sprint Planning.
- **Format:** Operates directly on the `BACKLOG.md` markdown file, enforcing updates to checklists and statuses.
