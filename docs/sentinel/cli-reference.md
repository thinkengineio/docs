---
sidebar_position: 10
title: CLI Reference
description: Complete Sentinel command-line reference
---

# CLI Reference

Complete reference for all Sentinel command-line flags, organized by category.

---

## General

| Flag | Description |
|------|-------------|
| `--version` | Print version and exit |
| `--config <path>` | Path to config file (default: `/etc/sentinel/config.yaml`) |
| `--init-config` | Create default config file |
| `--json` | Output JSON telemetry to stdout and exit |

---

## Core Monitoring

| Flag | Description |
|------|-------------|
| `--asset-info` | Show full system asset information |
| `--check-updates` | Check for available OS updates |
| `--dns-connections` | Show current DNS connections (port 53) |
| `--dns-log` | Continuous DNS connection monitoring |
| `--dns-interval <seconds>` | DNS log polling interval in seconds (default: 2) |
| `--network-stats` | Show network interface statistics |
| `--process-hash <PID>` | Get SHA256 hash of process executable by PID |
| `--process-tree` | Show process tree with parent-child relationships |
| `--services` | List running services |
| `--top` | Show top processes by CPU/memory usage |
| `--top-count <N>` | Number of processes to show (default: 10) |

---

## Remediation

| Flag | Description |
|------|-------------|
| `--kill <PID>` | Terminate a process by PID |
| `--block-ip <IP>` | Block an IP address using pf / iptables |
| `--unblock-ip <IP>` | Unblock a previously blocked IP address |
| `--list-blocked` | List all blocked IP addresses |
| `--fix-firewall` | Enable the Application Firewall / ufw |
| `--restart-service <label>` | Restart a service by label |

---

## Network Diagnostics

| Flag | Description |
|------|-------------|
| `--dns <domain>` | DNS lookup for a domain (A, AAAA, MX, TXT, NS, CNAME) |
| `--traceroute <host>` | Trace network path to host |
| `--arp` | Show ARP table (local network devices) |
| `--pcap <interface>` | Capture packets on interface (requires sudo) |
| `--pcap-count <N>` | Number of packets to capture (default: 20) |
| `--scan-ports <target>` | Scan ports on target (e.g., `localhost`, `192.168.1.1`) |
| `--port-range <range>` | Port range to scan (default: `1-1024`) |
| `--security-audit` | Run security posture audit |

---

## Enterprise Security (Linux)

| Flag | Description |
|------|-------------|
| `--harden` | Run CIS hardening benchmark checks |
| `--inventory` | Collect full system inventory (packages, users, services, kernel modules) |
| `--fim` | File integrity monitoring (critical files, SUID binaries, anomalies) |
| `--fim-watch` | Real-time inotify file change monitoring (continuous) |
| `--auth-audit` | Auth log analysis (SSH logins, sudo events, brute force detection) |
| `--container-audit` | Docker container security audit (images, privileged, capabilities) |
| `--threat-detect` | Behavioral threat detection with MITRE ATT&CK mapping |
| `--vuln-scan` | Vulnerability scanning (dpkg, rpm, pip, npm, Go, Docker images) |
| `--osv-only` | Force OSV.dev API lookup, skip external tools |
| `--secrets-scan` | Scan for credentials, API keys, and private keys |
| `--full-scan` | Enable ALL enterprise security modules (including secrets) |

---

## Adversarial Testing (ATTM)

| Flag | Description |
|------|-------------|
| `--attm` | Run ATTM adversarial stress test |
| `--attm-list` | List available ATTM techniques (JSON) |
| `--attm-watch` | Continuous ATTM stress test mode (5-min interval) |
| `--techniques <IDs>` | Comma-separated technique IDs to filter |
| `--playbook <path>` | Path to local ATTM playbook JSON file |

---

## Fleet / Reporting

| Flag | Description |
|------|-------------|
| `--forward` | Enable forward mode (send telemetry to server) |
| `--server <URL>` | Server URL for forward mode |
| `--api-key <key>` | Sentinel API key for authentication |
| `--agent-id <id>` | Agent identifier (auto-generated if not set) |
| `--tags <tags>` | Comma-separated agent tags |
| `--interval <seconds>` | Forward interval in seconds (default: 30) |
| `--webhook <URL>` | Send telemetry to webhook URL (one-shot) |
| `--daemon` | Run as daemon, sending telemetry to configured webhook |
