---
title: Code Security
sidebar_position: 9
---

# Code Security

The Code Security API provides access to automated code scanning results. Scans include SAST (Static Application Security Testing), SCA (Software Composition Analysis), secrets detection, and IaC (Infrastructure as Code) scanning.

## Endpoints

### `GET /api/code-scan/overview`

Get an overview of all scanned repositories with aggregate scores and finding counts.

**Authentication:** Bearer token required

**Example Request:**

```bash
curl https://thinkengine.io/api/code-scan/overview \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "repos": [
    {
      "owner": "myorg",
      "repo": "myapp",
      "score": 82,
      "grade": "B",
      "total_findings": 14,
      "critical": 0,
      "high": 2,
      "medium": 5,
      "low": 7,
      "last_scan": "2026-03-23T08:00:00Z"
    }
  ],
  "total_repos": 1,
  "average_score": 82.0,
  "total_findings": 14,
  "grade_distribution": {
    "A": 0,
    "B": 1,
    "C": 0,
    "D": 0,
    "F": 0
  }
}
```

---

### `GET /api/code-scan/results/{scan_id}`

Retrieve detailed results for a specific scan, including individual SAST and SCA findings.

**Authentication:** Bearer token required

**Path Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `scan_id` | string | Yes | Scan UUID |

**Example Request:**

```bash
curl https://thinkengine.io/api/code-scan/results/scan-abc123 \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "scan_id": "scan-abc123",
  "owner": "myorg",
  "repo": "myapp",
  "branch": "main",
  "score": 82,
  "grade": "B",
  "completed_at": "2026-03-23T08:05:00Z",
  "findings": [
    {
      "id": "f-001",
      "type": "sast",
      "severity": "high",
      "title": "SQL Injection in user query",
      "file": "src/db/users.py",
      "line": 42,
      "cwe": "CWE-89",
      "description": "User input is concatenated directly into SQL query string.",
      "recommendation": "Use parameterized queries."
    },
    {
      "id": "f-002",
      "type": "sca",
      "severity": "medium",
      "title": "Vulnerable dependency: lodash@4.17.20",
      "cve": "CVE-2021-23337",
      "description": "Prototype pollution vulnerability in lodash.",
      "recommendation": "Upgrade to lodash@4.17.21 or later."
    }
  ]
}
```

---

### `GET /api/code-scan/latest/{owner}/{repo}`

Retrieve the most recent scan result for a specific repository.

**Authentication:** Bearer token required

**Path Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `owner` | string | Yes | Repository owner |
| `repo` | string | Yes | Repository name |

**Example Request:**

```bash
curl https://thinkengine.io/api/code-scan/latest/myorg/myapp \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

Returns the same format as `GET /api/code-scan/results/{scan_id}`.

---

### `GET /api/code-scan/history/{owner}/{repo}`

Retrieve scan history for a repository.

**Authentication:** Bearer token required

**Path Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `owner` | string | Yes | Repository owner |
| `repo` | string | Yes | Repository name |

**Query Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `limit` | integer | No | Maximum results (1-100). Default: `20` |

**Example Request:**

```bash
curl "https://thinkengine.io/api/code-scan/history/myorg/myapp?limit=5" \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "history": [
    {
      "scan_id": "scan-abc123",
      "branch": "main",
      "score": 82,
      "grade": "B",
      "total_findings": 14,
      "completed_at": "2026-03-23T08:05:00Z"
    },
    {
      "scan_id": "scan-xyz789",
      "branch": "main",
      "score": 78,
      "grade": "C",
      "total_findings": 18,
      "completed_at": "2026-03-16T08:02:00Z"
    }
  ],
  "total": 2
}
```
