---
title: "03 - CLI Commands"
type: reference
status: active
created: 2026-06-05
updated: 2026-06-07
tags:
  - noprut-cli
  - cli
  - commander
---

# 03 - CLI Commands

This page documents the public command surface that is actually registered in `src/index.ts` today.

## Overview

The `noprut` binary exposes four commands:

- `noprut models`
- `noprut ask <prompt...>`
- `noprut config`
- `noprut chat`

`noprut chat` is the default command, so running `noprut` with no subcommand launches the interactive runtime.

## Global program metadata

The Commander program is configured with:

- name: `noprut`
- description: `NOPRUT CLI v2 - a beautiful, fully agentic AI coding assistant. Made in Thailand.`
- version: resolved dynamically from `package.json`

## `noprut models`

Lists available AI models from the backend catalog.

### Behavior
- loads env configuration
- exits if configuration is missing
- calls `new NoprutApiClient(cfg).listModels()`
- prints model ID, optional display name, and optional pricing hints

### Typical use
```bash
noprut models
```

### Notes
- intended as a quick sanity check that credentials and API connectivity are working
- output is human-readable rather than machine-optimized

## `noprut ask <prompt...>`

Sends a one-shot prompt without entering the interactive REPL.

### Flags
- `-m, --model <model>` - override the current model for this request

### Behavior
- loads env configuration
- creates a fresh engine state
- forces mode to `ask`
- optionally rewrites the model string via `formatModel()`
- runs one turn through `handleSubmit()`
- renders the final assistant message as markdown to stdout

### Typical use
```bash
noprut ask "Explain the architecture of this repository"
noprut ask "Summarize src/core/engine.ts" --model openai/gpt-4o
```

### Notes
- this path still uses the same core engine as the REPL
- because it reuses engine behavior, project file tree context can still be included in the system prompt

## `noprut config`

Opens the interactive configuration editor for `.env.local`.

### Behavior
- loads current env values
- prints a configuration banner
- launches the config form prompt flow
- saves environment values back to disk

### Typical use
```bash
noprut config
```

### Notes
- useful both for first-time setup and switching model defaults later
- the same underlying config editing flow is available inside the REPL through `/config`

## `noprut upgrade`

Updates NOPRUT CLI to the latest version.

### Behavior
- Executes `npm i -g noprut-cli@latest`
- Prints success or failure feedback

### Typical use
```bash
noprut upgrade
```

## `noprut chat`

Starts the interactive REPL.

### Behavior
- invokes `runRepl(version)`
- becomes the default command for bare `noprut`

### Typical use
```bash
noprut
noprut chat
```

### Notes
- this is the primary user experience of the product
- all advanced workflows live inside this runtime, not in extra top-level CLI commands

## Commands available only inside the REPL

The following are not separate Commander commands. They are slash commands or interactive affordances handled by `src/repl.ts`:

- mode switches: `/chat`, `/ask`, `/plan`, `/code`
- session control: `/clear`, `/newchat`, `/reset`, `/exit`, `/quit`
- assistance: `/help`, `/models`, `/config`, `/tokens`, `/upgrade`
- project ops: `/git`, `/diff`, `/undo`, `/init`, `/find`, `/replace`, `/open`
- global projects: `/project:list`, `/project:create`, `/project:delete`
- direct shell input: `$ command` or `> command`

*Note: Slash commands support real-time autocomplete as you type `/` in the prompt.*

## Documentation warning about old command docs

Some older documents in this repository refer to commands such as `auth`, `stream`, `skills`, or other subcommands implemented under `src/commands/`. Those files exist, but they are not the currently registered public surface unless `src/index.ts` is updated to expose them.

If you add a new public command in the future:

1. register it in `src/index.ts`
2. document it here
3. update [[README]] and [[02-source-map]] if the architecture surface changes
