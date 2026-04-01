---
title: Security Analytics
sidebar_position: 7
---

# Security Analytics

The Security Analytics API provides access to the SIEM-lite analytics engine, including threat detection, risk scoring, and event timelines.

## UI Tabs

The Security Analytics page in the dashboard is organized into the following tabs:

| Tab | Description |
|---|---|
| **Dashboard** | Top-level metrics, alert volume, and threat timeline |
| **Rules** | Correlation and detection rules with a **Create Rule** form and **enable/disable** toggles per rule |
| **Risk Scoring** | Organization and per-endpoint risk scores with factor breakdowns |
| **GRC Validation** | Compliance control validation against security posture data, including ATTM fire drill evidence artifacts and automated control gap detection |
| **AI Analysis** | Sofia AI-powered analysis of trends, anomalies, and recommendations |

**Removed tabs:** The **Correlations** tab has been removed -- correlation findings now flow directly into the [SecOps triage queue](/platform/soc). The **Search** tab has been removed -- search is now available in the [Endpoints page](/sentinel/overview#search-tab) alongside endpoint telemetry.

## Endpoints

### `GET /api/sentinel/analytics`

Returns a summary dashboard of security analytics, including top-level metrics and recent findings.

**Authentication:** Bearer token required

**Example Request:**

```bash
curl https://thinkengine.io/api/sentinel/analytics \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "total_events": 1523,
  "critical_findings": 3,
  "high_findings": 12,
  "medium_findings": 45,
  "low_findings": 128,
  "modules_active": ["hardening", "vulnerabilities", "threats", "fim"],
  "last_correlation_run": "2026-03-24T02:00:00Z"
}
```

---

### `GET /api/sentinel/analytics/findings`

Retrieve stored security findings from the correlation engine.

**Authentication:** Bearer token required

**Query Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `status` | string | No | Filter by status (e.g., `open`, `resolved`, `suppressed`) |

**Example Request:**

```bash
curl "https://thinkengine.io/api/sentinel/analytics/findings?status=open" \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "findings": [
    {
      "id": "finding-001",
      "rule_id": "CORR-SSH-BRUTE",
      "title": "SSH brute-force detected",
      "severity": "high",
      "status": "open",
      "source_agent": "agent-prod-01",
      "created_at": "2026-03-23T14:30:00Z",
      "details": "Multiple failed SSH login attempts from 203.0.113.42"
    }
  ],
  "total": 1
}
```

---

### `GET /api/sentinel/analytics/risk`

Calculate and return the organization-level risk score based on current security posture data.

**Authentication:** Bearer token required

**Example Request:**

```bash
curl https://thinkengine.io/api/sentinel/analytics/risk \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "score": 72,
  "grade": "C",
  "factors": {
    "vulnerabilities": -15,
    "hardening": -8,
    "incidents_open": -5,
    "coverage": 0
  },
  "trend": "improving"
}
```

---

### `GET /api/sentinel/analytics/search`

:::note
The Search tab has moved from Security Analytics to the **Endpoints** page in the UI. The API endpoint remains the same for backward compatibility.
:::

Search across all security modules for events matching a query. In the dashboard UI, this functionality is now accessed from the **Search** tab on the [Endpoints page](/sentinel/overview#search-tab).

**Authentication:** Bearer token required

**Query Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `q` | string | Yes | Search query |
| `module` | string | No | Filter to specific module(s) (e.g., `hardening`, `vulnerabilities`) |
| `severity` | string | No | Filter by severity (`critical`, `high`, `medium`, `low`) |
| `limit` | integer | No | Maximum results (1-1000). Default: `200` |

**Example Request:**

```bash
curl "https://thinkengine.io/api/sentinel/analytics/search?q=ssh&severity=high&limit=50" \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "results": [
    {
      "module": "threats",
      "agent_id": "agent-prod-01",
      "severity": "high",
      "description": "SSH brute-force attempt detected",
      "timestamp": "2026-03-23T14:30:00Z"
    }
  ],
  "total": 1
}
```
