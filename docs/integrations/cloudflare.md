---
sidebar_position: 5
title: Cloudflare
description: Ingest WAF events, DDoS mitigation, bot detection, and DNS analytics
---

# Cloudflare

Connect Cloudflare so ThinkEngine can stream WAF events, DDoS mitigation alerts, bot scores, and DNS analytics into the SOC view.

## What ThinkEngine ingests

| Source | What we read | What it powers |
|---|---|---|
| **WAF** | Firewall events, managed rule hits, custom rule matches | SOC alerts, MITRE ATT&CK mapping |
| **DDoS** | Mitigation events at L3/L4/L7 | Real-time SOC stream |
| **Bot Management** | Bot scores, automated traffic patterns | Anomaly detection |
| **DNS Analytics** | Query patterns, NXDOMAIN spikes | Threat hunting |
| **Rate Limiting** | Rate-limit rule triggers | Abuse detection |

## What you'll need

Either:

- An **API Token** with the right scopes (recommended), or
- An **API Email** + **Global API Key** (legacy)

Plus:

- Your **Account ID** (visible in the dashboard URL)
- Optionally a specific **Zone ID** to scope ingest to one zone

## Creating an API token

1. Go to [dash.cloudflare.com → My Profile → API Tokens](https://dash.cloudflare.com/profile/api-tokens) and click **Create Token**.
2. Use the **Custom token** template with the following permissions:

| Resource | Permission |
|---|---|
| **Account → Account Analytics** | Read |
| **Account → Account Settings** | Read |
| **Zone → Analytics** | Read |
| **Zone → Firewall Services** | Read |
| **Zone → Logs** | Read |
| **Zone → Zone** | Read |

3. Set **Account Resources** to your account, and **Zone Resources** to either *All zones* or a specific zone.
4. (Optional) Limit by Client IP and TTL if your security policy requires it.
5. Click **Create Token** and copy the value — Cloudflare only shows it once.

## Setup

1. In ThinkEngine, go to **Settings → Integrations → Cloud Providers → Cloudflare** and click **Configure**.
2. Fill in:

| Field | Required? | Notes |
|---|---|---|
| **API Token** | Recommended | Paste the token from the step above |
| **API Email** | Only if not using token | Your Cloudflare account email |
| **Global API Key** | Only if not using token | Legacy auth — prefer the token |
| **Account ID** | Yes | From the dashboard URL: `dash.cloudflare.com/<account_id>/...` |
| **Zone ID** | Optional | Limits ingest to a single zone; leave empty for all zones |

3. Save and click **Test** — ThinkEngine calls `GET /accounts/<id>/tokens/verify` to confirm the token is valid and has the required scopes.

## Log push vs polling

Cloudflare offers two ways to forward firewall events:

- **Polling** (default) — ThinkEngine pulls events every 60s via the GraphQL Analytics API. Works with all plans, including Free.
- **Logpush** (Enterprise plans only) — Cloudflare pushes log batches to a destination ThinkEngine provides. Lower latency, higher fidelity.

To switch to Logpush, contact ThinkEngine support — we'll provision a destination URL and walk you through the Logpush job setup.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `Authentication error 10000` | Token expired or revoked | Generate a new token in Cloudflare and re-paste |
| `403` on Analytics calls | Missing `Account Analytics: Read` scope | Re-create the token with the scopes above |
| Events appear delayed | GraphQL API has ~1 minute lag | Expected — use Logpush for sub-second |
| Empty results for a specific zone | Zone is paused or not proxied (`grey cloud`) | Re-enable the orange cloud on the DNS records you want monitored |

## Related

- [AWS](/integrations/aws)
- [Custom Webhook](/integrations/webhooks)
