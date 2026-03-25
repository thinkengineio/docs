---
title: User
sidebar_position: 16
---

# User

The User API provides information about the currently authenticated user.

## Endpoints

### `GET /api/auth/me`

Returns the authenticated user's profile, including username, email, and assigned roles.

**Authentication:** Bearer token required

**Example Request:**

```bash
curl https://thinkengine.io/api/auth/me \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "username": "john@example.com",
  "email": "john@example.com",
  "roles": ["user", "developer"],
  "oidc_enabled": true
}
```

### Response Fields

| Field | Type | Description |
|---|---|---|
| `username` | string | The user's unique identifier (typically their email) |
| `email` | string | The user's email address |
| `roles` | array | List of assigned roles (e.g., `user`, `developer`, `security-analyst`) |
| `oidc_enabled` | boolean | Whether OIDC authentication is active on the platform |

### Roles

Roles determine what actions a user can perform. The following roles are available:

| Role | Description |
|---|---|
| `user` | Standard user. Can submit tasks, view own data, and use the chat interface. |
| `developer` | Developer access. Includes all `user` permissions plus code scanning and repository integrations. |
| `security-analyst` | Security analyst access. Includes GRC, MITRE, SOC, and security analytics features. |
| `viewer` | Read-only access to dashboards and reports. |
