---
name: tdd-micro-commiter
description: Enforces continuous micro-deliveries, committing and saving progress atomically to prevent context-loss disasters.
---

# TDD Micro Commiter Skill

Use this skill continuously during the implementation phase. It creates strict checkpoints. After every small, logical piece of code is written (or Tests are passed in Test-Driven Development), this skill saves the files, stages them, and makes a descriptive, standardized Git commit.

## When to use
- Whenever a single User Story or logical sub-component is successfully implemented and tested locally.
- When crossing boundaries between major skills (e.g., from Backend Dev to Frontend Dev).
- Immediately before the agent risks running out of context limit.

## How to use

### Phase 1: State Verification (Analysis)
- **Feature Completion:** Verify via the SQA Monitor or unit tests that the recently written code is stable and complete regarding its distinct goal.
- **Artifact Diff:** Check `git status` or equivalent filesystem diffs to see exactly what changed.

### Phase 2: Atomic Committing (Execution)
- **Staging:** Stage only the specific files relevant to the completed feature. Do not dump the entire workspace if multiple unrelated files were touched.
- **Commit Formatting:** Write a strictly formatted commit message combining the action, the file area, and the reference ID (e.g., `feat(auth): implement JWT token validation (#REQ-02)`).

### Phase 3: Save Point (Validation)
- **Execution:** Run the physical save/commit.
- **Context Flush Prep:** By firmly logging the progress into the version control history, this signals to the Agile Sprint Orchestrator that it is safe to flush memory and reset the context.

## Contingencies & Edge Cases
- **Broken Tests:** If invoked while tests are silently failing, reject the commit and route back to the Autonomous Healer. A micro-commit must be fundamentally green/stable.
- **Git Unavailable:** If proper version control software is not installed in the workspace, emulate a save state by appending logs to `CHANGELOG_INTERNAL.md` and creating a zip backup of the directory.

## Specifications
- **Standard:** Conventional Commits specification (Angular style) and TDD "Red-Green-Refactor" cycles.
- **Format:** Executes shell git commands or internal file checkpointing techniques.
