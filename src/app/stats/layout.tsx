import type { Metadata } from "next";

const title = "내 링크 통계";
const description = "내 링크의 총 클릭수와 링크별 클릭 현황을 확인하세요. 로그인한 사용자만 이용할 수 있는 개인 통계 페이지입니다.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/stats" },
  robots: { index: false, follow: false },
  openGraph: { title: `${title} | 마이링크`, description, url: "/stats", siteName: "마이링크", locale: "ko_KR", type: "website" },
  twitter: { card: "summary_large_image", title: `${title} | 마이링크`, description },
};

export default function StatsLayout({ children }: { children: React.ReactNode }) { return children; }
