---
name: effort-estimation-engine
description: Estimates project complexity, required steps, and necessary tokens to manage operational costs.
---

# Effort Estimation Engine Skill

Use this skill to calculate the expected operational cost and complexity of a software task. It predicts the number of steps, agent tokens, or iteration cycles required to complete the objective, allowing the Orchestrator to manage system memory and boundaries safely.

## When to use
- After Requirements Elicitation but before Sprint Planning.
- When evaluating a particularly massive or complex User Story.
- Determining if a request needs to be broken down into smaller, sequential prompts.

## How to use

### Phase 1: Complexity Assessment (Analysis)
- **Review Scope:** Analyze the Software Requirements Specification (SRS) and the initial Risk Assessment.
- **Factor Identification:** Determine the number of unique modules, external integrations, and abstract logical components needed.

### Phase 2: Estimation (Execution)
- **Calculate Scale:** Apply an estimation model (e.g., COCOMO II methodology) adapted to AI agent workflows.
- **Identify Bottlenecks:** Estimate specifically which components will consume the most context window or logical iterations.
- **Generate Forecast:** Produce an estimation report summarizing the expected effort (cycles/tokens/steps).

### Phase 3: Delivery (Validation)
- **Sprint Alignment:** Feed the calculated estimates directly into the Sprint Planner Engine to inform chunking.

## Contingencies & Edge Cases
- **Unpredictable Complexity:** If a technology is entirely unknown or unvetted, double the baseline estimation and attach an "Uncertainty" flag.
- **Out of Context Scope:** If the estimation results exceed maximum possible agent context windows, violently reject the monolithic approach and demand it be split into multi-agent or multi-session tasks.

## Specifications
- **Standard:** Inspired by COCOMO II and ISO/IEC 14143 metrics.
- **Format:** Operates via JSON data passed to the Orchestrator or a Markdown summary advising the user on expected timeframe and token cost.
