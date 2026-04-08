---
title: Errors
sidebar_position: 3
---

# Errors

The ThinkEngine API uses standard HTTP status codes and returns errors in a consistent JSON format.

## Error Response Format

All error responses return a JSON object with an `error` field:

```json
{
  "error": "description of what went wrong"
}
```

Some error responses include additional context fields:

```json
{
  "error": "upgrade required",
  "required_tier": "pro",
  "feature": "security-analytics",
  "upgrade_url": "/settings/billing"
}
```

## HTTP Status Codes

| Status Code | Meaning | When It Occurs |
|---|---|---|
| **400** Bad Request | The request body is malformed, missing required fields, or contains invalid values. |
| **401** Unauthorized | No valid authentication token was provided. The response includes a `WWW-Authenticate` header. |
| **403** Forbidden | The authenticated user lacks permission for this action, or a tier upgrade is required. |
| **404** Not Found | The requested resource does not exist (e.g., invalid task ID, agent ID, or endpoint path). |
| **429** Too Many Requests | Rate limit exceeded. Check the `Retry-After` header and retry after the specified delay. |
| **500** Internal Server Error | An unexpected server error occurred. Retry the request after a brief delay. |

## Common Error Scenarios

### Invalid JSON Body

```bash
curl -X POST https://api.thinkengine.io/api/chat \
  -H "Authorization: Bearer <token>" \
  -H "X-Auth-Org-Id: <org_id>" \
  -H "Content-Type: application/json" \
  -d "not valid json"
```

```json
{
  "error": "invalid JSON"
}
```

### Missing Required Field

```bash
curl -X POST https://api.thinkengine.io/api/chat \
  -H "Authorization: Bearer <token>" \
  -H "X-Auth-Org-Id: <org_id>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

```json
{
  "error": "message is required"
}
```

### AI Request Quota Exhausted (Free tier)

When a Free-tier organization hits its monthly 200 request cap, `/api/chat` returns `402`:

```bash
curl -X POST https://api.thinkengine.io/api/chat \
  -H "Authorization: Bearer <token>" \
  -H "X-Auth-Org-Id: <org_id>" \
  -H "Content-Type: application/json" \
  -d '{"message": "hello"}'
```

```
HTTP/1.1 402 Payment Required
```

```json
{
  "error": "request_quota_exhausted",
  "tier": "free",
  "used": 200,
  "limit": 200,
  "upgrade_url": "/plans?tab=billing",
  "message": "Your organization has used its 200 included AI requests this month. Upgrade to Pro for 500 included requests plus metered overage at $0.05/request."
}
```

Pro and Pro Max orgs are not blocked at the cap — instead, each over-quota request bills at the metered overage rate ($0.05/req for Pro, $0.04/req for Pro Max). See [Billing](/api/billing) for details.

### Authentication Failure

```bash
curl https://api.thinkengine.io/api/tier
```

```
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer realm="sofia"

Unauthorized
```
