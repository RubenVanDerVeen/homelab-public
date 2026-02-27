# Homelab

Personal homelab running on a single Proxmox node. This repo contains Docker Compose files and workflow configs for all VMs, with secrets removed.

## Hardware

| Component | Spec |
|-----------|------|
| Machine | IT12 Mini PC |
| CPU | Intel i9-13900H (20 threads) |
| RAM | 64GB DDR5 |
| Storage | 1TB NVMe (primary) + 512GB NVMe (NAS) |

## Proxmox Node

- **Version**: Proxmox VE 9.1.4

## VM Overview

| VM ID | Name | Purpose |
|-------|------|---------|
| 100 | Home-Assistant | Home automation |
| 101 | RemoteDock | Network & remote access |
| 102 | GeneralDock | Management & automation |
| 103 | TorrentStack | Media download & serving |
| 104 | MediaDock | Personal media services |
| 105 | TrueNAS | NAS on dedicated NVMe |
| 106 | AMP-gaming | Game server manager |
| 107 | TeXlyre | Self-hosted LaTeX/Typst editor |
| 108 | AI-Stack | Local LLM runtime |
| 109 | PBS | Proxmox Backup Server (LXC) |

## Repository Structure

```
homelab/
├── ai-stack/           # AI-Stack VM — Ollama + Open WebUI
├── generaldock/        # GeneralDock VM — automation, monitoring, notifications
│   └── n8n-workflows/  # Exported n8n workflow JSON files
├── mediadock/          # MediaDock VM — personal media services (planned)
├── remotedock/         # RemoteDock VM — reverse proxy, DNS, remote access
│   ├── Rustdesk/       # RustDesk server compose (separate stack)
│   └── portfolio/      # Portfolio website source (served by nginx-portfolio)
└── torrentstack/       # TorrentStack VM — Jellyfin + *arr suite
```

## Key Services

| Service | VM | Purpose |
|---------|----|---------|
| Nginx Proxy Manager | RemoteDock | Reverse proxy + SSL |
| Pi-hole | RemoteDock | DNS ad blocker + local DNS |
| Cloudflare Tunnel | RemoteDock | External access without port forwarding |
| Twingate | RemoteDock | VPN remote access |
| RustDesk | RemoteDock | Self-hosted remote desktop |
| nginx-static | RemoteDock | Static site hosting (n8n privacy page) |
| nginx-portfolio | RemoteDock | Portfolio website |
| Jellyfin | TorrentStack | Media server |
| Sonarr / Radarr / Lidarr | TorrentStack | Media management |
| Prowlarr + qBittorrent | TorrentStack | Indexing + downloading |
| n8n | GeneralDock | Workflow automation |
| ntfy | GeneralDock | Push notifications |
| Pulse | GeneralDock | Proxmox monitoring dashboard |
| Uptime Kuma | GeneralDock | Service uptime monitoring + alerts |
| Tugtainer | GeneralDock | Multi-VM container manager |
| Watchtower | All Docker VMs | Automatic container updates (Sunday 03:00) |
| Ollama | AI-Stack | Local LLM inference |
| Open WebUI | AI-Stack | Web UI for Ollama |
| Home Assistant | VM 100 | Home automation |
| PBS | CT 109 | Proxmox backups → NAS NFS |

## Networking

- **Domain**: managed via Cloudflare
- **External access**: Cloudflare Tunnel for public services, Twingate for private access
- **Split DNS**: externally-exposed services resolve via Cloudflare; all other subdomains are resolved locally via Pi-hole pointing to Nginx Proxy Manager, which issues SSL certificates for them
- **Local DNS**: Pi-hole for ad blocking and local DNS resolution

### Proxy Hosts (Nginx Proxy Manager)

All hosts use Let's Encrypt SSL. Example proxy host layout — adapt domains and IPs to your setup.

| Subdomain | Destination | Service |
|-----------|-------------|---------|
| amp | VM 106:8080 | AMP — game server manager |
| compose | VM 102:3000 | ComposeTool — Docker Compose manager |
| homeassistant | VM 100:8123 | Home Assistant |
| kuma | VM 102:3001 | Uptime Kuma |
| n8nint | VM 102:5678 | n8n (internal access) |
| nginx | VM 101:81 | Nginx Proxy Manager admin |
| openwebui | VM 108:3000 | Open WebUI (Ollama) |
| pihole | VM 101:8081 | Pi-hole admin |
| proxmox | Proxmox:8006 | Proxmox VE |
| pulse | VM 102:7655 | Pulse — Proxmox monitoring |
| tracktor | VM 102:3333 | Tracktor — media tracking |
| truenas | VM 105:80 | TrueNAS |
| tugtainer | VM 102:9412 | Tugtainer — container manager |
| portfolio | VM 101:8083 | Portfolio website |

## Backups

- **Tool**: Proxmox Backup Server on LXC CT 109
- **Target**: TrueNAS NFS share
- **Schedule**: Daily at 21:30
- **Retention**: 3 daily, 3 weekly
- **VMs covered**: 100, 101, 102, 103, 104, 107

## Notes

- All compose files have secrets removed — replace placeholders before deploying
- Tugtainer agents run on each Docker VM and report to the manager on GeneralDock
- Each VM directory contains its own README with service-specific details
