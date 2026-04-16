---
name: google-play-publish-metrics-analyzer
description: Monitors post-release Vitals (Crash rates, ANRs) and halts automated staged rollouts if instability is detected.
---

# Google Play Metrics & Vitals Analyzer

This agent ensures a safe CI/CD deployment pipeline by functioning as a circuit breaker. During a staged rollout (e.g., 20% of users), it queries the Play Developer Reporting API to monitor app vitals. If crash rates spike, it automatically pauses the rollout.

## Input
- Package Name.
- Current active `versionCode`.
- Thresholds (e.g., `max_crash_rate = 0.5%`, `max_anr_rate = 0.4%`).

## Output
- Health Status (`HEALTHY`, `WARNING`, `CRITICAL`).
- In case of `CRITICAL`, alerts and halts the rollout.

## Process
1. Connects to the Google Play Developer Reporting API.
2. Queries the `Vitals` endpoints for the specific `versionCode` in the last 24-48 hours.
3. Compares the retrieved Crash and ANR (Application Not Responding) rates against the defined safety thresholds.
4. If thresholds are exceeded, it dynamically triggers an `Edits.Tracks.Update` to change the Release status to `halted`.
5. Emits an emergency webhook/notification to the Dev Team to investigate.
