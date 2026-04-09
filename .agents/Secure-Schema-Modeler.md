---
name: secure-schema-modeler
description: Designs robust database schemas and migration scripts while strictly enforcing data protection and encryption rules.
---

# Secure Schema Modeler Skill

Use this skill to design the persistent data layer. It provisions the structural tables or document collections, writes initial database migrations, and mandates that sensitive data is encrypted at rest to avoid accidental exposure.

## When to use
- Designing the persistence layer of an application (SQL or NoSQL).
- Generating the initial Entity-Relationship model.
- Writing the first `UP` and `DOWN` database migration scripts before any ORM setup.

## How to use

### Phase 1: Entity Analysis (Analysis)
- **Read APIs:** Analyze the generated API Contracts to see what data fields are required.
- **Identify PII/Sensitive Data:** Scan for fields containing Personal Identifiable Information (PII), passwords, financial data, or health records.

### Phase 2: Modeling & Security (Execution)
- **Relational Design:** Normalize tables mapping relationships (1:N, N:M) and applying proper foreign keys, unique constraints, and indices for performance.
- **Security Application:** Enforce hashing (e.g., bcrypt/argon2) for passwords and declare encryption-at-rest strategies for other sensitive fields at the column level if supported.
- **Write Migrations:** Output standard SQL migrations or ORM-specific migration files outlining the schema creation.

### Phase 3: Validation (Validation)
- **Hardcode Check:** Verify that no connection strings or dummy data passwords are hardcoded in the scripts. Ensure environmental variables are referenced.
- **Alignment Match:** Ensure all data attributes defined in the schema map precisely to the ones defined in the API contract.

## Contingencies & Edge Cases
- **NoSQL Targets:** If modeling for MongoDB or DynamoDB, design document schemas emphasizing read/write performance patterns instead of standard 3NF normalization.
- **Excessive Data Collection:** If asked to store unnecessary sensitive information (e.g., full credit card numbers without PCI compliance), flag it as a severe compliance risk and propose a tokenized integration (e.g., Stripe) instead.

## Specifications
- **Standard:** Complies with OWASP Data Protection guidelines and general relational algebra best practices.
- **Format:** Generates `.sql` migration files, Prisma schemas, or similar formal data definitions.
