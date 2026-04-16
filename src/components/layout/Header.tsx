'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

const NAV_TABS = [
  { label: '웹툰', href: '/webtoon' },
  { label: '웹소설', href: '/webnovel' },
]

const GENRE_TABS = [
  { label: '전체', href: '' },
  { label: '로맨스', href: 'romance' },
  { label: '판타지', href: 'fantasy' },
  { label: 'BL', href: 'bl' },
  { label: '무협', href: 'martial-arts' },
  { label: '드라마', href: 'drama' },
  { label: '스릴러', href: 'thriller' },
  { label: 'GL', href: 'gl' },
]

export default function Header() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const isWebtoon = pathname.startsWith('/webtoon')
  const isWebnovel = pathname.startsWith('/webnovel')
  const activeType = isWebtoon ? 'webtoon' : isWebnovel ? 'webnovel' : null

  return (
    <header className="sticky top-0 z-50 border-b" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
      {/* 상단 바 */}
      <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* 로고 + 메인 탭 */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
            LOGO
          </Link>
          <nav className="flex items-center gap-1">
            {NAV_TABS.map((tab) => {
              const isActive = pathname.startsWith(tab.href)
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[var(--color-text)] text-[var(--color-bg)]'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                  }`}
                >
                  {tab.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* 우측 — 검색, 로그인 */}
        <div className="flex items-center gap-3">
          <button
            aria-label="검색"
            className="p-2 rounded hover:bg-[var(--color-surface)] transition-colors text-[var(--color-text-muted)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="m21 21-4.35-4.35" />
            </svg>
          </button>

          {session ? (
            <div className="flex items-center gap-2">
              {session.user.role === 'admin' && (
                <Link href="/admin/works" className="text-xs px-2 py-1 rounded border text-[var(--color-text-muted)] border-[var(--color-border)] hover:text-[var(--color-text)]">
                  관리
                </Link>
              )}
              <Link href="/my/library" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
                MY
              </Link>
              <button
                onClick={() => signOut()}
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm px-3 py-1.5 rounded font-medium bg-[var(--color-text)] text-[var(--color-bg)] hover:opacity-80 transition-opacity"
            >
              로그인
            </Link>
          )}
        </div>
      </div>

      {/* 장르 탭 — 웹툰/웹소설 페이지에서만 표시 */}
      {activeType && (
        <div className="border-t" style={{ borderColor: 'var(--color-border)' }}>
          <div className="max-w-screen-xl mx-auto px-4 flex gap-0 overflow-x-auto scrollbar-hide">
            {GENRE_TABS.map((genre) => {
              const href = activeType
                ? `/${activeType}${genre.href ? `/category/${genre.href}` : ''}`
                : '/'
              const isActive = genre.href
                ? pathname === href
                : pathname === `/${activeType}` || pathname === `/${activeType}/`

              return (
                <Link
                  key={genre.href}
                  href={href}
                  className={`shrink-0 px-4 py-2.5 text-sm border-b-2 transition-colors ${
                    isActive
                      ? 'border-[var(--color-text)] text-[var(--color-text)] font-medium'
                      : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                  }`}
                >
                  {genre.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
