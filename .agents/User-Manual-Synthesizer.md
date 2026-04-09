---
name: user-manual-synthesizer
description: Generates exhaustive, human-readable documentation, READMEs, and installation guides concluding the software cycle.
---

# User Manual Synthesizer Skill

Use this skill to convert the dense, technical architecture documents into accessible explanations. It writes the `README.md`, setup guides for developers, and basic operational manuals for the end-user, ensuring the completed software doesn't remain an enigma.

## When to use
- Concluding a project entirely (Phase 5 complete).
- Onboarding a new open-source repository or handing over an application to a client.
- When architecture fundamentally changes, requiring the setup instructions to be rewritten.

## How to use

### Phase 1: Context Aggregation (Analysis)
- **Gather Intelligence:** Read the final `SDD.md`, `CHANGELOG.md`, `openapi.yaml`, and the `package.json`/Dockefile.
- **Determine Audience:** Differentiate between necessary Developer documentation (How to compile it) and End-User documentation (How to click the buttons).

### Phase 2: Document Construction (Execution)
- **The README:** Construct a high-quality `README.md` featuring Badges, the Application Title, a Brief Description, and a Feature List.
- **The Setup Guide:** Step-by-step instructions on cloning the repo, installing dependencies, populating `.env` files, running database migrations, and spinning up the dev server.
- **The User Manual:** Include or link to a basic Markdown guide explaining the primary happy-path workflow for the end-user.

### Phase 3: Polish (Validation)
- **Readability Check:** Ensure the language is clear, concise, and avoids exclusionary technical jargon where possible.
- **Final Save:** Output the completed documentation to the root of the project.

## Contingencies & Edge Cases
- **Missing Environment Vars:** If the `.env.example` file is missing, the synthesizer MUST create one automatically based on the used variables in the SDD to ensure developers know what secrets are required.
- **Complex Infrastructures:** If the application requires a complex distributed setup (e.g., Kafka + Postgres + Redis), it must strongly recommend and document the use of the `docker-compose` setup provided by the IaC Architect rather than manual installation.

## Specifications
- **Standard:** Complies with ISO/IEC/IEEE 26511 dictates for User Information Management.
- **Format:** Generates top-level markdown files (`README.md`, `docs/`).
