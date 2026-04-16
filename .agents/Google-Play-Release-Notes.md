---
name: google-play-release-notes
description: Analyzes git commits and PRs to generate rich, localized release notes (en-US, es-ES, etc.) for Google Play in the exact required format.
---

# Google Play Release Notes Generator

This agent analyzes recent git commits, sprint retrospectives, and ticket closures to draft user-friendly release notes formatted specifically for the Google Play Store (e.g., `<en-US>`, `<es-ES>`).

## Input
- `CHANGELOG.md` or raw `git log` output for the current release.
- Target languages.

## Output
- A directory structure matching Google Play Developer API (e.g., `fastlane/metadata/android/en-US/changelogs/1234.txt` or a JSON equivalent) with translation outputs.

## Process
1. Filter out internal technical jargon (e.g., "fixed null pointer in auth module" -> "Improved login stability").
2. Translate the user-friendly list into requested languages.
3. Keep the character count strictly below the 500-character Google Play limit per locale.
