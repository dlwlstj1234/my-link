"use client";

import ProfileAvatar from "@/components/ProfileAvatar";
import Link from "next/link";
import { ChevronDown, Link as LinkIcon, LoaderCircle, LogOut, UserRoundPen } from "lucide-react";
import type { UserProfile } from "@/lib/user-profile";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ProfileMenuProps {
  profile: UserProfile;
  linkCount: number | null;
  busy: boolean;
  onLogout: () => void;
  onEdit: () => void;
  canEdit: boolean;
  pageHref?: string;
}

export default function ProfileMenu({ profile, linkCount, busy, onLogout, onEdit, canEdit, pageHref }: ProfileMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={busy} render={<Button variant="ghost" aria-label="프로필 메뉴" className="h-11 max-w-[220px] gap-2 rounded-full px-2 hover:bg-[#E5E8EB]" />}>
        <ProfileAvatar key={profile.photoURL} name={profile.displayName} photoURL={profile.photoURL} />
        <span className="max-w-28 truncate text-sm font-semibold">{profile.displayName}</span>
        {busy ? <LoaderCircle aria-hidden="true" className="size-4 motion-safe:animate-spin" /> : <ChevronDown aria-hidden="true" className="size-4 text-[#6B7684]" />}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-72 max-w-[calc(100vw-2rem)] rounded-[20px] border border-[#E5E8EB] bg-white p-2 text-[#191F28] shadow-tds-toast ring-0">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="p-3 text-[#191F28]">
            <span className="flex items-center gap-3">
              <ProfileAvatar key={profile.photoURL} name={profile.displayName} photoURL={profile.photoURL} size={40} />
              <span className="min-w-0">
                <span className="block break-words text-sm font-semibold">{profile.displayName}</span>
                <span className="mt-1 block break-all text-xs font-normal text-[#6B7684]">{profile.email}</span>
                <span className="mt-2 block text-[11px] font-normal text-[#8B95A1]">Google 계정으로 로그인됨</span>
              </span>
            </span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-[#E5E8EB]" />
        <div className="flex items-center justify-between gap-3 px-3 py-3 text-sm">
          <span className="flex items-center gap-2 text-[#4E5968]"><LinkIcon aria-hidden="true" className="size-4" />등록한 링크</span>
          <span aria-live="polite" className="font-semibold tabular-nums text-[#3182F6]">{linkCount === null ? "확인 중" : `${linkCount}개`}</span>
        </div>
        <DropdownMenuSeparator className="bg-[#E5E8EB]" />
        {pageHref && <DropdownMenuItem render={<Link href={pageHref} />} className="min-h-11 cursor-pointer gap-2 rounded-[12px] px-3 text-[#4E5968] focus:bg-[#F2F4F6]">
          <LinkIcon aria-hidden="true" /> 내 페이지 보기
        </DropdownMenuItem>}
        <DropdownMenuItem disabled={busy || !canEdit} onClick={onEdit} className="min-h-11 cursor-pointer gap-2 rounded-[12px] px-3 text-[#4E5968] focus:bg-[#F2F4F6]">
          <UserRoundPen aria-hidden="true" /> 프로필 수정
        </DropdownMenuItem>
        <DropdownMenuItem disabled={busy} onClick={onLogout} className="min-h-11 cursor-pointer gap-2 rounded-[12px] px-3 text-[#4E5968] focus:bg-[#F2F4F6]">
          <LogOut aria-hidden="true" /> 로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
