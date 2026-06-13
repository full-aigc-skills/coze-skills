---
name: coze-image-gen
description: Generate one or more images from text prompts using Coze image generation. Use when you need to create images from a natural-language prompt, produce multiple image variants, or generate sequential frames from the same prompt.
metadata: { "openclaw": { "emoji": "🎨", "requires": { "bins": ["node"], "config": ["plugins.entries.coze-openclaw-plugin.config.apiKey"] } } }
---

# Coze Image Generation

Generate one or more images from a prompt using Coze.

This skill runs as a Node CLI wrapper around the backend SDK. Do not use the SDK from client-side code.

## Quick start

```bash
node {skillDir}/scripts/gen.mjs --prompt "A futuristic city at sunset"
node {skillDir}/scripts/gen.mjs --prompt "A serene mountain landscape" --count 2 --size 4K
node {skillDir}/scripts/gen.mjs --prompt "A hero's journey through magical lands" --sequential --max-sequential 5
node {skillDir}/scripts/gen.mjs --prompt "Transform into anime style" --image "https://example.com/input.jpg"
node {skillDir}/scripts/gen.mjs --prompt "A modern office workspace" --response-format url
```

## Options

- `--prompt <text>` required prompt text
- `--count <n>` number of independent generation requests, default `1`
- `--size <size>` image size: `2K`, `4K`, or `WIDTHxHEIGHT`, default `2K`
- `--image <url>` reference image URL; repeat the flag to pass multiple images
- `--response-format <format>` only supports `url`
- `--watermark <true|false>` whether to keep watermark
- `--optimize-prompt-mode <mode>` prompt optimization mode passed through to the SDK
- `--sequential` enable sequential image generation
- `--max-sequential <n>` max sequential frames, default `15`
- `--header <key:value>` custom HTTP header; repeatable, alias `-H`

## Notes

- The skill runtime requires `plugins.entries.coze-openclaw-plugin.config.apiKey`.
- `{skillDir}` means the directory containing this `SKILL.md`.
- Successful runs print generated URLs directly.
- Printed image URLs must be kept exactly intact, complete, and accurate. All URL parameters must be preserved without truncation, rewriting, omission, or reordering; in particular, parameters inside the query string such as `sign` must not be dropped, otherwise the image may be inaccessible.
- Unless the user explicitly asks to download the URL content, only return the complete URL link to the user.
- This skill does not expose base64 output.
