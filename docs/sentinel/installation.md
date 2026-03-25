---
sidebar_position: 2
title: Installation
description: Install the Sentinel agent on macOS or Linux
---

# Installation

## Option A: Download Pre-built Binary (Recommended)

Download the latest release for your platform from the [GitHub Releases page](https://github.com/thinkengineio/sentinel-maas/releases).

### macOS

| Platform | Binary |
|----------|--------|
| **Apple Silicon** (M1/M2/M3/M4) | `sentinel-darwin-arm64` |
| **Intel Mac** | `sentinel-darwin-amd64` |

```bash
# For Apple Silicon (M1/M2/M3/M4)
curl -LO https://github.com/thinkengineio/sentinel-maas/releases/latest/download/sentinel-darwin-arm64
chmod +x sentinel-darwin-arm64
sudo mv sentinel-darwin-arm64 /usr/local/bin/sentinel

# For Intel Mac
curl -LO https://github.com/thinkengineio/sentinel-maas/releases/latest/download/sentinel-darwin-amd64
chmod +x sentinel-darwin-amd64
sudo mv sentinel-darwin-amd64 /usr/local/bin/sentinel
```

### Linux

| Platform | Binary |
|----------|--------|
| **Linux x86_64** | `sentinel-linux-amd64` |
| **Linux ARM64** (AWS Graviton, OCI A1, RPi) | `sentinel-linux-arm64` |

```bash
# For Linux x86_64
curl -LO https://github.com/thinkengineio/sentinel-maas/releases/latest/download/sentinel-linux-amd64
chmod +x sentinel-linux-amd64
sudo mv sentinel-linux-amd64 /usr/local/bin/sentinel

# For Linux ARM64 (AWS Graviton, OCI Ampere, Raspberry Pi)
curl -LO https://github.com/thinkengineio/sentinel-maas/releases/latest/download/sentinel-linux-arm64
chmod +x sentinel-linux-arm64
sudo mv sentinel-linux-arm64 /usr/local/bin/sentinel
```

:::note
Enterprise security modules (hardening, FIM, threat detection, inventory, container audit, auth audit, vuln scan, secrets scan) are **Linux-only**. macOS builds include core monitoring and remediation.
:::

---

## Option B: Build from Source

```bash
git clone https://github.com/thinkengineio/sentinel-maas.git
cd sentinel-maas
go mod tidy
go build -ldflags "-s -w" -o sentinel ./cmd/sentinel/
sudo mv sentinel /usr/local/bin/
```

**Requires:** Go 1.24+

---

## Requirements

### macOS

- macOS Ventura or later (recommended), Intel and Apple Silicon
- Root privileges for thermal sensors, firewall, and process control
- Go 1.24+ (for building from source only)

### Linux

- Ubuntu 20.04+, Debian 11+, RHEL 8+, or similar
- Root privileges for firewall (iptables/ufw) and service management
- **lm-sensors** (optional, for temperature monitoring)
- **systemd** for service management
- Go 1.24+ (for building from source only)

**Optional** for enhanced vulnerability scanning:

- **pip-audit** / **pip** (Python vulnerability scanning)
- **npm** (Node.js vulnerability scanning)
- **govulncheck** (Go binary vulnerability scanning)
- **trivy** or **grype** (Docker image vulnerability scanning)

:::tip
`--vuln-scan --osv-only` requires none of the above tools — it queries the OSV.dev API directly.
:::

---

## Platform Support Matrix

| Feature | macOS | Linux |
|---------|-------|-------|
| CPU/Memory Monitoring | Yes | Yes |
| Temperature Monitoring | Yes (powermetrics) | Yes (/sys/class/thermal) |
| Process Management | Yes | Yes |
| Network Stats | Yes | Yes |
| Port Scanning | Yes | Yes |
| Firewall Control | Yes (pf) | Yes (iptables/ufw) |
| Service Management | Yes (launchd) | Yes (systemd) |
| Security Audit | Yes | Yes |
| TUI Dashboard | Yes | Yes |
| CIS Hardening | Yes (darwin checks) | Yes (11 CIS checks) |
| System Inventory | -- | Yes (packages, users, services, modules) |
| File Integrity (FIM) | -- | Yes (critical files, SUID detection) |
| Real-Time FIM Watch | -- | Yes (inotify streaming) |
| Auth Audit | -- | Yes (SSH/sudo/brute force) |
| Container Audit | -- | Yes (Docker enumeration + image scan) |
| Threat Detection (EDR) | -- | Yes (behavioral + MITRE mapping) |
| Vulnerability Scan | -- | Yes (dpkg/rpm/pip/npm/Go/Docker + OSV.dev) |
| Secrets Scanner | -- | Yes (10 pattern types + entropy detection) |
| Persistent Store | -- | Yes (SQLite) |
