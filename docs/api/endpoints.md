---
title: Endpoints
sidebar_position: 12
---

# Endpoints

The Endpoints API provides information about monitored infrastructure endpoints (servers, workstations, containers) and their current security status. Endpoint data is collected from Sentinel agents deployed across your fleet.

## Endpoints

### `GET /api/endpoints`

List all monitored endpoints with summary information.

**Authentication:** Bearer token required

**Example Request:**

```bash
curl https://thinkengine.io/api/endpoints \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "endpoints": [
    {
      "id": "ep-001",
      "hostname": "prod-web-01",
      "ip": "10.0.1.5",
      "platform": "linux",
      "agent_id": "agent-prod-01",
      "status": "online",
      "last_seen": "2026-03-24T10:30:00Z",
      "hardening_score": 85,
      "open_vulnerabilities": 3
    }
  ],
  "total": 1
}
```

---

### `GET /api/endpoints/{id}`

Retrieve detailed information about a specific endpoint, including its security posture.

**Authentication:** Bearer token required

**Path Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Endpoint ID |

**Example Request:**

```bash
curl https://thinkengine.io/api/endpoints/ep-001 \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "id": "ep-001",
  "hostname": "prod-web-01",
  "ip": "10.0.1.5",
  "platform": "linux",
  "agent_id": "agent-prod-01",
  "status": "online",
  "last_seen": "2026-03-24T10:30:00Z",
  "hardening_score": 85,
  "open_vulnerabilities": 3,
  "installed_packages": 342,
  "containers_running": 8,
  "last_scan": "2026-03-24T02:00:00Z"
}
```
