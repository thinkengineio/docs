---
sidebar_position: 7
title: Sofia AI
description: AI-powered triage, compliance engine, and chat assistant
---

# Sofia AI

Sofia is ThinkEngine's autonomous AI assistant. She provides real-time security analysis, compliance monitoring, and actionable recommendations across the platform.

## Chat with Sofia

Open the chat panel from the top navigation bar. Sofia has access to live platform data through 7 tools:

| Tool | What it does |
|---|---|
| **get_findings** | Query the triage inbox with severity, status, and search filters |
| **get_finding_detail** | Look up a specific finding by ID (FND-xxxx) |
| **get_soc_events** | Query SOC events by severity and category |
| **run_sofia_triage** | Trigger AI triage analysis on a specific finding |
| **run_compliance_sweep** | Run a regulatory deadline sweep across all findings |
| **get_system_status** | Check backend, database, Redis, and agent fleet health |
| **get_incidents** | Query escalated incidents |

### Example prompts

- "Show me all critical findings"
- "Triage FND-469ddb4a731d"
- "How many open incidents do we have?"
- "Run a compliance sweep"
- "What's the system status?"

When you mention a finding ID (FND-xxxx), Sofia automatically fetches the finding data and includes it in her analysis.

## Triage Button

Every finding detail panel has a **Run Sofia Triage** button. When clicked, Sofia:

1. Evaluates the finding's risk score, severity, and compliance context
2. Checks MITRE ATT&CK mapping (tactic and technique)
3. Assesses regulatory deadline urgency
4. Provides priority upgrade recommendations
5. Adds the analysis as a comment to the finding timeline

## Event-Driven Triage

S1 (Critical) and S2 (High) findings with compliance frameworks are automatically triaged by Sofia at ingestion time. No manual trigger needed -- Sofia's analysis appears in the finding timeline immediately after the finding is created.

## Compliance Engine

Sofia runs a background compliance sweep every 5 minutes, checking all findings with regulatory deadlines.

### 3-Tier Auto-Escalation

| Tier | Trigger | Action |
|---|---|---|
| **Tier 1 -- Nudge** | 50% of deadline elapsed | Adds a reminder comment to the finding timeline |
| **Tier 2 -- Draft NCR** | 90% of deadline elapsed | Auto-generates a draft Non-Conformity Report |
| **Tier 3 -- Breach** | 100% of deadline elapsed | Opens the NCR, marks control FAILED, fires webhook to GRC team |

### Manual Sweep

Trigger a compliance sweep on demand:

- **API**: `POST /api/compliance/sweep`
- **Chat**: Ask Sofia "run compliance sweep"
- **Detail panel**: Click **Run Sofia Triage** on any finding

### De-duplication

Each finding is only escalated once per tier. A Redis lock (`sofia:compliance:escalated:{finding_id}`) with 24-hour TTL prevents re-escalation. After 24 hours, if the finding is still unresolved, Sofia re-fires.

## API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/findings/{id}/sofia-triage` | POST | Trigger Sofia triage on a specific finding |
| `/api/compliance/sweep` | POST | Run a full compliance deadline sweep |

## Next Steps

- [SOC](/platform/soc) -- Security events with bulk actions
- [GRC](/platform/grc) -- Compliance dashboard with NCR management
- [Incidents](/platform/incidents) -- Escalated findings for deep investigation
