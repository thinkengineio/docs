---
title: SOC (Security Operations Center)
sidebar_position: 8
---

# SOC (Security Operations Center)

The SOC API provides access to security events and alerts from your monitored infrastructure. Events are generated from Sentinel agent telemetry, correlation rules, and manual submissions.

## Endpoints

### `GET /api/soc/events`

Retrieve SOC events with summary statistics.

**Authentication:** Bearer token required

**Example Request:**

```bash
curl https://thinkengine.io/api/soc/events \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "events": [
    {
      "id": "evt-001",
      "timestamp": "2026-03-23T14:30:00Z",
      "severity": "critical",
      "source": "sentinel",
      "category": "intrusion",
      "description": "Unauthorized SSH login from external IP",
      "status": "open"
    }
  ],
  "stats": {
    "total": 150,
    "critical": 3,
    "open": 45,
    "resolved": 105
  }
}
```

---

### `POST /api/soc/events`

Create a new SOC event manually.

**Authentication:** Bearer token required

**Request Body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `severity` | string | No | Event severity: `critical`, `high`, `medium`, `low`, `info`. Default: `info` |
| `source` | string | No | Event source identifier. Default: `unknown` |
| `category` | string | No | Event category (e.g., `intrusion`, `malware`, `general`). Default: `general` |
| `description` | string | No | Human-readable event description |
| `status` | string | No | Event status: `open`, `investigating`, `resolved`. Default: `open` |

**Example Request:**

```bash
curl -X POST https://thinkengine.io/api/soc/events \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "severity": "high",
    "source": "manual",
    "category": "suspicious-activity",
    "description": "Unusual outbound traffic detected on port 4444",
    "status": "open"
  }'
```

**Example Response (201 Created):**

```json
{
  "ok": true,
  "event_id": "evt-002"
}
```
