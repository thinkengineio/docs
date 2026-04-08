---
sidebar_position: 1
title: GitHub
description: GitHub integration
---

# GitHub Integration

Connect ThinkEngine to your GitHub repositories so Sofia can automatically pick up issues, diagnose problems, implement fixes, and submit pull requests -- all without manual intervention.

## Overview

The GitHub integration enables an issue-driven workflow:

1. A team member (or an automated process) creates a **GitHub Issue** describing a bug, feature request, or security finding.
2. Sofia **picks up the issue**, reads the repository, and begins working.
3. She researches the codebase, writes or modifies code, runs tests, and performs a self-review.
4. Sofia opens a **pull request** with the fix or implementation, linked back to the original issue.

You can also trigger tasks manually from the ThinkEngine dashboard by providing a repository URL -- the GitHub integration handles cloning, branching, and PR creation automatically.

## Installing the ThinkEngine GitHub App

1. Go to **Settings > Integrations > GitHub** in the ThinkEngine dashboard.
2. Click **Install GitHub App**.
3. You will be redirected to GitHub to authorize the ThinkEngine app.
4. Select the **organization** or **personal account** where you want to install.
5. Choose which repositories to grant access to -- you can select **all repositories** or pick specific ones.
6. Click **Install & Authorize**.

Once installed, ThinkEngine can read issues, clone repositories, create branches, and open pull requests in the selected repositories.

## Supported Workflows

### Issue-Driven Fixes

Label a GitHub Issue with the configured trigger label (default: `thinkengine` or `sofia`) and Sofia will automatically begin working on it. She posts status updates as comments on the issue and links her pull request when the work is complete.

### Code Review

Sofia can review pull requests for correctness, security vulnerabilities, and adherence to best practices. Enable PR review in the integration settings to have Sofia comment on incoming pull requests.

### Security Scanning

When code security scanning is enabled for a connected repository, ThinkEngine automatically scans new commits and pull requests for SAST findings, dependency vulnerabilities, exposed secrets, and IaC misconfigurations. Results appear in the [Code Security](/platform/code-security) module and as PR check annotations.

## Configuration

From **Settings > Integrations > GitHub** you can configure:

- **Connected repositories** -- Add or remove repositories from the integration.
- **Trigger labels** -- Customize which issue labels cause Sofia to pick up work.
- **Auto-assign** -- Automatically assign Sofia to issues with the trigger label.
- **PR review** -- Enable or disable automated pull request reviews.
- **Code scanning** -- Enable or disable automated security scanning on push and PR events.
- **Branch naming** -- Customize the branch naming convention Sofia uses for her PRs.

## How It Works

When Sofia works on a GitHub issue:

1. She clones the repository and creates a new branch.
2. She analyzes the issue description, explores the codebase, and identifies the relevant files.
3. She implements the fix or feature, writes tests if applicable, and reviews her own changes.
4. She pushes the branch and opens a pull request with a detailed description of what was changed and why.
5. She comments on the original issue with a link to the PR.

The full conversation log is available in the [Sofia AI](/platform/sofia-ai) chat history of the ThinkEngine dashboard.

## Permissions

The ThinkEngine GitHub App requests the following permissions:

- **Repository contents** (read/write) -- To clone repositories and push branches.
- **Issues** (read/write) -- To read issue descriptions and post status comments.
- **Pull requests** (read/write) -- To create PRs and post review comments.
- **Checks** (read/write) -- To report code scanning results as check runs.
- **Metadata** (read) -- To list repositories and basic org information.

You can review and modify permissions at any time from your GitHub organization settings.

## Next Steps

- [Slack Integration](/integrations/slack) -- Interact with Sofia from Slack.
- [Sofia AI](/platform/sofia-ai) -- View and manage conversations triggered from GitHub.
- [Code Security](/platform/code-security) -- Review scan results from connected repositories.
