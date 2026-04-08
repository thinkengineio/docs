---
sidebar_position: 4
title: Email (SMTP)
description: Send alert digests, incident reports, and scan summaries via SMTP
---

# Email (SMTP)

Configure an outbound SMTP server so ThinkEngine can email alerts, incident reports, and weekly digests directly to your team.

## What you'll need

- SMTP host, port, username, password (or app-specific password for Gmail / Outlook)
- A `From` address you control
- The default recipient address (or distribution list) for unrouted alerts

## Setup

1. In ThinkEngine, go to **Settings → Integrations → Email (SMTP)** and click **Configure**.
2. Fill in the connection fields:

| Field | Example | Notes |
|---|---|---|
| **SMTP Host** | `smtp.gmail.com` | The hostname of your mail server |
| **Port** | `587` | `587` for STARTTLS (most providers) or `465` for implicit TLS |
| **Username** | `alerts@yourcompany.com` | Mailbox to authenticate as |
| **Password** | `••••••` | Stored encrypted; for Gmail use an App Password |
| **From Address** | `alerts@thinkengine.io` | What recipients see in their `From:` header |
| **Default Recipient** | `team@yourcompany.com` | Falls back here when an alert has no specific routing |
| **Timezone** | `Europe/Istanbul` | Renders timestamps in the email body |

3. Save and click **Test** — ThinkEngine sends a test email to the default recipient. Confirm it arrived (check spam if it didn't).

## Provider quick reference

| Provider | Host | Port | Auth notes |
|---|---|---|---|
| **Gmail** | `smtp.gmail.com` | `587` | Use an App Password (not your account password). 2FA must be on. |
| **Outlook 365** | `smtp.office365.com` | `587` | Use modern auth or an App Password. |
| **AWS SES** | `email-smtp.us-east-1.amazonaws.com` | `587` | Generate SMTP credentials from the SES console (NOT your IAM key). |
| **SendGrid** | `smtp.sendgrid.net` | `587` | Username is literally `apikey`, password is your API key. |
| **Mailgun** | `smtp.mailgun.org` | `587` | Use the SMTP credentials from the domain settings page. |

## Notification settings

- **Mode** — `realtime` (one email per event) or `digest` (rolled up daily / weekly)
- **Severity threshold** — minimum severity to email
- **Action types** — which event categories to forward

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `SMTPAuthenticationError` | Wrong username/password, or your provider rejects raw passwords | Generate an App Password / API key and retry |
| `SMTPSenderRefused` | The `From` address is not authorized to send from this account | Use a `From` address on a domain you've verified with the provider |
| `SMTPRecipientsRefused` | Recipient address invalid or rejected | Check the address; some providers reject `+`-suffixed aliases |
| Test passes, but real alerts never arrive | Severity threshold too high, or alerts landing in spam | Lower the threshold, allowlist the From address, set up SPF/DKIM |

## Related

- [Slack](/integrations/slack)
- [Discord](/integrations/discord)
- [Custom Webhook](/integrations/webhooks)
