---
sidebar_position: 2
title: Release Notes
description: Sentinel agent release history
---

# Release Notes

Release history for the Sentinel agent. Download the latest version from the [Sentinel Agent](/downloads/sentinel-agent) page.

---

## v2.4.1

**Remediation Listener Wiring**

Completes the Tier 3 AI remediation pipeline by wiring the HTTPS remediation listener into the Sentinel binary's `main()`.

- **`--remediation-listen`** flag -- starts the remediation endpoint (background goroutine in forward mode, blocking in standalone)
- **`--remediation-port`** flag (default `9443`) -- configurable listener port
- **`--remediation-key`** flag -- HMAC shared key (fallback: `SENTINEL_REMEDIATION_KEY` env var)
- TLS via `SENTINEL_TLS_CERT` / `SENTINEL_TLS_KEY` env vars
- Fixes: handlers compiled since v2.4.0 but listener was never started

---

## v2.4.0

**AI Remediation Handlers + Rescan Module**

Adds 4 new remediation handlers to the Sentinel agent, enabling Sofia's AI remediation loop to execute OS-level hardening fixes and verify them via re-scan.

- **`hardening_fix_sysctl`** -- write sysctl params to `/etc/sysctl.d/99-sofia-hardening.conf` and apply. Supports updating existing keys or appending new ones.
- **`hardening_fix_passwd_policy`** -- update `/etc/login.defs` password aging policy (PASS_MAX_DAYS, PASS_MIN_DAYS, PASS_MIN_LEN).
- **`hardening_fix_tmpfs`** -- mount `/tmp` as tmpfs with restricted options (nosuid, nodev, noexec) via fstab.
- **`rescan_module`** -- re-run a specific security scan module (hardening) and return results. Read-only action used by the verification loop to confirm fixes worked.
- All handlers create `.bak` backups before modifying system files.
- **11 total remediation actions** (was 7 in v2.3.3).

---

## v2.3.3

**Vulnerability Severity Fix — CVSS Parsing + NVD Fallback**

Resolves UNKNOWN severity for the majority of CVEs reported by the OSV scanner.

- **CVSS v3.1 vector parsing** -- OSV returns CVSS vector strings (not text labels) for many Debian CVEs; the scanner now computes base scores per the FIRST specification
- **NVD API fallback** -- for CVEs where OSV returns no severity data at all, the scanner queries NVD's REST API as a fallback (rate-limited, capped at 50 lookups per scan cycle)
- **In-memory cache** -- NVD results are cached across scan cycles to avoid redundant lookups
- **Optional `NVD_API_KEY`** -- set this env var to increase NVD rate limits from 5 req/30s to 50 req/30s

---

## v2.3.2

**Self-Rotate on Sustained 401s**

- **Automatic credential rotation** -- agent detects sustained 401 rejections and self-rotates its API key to recover without manual intervention

---

## v2.3.1

**Config File API Key Support**

- **`config.yaml` API key** -- read `apiKey` from `/etc/sentinel/config.yaml` instead of requiring `-api-key` CLI flag (eliminates key exposure in `ps` output)

---

## v2.3.0

**ATTM Fire Drill — Agent-Initiated Architecture**

This release updates ATTM to an agent-initiated flow where the endpoint runs synthetic MITRE techniques and reports results back through the real network/API pipeline.

- **Agent POST-back** -- ATTM results are sent via `/api/sentinel/telemetry`, traversing the full ingestion pipeline
- **Simplified playbook resolution** -- agent uses built-in default or local `--playbook` file (removed server-side fetch)
- **Cleaned up dead endpoints** -- removed server-side playbook CRUD and execution scheduling
- **Fixed Go module version** -- corrected `go.mod` from 1.25.0 to 1.23.0

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
