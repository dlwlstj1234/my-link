"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Share2, Sparkles } from "lucide-react";
import { ProfileData } from "@/data/profile";

interface ProfileCardProps {
  profile: ProfileData;
  onShare: () => void;
}

export default function ProfileCard({ profile, onShare }: ProfileCardProps) {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl shadow-zinc-950/5 transition-all duration-300">
      {/* Cover Header Image */}
      <div className="relative w-full h-32 sm:h-40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-hidden">
        {profile.coverImageUrl && (
          <Image
            src={profile.coverImageUrl}
            alt="Profile cover"
            fill
            priority
            className="object-cover opacity-80"
            sizes="(max-width: 640px) 100vw, 640px"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Share Button (Top Right) */}
        <button
          onClick={onShare}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-all duration-200 active:scale-95 shadow-md flex items-center gap-1.5 text-xs font-medium"
          aria-label="프로필 공유하기"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">공유</span>
        </button>
      </div>

      {/* Profile Details */}
      <div className="relative px-6 pb-6 pt-0 sm:px-8">
        {/* Avatar Container */}
        <div className="flex justify-between items-end -mt-16 sm:-mt-20 mb-4">
          <div className="relative group">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full ring-4 ring-white dark:ring-zinc-900 overflow-hidden shadow-2xl bg-zinc-200 dark:bg-zinc-800">
              <Image
                src={profile.avatarUrl}
                alt={profile.name}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="128px"
              />
            </div>
            {/* Online Status Indicator */}
            {profile.status.isAvailable && (
              <span
                className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-white dark:border-zinc-900 rounded-full shadow-md"
                title="상태: 가능"
              >
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
              </span>
            )}
          </div>

          {/* Status Badge */}
          {profile.status.text && (
            <div className="mb-2 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-xs font-medium text-indigo-700 dark:text-indigo-300 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-spin-slow shrink-0" />
              <span>{profile.status.text}</span>
            </div>
          )}
        </div>

        {/* Mobile Status Badge */}
        {profile.status.text && (
          <div className="flex sm:hidden items-center gap-1.5 px-3 py-1.5 mb-3 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-xs font-medium text-indigo-700 dark:text-indigo-300 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>{profile.status.text}</span>
          </div>
        )}

        {/* Name and Role */}
        <div className="space-y-1 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {profile.name}
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
              PRO
            </span>
          </div>
          <p className="text-sm sm:text-base font-medium text-indigo-600 dark:text-indigo-400">
            {profile.role}
          </p>
          {profile.location && (
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 pt-0.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>{profile.location}</span>
            </div>
          )}
        </div>

        {/* Bio */}
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
          {profile.bio}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {profile.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
