---
title: Prompts & Skills
sidebar_position: 13
---

# Prompts & Skills

The Prompts and Skills APIs let you manage reusable prompt templates and automation skills that can be used with tasks.

## Prompt Endpoints

### `GET /api/prompts`

List all prompt templates saved by the authenticated user.

**Authentication:** Bearer token required

**Example Request:**

```bash
curl https://thinkengine.io/api/prompts \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "prompts": [
    {
      "id": "prompt-001",
      "name": "Security Review",
      "content": "Review this code for security vulnerabilities. Focus on OWASP Top 10...",
      "created_at": "2026-03-01T12:00:00Z",
      "updated_at": "2026-03-15T09:00:00Z"
    }
  ]
}
```

---

### `POST /api/prompts`

Create or update a prompt template.

**Authentication:** Bearer token required

**Request Body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | Yes | Prompt template name |
| `content` | string | Yes | Prompt template content |

**Example Request:**

```bash
curl -X POST https://thinkengine.io/api/prompts \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Security Review",
    "content": "Review this code for security vulnerabilities. Focus on OWASP Top 10..."
  }'
```

**Example Response (201 Created):**

```json
{
  "ok": true,
  "id": "prompt-001"
}
```

---

## Skill Endpoints

### `GET /api/skills`

List all automation skills saved by the authenticated user.

**Authentication:** Bearer token required

**Example Request:**

```bash
curl https://thinkengine.io/api/skills \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "skills": [
    {
      "id": "skill-001",
      "name": "Deploy to Staging",
      "description": "Run the staging deployment pipeline",
      "steps": [
        "checkout main branch",
        "run tests",
        "build docker image",
        "deploy to staging cluster"
      ],
      "created_at": "2026-02-15T10:00:00Z",
      "updated_at": "2026-03-10T14:00:00Z"
    }
  ]
}
```

---

### `POST /api/skills`

Create or update an automation skill.

**Authentication:** Bearer token required

**Request Body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | Yes | Skill name |
| `description` | string | No | Short description |
| `steps` | array | No | Ordered list of step descriptions |

**Example Request:**

```bash
curl -X POST https://thinkengine.io/api/skills \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Deploy to Staging",
    "description": "Run the staging deployment pipeline",
    "steps": [
      "checkout main branch",
      "run tests",
      "build docker image",
      "deploy to staging cluster"
    ]
  }'
```

**Example Response (201 Created):**

```json
{
  "ok": true,
  "id": "skill-001"
}
```
