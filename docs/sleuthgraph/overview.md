---
sidebar_position: 1
title: Sleuthgraph — Open-Source OSINT Workbench
description: Typed entity graph for security investigations
---

# Sleuthgraph

### Open-Source OSINT Workbench

Sleuthgraph is an open-source investigation workbench for security analysts -- think "Grafana for OSINT." It provides a typed entity graph, evidence chain of custody, and a growing library of OSINT plugins so you can map threat infrastructure, track adversary campaigns, and build court-ready investigation packages.

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Entity Graph** | Typed nodes (IP, domain, email, person, org, hash, etc.) with named relationships, visualized as an interactive Cytoscape.js graph |
| **11 OSINT Plugins** | 8 free community plugins (DNS, WHOIS, crt.sh, VirusTotal, AbuseIPDB, Shodan, IPinfo, GeoIP) + 3 BYOK plugins (GreyNoise, PassiveTotal, SecurityTrails) |
| **Evidence Chain** | Append-only evidence ledger with SHA-256 content hashing, per-org encryption at rest, and presigned download URLs |
| **Case Management** | Cases with status tracking, soft-delete, and full CRUD -- organize entities, relationships, and evidence per investigation |
| **Interactive Visualization** | Cytoscape.js graph view with layout controls, node grouping by type, and detail drawers for entities and relationships |
| **Plugin Queue** | Background async execution via Redis-backed task queue with run history and status tracking |

---

## Architecture

```
sleuthgraph-web  (Next.js + Mantine + Cytoscape.js)
       |
sleuthgraph-api  (FastAPI + PostgreSQL + Apache AGE graph + MinIO + Redis)
       |
  OSINT plugins  (async workers consuming from Redis queue)
```

---

## Quick Start

```bash
git clone https://github.com/thinkengineio/sleuthgraph.git
cd sleuthgraph
docker compose up
```

The web UI is available at `http://localhost:3000` and the API at `http://localhost:8000`.

---

## Repositories

| Repo | Description |
|------|-------------|
| [sleuthgraph](https://github.com/thinkengineio/sleuthgraph) | Meta repo -- docs, specs, plans, docker-compose |
| [sleuthgraph-api](https://github.com/thinkengineio/sleuthgraph-api) | Backend -- FastAPI, PostgreSQL + AGE, plugin SDK |
| [sleuthgraph-web](https://github.com/thinkengineio/sleuthgraph-web) | Frontend -- Next.js, Mantine, Cytoscape.js |

---

## Hosted Version

A hosted version is available at [sleuthgraph.io](https://sleuthgraph.io) for teams that prefer not to self-host.

---

## License

Sleuthgraph is released under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).

---

## Next Steps

- [GitHub: thinkengineio/sleuthgraph](https://github.com/thinkengineio/sleuthgraph) -- Clone the repo and get started
- [Sentinel Agent](/sentinel/overview) -- Feed endpoint telemetry into your investigations
- [Darius DAST](/darius/overview) -- Scan targets discovered during OSINT research
