---
sidebar_position: 5
title: Investigate
description: Historical telemetry search and investigation
---

# Investigate

The **Investigate** page (`/sentinel/investigate`) provides historical search across all telemetry collected by your Sentinel fleet. Use it to hunt for past events, correlate activity across agents, and investigate security incidents.

---

## Telemetry Storage Architecture

Sentinel telemetry flows through a three-stage pipeline designed for cost efficiency and fast search at scale:

```
Agent → POST /api/sentinel/telemetry
         ↓
   Redis buffer (hot, ephemeral)
         ↓
   Encrypted Parquet files in OCI Object Storage (warm, durable)
         ↓
   DuckDB query engine (on-demand, in-memory)
```

1. **Ingest** -- Agents push telemetry to the platform API. Events are buffered in Redis for fast write throughput.
2. **Flush** -- A background flusher periodically converts buffered events into columnar Parquet files, encrypts them per-organization (AES-256-GCM, HKDF-derived keys), and uploads them to OCI Object Storage.
3. **Search** -- When you query the Investigate page, the platform downloads matching encrypted Parquet files, decrypts them in-memory, and runs your query via DuckDB. Decrypted data never touches disk.

This replaces the previous `sentinel_telemetry` PostgreSQL table, which could not scale cost-effectively for high-volume telemetry workloads.

---

## Search Capabilities

The Investigate page supports the following filters:

| Filter | Description |
|--------|-------------|
| **Free-text search** | Search across all event fields (hostname, module data, event content) |
| **Module** | Filter by telemetry module (e.g., `hardening`, `inventory`, `fim`, `threats`) |
| **Agent** | Filter by specific agent ID |
| **Severity** | Filter by severity level (`critical`, `high`, `medium`, `low`, `info`) |
| **Time range** | Select a time window: `1h`, `6h`, `12h`, `24h`, `7d`, `30d`, `90d` |

### Searchable Modules

All Sentinel telemetry modules are searchable:

- `telemetry` -- Core system metrics (CPU, memory, disk, network)
- `hardening` -- CIS benchmark results
- `inventory` -- System inventory (packages, users, services, ports, crons, mounts)
- `fim` -- File integrity monitoring events
- `auth_audit` -- Authentication and authorization audit logs
- `containers` -- Docker container and image audit
- `network` -- Network flow and connection data
- `threats` -- Behavioral threat detections with MITRE mapping
- `vuln_scan` -- Vulnerability scan results

---

## Retention and Search Limits

Telemetry retention and search range are determined by your organization's tier:

| Tier | Data Retention | Max Search Range |
|------|---------------|-----------------|
| **Free** | 7 days | 7 days |
| **Pro** | 30 days | 30 days |
| **Pro Max** (Business) | 90 days | 90 days |
| **Enterprise** | Custom (default 730 days) | 730 days |

After the retention period, Parquet files are automatically purged from object storage. Queries that request a time range exceeding your tier's maximum will be capped to the allowed window.

---

## Rate Limits

To protect platform resources, telemetry search is rate-limited to **10 queries per minute** per organization. Each query processes up to 50 Parquet files with a 30-second timeout.

---

## Using the Investigate Page

1. Navigate to **Sentinel > Investigate** in the dashboard.
2. Select your desired time range from the dropdown.
3. (Optional) Apply module, agent, or severity filters.
4. Enter a free-text search term or leave blank for all events.
5. Click **Search** to execute the query.

Results display in a table with columns for timestamp, agent ID, hostname, module, and severity. Click any row to open a detail panel showing the full event payload.

---

## Investigate vs. Endpoints Search

The platform offers two search interfaces:

- **Endpoints > Search tab** (`/sentinel/endpoints`) -- Quick search scoped to a specific endpoint's recent telemetry. Best for "what happened on this machine recently?"
- **Investigate** (`/sentinel/investigate`) -- Full historical search across all agents and modules. Best for incident investigation, threat hunting, and cross-agent correlation.
