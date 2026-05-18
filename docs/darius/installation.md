---
sidebar_position: 2
title: Installation
description: Download, verify, and run Darius
---

# Installation

## Download

Download the latest Darius binary for your platform from the ThinkEngine dashboard under **DAST > Settings**, or from the [Downloads](/downloads/darius) page.

| Platform | Architecture | Binary |
|----------|-------------|--------|
| macOS | Apple Silicon (M1/M2/M3/M4) | `darius-darwin-arm64` |
| macOS | Intel | `darius-darwin-amd64` |
| Linux | x86_64 | `darius-linux-amd64` |
| Linux | ARM64 | `darius-linux-arm64` |
| Windows | x86_64 | `darius-windows-amd64.exe` |

## Verify the Binary

After downloading, verify the binary checksum against the value published on the Downloads page:

```bash
sha256sum darius-linux-amd64
```

Compare the output with the checksum listed for your platform.

## Make Executable (macOS / Linux)

```bash
chmod +x darius-linux-amd64
sudo mv darius-linux-amd64 /usr/local/bin/darius
```

## First Run

On first run, Darius displays a click-through EULA that must be accepted before scanning. Additionally, when targeting public-facing domains, a scan guard prompt confirms you have authorization to scan the target.

```bash
darius scan --target https://app.example.com
```

Community tier requires no account or network access. Professional and Enterprise tiers require license activation -- see the [Overview](/darius/overview#authentication-and-licensing) for details.

## Verify Installation

```bash
darius --version
```

## Next Steps

- [CLI Reference](/darius/cli-reference) -- Full list of flags and options
- [Scan Profiles](/darius/scan-profiles) -- Quick, full, and custom scan modes
- [Overview](/darius/overview) -- Feature comparison by tier
