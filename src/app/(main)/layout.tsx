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
      <main className="flex-1 py-8">
        <div className="wrap">
          {children}
        </div>
      </main>
    </SessionProvider>
  )
}
