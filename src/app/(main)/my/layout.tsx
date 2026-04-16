'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { label: '구매 도서', href: '/my/library' },
  { label: '최근 본 작품', href: '/my/history' },
]

export default function MyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="max-w-screen-md mx-auto w-full">
      {/* 탭 */}
      <div className="flex border-b mb-6" style={{ borderColor: 'var(--color-border)' }}>
        {TABS.map((tab) => {
          const isActive = pathname === tab.href
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                isActive
                  ? 'border-[var(--color-text)] text-[var(--color-text)]'
                  : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              {tab.label}
            </Link>
          )
        })}
      </div>
      {children}
    </div>
  )
}
