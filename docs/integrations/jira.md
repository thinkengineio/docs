---
sidebar_position: 5
title: Jira
description: Auto-create tickets from incidents, vulnerabilities, and compliance findings
---

# Jira

Connect Jira so ThinkEngine can auto-create tickets for incidents, vulnerabilities, and GRC findings — and keep them in sync as the underlying state changes.

## What you'll need

- A Jira Cloud (or Server) URL
- The email address you log in with
- A Jira **API token** (from `id.atlassian.com → Security → API tokens`)
- The **project key** that should receive new tickets (e.g. `SEC`, `OPS`)

## Setup

1. Generate an API token at [id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens) and copy it.
2. In ThinkEngine, go to **Settings → Integrations → Jira** and click **Configure**.
3. Fill in:

| Field | Example | Notes |
|---|---|---|
| **Jira URL** | `https://your-domain.atlassian.net` | Base URL of your Jira instance |
| **Email** | `you@yourcompany.com` | The Jira account ThinkEngine will act as |
| **API Token** | `••••••` | Stored encrypted |
| **Project Key** | `SEC` | Tickets will be created in this project |

4. Save and click **Test** — ThinkEngine creates a test issue in the target project, then immediately deletes it. If the round-trip succeeds, you're connected.

## What gets ticketed

By default, the Jira integration auto-creates tickets for:

- **Critical and High severity** SOC alerts
- **Critical and High severity** code security findings
- **Open incidents** assigned to a Jira-ticketed status
- **GRC compliance gaps** marked for remediation
- **Sentinel agent vulnerabilities** above the configured threshold

You can change which event categories trigger tickets and the minimum severity threshold under **Configure → Notify settings**.

## Ticket fields

Each auto-created ticket contains:

- **Summary** — short title from the originating event
- **Description** — full event payload, affected asset, deep-link back to ThinkEngine
- **Issue type** — `Bug` for security findings, `Task` for compliance, `Incident` for SOC events
- **Priority** — mapped from ThinkEngine severity (`Critical → Highest`, `High → High`, etc.)
- **Labels** — `thinkengine`, plus the originating module (`thinkengine-sentinel`, `thinkengine-grc`, etc.)

## Bidirectional sync

When a Jira ticket created by ThinkEngine is **closed**, ThinkEngine marks the corresponding finding as resolved on the next sync cycle (every 5 minutes). The reverse is also true — closing a finding in ThinkEngine transitions the linked Jira ticket.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `401 Unauthorized` on test | Wrong email or API token | Re-generate the token, paste it again |
| `403 Forbidden` on test | Account lacks `Create Issue` perm in the target project | Add the user as a Project Member with at least the `Service Desk Team` role |
| `404 Not Found` on test | Wrong project key | Confirm the key from **Project settings → Details** in Jira |
| Tickets created but missing fields | Project's issue type is missing required custom fields | Add defaults in the Jira project settings, or simplify the issue scheme |

## Related

- [GitHub](/integrations/github)
- [Slack](/integrations/slack)
