---
title: Billing
sidebar_position: 13
---

# Billing

The Billing API exposes the org's current subscription tier, AI request quota, storage usage, and historical consumption. Quotas are billed **per organization**, not per user — every endpoint reads the org-level counter, so all members of an org see the same numbers.

## Endpoints

### `GET /api/tier`

Get the current subscription tier, AI request quota, storage usage, and feature set for the authenticated user's organization.

**Authentication:** Bearer token + `X-Auth-Org-Id` header.

**Example Request:**

```bash
curl https://api.thinkengine.io/api/tier \
  -H "Authorization: Bearer <token>" \
  -H "X-Auth-Org-Id: <org_id>"
```

**Example Response (Pro org):**

```json
{
  "user_id": "alice@example.com",
  "tier": "pro",
  "tier_label": "Pro",
  "price_usd": 79,
  "security_enabled": false,
  "plan_selected": true,
  "usage": {
    "requests": 142,
    "requests_limit": 500,
    "requests_remaining": 358,
    "premium_requests": 0,
    "premium_requests_limit": 0
  },
  "storage_used_bytes": 739493,
  "storage_limit_bytes": 10737418240,
  "storage_pct": 0.0069,
  "storage_overage_bytes": 0,
  "storage_breakdown": {
    "postgres": 412005,
    "encrypted": 327488,
    "blobs": 0
  },
  "storage_last_updated": "2026-04-08T03:21:06Z",
  "features": [
    "analytics", "chat", "cloud_integrations", "code_security",
    "cve_intel", "dashboard", "endpoints", "findings",
    "profile", "remediation", "sentinel", "soc"
  ],
  "available_tiers": {
    "free":     {"label": "Free",     "price_usd": 0,   "requests_per_month": 200,  "storage_gb": 1},
    "pro":      {"label": "Pro",      "price_usd": 79,  "requests_per_month": 500,  "storage_gb": 10},
    "business": {"label": "Pro Max",  "price_usd": 129, "requests_per_month": 1200, "storage_gb": 25},
    "internal": {"label": "Enterprise","price_usd": 0,  "requests_per_month": 2000, "storage_gb": 999}
  },
  "created_at": 1775525112.97,
  "updated_at": 1775613469.66
}
```

#### Response fields

| Field | Type | Description |
|---|---|---|
| `tier` | string | One of `free`, `pro`, `business` (Pro Max), `internal` (Enterprise) |
| `tier_label` | string | Human-readable label for the tier |
| `price_usd` | number | Monthly base price for this tier |
| `usage.requests` | integer | AI requests used this month (org-level counter) |
| `usage.requests_limit` | integer | Included monthly quota for the current tier |
| `usage.requests_remaining` | integer | `max(0, requests_limit - requests)` |
| `storage_used_bytes` | integer | Total storage used by the org across postgres + encrypted + blob stores |
| `storage_limit_bytes` | integer | Storage cap for the current tier |
| `storage_pct` | number | `storage_used_bytes / storage_limit_bytes`, 0.0–1.0 |
| `storage_breakdown` | object | Per-source byte counts (postgres / encrypted / blobs) |
| `features` | array | List of feature flags this tier has access to |
| `available_tiers` | object | All tier options for upgrade comparison |

> **Note:** `premium_requests` and `premium_requests_limit` are pinned to `0` across all tiers. The legacy "premium request" concept (separate counter for Sonnet/Opus calls) was collapsed into a single unified counter on 2026-04-08. The fields are kept on the response for backward compatibility but no longer accumulate.

---

### `GET /api/tier/usage-history`

Get the org's monthly AI request usage history for the last 6 months.

**Authentication:** Bearer token + `X-Auth-Org-Id` header.

**Example Request:**

```bash
curl https://api.thinkengine.io/api/tier/usage-history \
  -H "Authorization: Bearer <token>" \
  -H "X-Auth-Org-Id: <org_id>"
```

**Example Response:**

```json
{
  "tier": "pro",
  "months": [
    {"month": "2026-04", "requests": 142, "requests_limit": 500},
    {"month": "2026-03", "requests": 487, "requests_limit": 500},
    {"month": "2026-02", "requests": 312, "requests_limit": 500},
    {"month": "2026-01", "requests": 198, "requests_limit": 500},
    {"month": "2025-12", "requests": 0,   "requests_limit": 500},
    {"month": "2025-11", "requests": 0,   "requests_limit": 500}
  ]
}
```

---

### `GET /api/tier/invoices`

List Stripe invoices for the org. Includes both base subscription invoices and metered overage line items (AI requests, storage).

**Authentication:** Bearer token + `X-Auth-Org-Id` header.

**Example Request:**

```bash
curl https://api.thinkengine.io/api/tier/invoices \
  -H "Authorization: Bearer <token>" \
  -H "X-Auth-Org-Id: <org_id>"
```

**Example Response:**

```json
{
  "invoices": [
    {
      "id": "in_1ABC...",
      "month": "2026-03",
      "tier": "pro",
      "amount_usd": 84.60,
      "base_usd": 79.00,
      "overage_request_count": 112,
      "overage_request_usd": 5.60,
      "overage_storage_gb": 0,
      "overage_storage_usd": 0.00,
      "status": "paid",
      "hosted_invoice_url": "https://invoice.stripe.com/i/...",
      "pdf_url": "https://files.stripe.com/...invoice.pdf"
    },
    {
      "id": "in_1DEF...",
      "month": "2026-02",
      "tier": "pro",
      "amount_usd": 79.00,
      "base_usd": 79.00,
      "overage_request_count": 0,
      "overage_request_usd": 0.00,
      "status": "paid",
      "hosted_invoice_url": "https://invoice.stripe.com/i/...",
      "pdf_url": "https://files.stripe.com/...invoice.pdf"
    }
  ]
}
```

#### Invoice fields

| Field | Type | Description |
|---|---|---|
| `id` | string | Stripe invoice ID |
| `month` | string | Billing month in `YYYY-MM` format |
| `tier` | string | Subscription tier active during this period |
| `amount_usd` | number | Total invoiced (base + overage) |
| `base_usd` | number | Base subscription price |
| `overage_request_count` | integer | Number of over-quota AI requests billed this period |
| `overage_request_usd` | number | Total request overage charge |
| `overage_storage_gb` | number | GB-months of storage over the cap |
| `overage_storage_usd` | number | Total storage overage charge |
| `status` | string | `draft`, `open`, `paid`, `void`, `uncollectible` |
| `hosted_invoice_url` | string | Stripe-hosted invoice page |
| `pdf_url` | string | Direct PDF download |

---

## Quota enforcement

When an org reaches its monthly AI request quota:

| Tier | Behavior | HTTP response on `POST /api/chat` |
|---|---|---|
| **Free** | Hard block | `402 Payment Required` with `{"error": "request_quota_exhausted", "upgrade_url": "/plans?tab=billing", ...}` |
| **Pro** | Metered overage at $0.05/req — request proceeds | `200 OK` (counter still increments, Stripe meter event posted asynchronously) |
| **Pro Max** | Metered overage at $0.04/req — request proceeds | `200 OK` |
| **Enterprise** | No enforcement (visibility only) | `200 OK` |

For details on the chat endpoint itself, see the [Errors](/api/errors) page.
