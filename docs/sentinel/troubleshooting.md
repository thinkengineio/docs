---
sidebar_position: 11
title: Troubleshooting
description: Common issues and solutions
---

# Troubleshooting

## Common Issues

| Issue | Solution |
|-------|----------|
| `Temp: ??` | Run with `sudo` for thermal sensor access |
| `ERR: RUN AS SUDO` | Sentinel needs root for `powermetrics` |
| Permission denied on kill | Use `sudo sentinel --kill <PID>` |
| Webhook fails | Check network connectivity and URL |
| `--fim-watch` sees no events | Verify inotify limits: `sysctl fs.inotify.max_user_watches` |
| `--osv-only` times out | Check outbound HTTPS to `api.osv.dev` |

---

## Structured JSON Error Codes

All commands return structured JSON with error codes for programmatic handling:

```json
// Success
{"success": true, "action": "block_ip", "ip": "192.168.1.100"}

// Error with fix suggestion
{
  "success": false,
  "action": "kill",
  "pid": 1234,
  "error": "Permission denied",
  "error_code": "PERMISSION_DENIED",
  "fix": "Run with sudo: sudo sentinel --kill 1234"
}
```

### Error Code Reference

| Code | Meaning |
|------|---------|
| `PERMISSION_DENIED` | Needs sudo |
| `PROCESS_NOT_FOUND` | PID doesn't exist |
| `INVALID_IP` | Malformed IP address |
| `ALREADY_BLOCKED` | IP already in blocklist |
| `NOT_BLOCKED` | IP not in blocklist |
| `CONFIG_MISSING` | Required config not set |

---

## Getting Help

If you encounter an issue not listed here, check the [CLI Reference](./cli-reference.md) for correct flag usage, or visit the [GitHub Releases page](https://github.com/thinkengineio/sentinel-maas/releases) for the latest version and release notes.
