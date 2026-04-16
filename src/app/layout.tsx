import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '플랫폼',
  description: '웹소설 · 웹툰 플랫폼',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
