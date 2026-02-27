# AI-Stack

Local LLM inference VM. Runs Ollama for model serving and Open WebUI as a web interface.

## Containers

| Container | Port | Purpose |
|-----------|------|---------|
| ollama | 11434 | Local LLM runtime |
| open-webui | 3000 | Web UI for chatting with Ollama models |
| tugtainer-agent | 9413 | Tugtainer agent — reports to manager on GeneralDock |
| socket-proxy | — | Docker socket security proxy |
| watchtower | — | Automatic container updates every Sunday 03:00 |

## Access

| Service | URL |
|---------|-----|
| Open WebUI | https://openwebui.\<your-domain\> or http://\<VM_IP\>:3000 |
| Ollama API | http://\<VM_IP\>:11434 |

## Models

| Model | Use |
|-------|-----|
| llama3.2:latest | General purpose — used by n8n workflows for email summarization |
| deepseek-r1:8b | Reasoning model |

To pull additional models:
```bash
docker exec -it ollama ollama pull <model-name>
```

To list installed models:
```bash
docker exec -it ollama ollama list
```

## Integration

Ollama is used by n8n on GeneralDock for:
- **School email summarizer** — summarizes incoming school emails in real-time
- **Gmail daily digest** — summarizes and flags important personal emails at 17:00

n8n connects to Ollama directly over the LAN using the Ollama API port.

- **Portfolio contact form** — n8n also handles portfolio contact form submissions. If Ollama inference is slow (CPU-only), set `EXECUTIONS_TIMEOUT` in n8n to avoid workflow timeouts.

## Notes

- Configured for CPU inference (no GPU on this VM)
- `OLLAMA_MAX_LOADED_MODELS=1` — keeps only one model in memory at a time
- `OLLAMA_NUM_PARALLEL=2` — allows up to 2 concurrent requests
