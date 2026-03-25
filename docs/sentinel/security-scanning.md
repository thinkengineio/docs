---
sidebar_position: 5
title: Security Scanning
description: Enterprise security scanning modules
---

# Security Scanning

Sentinel includes a suite of enterprise security scanning modules for comprehensive endpoint hardening, threat detection, and vulnerability management.

:::note
Enterprise security modules are **Linux-only** (Ubuntu, Debian, RHEL, and similar). macOS builds include core monitoring and remediation but not the modules listed below.
:::

---

## Module Overview

| Feature | Flag | Description |
|---------|------|-------------|
| **CIS Hardening** | `--harden` | 11+ CIS benchmark checks (SSH, permissions, audit, firewall, etc.) |
| **System Inventory** | `--inventory` | Full osquery-level asset inventory (packages, users, services, kernel modules, SSH keys, cron jobs) |
| **File Integrity** | `--fim` | FIM scan of critical binaries, SUID/SGID detection, anomaly reporting |
| **Real-Time FIM** | `--fim-watch` | Continuous inotify/FSEvents monitoring; alerts on file changes within 1s |
| **Auth Audit** | `--auth-audit` | SSH login/failure tracking, sudo event analysis, brute force detection |
| **Container Audit** | `--container-audit` | Docker container enumeration, image scan, privileged container detection |
| **Threat Detection** | `--threat-detect` | EDR behavioral detection — deleted binaries, reverse shells, crypto miners, MITRE ATT&CK mapping |
| **Vulnerability Scan** | `--vuln-scan` | Package vuln scan (dpkg/rpm, pip-audit, npm audit, govulncheck, Trivy/Grype) + OSV.dev built-in |
| **OSV-Only Scan** | `--osv-only` | Direct OSV.dev API lookup — no external tools required |
| **Secrets Scanner** | `--secrets-scan` | Credential/API key/private key scanner with entropy detection |
| **Full Scan** | `--full-scan` | Enable ALL security modules (includes secrets scan) |

---

## Command Examples

### CIS Hardening Assessment

```bash
sentinel --harden
```

Runs 11+ CIS benchmark checks covering SSH configuration, file permissions, audit logging, firewall state, and more.

### System Inventory

```bash
sentinel --inventory
```

Collects a full system inventory: installed packages, user accounts, running services, kernel modules, cron jobs, and SSH keys.

### File Integrity Monitoring

```bash
# One-time FIM scan
sentinel --fim

# Real-time file change monitoring (continuous — Ctrl-C to stop)
sudo sentinel --fim-watch
```

The `--fim` flag scans critical system files and detects SUID/SGID binaries. The `--fim-watch` flag uses inotify for real-time alerting on file changes.

### Authentication Audit

```bash
sentinel --auth-audit
```

Analyzes SSH login attempts, sudo events, and detects brute force patterns.

### Container Security Audit

```bash
sentinel --container-audit
```

Enumerates Docker containers and images, detects privileged containers, and flags security misconfigurations.

### Behavioral Threat Detection

```bash
sentinel --threat-detect
```

EDR-style behavioral detection that identifies deleted binaries, reverse shells, crypto miners, and other threats. Findings are mapped to MITRE ATT&CK technique IDs.

### Vulnerability Scanning

```bash
# Full vulnerability scan (all available sources)
sentinel --vuln-scan

# OSV.dev API only — no external tools required
sentinel --vuln-scan --osv-only
```

Scans installed packages across dpkg, rpm, pip, npm, Go, and Docker images. The `--osv-only` flag queries the OSV.dev API directly without requiring pip-audit, npm, govulncheck, Trivy, or Grype.

### Secrets Scanning

```bash
sudo sentinel --secrets-scan
```

Scans the filesystem for leaked credentials, API keys, and private keys using 10 pattern types plus entropy detection.

### Full Scan

```bash
sentinel --full-scan
```

Enables all security modules in a single command, including secrets scanning.
