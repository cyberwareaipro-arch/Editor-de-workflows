---
name: google-play-release-manager
description: Assigns the uploaded bundle version to a release track, updates release notes, and officially commits the edit to the Google Play Store.
---

# Google Play Release Manager Skill

Use this skill as the final execution piece for the publication workflow. It handles the organizational distribution of the app to a specific audience (Internal Testing, Alpha, Beta, Production) and officially finalizes the upload.

## When to use
- End of Phase 5 (Deployment).
- When an `editId` is active, and the `.aab` is completely uploaded on the Google server.

## How to use

### Phase 1: Track Specification
- **Map Tracks:** Determine the destination track based on input or workflow standard (e.g., branch `main` -> `internal` track; branch `release` -> `production`).
- **Formulate Release Nodes:** Draft the JSON payload mapping the `versionCodes` (from the Uploader Skill) to the targeted `track`. Wait for release notes from a Changelog Agent if necessary.

### Phase 2: Update Track Execution
- **Set Release:** Invoke `edits.tracks.update` passing the `editId`, `track`, and the formatted JSON containing release status (`completed`, `inProgress`) and version mappings.

### Phase 3: the Final Commit
- **Final Validation:** Verify all previous steps logged successfully.
- **Seal The Edit:** Execute `edits.commit` with the `editId`. This is a non-reversible action that applies the changes to the Play Console.

### Phase 4: Notification
- **Success Report:** Construct a human-readable confirmation message with the bundle's `versionCode` and `track`, signaling a successful deployment. Return to the visual pipeline context as "Success".

## Contingencies & Edge Cases
- **Commit Rejection:** If Google rejects the commit phase (due to missing mandatory declarations like Data Safety), immediately invoke a Rollback or exit safely. No damage is done until `commit` is successfully passed.
- **Track Mismatch:** If an internal process attempts to push to Production without approval, halt and throw a Strict Validation Error.

## Specifications
- **Constraints:** Requires a valid `editId` and `versionCode` residing in the agent's workflow state.
- **Standard:** Complies with strict deployment isolation strategies.
