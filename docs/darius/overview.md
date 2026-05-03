---
sidebar_position: 1
title: Overview
description: Darius DAST — Dynamic Application Security Testing
---

# Darius DAST

### Dynamic Application Security Testing

**Darius** is ThinkEngine's DAST scanner -- a cross-platform binary that scans web applications, APIs, and microservices for security vulnerabilities. It runs on your infrastructure, keeps findings under your control, and integrates with the ThinkEngine platform for correlation, compliance evidence, and remediation tracking.

---

## What Darius Does

Darius combines multiple scanning engines into a single binary:

| Capability | What it scans |
|--------|--------------|
| **Vulnerability Templates** | 7,000+ templates covering known CVEs, misconfigurations, and exposures |
| **Browser Engine** | JavaScript-rendered pages, SPAs, and authenticated flows that require a real browser |
| **API Fuzzer** | API endpoints defined in OpenAPI/Swagger specs -- injects payloads across 5 attack categories |

Darius produces structured findings with CVSS scores, CWE classifications, and reproduction steps.

---

## Tiers

| Feature | Community (Free) | Professional ($399/yr) | Enterprise (Platform) |
|---------|-----------------|----------------------|----------------------|
| Scan coverage | Quick scans (top 100 templates) | All profiles (7,000+ templates) | All profiles (7,000+ templates) |
| Engine | Template scanner only | Full engine (templates + browser + API fuzzer) | Full engine (templates + browser + API fuzzer) |
| Output | JSON to stdout | HTML reports + local SQLite history | HTML reports + SaaS integration |
| Network | No network required | Offline -- works on pentester laptops | Findings flow into ThinkEngine platform |
| Account | No account needed | Account for license delivery only | Full team workspace |

### Enterprise-Only Features

- SAST + DAST correlation (cross-reference static analysis findings with runtime vulnerabilities)
- CVE auto-enrichment (CISA KEV match detection, auto-escalation)
- MITRE ATT&CK mapping for DAST findings
- Compliance evidence generation (NIST SI-6, CA-8, RA-5, SI-2)
- Scheduled recurring scans with webhook delivery
- Slack, Jira, and email notifications
- Multi-user RBAC

---

## How It Works

```
                     Your Infrastructure
┌──────────────────────────────────────────────────────┐
│                                                      │
│   darius scan --target https://app.example.com       │
│         │                                            │
│         ├── Vulnerability templates (CVE/misconfig)  │
│         ├── Browser engine (SPA, auth flows, DOM XSS)│
│         └── API fuzzer (injection, auth bypass)      │
│                                                      │
│   → JSON/HTML findings (never leave your machine     │
│     unless you opt into SaaS integration)            │
│                                                      │
└──────────────────────────────────────────────────────┘
         │ (Enterprise tier only)
         ↓
   ThinkEngine Platform
   → Findings tab → GRC pipeline → Remediation tracking
```

---

## Platform Support

Darius runs on **macOS**, **Linux**, and **Windows**:

| Platform | Binary |
|----------|--------|
| macOS Apple Silicon | `darius-darwin-arm64` |
| macOS Intel | `darius-darwin-amd64` |
| Linux x86_64 | `darius-linux-amd64` |
| Linux ARM64 | `darius-linux-arm64` |
| Windows x86_64 | `darius-windows-amd64.exe` |

---

## Quick Start

### 1. Download

Download the latest release for your platform from the ThinkEngine dashboard under **DAST > Settings**, or from the [Downloads](/downloads/sentinel-agent) page.

### 2. Run a scan

```bash
# Community: quick scan, JSON output
darius scan --target https://app.example.com

# Professional: full scan with HTML report
darius scan --target https://app.example.com --profile full --report html

# OpenAPI fuzzing
darius scan --target https://app.example.com --openapi ./openapi.yaml
```

### 3. View findings

- **Community/Professional**: findings are output to stdout (JSON) or saved as an HTML report locally.
- **Enterprise**: findings are uploaded to the ThinkEngine platform and appear in the **Findings** tab, feeding into GRC controls and remediation workflows.

---

## Authentication and Licensing

| Tier | Auth mechanism |
|------|---------------|
| Community | None -- runs without any account or network access |
| Professional | RS256 JWT license key (delivered to your account, verified locally) |
| Enterprise | API key + mTLS client certificate (issued from the ThinkEngine dashboard) |

### Domain Verification (Enterprise)

Enterprise scans require domain ownership verification before scanning. This prevents unauthorized scanning of third-party targets. Verification is done via DNS TXT record or HTTP file placement.

---

## EULA and Scan Guard

On first run, Darius displays a click-through EULA that must be accepted. Additionally, when targeting public-facing domains, a scan guard prompt confirms you have authorization to scan the target. This prevents accidental or unauthorized scanning of production systems you do not own.

---

## Integration with ThinkEngine

When connected to the ThinkEngine platform (Enterprise tier), Darius findings flow through the full security pipeline:

1. **Findings** -- appear in the unified Findings tab alongside SAST, Sentinel, and other sources
2. **GRC** -- critical/high findings auto-generate compliance evidence (NIST CA-8, RA-5, SI-2, SI-6)
3. **MITRE** -- findings are mapped to MITRE ATT&CK techniques via CWE correlation
4. **CVE Enrichment** -- findings matched against known CVEs with CISA KEV escalation
5. **Scheduled Scans** -- configure recurring scans with HMAC-authenticated webhook result delivery
