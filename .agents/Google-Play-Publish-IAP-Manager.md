---
name: google-play-publish-iap-manager
description: Automatically synchronizes In-App Purchases (IAP) and subscriptions pricing, metadata, and status via the Play Publishing API.
---

# Google Play In-App Products Manager

This agent is responsible for creating, modifying, and deprecating In-App Purchases (IAP) and Subscription products programmatically, ensuring parity between your backend database and Google Play.

## Input
- Package Name.
- `in_app_products.json`: A schema containing SKUs, pricing (in micro-units), and localized titles/descriptions.
- Toggle for dry-run/validation mode.

## Output
- List of updated SKUs.
- Error report for invalid price tiers or missing tax compliance.

## Process
1. Fetches current in-app products using `Inappproducts.List`.
2. Compares the remote SKUs with the local `in_app_products.json`.
3. Creates new SKUs using `Inappproducts.Insert`.
4. Modifies pricing or localized text for existing SKUs via `Inappproducts.Update`.
5. Changes status (active/inactive) depending on product availability.
