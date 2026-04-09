---
name: solid-engine
description: Scaffolds the fundamental directory tree and initial project architecture adhering to SOLID principles.
---

# SOLID Engine Skill

Use this skill to bootstrap the foundational directory structure and core architectural files. It guarantees that the project is built with Separation of Concerns, Single Responsibility, and Dependency Inversion embedded directly into the foundational layout.

## When to use
- Moving from Architectural Design into the physical setup of the repository.
- Generating the initial scaffolding for a new service or module.
- Refactoring a monolithic script into a properly abstracted component structure.

## How to use

### Phase 1: Blueprint Parsing (Analysis)
- **Review Architecture:** Read the architectural design and logical views.
- **Tech Stack Check:** Identify the chosen programming language and framework to determine idiomatic folder structures.

### Phase 2: Scaffolding (Execution)
- **Directory Creation:** Generate the directory tree separating interfaces, implementations, core domain, infrastructure, and delivery mechanisms.
- **Base Interfaces:** Create boilerplate interface/abstract classes that enforce Dependency Inversion.

### Phase 3: Structural Validation (Validation)
- **SOLID Audit:** Review the generated scaffolding. Ensure that the core domain has absolutely no outward dependencies on frameworks or databases.
- **Clearance:** Confirm that the generated tree successfully represents the intended architecture.

## Contingencies & Edge Cases
- **Language Limitations:** If the target language does not natively support strict interfaces (e.g., vanilla JavaScript), emulate Dependency Inversion through dependency injection and documented contracts.
- **Excessive Abstraction:** Avoid "Enterprise FizzBuzz" patterns for minimal scripts; balance SOLID principles with the project's actual size requirement.
- **Existing Codebase:** If applying to an existing repository, do not overwrite files aggressively. Instead, propose the directory moves and create the new abstractions safely.

## Specifications
- **Standard:** Strictly enforces SOLID principles (Single-Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion).
- **Format:** Primarily physical execution (creating directories and files via shell/OS commands) or generating a `tree` representation in markdown for user approval prior to execution.
