---
name: compliance-changelog-builder
description: Generates or updates the CHANGELOG.md, meticulously linking implemented changes to the original traceability matrix.
---

# Compliance Changelog Builder Skill

Use this skill when preparing for a release. It ensures that the project maintains a formal historical record of changes that is human-readable, technically accurate, and explicitly linked back to the business requirements.

## When to use
- End of a Sprint when a new semantic version has been determined.
- Establishing formal compliance release notes for stakeholders.
- Updating `CHANGELOG.md` following standard open-source or enterprise practices.

## How to use

### Phase 1: Data Aggregation (Analysis)
- **Version Query:** Obtain the new version string from the SemVer Calculator.
- **Commit History:** Pull all commits since the last baseline tag.
- **Traceability Access:** Load the Traceability Matrix to map technical commits back to the original Software Requirement Specification (SRS) IDs.

### Phase 2: Document Generation (Execution)
- **Categorization:** Sort the raw changes under standard headers: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, and `Security`.
- **Annotation:** Append the SRS IDs to the relevant items. (e.g., "Added: New OAuth2 authentication flow to satisfy REQ-AUTH-01").
- **Writing:** Update the `CHANGELOG.md` file, inserting the new version block at the top containing the current date.

### Phase 3: Final Review (Validation)
- **Self-Correction:** Check that no internal agent debugging logs (e.g., "fixed typo caused by healer") pollute the business-facing changelog unless critical.
- **Save State:** Persist the file.

## Contingencies & Edge Cases
- **Empty Sprints:** If the SemVer calculation determined no code changed (perhaps the Sprint only updated internal infrastructure), note the version specifically as an "Internal Chore Release" under the `Changed` category.
- **Missing Matrix:** If the Traceability Matrix wasn't provided, generate a standard Keep A Changelog format relying purely on the conventional commit subjects without the SRS linkage.

## Specifications
- **Standard:** Complies with 'Keep a Changelog' guidelines and IEEE 828.
- **Format:** Generates and appends to the Markdown `CHANGELOG.md` artifact.
