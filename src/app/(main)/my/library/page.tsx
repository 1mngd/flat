import CoinBalance from '@/components/ui/CoinBalance'
import ContentCard from '@/components/content/ContentCard'

// 임시 더미 데이터
const COIN_DATA = {
  paidBalance: 120,
  bonusBalance: 30,
  packages: [
    { id: '1', price: 5000, coins: 50, bonusCoins: 0, label: null },
    { id: '2', price: 10000, coins: 100, bonusCoins: 10, label: null },
    { id: '3', price: 30000, coins: 300, bonusCoins: 50, label: '인기' },
    { id: '4', price: 50000, coins: 500, bonusCoins: 100, label: '추천' },
  ],
}

const PURCHASED = [
  { id: '1', type: 'webtoon' as const, title: '구매한 웹툰 제목', thumbnail: 'https://placehold.co/300x400/1a1a1a/fff?text=1', author: '작가명', badge: '3/20화' },
  { id: '2', type: 'webnovel' as const, title: '구매한 웹소설 제목', thumbnail: 'https://placehold.co/300x400/222/fff?text=2', author: '작가명', badge: '5/50화' },
  { id: '3', type: 'webtoon' as const, title: '또 다른 구매 작품', thumbnail: 'https://placehold.co/300x400/333/fff?text=3', author: '작가명' },
]

export default function LibraryPage() {
  return (
    <div>
      <CoinBalance {...COIN_DATA} />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
          총 {PURCHASED.length}개
        </h2>
      </div>

      {PURCHASED.length === 0 ? (
        <div className="py-20 text-center" style={{ color: 'var(--color-text-muted)' }}>
          <p className="text-sm">구매한 작품이 없어요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {PURCHASED.map((item) => (
            <ContentCard key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  )
}
