"use client";

import { useId, type ReactNode } from "react";
import type { LinkCardItem } from "@/data/profile";
import LinkItem from "@/components/LinkItem";

interface LinkListProps {
  links: LinkCardItem[];
  title?: string;
  action?: ReactNode;
}

export default function LinkList({ links, title = "주요 프로젝트와 링크", action }: LinkListProps) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 px-1 pt-3 pb-1">
        <h2 id={headingId} className="text-[18px] font-bold tracking-tight text-[#191F28]">
          {title}
        </h2>
        <div className="flex items-center gap-3">
          <span aria-live="polite" className="text-[13px] font-medium text-[#8B95A1]">{links.length}개</span>
          {action}
        </div>
      </div>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.id} className="min-w-0">
            <LinkItem link={link} />
          </li>
        ))}
      </ul>
    </section>
  );
}
