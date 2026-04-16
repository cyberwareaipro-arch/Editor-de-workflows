---
name: google-play-bundle-uploader
description: Initializes a new App Edit transaction and uploads an Android App Bundle (.aab) securely to Google Play.
---

# Google Play Bundle Uploader Skill

Use this skill immediately after obtaining a valid authenticated API context. It acts as the pipeline engineer responsible for uploading the heavy payload (`.aab` or `.apk`) into Google's cloud storage via the `edits` API.

## When to use
- Middle of Phase 5 (Deployment).
- When a new compiled artifact is ready to be staged.

## How to use

### Phase 1: Prepare Edit Context
- **Create Transaction:** Invoke the `edits.insert` API call using the package name (e.g., `com.example.app`).
- **Store Edit ID:** Extract and persist the generated `editId` returned by Google into the shared workflow context.

### Phase 2: Payload Delivery
- **Locate Artifact:** Locate the `.aab` file from the previous build phase.
- **Upload Action:** Make a multipart/form-data upload via `edits.bundles.upload` (or `edits.apks.upload`), passing the `editId` and the physical file stream.
- **Wait for Processing:** Ensure the HTTP stream finishes and await Google Play's verification of the bundle signature and constraints.

### Phase 3: Checkpoint & Handoff
- **Extract Version Code:** Retrieve the version code integer of the newly uploaded bundle from the Google API response payload.
- **Context Update:** Update the agent lifecycle context with the `editId` and `versionCode` so the Release Manager knows *what* to assign.

## Contingencies & Edge Cases
- **Stale Edit ID:** If the edit token expires or the API throws a 401, re-invoke the Auth Specialist.
- **Upload Failure:** If the connection drops or the bundle violates permissions or signature mismatches, abort the pipeline and report the API Error Object visually to the user.

## Specifications
- **Inputs Required:** `authClient`, `packageName`, `fileStream`.
- **Outputs Produced:** `editId`, `versionCode`.
