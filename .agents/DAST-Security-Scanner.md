---
name: dast-security-scanner
description: Executes Dynamic Application Security Testing (DAST) by bombarding live local endpoints with simulated attacks.
---

# DAST Security Scanner Skill

Use this skill to practically verify the theoretical security designed earlier. Instead of reading code statically, this skill spins up the application locally and acts like an automated attacker, throwing SQL injections, XSS payloads, and malformed data at the live API endpoints to see if it breaks.

## When to use
- Towards the end of the Sprint cycle, after all unit/integration tests conform to green.
- Pre-deployment validation of major secure domains (Auth, Payments).
- When validating if Security mitigations proposed in the Risk Analysis actually work.

## How to use

### Phase 1: Recon & Startup (Analysis)
- **Start Environment:** Execute the necessary commands (e.g., `docker-compose up`, `npm run dev`) to spin the application up in an isolated local environment.
- **Load Targets:** Ingest the OpenAPI/Swagger schemas to understand what routes and parameters are available for fuzzing.

### Phase 2: Simulated Attack (Execution)
- **Fuzzing Inputs:** Send extreme length strings, special characters, and known SQL injection payloads (e.g., `' OR 1=1 --`) to query parameters and JSON bodies.
- **Method Tampering:** Attempt to send `POST` requests to `GET` endpoints, or omit required Authentication headers to test the 401/403 barrier.
- **Payload Execution:** If available, run specialized CLI tools (like OWASP ZAP headless or comparable scripts) against the local port.

### Phase 3: Intrusion Reporting (Validation)
- **Evaluate Logs:** Monitor the terminal output and response codes. A 500 Server Error implies a successful break/unhandled exception. A 400 or 401 implies the system successfully deflected the attack.
- **Generate Report:** If an attack succeeds, generate a Critical severity Test Incident Report and hand it to the Autonomous Healer/Refactor Engine.

## Contingencies & Edge Cases
- **Live Environments:** NEVER point the DAST scanner at a production URL. It must only ever operate on `localhost` or explicitly designated staging sandboxes.
- **Rate Limiting:** If local application rate limiting blocks the scanner, momentarily disable rate limiting via `.env` adjustments to allow full payload execution, then re-enable after.

## Specifications
- **Standard:** Follows OWASP ZAP dynamic testing principles and ISO/IEC 27034.
- **Format:** Executes HTTP requests / scripts against localhost and monitors server logs.
