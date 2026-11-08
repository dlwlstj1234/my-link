# 🔗 my-link-hy

> Next.js 15와 Tailwind CSS로 제작한 깔끔하고 모던한 개인 프로필 & 링크 카드 웹사이트입니다.

---

## ✨ 주요 기능 및 특징

- ⚡ **Next.js 15 & React 19**: 최신 웹 기술 기반의 빠른 로딩과 최적화된 성능
- 🎨 **Tailwind CSS v4**: 깔끔하고 직관적인 카드형 UI 디자인
- 🌓 **반응형 & 다크 모드 지원**: 모바일과 데스크톱, 다양한 테마 환경에 맞춤 지원
- 🏷️ **개인 프로필 카드**: 이니셜 아바타, 소개 문구, 상태 뱃지 제공

---

## 🛠️ 기술 스택

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Library**: [React](https://react.dev/), TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

---

## 🚀 로컬 실행 방법

### 1. 패키지 설치
```bash
npm install
```

### 2. 개발 서버 실행

실행 전에 `.env.example`을 `.env.local`로 복사하고 Firebase 콘솔의 웹 앱 설정 값을 입력합니다. `.env.local`은 Git에서 제외됩니다. 환경 변수를 변경하면 개발 서버를 다시 시작합니다.

Firebase 초기화 모듈은 `src/lib/firebase.ts`에 있으며, 중복 초기화를 방지합니다. Analytics는 브라우저에서 지원 여부를 확인한 후 초기화합니다. `NEXT_PUBLIC_` 변수는 브라우저 번들에 포함되는 Firebase 웹 앱 식별 정보이며, 관리자 서비스 계정 키를 넣으면 안 됩니다.

배포 환경에도 동일한 환경 변수를 설정해야 합니다. Firebase 앱과 Analytics를 초기화하며, 링크는 Cloud Firestore의 `users/anonymous/links/{documentId}`에서 조회·추가·수정·삭제합니다. 추가 성공 후 목록 맨 위에 즉시 반영하고, 수정·삭제도 서버 성공 후 화면에 반영합니다. `createdAt` 최신순을 유지하며 수정 시에는 `updatedAt`만 갱신합니다. 각 카드의 수정·삭제 버튼은 항상 표시됩니다. 수정은 인라인 폼이며 추가와 동일한 Zod·React Hook Form 검증을 사용합니다. 삭제는 확인 모달의 destructive 버튼을 통해 수행합니다.

더미 링크 10개는 `node scripts/migrate-demo-links.cjs`로 한 번 이전했습니다. 페이지는 더미 데이터를 합치지 않고 Firestore 데이터만 표시합니다. 이전 스크립트는 페이지에서 자동 실행하지 않으며, 명시적으로 다시 실행하면 삭제한 더미 문서가 재생성될 수 있으므로 재실행에 주의합니다. 기존 이메일 문의 링크를 유지하기 위해 입력 폼은 HTTP(S) 주소와 유효한 `mailto:` 이메일 주소를 허용합니다.

### Google 로그인 및 개인 데이터

- 헤더에서 Google 로그인·로그아웃을 제공합니다. 로그인 전에는 안내 화면을 표시하며 Firestore 링크를 조회하지 않습니다.
- Firebase Authentication → Sign-in method에서 Google 제공업체를 활성화하고, Settings → Authorized domains에 `localhost`와 실제 배포 도메인을 등록합니다.
- 사용자 프로필은 `users/{uid}`의 `displayName`, `email`, `photoURL`, `bio`를 표시합니다. 최초 표시 이름은 이메일 앞부분을 사용하며, 유효하지 않거나 중복되면 UID 기반 기본 이름을 부여합니다. 이후 프로필 수정에서 표시 이름과 소개글을 변경할 수 있고, 다시 로그인해도 저장된 값을 유지합니다.
- 표시 이름은 한글·영문·숫자·밑줄·하이픈 2~20자이며 영문 대소문자를 구분하지 않습니다. `displayNames/{소문자이름}`에 UID를 예약하고, Firestore 트랜잭션으로 이름 예약·프로필 갱신·이전 이름 해제를 함께 처리합니다. 이름 변경 시 사전 중복 확인이 필요하고, 최종 저장 시에도 재검증합니다. 소개글은 최대 300자이며 이름이 같다면 중복 확인 없이 소개글만 저장할 수 있습니다.
- 서버 데이터는 TanStack Query로 관리합니다. `['user', uid, ...]` 쿼리 키로 프로필·링크를 분리하고, mutation 성공 시 캐시 즉시 반영과 재조회를 수행합니다. 로그아웃·계정 전환 시 이전 UID의 조회·mutation 캐시를 제거합니다. 중복 확인은 매번 서버에 조회하며 최종 판정은 저장 트랜잭션이 담당합니다.
- 로그인 후 모든 링크 CRUD는 `users/{uid}/links/{documentId}`를 사용합니다. 기존 `users/anonymous/links`는 그대로 보존하며 자동 복사·노출하지 않습니다. 신규 계정은 빈 목록에서 시작합니다.
- `/[displayname]`은 로그인 없이 볼 수 있는 개인 페이지입니다. `displayNames/{소문자이름}`에서 UID를 찾고 `publicProfiles/{uid}`의 이름·사진·소개와 `users/{uid}/links`를 표시합니다. 없는 이름은 404, 조회 실패는 재시도 화면을 표시합니다. 헤더와 프로필 드롭다운에서 내 페이지로 이동할 수 있습니다.
- 공개 프로필은 로그인 후 프로필 조회 또는 프로필 수정 트랜잭션에서 동기화합니다. 기존 사용자는 최초 한 번 홈에 로그인해야 공개 페이지가 생성됩니다. 이름 변경 시 이전 주소는 404가 됩니다.
- `firestore.rules`는 이메일이 포함된 `users/{uid}`를 본인에게만 허용하고, 공개 프로필과 해당 사용자의 링크는 비로그인 읽기를 허용합니다. 쓰기는 본인에게만 허용하며 표시 이름 예약 소유권도 검사합니다. 파일 수정만으로 원격 규칙이 바뀌지는 않습니다. Firebase 콘솔에서 게시하거나 Firebase CLI 로그인 후 `firebase deploy --only firestore:rules --project my-hi-link`로 배포해야 공개 페이지 조회가 가능합니다. 기존 규칙이 있다면 해당 프로젝트의 다른 경로 권한을 함께 검토한 후 적용합니다.

위의 `users/anonymous/links` 설명과 이전 스크립트는 로그인 도입 전 공용 데이터의 이력입니다. 현재 페이지에서는 해당 경로를 사용하지 않습니다.

```bash
npm run dev
```
브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 페이지를 확인합니다.

### 3. 프로덕션 빌드

`/stats`는 로그인한 사용자 전용 통계 페이지입니다. 인증 확인 후 비로그인 상태면 홈으로 이동합니다. 프로필 메뉴의 ‘링크 통계’에서 진입하며, 현재 등록된 모든 링크의 총 클릭수와 링크별 클릭수를 shadcn Chart 기반 막대 차트·목록으로 표시합니다. 누적 클릭수가 없는 링크는 0회이며, 삭제된 링크는 합산하지 않습니다. 새로고침으로 재조회하고 권한 오류는 재시도 안내로 표시합니다.

링크 클릭수는 별도 `users/{uid}/linkClicks/{linkId}` 문서의 `clickCount`에 Firestore 트랜잭션으로 저장합니다. 관리자 SDK나 추가 인증 파일은 필요하지 않습니다. 로그인한 관리 목록에는 0회를 포함해 표시하고 공개 개인 페이지에서는 숨깁니다. 클릭 집계 실패가 링크 이동을 막지는 않습니다. 변경된 `firestore.rules`를 Firebase 콘솔에 게시해야 저장·조회할 수 있습니다. 방문자는 실제 링크의 클릭수만 최초 1 생성 또는 정확히 1 증가시킬 수 있으며, 반복 요청에 의한 통계 부풀리기는 방지하지 못합니다.

```bash
npm run build
```

---

## 📄 라이선스 (License)

이 프로젝트는 [MIT License](LICENSE)를 따릅니다.
