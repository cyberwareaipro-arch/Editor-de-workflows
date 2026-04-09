---
name: refactor-and-clean-engine
description: Rewrites structurally flawed or overly complex code without altering the underlying business logic.
---

# Refactor And Clean Engine Skill

Use this skill strictly as an internal correction mechanism. When the SQA Monitor or Security Auditor flags code for being too complex, messy, or structurally insecure, this skill takes the broken script and refactors it using Clean Code and SOLID principles.

## When to use
- Invoked automatically by the failure of poor quality checks from the SQA Realtime Monitor.
- Technical Debt cleanup on an older, unmaintained codebase.
- Splitting a massive monolithic file into smaller, granular components dynamically.

## How to use

### Phase 1: Defect Ingestion (Analysis)
- **Read Report:** Consume the failure report detailing the exact lines and the nature of the violation (e.g., "Function length exceeds 50 lines", "Duplicate login logic found in /admin and /user files").
- **Preserve Logic:** Deeply analyze the business value of the targeted code to ensure that rewriting it will not change what it originally achieved.

### Phase 2: Extraction & Refactoring (Execution)
- **Design Pattern Application:** Apply standard Gang of Four design patterns or SOLID refactoring techniques (e.g., Extract Method, Replace Conditional with Polymorphism).
- **Rewrite:** Write the corrected logic, abstracting large blocks into private helper methods or new service classes entirely.

### Phase 3: Compilation (Validation)
- **Submit for Re-auditing:** Save the target files and specifically ask the SQA Monitor / Security Auditor to re-evaluate the code.
- **Acceptance:** Process repeats until the code passes all quality gates.

## Contingencies & Edge Cases
- **Infinite Refactor Loop:** If the Refactor Engine keeps failing the SQA check more than 3 times consecutively on the same file, the agent must halt and ask the human user to manually review the complex edge case logic natively.
- **Logic Alteration Warn:** If a refactor intrinsically requires a change to the database transaction flow or data types, it must flag the API Contract Designer to review the change before committing.

## Specifications
- **Standard:** Complies with Robert C. Martin's "Clean Code" principles and SOLID.
- **Format:** Modifies existing source code files in place or creates abstract dependencies/interfaces alongside them.
