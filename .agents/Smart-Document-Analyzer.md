---
name: smart-document-analyzer
description: Performs deep NLP analysis on flat text/documents mapping them into actionable Business Rules and User Stories.
---

# Smart Document Analyzer Skill

Use this skill to intelligently read complex directories of text (PDFs, Word docs, CSV, TXT) to extract explicit and implicit functional requirements. It bypasses the need for the user to explain everything in a single prompt by converting flat domains into structured data.

## When to use
- Receiving a data dump or a folder path (e.g., `/docs_input`) from a user.
- The project prompt references external documentation that defines the business domain.
- When generating the initial Software Requirements Specification (SRS) from raw files.

## How to use

### Phase 1: Ingestion (Analysis)
- **Locate Files:** Identify and list all supported text/document files in the specified path.
- **Read & Parse:** Extract raw text from the documents systematically.

### Phase 2: Extraction (Execution)
- **NLP Filtering:** Actively scan the text to identify business logic ("if user creates account, then..."), numeric constraints ("must load in 2s"), and user roles.
- **Data Structuring:** Translate unstructured text blocks into strict rule lists.
- **Story Drafting:** Draft initial rough cuts of User Stories based on the discovered rules.

### Phase 3: Consolidation (Validation)
- **Merge Rules:** Eliminate duplicate rules found across multiple documents.
- **Artifact Hand-off:** Pass the structured rule-set and drafted stories to the Requirement Elicitation and Backlog Groomer skills.

## Contingencies & Edge Cases
- **Unreadable Formats:** If a file format is unsupported or encrypted, log a warning in the extraction summary and skip it gracefully.
- **Conflicting Rules:** If Doc A says "Admins only" and Doc B says "All Users", flag the contradiction explicitly so the system can ask the user for a resolution.
- **Massive Docs:** For exceptionally large texts, chunk the reads to prevent context limit explosion and maintain state.

## Specifications
- **Standard:** Aligns with ISO/IEC/IEEE 29148 Requirements Engineering practices utilizing NLP extraction methodologies.
- **Format:** Outputs extracted logic into an intermediate `extracted-rules.md` or JSON structure.
