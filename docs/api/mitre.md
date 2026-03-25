---
title: MITRE ATT&CK
sidebar_position: 11
---

# MITRE ATT&CK

The MITRE ATT&CK API provides a coverage map showing which techniques are detected by your security monitoring, including detections from both Sentinel agents and code scanning.

## Endpoints

### `GET /api/grc/mitre`

Returns the full MITRE ATT&CK technique list with detection coverage data. Each technique includes a detection count and coverage flag based on SOC events and code scan findings.

**Authentication:** Bearer token required

**Example Request:**

```bash
curl https://thinkengine.io/api/grc/mitre \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "techniques": [
    {
      "id": "T1059",
      "name": "Command and Scripting Interpreter",
      "tactic": "Execution",
      "detections": 12,
      "covered": true,
      "code_scan_detections": 3
    },
    {
      "id": "T1078",
      "name": "Valid Accounts",
      "tactic": "Defense Evasion",
      "detections": 5,
      "covered": true
    },
    {
      "id": "T1566",
      "name": "Phishing",
      "tactic": "Initial Access",
      "detections": 0,
      "covered": false
    }
  ],
  "stats": {
    "total": 201,
    "covered": 48,
    "coverage_pct": 24
  }
}
```

### Fields

| Field | Type | Description |
|---|---|---|
| `techniques[].id` | string | MITRE technique ID (e.g., `T1059`) |
| `techniques[].name` | string | Technique name |
| `techniques[].tactic` | string | Associated tactic (e.g., `Execution`, `Initial Access`) |
| `techniques[].detections` | integer | Number of times this technique was detected |
| `techniques[].covered` | boolean | Whether at least one detection exists |
| `techniques[].code_scan_detections` | integer | Detections from code scanning (present when > 0) |
| `stats.total` | integer | Total techniques tracked |
| `stats.covered` | integer | Techniques with at least one detection |
| `stats.coverage_pct` | integer | Coverage percentage |
