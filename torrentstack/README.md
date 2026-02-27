# TorrentStack

Media download and serving VM. Runs the full *arr suite alongside Jellyfin and qBittorrent.

## Containers

| Container | Port | Purpose |
|-----------|------|---------|
| jellyfin | 8096 | Media server |
| sonarr | 8989 | TV show management |
| radarr | 7878 | Movie management |
| lidarr | 8686 | Music management |
| bazarr | 6767 | Subtitle management |
| prowlarr | 9696 | Indexer aggregator |
| qbittorrent | 8080 | Torrent client (also 6881 tcp/udp) |
| tugtainer-agent | 9413 | Tugtainer agent — reports to manager on GeneralDock |
| socket-proxy | — | Docker socket security proxy |
| watchtower | — | Automatic container updates every Sunday 03:00 |

## Access

| Service | URL |
|---------|-----|
| Jellyfin | http://\<VM_IP\>:8096 |
| Sonarr | http://\<VM_IP\>:8989 |
| Radarr | http://\<VM_IP\>:7878 |
| Lidarr | http://\<VM_IP\>:8686 |
| Bazarr | http://\<VM_IP\>:6767 |
| Prowlarr | http://\<VM_IP\>:9696 |
| qBittorrent | http://\<VM_IP\>:8080 |

## Storage

- All *arr app configs are stored under `/docker/appdata/<service>/`
- Media is served from `/data/media` (read-only mount in Jellyfin)
- Downloads land in `/data/torrents` and are moved to `/data/media` by the *arr apps

## Notes

- All hotio images are used (`hotio/<service>:latest`) for consistent PUID/PGID handling
- PUID/PGID: 1000/1000
- Timezone: Europe/Amsterdam
- DNS override set to public DNS to avoid potential loop issues with a local Pi-hole
- Prowlarr is wired to all *arr apps as the central indexer
