---
sidebar_position: 6
title: Remediation
description: Automated remediation and network diagnostics
---

# Remediation (The Hands)

Sentinel provides active remediation capabilities for incident response and network diagnostics.

---

## Remediation Commands

| Feature | Command | Description |
|---------|---------|-------------|
| **Kill Process** | `--kill <PID>` | Terminate runaway processes |
| **Block IP** | `--block-ip <IP>` | Block malicious IPs via pf / iptables |
| **Unblock IP** | `--unblock-ip <IP>` | Remove IP from blocklist |
| **List Blocked** | `--list-blocked` | List all blocked IP addresses |
| **Fix Firewall** | `--fix-firewall` | Enable Application Firewall / ufw |
| **Restart Service** | `--restart-service <label>` | Restart launchd / systemd services |
| **Port Scanner** | `--scan-ports <target>` | Scan for open ports |
| **Security Audit** | `--security-audit` | Security posture assessment |

## AI Remediation Actions (v2.4.0+)

When connected to the ThinkEngine platform, Sofia can send signed MCP commands to the Sentinel agent for automated remediation. These actions are executed via the HTTPS remediation listener.

| Action | Safety Tier | Description |
|--------|-------------|-------------|
| `fix_file_permissions` | auto | Tighten permissions on allowlisted system files |
| `enable_firewall` | auto | Enable ufw or firewalld |
| `restart_service` | auto | Restart a systemd service |
| `hardening_fix_sysctl` | auto | Write sysctl params + apply (v2.4.0) |
| `hardening_fix_passwd_policy` | auto | Update /etc/login.defs password policy (v2.4.0) |
| `hardening_fix_tmpfs` | auto | Mount /tmp as tmpfs with restricted options (v2.4.0) |
| `rescan_module` | auto | Re-run a scan module and return results (v2.4.0) |
| `block_ip` | approval | Block an IP via iptables |
| `unblock_ip` | approval | Remove an IP block |
| `terminate_process` | approval | Send SIGTERM to a PID |
| `package_update` | approval | Update a specific package |

**Safety tiers:**
- **auto** -- Sofia executes immediately without human approval
- **approval** -- queued for human review in the dashboard before execution

### Examples

```bash
# Kill a runaway process
sudo sentinel --kill 12345

# Block a suspicious IP
sudo sentinel --block-ip 192.168.1.100

# Unblock an IP
sudo sentinel --unblock-ip 192.168.1.100

# List all blocked IPs
sentinel --list-blocked

# Enable firewall
sudo sentinel --fix-firewall

# Restart a service
sudo sentinel --restart-service com.apple.example

# Scan ports on a target
sentinel --scan-ports localhost --port-range 80,443,22
```

---

## Network Diagnostic Commands

| Feature | Command | Description |
|---------|---------|-------------|
| **DNS Lookup** | `--dns <domain>` | Resolve DNS records (A, AAAA, MX, TXT, NS, CNAME) |
| **Traceroute** | `--traceroute <host>` | Trace network path to host |
| **ARP Table** | `--arp` | Show local network devices (IP/MAC mapping) |
| **Packet Capture** | `--pcap <interface>` | Capture network packets (requires sudo) |
| **DNS Log** | `--dns-log` | Continuous DNS connection monitoring |

### Examples

```bash
# DNS lookup with full records
sentinel --dns google.com

# Trace route to host
sentinel --traceroute 8.8.8.8

# Show ARP table (local network devices)
sentinel --arp

# Capture packets on interface (requires sudo)
sudo sentinel --pcap en0 --pcap-count 20

# Continuous DNS connection monitoring
sentinel --dns-log --dns-interval 2
```
