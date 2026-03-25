---
sidebar_position: 2
title: Tasks
description: Submit and manage AI-powered tasks
---

# Tasks

Tasks are the primary way you interact with Sofia, the ThinkEngine AI agent. Describe what you need in plain language, and Sofia will research, plan, implement, and deliver the result -- whether that is a pull request, a security report, or a structured analysis.

## Submitting a Task

1. Click **+ New Task** from the dashboard or the Tasks page.
2. Enter a **description** in natural language. Be as specific as you like -- Sofia handles everything from one-line bug reports to multi-step project briefs.
3. Optionally attach a **repository URL** so Sofia knows which codebase to work against.
4. Click **Submit**.

Sofia immediately begins processing the task. You can navigate away -- she will continue working in the background.

### Tips for Good Task Descriptions

- Include the **expected behavior** and the **actual behavior** when reporting bugs.
- Reference specific files, endpoints, or error messages when you have them.
- For large projects, describe the desired outcome and let Sofia break the work into steps.

## Task Statuses

Every task moves through a lifecycle:

| Status | Meaning |
|---|---|
| **Pending** | Task is queued and waiting to be picked up. |
| **Running** | Sofia is actively working on the task. |
| **Completed** | Work is finished. Results (PR link, report, etc.) are available. |
| **Failed** | Something went wrong. Check the task detail for error information. |

## Viewing Results

Open any task to see:

- **Conversation history** -- The full step-by-step log of what Sofia did, including research findings, code changes, and review notes.
- **Deliverables** -- Links to pull requests, scan reports, or other outputs.
- **Cost** -- Token usage and cost breakdown for the task.
- **Duration** -- Wall-clock time from submission to completion.

## Follow-Up Messages

While a task is running (or after it completes), you can send **follow-up messages** to refine the work:

1. Open the task detail page.
2. Type your follow-up in the message input at the bottom.
3. Press **Send**.

Sofia reads your follow-up in context and adjusts her approach accordingly. This is useful for mid-task course corrections or requesting additional changes after a task completes.

## Cancelling a Task

To cancel a running task:

1. Open the task detail page.
2. Click **Cancel Task** in the top-right corner.
3. Confirm the cancellation.

Cancelled tasks stop processing immediately. Any partial work (e.g., a draft PR) remains available for reference.

## Task Scheduling

You can schedule tasks to run on a recurring basis:

1. When creating a task, expand the **Schedule** section.
2. Choose a frequency: **daily**, **weekly**, or **monthly**.
3. Set the time and (for weekly/monthly) the day.
4. Submit.

Scheduled tasks are useful for recurring security scans, periodic code reviews, or regular compliance checks. Each execution creates a new task instance with its own results.

To manage scheduled tasks, go to **Tasks > Scheduled** to view, edit, or disable recurring tasks.

## API Access

Tasks can also be created and managed programmatically. See the [Tasks API](/api/tasks) for endpoint details, request formats, and examples.

## Next Steps

- [SOC](/platform/soc) -- Security Operations Center
- [Code Security](/platform/code-security) -- Automated code scanning
- [GitHub Integration](/integrations/github) -- Trigger tasks from GitHub Issues
