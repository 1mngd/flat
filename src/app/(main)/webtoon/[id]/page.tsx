import WorkDetail from '@/components/content/WorkDetail'
import RatingSection from '@/components/content/RatingSection'
import CommentSection from '@/components/content/CommentSection'

const DUMMY_WORK = {
  id: '1',
  type: 'webtoon' as const,
  title: '작품 제목이 여기에 들어갑니다',
  thumbnail: 'https://placehold.co/300x400/1a1a1a/fff?text=Cover',
  author: '작가명',
  status: 'ongoing' as const,
  categories: ['로맨스', '판타지'],
  description: `작품 소개가 이 곳에 들어갑니다.\n\n여러 줄에 걸쳐서 작품의 줄거리나 세계관, 주인공에 대한 설명을 작성할 수 있습니다.\n더보기를 누르면 전체 내용이 펼쳐집니다.`,
  isAdult: false,
  viewCount: 1280000,
  rating: 4.7,
  ratingCount: 3240,
  freeEpisodeCount: 3,
  episodes: Array.from({ length: 20 }, (_, i) => ({
    id: String(i + 1),
    episodeNumber: i + 1,
    title: `${i + 1}화 에피소드 제목`,
    isFree: i < 3,
    price: 2,
    publishedAt: new Date(Date.now() - (20 - i) * 7 * 24 * 60 * 60 * 1000).toISOString(),
    isPurchased: i < 5,
  })),
}

const DUMMY_COMMENTS = [
  { id: '1', author: '독자A', content: '정말 재미있어요! 다음화가 기대됩니다.', createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: '2', author: '독자B', content: '그림체가 너무 예쁘네요.', createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: '3', author: '독자C', content: '스토리 전개가 매력적입니다.', createdAt: new Date(Date.now() - 86400000).toISOString() },
]

export default function WebtoonDetailPage({ params }: { params: { id: string } }) {
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
