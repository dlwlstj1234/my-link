"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userKeys } from "@/lib/query-keys";
import { recordLinkClick } from "@/lib/link-clicks";
import Image from "next/image";
import { BookOpen, ChevronRight, Coffee, FolderGit2, Globe, Send, Sparkles } from "lucide-react";
import type { LinkCardItem } from "@/data/profile";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LinkForm from "@/components/LinkForm";
import DeleteLinkDialog from "@/components/DeleteLinkDialog";
import { linkSchema, type LinkFormValues } from "@/lib/link-schema";

export interface LinkItemProps {
  ownerUid: string;
  showClickCount?: boolean;
  clickCountsStatus?: "loading" | "error";
  link: LinkCardItem;
  onUpdate?: (id: string, values: LinkFormValues) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  disabled?: boolean;
}

const linkIcons = { BookOpen, Coffee, FolderGit2, Globe, Send, Sparkles };

export default function LinkItem({ ownerUid, showClickCount = true, clickCountsStatus, link, onUpdate, onDelete, disabled = false }: LinkItemProps) {
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const client = useQueryClient();
  const click = useMutation({
    mutationKey: ["link-click", ownerUid, link.id],
    retry: false,
    mutationFn: () => recordLinkClick(ownerUid, link.id),
    onSuccess: (clickCount) => {
      client.setQueryData<LinkCardItem[]>(userKeys.links(ownerUid), (links) => links?.map((item) => item.id === link.id ? { ...item, clickCount: Math.max(item.clickCount ?? 0, clickCount) } : item));
    },
  });
  const Icon = linkIcons[link.icon as keyof typeof linkIcons] ?? Globe;
  return (
    <div className="overflow-hidden rounded-[20px] border border-[#E5E8EB] bg-white">
      {editing && onUpdate ? (
        <div className="p-4">
          <h3 className="mb-4 text-base font-semibold">링크 수정</h3>
          <LinkForm
            defaultValues={{ title: link.title, url: link.url, description: link.description, icon: linkSchema.shape.icon.parse(link.icon), badge: link.badge ?? "", category: link.category ?? "" }}
            submitLabel="수정 저장"
            onSubmit={async (values) => { await onUpdate(link.id, values); setEditing(false); }}
            onCancel={() => setEditing(false)}
            onBusyChange={setBusy}
          />
        </div>
      ) : (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${link.title} (새 탭에서 열기)`}
      onClick={() => click.mutate()}
      onAuxClick={(event) => { if (event.button === 1) click.mutate(); }}
      className="group block rounded-[20px] outline-none focus-visible:ring-2 focus-visible:ring-[#3182F6] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F2F4F6]"
    >
      <Card className="gap-0 rounded-none bg-white py-0 text-[#191F28] shadow-none ring-0 transition-colors duration-200 group-hover:bg-[#F9FAFB] group-active:bg-[#F2F4F6]">
        {link.image && (
          <div className="relative h-36 w-full bg-[#F2F4F6] sm:h-44">
            <Image src={link.image} alt="" fill sizes="(max-width: 460px) 100vw, 420px" className="object-cover" />
          </div>
        )}
        <CardContent className="flex items-center gap-3.5 p-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-[#E8F3FF] text-[#3182F6]">
            <Icon aria-hidden="true" className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-1.5">
              {link.badge && (
                <Badge variant="secondary" className="h-[22px] rounded-[6px] bg-[#E8F3FF] px-2 text-[11px] font-semibold text-[#3182F6]">
                  {link.badge}
                </Badge>
              )}
              {link.category && <span className="text-xs text-[#6B7684]">{link.category}</span>}
            </div>
            <h3 className="break-words text-base font-semibold leading-snug tracking-tight">{link.title}</h3>
            <p className="mt-1 break-words text-[13px] leading-relaxed text-[#6B7684]">{link.description}</p>
            {showClickCount && <p className="mt-2 text-xs text-[#6B7684]" aria-live="polite">{clickCountsStatus && click.data === undefined ? clickCountsStatus === "error" ? "클릭수 확인 불가" : "클릭수 불러오는 중" : `클릭 ${Math.max(link.clickCount ?? 0, click.data ?? 0).toLocaleString("ko-KR")}회`}</p>}
          </div>
          <ChevronRight aria-hidden="true" className="size-5 shrink-0 text-[#B0B8C1] transition-transform duration-200 group-hover:translate-x-0.5" />
        </CardContent>
      </Card>
    </a>
      )}
      {showClickCount && click.isError && <p role="status" className="px-4 pb-3 text-xs text-[#F04452]">클릭수를 저장하지 못했어요. 링크는 정상적으로 열립니다.</p>}
      {onUpdate && onDelete && <div className="flex flex-wrap items-center justify-end gap-1 border-t border-[#E5E8EB] px-3 py-2">
        {link.updatedAt && (
          <time dateTime={new Date(link.updatedAt).toISOString()} className="mr-auto text-[11px] text-[#6B7684]">
            수정 {new Intl.DateTimeFormat("ko-KR", { timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).format(link.updatedAt)}
          </time>
        )}
        <Button type="button" variant="ghost" disabled={disabled || busy || editing} aria-label={`${link.title} 수정`} onClick={() => setEditing(true)} className="h-10 rounded-[12px] text-[#4E5968]">수정</Button>
        <DeleteLinkDialog title={link.title} disabled={disabled || busy || editing} onDelete={() => onDelete(link.id)} />
      </div>}
    </div>
  );
}
