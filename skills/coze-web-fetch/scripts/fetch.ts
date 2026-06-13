#!/usr/bin/env npx ts-node
import { FetchClient, Config, APIError } from "coze-coding-dev-sdk";

interface FetchOptions {
  urls: string[];
  format: "json" | "text" | "markdown";
  textOnly: boolean;
}

interface ContentItem {
  type: "text" | "image" | "link";
  text?: string;
  image?: {
    display_url?: string;
    url?: string;
    width?: number;
    height?: number;
  };
  url?: string;
  title?: string;
}

interface FetchResponse {
  title?: string;
  url?: string;
  content?: ContentItem[];
}

function formatAsMarkdown(response: FetchResponse, textOnly: boolean): string {
  let md = "";

  if (response.title) {
    md += `# ${response.title}\n\n`;
  }

  if (response.url) {
    md += `**URL**: ${response.url}\n\n`;
  }

  md += "---\n\n";
  md += "## Content\n\n";

  if (response.content && response.content.length > 0) {
    const links: ContentItem[] = [];

    for (const item of response.content) {
      if (item.type === "text" && item.text) {
        md += `${item.text}\n\n`;
      } else if (item.type === "image" && !textOnly) {
        const imageUrl = item.image?.display_url || item.image?.url;
        if (imageUrl) {
          md += `![Image](${imageUrl})\n\n`;
        }
      } else if (item.type === "link" && !textOnly) {
        links.push(item);
      }
    }

    if (links.length > 0) {
      md += "## Links\n\n";
      for (const link of links) {
        const linkTitle = link.title || link.url || "Link";
        md += `- [${linkTitle}](${link.url})\n`;
      }
      md += "\n";
    }
  } else {
    md += "*No content extracted*\n\n";
  }

  return md;
}

function formatAsText(response: FetchResponse, textOnly: boolean): string {
  let text = "";

  text += "=".repeat(60) + "\n";
  text += "FETCHED CONTENT\n";
  text += "=".repeat(60) + "\n";

  if (response.title) {
    text += `Title: ${response.title}\n`;
  }

  if (response.url) {
    text += `URL: ${response.url}\n`;
  }

  text += "\n";
  text += "-".repeat(60) + "\n";
  text += "CONTENT\n";
  text += "-".repeat(60) + "\n";

  if (response.content && response.content.length > 0) {
    for (const item of response.content) {
      if (item.type === "text" && item.text) {
        text += `[TEXT] ${item.text}\n\n`;
      } else if (item.type === "image" && !textOnly) {
        const imageUrl = item.image?.display_url || item.image?.url;
        if (imageUrl) {
          text += `[IMAGE] ${imageUrl}\n\n`;
        }
      } else if (item.type === "link" && !textOnly) {
        const linkTitle = item.title || "Link";
        text += `[LINK] ${linkTitle} -> ${item.url}\n\n`;
      }
    }
  } else {
    text += "No content extracted\n";
  }

  return text;
}

async function fetchUrl(
  client: FetchClient,
  url: string,
  options: FetchOptions
): Promise<string> {
  console.log(`Fetching: ${url}...`);

  const response = (await client.fetch(url)) as FetchResponse;

  if (options.format === "json") {
    return JSON.stringify(response, null, 2);
  } else if (options.format === "markdown") {
    return formatAsMarkdown(response, options.textOnly);
  } else {
    return formatAsText(response, options.textOnly);
  }
}

async function main(): Promise<number> {
  const args = process.argv.slice(2);
  const options: FetchOptions = {
    urls: [],
    format: "text",
    textOnly: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if ((arg === "--url" || arg === "-u") && args[i + 1]) {
      options.urls.push(args[++i]);
    } else if (arg === "--format" && args[i + 1]) {
      options.format = args[++i] as "json" | "text" | "markdown";
    } else if (arg === "--text-only") {
      options.textOnly = true;
    } else if (arg === "--help") {
      console.log(`
Usage: npx ts-node fetch.ts [OPTIONS]

Options:
  -u, --url <url>     URL to fetch (required, can be repeated for multiple URLs)
  --format <fmt>      Output format: json, text, markdown (default: text)
  --text-only         Extract text content only (ignore images and links)
  --help              Show this help message

Supported Document Formats:
  - Web pages (HTML)
  - PDF documents
  - Office documents (doc, docx, ppt, pptx, xls, xlsx, csv)
  - Text files (txt, text)
  - E-books (epub, mobi)
  - XML documents
  - Images

Examples:
  # Basic fetch
  npx ts-node fetch.ts -u "https://example.com/article"

  # Multiple URLs
  npx ts-node fetch.ts -u "https://example.com/page1" -u "https://example.com/page2"

  # Output as markdown
  npx ts-node fetch.ts -u "https://docs.python.org/3/tutorial/" --format markdown

  # Text only (no images/links)
  npx ts-node fetch.ts -u "https://example.com/article" --text-only
`);
      return 0;
    }
  }

  if (options.urls.length === 0) {
    console.error("Error: at least one --url is required");
    return 1;
  }

  const config = new Config();
  const client = new FetchClient(config);

  try {
    for (const url of options.urls) {
      const output = await fetchUrl(client, url, options);
      console.log("\n" + output);

      if (options.urls.length > 1) {
        console.log("\n" + "=".repeat(60) + "\n");
      }
    }

    console.log(`\nSuccessfully fetched ${options.urls.length} URL(s).`);
    return 0;
  } catch (error) {
    if (error instanceof APIError) {
      console.error(`API Error: ${error.message}`);
      console.error(`Status Code: ${error.statusCode}`);
    } else {
      console.error(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }
    return 1;
  }
}

main().then((code) => process.exit(code));

