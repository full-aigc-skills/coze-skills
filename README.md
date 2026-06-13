<div align="center">

# coze-skills

**扣子 (Coze) AIGC skills — ASR, TTS, image generation, voice cloning, web fetch & search**

[![GitHub](https://img.shields.io/badge/github-full--aigc--skills%2Fcoze-skills-green.svg)](https://github.com/full-aigc-skills/coze-skills)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![Agent Skills](https://img.shields.io/badge/Agent%20Skills-Compatible-purple.svg)](https://agentskills.io)

English | [简体中文](./README.zh-CN.md)

[Introduction](#-introduction) · [Install](#-install) · [Skills](#-skills) · [Supported Agents](#-supported-agents) · [Ecosystem](#-ecosystem)

</div>

---

## 📖 Introduction

**coze-skills** is a curated collection of Agent Skills for AI coding agents, part of the [Full AIGC Skills](https://github.com/full-aigc-skills) ecosystem.

This package includes **6 skills**. Each skill is a self-contained `SKILL.md` file that AI agents load on-demand.

## 📦 Install

```bash
npx skills add full-aigc-skills/coze-skills
```

Or install specific skills: `npx skills add full-aigc-skills/coze-skills --skill <skill-name>`

## 🎯 Skills (6)

| Skill | Description |
|-------|-------------|
| `coze-asr` |  Convert speech audio to text using Coze ASR. Use when you need to transcribe spoken content from a  |
| `coze-image-gen` |  Generate one or more images from text prompts using Coze image generation. Use when you need to cre |
| `coze-tts` |  Convert text to speech using Coze TTS. Use when you need to synthesize spoken audio from one text i |
| `coze-voice-gen` |  Text-to-Speech (TTS) and Speech-to-Text (ASR) using coze-coding-dev-sdk. Returns results directly t |
| `coze-web-fetch` |  Fetch and extract content from URLs using coze-coding-dev-sdk. Supports web pages, PDF, Office docu |
| `coze-web-search` |  Search the web using coze-coding-dev-sdk. Supports web search, image search, AI summaries, time fil |

## 🤖 Supported Agents

Works with [Claude Code](https://code.claude.com), [Codex](https://developers.openai.com/codex), [Cursor](https://cursor.com), [OpenCode](https://opencode.ai), [Gemini CLI](https://geminicli.com), [GitHub Copilot](https://github.com/features/copilot), [Windsurf](https://codeium.com/windsurf), and [70+ others](https://agentskills.io/clients).

### Claude Code Installation

**Option 1: npx skills CLI (Recommended)**

```bash
npx skills add full-aigc-skills/coze-skills
```

**Option 2: Manual Installation**

```bash
git clone https://github.com/full-aigc-skills/coze-skills.git
cp -r coze-skills/skills/* .claude/skills/
```

For more details, see the [Claude Code Skills Guide](https://code.claude.com/docs/en/skills) and [Agent Skills Spec](https://agentskills.io/).

## 🌐 Ecosystem

| Resource | Link |
|----------|------|
| **Full AIGC Skills** | [github.com/full-aigc-skills](https://github.com/full-aigc-skills) |
| **Agent Skills Spec** | [agentskills.io](https://agentskills.io) |
| **Skills CLI** | [github.com/vercel-labs/skills](https://github.com/vercel-labs/skills) |

## 📄 License

Apache 2.0 — see [LICENSE](LICENSE).
