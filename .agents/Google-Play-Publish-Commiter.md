---
name: google-play-publish-commiter
description: Concludes the Google Play API flow by assigning the uploaded bundle to a Track (Internal, Alpha, Beta, Production) and committing the release.
---

# Google Play Publish Committer

This agent takes an existing Google Play Edit session, binds the uploaded App Bundle to a specific release track, attaches the correct release notes, and officially commits the transaction to make it live (or pending review).

## Input
- `editId` and Package Name.
- App `versionCode`.
- Target Track (`internal`, `alpha`, `beta`, `production`).
- Release Status (`draft`, `inProgress`, `halted`, `completed`).
- Release Notes JSON/Path.

## Output
- Successful publish URL or console link.
- State verification confirm.

## Process
1. Calls `Edits.Tracks.Update` adding the `versionCode` to the requested track.
2. Applies the Release Notes to the track release.
3. Validate the edit via `Edits.Validate` to ensure no policy or structure errors.
4. If validation passes, fires `Edits.Commit` to lock and publish the release.
