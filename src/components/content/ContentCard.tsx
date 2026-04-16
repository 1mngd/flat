'use client'

import Link from 'next/link'
import Image from 'next/image'

interface ContentCardProps {
  id: string
  type: 'webtoon' | 'webnovel'
  title: string
  thumbnail: string
  author?: string
  isAdult?: boolean
  isFree?: boolean
  isNew?: boolean
  badge?: string
  rating?: number
  viewCount?: number
}

export default function ContentCard({
  id,
  type,
  title,
  thumbnail,
  author,
  isAdult,
  isFree,
  isNew,
  badge,
  rating,
  viewCount,
}: ContentCardProps) {
  const href = `/${type}/${id}`

  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[var(--color-surface)]">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
        />
        {/* 배지 */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isAdult && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500 text-white">19</span>
          )}
          {isFree && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-500 text-white">FREE</span>
          )}
          {isNew && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500 text-white">NEW</span>
          )}
          {badge && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[var(--color-text)] text-[var(--color-bg)]">{badge}</span>
          )}
        </div>
      </div>

      <div className="mt-2 space-y-0.5">
        <p className="text-sm font-medium leading-tight line-clamp-2" style={{ color: 'var(--color-text)' }}>
          {title}
        </p>
        {author && (
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{author}</p>
        )}
        {(rating !== undefined || viewCount !== undefined) && (
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
            {rating !== undefined && (
              <span>★ {rating.toFixed(1)}</span>
            )}
            {viewCount !== undefined && (
              <span>{viewCount >= 10000 ? `${(viewCount / 10000).toFixed(1)}만` : viewCount.toLocaleString()}</span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
