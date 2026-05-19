---
sidebar_position: 1
title: AWS
description: Ingest CloudTrail, GuardDuty, Security Hub, and other AWS security telemetry
---

# AWS

Connect Amazon Web Services so ThinkEngine can pull security telemetry from CloudTrail, GuardDuty, Security Hub, IAM Access Analyzer, and Config — and surface them in the SOC, Incidents, and GRC views.

## What ThinkEngine ingests

| Source | What we read | What it powers |
|---|---|---|
| **CloudTrail** | Management + Data event log | Audit trail, anomaly detection, MITRE ATT&CK mapping |
| **GuardDuty** | Active findings | SOC alerts, incident grouping |
| **Security Hub** | Aggregated findings (Inspector, Macie, Config, third-party) | SOC alerts, GRC evidence |
| **IAM Access Analyzer** | Public/cross-account access findings | Compliance gaps |
| **Config** | Resource compliance state | GRC control evidence |

## What you'll need

- An AWS account where you can create an IAM user (or assume role)
- Either:
  - **Long-lived credentials** — `Access Key ID` + `Secret Access Key` for an IAM user
  - **Cross-account role** — a `Role ARN` ThinkEngine can `sts:AssumeRole` into (recommended for prod)

## Required permissions

The minimum policy ThinkEngine needs:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "cloudtrail:LookupEvents",
        "cloudtrail:DescribeTrails",
        "guardduty:ListFindings",
        "guardduty:GetFindings",
        "guardduty:ListDetectors",
        "securityhub:GetFindings",
        "securityhub:DescribeHub",
        "access-analyzer:ListFindings",
        "config:DescribeComplianceByConfigRule",
        "config:DescribeComplianceByResource",
        "iam:GetAccountSummary",
        "sts:GetCallerIdentity"
      ],
      "Resource": "*"
    }
  ]
}
```

> **Read-only by design.** ThinkEngine never writes to AWS — no resource creation, no IAM modification, no CloudTrail tampering.

## Setup

1. In ThinkEngine, go to **Settings → Integrations → Cloud Providers → AWS** and click **Configure**.
2. Fill in:

| Field | Example | Notes |
|---|---|---|
| **Access Key ID** | `AKIA...` | From IAM user or role assumption |
| **Secret Access Key** | `••••••` | Stored encrypted |
| **Region** | `us-east-1` | Primary region for CloudTrail / GuardDuty |
| **Role ARN** *(optional)* | `arn:aws:iam::123456789012:role/ThinkEngineReader` | For cross-account access |

3. Save, then click **Test**. ThinkEngine calls `sts:GetCallerIdentity` and pulls one CloudTrail event to confirm read access.

## Multi-region

If you operate across multiple AWS regions, leave the **Region** field set to your primary and ThinkEngine will auto-discover the others via `ec2:DescribeRegions`. Findings are tagged with their originating region in the SOC view.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `InvalidClientTokenId` | Wrong access key | Re-paste the key from the IAM console |
| `AccessDenied` on `cloudtrail:LookupEvents` | Policy not attached | Apply the policy above |
| `AccessDenied` on `sts:AssumeRole` | Trust policy doesn't allow ThinkEngine | Add ThinkEngine's account ID to the role's trust policy (contact support for the ID) |
| Findings appear delayed | Sync runs every 5 min | This is expected — historical findings backfill on first connect |

## Related

- [Azure](/integrations/azure)
- [GCP](/integrations/gcp)
- [OCI](/integrations/oci)
