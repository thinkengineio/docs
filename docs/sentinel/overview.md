---
sidebar_position: 1
title: Overview
description: Sentinel MaaS — AI-native security monitoring agent
---

# Sentinel MaaS

### AI-Native Monitoring-as-a-Service Agent

**Sentinel** is a cross-platform security monitoring agent that gives AI assistants deep visibility into endpoint health and security posture. It collects system telemetry (thermals, network flows, security logs), performs enterprise-grade security scanning (CIS hardening, vulnerability detection, threat hunting, file integrity), and enables AI-driven remediation actions.

```
┌──────────────────────────────────────────────────────────────────────────┐
│ Sentinel v2.1.x - Enterprise Security Monitoring Agent                  │
├──────────────────────────────────────────────────────────────────────────┤
│  EYES:      CPU, Thermals, Network Flows, DNS, ARP, Security Logs      │
│  HANDS:     Kill Processes, Block IPs, Port Scan, Traceroute, PCAP     │
│  SECURITY:  CIS Hardening, FIM, Threat Detection, Vuln Scanning       │
│  INVENTORY: Packages, Users, Services, Kernel Modules, SSH Keys        │
│  SECRETS:   Credential/API Key Scanner (AWS, GitHub, SSH, env files)   │
│  FLEET:     Forward 13 event types to ThinkEngine Dashboard            │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Capabilities at a Glance

| Category | What it does |
|----------|-------------|
| **Eyes** (Monitoring) | 14 real-time telemetry collectors — CPU, thermals, network flows, DNS, ARP, process trees, firewall state, and more. See [Monitoring](./monitoring.md). |
| **Hands** (Remediation) | Kill processes, block/unblock IPs, enable firewalls, restart services, port scanning, packet capture. See [Remediation](./remediation.md). |
| **Security** (Enterprise Scanning) | CIS hardening benchmarks, file integrity monitoring (FIM), behavioral threat detection with MITRE ATT&CK mapping, vulnerability scanning, secrets detection. See [Security Scanning](./security-scanning.md). |
| **Fleet** (Remote Reporting) | Forward 13 event types to the ThinkEngine dashboard via webhook, daemon mode, or forward mode. See [Fleet Mode](./fleet-mode.md). |
| **ATTM** (Adversarial Testing) | Generate synthetic MITRE ATT&CK events to validate your detection pipeline. See [ATTM](./attm.md). |

---

## Platform Support

Sentinel runs on **macOS** and **Linux**:

- **macOS** — Core monitoring, remediation, TUI dashboard, and CIS hardening checks (Intel and Apple Silicon)
- **Linux** — Full feature set including all enterprise security modules (CIS hardening, FIM, threat detection, vulnerability scanning, secrets scanning, container audit, auth audit)

See [Installation](./installation.md) for download links and the full platform support matrix.

---

## What's New in v2.3.0

### ATTM Fire Drills — Agent-Initiated Architecture

v2.3.0 overhauls ATTM into an **agent-initiated fire drill** model. Instead of the server pushing playbooks to endpoints, each Sentinel agent now runs its 19 built-in MITRE ATT&CK techniques locally and POST-backs results through the real telemetry pipeline (`/api/sentinel/telemetry`). This means fire drill events traverse the same ingestion, correlation, and alerting path as real threats -- validating your entire detection stack end-to-end.

**Key changes in v2.3.0:**

- **Agent POST-back flow** -- ATTM results are submitted as standard telemetry, so every layer of your pipeline (ingestion, correlation rules, alerting thresholds) is exercised.
- **Simplified playbook resolution** -- the agent uses its built-in default playbook or a local `--playbook` file. Server-side playbook CRUD and execution scheduling have been removed.
- **Detection coverage matrix** -- after a fire drill, the platform builds a per-technique coverage matrix showing which of the 19 techniques triggered a detection and which did not.
- **Auto GRC control mapping** -- fire drill results automatically map to relevant GRC controls. When a technique is detected successfully, the corresponding control receives evidence that its detection capability is validated. Failed detections surface as control gaps in the GRC module.

### GRC Integration

ATTM fire drills feed directly into the GRC compliance workflow:

| What happens | Where it shows up |
|---|---|
| Technique detected successfully | GRC control receives automated evidence artifact (type: `attm_fire_drill`) |
| Technique not detected | GRC control flagged with a detection gap nonconformity |
| Coverage matrix updated | Security Analytics > GRC Validation tab |
| MITRE coverage stats refreshed | MITRE ATT&CK heatmap (`/mitre`) |

This closes the loop between adversarial testing and compliance -- you can prove to auditors that your detection controls are validated on a recurring schedule, with machine-generated evidence.

See [ATTM — Adversarial Testing](./attm.md) for CLI usage and technique details, and [Release Notes](/downloads/release-notes#v230) for the full changelog.

---

## What's New in v2.1.0

### ATTM — Adversarial Telemetry Testing Module

v2.1.0 adds ATTM, a built-in adversarial stress-testing framework. It generates realistic, synthetic security events mapped to 19 MITRE ATT&CK techniques to validate that your detection pipeline, correlation rules, and alerting thresholds fire correctly. Run `--attm` for a single pass, `--attm-watch` for continuous mode, or supply a custom playbook with `--playbook`. All events are tagged `synthetic: true` so they never contaminate real findings.

### New Flags in v2.1.0

| Flag | Description |
|------|-------------|
| `--attm` | Run ATTM adversarial stress test |
| `--attm-list` | List available ATTM techniques (JSON) |
| `--attm-watch` | Continuous ATTM stress test mode (5-min interval) |
| `--techniques` | Comma-separated technique IDs to filter |
| `--playbook` | Path to local ATTM playbook JSON file |

See [ATTM — Adversarial Testing](./attm.md) for full documentation.

---

## What's New in v2.0.0

### Architecture Overhaul

v2.0.0 is a complete architectural rewrite with a clean package hierarchy, persistent SQLite store, and in-process event bus.

| Component | v1.x | v2.0 |
|-----------|------|-------|
| Persistence | None | SQLite (FIM baselines, metric history, vuln results) |
| Real-time FIM | Scan-only `--fim` | `--fim-watch` inotify/FSEvents streaming |
| Vuln lookup | External tools only | Built-in OSV.dev API + external tool augmentation |
| Credential scanning | None | `--secrets-scan` (10 pattern types + entropy detection) |
| Build | Single platform | Cross-compiled: darwin-amd64/arm64, linux-amd64/arm64 |

### New Flags in v2.0.0

| Flag | Description |
|------|-------------|
| `--secrets-scan` | Scan for credentials, API keys, and private keys |
| `--fim-watch` | Real-time inotify file change monitoring (continuous) |
| `--osv-only` | Force OSV.dev API vulnerability lookup, skip external tools |

All existing flags from v1.x are fully preserved and backward compatible.

---

## Endpoints Page

The **Endpoints** page in the ThinkEngine dashboard (`/sentinel/endpoints`) is the central hub for managing and inspecting your monitored infrastructure. It is organized into three tabs:

### Fleet Tab

The default view lists all monitored endpoints with status, platform, last-seen time, hardening score, and open vulnerability counts. This is the same fleet overview previously available at the top level.

### SBOM Tab

The **SBOM** (Software Bill of Materials) tab provides a full inventory for each endpoint:

| Category | Details |
|---|---|
| **Packages** | All installed packages with versions |
| **Users** | Local user accounts and groups |
| **Services** | Running and enabled system services |
| **Open Ports** | Listening ports with associated processes |
| **Cron Jobs** | Scheduled tasks and cron entries |
| **Mounts** | Mounted filesystems and volumes |

SBOM data is collected by the Sentinel agent's inventory module and updated on each scan interval. You can **export** SBOM data in three formats: **CSV**, **JSON**, and **PDF**.

### Search Tab

The **Search** tab lets you query endpoint telemetry -- search across all security modules for events on any endpoint. This functionality was previously located in Security Analytics and has been moved here for direct context alongside endpoint data.

Search supports filtering by module (`hardening`, `vulnerabilities`, `threats`, `fim`, etc.), severity level, and free-text query.
