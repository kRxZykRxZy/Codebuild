# codebuild

A Scratch-like block-based editor built with Next.js, TypeScript, Tailwind CSS, Prisma (SQLite), argon2 for password hashing, and Blockly for blocks. This repository is intentionally visually distinct from Scratch.

Features in initial commit:
- App Router (Next.js)
- TypeScript
- Tailwind CSS
- SQLite via Prisma (with WAL mode)
- Argon2-based email/password auth (signup/login)
- Blockly-based project editor page with save/load
- Write-queue pattern for serialized heavy writes to SQLite

Quick start (dev):
1. Install dependencies: npm install
2. Generate Prisma client and migrate: npx prisma generate && npx prisma migrate dev --name init
3. Run dev server: npm run dev

License: MIT
