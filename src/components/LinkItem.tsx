import Image from "next/image";
import { BookOpen, ChevronRight, Coffee, FolderGit2, Globe, Send, Sparkles } from "lucide-react";
import type { LinkCardItem } from "@/data/profile";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const linkIcons = { BookOpen, Coffee, FolderGit2, Globe, Send, Sparkles };

export default function LinkItem({ link }: { link: LinkCardItem }) {
  const Icon = linkIcons[link.icon as keyof typeof linkIcons] ?? Globe;
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${link.title} (새 탭에서 열기)`}
      className="group block rounded-[20px] outline-none focus-visible:ring-2 focus-visible:ring-[#3182F6] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F2F4F6]"
    >
      <Card className="gap-0 rounded-[20px] border border-[#E5E8EB] bg-white py-0 text-[#191F28] shadow-none ring-0 transition-colors duration-200 group-hover:bg-[#F9FAFB] group-active:bg-[#F2F4F6]">
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
          </div>
          <ChevronRight aria-hidden="true" className="size-5 shrink-0 text-[#B0B8C1] transition-transform duration-200 group-hover:translate-x-0.5" />
        </CardContent>
      </Card>
    </a>
  );
}
