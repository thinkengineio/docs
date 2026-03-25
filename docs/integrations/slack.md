---
sidebar_position: 2
title: Slack
description: Slack bot integration
---

# Slack Integration

The ThinkEngine Slack bot lets you interact with Sofia directly from your Slack workspace. Ask questions, submit tasks, and receive updates -- all without leaving your team's communication tool.

## Overview

Once installed, the ThinkEngine bot appears as a member of your Slack workspace. You can:

- **Message Sofia directly** to ask questions or submit tasks.
- **Mention @ThinkEngine** in a channel to start a conversation.
- **Receive notifications** when tasks complete, alerts fire, or incidents are created.

Conversations are **bidirectional and threaded** -- Sofia responds in-thread so context stays organized, and you can continue the conversation with follow-up messages just like chatting with a teammate.

## Installing the Slack Bot

1. Go to **Settings > Integrations > Slack** in the ThinkEngine dashboard.
2. Click **Add to Slack**.
3. You will be redirected to Slack to authorize the ThinkEngine app for your workspace.
4. Select the workspace and approve the requested permissions.
5. Click **Allow**.

The bot will appear in your workspace's app list and can be invited to any channel.

## Interacting with Sofia

### Direct Messages

Open a direct message with **ThinkEngine** and type your request:

```
Fix the authentication timeout bug in the login service
```

Sofia processes the request, creates a task, and replies in-thread with progress updates and results.

### Channel Mentions

Mention **@ThinkEngine** in any channel the bot has been invited to:

```
@ThinkEngine scan the main branch of our API repo for security issues
```

Sofia responds in a thread under your message, keeping the channel clean.

### Follow-Up Messages

Reply in the thread to continue the conversation:

```
Can you also check the user registration endpoint?
```

Sofia reads the full thread context and adjusts her work accordingly.

## Supported Interactions

| Interaction | Example |
|---|---|
| **Submit a task** | "Fix the broken CSV export in the reports page" |
| **Ask a question** | "What dependencies does our API service use?" |
| **Request a scan** | "Run a security scan on the payments repo" |
| **Check task status** | "What's the status of my last task?" |
| **Get a summary** | "Summarize today's security alerts" |

## Notifications

The Slack bot can send notifications to a designated channel when key events occur:

- **Task completed** -- Sofia finished working on a task.
- **Alert triggered** -- A new security alert was generated.
- **Incident created** -- A new incident was opened.
- **Scan completed** -- A code security scan finished with findings.

Configure notification channels from **Settings > Integrations > Slack > Notifications**.

## Configuration

From **Settings > Integrations > Slack** you can:

- **Notification channel** -- Choose which channel receives automated notifications.
- **Allowed channels** -- Restrict which channels the bot responds in (default: all channels it is invited to).
- **Notification types** -- Select which event types trigger Slack notifications.

## Next Steps

- [GitHub Integration](/integrations/github) -- Connect your repositories for issue-driven workflows.
- [Webhooks](/integrations/webhooks) -- Set up custom webhook notifications.
- [Tasks](/platform/tasks) -- View tasks submitted from Slack in the dashboard.
