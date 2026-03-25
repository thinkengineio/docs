---
sidebar_position: 3
title: Security Operations (SOC)
description: Security Operations Center dashboard
---

# Security Operations (SOC)

The SOC module is your centralized security operations dashboard. It aggregates alerts from Sentinel agents deployed across your infrastructure, correlates related events, and provides the tools you need to triage, investigate, and resolve security issues.

## SOC Dashboard

The SOC dashboard displays:

- **Alert volume** -- Total alerts over the last 24 hours, 7 days, and 30 days, broken down by severity.
- **Active alerts** -- Alerts that have not yet been acknowledged or resolved.
- **Threat timeline** -- A chronological view of security events across your fleet, with severity-coded markers.
- **Top sources** -- The endpoints generating the most alerts.
- **Detection categories** -- Alert distribution by category (e.g., malware, policy violation, anomalous behavior, misconfigurations).

## Alerts

### Severity Levels

Every alert is assigned a severity:

| Severity | Description |
|---|---|
| **Critical** | Immediate action required. Active exploitation, data exfiltration, or complete control compromise. |
| **High** | Significant risk. Vulnerabilities being actively probed, privilege escalation attempts, or policy violations with material impact. |
| **Medium** | Moderate risk. Suspicious activity that warrants investigation but does not indicate active compromise. |
| **Low** | Minor risk. Informational findings that may indicate misconfigurations or non-critical policy deviations. |
| **Info** | No immediate risk. Baseline telemetry events logged for audit and correlation purposes. |

### Viewing Alert Details

Click any alert to open its detail view:

- **Summary** -- What was detected, on which endpoint, and when.
- **Raw event data** -- The underlying telemetry that triggered the alert.
- **MITRE mapping** -- If the detection maps to a MITRE ATT&CK technique, the technique ID and tactic are shown.
- **Related alerts** -- Other alerts from the same endpoint or matching the same detection pattern.
- **Sentinel agent** -- Which agent reported the event, with a link to its fleet detail.

## Triage Workflow

Alerts follow a triage workflow:

1. **New** -- The alert has arrived and has not been reviewed.
2. **Acknowledged** -- An analyst has seen the alert and taken ownership.
3. **Investigating** -- Active investigation is underway.
4. **Resolved** -- The alert has been addressed (true positive remediated or false positive dismissed).

To triage an alert:

1. Open the alert detail page.
2. Click **Acknowledge** to signal you are reviewing it.
3. Add investigation notes as you work.
4. When finished, click **Resolve** and select a resolution reason: **true positive -- remediated**, **false positive**, or **expected behavior**.

Resolved alerts remain searchable for audit and trend analysis.

## Threat Timeline

The threat timeline provides a chronological view of all security events across your fleet. Use it to:

- **Correlate events** -- See related alerts that occurred around the same time on the same or different endpoints.
- **Identify patterns** -- Spot repeated attack attempts or spreading lateral movement.
- **Filter** -- Narrow the timeline by severity, endpoint, detection category, or time range.

## Integration with Sentinel

The SOC module receives alerts from your deployed [Sentinel agents](/sentinel/overview). Sentinel performs on-endpoint detection (CIS hardening violations, file integrity changes, threat behaviors, vulnerability findings, secrets exposure) and forwards events to ThinkEngine, where they appear in the SOC dashboard.

For details on configuring Sentinel's detection and forwarding capabilities, see [Sentinel Configuration](/sentinel/configuration) and [Fleet Mode](/sentinel/fleet-mode).

## Next Steps

- [Incidents](/platform/incidents) -- Escalate alerts into tracked incidents.
- [MITRE ATT&CK](/platform/mitre) -- View detection coverage against the ATT&CK framework.
- [GRC](/platform/grc) -- Map security findings to compliance controls.
