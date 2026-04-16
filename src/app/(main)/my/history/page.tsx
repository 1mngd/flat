import ContentCard from '@/components/content/ContentCard'
import Link from 'next/link'

const HISTORY = [
  { id: '1', type: 'webtoon' as const, title: '최근 본 웹툰', thumbnail: 'https://placehold.co/300x400/1a1a1a/fff?text=1', author: '작가명', badge: '5화' },
  { id: '2', type: 'webnovel' as const, title: '최근 본 웹소설', thumbnail: 'https://placehold.co/300x400/222/fff?text=2', author: '작가명', badge: '12화' },
  { id: '3', type: 'webtoon' as const, title: '어제 본 작품', thumbnail: 'https://placehold.co/300x400/333/fff?text=3', author: '작가명', badge: '1화' },
]

export default function HistoryPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
          최근 본 작품 {HISTORY.length}개
        </h2>
        <button className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          전체 삭제
        </button>
      </div>

      {HISTORY.length === 0 ? (
        <div className="py-20 text-center" style={{ color: 'var(--color-text-muted)' }}>
          <p className="text-sm">최근 본 작품이 없어요.</p>
          <Link href="/" className="mt-3 inline-block text-sm underline" style={{ color: 'var(--color-text)' }}>
            작품 둘러보기
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {HISTORY.map((item) => (
            <ContentCard key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  )
}
