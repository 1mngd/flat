'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface Episode {
  id: string
  episodeNumber: number
  title: string
  isFree: boolean
  price: number
  publishedAt: string
  isPurchased?: boolean
}

interface WorkDetailProps {
  id: string
  type: 'webtoon' | 'webnovel'
  title: string
  thumbnail: string
  author: string
  status: 'ongoing' | 'completed' | 'hiatus'
  categories: string[]
  description: string
  isAdult: boolean
  viewCount: number
  rating: number
  ratingCount: number
  episodes: Episode[]
  freeEpisodeCount: number
}

const STATUS_LABEL = {
  ongoing: '연재 중',
  completed: '완결',
  hiatus: '휴재',
} as const

const STATUS_COLOR = {
  ongoing: 'text-green-500',
  completed: 'text-blue-500',
  hiatus: 'text-yellow-500',
} as const

function StarRating({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.min(1, Math.max(0, score - i))
        return (
          <div key={i} className="relative w-4 h-4">
            <svg viewBox="0 0 20 20" className="w-4 h-4 absolute" style={{ color: 'var(--color-border)' }} fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <svg viewBox="0 0 20 20" className="w-4 h-4 text-yellow-400" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function WorkDetail({
  id,
  type,
  title,
  thumbnail,
  author,
  status,
  categories,
  description,
  isAdult,
  viewCount,
  rating,
  ratingCount,
  episodes,
  freeEpisodeCount,
}: WorkDetailProps) {
  const [descExpanded, setDescExpanded] = useState(false)
  const [sortDesc, setSortDesc] = useState(true)

  const sorted = sortDesc ? [...episodes].reverse() : episodes
  const firstEpisode = episodes[0]
  const lastReadEpisode = episodes[0] // TODO: 실제 마지막 읽은 회차로 교체

  return (
    <div className="max-w-screen-lg mx-auto">
      {/* 상단 작품 정보 */}
      <div className="flex gap-6 mb-8">
        {/* 썸네일 */}
        <div className="relative w-32 h-44 sm:w-44 sm:h-60 rounded-xl overflow-hidden shrink-0" style={{ backgroundColor: 'var(--color-surface)' }}>
          <Image src={thumbnail} alt={title} fill className="object-cover" sizes="176px" />
          {isAdult && (
            <div className="absolute top-2 left-2 text-xs font-bold px-1.5 py-0.5 rounded bg-red-500 text-white">19</div>
          )}
        </div>

        {/* 텍스트 정보 */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
          <div>
            {/* 카테고리 + 상태 */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {categories.map((c) => (
                <Link
                  key={c}
                  href={`/${type}/category/${c}`}
                  className="text-xs px-2 py-0.5 rounded-full border"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
                >
                  {c}
                </Link>
              ))}
              <span className={`text-xs font-medium ${STATUS_COLOR[status]}`}>
                {STATUS_LABEL[status]}
              </span>
            </div>

            {/* 제목 */}
            <h1 className="text-xl sm:text-2xl font-bold leading-tight mb-1" style={{ color: 'var(--color-text)' }}>
              {title}
            </h1>
            <p className="text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>{author}</p>

            {/* 별점 + 조회수 */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5">
                <StarRating score={rating} />
                <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{rating.toFixed(1)}</span>
                <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>({ratingCount.toLocaleString()})</span>
              </div>
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                조회 {viewCount >= 10000 ? `${(viewCount / 10000).toFixed(1)}만` : viewCount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* CTA 버튼 */}
          <div className="flex gap-2">
            {firstEpisode && (
              <Link
                href={`/${type}/${id}/episode/${firstEpisode.episodeNumber}`}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-sm font-semibold text-center transition-opacity hover:opacity-80"
                style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }}
              >
                첫화 보기
              </Link>
            )}
            {lastReadEpisode && (
              <Link
                href={`/${type}/${id}/episode/${lastReadEpisode.episodeNumber}`}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-sm font-semibold text-center border transition-colors hover:bg-[var(--color-surface)]"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              >
                이어 보기
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 작품 소개 */}
      <div className="mb-8 p-4 rounded-xl" style={{ backgroundColor: 'var(--color-surface)' }}>
        <p
          className={`text-sm leading-relaxed whitespace-pre-line ${!descExpanded ? 'line-clamp-3' : ''}`}
          style={{ color: 'var(--color-text)' }}
        >
          {description}
        </p>
        <button
          onClick={() => setDescExpanded((v) => !v)}
          className="mt-2 text-xs"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {descExpanded ? '접기 ▲' : '더보기 ▼'}
        </button>
      </div>

      {/* 회차 목록 */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>
            전체 {episodes.length}화
          </h2>
          <button
            onClick={() => setSortDesc((v) => !v)}
            className="text-xs flex items-center gap-1"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {sortDesc ? '최신화부터 ↓' : '1화부터 ↑'}
          </button>
        </div>

        <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
          {sorted.map((ep) => {
            const isFree = ep.isFree || ep.episodeNumber <= freeEpisodeCount
            const isLocked = !isFree && !ep.isPurchased
            const href = isLocked ? '#' : `/${type}/${id}/episode/${ep.episodeNumber}`

            return (
              <div key={ep.id}>
                {isLocked ? (
                  <div className="flex items-center gap-3 py-3.5 opacity-60 cursor-not-allowed">
                    <EpisodeContent ep={ep} isFree={isFree} isLocked={isLocked} />
                  </div>
                ) : (
                  <Link href={href} className="flex items-center gap-3 py-3.5 hover:bg-[var(--color-surface)] -mx-1 px-1 rounded transition-colors">
                    <EpisodeContent ep={ep} isFree={isFree} isLocked={isLocked} />
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function EpisodeContent({
  ep,
  isFree,
  isLocked,
}: {
  ep: Episode
  isFree: boolean
  isLocked: boolean
}) {
  return (
    <>
      {/* 자물쇠 / 무료 아이콘 */}
      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--color-surface)' }}>
        {isLocked ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--color-text-muted)' }}>
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path strokeLinecap="round" d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--color-text)' }}>
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        )}
      </div>

      {/* 정보 */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text)' }}>
          {ep.episodeNumber}화 {ep.title}
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
          {new Date(ep.publishedAt).toLocaleDateString('ko-KR')}
        </p>
      </div>

      {/* 무료/코인 배지 */}
      <div className="shrink-0">
        {isFree ? (
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">무료</span>
        ) : (
          <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-muted)' }}>
            {ep.price > 0 ? `${ep.price} 코인` : '유료'}
          </span>
        )}
      </div>
    </>
  )
}
