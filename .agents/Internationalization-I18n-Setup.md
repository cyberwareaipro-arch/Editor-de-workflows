---
name: internationalization-i18n-setup
description: Bootstraps multi-language support, ensuring no hardcoded text or localized formats exist in the initial UI.
---

# Internationalization I18n Setup Skill

Use this skill from day one to ensure the software UI and backend messages can be instantly translated. It extracts all plain text into dictionary files, configuring libraries to handle dynamic language switching, currency formatting, and time zones safely.

## When to use
- Setting up the initial frontend framework scaffolding.
- Refactoring legacy code that has hardcoded English/Spanish strings in HTML.
- Implementing email templates or notification engines.

## How to use

### Phase 1: Context Recognition (Analysis)
- **Tech Ecosystem:** Identify the frontend (e.g., React `react-i18next`, Vue `vue-i18n`) and backend (e.g., Python `gettext`, Java `ResourceBundle`) frameworks in use.
- **String Harvest:** Scan the specific user story or provided wireframes for all required readable text strings, status messages, and formatting needs (Dates, Currencies).

### Phase 2: I18n Integration (Execution)
- **Dictionary Creation:** Produce initial JSON/YAML files (e.g., `en.json`, `es.json`) cataloging the extracted strings logically by component.
- **Code Injection:** Replace all plain text in the source code with the appropriate translation function keys (e.g., `t('auth.login.button')`).
- **Format Standardization:** Enforce library-based formatting for numbers and dates, explicitly forbidding hardcoded `$`, `€`, or `MM/DD/YYYY` structures.

### Phase 3: Validation (Validation)
- **Completeness Check:** Verify that changing the global locale variable successfully changes the output text.
- **Fallbacks:** Ensure english/default language keys act as safe fallbacks if the requested locale is missing a string.

## Contingencies & Edge Cases
- **RTL Languages:** If asked to support Right-To-Left (e.g., Arabic, Hebrew), inject structural HTML dir="rtl" attributes and CSS logical properties.
- **Pluralization Rules:** Ensure the chosen dictionary system supports dynamic pluralization logic natively, avoiding complex nested conditionals in the frontend code.

## Specifications
- **Standard:** Complies with W3C I18n (Internationalization) standards and Unicode formatting syntax.
- **Format:** Generates dictionary files (`.json`, `.yaml`, `.po`) and modifies frontend code files.
