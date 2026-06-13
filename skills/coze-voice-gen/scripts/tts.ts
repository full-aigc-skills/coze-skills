#!/usr/bin/env npx ts-node
import { TTSClient, Config, APIError } from "coze-coding-dev-sdk";

type AudioFormat = "mp3" | "pcm" | "ogg_opus";
type SampleRate = 8000 | 16000 | 22050 | 24000 | 32000 | 44100 | 48000;

interface TTSOptions {
  texts: string[];
  speaker: string;
  audioFormat: AudioFormat;
  sampleRate: SampleRate;
  speechRate: number;
  loudnessRate: number;
}

async function main(): Promise<number> {
  const args = process.argv.slice(2);
  const options: TTSOptions = {
    texts: [],
    speaker: "zh_female_xiaohe_uranus_bigtts",
    audioFormat: "mp3",
    sampleRate: 24000,
    speechRate: 0,
    loudnessRate: 0,
  };

  let singleText: string | undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--text" && args[i + 1]) {
      singleText = args[++i];
    } else if (arg === "--texts") {
      while (args[i + 1] && !args[i + 1].startsWith("--")) {
        options.texts.push(args[++i]);
      }
    } else if (arg === "--speaker" && args[i + 1]) {
      options.speaker = args[++i];
    } else if (arg === "--format" && args[i + 1]) {
      options.audioFormat = args[++i] as AudioFormat;
    } else if (arg === "--sample-rate" && args[i + 1]) {
      options.sampleRate = parseInt(args[++i], 10) as SampleRate;
    } else if (arg === "--speech-rate" && args[i + 1]) {
      options.speechRate = parseInt(args[++i], 10);
    } else if (arg === "--loudness-rate" && args[i + 1]) {
      options.loudnessRate = parseInt(args[++i], 10);
    } else if (arg === "--help") {
      console.log(`
Usage: npx ts-node tts.ts [OPTIONS]

Options:
  --text <text>           Single text to synthesize
  --texts <texts...>      Multiple texts for batch generation
  --speaker <id>          Voice ID (default: zh_female_xiaohe_uranus_bigtts)
  --format <fmt>          Audio format: mp3, pcm, ogg_opus (default: mp3)
  --sample-rate <hz>      Sample rate: 8000-48000 (default: 24000)
  --speech-rate <n>       Speech rate: -50 to 100 (default: 0)
  --loudness-rate <n>     Volume: -50 to 100 (default: 0)
  --help                  Show this help message

Available Voices:
  General:
    zh_female_xiaohe_uranus_bigtts    - Xiaohe (default)
    zh_female_vv_uranus_bigtts        - Vivi (Chinese & English)
    zh_male_m191_uranus_bigtts        - Yunzhou (male)
    zh_male_taocheng_uranus_bigtts    - Xiaotian (male)
  
  Audiobook:
    zh_female_xueayi_saturn_bigtts    - Children's audiobook
  
  Video Dubbing:
    zh_male_dayi_saturn_bigtts        - Dayi (male)
    zh_female_mizai_saturn_bigtts     - Mizai (female)

Examples:
  # Single audio
  npx ts-node tts.ts --text "Hello world"

  # Batch generation
  npx ts-node tts.ts --texts "Chapter 1" "Chapter 2"

  # Custom voice and parameters
  npx ts-node tts.ts --text "Fast speech" --speaker zh_male_dayi_saturn_bigtts --speech-rate 30
`);
      return 0;
    }
  }

  if (singleText) {
    options.texts = [singleText];
  }

  if (options.texts.length === 0) {
    console.error("Error: --text or --texts is required");
    return 1;
  }

  const config = new Config();
  const client = new TTSClient(config);

  for (let idx = 0; idx < options.texts.length; idx++) {
    const text = options.texts[idx];
    console.log(`[${idx + 1}/${options.texts.length}] ${text.slice(0, 50)}${text.length > 50 ? "..." : ""}`);

    try {
      const response = await client.synthesize({
        uid: `tts-${Date.now()}`,
        text,
        speaker: options.speaker,
        audioFormat: options.audioFormat,
        sampleRate: options.sampleRate,
        speechRate: options.speechRate,
        loudnessRate: options.loudnessRate,
      });

      console.log(`  ${response.audioUri}`);
    } catch (error) {
      if (error instanceof APIError) {
        console.error(`  API Error: ${error.message}`);
        console.error(`  Status Code: ${error.statusCode}`);
      } else {
        console.error(`  Error: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  }

  return 0;
}

main().then((code) => process.exit(code));
