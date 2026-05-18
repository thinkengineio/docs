---
sidebar_position: 4
title: Scan Profiles
description: Quick, full, and custom scan modes
---

# Scan Profiles

Darius supports three scan profiles that control which scanning engines and templates are used.

## Quick Scan

```bash
darius scan --target https://app.example.com --profile quick
```

The default profile. Runs the top 100 vulnerability templates covering the most common CVEs, misconfigurations, and exposures. Completes in minutes. Available on all tiers including Community.

## Full Scan

```bash
darius scan --target https://app.example.com --profile full
```

Runs all 7,000+ vulnerability templates plus the browser engine (for JavaScript-rendered pages, SPAs, and authenticated flows) and the API fuzzer. Requires Professional or Enterprise tier.

### What the full scan covers

| Engine | What it scans |
|--------|--------------|
| **Vulnerability templates** | 7,000+ templates covering known CVEs, misconfigurations, and exposures |
| **Browser engine** | JavaScript-rendered pages, SPAs, and authenticated flows that require a real browser |
| **API fuzzer** | API endpoints defined in an OpenAPI/Swagger spec |

## Custom Scan

```bash
darius scan --target https://app.example.com --profile custom --techniques CVE-2024-1234,misconfig-nginx
```

Run a specific subset of templates by passing `--techniques` with a comma-separated list of template IDs. Useful for targeted validation after remediation.

## API Fuzzing with OpenAPI

When you provide an `--openapi` flag pointing to a Swagger or OpenAPI spec, the API fuzzer parses the spec and generates payloads across five attack categories:

1. **Injection** -- SQL injection, command injection, template injection
2. **Authentication bypass** -- missing auth, broken access control
3. **Error disclosure** -- stack traces, debug output, verbose error messages
4. **Parameter tampering** -- type confusion, boundary values, unexpected formats
5. **Business logic** -- IDOR, mass assignment, privilege escalation

```bash
darius scan --target https://api.example.com --openapi ./openapi.yaml --profile full
```

API fuzzing is available on Professional and Enterprise tiers.

## Output

All profiles produce structured findings with CVSS scores, CWE classifications, and reproduction steps. Output format is controlled by the `--report` flag (see [CLI Reference](/darius/cli-reference)).

## Next Steps

- [CLI Reference](/darius/cli-reference) -- All flags and options
- [Installation](/darius/installation) -- Download and set up Darius
- [Overview](/darius/overview) -- Feature comparison by tier
