# 웹소설/웹툰 플랫폼 정책 문서

> 최종 업데이트: 2026-04-16  
> 일부 항목은 추후 확정 예정

---

## 1. 서비스 개요

웹소설 및 웹툰을 제공하는 콘텐츠 플랫폼.  
웹소설의 경우 스크래치, 글자 흔들림, 진동 등 동적 이펙트를 지원하는 전용 뷰어를 제공한다.  
PC 웹 브라우저와 iOS/Android 앱에서 동일하게 동작한다.

---

## 2. 디자인 정책

### 2-1. 테마 컬러
- 메인 컬러: **블랙 / 화이트**
- 다크/라이트 모드: OS 시스템 설정 자동 적용 (`prefers-color-scheme`), 별도 토글 없음

### 2-2. 폰트
- 기본 폰트: **Noto Sans KR**
- 폰트 및 기타 기본 스타일은 `styles/globals.css` 한 곳에서 관리, 쉽게 변경 가능하도록 구성

---

## 3. 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js (App Router) |
| 스타일 | Tailwind CSS |
| PWA | next-pwa |
| 앱 래핑 | Capacitor (iOS / Android) |
| 인증 | NextAuth.js |
| ORM | Prisma |
| 결제 / 본인인증 | 토스페이먼츠 (결제 + 본인인증 통합) |
| 이미지 스토리지 | Cloudflare R2 (전송 비용 없음, CDN 기본 포함) |

---

## 3. 인증 정책

### 3-1. 로그인 방식
이메일/비밀번호 로그인은 제공하지 않는다. SNS 로그인만 지원한다.

| 제공자 | 비고 |
|--------|------|
| 카카오 | 필수 |
| 네이버 | 필수 |
| Apple | 필수 (iOS 앱 배포 시 Apple 정책상 타 소셜 로그인 제공 시 반드시 포함) |

### 3-2. 본인인증 (성인 콘텐츠)
- 본인인증 서비스: **토스페이먼츠** (결제 계약과 통합)
- 인증 시점: 성인 콘텐츠 최초 접근 시 팝업, 이후 계정에 연결
- 인증 완료 시 User 테이블에 `isAdultVerified`, `birthYear` 저장
- 만 19세 미만은 성인 콘텐츠 접근 불가

### 3-3. 회원 역할
- `user` — 일반 회원
- `admin` — 관리자 (콘텐츠 업로드, 플랫폼 설정 권한)

---

## 4. 결제 정책

### 4-1. 결제 방식
두 가지 방식을 모두 지원한다.

| 방식 | 설명 |
|------|------|
| 직접 결제 | 회차를 개별로 구매. 토스페이먼츠 단건 결제 |
| 코인 충전 | 코인을 먼저 충전한 뒤 회차 소비. 충전 시 토스페이먼츠 결제 |

### 4-2. 코인 정책
- 코인 명칭: **추후 결정** (현재 "코인"으로 표기)
- 코인 단위 및 환율(1코인 = N원)은 **관리자 페이지에서 설정**
- 잔액은 **실결제 코인 / 보너스 코인** 분리 관리

**소진 순서**
1. 실결제 코인 먼저 차감
2. 실결제 코인이 0이 된 이후에만 보너스 코인 사용 가능

**환불 정책**
- 환불 대상: 미사용 실결제 코인의 원화 금액
- 환불 시 해당 충전 건의 보너스 코인 전액 소멸
- 보너스 코인은 환불 대상 아님
- 만료일 없음

### 4-3. 충전 패키지 정책
- 관리자가 충전 패키지를 자유롭게 구성 (생성 / 수정 / 비활성화)
- 패키지 구성 항목: 결제 금액, 기본 지급 코인, 보너스 코인, 라벨(인기·추천 등), 노출 순서
- 보너스 코인이 0이면 보너스 없음으로 처리
- 충전 내역에 어떤 패키지를 사용했는지 기록

### 4-3. 무료 회차
- 기본값: 모든 작품의 **첫 3화는 무료** 제공
- 작품 업로드/수정 시 관리자가 **작품별로 무료 회차 수를 개별 설정** 가능

---

## 5. 콘텐츠 정책

### 5-1. 콘텐츠 유형
| 유형 | 설명 |
|------|------|
| 웹툰 | 회차당 이미지 여러 장 (세로 스크롤) |
| 웹소설 | 커스텀 마크다운 텍스트 |

### 5-2. 웹소설 이펙트 마크다운 문법
일반 마크다운에 아래 블록 문법을 추가로 지원한다.

```
:::scratch
긁어서 확인하는 숨겨진 내용
:::

:::shake
흔들리는 텍스트
:::

:::vibrate
:::
```

파라미터 확장 예시 (추후 지원):
```
:::shake intensity=strong
:::vibrate pattern=200,100,200
:::scratch hint=긁어서 확인하세요
```

### 5-3. 콘텐츠 상태
- `ongoing` — 연재 중
- `completed` — 완결
- `hiatus` — 휴재

### 5-4. 카테고리
카테고리는 관리자 페이지에서 등록/관리한다.  
웹툰과 웹소설 각각 별도 카테고리 체계를 가진다.

---

## 6. 캡처 및 복사 방지 정책

콘텐츠 불법 유포 방지를 위해 플랫폼/환경별로 아래 정책을 적용한다.

### 6-1. 환경별 캡처 방지

| 환경 | 적용 방식 | 수준 |
|------|-----------|------|
| Capacitor Android 앱 | `FLAG_SECURE` | 스크린샷/녹화 시 검은 화면 ✅ |
| Capacitor iOS 앱 | `UITextField isSecureTextEntry` 오버레이 | 스크린샷/녹화 시 검은 화면 ✅ |
| 웹 브라우저 | CSS, JS 억제 | 완전 방지 불가, 억제만 가능 |

Capacitor 플러그인: `@capawesome-team/capacitor-screen-protection`

### 6-2. 웹 브라우저 억제 방식
- 웹툰 이미지: `<img>` 대신 Canvas 렌더링, 우클릭/드래그 차단
- 웹소설 텍스트: `user-select: none`, 우클릭 차단
- DevTools 감지 시 경고 표시

### 6-3. 워터마크
- 콘텐츠에 사용자 ID 기반 반투명 워터마크 삽입
- 캡처 방지가 뚫렸을 경우 유출자 역추적 용도
- 노출 방식 및 불투명도: **구현 후 결정**

---

## 7. 댓글 및 평점 정책

### 7-1. 댓글
- 댓글은 **회차 단위**로만 작성 가능 (작품 전체 댓글 없음)
- 로그인 회원만 댓글 작성 가능

### 7-2. 별점
- 별점은 **작품 단위**로 1~5점 평가
- 1인 1작품 1회 평가
- 평균 별점 및 평가 수 노출

---

## 8. 페이지 구조

```
/                               홈 (추천작, 최신, 베스트 요약)
/login                          SNS 로그인

# 콘텐츠 브라우징
/webtoon                        웹툰 메인
/webnovel                       웹소설 메인
/webtoon/category/[slug]        카테고리별 목록
/webnovel/category/[slug]
/webtoon/latest                 최신순 목록
/webnovel/latest
/webtoon/best                   조회수 베스트 목록
/webnovel/best

# 작품 상세
/webtoon/[id]                   작품 정보 + 에피소드 목록 + 별점/댓글
/webnovel/[id]
/webtoon/[id]/episode/[ep]      뷰어
/webnovel/[id]/episode/[ep]     뷰어 (이펙트 마크다운 렌더링)

# 마이페이지
/my/library                     구매한 작품 목록
/my/history                     최근 본 작품

# 관리자 (admin 역할만 접근)
/admin/upload                   작품 및 회차 업로드
/admin/works                    작품 관리
/admin/stats                    통계 대시보드
/admin/settings                 코인 단위/환율 등 플랫폼 설정
```

---

## 9. DB 스키마 (핵심)

```
User
├── id, email, name, avatar
├── provider         (kakao | naver | apple)
├── role             (user | admin)
├── isAdultVerified  boolean  # 본인인증 완료 여부
└── birthYear        int      # 출생연도 (성인 여부 계산용)

Work
├── id, type  (webtoon | webnovel)
├── title, description, thumbnail
├── authorId → User
├── categories[]
├── status            (ongoing | completed | hiatus)
├── freeEpisodeCount  # 기본값 3, 작품별 개별 설정
└── viewCount

Episode
├── id, workId → Work
├── episodeNumber, title
├── content         # 웹소설: 커스텀 마크다운
├── images[]        # 웹툰: 이미지 URL 배열
├── isFree          # 무료 여부 (기본: 1~3화 무료)
└── price           # 코인 수 or 원화

Coin
├── id, userId → User
├── paidBalance   # 실결제 코인 (환불 가능)
└── bonusBalance  # 보너스 코인 (환불 불가, 실결제 소진 후 사용)

CoinPackage
├── id
├── price         # 결제 금액 (원)
├── coins         # 기본 지급 코인
├── bonusCoins    # 보너스 코인 (0이면 없음)
├── label         # 배지 라벨 (예: "인기", "추천", null)
├── isActive      # 노출 여부
└── displayOrder  # 정렬 순서

CoinTransaction
├── id, userId → User
├── type        (charge | spend)
├── amount
├── packageId → CoinPackage  # charge일 때 사용한 패키지
├── episodeId → Episode      # spend일 때
└── createdAt

Purchase
├── id, userId → User
├── episodeId → Episode
├── type      (coin | direct)
└── paidAt, amount

Rating
├── id, userId, workId
└── score (1~5)

Comment
├── id, userId → User
├── episodeId → Episode
├── content
└── createdAt
```

---

## 10. 미결 사항

| 항목 | 현황 |
|------|------|
| 코인 명칭 | 추후 결정 |
| 워터마크 노출 방식 | 구현 후 결정 |

---

## 11. 개발 전 준비사항

| 항목 | 내용 |
|------|------|
| Apple Developer 계정 | Apple 로그인 및 iOS 앱 배포 전 등록 필요 |
| 토스페이먼츠 계정 | 결제 + 본인인증 연동 전 사업자 등록 및 계약 필요 |
| Cloudflare R2 계정 | 이미지 스토리지 버킷 생성 필요 |
| Kakao / Naver Developers | 앱 등록 및 OAuth 키 발급 필요 |
