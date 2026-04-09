---
name: semver-calculator
description: Automates semantic versioning calculations based on backward compatibility and feature additions.
---

# SemVer Calculator Skill

Use this skill just prior to compiling a release or tagging a repository. It removes human guesswork from version numbers by analyzing the commit diffs or architecture changes and determining if the package fundamentally broke old APIs, purely added new things, or just patched bugs.

## When to use
- Ready to tag a successful Sprint workload for production release.
- Publishing internal or public libraries to an artifact registry (npm, PyPI).
- Bumping versions in `package.json` or `build.gradle` automatically.

## How to use

### Phase 1: Diff Evaluation (Analysis)
- **Parse History:** Read the Git commit log since the last tagged version, utilizing the formats enforced by the TDD Micro Commiter (e.g., `feat:`, `fix:`, `BREAKING CHANGE:`).
- **Architecture Diff:** Compare the current API Contract Designer output against the previous version to identify removed/renamed endpoints.

### Phase 2: Calculation (Execution)
- **MAJOR Threshold:** If an endpoint was removed, a required parameter was added, or a `BREAKING CHANGE` commit exists -> Bump Major (e.g., 1.x.x -> 2.0.0).
- **MINOR Threshold:** If new endpoints were added or new non-disruptive features were deployed -> Bump Minor (e.g., 1.2.x -> 1.3.0).
- **PATCH Threshold:** If the updates were exclusively bug fixes, internal refactoring, or minor CSS tweaks -> Bump Patch (e.g., 1.2.4 -> 1.2.5).

### Phase 3: Tag Generation (Validation)
- **Update Files:** Modify the version strings in all necessary configuration files across the project workspace.
- **Pass Version String:** Send the calculated string (e.g., `v2.4.1`) to the Changelog Builder and Gatekeeper.

## Contingencies & Edge Cases
- **Initial Releases:** If the project has never been tagged, default the initial substantial release to `v1.0.0` or `v0.1.0` (if requested as Beta).
- **Missing Commit Standards:** If the commit history is completely unstructured and impossible to parse semantically, fall back to parsing the raw issue tracker or default aggressively to a MINOR bump to avoid accidental overwrites.

## Specifications
- **Standard:** Strictly adheres to Semantic Versioning (SemVer 2.0.0).
- **Format:** Shell manipulation of JSON/Config versions and variable assignment.
