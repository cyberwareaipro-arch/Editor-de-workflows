---
name: agile-sprint-orchestrator
description: Acts as the Scrum Master, orchestrating development phases in iterative loops while managing system resources.
---

# Agile Sprint Orchestrator Skill

Use this skill to manage the overall software development lifecycle in an iterative, Agile manner. It prevents out-of-memory or context-loss issues by chunking work into Sprints and enforcing a cyclic process (Plan-Do-Check-Act) across phases.

## When to use
- Starting a new, complex software development project.
- Transitioning between major development phases (e.g., from Design to Implementation).
- The system reaches context limits and needs to cleanly reset while maintaining state.
- Orchestrating a loop of Phase 2 (Context), Phase 3 (Implementation), Phase 4 (Verification), and Phase 5 (Deployment).

## How to use

### Phase 1: Context Preparation (Analysis)
- **Input Review:** Verify the current state of the architecture and backlog.
- **Resource Check:** Evaluate available tokens, memory, and context window limits.
- **Sprint Initialization:** Identify the target block of User Stories for the current Sprint cycle.

### Phase 2: Orchestration (Execution)
- **Phase Triggering:** Sequentially invoke the necessary skills for Context, Implementation, Verification, and Deployment.
- **State Preservation:** Continuously save architectural context and key decisions to persistent storage before context resets.
- **Loop Management:** Enforce the Plan-Do-Check-Act (PDCA) loop conforming to Scrum Guide 2020 standards.

### Phase 3: Sprint Closure (Validation)
- **Completion Check:** Ensure all User Stories in the current Sprint meet the Definition of Done.
- **Clean Reset:** Cleanly flush temporary context and prepare the environment for the next block of User Stories.

## Contingencies & Edge Cases
- **Context Limit Approaching:** Immediately trigger a state-save operation and gracefully pause the workflow. Request a clean continuation from the user.
- **Failed Sprint Phase:** If Verification or Deployment fails, halt the loop and invoke diagnostic/healing skills before proceeding.
- **Missing Architecture Context:** If base architecture context is lost, halt and require the user to provide the System Design Document (SDD).

## Specifications
- **Format:** Operates via orchestration commands and state-file management (e.g., updating a `sprint_state.json` or `context.md`).
- **Standard:** Complies with Scrum Guide 2020 and PDCA loops.
- **Constraint:** Must never execute the entire project lifecycle in a single monolithic pass; strict enforcement of chunked User Stories.
