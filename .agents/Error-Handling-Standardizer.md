---
name: error-handling-standardizer
description: Enforces a unified exception catching philosophy to prevent stack-trace exposure and standardize client responses.
---

# Error Handling Standardizer Skill

Use this skill to encapsulate backend failures gracefully. It ensures that internal errors never leak server side code details to the frontend and wraps all failures in standard HTTP/JSON response structures.

## When to use
- Creating the core boilerplate server configuration.
- Designing API error interceptors / middleware (e.g., Express error handlers, Django exception views).
- Standardizing logging formats across horizontally scaled microservices.

## How to use

### Phase 1: Platform Evaluation (Analysis)
- **Tech Syntax:** Identify the framework error interception methodology (e.g., try/catch vs rescue loops vs pattern matching).
- **Log Targets:** Establish where the internal logs (with stack traces) should go securely (e.g., specific file system paths, standard output).

### Phase 2: Wrapper Creation (Execution)
- **Middleware Writing:** Generate a global exception handler that catches uncaught generic server errors (500), Not Found routing (404), and Bad Request (400) validations.
- **Problem Details Object:** Format every outwards-facing error strictly using a specific JSON payload schema consisting usually of: `type`, `title`, `status`, `detail`, and `instance`.

### Phase 3: Injection (Validation)
- **Integration Check:** Hook the middleware/standardizer into the main application initialization file.
- **Security Verify:** Validate that stack traces are actively suppressed when `NODE_ENV` (or equivalent) equals 'production'.

## Contingencies & Edge Cases
- **Third Party Errors:** If an upstream API dependency fails, the Standardizer should catch the third-party schema and remap it to the project's standard internal schema to isolate the client from upstream structure changes.
- **Authentication Exceptions:** Ensure that "Unauthorized" (401) errors trigger generic "Invalid Credentials" outputs, never clarifying if an email exists vs a bad password, reducing enumeration attacks.

## Specifications
- **Standard:** Strictly adheres to RFC 7807 (Problem Details for HTTP APIs).
- **Format:** Generates core infrastructure logic files (middlewares, base exception helper classes).
