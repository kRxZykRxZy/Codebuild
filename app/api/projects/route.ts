import { NextResponse } from 'next/server'
import { prisma } from '../../../src/lib/prisma'
import { writeQueue } from '../../../src/lib/writeQueue'

export async function POST(req: Request) {
  const body = await req.json()
  const { title, data, ownerId } = body
  if (!title || !ownerId) return NextResponse.json({ error: 'Missing' }, { status: 400 })

  return new Promise((resolve) => {
    writeQueue.enqueue(async () => {
      const p = await prisma.project.create({ data: { title, data: data || '{}', ownerId } })
      resolve(NextResponse.json(p))
    })
  })
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const id = url.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  const p = await prisma.project.findUnique({ where: { id: Number(id) } })
  if (!p) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(p)
}
