import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AdminNav from '@/components/admin/AdminNav'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user || session.user.role !== 'admin') {
    redirect('/login')
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* 사이드바 */}
      <aside
        className="w-56 shrink-0 flex flex-col border-r"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
      >
        {/* 로고 */}
        <div className="h-14 flex items-center gap-2 px-5 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <Link href="/" className="text-base font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
            LOGO
          </Link>
          <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }}>
            관리자
          </span>
        </div>

        {/* 네비게이션 */}
        <AdminNav />

        {/* 하단 */}
        <div className="p-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm px-3 py-2 rounded transition-colors"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            사이트로 돌아가기
          </Link>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 min-w-0">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
