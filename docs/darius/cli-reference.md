---
sidebar_position: 3
title: CLI Reference
description: Darius command-line flags and options
---

# CLI Reference

Darius is invoked from the command line. All scanning is done through the `scan` subcommand.

## Scan Command

```bash
darius scan [flags]
```

### Required Flags

| Flag | Description |
|------|-------------|
| `--target <URL>` | The URL of the application to scan |

### Scan Configuration

| Flag | Description | Default |
|------|-------------|---------|
| `--profile <name>` | Scan profile: `quick`, `full`, or `custom` | `quick` |
| `--openapi <path>` | Path to an OpenAPI/Swagger spec file for API fuzzing | -- |
| `--techniques <ids>` | Comma-separated template IDs to include in a custom scan | -- |

### Output

| Flag | Description | Default |
|------|-------------|---------|
| `--report <format>` | Report format: `json` or `html` | `json` (stdout) |
| `--output <path>` | Write report to a file instead of stdout | -- |

### Authentication and Licensing

| Flag | Description |
|------|-------------|
| `--license activate <key>` | Activate a Professional license key |
| `--license status` | Show current license status and tier |
| `--license revoke` | Revoke the current license |

### Enterprise Flags

| Flag | Description |
|------|-------------|
| `--api-key <key>` | API key for Enterprise tier platform integration |
| `--upload` | Upload findings to the ThinkEngine platform after scan |

### Other

| Flag | Description |
|------|-------------|
| `--version` | Print the Darius version and exit |
| `--help` | Show help text |

## Examples

```bash
# Community: quick scan, JSON to stdout
darius scan --target https://app.example.com

# Professional: full scan with HTML report
darius scan --target https://app.example.com --profile full --report html

# API fuzzing with an OpenAPI spec
darius scan --target https://app.example.com --openapi ./openapi.yaml

# Enterprise: full scan with platform upload
darius scan --target https://app.example.com --profile full --upload --api-key sk-dast-xxx
```
