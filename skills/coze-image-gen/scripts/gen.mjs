#!/usr/bin/env node

import createJiti from "jiti";

const jiti = createJiti(import.meta.url);
const { runImageCli } = await jiti.import("../../../src/skill-cli.ts");

const code = await runImageCli(process.argv.slice(2), process.env);
process.exit(code);
