import WorkDetail from '@/components/content/WorkDetail'
import RatingSection from '@/components/content/RatingSection'
import CommentSection from '@/components/content/CommentSection'

const DUMMY_WORK = {
  id: '1',
  type: 'webnovel' as const,
  title: '웹소설 작품 제목이 여기에 들어갑니다',
  thumbnail: 'https://placehold.co/300x400/1a1a1a/fff?text=Cover',
  author: '작가명',
  status: 'ongoing' as const,
  categories: ['로맨스', '현대'],
  description: `웹소설 작품 소개가 이 곳에 들어갑니다.\n\n회차를 거듭할수록 깊어지는 세계관과 매력적인 캐릭터들이 독자를 사로잡습니다.\n더보기를 누르면 전체 내용이 펼쳐집니다.`,
  isAdult: false,
  viewCount: 850000,
  rating: 4.9,
  ratingCount: 1820,
  freeEpisodeCount: 3,
  episodes: Array.from({ length: 50 }, (_, i) => ({
    id: String(i + 1),
    episodeNumber: i + 1,
    title: `${i + 1}화 에피소드 제목`,
    isFree: i < 3,
    price: 2,
    publishedAt: new Date(Date.now() - (50 - i) * 3 * 24 * 60 * 60 * 1000).toISOString(),
    isPurchased: i < 5,
  })),
}

const DUMMY_COMMENTS = [
  { id: '1', author: '독자A', content: '문체가 너무 좋아요. 계속 읽게 됩니다.', createdAt: new Date(Date.now() - 1800000).toISOString() },
  { id: '2', author: '독자B', content: '주인공 캐릭터가 너무 매력적이에요!', createdAt: new Date(Date.now() - 10800000).toISOString() },
]

export default function WebnovelDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <WorkDetail {...DUMMY_WORK} id={params.id} />
      <RatingSection
        workId={params.id}
        averageRating={DUMMY_WORK.rating}
        ratingCount={DUMMY_WORK.ratingCount}
        isLoggedIn={false}
      />
      <CommentSection
        episodeId={params.id}
        comments={DUMMY_COMMENTS}
        isLoggedIn={false}
      />
    </div>
  )
}
