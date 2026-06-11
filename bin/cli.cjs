#!/usr/bin/env node
const { spawnSync } = require('child_process');
const { resolve } = require('path');
const { pathToFileURL } = require('url');
const { existsSync } = require('fs');

const root = resolve(__dirname, '..');
const entry = resolve(root, 'src', 'index.ts');
const exeName = process.platform === 'win32' ? 'noprut-cli.exe' : 'noprut-cli';
const exePath = resolve(root, exeName);

function runNodeSource() {
  try {
    const tsx = pathToFileURL(require.resolve('tsx', { paths: [root] })).href;
    return spawnSync(process.execPath, ['--import', tsx, entry, ...process.argv.slice(2)], {
      stdio: 'inherit',
      shell: false,
      cwd: process.cwd(),
    });
  } catch {
    return null;
  }
}

let r;
if (existsSync(entry)) {
  r = runNodeSource();
}

if (!r && existsSync(exePath)) {
  r = spawnSync(exePath, process.argv.slice(2), { stdio: 'inherit', shell: false });
}

if (!r) {
  // Fall back to Bun
  r = spawnSync('bun', [entry, ...process.argv.slice(2)], { stdio: 'inherit', shell: true });

  if (r.error) {
    console.error('');
    console.error('  ╔═══════════════════════════════════════════════╗');
    console.error('  ║                                               ║');
    console.error('  ║   NOPRUT CLI requires dependencies to run!   ║');
    console.error('  ║   Run: npm install                           ║');
    console.error('  ║   Or install Bun / build the executable.     ║');
    console.error('  ║                                               ║');
    console.error('  ╚═══════════════════════════════════════════════╝');
    console.error('');
    process.exit(1);
  }
}

process.exit(r.status ?? 0);
