---
name: coze-web-fetch
description: Fetch and extract content from URLs using coze-coding-dev-sdk. Supports web pages, PDF, Office documents (doc/docx/ppt/pptx/xls/xlsx/csv), text files, e-books (epub/mobi), XML, and images. Returns structured content with text, images, and links.
metadata: { "openclaw": { "emoji": "🦞", "requires": { "bins": ["npx"] } } }
---

# Coze Web Fetch

Fetch and extract structured content from any URL using coze-coding-dev-sdk. Returns text, images, and links in various output formats.

## Quick Start

### Basic Fetch

```bash
npx ts-node {baseDir}/scripts/fetch.ts -u "https://example.com/article"
```

### Multiple URLs

```bash
npx ts-node {baseDir}/scripts/fetch.ts \
  -u "https://example.com/page1" \
  -u "https://example.com/page2"
```

### Output as Markdown

```bash
npx ts-node {baseDir}/scripts/fetch.ts \
  -u "https://docs.python.org/3/tutorial/" \
  --format markdown
```

### Output as JSON

```bash
npx ts-node {baseDir}/scripts/fetch.ts \
  -u "https://example.com/document.pdf" \
  --format json
```

### Text Only (No Images/Links)

```bash
npx ts-node {baseDir}/scripts/fetch.ts \
  -u "https://example.com/article" \
  --text-only
```

## Script Options

| Option               | Description                                |
| -------------------- | ------------------------------------------ |
| `-u, --url <url>`    | URL to fetch (required, can be repeated)   |
| `--format <fmt>`     | `json`, `text`, `markdown` (default: text) |
| `--text-only`        | Extract text content only                  |
| `--help`             | Show help message                          |

## Supported Document Formats

| Format           | Extensions                                  |
| ---------------- | ------------------------------------------- |
| PDF              | .pdf                                        |
| Office Documents | .doc, .docx, .ppt, .pptx, .xls, .xlsx, .csv |
| Text Files       | .txt, .text                                 |
| E-books          | .epub, .mobi                                |
| XML              | .xml                                        |
| Images           | .jpg, .png, .gif, .webp, etc.               |
| Web Pages        | .html, .htm, or any URL                     |

## Output Formats

### Text (default)

```
============================================================
FETCHED CONTENT
============================================================
Title: Example Article
URL: https://example.com/article

------------------------------------------------------------
CONTENT
------------------------------------------------------------
[TEXT] This is the main article content...

[IMAGE] https://example.com/image.jpg

[LINK] Related Article -> https://example.com/related
```

### Markdown

```markdown
# Example Article

**URL**: https://example.com/article

---

## Content

This is the main article content...

![Image](https://example.com/image.jpg)

- [Related Article](https://example.com/related)
```

### JSON

Raw API response with full content structure.

## Content Types

The fetcher extracts three types of content:

| Type  | Description                          |
| ----- | ------------------------------------ |
| text  | Extracted text content from the page |
| image | Image URLs with display information  |
| link  | Hyperlinks found in the content      |

## Notes

- Use `--text-only` for cleaner output when you only need text
- PDF and Office documents are automatically parsed
- Images are re-signed for secure access
- Multiple URLs can be fetched in a single command

