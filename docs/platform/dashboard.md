---
sidebar_position: 1
title: Dashboard
description: Main dashboard overview
---

# Dashboard

The ThinkEngine dashboard is your central command center -- a single view that summarizes security posture, active tasks, and platform health so you can act on what matters without switching between tools.

## Layout

The dashboard is organized into three areas:

- **Top bar** -- Organization selector, search, notifications bell, and user menu.
- **Sidebar** -- Primary navigation to all platform sections: Tasks, SOC, GRC, Code Security, Incidents, MITRE, Sentinel, Billing, and Settings.
- **Main canvas** -- Widgets and panels that surface the most important data at a glance.

## Key Widgets

### Task Status

A summary of your AI-powered tasks grouped by status -- **pending**, **running**, **completed**, and **failed**. Click any status to jump directly to the filtered task list.

### Security Posture Score

A composite score (0--100) derived from your latest Sentinel scans, code security findings, and compliance control status. The score updates continuously as new data arrives.

### Recent Alerts

The five most recent security alerts from your Sentinel agents, sorted by severity. Each alert links to its full detail in the SOC module.

### System Health

Live status indicators for connected Sentinel agents, integration health (GitHub, Slack, webhooks), and API availability.

### Compliance Overview

A compact view of your tracked compliance frameworks showing the percentage of controls that are satisfied, partially met, or missing evidence.

### Cost Summary

Month-to-date usage across AI tasks and scanning, with a comparison to the previous billing period.

## Navigation

Use the sidebar to move between platform sections:

| Section | What you will find |
|---|---|
| **Tasks** | Submit, monitor, and manage AI-powered tasks |
| **SOC** | Security alerts, triage workflows, threat timeline |
| **GRC** | Compliance frameworks, controls, evidence, risk register |
| **Code Security** | SAST, SCA, secrets, and IaC scan results |
| **Incidents** | Incident lifecycle tracking and post-incident reviews |
| **MITRE** | ATT&CK coverage heatmap and detection gap analysis |
| **Sentinel** | Fleet management for deployed Sentinel agents |
| **Billing** | Subscription tier, usage, and invoices |

## Quick Actions

From the dashboard you can:

- **Submit a new task** -- Click the **+ New Task** button in the top bar to describe work for Sofia.
- **Acknowledge an alert** -- Click an alert in the Recent Alerts widget to open it and begin triage.
- **View agent fleet** -- Click any agent status indicator to jump to the Sentinel fleet view.
- **Search** -- Use the global search bar to find tasks, alerts, incidents, or compliance controls by keyword.

## Next Steps

- [Tasks](/platform/tasks) -- Learn how to submit and manage AI-powered tasks.
- [SOC](/platform/soc) -- Explore the Security Operations Center.
- [Getting Started](/getting-started/quick-start) -- New to ThinkEngine? Start here.
