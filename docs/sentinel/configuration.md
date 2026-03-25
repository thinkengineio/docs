---
sidebar_position: 3
title: Configuration
description: Configure the Sentinel agent
---

# Configuration

## Initialize Config File

Generate the default configuration file:

```bash
sudo sentinel --init-config
```

This creates `/etc/sentinel/config.yaml` with sensible defaults.

---

## Config File Reference

```yaml
agent_id: "SENTINEL-prod-web-01"

thresholds:
  thermal_warning: 75.0    # Celsius
  thermal_critical: 88.0   # Celsius
  cpu_warning: 80.0        # Percent
  cpu_critical: 95.0       # Percent
  memory_warning: 80.0     # Percent
  memory_critical: 95.0    # Percent

webhook:
  url: "https://your-server.com/api/telemetry"
  interval_seconds: 60
  enabled: true

blocked_ips: []
```

### Fields

| Field | Description | Default |
|-------|-------------|---------|
| `agent_id` | Unique identifier for this agent instance. Auto-generated if not set. | `SENTINEL-<hostname>` |
| `thresholds.thermal_warning` | Temperature (Celsius) at which a warning is raised. | `75.0` |
| `thresholds.thermal_critical` | Temperature (Celsius) at which a critical alert is raised. | `88.0` |
| `thresholds.cpu_warning` | CPU usage percentage for warning threshold. | `80.0` |
| `thresholds.cpu_critical` | CPU usage percentage for critical threshold. | `95.0` |
| `thresholds.memory_warning` | Memory usage percentage for warning threshold. | `80.0` |
| `thresholds.memory_critical` | Memory usage percentage for critical threshold. | `95.0` |
| `webhook.url` | Endpoint URL for telemetry delivery (daemon and webhook modes). | -- |
| `webhook.interval_seconds` | How often (in seconds) the daemon sends telemetry. | `60` |
| `webhook.enabled` | Whether daemon mode sends telemetry on startup. | `true` |
| `blocked_ips` | List of IPs currently blocked by Sentinel's firewall rules. Managed automatically by `--block-ip` / `--unblock-ip`. | `[]` |

---

## Custom Config Path

To use a config file in a non-default location:

```bash
sentinel --config /path/to/my-config.yaml
```

---

## Overriding with CLI Flags

Most config values can be overridden at runtime with CLI flags. For example:

```bash
# Override agent ID and webhook interval
sentinel --forward --server https://dashboard.thinkengine.io \
  --agent-id custom-agent-01 \
  --interval 120
```

CLI flags always take precedence over values in `config.yaml`.
