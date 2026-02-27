# MediaDock

Personal media and data services VM. Currently minimal — planned for self-hosted photo management and file sync.

## Containers

| Container | Port | Purpose |
|-----------|------|---------|
| tugtainer-agent | 9413 | Tugtainer agent — reports to manager on GeneralDock |
| socket-proxy | — | Docker socket security proxy |
| watchtower | — | Automatic container updates every Sunday 03:00 |

## Planned Services

| Service | Purpose |
|---------|---------|
| Immich | Self-hosted Google Photos replacement |
| Nextcloud | Self-hosted file sync and cloud storage |

## Notes

- Kept separate from TorrentStack intentionally — personal data (photos, files) should be isolated from download/torrent traffic
- Will expand once Immich and Nextcloud are set up
