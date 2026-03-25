---
sidebar_position: 4
title: Monitoring
description: System telemetry and monitoring capabilities
---

# Monitoring (The Eyes)

Sentinel provides 14 real-time monitoring capabilities for comprehensive endpoint visibility.

## Feature Overview

| Feature | Description |
|---------|-------------|
| **CPU & Thermal** | Real-time load, die temperature with configurable thresholds |
| **Network Flows** | Zeek-style connection tracking (Process to IP mapping) |
| **Security Logs** | Live `com.apple.securityd` / `journalctl` event stream |
| **DNS Monitoring** | Real-time DNS query logging and connection tracking |
| **DNS Lookup** | Full DNS resolution (A, AAAA, MX, TXT, NS, CNAME) |
| **Traceroute** | Network path analysis with hop latency |
| **ARP Table** | Local network device discovery (IP/MAC mapping) |
| **Packet Capture** | Lightweight tcpdump-style traffic capture |
| **Process Tree** | Process hierarchy (parent-child) relationships |
| **Process Hash** | SHA256 hash verification for running processes |
| **Firewall Status** | Monitors pf / iptables / ufw / Application Firewall state |
| **Top Processes** | CPU/memory sorted process list |
| **Asset Inventory** | Full system hardware/software inventory |
| **Network Stats** | Interface bandwidth and connection counts |

---

## TUI Dashboard

Launch the interactive terminal dashboard for real-time system health:

```bash
sudo sentinel
```

The TUI displays CPU, memory, thermals, network flows, and top processes in a live-updating terminal interface. Press `q` to quit.

---

## JSON Telemetry Output

For programmatic consumption or AI integration, use JSON mode:

```bash
sudo sentinel --json
```

This outputs structured JSON suitable for MCP tools, SIEM ingestion, or custom dashboards:

```json
{
  "agent_id": "SENTINEL-prod-web-01",
  "timestamp": "2026-03-17T10:30:00Z",
  "threat_level": "LOW",
  "cpu_load": "1.25",
  "temperature": "52",
  "firewall_status": "ACTIVE",
  "flows": [...]
}
```

---

## Monitoring Commands

```bash
# Show full system asset information
sentinel --asset-info

# Check for available OS updates
sentinel --check-updates

# Show current DNS connections (port 53)
sentinel --dns-connections

# Continuous DNS connection monitoring
sentinel --dns-log --dns-interval 2

# Show network interface statistics
sentinel --network-stats

# Get SHA256 hash of a process executable by PID
sentinel --process-hash 1234

# Show process tree with parent-child relationships
sentinel --process-tree

# List running services
sentinel --services

# Show top processes by CPU/memory usage
sentinel --top

# Show top 20 processes (default is 10)
sentinel --top --top-count 20
```
