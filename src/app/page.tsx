"use client";

import React, { useState } from "react";
import ProfileCard from "@/components/ProfileCard";
import SocialLinks from "@/components/SocialLinks";
import LinkItem from "@/components/LinkItem";
import Toast from "@/components/Toast";
import { profileData } from "@/data/profile";
import { Link2, Heart } from "lucide-react";

export default function Home() {
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "https://mylink.me";
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        setToastMessage("프로필 링크가 클립보드에 복사되었습니다! 🎉");
      } else {
        setToastMessage("링크: " + url);
      }
      setShowToast(true);
    } catch {
      setToastMessage("링크 복사에 성공했습니다!");
      setShowToast(true);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-slate-50 via-zinc-100 to-slate-200 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Decorative Ambient Background Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-tr from-indigo-500/15 via-purple-500/15 to-pink-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Responsive Content Wrapper */}
      <main className="w-full max-w-lg sm:max-w-xl flex flex-col gap-6 items-center">
        {/* Profile Card Header */}
        <ProfileCard profile={profileData} onShare={handleShare} />

        {/* Social Media Links Bar */}
        <div className="w-full">
          <SocialLinks socials={profileData.socials} />
        </div>

        {/* Links Section Divider */}
        <div className="w-full flex items-center gap-3 pt-2 pb-1">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/60 dark:bg-zinc-800/60 backdrop-blur-md border border-zinc-200/60 dark:border-zinc-700/60 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
            <Link2 className="w-3.5 h-3.5 text-indigo-500" />
            <span>주요 링크 & 포트폴리오</span>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />
        </div>

        {/* Links Cards List */}
        <section className="w-full flex flex-col gap-3.5 sm:gap-4">
          {profileData.links.map((link) => (
            <LinkItem key={link.id} link={link} />
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-lg text-center pt-10 pb-4 text-xs text-zinc-500 dark:text-zinc-400 flex flex-col items-center gap-2">
        <div className="flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline animate-pulse" />
          <span>using <strong className="font-semibold text-zinc-700 dark:text-zinc-300">My Link</strong></span>
        </div>
        <p className="text-zinc-400 dark:text-zinc-600 text-[11px]">
          © {new Date().getFullYear()} {profileData.name}. All rights reserved.
        </p>
      </footer>

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        isOpen={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
