"use client";

import React, { useState } from "react";
import ProfileCard from "@/components/ProfileCard";
import SocialLinks from "@/components/SocialLinks";
import LinkItem from "@/components/LinkItem";
import Toast from "@/components/Toast";
import { profileData } from "@/data/profile";
import { Share2, Sparkles } from "lucide-react";

export default function Home() {
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "https://mylink.me";
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        setToastMessage("프로필 링크가 복사되었어요");
      } else {
        setToastMessage("링크: " + url);
      }
      setShowToast(true);
    } catch {
      setToastMessage("프로필 링크가 복사되었어요");
      setShowToast(true);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#F2F4F6] text-[#191F28] flex flex-col items-center">
      {/* Top App Bar (56pt standard) */}
      <header className="sticky top-0 z-30 w-full max-w-[460px] h-[56px] px-5 flex items-center justify-between bg-[#F2F4F6]/90 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="text-[17px] font-bold text-[#191F28] tracking-tight">
            마이링크
          </span>
        </div>
        <button
          onClick={handleShare}
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#4E5968] hover:bg-[#E5E8EB] active:bg-[#D1D6DB] tds-press transition-colors cursor-pointer"
          aria-label="프로필 링크 복사하기"
        >
          <Share2 className="w-5 h-5 stroke-[2]" />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-[460px] px-4 sm:px-5 pb-32 flex flex-col gap-4">
        {/* Profile Card */}
        <ProfileCard profile={profileData} />

        {/* Social Links Row */}
        <div className="w-full py-1">
          <SocialLinks socials={profileData.socials} />
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between px-1 pt-3 pb-1">
          <h2 className="text-[18px] font-bold text-[#191F28] tracking-tight">
            주요 프로젝트와 링크
          </h2>
          <span className="text-[13px] font-medium text-[#8B95A1]">
            {profileData.links.length}개
          </span>
        </div>

        {/* Links List */}
        <section className="flex flex-col gap-2.5 w-full">
          {profileData.links.map((link) => (
            <LinkItem key={link.id} link={link} />
          ))}
        </section>

        {/* Contact Banner Card */}
        <div className="w-full bg-white rounded-[20px] border border-[#E5E8EB]/70 p-5 shadow-tds-card flex items-center justify-between gap-3 mt-1">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-[#E8F3FF] text-[#3182F6] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-[15px] font-semibold text-[#191F28] truncate">
                협업이나 문의가 있으신가요?
              </h3>
              <p className="text-[13px] text-[#8B95A1] truncate">
                언제든지 편하게 메일을 남겨주세요
              </p>
            </div>
          </div>
          <a
            href="mailto:alex.lee.dev@example.com"
            className="h-9 px-3.5 rounded-[10px] bg-[#F2F4F6] text-[#191F28] hover:bg-[#E5E8EB] active:bg-[#D1D6DB] text-[13px] font-semibold flex items-center justify-center shrink-0 tds-press transition-colors"
          >
            메일 보내기
          </a>
        </div>

        {/* Footer */}
        <footer className="text-center pt-8 pb-4 text-[12px] text-[#8B95A1]">
          <p>© {new Date().getFullYear()} {profileData.name} · My Link</p>
        </footer>
      </main>

      {/* Bottom CTA (56pt single primary action with protective gradient) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
        <div className="w-full max-w-[460px] px-4 pb-5 pt-6 bg-gradient-to-t from-[#F2F4F6] via-[#F2F4F6]/95 to-transparent pointer-events-auto">
          <button
            onClick={handleShare}
            className="w-full h-[56px] rounded-[16px] bg-[#3182F6] text-white text-[17px] font-bold shadow-tds-cta hover:bg-[#2B72D6] active:bg-[#1B64CE] tds-press transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>프로필 링크 복사하기</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        isOpen={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
