"use client";

import { useId, type ReactNode } from "react";
import type { LinkCardItem } from "@/data/profile";
import LinkItem from "@/components/LinkItem";
import { LoaderCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { LinkFormValues } from "@/lib/link-schema";

interface LinkListProps {
  ownerUid: string;
  showClickCount?: boolean;
  clickCountsStatus?: "loading" | "error";
  links: LinkCardItem[];
  title?: string;
  action?: ReactNode;
  isLoading?: boolean;
  showSkeleton?: boolean;
  onUpdate?: (id: string, values: LinkFormValues) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
}

export default function LinkList({ ownerUid, showClickCount = true, clickCountsStatus, links, title = "주요 프로젝트와 링크", action, isLoading = false, showSkeleton = false, onUpdate, onDelete }: LinkListProps) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} aria-busy={isLoading} className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 px-1 pt-3 pb-1">
        <h2 id={headingId} className="text-[18px] font-bold tracking-tight text-[#191F28]">
          {title}
        </h2>
        <div className="flex items-center gap-3">
          {isLoading ? (
            <span role="status" className="flex items-center gap-1.5 text-xs text-[#6B7684]">
              <LoaderCircle aria-hidden="true" className="size-4 motion-safe:animate-spin" />
              <span>{showSkeleton ? "불러오는 중" : "갱신 중"}</span>
            </span>
          ) : (
            <span aria-live="polite" className="text-[13px] font-medium text-[#8B95A1]">{links.length}개</span>
          )}
          {action}
        </div>
      </div>
      {showSkeleton ? (
        <div aria-hidden="true" className="flex flex-col gap-3">
          {Array.from({ length: 3 }, (_, index) => (
            <Card key={index} className="flex-row items-center gap-3.5 rounded-[20px] border border-[#E5E8EB] bg-white p-4 shadow-none ring-0">
              <div className="size-11 shrink-0 rounded-[14px] bg-[#F2F4F6] motion-safe:animate-pulse" />
              <div className="flex flex-1 flex-col gap-3">
                <div className="h-4 w-2/3 rounded bg-[#E5E8EB] motion-safe:animate-pulse" />
                <div className="h-3 w-full rounded bg-[#F2F4F6] motion-safe:animate-pulse" />
              </div>
            </Card>
          ))}
        </div>
      ) : <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.id} className="min-w-0">
            <LinkItem ownerUid={ownerUid} showClickCount={showClickCount} clickCountsStatus={clickCountsStatus} link={link} onUpdate={onUpdate} onDelete={onDelete} disabled={isLoading} />
          </li>
        ))}
      </ul>}
    </section>
  );
}
