<div align="center">

# coze-skills

**扣子 (Coze) AIGC 技能 — ASR 语音识别、TTS 语音合成、图像生成、声音克隆、网页抓取与搜索**

[![GitHub](https://img.shields.io/badge/github-full--aigc--skills%2Fcoze-skills-green.svg)](https://github.com/full-aigc-skills/coze-skills)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![Agent Skills](https://img.shields.io/badge/Agent%20Skills-兼容-purple.svg)](https://agentskills.io)

[English](./README.md) | 简体中文

</div>

---

## 📖 简介

**coze-skills** 是一组 AI 编码智能体技能，属于 [Full AIGC Skills](https://github.com/full-aigc-skills) 生态。包含 **6 个技能**。

## 📦 安装

```bash
npx skills add full-aigc-skills/coze-skills
```

## 🎯 技能列表 (6)

| 技能 | 描述 |
|------|------|
| `coze-asr` |  Convert speech audio to text using Coze ASR. Use when you need to transcribe spoken content from a  |
| `coze-image-gen` |  Generate one or more images from text prompts using Coze image generation. Use when you need to cre |
| `coze-tts` |  Convert text to speech using Coze TTS. Use when you need to synthesize spoken audio from one text i |
| `coze-voice-gen` |  Text-to-Speech (TTS) and Speech-to-Text (ASR) using coze-coding-dev-sdk. Returns results directly t |
| `coze-web-fetch` |  Fetch and extract content from URLs using coze-coding-dev-sdk. Supports web pages, PDF, Office docu |
| `coze-web-search` |  Search the web using coze-coding-dev-sdk. Supports web search, image search, AI summaries, time fil |

## 🤖 支持的智能体

适用于 [Claude Code](https://code.claude.com)、[Codex](https://developers.openai.com/codex)、[Cursor](https://cursor.com)、[OpenCode](https://opencode.ai)、[Gemini CLI](https://geminicli.com)、[GitHub Copilot](https://github.com/features/copilot)、[Windsurf](https://codeium.com/windsurf) 及 [70+ 其他](https://agentskills.io/clients)。

### Claude Code 安装

**方式一：npx skills CLI（推荐）**

```bash
npx skills add full-aigc-skills/coze-skills
```

**方式二：手动安装**

```bash
git clone https://github.com/full-aigc-skills/coze-skills.git
cp -r coze-skills/skills/* .claude/skills/
```

## 📄 License

Apache 2.0
