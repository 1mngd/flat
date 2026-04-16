import Header from '@/components/layout/Header'
import { SessionProvider } from 'next-auth/react'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <Header />
      <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 py-6">
        {children}
      </main>
    </SessionProvider>
  )
}
