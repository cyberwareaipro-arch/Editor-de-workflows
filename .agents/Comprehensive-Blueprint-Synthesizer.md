---
name: comprehensive-blueprint-synthesizer
description: Compiles every context abstraction (architecture, models, rules, stories, roles) into one master reference document.
---

# Comprehensive Blueprint Synthesizer Skill

Use this skill to create the ultimate "Source of Truth" document for the project. Instead of piecing together fragments from 5 different files, this skill ingests the entire output of Phase 1 and Phase 2 (Requirements, UX, Logic, Architecture, Database) and synthesizes them into a single, massive, cross-referenced blueprint.

## When to use
- Concluding the Context and Design phases (Fase 1 & Fase 2) before coding begins.
- Generating a comprehensive handover document for external stakeholders or human engineering teams.
- Re-aligning the agent's context when returning to a dormant project after a long break.

## How to use

### Phase 1: Mass Ingestion (Analysis)
- **Read All Context:** Retrieve the Software Requirement Specification (SRS), Software Design Document (SDD), `BACKLOG.md`, Traceability Matrix, and Schema definitions.
- **Identify Gaps:** Check if any core element (Architecture, Data Model, Business Rules, User Stories, or Role Definitions) is missing from the compiled workspace.

### Phase 2: Structural Synthesis (Execution)
- **Role Permissions:** Explicitly define the matrix of "Who can do What" (RBAC - Role-Based Access Control).
- **Business Logic Mapping:** List all strict business rules (e.g., "Passwords must be 12 chars", "Taxes are 21%") in a dedicated, scannable section.
- **Master Assembly:** Draft the Master Blueprint document structured linearly:
  1. Executive Summary & Goals
  2. Role Definitions & Permissions
  3. Architecture & Tech Stack (incl. infrastructure views)
  4. Global Business Rules & Triggers
  5. The Data Model (Entity Relationships)
  6. The Epics & User Stories (The Functional Workflow)

### Phase 3: Final Delivery (Validation)
- **Contradiction Sweep:** Run a final internal NLP check to ensure the Data Model doesn't contradict the Business Rules (e.g., ensuring a 'discount' field exists if a rule mentions discounts).
- **File Generation:** Save the document as `MASTER-BLUEPRINT.md` in the project root.

## Contingencies & Edge Cases
- **Context Limit Explosion:** If the project is so massive that synthesizing it exceeds agent token limits, automatically divide the Blueprint into a structured Wiki folder (e.g., `/docs/master/`) with an `index.md` mapping the connections, rather than forcing a single file.
- **Missing Foundations:** If instructed to synthesize but there are no Business Rules or Data Models generated yet, physically halt and revert the Orchestrator back to the Smart Document Analyzer or Database Design phases.

## Specifications
- **Standard:** Inspired by Domain-Driven Design (DDD) Ubiquitous Language mappings and ISO/IEC/IEEE 42010.
- **Format:** Generates a highly structured, long-form Markdown file (`MASTER-BLUEPRINT.md`) with a strong table of contents.
