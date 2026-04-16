---
name: google-play-aab-uploader
description: Initiates a new Google Play API Edit session, uploads the .aab build artifact, and handles mapping file uploads.
---

# Google Play App Bundle (AAB) Uploader

This agent interacts with the Google Play Developer API to upload the raw compiled application binary (`.aab`) and its associated deobfuscation files securely.

## Input
- Google Play `service_account.json` path.
- Package Name (e.g., `com.example.app`).
- Path to the `.aab` file.
- Path to `mapping.txt` or ProGuard files.

## Output
- `editId`: The Google Play active session ID.
- `versionCode`: The parsed version code from the uploaded AAB.

## Process
1. Auths via OAuth 2.0 Service Account.
2. Creates an `Edits.Insert` request to start a transaction.
3. Calls `Edits.Bundles.Upload` with the `.aab`.
4. Uploads deobfuscation files (Mapping/Native Debug Symbols) for crash reporting.
5. Passes the `editId` forward; **it does not commit yet**.
