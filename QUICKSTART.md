# 🚀 Quick Start Guide - NOPRUT AI CLI

## 1. Setup (2 minutes)

### Install Dependencies
```bash
cd noprut-cli
bun install
```

### Configure Credentials
Create a `.env` file:
```bash
NOPRUT_API_BASE_URL=https://www.noprut-ai.dev
NOPRUT_API_KEY=noprut_your_api_key_here
```

**Get your credentials from:** https://www.noprut-ai.dev

---

## 2. Verify Setup
```bash
noprut auth:verify
```

You should see your user info and credit balance.

---

## 3. Common Tasks

### Launch TUI (Recommended)
```bash
noprut
```
Full-screen interactive coding agent. Switch modes with Tab: **Ask** → **Plan** → **Code**

### Check Balance
```bash
noprut balance
```

### List Available Models
```bash
noprut models
```

### Ask a Quick Question
```bash
noprut ask "What is the difference between let and const?"
```

### Generate Code
```bash
noprut code "Write a Python script that reads a CSV and outputs JSON"
```

### Chat with AI
```bash
noprut chat "Hello, how are you?" \
  --provider DeepSeek \
  --model deepseek-chat
```

### Interactive Chat Mode
```bash
noprut chat:interactive
```

Type messages and get responses. Use `/exit` to quit.

### Stream Response (Real-time)
```bash
noprut stream "Write a poem about coding"
```

---

## 4. Help & Documentation

### View All Commands
```bash
noprut --help
```

### Command-Specific Help
```bash
noprut ask --help
noprut code --help
noprut chat --help
```

### Full Documentation
- [README.md](README.md) — Overview and commands
- [MANUAL.md](MANUAL.md) — Full user manual (Thai)
- [PROJECT.md](PROJECT.md) — Architecture details

---

## Troubleshooting

**Problem:** "NOPRUT_API_KEY environment variable is required"
- **Solution:** Make sure your `.env` file exists with correct credentials

**Problem:** "Authentication failed"
- **Solution:** Check that your API key is correct and active

**Problem:** "Insufficient credits"
- **Solution:** Top up your account at https://www.noprut-ai.dev

---

## Next Steps

1. ✅ Launch the TUI with `noprut` for interactive coding
2. ✅ Try `noprut ask` for quick Q&A
3. ✅ Use `noprut code` to generate and save files
4. ✅ Try different AI models with `noprut models`
5. ✅ Use streaming for long responses

---

**Need Help?** See [README.md](README.md) or [SPECTS.md](SPECTS.md) for detailed documentation.
