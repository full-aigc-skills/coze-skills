---
name: coze-tts
description: Convert text to speech using Coze TTS. Use when you need to synthesize spoken audio from one text input or multiple text segments, optionally with a specific speaker, format, sample rate, or speech settings.
metadata: { "openclaw": { "emoji": "🔊", "requires": { "bins": ["node"], "config": ["plugins.entries.coze-openclaw-plugin.config.apiKey"] } } }
---

# Coze TTS

Generate speech audio URLs from text using Coze TTS.

## Quick start

```bash
node {skillDir}/scripts/tts.mjs --text "Hello, welcome to our service"
node {skillDir}/scripts/tts.mjs --texts "Chapter 1" "Chapter 2" --speaker zh_male_m191_uranus_bigtts
node {skillDir}/scripts/tts.mjs --text "Fast announcement" --speech-rate 30 --format mp3 --sample-rate 48000
```

## Options

- `--text <text>` single text input. If both `--text` and `--texts` are provided, `--text` takes precedence.
- `--texts <texts...>` multiple text inputs. Values are read until the next `--flag`.
- `--speaker <id>` speaker id, default `zh_female_xiaohe_uranus_bigtts`
- `--format <fmt>` audio format: `mp3`, `pcm`, or `ogg_opus`. Default is SDK default (`mp3`).
- `--sample-rate <hz>` sample rate. Supported values: `8000`, `16000`, `22050`, `24000`, `32000`, `44100`, `48000`. Default is SDK default (`24000`).
- `--speech-rate <n>` speech rate adjustment, range `-50` to `100`, default `0`
- `--loudness-rate <n>` loudness adjustment, range `-50` to `100`, default `0`

## Behavior

- At least one of `--text` or `--texts` is required.
- This skill currently supports plain text input only. It does not expose `ssml`, `--header`, `-H`, or `--mock`.
- The CLI prints one audio URL per generated segment. It does not download audio files locally.
- Printed audio URLs must be kept exactly intact, complete, and accurate. All URL parameters must be preserved without truncation, rewriting, omission, or reordering; in particular, parameters inside the query string such as `sign` must not be dropped, otherwise the audio may be inaccessible.
- Unless the user explicitly asks to download the URL content, only return the complete URL link to the user.
- The CLI does not print `audioSize`, even though the underlying SDK returns it.
- Invalid ranges or unsupported values are passed through to the SDK and may fail there.

## Sample Rates

Supported: `8000`, `16000`, `22050`, `24000`, `32000`, `44100`, `48000` Hz

- `8000-16000`: Phone quality
- `22050-24000`: Standard quality (default)
- `32000-48000`: High quality

## Tuning

- `speechRate`: range `-50` to `100`, default `0`. Negative values slow speech down, positive values speed it up.
- `loudnessRate`: range `-50` to `100`, default `0`. Negative values make output quieter, positive values make it louder.

## Voices

### General

- `zh_female_xiaohe_uranus_bigtts` `小荷`: 默认，通用女声
- `zh_female_vv_uranus_bigtts` `Vivi`: 中英双语女声
- `zh_male_m191_uranus_bigtts` `云舟`: 男声
- `zh_male_taocheng_uranus_bigtts` `小天`: 男声

### Audiobook / Reading

- `zh_female_xueayi_saturn_bigtts` `雪阿姨`: 儿童有声读物女声

### Video Dubbing

- `zh_male_dayi_saturn_bigtts` `大一`: 男声
- `zh_female_mizai_saturn_bigtts` `米仔`: 女声
- `zh_female_jitangnv_saturn_bigtts` `鸡汤女`: 励志女声
- `zh_female_meilinvyou_saturn_bigtts` `甜美女友`: 甜美女友
- `zh_female_santongyongns_saturn_bigtts` `三通女声`: 通用流畅女声
- `zh_male_ruyayichen_saturn_bigtts` `儒雅一尘`: 儒雅男声

### Roleplay

- `saturn_zh_female_keainvsheng_tob` `可爱女生`: 可爱女生
- `saturn_zh_female_tiaopigongzhu_tob` `俏皮公主`: 俏皮公主
- `saturn_zh_male_shuanglangshaonian_tob` `爽朗少年`: 爽朗少年
- `saturn_zh_male_tiancaitongzhuo_tob` `天才同桌`: 天才同桌
- `saturn_zh_female_cancan_tob` `灿灿`: 知性灿灿

## Notes

- The skill runtime requires `plugins.entries.coze-openclaw-plugin.config.apiKey`.
- `{skillDir}` means the directory containing this `SKILL.md`.
- The script prints one audio URL per generated segment.
- The returned URL must be used as-is, in full, and with every parameter preserved exactly, especially query parameters such as `sign`, otherwise the audio may not be accessible.
