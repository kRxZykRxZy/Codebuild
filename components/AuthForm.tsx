'use client'
import React, { useState } from 'react'

export default function AuthForm({ mode = 'signup' }: { mode?: 'signup' | 'login' }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch(`/api/auth/${mode}`, { method: 'POST', body: JSON.stringify({ email, password }), headers: { 'Content-Type': 'application/json' } })
    const data = await res.json()
    console.log(data)
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <input className="w-full p-2 border" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
      <input type="password" className="w-full p-2 border" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
      <button className="px-4 py-2 bg-blue-600 text-white rounded">{mode === 'signup' ? 'Sign up' : 'Login'}</button>
    </form>
  )
}
