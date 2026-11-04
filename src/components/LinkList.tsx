"use client";

import { useId } from "react";
import type { LinkCardItem } from "@/data/profile";
import LinkItem from "@/components/LinkItem";

interface LinkListProps {
  links: LinkCardItem[];
  title?: string;
}

export default function LinkList({ links, title = "주요 프로젝트와 링크" }: LinkListProps) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between px-1 pt-3 pb-1">
        <h2 id={headingId} className="text-[18px] font-bold tracking-tight text-[#191F28]">
          {title}
        </h2>
        <span className="text-[13px] font-medium text-[#8B95A1]">{links.length}개</span>
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
