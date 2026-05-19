---
sidebar_position: 2
title: Azure
description: Ingest Microsoft Sentinel, Defender, and Activity Log security telemetry
---

# Azure

Connect Microsoft Azure so ThinkEngine can pull telemetry from Microsoft Sentinel, Defender for Cloud, and the Azure Activity Log.

## What ThinkEngine ingests

| Source | What we read | What it powers |
|---|---|---|
| **Microsoft Sentinel** | Active incidents, analytics rule alerts | SOC alerts, incident grouping |
| **Defender for Cloud** | Security recommendations, secure score, regulatory compliance | GRC evidence, compliance gaps |
| **Activity Log** | Subscription-level admin events | Audit trail, anomaly detection |
| **Azure AD Audit Log** | Sign-in failures, role assignments, conditional access decisions | Identity threat detection |

## What you'll need

A service principal with read permissions across the subscriptions you want monitored:

- **Tenant ID** — your Azure AD tenant
- **Client ID** — the app registration / service principal ID
- **Client Secret** — the service principal secret (or certificate)
- **Subscription ID** — the primary subscription to scan (additional subs auto-discovered)

## Required role

The minimum built-in role is **Reader** at the subscription scope, plus **Security Reader** for Defender data:

```bash
# Create the service principal
az ad sp create-for-rbac \
  --name "thinkengine-reader" \
  --role "Reader" \
  --scopes "/subscriptions/<SUBSCRIPTION_ID>"

# Add Security Reader for Defender for Cloud
az role assignment create \
  --assignee <APP_ID> \
  --role "Security Reader" \
  --scope "/subscriptions/<SUBSCRIPTION_ID>"
```

The output gives you the `appId` (Client ID), `password` (Client Secret), and `tenant` (Tenant ID) you'll paste into ThinkEngine.

## Setup

1. In ThinkEngine, go to **Settings → Integrations → Cloud Providers → Azure** and click **Configure**.
2. Paste the four values from the `az ad sp create-for-rbac` output above.
3. Save, then click **Test**. ThinkEngine acquires a token via the OAuth client credentials flow and lists the subscription.

## Multi-subscription

If your tenant has multiple subscriptions, ThinkEngine enumerates all subscriptions the service principal has Reader on and ingests from each. Findings are tagged with `subscription_id` and `subscription_name`.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `AADSTS7000215: Invalid client secret` | Secret expired or mistyped | Generate a new secret in the app registration |
| `AuthorizationFailed` on subscription read | Service principal missing Reader role | Re-run the `az role assignment create` command above |
| Defender data missing but Activity Log works | Missing Security Reader role | Add Security Reader at the subscription scope |
| Sentinel incidents not appearing | Workspace not in the same subscription, or Reader missing on the Log Analytics workspace | Add Reader on the workspace resource group |

## Related

- [AWS](/integrations/aws)
- [GCP](/integrations/gcp)
- [OCI](/integrations/oci)
