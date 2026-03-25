---
title: Tasks
sidebar_position: 4
---

# Tasks

Tasks are the core unit of work in ThinkEngine. You can submit tasks to have the AI agent analyze, plan, implement, and review code changes. The Tasks API also supports scheduled tasks for recurring automation.

## Endpoints

### `GET /api/tasks`

List tasks with optional filtering.

**Authentication:** Bearer token required

**Query Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `status` | string | No | Filter by status: `pending`, `running`, `completed`, `failed`, `cancelled` |
| `mode` | string | No | Filter by mode: `auto`, `plan`, `local`, `computer`, `ask`, `review`, `evolve` |
| `source` | string | No | Filter by source (e.g., `dashboard`, `github`, `slack`) |
| `limit` | integer | No | Maximum number of tasks to return |
| `user_id` | string | No | Filter by user ID |

**Example Request:**

```bash
curl "https://thinkengine.io/api/tasks?status=completed&limit=10" \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
[
  {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "goal": "Fix the login page redirect loop",
    "display_goal": "Fix the login page redirect loop",
    "mode": "auto",
    "status": "completed",
    "submitted_at": 1711234567.89,
    "started_at": 1711234568.12,
    "finished_at": 1711234650.45,
    "error": null,
    "source": "dashboard",
    "user_id": "john@example.com"
  }
]
```

---

### `POST /api/tasks`

Submit a new task for the AI agent to work on.

**Authentication:** Bearer token required

**Request Body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `goal` | string | Yes | Description of the task to accomplish |
| `mode` | string | No | Operating mode. One of: `auto`, `plan`, `local`, `computer`, `ask`, `review`, `evolve`. Default: `plan` |
| `repo_dir` | string | No | Path to the local repository (for local mode) |
| `github_repo` | string | No | GitHub repository in `owner/repo` format |
| `pr_url` | string | No | Pull request URL (for review mode) |

**Example Request:**

```bash
curl -X POST https://thinkengine.io/api/tasks \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "goal": "Fix the login page redirect loop",
    "mode": "auto",
    "github_repo": "myorg/myrepo"
  }'
```

**Example Response (201 Created):**

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "status": "pending"
}
```

If a similar task was recently submitted, the API returns the existing task instead of creating a duplicate:

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "status": "running",
  "deduplicated": true,
  "message": "Similar task already in progress"
}
```

---

### `GET /api/tasks/{id}`

Retrieve details for a specific task, including cost data if available.

**Authentication:** Bearer token required

**Path Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Task UUID |

**Example Request:**

```bash
curl https://thinkengine.io/api/tasks/a1b2c3d4-e5f6-7890-abcd-ef1234567890 \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "goal": "Fix the login page redirect loop",
  "display_goal": "Fix the login page redirect loop",
  "mode": "auto",
  "status": "completed",
  "submitted_at": 1711234567.89,
  "started_at": 1711234568.12,
  "finished_at": 1711234650.45,
  "error": null,
  "source": "dashboard",
  "user_id": "john@example.com",
  "cost": {
    "usd": 0.042,
    "prompt_tokens": 15200,
    "completion_tokens": 3800,
    "calls": 7
  }
}
```

---

### `GET /api/tasks/{id}/messages`

Retrieve the conversation history for a task, including agent reasoning and tool outputs.

**Authentication:** Bearer token required

**Path Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Task UUID |

**Example Request:**

```bash
curl https://thinkengine.io/api/tasks/a1b2c3d4-e5f6-7890-abcd-ef1234567890/messages \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
[
  {
    "role": "user",
    "content": "Fix the login page redirect loop",
    "step": -1
  },
  {
    "role": "assistant",
    "content": "I found the issue in auth.ts. The redirect URL was not being validated...",
    "step": 1
  }
]
```

---

### `POST /api/tasks/{id}/reply`

Send a follow-up message to a task conversation, continuing the agent interaction.

**Authentication:** Bearer token required

**Path Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Task UUID |

**Request Body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `message` | string | Yes | The follow-up message |

**Example Request:**

```bash
curl -X POST https://thinkengine.io/api/tasks/a1b2c3d4-e5f6-7890-abcd-ef1234567890/reply \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"message": "Can you also add unit tests for that fix?"}'
```

**Example Response:**

```json
{
  "ok": true,
  "status": "running"
}
```

---

### `POST /api/tasks/{id}/kill`

Cancel a running task. If the task has an active agent thread, a kill signal is sent. If the task is marked as running but has no active thread, it is force-cancelled.

**Authentication:** Bearer token required

**Path Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Task UUID |

**Example Request:**

```bash
curl -X POST https://thinkengine.io/api/tasks/a1b2c3d4-e5f6-7890-abcd-ef1234567890/kill \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "ok": true,
  "action": "kill_sent"
}
```

If the task is not currently running:

```json
{
  "error": "task not running"
}
```

---

## Scheduled Tasks

### `GET /api/schedules`

List all scheduled tasks.

**Authentication:** Bearer token required

**Example Request:**

```bash
curl https://thinkengine.io/api/schedules \
  -H "Authorization: Bearer <token>"
```

**Example Response:**

```json
{
  "schedules": [
    {
      "id": "sched-001",
      "goal": "Run security scan on main branch",
      "mode": "auto",
      "cron": "0 2 * * 1",
      "enabled": true,
      "last_run": 1711234567.89,
      "next_run": 1711838400.0
    }
  ]
}
```

---

### `POST /api/schedules`

Create a new scheduled task.

**Authentication:** Bearer token required

**Request Body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `goal` | string | Yes | Description of the task |
| `mode` | string | No | Operating mode. Default: `auto` |
| `cron` | string | Yes | Cron expression for the schedule |
| `enabled` | boolean | No | Whether the schedule is active. Default: `true` |

**Example Request:**

```bash
curl -X POST https://thinkengine.io/api/schedules \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "goal": "Run security scan on main branch",
    "mode": "auto",
    "cron": "0 2 * * 1",
    "enabled": true
  }'
```

**Example Response (201 Created):**

```json
{
  "ok": true,
  "id": "sched-001"
}
```
