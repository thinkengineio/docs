---
title: Billing
sidebar_position: 15
---

# Billing

The Billing API provides access to subscription tier information, usage history, and invoices.

## Endpoints

### `GET /api/tier`

Get the current subscription tier and usage information for the authenticated user.

**Authentication:** Bearer token required

**Example Request:**

```bash
curl https://thinkengine.io/api/tier \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "tier": "pro",
  "security_enabled": true,
  "requests_used": 142,
  "requests_limit": 5000,
  "premium_requests_used": 28,
  "premium_requests_limit": 500,
  "features": {
    "code_scanning": true,
    "security_analytics": true,
    "sentinel_agents": true,
    "grc_management": true,
    "priority_support": true
  }
}
```

---

### `GET /api/tier/usage-history`

Get monthly usage history for the last 6 months.

**Authentication:** Bearer token required

**Example Request:**

```bash
curl https://thinkengine.io/api/tier/usage-history \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "months": [
    {
      "month": "2026-03",
      "requests": 142,
      "premium_requests": 28,
      "requests_limit": 5000,
      "premium_limit": 500
    },
    {
      "month": "2026-02",
      "requests": 310,
      "premium_requests": 45,
      "requests_limit": 5000,
      "premium_limit": 500
    }
  ],
  "tier": "pro"
}
```

---

### `GET /api/tier/invoices`

List invoices for the last 6 months. Invoices are generated for months with usage or an active paid subscription.

**Authentication:** Bearer token required

**Example Request:**

```bash
curl https://thinkengine.io/api/tier/invoices \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "invoices": [
    {
      "id": "INV-2026-03-a1b2c3d4",
      "month": "2026-03",
      "tier": "pro",
      "amount_usd": 49.00,
      "requests": 142,
      "status": "current"
    },
    {
      "id": "INV-2026-02-a1b2c3d4",
      "month": "2026-02",
      "tier": "pro",
      "amount_usd": 49.00,
      "requests": 310,
      "status": "paid"
    }
  ]
}
```

### Invoice Fields

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique invoice identifier |
| `month` | string | Billing month in `YYYY-MM` format |
| `tier` | string | Subscription tier for this period |
| `amount_usd` | number | Amount in USD |
| `requests` | integer | Total requests during the billing period |
| `status` | string | `current` for the active month, `paid` for past months |
