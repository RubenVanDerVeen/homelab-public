# RemoteDock

Network and remote access VM. Handles reverse proxying, DNS, external access and remote desktop infrastructure.

## Containers

| Container | Port | Purpose |
|-----------|------|---------|
| ruben-nginx-1 | 80, 443, 81 | Nginx Proxy Manager — reverse proxy + SSL |
| pihole | 53, 8081 | Pi-hole — DNS ad blocker + local DNS overrides |
| cloudflared | — | Cloudflare Tunnel — external access without port forwarding |
| cloudflare-ddns | — | Cloudflare Dynamic DNS — keeps domain pointed at home IP |
| twingate | — | Twingate VPN connector — private remote access |
| tugtainer-agent | 9413 | Tugtainer agent — reports to manager on GeneralDock |
| socket-proxy | — | Docker socket security proxy |
| watchtower | — | Automatic container updates every Sunday 03:00 |
| nginx-static | 8082 | Static site hosting |
| nginx-portfolio | 8083 | Portfolio website |

RustDesk runs as a separate stack — see `Rustdesk/docker-compose.yml`.

## Rustdesk/

| Container | Purpose |
|-----------|---------|
| hbbs | RustDesk signaling server |
| hbbr | RustDesk relay server |

RustDesk uses `network_mode: host` for both containers.

## Access

| Service | URL |
|---------|-----|
| NPM Admin | http://\<VM_IP\>:81 or https://nginx.\<your-domain\> |
| Pi-hole Admin | http://\<VM_IP\>:8081/admin or https://pihole.\<your-domain\> |

## Proxy Hosts

All hosts use Let's Encrypt SSL via NPM.

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

## Networking Notes

- **Cloudflare Tunnel**: exposes selected services externally — no ports need to be forwarded on the router
- **Split DNS**: the Cloudflare-tunneled services resolve via Cloudflare externally — no local override, so local access uses direct IPs. All other subdomains are handled via Pi-hole DNS overrides pointing to NPM, with SSL via Let's Encrypt
- **Cloudflare tunnel — same-VM services**: use `http://172.17.0.1:<port>` as the service URL, not the host LAN IP — containers cannot reach the host via its LAN IP
- **Cloudflare DDNS**: keeps the root A record updated with the current home IP

## Secrets

The following placeholders in `docker-compose.yml` must be replaced before deploying:
- Pi-hole admin password
- Cloudflare Tunnel token (`cloudflared`)
- Cloudflare API token + domain (`cloudflare-ddns`)
- Tugtainer agent secret
