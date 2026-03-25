---
title: Rate Limits
sidebar_position: 2
---

# Rate Limits

The ThinkEngine API enforces rate limits to ensure fair usage and platform stability.

## Default Limits

| Limit | Value |
|---|---|
| Requests per window | 600 |
| Window duration | 60 seconds |
| Scope | Per IP address |

## Rate Limit Response

When you exceed the rate limit, the API returns HTTP **429 Too Many Requests**.

**Response Headers:**

| Header | Description |
|---|---|
| `Retry-After` | Number of seconds to wait before retrying |

**Example Response:**

```
HTTP/1.1 429 Too Many Requests
Content-Type: text/plain
Retry-After: 60

Too Many Requests
```

## Best Practices

- **Implement exponential backoff.** When you receive a 429 response, wait for the duration specified in the `Retry-After` header before retrying.
- **Cache responses.** For endpoints like `/api/models` or `/api/status` that change infrequently, cache the response locally to reduce API calls.
- **Batch operations where possible.** Submit multiple items in a single request rather than making many individual requests.

## Tier-Based Quotas

In addition to the per-IP rate limit, your subscription tier determines monthly usage quotas. If you exceed your tier quota, the API returns HTTP **429** with a JSON body:

```json
{
  "error": "monthly quota exceeded",
  "upgrade_url": "/settings/billing"
}
```

See [Billing](/docs/api/billing) for tier details.
