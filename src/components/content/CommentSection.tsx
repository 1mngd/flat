'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Comment {
  id: string
  author: string
  avatar?: string
  content: string
  createdAt: string
  isOwn?: boolean
}

interface CommentSectionProps {
  episodeId: string
  comments: Comment[]
  isLoggedIn: boolean
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const min = Math.floor(diff / 60000)
  if (min < 1) return '방금'
  if (min < 60) return `${min}분 전`
  const hour = Math.floor(min / 60)
  if (hour < 24) return `${hour}시간 전`
  const day = Math.floor(hour / 24)
  if (day < 30) return `${day}일 전`
  return new Date(dateStr).toLocaleDateString('ko-KR')
}

export default function CommentSection({ episodeId, comments: initialComments, isLoggedIn }: CommentSectionProps) {
  const [comments, setComments] = useState(initialComments)
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!text.trim() || submitting) return
    setSubmitting(true)
    // TODO: API 연동
    const newComment: Comment = {
      id: Date.now().toString(),
      author: '나',
      content: text.trim(),
      createdAt: new Date().toISOString(),
      isOwn: true,
    }
    setComments((prev) => [newComment, ...prev])
    setText('')
    setSubmitting(false)
  }

  const handleDelete = (id: string) => {
    // TODO: API 연동
    setComments((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <div className="mt-8">
      <h3 className="text-base font-bold mb-4" style={{ color: 'var(--color-text)' }}>
        댓글 {comments.length}
      </h3>

      {/* 입력창 */}
      {isLoggedIn ? (
        <div className="flex gap-3 mb-6">
          <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}>
            나
          </div>
          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleSubmit() }}
              placeholder="댓글을 입력하세요 (Ctrl+Enter로 등록)"
              rows={3}
              maxLength={500}
              className="w-full resize-none rounded-lg p-3 text-sm outline-none border focus:border-[var(--color-text)] transition-colors"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)',
              }}
            />
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{text.length}/500</span>
              <button
                onClick={handleSubmit}
                disabled={!text.trim() || submitting}
                className="px-4 py-1.5 rounded-lg text-xs font-medium transition-opacity disabled:opacity-40"
                style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }}
              >
                등록
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-6 py-4 rounded-lg text-center text-sm" style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-muted)' }}>
          댓글을 작성하려면{' '}
          <a href="/login" className="underline" style={{ color: 'var(--color-text)' }}>로그인</a>
          {' '}해주세요.
        </div>
      )}

      {/* 댓글 목록 */}
      {comments.length === 0 ? (
        <p className="text-center py-10 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          첫 댓글을 남겨보세요.
        </p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="flex gap-3">
              {/* 아바타 */}
              <div className="shrink-0">
                {comment.avatar ? (
                  <Image src={comment.avatar} alt={comment.author} width={32} height={32} className="rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}>
                    {comment.author[0]}
                  </div>
                )}
              </div>
              {/* 내용 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>{comment.author}</span>
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{timeAgo(comment.createdAt)}</span>
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--color-text)' }}>
                  {comment.content}
                </p>
                {comment.isOwn && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="mt-1 text-xs"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    삭제
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
