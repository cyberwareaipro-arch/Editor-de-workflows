---
name: concurrency-safe-coder
description: Specializes in generating thread-safe asynchronous operations and atomic database transactions.
---

# Concurrency Safe Coder Skill

Use this skill when implementing high-throughput systems, background job workers, or financial logic. It designs operations that handle simultaneous events properly, ensuring that Race Conditions and Deadlocks are physically impossible in the written code.

## When to use
- Writing logic for shopping carts, inventory reductions, or digital wallets.
- Implementing asynchronous event listeners, webhooks, or queue workers (e.g., Celery, RabbitMQ).
- Generating heavy multi-threaded or multi-process computational scripts.

## How to use

### Phase 1: Bottleneck Analysis (Analysis)
- **Identify Shared State:** Locate variables, memory blocks, or database rows that multiple asynchronous processes might attempt to write simultaneously.
- **Transaction Needs:** Determine if the process requires ACID (Atomicity, Consistency, Isolation, Durability) guarantees.

### Phase 2: Safe Implementation (Execution)
- **Database Locks:** Write queries using pessimistic locking (`SELECT ... FOR UPDATE`) or optimistic locking with version vectors, depending on the architecture.
- **Mutexes/Semaphores:** For in-memory logic, wrap shared resource mutations with standard POSIX-compliant thread locks.
- **Idempotency:** Force asynchronous webhook handlers and retry-loops to be strictly idempotent, logging execution keys to prevent double-processing.

### Phase 3: Edge Case Testing (Validation)
- **Handoff for Stress:** Explicitly tag the created files for the Master Test Planner to require aggressive concurrent stress testing.

## Contingencies & Edge Cases
- **Language Limitations:** If the language is single-threaded (e.g., Node.js), ensure concurrency safety at the database and memory-store (Redis/Memcached) levels rather than thread levels.
- **Deadlock Potential:** Refuse to write routines that lock multiple resources in unpredictable orders. Always enforce a strict, hierarchical locking order.

## Specifications
- **Standard:** POSIX Threading best practices, ACID Database principles.
- **Format:** Generates native code files injected with transaction blocks or async-await guards.
