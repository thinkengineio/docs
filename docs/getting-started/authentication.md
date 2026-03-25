---
sidebar_position: 3
title: Authentication
description: Sign in and obtain API tokens
---

# Authentication

ThinkEngine uses industry-standard **OpenID Connect (OIDC)** for authentication. This page covers how to sign in, obtain API tokens, and authenticate Sentinel agents.

## Signing In

Visit [thinkengine.io](https://thinkengine.io) and sign in with your credentials. If your organization has configured enterprise single sign-on, you can authenticate through your identity provider.

## API Authentication

All API requests to ThinkEngine require a **Bearer token** in the `Authorization` header.

```
Authorization: Bearer <your-token>
```

### Obtaining a Token

1. Sign in to the ThinkEngine dashboard
2. Navigate to **Settings** in the sidebar
3. Under **API Tokens**, click **Generate Token**
4. Copy your token and store it securely -- it will only be displayed once

### Example Request

```bash
curl -X GET https://thinkengine.io/api/tasks \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json"
```

### Token Expiry

API tokens expire after a set period. When a token expires, API requests will return a `401 Unauthorized` response. Generate a new token from the Settings page or re-authenticate through the OIDC flow to obtain a fresh token.

## Sentinel API Keys

Sentinel agents authenticate with the platform using **API keys** rather than user tokens. This allows agents to report telemetry without requiring interactive sign-in.

### Obtaining a Sentinel API Key

1. Sign in to the ThinkEngine dashboard
2. Navigate to **Settings** > **API Keys**
3. Click **Create Sentinel Key**
4. Copy the key and provide it to the Sentinel agent at startup

### Using the Key

Pass the API key when starting the Sentinel agent:

```bash
sentinel --api-key <your-sentinel-key> --endpoint https://thinkengine.io
```

See the [Sentinel Installation guide](/sentinel/installation) for full configuration options.

## Security Best Practices

- **Never share tokens or API keys** in source code, logs, or unencrypted channels
- **Rotate tokens regularly** -- revoke and regenerate keys from the Settings page
- **Use separate Sentinel keys per endpoint** so that individual keys can be revoked without affecting other agents
