---
sidebar_position: 6
title: Incidents
description: Incident management
---

# Incidents

The Incidents module provides structured incident tracking from detection through resolution. Incidents can be created manually or generated automatically from security alerts, giving your team a consistent process for handling security events.

## Creating an Incident

### From an Alert

When triaging an alert in the [SOC module](/platform/soc), click **Escalate to Incident** to create an incident pre-populated with the alert details, affected endpoint, and timeline context.

### Manually

1. Go to **Incidents** in the sidebar.
2. Click **+ New Incident**.
3. Fill in the incident title, description, severity, and any initial notes.
4. Click **Create**.

## Incident Lifecycle

Every incident moves through a defined lifecycle:

| Status | Description |
|---|---|
| **Open** | Incident has been created and needs attention. |
| **Investigating** | The team is actively analyzing the incident to determine scope and impact. |
| **Mitigating** | Root cause is understood and containment or remediation actions are in progress. |
| **Resolved** | The immediate threat has been addressed. Monitoring continues to confirm resolution. |
| **Closed** | Incident is fully resolved, reviewed, and documented. No further action required. |

To advance an incident through the lifecycle, open the incident detail page and click the status transition button (e.g., **Start Investigation**, **Begin Mitigation**, **Resolve**, **Close**).

## Incident Detail

The incident detail page includes:

- **Summary** -- Title, severity, current status, and assigned owner.
- **Timeline** -- A chronological log of all activity: status changes, notes added, related alerts linked, and assignments made.
- **Related alerts** -- SOC alerts linked to this incident.
- **Notes** -- Free-form investigation notes added by team members. Each note is timestamped and attributed.
- **Attachments** -- Upload files, screenshots, or log excerpts relevant to the investigation.

## Assigning Incidents

Click **Assign** on the incident detail page to assign the incident to a team member. Assignments are logged in the timeline so ownership history is always clear.

You can reassign at any time -- for example, handing off from a first responder to a specialist.

## Updating an Incident

As the investigation progresses:

1. **Add notes** -- Document findings, hypotheses, and actions taken.
2. **Link alerts** -- Attach additional SOC alerts that are related to the same incident.
3. **Update severity** -- If the scope changes, adjust the severity up or down.
4. **Advance status** -- Move through the lifecycle as the incident progresses.

All changes are captured in the incident timeline for a full audit trail.

## Post-Incident Review

After an incident is resolved:

1. Click **Close** to transition the incident to the closed state.
2. Optionally add a **post-incident review** summary covering:
   - **Root cause** -- What caused the incident.
   - **Impact** -- What was affected and for how long.
   - **Lessons learned** -- What can be improved.
   - **Action items** -- Follow-up tasks to prevent recurrence.

Post-incident reviews are stored with the incident record and can be referenced during future audits or trend analysis.

## Next Steps

- [SOC](/platform/soc) -- Monitor and triage alerts before they become incidents.
- [GRC](/platform/grc) -- Map incident findings to compliance controls.
- [Incidents API](/api/incidents) -- Manage incidents programmatically.
