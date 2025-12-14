import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma = global.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') global.prisma = prisma

// ensure WAL and tuning for SQLite on startup
async function initSqlite() {
  try {
    await prisma.$executeRawUnsafe(`PRAGMA journal_mode=WAL;`)
    await prisma.$executeRawUnsafe(`PRAGMA synchronous=NORMAL;`)
  } catch (e) {
    // ignore if not sqlite
  }
}
initSqlite()

export default prisma
