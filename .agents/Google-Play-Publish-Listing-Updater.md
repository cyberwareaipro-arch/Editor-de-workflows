---
name: google-play-publish-listing-updater
description: Updates the Google Play Store Listing details including title, descriptions, and graphic assets (screenshots, icons).
---

# Google Play Store Listing Updater

This agent uses the Google Play Developer API to keep your app's public store listing perfectly in sync with your marketing materials. It handles localized texts and high-resolution graphic assets.

## Input
- `editId` and Package Name.
- Localized JSON containing:
  - `title`
  - `shortDescription`
  - `fullDescription`
- Directory path to Graphic Assets (App icon, Feature Graphic, Screenshots for Phone/Tablet).

## Output
- Store Listing API confirmation (Success/Failure).
- Missing translations report.

## Process
1. Connects to the active API Session (`editId`).
2. Iterates through the provided locales (e.g., `en-US`, `es-419`, `fr-FR`).
3. Calls `Edits.Listings.Update` for the text content.
4. Calls `Edits.Images.Upload` to replace or append screenshots and promotional graphics.
5. Verifies constraints (e.g., Title length <= 30 chars).
