#!/usr/bin/env npx ts-node
import { ASRClient, Config, APIError } from "coze-coding-dev-sdk";
import * as fs from "fs";

interface ASROptions {
  url?: string;
  file?: string;
}

function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

async function main(): Promise<number> {
  const args = process.argv.slice(2);
  const options: ASROptions = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if ((arg === "--url" || arg === "-u") && args[i + 1]) {
      options.url = args[++i];
    } else if ((arg === "--file" || arg === "-f") && args[i + 1]) {
      options.file = args[++i];
    } else if (arg === "--help") {
      console.log(`
Usage: npx ts-node asr.ts [OPTIONS]

Options:
  -u, --url <url>       Audio file URL
  -f, --file <path>     Local audio file path
  --help                Show this help message

Audio Requirements:
  - Duration: ≤ 2 hours
  - File size: ≤ 100MB
  - Formats: WAV, MP3, OGG OPUS, M4A

Examples:
  # From URL
  npx ts-node asr.ts --url "https://example.com/audio.mp3"

  # From local file
  npx ts-node asr.ts --file ./recording.mp3
`);
      return 0;
    }
  }

  if (!options.url && !options.file) {
    console.error("Error: --url or --file is required");
    return 1;
  }

  const config = new Config();
  const client = new ASRClient(config);

  try {
    let result;

    if (options.file) {
      console.log(`Reading local file: ${options.file}`);
      if (!fs.existsSync(options.file)) {
        console.error(`Error: File not found: ${options.file}`);
        return 1;
      }

      const audioData = fs.readFileSync(options.file);
      const fileSizeMB = audioData.length / (1024 * 1024);
      console.log(`File size: ${fileSizeMB.toFixed(2)} MB`);

      if (fileSizeMB > 100) {
        console.error("Error: File size exceeds 100MB limit");
        return 1;
      }

      const base64Data = audioData.toString("base64");
      console.log("Recognizing speech...");

      result = await client.recognize({
        uid: `asr-${Date.now()}`,
        base64Data,
      });
    } else if (options.url) {
      console.log(`Recognizing from URL: ${options.url}`);
      result = await client.recognize({
        uid: `asr-${Date.now()}`,
        url: options.url,
      });
    }

    if (!result) {
      console.error("Error: Recognition failed");
      return 1;
    }

    console.log("\n" + "=".repeat(60));
    console.log("TRANSCRIPTION");
    console.log("=".repeat(60));
    console.log(result.text);
    console.log("=".repeat(60));

    if (result.duration) {
      console.log(`\nDuration: ${formatDuration(result.duration)}`);
    }

    if (result.utterances && result.utterances.length > 0) {
      console.log(`\nSegments: ${result.utterances.length}`);
    }

    return 0;
  } catch (error) {
    if (error instanceof APIError) {
      console.error(`API Error: ${error.message}`);
      console.error(`Status Code: ${error.statusCode}`);
    } else {
      console.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
    return 1;
  }
}

main().then((code) => process.exit(code));
