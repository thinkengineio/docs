---
title: Sentinel
sidebar_position: 5
---

# Sentinel

The Sentinel API manages fleet monitoring agents. Sentinel agents run on your infrastructure and report telemetry, health data, and security events back to the ThinkEngine platform.

## Endpoints

### `POST /api/sentinel/telemetry`

Receive telemetry data from a Sentinel agent. This endpoint is typically called by the Sentinel agent itself, not by end users.

**Authentication:** API key via `X-API-Key` header or Bearer token

**Request Body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `agent_id` | string | Yes* | Unique agent identifier. Falls back to `hostname` if not provided. |
| `hostname` | string | No | Hostname of the machine |
| `platform` | string | No | Operating system (e.g., `linux`, `windows`) |
| `version` | string | No | Sentinel agent version |
| `cpu_usage` | number | No | CPU usage percentage |
| `memory_usage` | number | No | Memory usage percentage |
| `disk_usage` | number | No | Disk usage percentage |
| `events` | array | No | Array of event objects for batch telemetry |

**Example Request:**

```bash
curl -X POST https://thinkengine.io/api/sentinel/telemetry \
  -H "Authorization: Bearer sk-sentinel-abc123" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "agent-prod-01",
    "hostname": "prod-web-01",
    "platform": "linux",
    "version": "1.6.2",
    "cpu_usage": 45.2,
    "memory_usage": 62.1,
    "disk_usage": 38.5,
    "events": [
      {
        "event_type": "metrics",
        "data": {
          "cpu_percent": 45.2,
          "memory_percent": 62.1,
          "disk_percent": 38.5,
          "uptime": 864000
        }
      }
    ]
  }'
```

**Example Response:**

```json
{
  "ok": true
}
```

---

### `GET /api/sentinel/fleet-summary`

Get a high-level overview of your fleet health, including counts of online, degraded, and offline agents.

**Authentication:** Bearer token required

**Example Request:**

```bash
curl https://thinkengine.io/api/sentinel/fleet-summary \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "agents": 12,
  "online": 10,
  "degraded": 1,
  "offline": 1
}
```

---

### `POST /api/sentinel/agents`

Register a new Sentinel agent. Agent registration typically happens automatically when a Sentinel agent sends its first telemetry payload, but this endpoint allows explicit registration.

**Authentication:** Bearer token required

**Request Body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `agent_id` | string | Yes | Unique agent identifier |
| `hostname` | string | No | Hostname of the machine |
| `platform` | string | No | Operating system |
| `version` | string | No | Agent version |

**Example Request:**

```bash
curl -X POST https://thinkengine.io/api/sentinel/agents \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "agent-prod-01",
    "hostname": "prod-web-01",
    "platform": "linux",
    "version": "1.6.2"
  }'
```

**Example Response (201 Created):**

```json
{
  "ok": true,
  "agent_id": "agent-prod-01"
}
```

---

### `GET /api/sentinel/agents`

List all registered Sentinel agents with their current status and version information.

**Authentication:** Bearer token required

**Example Request:**

```bash
curl https://thinkengine.io/api/sentinel/agents \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "agents": [
    {
      "agent_id": "agent-prod-01",
      "hostname": "prod-web-01",
      "platform": "linux",
      "version": "1.6.2",
      "last_seen": 1711234567.89,
      "ip": "10.0.1.5",
      "status": "online",
      "update_available": false
    }
  ],
  "latest_version": "v1.6.2"
}
```

---

### `GET /api/sentinel/agents/{id}`

Retrieve detailed information about a specific agent, including recent telemetry history.

**Authentication:** Bearer token required

**Path Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Agent ID |

**Example Request:**

```bash
curl https://thinkengine.io/api/sentinel/agents/agent-prod-01 \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "agent_id": "agent-prod-01",
  "hostname": "prod-web-01",
  "platform": "linux",
  "version": "1.6.2",
  "last_seen": 1711234567.89,
  "ip": "10.0.1.5",
  "status": "online",
  "telemetry_history": [
    {
      "_ts": 1711234567.89,
      "cpu_usage": 45.2,
      "memory_usage": 62.1,
      "disk_usage": 38.5,
      "uptime": 864000
    },
    {
      "_ts": 1711234267.89,
      "cpu_usage": 42.8,
      "memory_usage": 61.5,
      "disk_usage": 38.5,
      "uptime": 863700
    }
  ]
}
```
