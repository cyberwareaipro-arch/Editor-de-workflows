---
name: rollback-strategy-planner
description: Develops formal contingency plans and writes automated rollback scripts for disaster recovery scenarios.
---

# Rollback Strategy Planner Skill

Use this skill to protect production deployments. It acknowledges that sometimes tested code still fails in the real world. This skill provides the safety net by preparing the exact "undo" commands to revert code, infrastructure, and databases to the last known stable state.

## When to use
- As part of the deployment (Phase 5) sequence before the Git Push or Container Spin-up occurs.
- When generating the migration scripts for a massive database change.
- A previously deployed version goes down, and a physical rollback needs executing.

## How to use

### Phase 1: Risk & State Assessment (Analysis)
- **Identify Changes:** Review the recent commits, paying close attention to Database Migrations.
- **Determine Dependencies:** Check if an API rollback requires a corresponding Frontend rollback to prevent broken clients.

### Phase 2: Scripting the Contingency (Execution)
- **Database Downgrade:** Write the explicit commands required to reverse the database migrations safely without catastrophic data loss (e.g., executing `prisma migrate resolve --applied` or writing `DOWN` sql scripts).
- **Version Control Revert:** Document the exact `git revert` or `git reset --hard` command targeting the previously tagged Baseline version.
- **Container Rollout:** Write the orchestrator commands (e.g., `kubectl rollout undo`) to swap back to the old image.

### Phase 3: Artifact Delivery (Validation)
- **Plan Generation:** Output a `ROLLBACK-PLAN.md` or append it to the Release notes, giving human operators a one-click copy/paste command if the deploy goes wrong.
- **Handoff:** Notify the Release Gatekeeper that the contingency plan exists.

## Contingencies & Edge Cases
- **Destructive Migrations:** If a migration dropped a column (data destruction), the rollback cannot magically recreate lost data. The planner MUST warn the user that this release is a "Point of No Return" and requires a full database backup prior to deployment.
- **API Breakage Warning:** Reverting a backend version without reverting an auto-updated mobile app will break the users. The strategy must remind operators of this linkage.

## Specifications
- **Standard:** ITIL and ISO/IEC 20000 principles of Service Management and Disaster Recovery.
- **Format:** Generates executable bash scripts or Markdown contingency manuals.
