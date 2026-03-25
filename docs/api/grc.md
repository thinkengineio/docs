---
title: GRC (Governance, Risk & Compliance)
sidebar_position: 6
---

# GRC (Governance, Risk & Compliance)

The GRC API provides access to compliance frameworks, security controls, audit evidence, policies, risk registers, and nonconformities. These endpoints power the compliance management dashboard.

## Endpoints

### `GET /api/grc/frameworks`

List all compliance frameworks with live control statistics and compliance percentages.

**Authentication:** Bearer token required

**Example Request:**

```bash
curl https://thinkengine.io/api/grc/frameworks \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "frameworks": [
    {
      "id": "soc2-type2",
      "name": "SOC 2 Type II",
      "description": "Service Organization Control 2",
      "total_controls": 64,
      "mapped_controls": 42,
      "implemented": 35,
      "in_progress": 5,
      "not_implemented": 2,
      "compliance_pct": 55
    }
  ]
}
```

---

### `GET /api/grc/controls`

List all security controls across all frameworks.

**Authentication:** Bearer token required

**Example Request:**

```bash
curl https://thinkengine.io/api/grc/controls \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "controls": [
    {
      "id": "ctrl-001",
      "framework": "soc2-type2",
      "name": "Access Control Policy",
      "description": "Logical and physical access controls are in place.",
      "status": "implemented",
      "owner": "security-team",
      "last_reviewed": "2025-12-01T00:00:00Z"
    }
  ]
}
```

---

### `GET /api/grc/controls/{id}`

Retrieve details for a specific control.

**Authentication:** Bearer token required

**Path Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Control ID |

**Example Request:**

```bash
curl https://thinkengine.io/api/grc/controls/ctrl-001 \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "id": "ctrl-001",
  "framework": "soc2-type2",
  "name": "Access Control Policy",
  "description": "Logical and physical access controls are in place.",
  "status": "implemented",
  "owner": "security-team",
  "last_reviewed": "2025-12-01T00:00:00Z",
  "evidence_ids": ["ev-001", "ev-002"],
  "notes": "Reviewed quarterly."
}
```

---

### `GET /api/grc/evidence`

List all audit evidence records.

**Authentication:** Bearer token required

**Example Request:**

```bash
curl https://thinkengine.io/api/grc/evidence \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "evidence": [
    {
      "id": "ev-001",
      "control_id": "ctrl-001",
      "title": "Access review log Q4 2025",
      "type": "document",
      "collected_at": "2025-12-15T10:30:00Z",
      "status": "approved"
    }
  ]
}
```

---

### `POST /api/grc/evidence`

Upload a new evidence record.

**Authentication:** Bearer token required

**Request Body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `control_id` | string | Yes | ID of the control this evidence supports |
| `title` | string | Yes | Short description of the evidence |
| `type` | string | No | Evidence type (e.g., `document`, `screenshot`, `log`). Default: `document` |
| `content` | string | No | Evidence content or URL |
| `notes` | string | No | Additional notes |

**Example Request:**

```bash
curl -X POST https://thinkengine.io/api/grc/evidence \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "control_id": "ctrl-001",
    "title": "Access review log Q4 2025",
    "type": "document",
    "content": "All user access was reviewed and confirmed...",
    "notes": "Reviewed by security team lead."
  }'
```

**Example Response (201 Created):**

```json
{
  "ok": true,
  "id": "ev-003"
}
```

---

### `GET /api/grc/policies`

List all organizational policies.

**Authentication:** Bearer token required

**Example Request:**

```bash
curl https://thinkengine.io/api/grc/policies \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "policies": [
    {
      "id": "pol-001",
      "name": "Acceptable Use Policy",
      "status": "active",
      "version": "2.1",
      "owner": "compliance-team",
      "last_reviewed": "2025-11-01T00:00:00Z",
      "next_review": "2026-05-01T00:00:00Z"
    }
  ]
}
```

---

### `GET /api/grc/risks`

List all entries in the risk register.

**Authentication:** Bearer token required

**Example Request:**

```bash
curl https://thinkengine.io/api/grc/risks \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "risks": [
    {
      "id": "risk-001",
      "title": "Unpatched production servers",
      "severity": "high",
      "likelihood": "medium",
      "impact": "high",
      "status": "mitigating",
      "owner": "ops-team",
      "mitigation": "Automated patching pipeline deployed.",
      "created_at": "2025-10-01T00:00:00Z"
    }
  ]
}
```

---

### `GET /api/grc/nonconformities`

List compliance gaps and nonconformities.

**Authentication:** Bearer token required

**Example Request:**

```bash
curl https://thinkengine.io/api/grc/nonconformities \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "nonconformities": [
    {
      "id": "ncr-001",
      "control_id": "ctrl-012",
      "title": "Missing encryption at rest for backup storage",
      "severity": "high",
      "status": "open",
      "due_date": "2026-02-01T00:00:00Z",
      "assignee": "infra-team",
      "created_at": "2025-11-15T00:00:00Z"
    }
  ]
}
```
