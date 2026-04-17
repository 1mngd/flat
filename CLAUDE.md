@AGENTS.md

# 프로젝트 브리핑 (최종 업데이트: 2026-04-16)

## 개요
동적 이펙트(스크래치, 글자흔들림, 진동)를 지원하는 웹소설/웹툰 플랫폼.

## 기술 스택
- **프레임워크:** Next.js 16 (App Router) + TypeScript + Tailwind CSS
- **인증:** NextAuth v5 (카카오, 네이버, Apple)
- **DB ORM:** Prisma 7 (`@prisma/adapter-pg` 방식 — v6와 breaking change)
- **DB:** AWS RDS PostgreSQL, ap-northeast-2 (서울)
- **호스팅:** AWS Amplify (GitHub 연동, main 브랜치 자동 배포)
- **이미지 스토리지:** Cloudflare R2
- **결제/본인인증:** 토스페이먼츠
- **앱 래핑:** Capacitor (iOS/Android)
- **PWA:** next-pwa

## 계정 정보
- GitHub: https://github.com/1mngd/flat.git
- AWS 계정: mngd88@gmail.com
- 배포 URL: https://main.d2oj5s4hkb5pv2.amplifyapp.com

## 현재 구현 완료
```
src/
  app/
    layout.tsx
    (main)/
      layout.tsx                      # SessionProvider만 (auth() 호출 없음)
      page.tsx
      my/layout.tsx
      my/library/page.tsx
      my/history/page.tsx
      webtoon/[id]/page.tsx
      webnovel/[id]/page.tsx
    (auth)/
      layout.tsx
      login/page.tsx
    api/auth/[...nextauth]/route.ts
  components/
    layout/Header.tsx
    content/ContentCard.tsx
    content/RankingItem.tsx
    content/FeaturedBanner.tsx
    content/WorkDetail.tsx
    content/RatingSection.tsx
    content/CommentSection.tsx
    ui/CoinBalance.tsx
  lib/prisma.ts
  lib/auth.ts
  types/next-auth.d.ts
```

## 배포 현황 (2026-04-16 기준)
- ✅ GitHub push 완료
- ✅ AWS Amplify 연결 (main 브랜치 자동 배포)
- ✅ RDS PostgreSQL 생성 (flat-db, db.t3.micro, ap-northeast-2b)
- ✅ Amplify 환경변수 DATABASE_URL 추가
- ✅ RDS 보안그룹 인바운드 규칙 추가
- ✅ `prisma migrate dev --name init` 완료 → RDS 테이블 생성됨

## 앞으로 구현할 것 (우선순위 순)
1. 관리자 업로드 페이지 (`/admin/upload`) — 작품/회차 등록
2. 구매 모달 — 코인 차감 / 토스페이먼츠 직접결제
3. 웹툰 뷰어 (`/webtoon/[id]/episode/[ep]`) — 세로 스크롤 이미지
4. 웹소설 뷰어 (`/webnovel/[id]/episode/[ep]`) — 커스텀 마크다운 렌더링
5. 뷰어 이펙트: `:::scratch`, `:::shake`, `:::vibrate`
6. 토스페이먼츠 본인인증 (성인 콘텐츠)
7. 캡처 방지 (Capacitor)

## 핵심 Gotcha (반드시 숙지)
- **Prisma 7:** `schema.prisma` datasource에 `url` 없음 → `prisma.config.ts`에 설정
- **Prisma 7:** `PrismaPg` adapter 필수 (`@prisma/adapter-pg` 패키지)
- **Next.js App Router:** `(main)/layout.tsx`에 `auth()` 서버 호출 금지 → DB 없을 때 크래시
- **DATABASE_URL:** 비밀번호 특수문자(`#` → `%23`) URL 인코딩 필요
- **라우트 충돌 금지:** `src/app/page.tsx`와 `src/app/(main)/page.tsx` 동시 존재 불가
- **Tailwind v4:** `max-w-screen-xl` 등 screen 유틸리티 미동작 → `globals.css`의 `.wrap` 클래스 사용 (`max-width: 1200px; margin: 0 auto; padding: 0 1rem`)

## 작업 규칙
- 코드 변경 후 반드시 `npm run build` 빌드 검증 완료 후 사용자에게 보고
- 빌드 성공 확인 전까지 "완료" 보고 금지
- 새 기능 구현 시 필요한 환경변수가 있으면 **반드시** 사용자에게 추가 안내 (안내 없이 "완료" 금지)
- 배포 후 동작 전제조건(환경변수, DB 마이그레이션 등)이 있으면 완료 보고 전에 명시

## Amplify 환경변수 현황
현재 Amplify에 설정되어 있어야 하는 변수 전체 목록:
```
DATABASE_URL        # RDS PostgreSQL 연결 문자열 (특수문자 URL 인코딩 필요)
AUTH_SECRET         # NextAuth v5 필수 서명 키 (없으면 "Server configuration error" 발생)
ADMIN_USERNAME      # 관리자 로그인 아이디
ADMIN_PASSWORD      # 관리자 초기 비밀번호 (최초 로그인 후 DB 해시로 대체됨)
```
※ 카카오/네이버/Apple 환경변수는 SNS 로그인 구현 시 추가

## 주요 정책
- 다크/라이트 모드: OS `prefers-color-scheme` 따름 (토글 없음)
- 코인 소진 순서: 실결제 먼저 → 보너스 나중
- 환불: 미사용 실결제 코인만 (보너스 소멸), 만료일 없음
- 무료 회차: 기본 3화, 작품별 개별 설정 (`Work.freeEpisodeCount`)
- 댓글: 회차 단위만, 500자 제한

