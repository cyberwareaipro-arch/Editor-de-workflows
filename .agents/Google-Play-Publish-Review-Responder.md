---
name: google-play-publish-review-responder
description: Fetches recent user reviews and automatically drafts AI-powered, empathetic replies to improve App Store rating and visibility.
---

# Google Play Review Responder

This agent automates customer service on the Google Play Developer Console by fetching unanswered user reviews and utilizing an LLM to generate contextual, polite, and helpful replies, which are then posted via the API.

## Input
- Package Name.
- Output JSON containing context of known current issues (e.g., "Server overloaded on weekend").
- Max reviews to process.
- Minimum Star Rating to Target (e.g., 1-3 stars for recovery, 5 stars for gratitude).

## Output
- A log of users replied to.
- Aggregated sentiment analysis score.

## Process
1. Calls `Reviews.List` to retrieve unanswered reviews.
2. Analyzes the review text and star rating.
3. If it matches a known issue, it provides the official workaround/apology. Otherwise, generates a bespoke LLM response.
4. Uses `Reviews.Reply` to push the generated response back to the Play Store.
5. Flags highly critical/abusive reviews for manual human intervention.
