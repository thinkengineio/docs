---
sidebar_position: 1
title: Sentinel Agent
description: Download Sentinel agent binaries
---

# Sentinel Agent Downloads

Download the latest Sentinel agent binary for your platform. All binaries are statically compiled with no external dependencies.

## Latest Release

| Platform | Architecture | Binary | Download |
|---|---|---|---|
| macOS | Apple Silicon (M1/M2/M3/M4) | `sentinel-darwin-arm64` | [Download](https://github.com/thinkengineio/sentinel-maas/releases/latest/download/sentinel-darwin-arm64) |
| macOS | Intel | `sentinel-darwin-amd64` | [Download](https://github.com/thinkengineio/sentinel-maas/releases/latest/download/sentinel-darwin-amd64) |
| Linux | x86_64 | `sentinel-linux-amd64` | [Download](https://github.com/thinkengineio/sentinel-maas/releases/latest/download/sentinel-linux-amd64) |
| Linux | ARM64 (Graviton, Ampere, RPi) | `sentinel-linux-arm64` | [Download](https://github.com/thinkengineio/sentinel-maas/releases/latest/download/sentinel-linux-arm64) |

## Quick Install

### macOS (Apple Silicon)

```bash
curl -LO https://github.com/thinkengineio/sentinel-maas/releases/latest/download/sentinel-darwin-arm64
chmod +x sentinel-darwin-arm64
sudo mv sentinel-darwin-arm64 /usr/local/bin/sentinel
```

### macOS (Intel)

```bash
curl -LO https://github.com/thinkengineio/sentinel-maas/releases/latest/download/sentinel-darwin-amd64
chmod +x sentinel-darwin-amd64
sudo mv sentinel-darwin-amd64 /usr/local/bin/sentinel
```

### Linux (x86_64)

```bash
curl -LO https://github.com/thinkengineio/sentinel-maas/releases/latest/download/sentinel-linux-amd64
chmod +x sentinel-linux-amd64
sudo mv sentinel-linux-amd64 /usr/local/bin/sentinel
```

### Linux (ARM64)

```bash
curl -LO https://github.com/thinkengineio/sentinel-maas/releases/latest/download/sentinel-linux-arm64
chmod +x sentinel-linux-arm64
sudo mv sentinel-linux-arm64 /usr/local/bin/sentinel
```

## Verify Installation

```bash
sentinel --version
```

## Enterprise Security Modules

The enterprise security modules -- including CIS hardening, container audit, threat detection, and vulnerability scanning -- are **Linux-only**. These modules require elevated permissions and are designed for server and cloud workload environments.

## Next Steps

- [Installation Guide](/sentinel/installation) -- Full installation and configuration instructions
- [Configuration Reference](/sentinel/configuration) -- All command-line flags and options
- [Release Notes](/downloads/release-notes) -- See what's new in each version
