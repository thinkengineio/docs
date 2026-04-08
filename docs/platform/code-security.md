---
sidebar_position: 5
title: Code Security
description: Code security scanning
---

# Code Security

The Code Security module scans your repositories for vulnerabilities, insecure dependencies, exposed secrets, and infrastructure misconfigurations. Results are presented in a unified view with severity ratings and actionable remediation guidance.

## What Gets Scanned

ThinkEngine performs four types of code security analysis:

### SAST -- Static Application Security Testing

Source code is analyzed for security vulnerabilities such as injection flaws, authentication weaknesses, insecure data handling, and other patterns catalogued by OWASP and CWE. SAST scans cover all major languages in your repository.

### SCA -- Software Composition Analysis

Dependencies (packages, libraries, container base images) are checked against known vulnerability databases. SCA identifies outdated or vulnerable components and recommends safe upgrade paths.

### Secrets Detection

Scans for accidentally committed credentials, API keys, tokens, private keys, and other sensitive material. Detected secrets are flagged immediately so you can rotate them before they are exploited.

### IaC Scanning -- Infrastructure as Code

Terraform, CloudFormation, Kubernetes manifests, and Dockerfiles are analyzed for security misconfigurations such as overly permissive IAM policies, unencrypted storage, public exposure of internal services, and missing network controls.

## Viewing Scan Results

Navigate to **Code Security** in the sidebar to see:

- **Summary** -- Total findings by severity and scan type.
- **Findings list** -- Every finding with its severity, file path, line number, scan type, and description.
- **Trend chart** -- How your finding count has changed over time.

Click any finding to see:

- **Detail** -- Full description of the vulnerability or misconfiguration.
- **Affected code** -- The specific file and line(s) where the issue exists.
- **Remediation guidance** -- Recommended fix with code examples where applicable.
- **References** -- Links to CVE entries, CWE descriptions, or framework documentation.

## Severity Levels

Findings are classified by severity:

| Severity | Description |
|---|---|
| **Critical** | Exploitable vulnerability with high impact. Immediate remediation required. |
| **High** | Significant security risk that should be addressed promptly. |
| **Medium** | Moderate risk. Should be remediated within your normal development cycle. |
| **Low** | Minor issue or best-practice recommendation. |
| **Info** | Informational finding with no direct security impact. |

## Auto-Fix with Sofia

For many findings, you can request an automatic fix:

1. Open the finding detail.
2. Click **Fix with Sofia**.
3. Sofia creates a task to remediate the issue -- she will analyze the finding, implement the fix, and submit a pull request to your repository.

This is especially useful for bulk remediation of dependency upgrades, secret rotation stubs, and common SAST patterns.

## Integration with GRC

Code security findings can map to compliance controls in the [GRC module](/platform/grc). When a scan detects a finding that relates to a tracked control (e.g., a secrets exposure violating an access management control), a nonconformity is created automatically.

## Next Steps

- [Sofia AI](/platform/sofia-ai) -- Ask Sofia to investigate a finding or generate a fix.
- [Incidents](/platform/incidents) -- Escalate critical findings into incidents.
- [Code Security API](/api/code-security) -- Access scan results programmatically.
