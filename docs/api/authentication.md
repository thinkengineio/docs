---
title: Authentication
sidebar_position: 1
---

# Authentication

All API requests to the ThinkEngine platform require authentication. This page covers how to obtain and use API tokens, plus the system endpoints available for health checks and model discovery.

## Base URL

```
https://thinkengine.io
```

All endpoint paths in this documentation are relative to this base URL.

## Bearer Token Authentication

Every API request must include an `Authorization` header with a valid Bearer token.

```
Authorization: Bearer <token>
```

### Obtaining a Token

1. Log in to the ThinkEngine dashboard at `https://thinkengine.io`.
2. Navigate to **Settings** in the sidebar.
3. Under the **API Tokens** section, click **Generate Token**.
4. Copy the token and store it securely. Tokens are shown only once.

### Example Request

```bash
curl -H "Authorization: Bearer <token>" \
  https://thinkengine.io/api/status
```

### Token Security

- Treat API tokens like passwords. Do not commit them to version control or share them in plain text.
- Rotate tokens regularly from the Settings page.
- If a token is compromised, revoke it immediately from Settings.

---

## System Endpoints

The following endpoints provide system health and model information.

### `GET /api/status`

Returns system health information including service availability, worker count, and host resource usage.

**Authentication:** Bearer token required

**Example Request:**

```bash
curl https://thinkengine.io/api/status \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "redis": true,
  "ollama": {
    "running": true,
    "models": ["llama3", "codellama"]
  },
  "workers": 4,
  "queue_depth": 2,
  "host": {
    "cpu_count": 8,
    "memory_total_gb": 32,
    "memory_used_pct": 45.2
  },
  "llm_provider": "openai",
  "model": "gpt-4o",
  "comms": {
    "sms": true,
    "email": true
  },
  "disk": {
    "total_gb": 500,
    "used_pct": 38.1
  },
  "services": {}
}
```

---

### `GET /api/models`

Returns available LLM models, including locally hosted models and the model registry with capability metadata.

**Authentication:** Bearer token required

**Example Request:**

```bash
curl https://thinkengine.io/api/models \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "models": ["gpt-4o", "gpt-4o-mini", "llama3"],
  "ollama_running": true,
  "registry": [
    {
      "name": "gpt-4o",
      "provider": "openai",
      "best_for": "complex reasoning",
      "cost_tier": "high",
      "speed_tier": "medium",
      "context_window": 128000,
      "supports_tools": true,
      "strengths": ["coding", "analysis"],
      "weaknesses": ["cost"],
      "notes": ""
    }
  ],
  "selection": {
    "has_data": true
  }
}
```

---

### `GET /api/models/latency`

Returns latency statistics for LLM models over a configurable time period.

**Authentication:** Bearer token required

**Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `period` | integer | No | Lookback period in hours (1-168). Default: `24` |

**Example Request:**

```bash
curl "https://thinkengine.io/api/models/latency?period=24" \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "latency": {
    "gpt-4o": {
      "avg_ms": 1250,
      "p50_ms": 1100,
      "p95_ms": 2800,
      "p99_ms": 4200,
      "count": 156
    }
  },
  "period_hours": 24
}
```
