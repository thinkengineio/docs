---
sidebar_position: 8
title: Billing & Usage
description: Subscription tiers, AI request quotas, storage limits, and metered overage
---

# Billing & Usage

ThinkEngine bills per **organization**, not per user. One subscription covers every member of your org. Quotas reset on the first of each month.

## Subscription Tiers

| Tier | Price | AI requests / month | Agents | Storage | Overage rate |
|---|---|---|---|---|---|
| **Free** | $0 | 200 (hard cap) | 2 | 1 GB | — |
| **Pro** | $79 / mo | 500 included | 4 | 10 GB | $0.05 / request |
| **Pro Max** | $129 / mo | 1,200 included | 8 | 25 GB | $0.04 / request |
| **Enterprise** | Custom | 2,000+ | Custom | Custom | Custom contract |

To view or change your current tier, go to **Settings → Plans & Billing** or visit [/plans](https://thinkengine.io/plans).

## AI Request Metering

Every call to Sofia (chat, agent task, security analysis) costs **one AI request**, regardless of model. The counter increments per organization, not per user — two members of the same Pro org draw from the same 500/mo bucket.

### What happens at the cap

| Tier | At 80% | At 100% | Over 100% |
|---|---|---|---|
| **Free** | Email warning | **Hard block (HTTP 402)** — upgrade required to continue | n/a |
| **Pro** | Email warning | Email reaching cap | Each subsequent request bills at **$0.05** |
| **Pro Max** | Email warning | Email reaching cap | Each subsequent request bills at **$0.04** |
| **Enterprise** | n/a | n/a | Per contract |

### How overage shows up on your invoice

Pro and Pro Max overage is metered through **Stripe billing meters**. Each over-quota request immediately posts a `MeterEvent` to Stripe; at the end of the billing cycle Stripe rolls them up into a single line item on your invoice next to the base subscription price.

Example invoice for a Pro org that used 612 requests in a month:

```
ThinkEngine Pro                              $79.00
AI request overage  (112 × $0.05)            $5.60
─────────────────────────────────────────────────
Total                                        $84.60
```

## Storage Metering

Storage usage is computed across three sources and refreshed every 15 minutes:

- **Postgres tenant data** — your encrypted findings, incidents, GRC evidence, audit records
- **Encrypted blobs** — files attached to tasks, scan reports, screenshots
- **OCI Object Storage** — sentinel telemetry archives, large evidence bundles

### Storage caps and overage

| Tier | Included storage | Overage rate |
|---|---|---|
| Free | 1 GB | Hard block at cap — delete data or upgrade |
| Pro | 10 GB | $0.025 / GB / month over the cap |
| Pro Max | 25 GB | $0.025 / GB / month over the cap |
| Enterprise | Custom | Per contract |

You'll receive email warnings at **80%** and **100%** of your storage cap.

## The Plans Page

Visit [thinkengine.io/plans](https://thinkengine.io/plans) to:

- See your current plan, billing cycle, and next renewal date
- View this month's AI request count and storage usage
- Upgrade or downgrade your plan via Stripe Checkout
- Open the Stripe Customer Portal to manage payment method, download invoices, or cancel
- Access the Monthly Usage card showing AI request consumption with progress bars

## Upgrade & Downgrade

- **Upgrading** is immediate. Your tier changes the moment Stripe Checkout completes; the new quota is available on your next chat request.
- **Downgrading** takes effect at the end of your current billing cycle. You retain Pro/Pro Max features and quota until then.
- **Cancelling** is a downgrade to Free at the end of the cycle. Your data is retained but you'll be subject to the Free tier's 200 request and 1 GB storage caps.

## Email Notifications

ThinkEngine sends transactional billing emails to your organization's billing contact:

- **AI requests at 80% / 100% of monthly quota**
- **Storage at 80% / 100% of cap**
- **Overage receipts** at the end of each billing cycle (Pro / Pro Max only)
- **Failed payment** notifications from Stripe

You can change the billing contact email under **Settings → Plans & Billing → Billing Contact**.

## Programmatic Access

The current tier, usage counters, and remaining quota are available via the API. See the [Billing API](/api/billing) for endpoint details.

## Next Steps

- [Plans page](https://thinkengine.io/plans) — Manage your subscription
- [Billing API](/api/billing) — Programmatic access to tier and usage
- [Dashboard](/platform/dashboard) — Return to the platform overview
