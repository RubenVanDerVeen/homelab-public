# GeneralDock

General-purpose Docker VM for management, monitoring, automation and notifications.

## Containers

| Container | Port | Purpose |
|-----------|------|---------|
| tugtainer | 9412 | Multi-VM container manager (primary instance) |
| socket-proxy | — | Docker socket security proxy for Tugtainer |
| n8n | 5678 | Workflow automation |
| ntfy | 9090 | Push notifications |
| pulse | 7655 | Proxmox monitoring dashboard |
| composetoolbox | 3000 | Docker Compose manager UI |
| tracktor-app | 3333 | Media tracking |
| uptime-kuma | 3001 | Service uptime monitoring with alerts |
| watchtower | — | Automatic container updates every Sunday 03:00 |

## Access

| Service | URL |
|---------|-----|
| n8n | https://n8nint.\<your-domain\> or http://\<VM_IP\>:5678 |
| ntfy | https://ntfy.\<your-domain\> |
| Pulse | https://pulse.\<your-domain\> or http://\<VM_IP\>:7655 |
| ComposeTool | https://compose.\<your-domain\> or http://\<VM_IP\>:3000 |
| Tracktor | https://tracktor.\<your-domain\> or http://\<VM_IP\>:3333 |
| Tugtainer | https://tugtainer.\<your-domain\> or http://\<VM_IP\>:9412 |
| Uptime Kuma | https://kuma.\<your-domain\> or http://\<VM_IP\>:3001 |

## n8n Workflows

Workflow JSON files are stored in `n8n-workflows/` and can be imported via n8n's UI (Workflows → Import from file).

| File | Description |
|------|-------------|
| `school-mail-sumarized.json` | Real-time school email summarizer — polls Gmail every minute for emails with a specific label, fetches full email body (`simple: false`), summarizes via Ollama, sends push notification to ntfy |
| `gmail-daily-digest.json` | Daily digest at 17:00 — fetches all personal Gmail inbox emails from the past 24h, summarizes and flags important ones via Ollama, sends to ntfy |
| `portfolio-contact.json` | Portfolio contact form receiver — accepts POST from a portfolio site contact form, forwards message to ntfy |

### n8n Setup Notes

- Ollama runs on AI-Stack VM — set `OLLAMA_BASE_URL` in the compose file accordingly; model: `llama3.2:latest`
- Gmail OAuth uses a Google Cloud project with Gmail API enabled
- **Timezone**: workflow settings must have the correct timezone set — the `TZ` env var alone does not apply to cron triggers
- **Gmail OAuth tokens**: if your Google Cloud app is in Testing mode, tokens expire every 7 days and need manual reconnect via n8n credential settings. Publish the app to avoid this.
- After importing workflows, reconnect your Gmail and Ollama credentials in n8n — imported credential references will not match your instance
- **CORS**: set `N8N_CORS_ALLOWED_ORIGINS=<YOUR_PORTFOLIO_DOMAIN>` if using the portfolio contact form workflow — required for the browser fetch to reach the webhook
- **Execution timeout**: set `EXECUTIONS_TIMEOUT=1800` (seconds) if Ollama inference is slow — prevents workflows from timing out mid-run
- **Full email body**: school mail trigger uses `simple: false` on the Gmail Trigger node so `$json.text` contains the full decoded body instead of just the snippet

### ntfy Topics

| Topic | Description |
|-------|-------------|
| `school-email` | Real-time school email summaries |
| `gmail-digest` | Daily personal Gmail digest at 17:00 |
| `container-updates` | Watchtower update notifications every Sunday 03:00 |
