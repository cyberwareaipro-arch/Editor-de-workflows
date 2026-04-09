---
name: sdd-documenter
description: Drafts a comprehensive Software Design Document (SDD) recording architectural decisions before coding.
---

# SDD Documenter Skill

Use this skill to compile the outputs of previous architecture and requirement elicitation phases into a formal Software Design Document (SDD). This acts as the blueprint for the application and justifies technical decisions.

## When to use
- Architecture and technical stacks have been selected.
- A foundational directory structure has been proposed.
- There is a need to formally document technical intent before entering the implementation phase.

## How to use

### Phase 1: Compilation (Analysis)
- **Gather Artifacts:** Collect the System Requirements Specification (SRS), architectural viewpoints, and risk matrices.
- **Review Decisions:** Understand why specific patterns (e.g., MVC, Microservices) were chosen over alternatives.

### Phase 2: Documentation (Execution)
- **Structure Generation:** Format an SDD following standard IEEE templates.
- **Content Drafting:** Write sections covering System Overview, Architecture Design, Data Design, and Component Design.
- **Justification Recording:** Explicitly document the rationale behind significant architectural choices.

### Phase 3: Review (Validation)
- **Consistency Check:** Verify that the SDD does not contradict the SRS.
- **Approval Prep:** Finalize the document and present it for user or stakeholder sign-off.

## Contingencies & Edge Cases
- **Missing Inputs:** If previous steps skipped generating key artifacts, pause and request the missing data before proceeding.
- **Overly Generic Requirements:** If the SRS is too vague to design from, state assumptions explicitly in a dedicated section of the SDD.
- **Contradictions:** If the chosen tech stack contradicts the deployment views, flag the issue to the user immediately.

## Specifications
- **Standard:** Complies with IEEE 1016 (Software Design Descriptions).
- **Format:** Generates an `sdd.md` or similar comprehensive markdown artifact.
