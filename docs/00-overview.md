---
title: "00 - Overview"
type: overview
status: active
created: 2026-06-05
updated: 2026-06-07
tags:
  - noprut-cli
  - overview
---

# 00 - Overview

## What NOPRUT CLI is

`noprut-cli` is an AI coding assistant for the terminal. It combines a small command-line surface with a rich interactive REPL that can ask questions, plan work, write files, run commands, and keep project-local conversational context between sessions.

At its best, the product feels like a disciplined pair programmer inside the terminal:

- it understands the current working directory
- it can inspect project files before editing
- it can emit explicit tool syntax that the engine executes
- it can show diffs, undo the last set of file changes, and expose shell output directly
- it keeps the user in control for mutating or dangerous commands

## Current product surface

The runtime exposed today is defined by `src/index.ts` and `src/repl.ts`.

### CLI commands
- `noprut` or `noprut chat` starts the interactive session
- `noprut ask <prompt...>` performs a one-shot request without entering the REPL
- `noprut models` lists models from the backend catalog
- `noprut config` edits local configuration

### Interactive slash commands
Inside the REPL the user can switch modes and operate on the local project with:

- `/chat`, `/ask`, `/plan`, `/code`
- `/help`, `/models`, `/config`
- `/clear`, `/newchat`, `/reset`, `/exit`, `/quit`
- `/git`, `/diff`, `/undo`, `/tokens`, `/init`
- `/find`, `/replace`

### Direct shell commands
Input beginning with `$ ` or `> ` is executed immediately in the current working directory and reported back in the console.

## Modes

NOPRUT CLI uses four modes at runtime, though the public product story often emphasizes Ask, Plan, and Code:

- `chat` - conversational mode with no mutation
- `ask` - one-off or interactive question answering, still non-mutating
- `plan` - design and reasoning without file changes
- `code` - code-focused mode that may write files, apply string replacements, and run shell commands

Mode affects the system prompt, status messages, and whether tool-driven mutations are allowed.

## What makes the current version strong

This version is notably more capable than a plain chat client because the runtime has real execution structure:

- the engine appends the project file tree into the system prompt for grounded context
- the model can request `read_file`, `str_replace`, and `write_file` tool calls
- fenced shell blocks can become executable commands in code mode
- the REPL surfaces each read, file mutation, replacement, and command run as visible progress
- session history is persisted per working directory, so work resumes naturally when reopening the same project

## Backend contract

The application talks to NOPRUT AI over HTTP using the `NoprutApiClient` in `src/core/api.ts`.

Expected backend capabilities include:

- model listing
- streaming chat completions
- support for model IDs in `provider/model` form
- bearer authentication through `NOPRUT_API_KEY`

The default base URL is `https://www.noprut-ai.dev`, with version suffixes stripped automatically by configuration loading.

## Configuration model

Configuration is read from environment variables, primarily through `.env.local` or `.env`.

Important keys:

- `NOPRUT_API_KEY`
- `NOPRUT_API_BASE_URL`
- `NOPRUT_MODEL_ID`
- `NOPRUT_MAX_TOKENS`
- `NOPRUT_AUTO_APPROVE_READONLY`

The user can manage these values interactively through `noprut config` or `/config`.

## Persistence model

NOPRUT CLI stores session data under the user's home directory in `.noprut-cli/sessions/`.

Persistence is scoped by working directory hash, which means:

- each project gets its own session file
- reopening the CLI in the same project resumes context
- `/clear` and `/reset` clear the stored transcript for that project

## Design philosophy

The codebase favors a few clear ideas:

- terminal-first interaction over complex UI abstraction
- explicit tool execution instead of hidden side effects
- readable TypeScript modules with direct responsibilities
- project-scoped safety boundaries for file operations
- visible command approval for risky actions

## Non-goals and boundaries

The current runtime intentionally does not try to be everything:

- it is not a background daemon or editor plugin
- it does not maintain a global cross-project memory store
- it does not execute arbitrary file writes outside the project root
- it treats dangerous shell commands as a special approval class
- it keeps the public CLI small and pushes richer workflows into the REPL

## Read next

- [[01-architecture]] for the system design
- [[02-source-map]] for where the code lives
- [[13-repl-runtime]] for the interactive runtime
- [[14-engine-and-tool-execution]] for the mutation pipeline
