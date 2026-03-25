---
sidebar_position: 7
title: Fleet Mode
description: Forward telemetry to ThinkEngine dashboard
---

# Fleet Mode

Fleet mode allows Sentinel agents to forward telemetry to the ThinkEngine dashboard for centralized monitoring across your infrastructure.

---

## Forward Mode

Use `--forward` with a server URL to send telemetry to the ThinkEngine dashboard:

```bash
# Forward all 13 event types (full security scan)
sentinel --forward --server https://dashboard.thinkengine.io \
  --api-key sk-sentinel-xxx \
  --agent-id prod-web-01 \
  --tags production,webserver,us-east \
  --full-scan \
  --interval 60

# Forward only core telemetry + selective security modules
sentinel --forward --server https://dashboard.thinkengine.io \
  --api-key sk-sentinel-xxx \
  --hardening --inventory --threat-detect
```

---

## Event Types

Sentinel forwards **13 event types** to the dashboard:

| Event Type | Description |
|---|---|
| `metrics` | CPU, memory, disk, load, temperature, firewall status |
| `processes` | Top processes by CPU usage |
| `connections` | Established and listening network connections |
| `dns_logs` | Real-time DNS connection log |
| `process_tree` | Process hierarchy snapshot |
| `hardening` | CIS benchmark results |
| `inventory` | Full system inventory |
| `fim` | File integrity check results |
| `auth_audit` | Authentication and authorization audit |
| `containers` | Docker container and image audit |
| `threats` | Behavioral threat detections with MITRE mapping |
| `vuln_scan` | Vulnerability scan results with risk scoring |
| `secrets` | Credential and API key findings |

---

## Webhook Mode (One-Shot)

Send a single telemetry payload to any HTTP endpoint:

```bash
sudo sentinel --webhook https://your-server.com/api/telemetry
```

---

## Daemon Mode

Run Sentinel as a continuous background service that sends telemetry at the configured interval:

```bash
sudo sentinel --daemon
```

Daemon mode uses the webhook URL and interval from the [configuration file](./configuration.md). The default interval is 60 seconds.

---

## Fleet Flags

| Flag | Description |
|------|-------------|
| `--forward` | Enable forward mode (send telemetry to server) |
| `--server <URL>` | Server URL for forward mode |
| `--api-key <key>` | Sentinel API key for authentication |
| `--agent-id <id>` | Agent identifier (auto-generated if not set) |
| `--tags <tags>` | Comma-separated agent tags (e.g., `production,webserver`) |
| `--interval <seconds>` | Forward interval in seconds (default: 30) |
| `--webhook <URL>` | Send telemetry to webhook URL (one-shot) |
| `--daemon` | Run as daemon, sending telemetry to configured webhook |
