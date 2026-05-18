---
title: Security Policy
description: Responsible disclosure and security contact information
---

# Security Policy

ThinkEngine takes the security of our platform and products seriously. If you discover a vulnerability, we ask that you report it responsibly so we can address it before it is publicly disclosed.

## Responsible Disclosure

If you believe you have found a security vulnerability in any ThinkEngine product, please report it to us privately.

**Do NOT open a public GitHub issue for security vulnerabilities.**

### How to Report

Send an email to **security@thinkengine.io** with:

- A description of the vulnerability
- Steps to reproduce or a proof of concept
- The affected product and version (if known)
- Your assessment of the severity and potential impact

### What to Expect

| Step | Timeline |
|------|----------|
| **Acknowledgment** | Within 48 hours of your report |
| **Assessment** | Within 7 days we will provide an initial severity assessment and estimated fix timeline |
| **Resolution** | Varies by severity -- critical issues are prioritized for immediate patching |
| **Disclosure** | We coordinate disclosure timing with the reporter |

We will keep you informed throughout the process and credit you in the advisory (unless you prefer to remain anonymous).

## Supported Products

The following products are in scope for security reports:

| Product | Description |
|---------|-------------|
| **ThinkEngine Platform** | The web application at thinkengine.io and its backend services |
| **Sentinel Agent** | The cross-platform endpoint monitoring agent |
| **Darius Scanner** | The DAST binary for web application and API security scanning |

## Out of Scope

- Denial-of-service attacks against production infrastructure
- Social engineering of ThinkEngine employees
- Physical security of ThinkEngine offices or data centers
- Third-party services integrated with ThinkEngine (report to those vendors directly)

## Security Best Practices

For guidance on securing your ThinkEngine deployment:

- Use [API tokens](/getting-started/authentication) with least-privilege scope
- Rotate tokens and Sentinel API keys regularly
- Enable enterprise SSO when available
- Review [Sentinel configuration](/sentinel/configuration) for secure agent deployment
