---
name: google-play-auth-specialist
description: Authenticates with the Google Play Developer API using Service Account Credentials and initializes the Play Android Publisher client.
---

# Google Play Auth Specialist Skill

Use this skill as the foundational step before attempting any modifications, uploads, or releases in the Google Play Console. This agent ensures that secure connectivity to the API is established.

## When to use
- First step of Phase 5 (Deployment to Google Play).
- Anytime an automated script needs to interact with Google Play Console.

## How to use

### Phase 1: Context Verification
- **Credential Check:** Ensure the presence of the `SERVICE_ACCOUNT_KEY.json` or necessary environment variables holding the Google Cloud API service account credentials.
- **Scope Definition:** Request the necessary API scope: `https://www.googleapis.com/auth/androidpublisher`.

### Phase 2: Client Initialization Execution
- **Generate Client:** Use `googleapis` library or equivalent REST calls to instantiate an `androidpublisher` API client.
- **Token Exchange:** Issue the OAuth 2.0 exchange token using the Service Account logic and keep it alive in the workflow context state.

### Phase 3: Hand-off 
- **Context Update:** Output the authenticated Google API configuration object to the shared CI/CD/Agent context so downstream skills (Uploader, Release Manager) can utilize the connection.

## Contingencies & Edge Cases
- **Missing Credentials:** If `SERVICE_ACCOUNT_KEY.json` cannot be located, halt the pipeline immediately with a `Missing Credentials` error.
- **Invalid Scope:** If the token fails (e.g. invalid permissions), report the error and confirm if the service account has "Releases Manager" permissions on Google Play Console.

## Specifications
- **Format:** Orchestrates passing an active Bearer Token or configured `google.auth.GoogleAuth` class instance downstream.
