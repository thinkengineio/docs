---
sidebar_position: 8
title: Billing & Usage
description: Subscription tiers and usage tracking
---

# Billing & Usage

The Billing section provides visibility into your subscription, usage, and costs so you always know what you are spending and why.

## Subscription Tiers

ThinkEngine offers tiered subscriptions to match your team's needs:

| Feature | Free | Pro | Enterprise |
|---|---|---|---|
| AI tasks per month | 10 | 500 | Unlimited |
| Sentinel agents | 1 | 25 | Unlimited |
| Code security scans | 5 repos | 50 repos | Unlimited |
| SOC alert retention | 7 days | 90 days | 1 year+ |
| GRC frameworks | 1 | 5 | Unlimited |
| MITRE ATT&CK coverage map | View only | Full | Full |
| Integrations (GitHub, Slack) | 1 each | Unlimited | Unlimited |
| Support | Community | Email | Dedicated |
| SSO | -- | -- | SAML / OIDC |

To view or change your current tier, go to **Settings > Billing**.

## Usage Dashboard

The usage dashboard shows your consumption for the current billing period:

- **AI tasks** -- Number of tasks submitted and completed.
- **Sentinel agents** -- Active agents reporting to the platform.
- **Code security scans** -- Repositories scanned and total findings.
- **API calls** -- Total API requests made.
- **Model usage** -- Token consumption broken down by AI model.

Usage resets at the start of each billing cycle.

## Cost Breakdown

The cost breakdown view shows spending by category:

- **AI tasks** -- Cost per task based on model usage and token consumption.
- **Scanning** -- Code security and Sentinel scan costs.
- **Storage** -- Evidence storage, alert retention, and log archival.
- **Overages** -- Any usage exceeding your tier's included allowances.

Click any category to drill down into individual line items.

## Invoices

Past invoices are available under **Billing > Invoices**:

- View or download invoices as PDF.
- See payment status (paid, pending, overdue).
- Access receipts for completed payments.

Invoices are generated at the end of each billing cycle and emailed to the billing contact on file.

## Managing Your Subscription

From **Settings > Billing** you can:

- **Upgrade or downgrade** your tier.
- **Update payment method** -- Add or change your credit card or billing details.
- **Update billing contact** -- Change who receives invoices and payment notifications.
- **Cancel subscription** -- Downgrade to the Free tier at the end of the current billing period.

## API Access

Usage and billing data can be retrieved programmatically. See the [Billing API](/api/billing) for endpoint details.

## Next Steps

- [Dashboard](/platform/dashboard) -- Return to the main dashboard.
- [Tasks](/platform/tasks) -- Submit AI-powered tasks.
- [Billing API](/api/billing) -- Automate billing queries.
