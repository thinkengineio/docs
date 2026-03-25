---
sidebar_position: 2
title: Release Notes
description: Sentinel agent release history
---

# Release Notes

Release history for the Sentinel agent. Download the latest version from the [Sentinel Agent](/downloads/sentinel-agent) page.

---

## v2.1.0

**Adversarial Testing Module (ATTM)**

This release introduces the ATTM module -- an adversarial testing framework that lets you validate your security controls against real-world attack techniques.

- **19 MITRE ATT&CK techniques** covering persistence, privilege escalation, defense evasion, credential access, discovery, lateral movement, and exfiltration
- **`--attm` flag** to run one-shot adversarial tests against your endpoints
- **`--attm-watch` mode** for continuous adversarial testing on a schedule
- **`--playbook` support** to define custom test sequences in YAML
- **Intensity levels** (low, medium, high) to control test aggressiveness and scope
- All tests are non-destructive by default with automatic cleanup

---

## v2.0.0

**Major Architecture Rewrite**

A ground-up rebuild of the Sentinel agent with a focus on reliability, structured output, and cross-platform support.

- **SQLite persistence** -- scan results and telemetry are stored locally, surviving agent restarts and network interruptions
- **Real-time File Integrity Monitoring** -- `--fim-watch` for continuous filesystem change detection with inotify/kqueue support
- **Secrets scanner** -- `--secrets-scan` detects hardcoded API keys, tokens, and credentials in files and repositories
- **OSV.dev vulnerability lookup** -- `--osv-only` queries the Open Source Vulnerabilities database for known CVEs in your dependencies
- **Cross-compiled binaries** for 4 platforms (macOS ARM64/AMD64, Linux ARM64/AMD64) with zero external dependencies
- **Structured JSON error codes** for machine-readable output and integration with automation pipelines

---

## v1.6.0

**Enterprise Security Modules**

Added a suite of enterprise-grade security scanning modules for Linux servers and cloud workloads.

- **CIS Hardening Audit** -- benchmark your system configuration against CIS standards
- **System Inventory** -- automated hardware and software inventory collection
- **File Integrity Monitoring** -- baseline-and-compare FIM for compliance workflows
- **Authentication Audit** -- review user accounts, SSH keys, sudo configuration, and login history
- **Container Audit** -- scan Docker and OCI container configurations for misconfigurations
- **Threat Detection** -- heuristic and signature-based detection of suspicious processes, files, and network activity
- **Vulnerability Scanning** -- scan installed packages against known vulnerability databases

---

## Full Changelog

For the complete commit history and all releases, visit the [Sentinel GitHub repository](https://github.com/thinkengineio/sentinel-maas/releases).
