---
sidebar_position: 3
title: Security Operations (SOC)
description: Security Operations Center dashboard with bulk actions and Sofia AI triage
---

# Security Operations (SOC)

The SOC module is your centralized security operations dashboard. It aggregates alerts from Sentinel agents deployed across your infrastructure, correlates related events, and provides the tools you need to triage, investigate, and resolve security issues.

## SOC Dashboard

The SOC dashboard displays:

- **Alert volume** -- Total alerts over the last 24 hours, 7 days, and 30 days, broken down by severity.
- **Active alerts** -- Alerts that have not yet been acknowledged or resolved.
- **Threat timeline** -- A chronological view of security events across your fleet, with severity-coded markers.
- **Top sources** -- The endpoints generating the most alerts.
- **Detection categories** -- Alert distribution by category (e.g., threat-detection, network, authentication, vulnerability, file-integrity, container).

The SOC page is also accessible as a tab within the unified **SecOps Command** view at `/secops`, alongside Triage and Incidents.

## Severity and Priority

Every finding has two independent axes:

### Severity (S1--S4) -- Machine-set, technical impact

| Level | Risk Score | Description |
|---|---|---|
| **S1 Critical** | 80--100 | Active exploitation, data breach, complete compromise |
| **S2 High** | 50--79 | Significant risk, active probing, privilege escalation |
| **S3 Medium** | 20--49 | Suspicious activity warranting investigation |
| **S4 Low** | 0--19 | Informational, minor misconfigurations |

### Priority (P1--P4) -- Analyst-set, business urgency

| Level | SLA Response | Description |
|---|---|---|
| **P1 Immediate** | 15 min | Drop everything, fix now |
| **P2 High** | 1 hour | Fix in current sprint |
| **P3 Medium** | 4 hours | Regular backlog |
| **P4 Low** | 24 hours | Best effort |

Severity and priority can mismatch. A critical vulnerability on a test server (S1 + P3) is different from a medium finding on a payment system (S3 + P1).

## Bulk Actions

Select multiple events using checkboxes, then apply actions in bulk:

- **Acknowledge** -- Mark selected events as reviewed
- **Resolve** -- Close selected events
- **Close** -- Archive resolved events
- **Escalate** -- Promote to incident with a reason
- **Set Priority** -- Override priority (P1--P4) for all selected
- **Suppress** -- Mark as false positive with reason

Select all events on the current page using the header checkbox. Actions are applied via the bulk action bar that appears above the table.

## Sofia AI Triage

Click any event to open the detail panel, then click **Run Sofia Triage** to get an AI-powered analysis. Sofia evaluates:

- Risk score and severity assessment
- MITRE ATT&CK context (tactic and technique)
- Compliance scope (GDPR, HIPAA, PCI-DSS, etc.)
- Regulatory deadline urgency
- Priority upgrade recommendations

Sofia's analysis is added as a comment to the finding timeline.

### Event-Driven Triage

S1 and S2 findings with compliance frameworks are automatically triaged by Sofia at ingestion time -- no manual trigger needed.

## Alert Correlation

### Rule A: De-duplication

Repeated events from the same host and category within a 15-minute window are de-duplicated. The SOC page shows a de-duplication count badge when multiple raw alerts were consolidated.

### Rule B: Kill-Chain Correlation

Multi-stage attacks across categories on the same host are correlated into super-alerts:

| Pattern | Stages |
|---|---|
| KC-001 | Vulnerability scan + C2 communication |
| KC-002 | Auth failure + network anomaly |
| KC-003 | File integrity change + container escape |

## Triage Workflow

Events follow a triage workflow:

1. **New** -- The event has arrived and has not been reviewed.
2. **Acknowledged** -- An analyst has seen the event and taken ownership.
3. **Investigating** -- Active investigation is underway.
4. **Resolved** -- The event has been addressed.
5. **Closed** -- Archived after resolution.

## Integration with Sentinel

The SOC module receives alerts from your deployed [Sentinel agents](/sentinel/overview). Sentinel performs on-endpoint detection (CIS hardening, file integrity, threat behaviors, vulnerability findings, secrets exposure) and forwards events to ThinkEngine.

For details on configuring Sentinel, see [Sentinel Configuration](/sentinel/configuration) and [Fleet Mode](/sentinel/fleet-mode).

## Next Steps

- [Triage Inbox](/platform/dashboard) -- Priority-sorted findings with risk scoring
- [Incidents](/platform/incidents) -- Escalated findings requiring deep investigation
- [GRC](/platform/grc) -- Compliance controls and regulatory mapping
