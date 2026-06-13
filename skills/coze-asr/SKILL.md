---
name: coze-asr
description: Convert speech audio to text using Coze ASR. Use when you need to transcribe spoken content from a remote audio URL or a local audio file into plain text.
metadata: { "openclaw": { "emoji": "🎙️", "requires": { "bins": ["node"], "config": ["plugins.entries.coze-openclaw-plugin.config.apiKey"] } } }
---

# Coze ASR

Transcribe audio from a URL or local file using Coze ASR.

## Quick start

```bash
node {skillDir}/scripts/asr.mjs --url "https://example.com/audio.mp3"
node {skillDir}/scripts/asr.mjs --file ./recording.mp3
```

## Options

- `--url <url>`, `-u <url>` remote audio URL
- `--file <path>`, `-f <path>` local audio file

## Behavior

- One of `--url` or `--file` is required.
- If both `--url` and `--file` are provided, the local file input takes precedence.
- Local files are read and uploaded as base64 audio content.
- Supported audio formats follow the SDK/API capability: WAV, MP3, OGG Opus, M4A.
- Recommended limits from the SDK docs: duration up to 2 hours, size up to 100MB.
- The CLI prints recognized `text`, and may also print `duration` and `segments`.
- The CLI does not print full `utterances` details or raw response payload.
- This skill does not expose custom headers such as `--header`, `-H`, or mock mode.

## Notes

- The skill runtime requires `plugins.entries.coze-openclaw-plugin.config.apiKey`.
- `{skillDir}` means the directory containing this `SKILL.md`.
- Local files are read and uploaded as base64 audio content.
