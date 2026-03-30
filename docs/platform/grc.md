---
sidebar_position: 4
title: GRC
description: Governance, Risk & Compliance — tabbed dashboard with Sofia AI compliance engine
---

# Governance, Risk & Compliance (GRC)

The GRC module helps you manage compliance obligations, track risks, and collect audit evidence -- all in one place. Whether you are preparing for an audit, mapping controls to multiple frameworks, or tracking remediation of compliance gaps, GRC provides the structure and visibility you need.

## GRC Command Dashboard

The GRC page (`/grc`) is a unified tabbed interface containing:

| Tab | Description |
|---|---|
| **Overview** | Framework compliance percentages, open risks, pending evidence, active NCRs |
| **Risks** | Risk register with heatmap and scoring |
| **Controls** | Control requirements mapped to frameworks |
| **Evidence** | Audit evidence uploads linked to controls |
| **Policies** | Security and compliance policy management |
| **Vendors** | Third-party vendor assessment and risk tracking |
| **NCRs** | Non-conformity reports (auto-generated and manual) |
| **Trust Center** | Customer-facing compliance posture page |

## Compliance Frameworks

ThinkEngine supports tracking against industry-standard compliance frameworks including:

- **SOC 2** (Type I and Type II)
- **ISO 27001**
- **NIST Cybersecurity Framework (CSF)**
- **CIS Controls**
- **PCI DSS**
- **HIPAA**
- **GDPR** (technical controls)

Controls that overlap across frameworks are automatically cross-mapped -- evidence uploaded once applies everywhere it is relevant.

## Compliance-Aware Risk Scoring

Findings from the SOC and Triage modules are automatically scored with compliance context:

- **Framework detection** -- Assets are auto-tagged with applicable frameworks (HIPAA for healthcare systems, PCI-DSS for payment infrastructure, GDPR for EU data stores)
- **Compliance boost** -- Findings on compliance-scoped assets receive a risk score boost (HIPAA +15, PCI-DSS +12, GDPR +10, capped at +25)
- **Regulatory deadlines** -- Findings on compliance-scoped assets get a regulatory reporting deadline based on the strictest applicable framework

### Regulatory Deadline Reference

| Framework | S1 Critical | S2 High | S3 Medium | S4 Low |
|---|---|---|---|---|
| **NIST** | 1 hour | 24 hours | 72 hours | 30 days |
| **GDPR** | 72 hours | 7 days | 30 days | 90 days |
| **HIPAA** | 24 hours | 60 days | 60 days | 180 days |
| **PCI-DSS** | 24 hours | 72 hours | 30 days | 90 days |

## Sofia Compliance Engine

Sofia runs a background compliance sweep every 5 minutes, checking all findings with regulatory deadlines:

### 3-Tier Auto-Escalation

| Tier | Trigger | Action |
|---|---|---|
| **Tier 1 -- Nudge** | 50% of deadline elapsed | Sofia adds a reminder comment to the finding timeline |
| **Tier 2 -- Draft NCR** | 90% of deadline elapsed | Auto-generates a draft Non-Conformity Report for GRC review |
| **Tier 3 -- Breach** | 100% of deadline elapsed | Opens the NCR, marks control FAILED, fires webhook notification to GRC team |

### Manual Sweep

Trigger a compliance sweep on demand:
- **API**: `POST /api/compliance/sweep`
- **Chat**: Ask Sofia "run compliance sweep"

## Nonconformities (NCRs)

Nonconformities represent compliance gaps. They can be:

- **Auto-generated** -- Created by Sofia's compliance engine when regulatory deadlines are breached (Tier 2/3)
- **Manually created** -- Added by your team during internal audits or assessments

Each nonconformity includes:

- **Severity** -- Major, minor, or observation
- **Source** -- Internal audit, external audit, management review, incident, customer complaint, self-identified
- **Affected controls** -- Which controls are impacted
- **Root cause** -- Linked to the original finding
- **Remediation plan** -- Steps to close the gap, with an owner and target date
- **Evidence** -- Auto-attached from Sentinel scan results

## Controls Management

For each control you can:

- **View the requirement** -- The control description and its framework source
- **Set status** -- Implemented, partially implemented, planned, or not applicable
- **Map evidence** -- Link uploaded evidence to the control
- **Assign ownership** -- Assign a team member responsible for the control
- **Track history** -- See when the control status last changed and by whom

## Evidence Collection

Audit evidence is uploaded and linked to controls:

1. Go to the control that requires evidence.
2. Click **+ Add Evidence**.
3. Upload a file (PDF, screenshot, log export, configuration snapshot) or paste a URL.
4. Add a description and the date the evidence was collected.
5. Save.

Evidence is stored securely and versioned.

## Risk Register

The risk register tracks identified risks:

- **Score risks** -- Likelihood and impact scores with composite risk rating
- **Define treatment** -- Mitigate, accept, transfer, or avoid
- **Track mitigation** -- Link mitigation tasks and monitor progress
- **Review cadences** -- Scheduled reassessment reminders

## Policy Management

- **Create policies** -- Draft security and compliance policies
- **Track versions** -- Each edit creates a new version with changelog
- **Link to controls** -- Associate policies with supporting controls
- **Set review dates** -- Scheduled periodic reviews with reminders

## Next Steps

- [SOC](/platform/soc) -- Security events that feed into GRC findings
- [Code Security](/platform/code-security) -- Scan results mapped to controls
- [GRC API](/api/grc) -- Manage GRC data programmatically
