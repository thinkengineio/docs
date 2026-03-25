---
sidebar_position: 4
title: GRC
description: Governance, Risk & Compliance
---

# Governance, Risk & Compliance (GRC)

The GRC module helps you manage compliance obligations, track risks, and collect audit evidence -- all in one place. Whether you are preparing for an audit, mapping controls to multiple frameworks, or tracking remediation of compliance gaps, GRC provides the structure and visibility you need.

## Overview

The GRC dashboard shows:

- **Framework compliance** -- Percentage of controls satisfied per tracked framework.
- **Open risks** -- Number of risks in the register that are above your risk tolerance threshold.
- **Pending evidence** -- Controls that are awaiting evidence uploads.
- **Nonconformities** -- Active compliance gaps requiring remediation.

## Compliance Frameworks

ThinkEngine supports tracking against industry-standard compliance frameworks including:

- **SOC 2** (Type I and Type II)
- **ISO 27001**
- **NIST Cybersecurity Framework (CSF)**
- **CIS Controls**
- **PCI DSS**
- **HIPAA**
- **GDPR** (technical controls)

To add a framework:

1. Go to **GRC > Frameworks**.
2. Click **+ Add Framework**.
3. Select from the built-in framework library or create a custom framework.
4. ThinkEngine populates the control set for the selected framework.

You can track multiple frameworks simultaneously. Controls that overlap across frameworks are automatically cross-mapped.

## Controls Management

Controls are the individual requirements within a compliance framework. For each control you can:

- **View the requirement** -- The control description and its framework source.
- **Set status** -- Mark the control as **implemented**, **partially implemented**, **planned**, or **not applicable**.
- **Map evidence** -- Link uploaded evidence to the control.
- **Assign ownership** -- Assign a team member responsible for the control.
- **Track history** -- See when the control status last changed and by whom.

### Cross-Mapping

When a single security measure satisfies requirements in multiple frameworks (e.g., "access control" in both SOC 2 and ISO 27001), ThinkEngine cross-maps the control so evidence uploaded once applies everywhere it is relevant.

## Evidence Collection

Audit evidence is uploaded and linked to controls:

1. Go to the control that requires evidence.
2. Click **+ Add Evidence**.
3. Upload a file (PDF, screenshot, log export, configuration snapshot) or paste a URL.
4. Add a description and the date the evidence was collected.
5. Save.

Evidence is stored securely and versioned. Auditors can be granted read-only access to review evidence without modifying controls.

## Policy Management

The Policies section lets you:

- **Create policies** -- Draft security and compliance policies using the built-in editor.
- **Track versions** -- Each policy edit creates a new version with a changelog.
- **Link to controls** -- Associate policies with the controls they support.
- **Set review dates** -- Schedule periodic policy reviews and receive reminders.

## Risk Register

The risk register tracks identified risks across your organization:

- **Add a risk** -- Describe the risk, assign a category (operational, technical, regulatory, third-party), and set the owner.
- **Score risks** -- Assign likelihood and impact scores. ThinkEngine calculates a composite risk rating.
- **Define treatment** -- Choose a treatment strategy: **mitigate**, **accept**, **transfer**, or **avoid**.
- **Track mitigation** -- Link mitigation tasks and monitor progress over time.
- **Review** -- Set review cadences to ensure risks are reassessed regularly.

Risks are displayed in a heatmap (likelihood vs. impact) and a sortable table.

## Nonconformities

Nonconformities represent compliance gaps -- places where a control requirement is not met. They can be:

- **Auto-generated** -- Created automatically when a Sentinel scan or code security scan detects a finding that maps to a control.
- **Manually created** -- Added by your team during internal audits or assessments.

Each nonconformity includes:

- **Description** -- What the gap is.
- **Affected controls** -- Which controls are impacted.
- **Severity** -- Critical, high, medium, or low.
- **Remediation plan** -- Steps to close the gap, with an owner and target date.
- **Status** -- Open, in progress, or closed.

## Next Steps

- [Code Security](/platform/code-security) -- Scan results that feed into GRC controls.
- [SOC](/platform/soc) -- Security alerts that may generate nonconformities.
- [GRC API](/api/grc) -- Manage GRC data programmatically.
