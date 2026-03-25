---
sidebar_position: 8
title: MCP Integration
description: Model Context Protocol integration for AI-driven operations
---

# MCP Integration

Sentinel is designed to work with the **Model Context Protocol (MCP)**. The `sentinel-mcp` bridge exposes Sentinel's capabilities as tools that AI assistants can invoke directly.

---

## MCP Tool Mappings

| MCP Tool | Sentinel Command | Use Case |
|----------|------------------|----------|
| `get_system_health` | `--json` | "What's the system status?" |
| `terminate_process` | `--kill` | "Kill the runaway ffmpeg process" |
| `block_ip_address` | `--block-ip` | "Block this suspicious IP" |
| `enable_firewall` | `--fix-firewall` | "The firewall is disabled, fix it" |
| `get_top_processes` | `--top` | "What's using all my CPU?" |
| `restart_service` | `--restart-service` | "Restart the web server" |
| `scan_ports` | `--scan-ports` | "Check what ports are open" |
| `get_asset_info` | `--asset-info` | "What hardware is this machine?" |
| `get_network_stats` | `--network-stats` | "Show network bandwidth" |
| `security_audit` | `--security-audit` | "Is this system secure?" |
| `check_updates` | `--check-updates` | "Are there OS updates?" |
| `secrets_scan` | `--secrets-scan` | "Are there any leaked credentials?" |
| `fim_watch` | `--fim-watch` | "Watch for file changes in real-time" |

---

## How It Works

Each MCP tool maps to a Sentinel CLI command. When an AI assistant invokes a tool (e.g., `get_system_health`), the MCP bridge translates it to the corresponding Sentinel command (`--json`), executes it, and returns the structured JSON result to the assistant.

This enables natural-language security operations:

1. A user asks the AI assistant: "Is this system secure?"
2. The assistant invokes the `security_audit` MCP tool
3. Sentinel runs `--security-audit` and returns structured findings
4. The assistant interprets the results and provides actionable recommendations
