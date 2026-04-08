---
sidebar_position: 2
title: Discord
description: Send security alerts and notifications to Discord channels
---

# Discord

Send ThinkEngine security alerts, SOC events, and scan results to Discord via incoming webhooks.

## What you'll need

- A Discord server where you have the **Manage Webhooks** permission
- The channel you want alerts to land in

## Setup

1. In your Discord server, open **Server Settings → Integrations → Webhooks → New Webhook**.
2. Pick the target channel, give the webhook a name (e.g. *ThinkEngine Alerts*), and copy the **Webhook URL**.
3. In ThinkEngine, go to **Settings → Integrations → Discord** and click **Configure**.
4. Paste the webhook URL into the **Webhook URL** field and save.
5. Click **Test** — you should see a sample alert appear in the Discord channel within a few seconds.

## Notification settings

Once connected you can configure:

- **Mode** — `realtime` (one message per event) or `digest` (rolled up at fixed intervals)
- **Severity threshold** — minimum severity to forward (`low`, `medium`, `high`, `critical`)
- **Action types** — which event categories to forward (assignments, comments, status changes, etc.)

## Alert format

ThinkEngine posts a rich-embed message containing:

- Severity badge (color-coded)
- Event title and short summary
- Affected asset / repo / endpoint
- Direct deep-link back to the finding in the ThinkEngine dashboard
- Timestamp and originating module (SOC / Sentinel / Code Security / GRC)

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Test fails immediately | Webhook URL invalid or revoked | Re-create the webhook in Discord, paste the new URL |
| Test succeeds, no real alerts | Severity threshold set too high | Lower the threshold under **Configure** |
| Messages stop after a while | Discord rate-limited the webhook | ThinkEngine auto-backs-off; messages resume in 1–2 minutes |

## Related

- [Slack](/integrations/slack)
- [Microsoft Teams](/integrations/teams)
- [Custom Webhook](/integrations/webhooks)
