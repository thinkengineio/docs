---
sidebar_position: 6
title: Incidents
description: Incident management with bulk actions and escalation from triage
---

# Incidents

The Incidents module tracks escalated security findings that require deep investigation. Incidents are **not raw alerts** -- they are findings that an analyst has explicitly promoted from the Triage inbox via the **Escalate** action.

The Incidents page is also accessible as the **Response** tab within the unified **SecOps Command** view at `/secops` (tab order: Monitoring > Triage > Response).

Every findings table in SecOps displays a **FND ID** column, providing a consistent finding identifier across all tabs.

## How Findings Become Incidents

A finding becomes an incident when an analyst clicks **Escalate** in the Triage or SOC detail panel. This:

1. Sets `escalated_to_incident = TRUE` on the finding
2. Bumps priority (e.g., P3 becomes P2)
3. Recomputes SLA timers based on the new priority
4. Adds the escalation reason to the finding timeline

The Incidents page queries only findings where `escalated_to_incident = TRUE`.

## Bulk Actions

Select multiple incidents using checkboxes, then apply actions in bulk:

- **Acknowledge** -- Take ownership of selected incidents
- **Resolve** -- Close selected incidents
- **Close** -- Archive after resolution
- **Set Priority** -- Override priority (P1--P4) for all selected
- **Suppress** -- Mark as false positive with reason

## Incident Detail

Click any incident to open the detail panel:

- **Severity + Priority** -- S-level badge (machine-set) + P-level badge (analyst-set, with analyst icon when overridden)
- **Risk Score** -- Composite score out of 100 with full breakdown (base, MITRE, asset, EPSS, KEV, threat intel)
- **Kill-Chain Evidence** -- If the incident was correlated from a kill-chain pattern, linked finding IDs and category tags are shown
- **Compliance Context** -- Framework tags (HIPAA, GDPR, PCI-DSS) + regulatory deadline countdown
- **De-dup Count** -- How many raw alerts were consolidated into this finding
- **Timeline** -- Chronological log of all actions, including Sofia AI comments
- **Sofia Triage** -- Click **Run Sofia Triage** for AI-powered analysis and recommendations

## Incident Lifecycle

| Status | Description |
|---|---|
| **New** | Escalated from triage, needs attention |
| **Acknowledged** | Analyst has taken ownership |
| **Investigating** | Active analysis underway |
| **Resolved** | Threat addressed, monitoring for confirmation |
| **Closed** | Fully resolved and documented |

## Assigning Incidents

Click **Assign** in the detail panel to assign to a team member. Assignments are logged in the timeline. Bulk assignment is available via the bulk action bar.

## Next Steps

- [SOC](/platform/soc) -- Monitor and triage alerts before escalation
- [Triage Inbox](/platform/dashboard) -- Priority-sorted findings queue
- [GRC](/platform/grc) -- Map incident findings to compliance controls
