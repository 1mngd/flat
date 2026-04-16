'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

const PROVIDERS = [
  {
    id: 'kakao',
    label: '카카오로 로그인',
    bg: '#FEE500',
    color: '#000000',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.7 1.6 5.1 4 6.6l-1 3.7 4.3-2.8c.9.1 1.8.2 2.7.2 5.523 0 10-3.477 10-7.8S17.523 3 12 3z" />
      </svg>
    ),
  },
  {
    id: 'naver',
    label: '네이버로 로그인',
    bg: '#03C75A',
    color: '#ffffff',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z" />
      </svg>
    ),
  },
  {
    id: 'apple',
    label: 'Apple로 로그인',
    bg: 'var(--color-text)',
    color: 'var(--color-bg)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
  },
]

function LoginContent() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/'

  return (
    <div className="flex flex-col gap-3">
      {PROVIDERS.map((provider) => (
        <button
          key={provider.id}
          onClick={() => signIn(provider.id, { callbackUrl })}
          className="relative flex items-center justify-center gap-2.5 w-full h-12 rounded-xl font-medium text-sm transition-opacity hover:opacity-90 active:opacity-80"
          style={{ backgroundColor: provider.bg, color: provider.color }}
        >
          <span className="absolute left-4">{provider.icon}</span>
          {provider.label}
        </button>
      ))}
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-sm">
        {/* 로고 */}
        <div className="text-center mb-10">
          <Link href="/" className="text-3xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
            LOGO
          </Link>
          <p className="mt-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            SNS 계정으로 간편하게 로그인하세요
          </p>
        </div>

        {/* 로그인 버튼 */}
        <Suspense fallback={<div className="flex flex-col gap-3">{PROVIDERS.map(p => <div key={p.id} className="w-full h-12 rounded-xl animate-pulse" style={{ backgroundColor: 'var(--color-surface)' }} />)}</div>}>
          <LoginContent />
        </Suspense>

        {/* 하단 안내 */}
        <p className="mt-8 text-center text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          로그인 시{' '}
          <span className="underline cursor-pointer">이용약관</span> 및{' '}
          <span className="underline cursor-pointer">개인정보처리방침</span>에
          <br />동의하는 것으로 간주됩니다.
        </p>
      </div>
    </div>
  )
}
