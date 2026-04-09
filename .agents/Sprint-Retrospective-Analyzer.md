---
name: sprint-retrospective-analyzer
description: The final step of the sprint; analyzes agent performance logs to document lessons learned and dynamically update the system prompt for the next iteration.
---

# Sprint Retrospective Analyzer Skill

Use this skill to wrap up the very end of the Agile cycle. This skill acts as a Meta-Cognitive loop for the agent itself. By reviewing the failures, test-incidents, and linting rejections that occurred over the sprint, it creates explicit "Lessons Learned" to prevent the agent from repeating the same mistakes in the next cycle.

## When to use
- Officially closing the Sprint Loop (invoked by Agile Sprint Orchestrator).
- Following a highly problematic phase where the Autonomous Healer had to loop multiple times.
- Transitioning to a new set of user stories.

## How to use

### Phase 1: Log Scraping (Analysis)
- **Compile Failures:** Review the logs from the `SQA-Realtime-Monitor`, `Architectural-Security-Auditor`, and `Test-Incident-Reporter`.
- **Spot Trends:** Notice if a specific type of error kept happening (e.g., "The agent forgot to await 4 different database calls", or "The UI Crafter repeatedly generated bad ARIA tags").

### Phase 2: Generating the Retrospective (Execution)
- **Document Learnings:** Summarize these trends into actionable directives (e.g., "Always use `await` with Prisma queries in this schema").
- **State File Creation:** Generate or append to a hidden `.retro.md` file located in the workspace.

### Phase 3: System Injection (Validation)
- **Prompt Refinement:** Provide these explicit learned directives back to the Orchestrator, instructing it to inject the contents of `.retro.md` into the system's "memory" or prompt prefix for the upcoming Sprint.

## Contingencies & Edge Cases
- **No Failures:** If the Sprint was executed perfectly on the first pass (exit code 0 down the line), log a "Perfect Sprint" celebration metric, but still review architecture to ensure the complexity didn't bloat.
- **Critical Misalignments:** If the overarching problem was that the Requirement Elicitation misunderstood the User, the Retrospective must mandate a strict "Ask User for Clarification" policy for all future ambiguous requirements.

## Specifications
- **Standard:** Aligns with standard Agile Retrospective concepts (What went well, What didn't, Action items).
- **Format:** Outputs to a `.retro.md` markdown file or persists directly to the orchestrating agent's config context.
