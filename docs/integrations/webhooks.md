---
sidebar_position: 3
title: Webhooks
description: Custom webhook integration
---

# Webhooks

Webhooks let you receive real-time notifications from ThinkEngine whenever key events occur. Use them to integrate ThinkEngine with your existing tools, trigger downstream workflows, or build custom dashboards.

## Overview

When you configure a webhook, ThinkEngine sends an HTTP POST request to your specified URL every time a subscribed event occurs. The request body contains a JSON payload describing the event.

## Setting Up a Webhook

1. Go to **Settings > Integrations > Webhooks**.
2. Click **+ Add Webhook**.
3. Enter the **endpoint URL** -- the HTTPS URL where ThinkEngine should send events.
4. Select the **event types** you want to subscribe to.
5. Optionally add a **description** for your reference.
6. Click **Create**.

ThinkEngine generates a **signing secret** for your webhook. Copy and store it securely -- you will use it to verify that incoming requests are authentic.

## Event Types

Subscribe to any combination of the following events:

| Event | Trigger |
|---|---|
| `task.completed` | A task finished successfully. |
| `task.failed` | A task failed during execution. |
| `alert.created` | A new security alert was generated. |
| `alert.resolved` | A security alert was resolved. |
| `incident.created` | A new incident was opened. |
| `incident.updated` | An incident's status or details changed. |
| `incident.closed` | An incident was closed. |
| `scan.completed` | A code security scan finished. |
| `sentinel.alert` | A Sentinel agent forwarded a new detection. |
| `grc.nonconformity.created` | A new compliance nonconformity was identified. |

## Payload Format

Every webhook delivery is a JSON POST with the following structure:

```json
{
  "id": "evt_abc123def456",
  "type": "task.completed",
  "timestamp": "2025-01-15T14:30:00Z",
  "data": {
    "task_id": "tsk_789xyz",
    "title": "Fix authentication timeout",
    "status": "completed",
    "result_url": "https://thinkengine.io/tasks/tsk_789xyz",
    "duration_seconds": 142
  }
}
```

The `data` object varies by event type. Each event type's schema is documented in the webhook detail page within the dashboard.

### Headers

Every webhook request includes the following headers:

| Header | Description |
|---|---|
| `Content-Type` | `application/json` |
| `X-ThinkEngine-Event` | The event type (e.g., `task.completed`). |
| `X-ThinkEngine-Delivery` | A unique ID for this delivery attempt. |
| `X-ThinkEngine-Signature` | HMAC-SHA256 signature for payload verification. |
| `X-ThinkEngine-Timestamp` | Unix timestamp of when the event was sent. |

## Verifying Webhook Signatures

To confirm that a webhook request is genuinely from ThinkEngine, verify the `X-ThinkEngine-Signature` header using your signing secret:

1. Concatenate the timestamp and the raw request body: `{timestamp}.{body}`
2. Compute an HMAC-SHA256 hash using your signing secret as the key.
3. Compare the result with the value in `X-ThinkEngine-Signature`.

Example (Python):

```python
import hmac
import hashlib

def verify_signature(payload_body, timestamp, signature, secret):
    message = f"{timestamp}.{payload_body}"
    expected = hmac.new(
        secret.encode(),
        message.encode(),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, signature)
```

Always use a constant-time comparison to prevent timing attacks.

## Retry Behavior

If your endpoint returns a non-2xx status code or does not respond within 10 seconds, ThinkEngine retries the delivery:

| Attempt | Delay |
|---|---|
| 1st retry | 1 minute |
| 2nd retry | 5 minutes |
| 3rd retry | 30 minutes |
| 4th retry | 2 hours |
| 5th retry | 12 hours |

After 5 failed retries, the delivery is marked as failed. You can view and manually retry failed deliveries from the webhook detail page in the dashboard.

## Managing Webhooks

From **Settings > Integrations > Webhooks** you can:

- **View delivery history** -- See recent deliveries with status codes and response times.
- **Retry failed deliveries** -- Manually trigger a re-delivery for any failed attempt.
- **Edit subscriptions** -- Add or remove event types.
- **Rotate signing secret** -- Generate a new signing secret (the old one is immediately invalidated).
- **Disable or delete** -- Pause deliveries without deleting the webhook, or remove it entirely.

## Next Steps

- [GitHub Integration](/integrations/github) -- Automate issue-to-PR workflows.
- [Slack Integration](/integrations/slack) -- Get notifications in Slack.
- [API Reference](/api/authentication) -- Build deeper integrations with the REST API.
