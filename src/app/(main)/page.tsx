import FeaturedBanner from '@/components/content/FeaturedBanner'
import ContentCard from '@/components/content/ContentCard'
import RankingItem from '@/components/content/RankingItem'
import Link from 'next/link'

// 임시 더미 데이터 — DB 연결 후 교체
const FEATURED = [
  {
    id: '1',
    type: 'webtoon' as const,
    title: '작품 제목이 들어갑니다',
    description: '작품 소개 문구가 들어갑니다. 두 줄까지 표시됩니다.',
    thumbnail: 'https://placehold.co/1200x500/111/fff?text=Banner+1',
    badge: 'HOT',
  },
  {
    id: '2',
    type: 'webnovel' as const,
    title: '웹소설 작품 제목',
    description: '흥미로운 웹소설 소개 문구입니다.',
    thumbnail: 'https://placehold.co/1200x500/222/fff?text=Banner+2',
  },
]

const BEST_WEBTOONS = Array.from({ length: 6 }, (_, i) => ({
  id: String(i + 1),
  type: 'webtoon' as const,
  title: `인기 웹툰 ${i + 1}`,
  thumbnail: `https://placehold.co/300x400/1a1a1a/fff?text=${i + 1}`,
  author: '작가명',
  rating: 4.5 - i * 0.1,
  viewCount: 1200000 - i * 100000,
}))

const BEST_WEBNOVELS = Array.from({ length: 6 }, (_, i) => ({
  id: String(i + 1),
  type: 'webnovel' as const,
  title: `인기 웹소설 ${i + 1}`,
  thumbnail: `https://placehold.co/300x400/1a1a1a/fff?text=${i + 1}`,
  author: '작가명',
  rating: 4.8 - i * 0.1,
  viewCount: 800000 - i * 80000,
}))

const RANKING = Array.from({ length: 5 }, (_, i) => ({
  rank: i + 1,
  id: String(i + 1),
  type: 'webtoon' as const,
  title: `랭킹 ${i + 1}위 작품`,
  thumbnail: `https://placehold.co/80x112/1a1a1a/fff?text=${i + 1}`,
  author: '작가명',
  genre: '로맨스',
  rating: 4.9 - i * 0.1,
  viewCount: 2000000 - i * 300000,
}))

function SectionHeader({ title, href }: { title: string; href: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>{title}</h2>
      <Link href={href} className="text-sm hover:underline" style={{ color: 'var(--color-text-muted)' }}>
        더보기
      </Link>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="space-y-10">
      {/* 피처드 배너 */}
      <FeaturedBanner items={FEATURED} />

      {/* 웹툰 베스트 + 랭킹 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SectionHeader title="웹툰 인기 베스트" href="/webtoon/best" />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {BEST_WEBTOONS.map((item) => (
              <ContentCard key={item.id} {...item} />
            ))}
          </div>
        </div>
        <div>
          <SectionHeader title="실시간 랭킹" href="/webtoon/best" />
          <div>
            {RANKING.map((item) => (
              <RankingItem key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>

      {/* 웹소설 베스트 */}
      <div>
        <SectionHeader title="웹소설 인기 베스트" href="/webnovel/best" />
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {BEST_WEBNOVELS.map((item) => (
            <ContentCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}
