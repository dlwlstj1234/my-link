"use client";

import React from "react";
import Image from "next/image";
import {
  Sparkles,
  BookOpen,
  FolderGit2,
  Coffee,
  Send,
  Globe,
  ChevronRight,
} from "lucide-react";
import { LinkCardItem } from "@/data/profile";

interface LinkItemProps {
  link: LinkCardItem;
}

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5 text-[#3182F6]" />,
  BookOpen: <BookOpen className="w-5 h-5 text-[#3182F6]" />,
  FolderGit2: <FolderGit2 className="w-5 h-5 text-[#3182F6]" />,
  Coffee: <Coffee className="w-5 h-5 text-[#3182F6]" />,
  Send: <Send className="w-5 h-5 text-[#3182F6]" />,
  Globe: <Globe className="w-5 h-5 text-[#3182F6]" />,
};

export default function LinkItem({ link }: LinkItemProps) {
  const icon = iconMap[link.icon] || <Globe className="w-5 h-5 text-[#3182F6]" />;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col w-full min-w-0 bg-white rounded-[20px] border border-[#E5E8EB]/70 shadow-tds-card hover:bg-[#F9FAFB] active:bg-[#F2F4F6] tds-press transition-all duration-150 overflow-hidden"
    >
      {/* Featured Banner Image */}
      {link.image && (
        <div className="relative w-full h-36 sm:h-44 bg-[#F2F4F6] overflow-hidden border-b border-[#E5E8EB]/70">
          <Image
            src={link.image}
            alt={link.title}
            fill
            className="object-cover group-hover:scale-102 transition-transform duration-300 ease-out"
            sizes="(max-width: 640px) 100vw, 480px"
          />
          {link.badge && (
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#3182F6] text-white rounded-[8px] text-[11px] font-bold tracking-tight shadow-sm">
              {link.badge}
            </div>
          )}
        </div>
      )}

      {/* ListRow Content */}
      <div className="p-4 sm:p-4.5 flex items-center justify-between gap-3.5 w-full min-w-0">
        {/* Left 44px Icon Container */}
        <div className="w-11 h-11 rounded-[14px] bg-[#E8F3FF] flex items-center justify-center shrink-0">
          {icon}
        </div>

        {/* Title & Description Stack */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-[16px] sm:text-[17px] font-semibold text-[#191F28] tracking-tight truncate">
              {link.title}
            </h3>
            {link.badge && !link.image && (
              <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-semibold rounded-[6px] bg-[#E8F3FF] text-[#3182F6] shrink-0">
                {link.badge}
              </span>
            )}
          </div>
          <p className="text-[13px] sm:text-[14px] text-[#6B7684] leading-snug line-clamp-1">
            {link.description}
          </p>
        </div>

        {/* Right Chevron */}
        <div className="text-[#B0B8C1] group-hover:text-[#4E5968] group-hover:translate-x-0.5 transition-all shrink-0">
          <ChevronRight className="w-5 h-5 stroke-[2]" />
        </div>
      </div>
    </a>
  );
}
