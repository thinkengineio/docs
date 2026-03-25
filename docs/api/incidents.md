---
title: Incidents
sidebar_position: 10
---

# Incidents

The Incidents API manages security incidents, from creation through investigation to resolution. Incidents can be created manually, or generated automatically from SOC events and correlation rules.

## Endpoints

### `GET /api/incidents`

List all incidents.

**Authentication:** Bearer token required

**Example Request:**

```bash
curl https://thinkengine.io/api/incidents \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "incidents": [
    {
      "id": "inc-001",
      "title": "Unauthorized access to production database",
      "severity": "critical",
      "status": "investigating",
      "created_at": 1711234567.89,
      "updated_at": 1711238167.89,
      "assignee": "security-team",
      "source": "correlation",
      "description": "Multiple failed auth attempts followed by successful login from unusual IP.",
      "affected_assets": ["db-prod-01"],
      "mitre_techniques": ["T1078", "T1110"]
    }
  ]
}
```

---

### `POST /api/incidents`

Create a new incident.

**Authentication:** Bearer token required

**Request Body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | No | Incident title. Default: `Untitled Incident` |
| `severity` | string | No | Severity level: `critical`, `high`, `medium`, `low`. Default: `medium` |
| `status` | string | No | Initial status: `new`, `investigating`, `contained`, `resolved`. Default: `new` |
| `assignee` | string | No | Person or team assigned to the incident |
| `source` | string | No | Source of the incident (e.g., `manual`, `correlation`, `alert`). Default: `manual` |
| `description` | string | No | Detailed description of the incident |
| `affected_assets` | array | No | List of affected asset identifiers |
| `mitre_techniques` | array | No | Related MITRE ATT&CK technique IDs |

**Example Request:**

```bash
curl -X POST https://thinkengine.io/api/incidents \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Suspicious outbound traffic on port 4444",
    "severity": "high",
    "status": "new",
    "assignee": "soc-analyst-01",
    "source": "manual",
    "description": "Unusual outbound connections detected from web server to unknown IP.",
    "affected_assets": ["web-prod-01"],
    "mitre_techniques": ["T1071"]
  }'
```

**Example Response (201 Created):**

```json
{
  "ok": true,
  "incident_id": "inc-002"
}
```

---

### `GET /api/incidents/{id}`

Retrieve details for a specific incident.

**Authentication:** Bearer token required

**Path Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Incident ID |

**Example Request:**

```bash
curl https://thinkengine.io/api/incidents/inc-001 \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "id": "inc-001",
  "title": "Unauthorized access to production database",
  "severity": "critical",
  "status": "investigating",
  "created_at": 1711234567.89,
  "updated_at": 1711238167.89,
  "assignee": "security-team",
  "source": "correlation",
  "description": "Multiple failed auth attempts followed by successful login from unusual IP.",
  "affected_assets": ["db-prod-01"],
  "mitre_techniques": ["T1078", "T1110"]
}
```

---

### `PUT /api/incidents/{id}`

Update an existing incident (e.g., change status, reassign, or add details).

**Authentication:** Bearer token required

**Path Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Incident ID |

**Request Body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | No | Updated title |
| `severity` | string | No | Updated severity |
| `status` | string | No | Updated status |
| `assignee` | string | No | Updated assignee |
| `description` | string | No | Updated description |

**Example Request:**

```bash
curl -X PUT https://thinkengine.io/api/incidents/inc-001 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "contained",
    "description": "Source IP blocked. Credentials rotated. Investigating data exfiltration."
  }'
```

**Example Response:**

```json
{
  "ok": true,
  "incident_id": "inc-001"
}
```
