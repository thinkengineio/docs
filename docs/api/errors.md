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
curl -X POST https://thinkengine.io/api/tasks \
  -H "Authorization: Bearer <token>" \
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
curl -X POST https://thinkengine.io/api/tasks \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"mode": "plan"}'
```

```json
{
  "error": "goal is required"
}
```

### Resource Not Found

```bash
curl https://thinkengine.io/api/tasks/nonexistent-id \
  -H "Authorization: Bearer <token>"
```

```json
{
  "error": "not found"
}
```

### Authentication Failure

```bash
curl https://thinkengine.io/api/tasks
```

```
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer realm="sofia"

Unauthorized
```
