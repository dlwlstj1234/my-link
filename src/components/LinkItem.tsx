"use client";

import React from "react";
import Image from "next/image";
import {
  ExternalLink,
  Sparkles,
  BookOpen,
  FolderGit2,
  Coffee,
  Send,
  Globe,
  Star,
  Layers,
} from "lucide-react";
import { LinkCardItem } from "@/data/profile";

interface LinkItemProps {
  link: LinkCardItem;
}

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5" />,
  BookOpen: <BookOpen className="w-5 h-5" />,
  FolderGit2: <FolderGit2 className="w-5 h-5" />,
  Coffee: <Coffee className="w-5 h-5" />,
  Send: <Send className="w-5 h-5" />,
  Star: <Star className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
};

const badgeStyles: Record<string, string> = {
  primary:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
  success:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  warning:
    "bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  hot: "bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200 dark:border-rose-800 animate-pulse",
};

export default function LinkItem({ link }: LinkItemProps) {
  const icon = iconMap[link.icon] || <Globe className="w-5 h-5" />;
  const badgeStyle = link.badgeColor
    ? badgeStyles[link.badgeColor] || badgeStyles.primary
    : badgeStyles.primary;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col w-full overflow-hidden rounded-2xl transition-all duration-300 ${
        link.highlight
          ? "p-[1.5px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md hover:shadow-xl hover:shadow-indigo-500/20 hover:-translate-y-1"
          : "border border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-0.5"
      }`}
    >
      <div
        className={`flex flex-col w-full h-full rounded-[14px] ${
          link.highlight
            ? "bg-white dark:bg-zinc-900"
            : "bg-transparent"
        } p-4 sm:p-5`}
      >
        {link.image && (
          <div className="relative w-full h-32 sm:h-36 mb-3.5 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            <Image
              src={link.image}
              alt={link.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              sizes="(max-width: 640px) 100vw, 540px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          </div>
        )}

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3.5 flex-1 min-w-0">
            <div
              className={`p-2.5 rounded-xl shrink-0 transition-colors duration-200 ${
                link.highlight
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white"
                  : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-zinc-100 dark:group-hover:text-zinc-900"
              }`}
            >
              {icon}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                  {link.title}
                </h3>
                {link.badge && (
                  <span
                    className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full border ${badgeStyle}`}
                  >
                    {link.badge}
                  </span>
                )}
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                {link.description}
              </p>
            </div>
          </div>

          <div className="text-zinc-400 dark:text-zinc-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 p-1">
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </div>
    </a>
  );
}
