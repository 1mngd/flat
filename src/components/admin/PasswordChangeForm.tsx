'use client'

import { useState } from 'react'

export default function PasswordChangeForm() {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)

    if (next !== confirm) {
      setMessage({ type: 'error', text: '새 비밀번호가 일치하지 않습니다.' })
      return
    }
    if (next.length < 6) {
      setMessage({ type: 'error', text: '비밀번호는 6자 이상이어야 합니다.' })
      return
    }

    setLoading(true)
    const res = await fetch('/api/admin/password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: current, newPassword: next }),
    })
    setLoading(false)

    const data = await res.json()
    if (res.ok) {
      setMessage({ type: 'success', text: '비밀번호가 변경됐습니다.' })
      setCurrent('')
      setNext('')
      setConfirm('')
    } else {
      setMessage({ type: 'error', text: data.error ?? '오류가 발생했습니다.' })
    }
  }

  const inputClass = "w-full h-11 px-4 rounded-lg border text-sm outline-none focus:ring-2"
  const inputStyle = {
    backgroundColor: 'var(--color-bg)',
    borderColor: 'var(--color-border)',
    color: 'var(--color-text)',
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="password"
        placeholder="현재 비밀번호"
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
        required
        className={inputClass}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="새 비밀번호 (6자 이상)"
        value={next}
        onChange={(e) => setNext(e.target.value)}
        required
        className={inputClass}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="새 비밀번호 확인"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        required
        className={inputClass}
        style={inputStyle}
      />

      {message && (
        <p className={`text-sm ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
          {message.text}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="h-11 rounded-lg font-medium text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }}
      >
        {loading ? '변경 중...' : '비밀번호 변경'}
      </button>
    </form>
  )
}
