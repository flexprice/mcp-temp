#!/usr/bin/env node
/**
 * Optional wrapper for the FlexPrice MCP server that maps --all-tools to --scope full.
 * Usage: node bin/flexprice-mcp-start.js start [options] [--all-tools]
 * Without --all-tools, the server uses its default scope (curated tools only if you pass --scope default).
 * With --all-tools, the server is started with --scope full (all API tools).
 */
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const allToolsIndex = args.indexOf('--all-tools');
let finalArgs = args;
if (allToolsIndex !== -1) {
  finalArgs = [...args.slice(0, allToolsIndex), '--scope', 'full', ...args.slice(allToolsIndex + 1)];
}
const bin = join(__dirname, 'mcp-server.js');
const child = spawn(process.execPath, [bin, ...finalArgs], {
  stdio: 'inherit',
  cwd: dirname(__dirname),
});
child.on('exit', (code) => process.exit(code ?? 0));
