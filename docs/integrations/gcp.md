---
sidebar_position: 3
title: GCP
description: Ingest Security Command Center findings and Cloud Audit Logs
---

# Google Cloud Platform

Connect GCP so ThinkEngine can pull findings from Security Command Center and audit events from Cloud Logging.

## What ThinkEngine ingests

| Source | What we read | What it powers |
|---|---|---|
| **Security Command Center** | Active findings (Premium tier) | SOC alerts, incident grouping |
| **Cloud Audit Logs** | Admin Activity, Data Access, System Event logs | Audit trail, anomaly detection |
| **IAM Recommender** | Excess permission recommendations | Compliance gaps |
| **Asset Inventory** | Resource catalog snapshots | GRC evidence, attack surface map |

## What you'll need

- A GCP project (or organization)
- A **service account JSON key** with the right roles attached

## Required roles

Grant the service account the following IAM roles at the **organization** level (or project, if you only want one project monitored):

| Role | Purpose |
|---|---|
| `roles/securitycenter.findingsViewer` | Read Security Command Center findings |
| `roles/logging.viewer` | Read Cloud Audit Logs |
| `roles/cloudasset.viewer` | Read Asset Inventory |
| `roles/iam.securityReviewer` | Read IAM policies |
| `roles/recommender.iamViewer` | Read IAM Recommender |

```bash
# Create the service account
gcloud iam service-accounts create thinkengine-reader \
  --display-name="ThinkEngine Read-Only"

# Grant roles at the org level
ORG_ID=<your-org-id>
SA_EMAIL=thinkengine-reader@<project>.iam.gserviceaccount.com

for role in \
  securitycenter.findingsViewer \
  logging.viewer \
  cloudasset.viewer \
  iam.securityReviewer \
  recommender.iamViewer; do
  gcloud organizations add-iam-policy-binding $ORG_ID \
    --member="serviceAccount:$SA_EMAIL" \
    --role="roles/$role"
done

# Generate a JSON key
gcloud iam service-accounts keys create thinkengine-key.json \
  --iam-account=$SA_EMAIL
```

The `thinkengine-key.json` file is what you paste into ThinkEngine.

## Setup

1. In ThinkEngine, go to **Settings → Integrations → Cloud Providers → GCP** and click **Configure**.
2. Open `thinkengine-key.json` in a text editor, copy the **entire JSON contents**, and paste it into the **Service Account JSON** field.
3. Save and click **Test** — ThinkEngine authenticates via the JSON key and lists projects to confirm read access.

## Project vs organization scope

- **Organization-scoped** keys (above) ingest from every project in the org. Recommended for security teams.
- **Project-scoped** keys only see one project. Useful for app teams that want their own scoped view.

ThinkEngine auto-detects the scope from the JSON key and adjusts its API calls accordingly.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `invalid_grant: Invalid JWT signature` | JSON key was modified or corrupted on paste | Re-export the key and paste fresh |
| `403 PERMISSION_DENIED` on findings | Missing `securitycenter.findingsViewer` | Apply the role at the org level |
| Findings appear delayed | SCC syncs every 10 min | Expected — first sync backfills 30 days |
| `Security Command Center API has not been used` | SCC API not enabled on the project | `gcloud services enable securitycenter.googleapis.com` |

## Related

- [AWS](/integrations/aws)
- [Azure](/integrations/azure)
- [OCI](/integrations/oci)
