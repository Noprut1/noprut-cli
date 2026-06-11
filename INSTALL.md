# 🎯 Installation Guide

## ติดตั้ง NOPRUT CLI เพื่อใช้คำสั่ง `noprut`

### ขั้นตอนที่ 1: ติดตั้ง Dependencies

```bash
cd noprut-cli
bun install
```

### ขั้นตอนที่ 2: ลงทะเบียนคำสั่ง `noprut`

```bash
bun link
```

คำสั่งนี้จะสร้าง symlink ให้คุณสามารถใช้ `noprut` ได้จากทุกที่!

### ขั้นตอนที่ 3: ตั้งค่า API Credentials

สร้างไฟล์ `.env` ในโฟลเดอร์ `noprut-cli`:

```env
NOPRUT_API_BASE_URL=https://www.noprut-ai.dev
NOPRUT_API_KEY=noprut_YOUR_API_KEY
```

**วิธีรับ API Key:**
1. เข้า https://www.noprut-ai.dev
2. ไปที่ "Token Keys"
3. สร้าง Key ใหม่
4. คัดลอก `api_key` มาใส่ใน `.env`

### ขั้นตอนที่ 4: ทดสอบ

```bash
noprut --version
# ควรแสดง: 1.0.0

noprut auth:verify
# ควรแสดงข้อมูลผู้ใช้ของคุณ
```

## ✅ พร้อมใช้งาน!

ตอนนี้คุณสามารถใช้คำสั่ง `noprut` แทน `bun run src/index.ts` ได้แล้ว

**ตัวอย่าง:**
```bash
# แทนที่จะพิมพ์:
bun run src/index.ts chat "Hello"

# พิมพ์แค่:
noprut chat "Hello"
```

## 📝 หมายเหตุ

- คำสั่ง `bun link` ต้องรันเพียงครั้งเดียว
- หากอัปเดตโค้ด ไม่ต้อง link ใหม่
- หากต้องการลบการ link: `bun unlink noprut-cli`

## ❓ ปัญหาที่พบบ่อย

### "noprut: command not found"

**วิธีแก้:**
```bash
cd noprut-cli
bun link
```

### Permission denied (Linux/Mac)

```bash
chmod +x src/index.ts
```

### Windows PowerShell Execution Policy

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
