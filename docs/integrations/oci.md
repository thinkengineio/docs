---
sidebar_position: 4
title: OCI
description: Ingest Oracle Cloud audit, Cloud Guard, and Events telemetry
---

# Oracle Cloud Infrastructure (OCI)

Connect Oracle Cloud so ThinkEngine can ingest from Cloud Guard, the Audit service, and Events. ThinkEngine itself is hosted on OCI, so this integration is the most performant of the cloud connectors.

## What ThinkEngine ingests

| Source | What we read | What it powers |
|---|---|---|
| **Cloud Guard** | Active problems, recommendations | SOC alerts, incident grouping |
| **Audit** | API request log across all services | Audit trail, anomaly detection |
| **Events** | Real-time service events | Real-time SOC stream |
| **Vault** | Secret rotation events (metadata only) | Compliance evidence |

## What you'll need

- An OCI tenancy
- An IAM user with read-only access (or use a Resource Principal if running ThinkEngine inside OCI)
- An RSA API signing key pair

## Required policy

The minimum policy ThinkEngine needs (paste into the IAM Policies console):

```
Allow group ThinkEngineReaders to read audit-events in tenancy
Allow group ThinkEngineReaders to read cloud-guard-family in tenancy
Allow group ThinkEngineReaders to inspect cloud-guard-family in tenancy
Allow group ThinkEngineReaders to read all-resources in tenancy
Allow group ThinkEngineReaders to use cloud-shell in tenancy
```

> **Read-only.** ThinkEngine never creates, modifies, or deletes OCI resources.

## Generating an API key

```bash
mkdir -p ~/.oci
openssl genrsa -out ~/.oci/thinkengine_key.pem 2048
chmod 600 ~/.oci/thinkengine_key.pem
openssl rsa -pubout -in ~/.oci/thinkengine_key.pem -out ~/.oci/thinkengine_key_public.pem
cat ~/.oci/thinkengine_key_public.pem
```

In the OCI Console:

1. Go to **Identity → Users → \<your user\> → API Keys**.
2. Click **Add API Key → Paste public key** and paste the contents of `thinkengine_key_public.pem`.
3. Copy the **Fingerprint** that OCI displays (looks like `aa:bb:cc:dd:ee:ff:11:22:33:44:55:66:77:88:99:00`).

## Setup

1. In ThinkEngine, go to **Settings → Integrations → Cloud Providers → OCI** and click **Configure**.
2. Fill in:

| Field | Where to find it |
|---|---|
| **Tenancy OCID** | OCI Console → Tenancy details → OCID |
| **User OCID** | OCI Console → Identity → Users → your user → OCID |
| **Fingerprint** | The fingerprint from the API Key step above |
| **Private Key (PEM)** | Contents of `~/.oci/thinkengine_key.pem` (paste the full file) |
| **Region** | Your home region, e.g. `us-ashburn-1` |

3. Save and click **Test** — ThinkEngine signs a request with your private key and calls `ListCompartments` to verify access.

## Multi-region

Findings from any region are auto-discovered by enumerating subscribed regions for the tenancy. Each finding is tagged with its source region.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `NotAuthenticated` | Wrong fingerprint or private key paired with wrong public key | Re-upload the public key, copy the fresh fingerprint |
| `NotAuthorizedOrNotFound` | Policy missing | Apply the policy block above |
| `InvalidParameter: region` | Typo in region name | Use the canonical OCI region ID (`us-ashburn-1`, `eu-frankfurt-1`, etc.) |
| Cloud Guard returns empty | Cloud Guard not enabled in the tenancy | Enable from **Identity & Security → Cloud Guard → Enable Cloud Guard** |

## Related

- [AWS](/integrations/aws)
- [Azure](/integrations/azure)
- [GCP](/integrations/gcp)
