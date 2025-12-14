import { NextResponse } from 'next/server'
import { prisma } from '../../../../src/lib/prisma'
import { hashPassword } from '../../../../src/lib/argon2'

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password } = body
  if (!email || !password) return NextResponse.json({ error: 'Missing' }, { status: 400 })

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return NextResponse.json({ error: 'User exists' }, { status: 409 })

  const hash = await hashPassword(password)
  const user = await prisma.user.create({ data: { email, hash } })
  return NextResponse.json({ id: user.id, email: user.email })
}
