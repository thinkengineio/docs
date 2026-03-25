---
sidebar_position: 2
title: Quick Start
description: Get up and running with ThinkEngine in 5 minutes
---

# Quick Start

Get up and running with ThinkEngine in five steps.

## 1. Sign Up

Create your account at [thinkengine.io](https://thinkengine.io). You can sign up with your email or use your organization's enterprise single sign-on.

## 2. Log In

After signing up, log in to the ThinkEngine dashboard. You will land on the overview page where you can see your security posture at a glance.

## 3. Submit a Task

Navigate to the **Tasks** page and submit your first task to Sofia. Describe what you need -- for example, "scan my repository for hardcoded secrets" or "review this pull request for security issues." Sofia will autonomously work through the task and report back with results. You can also submit tasks programmatically via the [API](/api/authentication).

## 4. Install Sentinel

Deploy the Sentinel agent on one or more endpoints to start collecting security telemetry. Grab the binary for your platform from the [Downloads](/downloads/sentinel-agent) page, then follow the [Installation guide](/sentinel/installation) to configure and run it.

```bash
# Example: Linux x86_64
curl -LO https://github.com/thinkengineio/sentinel-maas/releases/latest/download/sentinel-linux-amd64
chmod +x sentinel-linux-amd64
sudo mv sentinel-linux-amd64 /usr/local/bin/sentinel
sentinel --version
```

## 5. Monitor

Return to the dashboard to view incoming security telemetry, SOC alerts, and compliance status. As Sentinel reports in, you will see file integrity events, vulnerability findings, and hardening recommendations populate your security overview.

## What's Next?

- [Authentication](/getting-started/authentication) -- Learn how to obtain API tokens
- [Dashboard Guide](/platform/dashboard) -- Explore the full platform
- [Sentinel Configuration](/sentinel/configuration) -- Fine-tune your agent deployment
