'use client'

import { useState } from 'react'

interface RatingSectionProps {
  workId: string
  averageRating: number
  ratingCount: number
  myRating?: number
  isLoggedIn: boolean
}

const LABELS = ['', '별로예요', '그저 그래요', '보통이에요', '재미있어요', '최고예요']

export default function RatingSection({
  workId,
  averageRating,
  ratingCount,
  myRating: initialMyRating,
  isLoggedIn,
}: RatingSectionProps) {
  const [myRating, setMyRating] = useState(initialMyRating ?? 0)
  const [hovered, setHovered] = useState(0)
  const [submitted, setSubmitted] = useState(!!initialMyRating)

  const display = hovered || myRating

  const handleRate = async (score: number) => {
    if (!isLoggedIn) return
    setMyRating(score)
    setSubmitted(true)
    // TODO: API 연동
  }

  // 분포 바 (더미)
  const distribution = [
    { score: 5, count: Math.floor(ratingCount * 0.55) },
    { score: 4, count: Math.floor(ratingCount * 0.25) },
    { score: 3, count: Math.floor(ratingCount * 0.12) },
    { score: 2, count: Math.floor(ratingCount * 0.05) },
    { score: 1, count: Math.floor(ratingCount * 0.03) },
  ]
  const maxCount = distribution[0].count

  return (
    <div className="my-8 p-5 rounded-xl" style={{ backgroundColor: 'var(--color-surface)' }}>
      <h3 className="text-base font-bold mb-5" style={{ color: 'var(--color-text)' }}>별점</h3>

      <div className="flex gap-6 items-start">
        {/* 평균 점수 */}
        <div className="text-center shrink-0">
          <div className="text-4xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
            {averageRating.toFixed(1)}
          </div>
          <div className="flex justify-center gap-0.5 mb-1">
            {Array.from({ length: 5 }, (_, i) => (
              <svg key={i} viewBox="0 0 20 20" className="w-4 h-4" fill={i < Math.round(averageRating) ? '#FACC15' : 'var(--color-border)'}>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{ratingCount.toLocaleString()}명</p>
        </div>

        {/* 분포 바 */}
        <div className="flex-1 space-y-1.5">
          {distribution.map(({ score, count }) => (
            <div key={score} className="flex items-center gap-2">
              <span className="text-xs w-3 shrink-0" style={{ color: 'var(--color-text-muted)' }}>{score}</span>
              <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
                <div
                  className="h-full rounded-full bg-yellow-400 transition-all"
                  style={{ width: `${maxCount ? (count / maxCount) * 100 : 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 내 별점 */}
      <div className="mt-5 pt-5 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <p className="text-sm font-medium mb-3 text-center" style={{ color: 'var(--color-text)' }}>
          {submitted ? '내가 준 별점' : '이 작품 어떠셨나요?'}
        </p>

        {isLoggedIn ? (
          <>
            <div className="flex justify-center gap-1 mb-2">
              {Array.from({ length: 5 }, (_, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setHovered(i + 1)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => handleRate(i + 1)}
                  className="transition-transform hover:scale-110"
                >
                  <svg viewBox="0 0 20 20" className="w-8 h-8" fill={i < display ? '#FACC15' : 'var(--color-border)'}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
            {display > 0 && (
              <p className="text-center text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                {LABELS[display]}
              </p>
            )}
          </>
        ) : (
          <p className="text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
            별점을 남기려면{' '}
            <a href="/login" className="underline" style={{ color: 'var(--color-text)' }}>로그인</a>
            {' '}해주세요.
          </p>
        )}
      </div>
    </div>
  )
}
