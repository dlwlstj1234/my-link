export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface LinkCardItem {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  badge?: string;
  badgeColor?: "primary" | "success" | "warning" | "hot";
  highlight?: boolean;
  image?: string;
}

export interface ProfileData {
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  coverImageUrl?: string;
  status: {
    isAvailable: boolean;
    text: string;
  };
  location: string;
  tags: string[];
  socials: SocialLink[];
  links: LinkCardItem[];
}

export const profileData: ProfileData = {
  name: "이지훈 (Alex Lee)",
  role: "Full-Stack Developer & UI Designer",
  bio: "사용자 중심의 가치를 만드는 개발자입니다. 모던 웹 기술과 인터랙티브한 디자인을 사랑합니다 ✨",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80",
  coverImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=400&q=80",
  status: {
    isAvailable: true,
    text: "새로운 프로젝트 및 커피챗 환영 ☕",
  },
  location: "Seoul, South Korea",
  tags: ["Next.js", "TypeScript", "React", "Tailwind CSS", "UI/UX", "Node.js"],
  socials: [
    {
      platform: "github",
      url: "https://github.com",
      icon: "Github",
      label: "GitHub",
    },
    {
      platform: "instagram",
      url: "https://instagram.com",
      icon: "Instagram",
      label: "Instagram",
    },
    {
      platform: "linkedin",
      url: "https://linkedin.com",
      icon: "Linkedin",
      label: "LinkedIn",
    },
    {
      platform: "twitter",
      url: "https://x.com",
      icon: "Twitter",
      label: "X (Twitter)",
    },
    {
      platform: "youtube",
      url: "https://youtube.com",
      icon: "Youtube",
      label: "YouTube",
    },
    {
      platform: "mail",
      url: "mailto:alex.lee.dev@example.com",
      icon: "Mail",
      label: "Email",
    },
  ],
  links: [
    {
      id: "portfolio",
      title: "2026 포트폴리오 웹사이트",
      description: "최신 프로젝트와 인터랙티브 인터페이스를 확인해보세요",
      url: "https://example.com/portfolio",
      icon: "Sparkles",
      badge: "NEW",
      badgeColor: "primary",
      highlight: true,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=200&q=80",
    },
    {
      id: "blog",
      title: "개발 기술 블로그 (Tech Log)",
      description: "프론트엔드 최적화 및 풀스택 개발 아티클을 연재합니다",
      url: "https://example.com/blog",
      icon: "BookOpen",
      badge: "주간 연재",
      badgeColor: "success",
    },
    {
      id: "projects",
      title: "오픈소스 & 사이드 프로젝트 모음",
      description: "GitHub 스타 1,000+ 프로젝트 및 라이브러리 쇼케이스",
      url: "https://github.com",
      icon: "FolderGit2",
      badge: "HOT 🔥",
      badgeColor: "hot",
    },
    {
      id: "coffee-chat",
      title: "1:1 커피챗 & 멘토링 예약",
      description: "커리어 상담, 기술 스택 고민, 사이드 프로젝트 협업 문의",
      url: "https://calendly.com",
      icon: "Coffee",
      badge: "예약 가능",
      badgeColor: "primary",
    },
    {
      id: "newsletter",
      title: "주간 프론트엔드 뉴스레터 구독",
      description: "매주 월요일 아침 최신 웹 트렌드와 디자인 인사이트를 전해드립니다",
      url: "https://example.com/newsletter",
      icon: "Send",
    },
  ],
};
