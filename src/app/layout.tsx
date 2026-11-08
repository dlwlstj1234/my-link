import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import FirebaseInit from "@/components/FirebaseInit";
import QueryProvider from "@/components/QueryProvider";
import { siteUrl, siteDescription } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "마이링크",
  title: { default: "마이링크 | 나를 잇는 하나의 링크", template: "%s | 마이링크" },
  description: siteDescription,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: { title: "마이링크 — 나를 잇는 하나의 링크", description: siteDescription, url: "/", siteName: "마이링크", locale: "ko_KR", type: "website" },
  twitter: { card: "summary_large_image", title: "마이링크 — 나를 잇는 하나의 링크", description: siteDescription },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <FirebaseInit />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
