'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">codebuild</h1>
        <nav className="space-x-4">
          <Link href="/editor" className="text-blue-600">Open Editor</Link>
          <Link href="/signup" className="text-blue-600">Sign Up</Link>
          <Link href="/login" className="text-blue-600">Login</Link>
        </nav>
      </header>

      <section className="mt-8">
        <p>A Scratch-inspired block editor built with Next.js + Blockly.</p>
      </section>
    </div>
  )
}
