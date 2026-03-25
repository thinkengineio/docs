---
sidebar_position: 7
title: MITRE ATT&CK
description: MITRE ATT&CK coverage mapping
---

# MITRE ATT&CK

The MITRE ATT&CK module maps your detection capabilities against the [MITRE ATT&CK framework](https://attack.mitre.org/), giving you a clear picture of where your defenses are strong and where gaps exist.

## What the Coverage Map Shows

The coverage map is a heatmap of the ATT&CK matrix where each cell represents a technique. Cells are color-coded based on your detection coverage:

| Color | Meaning |
|---|---|
| **Green** | Covered -- you have active detections that trigger on this technique. |
| **Yellow** | Partially covered -- some detection exists but may not cover all sub-techniques or procedures. |
| **Red** | Not covered -- no active detection maps to this technique. |
| **Gray** | Not applicable -- the technique is not relevant to your environment. |

You can filter the heatmap by:

- **Tactic** -- Focus on a specific column of the matrix (e.g., Initial Access, Lateral Movement, Exfiltration).
- **Platform** -- Filter by operating system or environment (Linux, macOS, cloud).
- **Data source** -- Show only techniques that can be detected with specific telemetry types.

## How Detections Map to Techniques

When a Sentinel agent detects a threat behavior, the detection rule includes a MITRE ATT&CK technique ID (e.g., T1059 -- Command and Scripting Interpreter). These mappings populate the coverage heatmap automatically.

Coverage data comes from:

- **Sentinel threat detection rules** -- Behavioral detections running on your endpoints.
- **SOC alert correlation rules** -- Platform-level rules that aggregate and correlate events.
- **Code security findings** -- Certain code-level vulnerabilities map to ATT&CK techniques (e.g., T1552 -- Unsecured Credentials).

## Identifying Detection Gaps

Use the heatmap to identify gaps in your detection posture:

1. **Filter to red cells** -- These are techniques with no coverage.
2. **Prioritize by relevance** -- Focus on techniques commonly used in your industry or threat landscape.
3. **Review sub-techniques** -- Click any technique to expand its sub-techniques and see per-sub-technique coverage.
4. **Plan improvements** -- Use gap data to inform decisions about new detection rules, additional Sentinel modules, or security investments.

## ATTM -- Testing Your Coverage

The Sentinel agent includes an **Adversarial Telemetry Testing Module (ATTM)** that generates synthetic events mapped to MITRE ATT&CK techniques. Use ATTM to validate that your detection pipeline actually triggers on the techniques you believe you cover.

1. Run ATTM from a Sentinel agent (see [ATTM documentation](/sentinel/attm)).
2. Synthetic events flow through the same detection pipeline as real events.
3. Check the MITRE coverage map to confirm the expected techniques are highlighted.

ATTM events are tagged as synthetic and never contaminate real findings.

## Technique Detail

Click any technique on the heatmap to see:

- **Technique description** -- What the technique is and how adversaries use it.
- **Sub-techniques** -- More specific variations of the technique.
- **Your detections** -- Which Sentinel rules or correlation rules cover this technique.
- **Recent alerts** -- SOC alerts that matched this technique in your environment.
- **References** -- Links to the official MITRE ATT&CK page for the technique.

## Next Steps

- [SOC](/platform/soc) -- View alerts mapped to MITRE techniques.
- [Sentinel ATTM](/sentinel/attm) -- Test your detection coverage with synthetic events.
- [MITRE API](/api/mitre) -- Access coverage data programmatically.
