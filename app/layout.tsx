import './globals.css'
import React from 'react'

export const metadata = {
  title: 'codebuild',
  description: 'Block-based editor powered by Blockly',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
