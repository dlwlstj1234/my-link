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

배포 환경에도 동일한 환경 변수를 설정해야 합니다. Firebase 앱과 Analytics를 초기화하며, 새로 추가한 링크는 Cloud Firestore의 `users/anonymous/links/{documentId}`에 저장합니다. 저장 성공 후 목록 맨 위에 즉시 반영하고 새로고침 시 다시 조회합니다. 생성 시각은 `createdAt` 서버 타임스탬프로 저장하며, 최신순(내림차순)으로 표시합니다. 기존 더미 링크는 저장된 링크 뒤에 유지하고 Firestore에 자동 업로드하지 않습니다.

Firestore 데이터베이스와 해당 경로의 읽기·생성 권한이 필요합니다. `anonymous`는 현재 모든 방문자가 공유하는 고정 문서 경로이며, Firebase 익명 인증 UID를 의미하지 않습니다. 접근 권한은 Firebase 콘솔의 보안 규칙으로 관리하며, 이 프로젝트 코드에서는 규칙을 변경하지 않습니다.

```bash
npm run dev
```
브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 페이지를 확인합니다.

### 3. 프로덕션 빌드
```bash
npm run build
```

---

## 📄 라이선스 (License)

이 프로젝트는 [MIT License](LICENSE)를 따릅니다.
