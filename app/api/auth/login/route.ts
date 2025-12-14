import { NextResponse } from 'next/server'
import { prisma } from '../../../../src/lib/prisma'
import { verifyPassword } from '../../../../src/lib/argon2'

export async function POST(req: Request) {
  const { email, password } = await req.json()
  if (!email || !password) return NextResponse.json({ error: 'Missing' }, { status: 400 })

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return NextResponse.json({ error: 'Invalid' }, { status: 401 })
  const ok = await verifyPassword(user.hash, password)
  if (!ok) return NextResponse.json({ error: 'Invalid' }, { status: 401 })

  // simple session cookie (insecure demo - replace with signed cookies or JWT)
  const res = NextResponse.json({ id: user.id, email: user.email })
  res.cookies.set('userId', String(user.id), { httpOnly: true })
  return res
}
