---
name: dependency-guardian
description: Searches, selects, and downloads required software packages while filtering out obsolete or vulnerable dependencies.
---

# Dependency Guardian Skill

Use this skill to manage the project's third-party libraries and frameworks. It ensures that the software solely relies on safe, updated, and verified packages, actively blocking any dependency with known Common Vulnerabilities and Exposures (CVEs) before they enter the environment.

## When to use
- Preparing the environment before writing significant logic (Phase 2).
- Adding a new feature that requires external libraries (e.g., PDF generation, encryption).
- Periodically auditing the `package.json`, `requirements.txt`, or `pom.xml` to ensure up-to-date dependencies.

## How to use

### Phase 1: Requirement Mapping (Analysis)
- **Identify Needs:** Review the Software Design Document (SDD) to determine what functionality requires external libraries.
- **Search Ecosystem:** Determine the standard, community-backed packages for the target language (e.g., NPM, PyPI, Maven).

### Phase 2: Auditing & Selection (Execution)
- **Vulnerability Check:** Cross-reference chosen packages against CVE databases or use tools like `npm audit` or `pip-audit`.
- **Quality Filter:** Reject packages that are unmaintained, deprecated, or lack community trust.
- **File Generation:** Write or update the dependency management configuration files (e.g., `package.json`).

### Phase 3: Installation (Validation)
- **Safe Install:** Execute the package manager install command locally.
- **Lockfile Creation:** Ensure a lockfile (`package-lock.json`, `Pipfile.lock`) is correctly generated to freeze versions.

## Contingencies & Edge Cases
- **Vulnerable Required Package:** If the user demands a specific library that has unpatched critical CVEs, halt and refuse. Offer a secure alternative or request explicit, documented user override acknowledging the risk.
- **Dependency Conflicts:** If two safe packages require conflicting versions of a sub-dependency, use the package manager's resolution tools or find a compatible alternative for one of the packages.

## Specifications
- **Standard:** Complies with OWASP Dependency-Check practices.
- **Format:** Shell command execution and JSON/Text dependency file updates.
