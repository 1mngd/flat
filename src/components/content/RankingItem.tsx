import Link from 'next/link'
import Image from 'next/image'

interface RankingItemProps {
  rank: number
  id: string
  type: 'webtoon' | 'webnovel'
  title: string
  thumbnail: string
  author?: string
  genre?: string
  viewCount?: number
  rating?: number
  isAdult?: boolean
}

export default function RankingItem({
  rank,
  id,
  type,
  title,
  thumbnail,
  author,
  genre,
  viewCount,
  rating,
  isAdult,
}: RankingItemProps) {
  return (
    <Link href={`/${type}/${id}`} className="flex items-center gap-3 py-3 border-b hover:bg-[var(--color-surface)] -mx-2 px-2 rounded transition-colors" style={{ borderColor: 'var(--color-border)' }}>
      {/* 순위 */}
      <span
        className="w-6 text-center text-sm font-bold shrink-0"
        style={{ color: rank <= 3 ? 'var(--color-text)' : 'var(--color-text-muted)' }}
      >
        {rank}
      </span>

      {/* 썸네일 */}
      <div className="relative w-10 h-14 rounded overflow-hidden shrink-0 bg-[var(--color-surface)]">
        <Image src={thumbnail} alt={title} fill className="object-cover" sizes="40px" />
      </div>

      {/* 정보 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          {isAdult && (
            <span className="text-[10px] font-bold px-1 py-0.5 rounded bg-red-500 text-white shrink-0">19</span>
          )}
          <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text)' }}>{title}</p>
        </div>
        <div className="flex items-center gap-2 mt-0.5 text-xs" style={{ color: 'var(--color-text-muted)' }}>
          {author && <span>{author}</span>}
          {genre && <span>· {genre}</span>}
        </div>
        <div className="flex items-center gap-2 mt-0.5 text-xs" style={{ color: 'var(--color-text-muted)' }}>
          {rating !== undefined && <span>★ {rating.toFixed(1)}</span>}
          {viewCount !== undefined && (
            <span>조회 {viewCount >= 10000 ? `${(viewCount / 10000).toFixed(1)}만` : viewCount.toLocaleString()}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
