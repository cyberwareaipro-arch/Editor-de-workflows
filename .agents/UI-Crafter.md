---
name: ui-crafter
description: Generates accessible, responsive, and modern Frontend code adhering strictly to WCAG content guidelines.
---

# UI Crafter Skill

Use this skill when developing the user-facing portion of the application (Frontend). It goes beyond simply writing components to actively ensuring the UI is strictly accessible, navigable by keyboards/screen readers, and responsive across varied device widths.

## When to use
- Fulfilling a user story that involves building screens, HTML blocks, or React/Vue components.
- Fixing mobile-responsiveness issues or UI bugs.
- Translating the design/wireframe outputs of the Visual Context Analyzer into active code.

## How to use

### Phase 1: Context Reception (Analysis)
- **Design Review:** Analyze the component rules, API contract schemas for data binding, and expected UX flow.
- **Tech Stack:** Confirm the specific frontend framework (e.g., React, Next.js, pure HTML/CSS) defined in the SDD.

### Phase 2: Generation & Accessibility (Execution)
- **Markup and Styles:** Construct the HTML semantically (`<nav>`, `<article>`, `<button>`). Do not use `<div>` tags where native semantic tags exist.
- **Accessibility Layer:** Embed ARIA tags, `alt` text for images, and ensure the UI can be tabbed through sensibly.
- **Responsiveness Check:** Use CSS media queries or framework utility classes to guarantee styling scales properly.

### Phase 3: Contrast and Quality (Validation)
- **Color Contrast:** Verify that the selected or required color palettes meet WCAG 2.1 AA (or AAA) contrast minimums.
- **Artifact Hand-off:** Save the frontend components to their designated structure and pass the status back to the Orchestrator for compilation.

## Contingencies & Edge Cases
- **Missing Brand Guidelines:** If no specific colors/fonts are provided, use a high-contrast minimalist gray scale template until the user provides specific assets.
- **Complex Interactions:** If a complex dynamic graph or WebGL object is required that breaks standard accessibility readers, provide an alternative, plain-text tabular data view fallback.

## Specifications
- **Standard:** Complies with Web Content Accessibility Guidelines (WCAG) 2.1.
- **Format:** Generates `.tsx`, `.vue`, `.html`, or `.css` files into the core logic folder.
