---
title: Memory & Learning
sidebar_position: 14
---

# Memory & Learning

The Memory API lets you search through past task history and the AI agent's learning data. This is useful for finding previous solutions, understanding patterns, and leveraging accumulated knowledge.

## Endpoints

### `GET /api/memory/search`

Search through task history and semantic memory for relevant past results.

**Authentication:** Bearer token required

**Query Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `q` | string | Yes | Search query |

**Example Request:**

```bash
curl "https://thinkengine.io/api/memory/search?q=login%20redirect" \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "results": [
    {
      "task": "Fix the login page redirect loop",
      "outcome": "Fixed redirect by validating callback URL against allowed origins...",
      "model": "auto",
      "status": "completed",
      "task_id": "a1b2c3d4"
    },
    {
      "task": "semantic-match-001",
      "outcome": "Auth redirect configuration requires explicit origin allowlist...",
      "model": "semantic"
    }
  ]
}
```

Returns up to 10 results. Results from task history are returned first, followed by semantic memory matches.

---

### `GET /api/learning`

Get learning statistics showing how the AI agent improves over time, including model performance and recent outcomes.

**Authentication:** Bearer token required

**Example Request:**

```bash
curl https://thinkengine.io/api/learning \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "available": true,
  "total_memories": 156,
  "model_stats": [
    {
      "model": "gpt-4o",
      "total_tasks": 89,
      "success_rate": 0.92,
      "avg_duration_s": 45.3
    }
  ],
  "recent_outcomes": [
    {
      "task": "Add rate limiting to API",
      "outcome": "success",
      "model": "gpt-4o",
      "duration_s": 38.2
    }
  ]
}
```
