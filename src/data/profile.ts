export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface LinkCardItem {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  badge?: string;
  highlight?: boolean;
  image?: string;
  category?: string;
}

export interface StatItem {
  label: string;
  value: string;
  unit?: string;
}

export interface ProfileData {
  name: string;
  handle: string;
  role: string;
  bio: string;
  avatarUrl: string;
  statusText: string;
  isAvailable: boolean;
  location: string;
  stats: StatItem[];
  tags: string[];
  socials: SocialLink[];
  links: LinkCardItem[];
}

export const profileData: ProfileData = {
  name: "이지훈",
  handle: "@alex_lee",
  role: "풀스택 프로덕트 엔지니어",
  bio: "사용자가 체감하는 가치와 직관적인 인터페이스를 만들어요. 복잡한 문제를 단순하고 읽기 쉬운 코드로 해결하는 과정을 좋아해요.",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80",
  statusText: "새로운 협업 및 커피챗 열려있어요",
  isAvailable: true,
  location: "서울시 강남구",
  stats: [
    { label: "출시 프로덕트", value: "14", unit: "개" },
    { label: "개발 경력", value: "4", unit: "년차" },
    { label: "오픈소스 스타", value: "1,240", unit: "개" },
  ],
  tags: ["Next.js", "TypeScript", "React", "Tailwind CSS", "UI/UX", "Node.js"],
  socials: [
    {
      platform: "github",
      url: "https://github.com",
      label: "GitHub",
    },
    {
      platform: "instagram",
      url: "https://instagram.com",
      label: "Instagram",
    },
    {
      platform: "linkedin",
      url: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      platform: "twitter",
      url: "https://x.com",
      label: "X (Twitter)",
    },
    {
      platform: "youtube",
      url: "https://youtube.com",
      label: "YouTube",
    },
    {
      platform: "mail",
      url: "mailto:alex.lee.dev@example.com",
      label: "Email",
    },
  ],
  links: [
    {
      id: "portfolio",
      title: "2026 포트폴리오 웹사이트",
      description: "인터랙티브 웹 프로젝트와 최신 작업물을 한눈에 살펴보세요",
      url: "https://example.com/portfolio",
      icon: "Sparkles",
      badge: "대표 프로젝트",
      highlight: true,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=240&q=80",
    },
    {
      id: "projects",
      title: "오픈소스 & 깃허브 저장소",
      description: "누구나 바로 쓸 수 있는 프론트엔드 유틸리티와 스타터 킷이에요",
      url: "https://github.com",
      icon: "FolderGit2",
      badge: "인기",
    },
    {
      id: "blog",
      title: "기술 블로그 (Tech Log)",
      description: "프론트엔드 아키텍처와 성능 최적화 경험을 기록해요",
      url: "https://example.com/blog",
      icon: "BookOpen",
      badge: "매주 연재",
    },
    {
      id: "coffee-chat",
      title: "1:1 커피챗 예약하기",
      description: "커리어 고민, 기술 이야기, 사이드 프로젝트 아이디어를 편하게 나눠요",
      url: "https://calendly.com",
      icon: "Coffee",
      badge: "예약 가능",
    },
    {
      id: "newsletter",
      title: "주간 프론트엔드 뉴스레터",
      description: "매주 월요일 아침 유익한 웹 기술 소식을 메일로 전해드려요",
      url: "https://example.com/newsletter",
      icon: "Send",
    },
  ],
};
