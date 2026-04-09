---
name: release-gatekeeper
description: Validates all architecture, test, and release documentation artifacts before authorizing final packaging or deployment.
---

# Release Gatekeeper Skill

Use this skill as the final, absolute validator before the project is built into an executable or pushed to production. It acts as a strict checklist to guarantee no sloppy, undocumented, or failing code makes it past the finish line.

## When to use
- Culminating Phase 5 (Deployment).
- Right before instructing Docker/CI/CD pipelines to build production images.
- Closing out the Sprint officially.

## How to use

### Phase 1: The Final Audit (Analysis)
- **Artifact Sweep:** Verify the physical presence and freshness of the: 
    - Output Binaries/Code
    - Software Design Document (SDD)
    - Passed Test Logs
    - Updated CHANGELOG.md
    - Semantic Version tags

### Phase 2: Gate Logic (Execution)
- **Sync Validation:** Cross-check the timestamps. The SDD and the Test Logs must be newer than the oldest code. If code was edited *after* tests were passed, the Gatekeeper fails.
- **Packaging Trigger:** If the audit is cleanly passed, authorize the compilation step (e.g., invoking `npm run build`, triggering `IaC Container Architect`, or running `git push --tags`).
- **Release Notification:** Construct the final human-readable release confirmation message.

### Phase 3: Notification (Validation)
- **Handoff:** Present the final release notification, artifact locations, and the current SemVer version directly to the User, signaling the Sprint's physical end.

## Contingencies & Edge Cases
- **Out of Sync Artifacts:** If the Gatekeeper realizes that the `CHANGELOG.md` was never updated for this version, it halts and violently rejects the release, kicking the workflow back to the Compliance Changelog Builder.
- **Failed Build Step:** If the code attempts to compile for production (e.g., Webpack/Vite build) and fails due to minification errors, despite tests passing, halt and report a Critical Compilation Incident.

## Specifications
- **Standard:** Complies with ISO/IEC/IEEE 12207 (Software Transition Process).
- **Format:** Acts as an orchestration logic check, running shell build steps upon success.
