---
sidebar_position: 3
title: Microsoft Teams
description: Send alerts and incident notifications to Teams channels
---

# Microsoft Teams

Pipe ThinkEngine alerts into Microsoft Teams channels via incoming webhooks (Office 365 Connector).

## What you'll need

- A Teams channel where you have permission to add connectors
- Optional: your Microsoft tenant ID if you want tenant-scoped routing

## Setup

1. In Teams, click the `…` menu next to the target channel and pick **Connectors**.
2. Find **Incoming Webhook**, click **Configure**, give it a name (e.g. *ThinkEngine SOC*), and optionally upload an icon.
3. Click **Create** and copy the generated **Webhook URL**.
4. In ThinkEngine, go to **Settings → Integrations → MS Teams** and click **Configure**.
5. Paste the webhook URL. Optionally fill in:
   - **Tenant ID** — restricts the integration to a specific Microsoft tenant
   - **Timezone** — controls how timestamps render in the message body (e.g. `Europe/Istanbul`)
6. Save and click **Test**.

## Notification settings

Same controls as the other alert destinations:

- Mode (realtime / digest)
- Severity threshold
- Action types

## Alert format

ThinkEngine posts an Adaptive Card with:

- Color-coded severity bar
- Title, summary, affected asset
- Deep-link button back to the finding in the dashboard
- Originating module and timestamp (in your configured timezone)

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Test returns `200` but no message visible | Connector was disabled at the channel level | Re-enable under **Manage channel → Connectors** |
| `Microsoft Teams Webhook returned 410` | Webhook URL was rotated by Teams | Generate a fresh URL and update the integration config |
| Cards render with broken layout | Outdated Teams client | Update to the latest Teams desktop or web client |

## Related

- [Slack](/integrations/slack)
- [Discord](/integrations/discord)
- [Email (SMTP)](/integrations/email)
