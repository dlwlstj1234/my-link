"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import { ProfileData } from "@/data/profile";

interface ProfileCardProps {
  profile: ProfileData;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="w-full bg-white rounded-[24px] border border-[#E5E8EB]/70 shadow-tds-card p-6 sm:p-7 flex flex-col gap-5">
      {/* Top Profile Header: Avatar & Info */}
      <div className="flex items-start gap-4">
        {/* 72px Avatar */}
        <div className="relative w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] rounded-[22px] overflow-hidden bg-[#F2F4F6] border border-[#E5E8EB] shrink-0">
          <Image
            src={profile.avatarUrl}
            alt={profile.name}
            fill
            priority
            className="object-cover"
            sizes="80px"
          />
        </div>

        {/* Name, Handle, Role */}
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h1 className="text-[22px] sm:text-[24px] font-bold text-[#191F28] tracking-tight">
              {profile.name}
            </h1>
            <CheckCircle2 className="w-4.5 h-4.5 text-[#3182F6] fill-[#E8F3FF] shrink-0" />
            <span className="text-[13px] font-medium text-[#8B95A1]">
              {profile.handle}
            </span>
          </div>

          <p className="text-[14px] sm:text-[15px] font-semibold text-[#3182F6] mt-0.5">
            {profile.role}
          </p>

          <div className="flex items-center gap-1 text-[12px] text-[#8B95A1] mt-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{profile.location}</span>
          </div>
        </div>
      </div>

      {/* Online Status Chip */}
      {profile.statusText && (
        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#E8F3FF] text-[#3182F6] text-[13px] font-semibold w-fit">
          <span className="w-2 h-2 rounded-full bg-[#3182F6] animate-pulse shrink-0" />
          <span>{profile.statusText}</span>
        </div>
      )}

      {/* Bio in 해요체 */}
      <p className="text-[15px] text-[#4E5968] leading-[1.6] break-words">
        {profile.bio}
      </p>

      {/* TDS Stats Row */}
      <div className="grid grid-cols-3 gap-2 bg-[#F9FAFB] rounded-[18px] p-3 border border-[#E5E8EB]/50">
        {profile.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center justify-center p-1 text-center">
            <span className="text-[11px] font-medium text-[#8B95A1] mb-0.5">
              {stat.label}
            </span>
            <div className="text-[16px] sm:text-[17px] font-bold text-[#191F28] tabular-nums tracking-tight flex items-baseline gap-0.5">
              <span>{stat.value}</span>
              {stat.unit && <span className="text-[12px] font-medium text-[#6B7684]">{stat.unit}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Skill Tags */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {profile.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-[12px] font-semibold rounded-full bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB] transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
