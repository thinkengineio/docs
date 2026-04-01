---
sidebar_position: 9
title: ATTM — Adversarial Testing
description: Validate your detection pipeline with synthetic MITRE ATT&CK events
---

# ATTM — Adversarial Telemetry Testing Module

ATTM is Sentinel's built-in adversarial stress-testing framework. It generates realistic, synthetic security events mapped to MITRE ATT&CK techniques so you can validate that your detection pipeline, correlation rules, and alerting thresholds actually fire when an attack occurs. Every event is tagged `synthetic: true` so it never contaminates real findings.

---

## CLI Usage

```bash
# List all available techniques
sentinel --attm-list

# Run all 19 built-in techniques at medium intensity
sentinel --attm

# Run specific techniques only
sentinel --attm --techniques T1110,T1003,T1048

# Use a custom playbook file
sentinel --attm --playbook /path/to/playbook.json

# Continuous mode — re-run every 5 minutes
sentinel --attm-watch

# Combine: custom playbook + specific techniques + continuous
sentinel --attm-watch --playbook /path/to/playbook.json --techniques T1110,T1059
```

### Flags

| Flag | Type | Description |
|------|------|-------------|
| `--attm` | bool | Run a single ATTM adversarial stress test |
| `--attm-list` | bool | Print JSON array of all registered techniques and exit |
| `--attm-watch` | bool | Run ATTM continuously on a 5-minute interval |
| `--techniques` | string | Comma-separated technique IDs to run (default: all) |
| `--playbook` | string | Path to a local playbook JSON file (default: built-in) |

---

## Built-in Techniques

ATTM ships with 19 MITRE ATT&CK techniques covering credential access, lateral movement, exfiltration, persistence, and more.

| ID | Name | Event Type | Description |
|----|------|------------|-------------|
| T1003 | OS Credential Dumping | threats | Simulates credential dump access targeting shadow files and memory |
| T1005 | Data from Local System | threats | Simulates sensitive file access and exfiltration staging activity |
| T1018 | Remote System Discovery | threats | Simulates network scanning and host discovery activity |
| T1021 | Remote Services | auth_audit | Simulates SSH-based lateral movement between internal hosts |
| T1027 | Obfuscated Files or Information | fim | Simulates base64-encoded payload drops in temporary directories |
| T1048 | DNS Exfiltration | dns_logs | Simulates DNS TXT queries to suspicious subdomains for data exfiltration |
| T1053 | Scheduled Task/Job | fim | Simulates malicious crontab modification events |
| T1059 | Command and Scripting Interpreter | threats | Simulates suspicious process spawns via shell interpreters |
| T1068 | Exploitation for Privilege Escalation | threats | Simulates SUID binary exploitation to escalate privileges to root |
| T1070 | Indicator Removal on Host | threats | Simulates log deletion and tampering to cover attack tracks |
| T1087 | Account Discovery | threats | Simulates user enumeration via passwd, ldap, and system commands |
| T1110 | Brute Force | auth_audit | Simulates repeated failed SSH/sudo login attempts |
| T1136 | Create Account | auth_audit | Simulates suspicious local user account creation events |
| T1190 | Exploit Public-Facing Application | threats | Simulates web application exploit attempts including SQLi and command injection |
| T1222 | File and Directory Permissions Modification | fim | Simulates chmod events on sensitive system files |
| T1547 | Boot or Logon Autostart Execution | fim | Simulates systemd service creation and shell profile modification for persistence |
| T1548 | Abuse Elevation Control Mechanism | auth_audit | Simulates sudo abuse and privilege escalation events |
| T1552 | Unsecured Credentials | secrets | Simulates access to credential files such as .env, SSH keys, and cloud config |
| T1566 | Phishing | threats | Simulates suspicious email attachment downloads and phishing indicators |

---

## Playbook Format

A playbook is a JSON file that specifies which techniques to run, at what intensity, and for how long.

```json
{
  "id": "custom-pentest-validation",
  "name": "Post-Pentest Detection Validation",
  "techniques": [
    {
      "id": "T1110",
      "name": "Brute Force",
      "intensity": "high",
      "duration": "60s",
      "params": {
        "target_user": "admin"
      }
    },
    {
      "id": "T1048",
      "name": "DNS Exfiltration",
      "intensity": "medium",
      "duration": "30s",
      "params": {}
    }
  ],
  "created_by": "security-team"
}
```

### Intensity Levels

| Level | Description |
|-------|-------------|
| `low` | Minimal events — quick validation |
| `medium` | Moderate volume (default) |
| `high` | High volume — stress test detection pipeline throughput |

The exact event count per level is technique-specific. For example, Brute Force generates 5 / 50 / 200 events at low / medium / high intensity.

### Playbook Resolution Order

1. `--playbook /path/to/file.json` — local file (highest priority)
2. Built-in default playbook — all 19 techniques at medium intensity with 30s duration

:::note
As of v2.3.0, server-side playbook fetch has been removed. The agent resolves playbooks locally using either a `--playbook` file or its built-in defaults. Results are POST-backed through `/api/sentinel/telemetry` to traverse the full ingestion pipeline.
:::

---

## Synthetic Event Tagging

Every event generated by ATTM carries metadata that identifies it as synthetic:

- `attm_metadata.synthetic = true` — marks the event as non-real
- `attm_metadata.technique_id` — the MITRE ATT&CK technique ID
- `attm_metadata.attm_run_id` — unique identifier for the ATTM run

This tagging ensures synthetic events are never confused with real detections and allows you to correlate generated events with detection hits.

---

## Detection Coverage

After an ATTM run, the result JSON includes a summary:

```json
{
  "summary": {
    "total_techniques": 19,
    "completed": 17,
    "failed": 0,
    "skipped": 2,
    "events_emitted": 850
  }
}
```

**Detection coverage** = `completed / total_techniques * 100%`

To measure actual end-to-end detection coverage, run ATTM and then query your SIEM or Sentinel's threat detection module to see which synthetic events were detected and alerted on. Use the `attm_run_id` field to correlate generated events with detection hits and build a coverage matrix: for each technique, check whether at least one corresponding alert was raised.
