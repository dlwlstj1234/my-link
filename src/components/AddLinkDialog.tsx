"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { linkSchema, type LinkFormValues } from "@/lib/link-schema";
import { Plus, X } from "lucide-react";
import type { LinkCardItem } from "@/data/profile";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogClose, DialogContent, DialogDescription,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AddLinkDialogProps {
  onAdd: (link: LinkCardItem) => void;
}

const inputClassName = "h-12 rounded-[12px] border-[#E5E8EB] bg-[#F9FAFB] text-[#191F28] focus-visible:border-[#3182F6] focus-visible:ring-[#3182F6]/20";

export default function AddLinkDialog({ onAdd }: AddLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<LinkFormValues>({
    resolver: zodResolver(linkSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: { title: "", url: "", description: "", icon: "Globe", category: "", badge: "" },
  });
  const id = useId();

  function submitLink(values: LinkFormValues) {
    onAdd({
      ...values,
      id: crypto.randomUUID(),
      url: new URL(values.url).href,
      badge: values.badge || undefined,
      category: values.category || undefined,
    });
    setOpen(false);
    reset();
  }

  function fieldProps(name: keyof LinkFormValues) {
    return {
      ...register(name),
      "aria-invalid": Boolean(errors[name]),
      "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
    };
  }

  function fieldError(name: keyof LinkFormValues) {
    return errors[name] && (
      <p id={`${id}-${name}-error`} role="alert" className="text-sm text-[#F04452]">
        {errors[name].message}
      </p>
    );
  }

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => { setOpen(nextOpen); if (!nextOpen) reset(); }}>
      <DialogTrigger render={<Button variant="outline" className="h-10 rounded-[12px] border-[#E5E8EB] bg-white text-[#3182F6] hover:bg-[#E8F3FF]" />}>
        <Plus aria-hidden="true" /> 새 링크 추가
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-[24px] bg-white p-6 text-[#191F28] sm:max-w-[440px]">
        <DialogHeader className="pr-8">
          <DialogTitle className="text-xl font-bold">새 링크 추가</DialogTitle>
          <DialogDescription className="text-[#6B7684]">
            추가한 링크는 바로 목록에 표시돼요. 새로고침하면 사라져요.
          </DialogDescription>
        </DialogHeader>
        <DialogClose aria-label="닫기" render={<Button variant="ghost" size="icon" className="absolute top-4 right-4 rounded-full" />}>
          <X aria-hidden="true" />
        </DialogClose>
        {open && (
          <form noValidate onSubmit={handleSubmit(submitLink)} className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor={`${id}-title`}>제목 (필수)</Label>
              <Input id={`${id}-title`} {...fieldProps("title")} required placeholder="예: 나의 포트폴리오" className={inputClassName} />
              {fieldError("title")}
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-url`}>URL (필수)</Label>
              <Input id={`${id}-url`} {...fieldProps("url")} type="url" required placeholder="https://example.com" className={inputClassName} />
              {fieldError("url")}
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-description`}>설명</Label>
              <Textarea id={`${id}-description`} {...fieldProps("description")} placeholder="어떤 링크인지 짧게 소개해 주세요" className="min-h-20 rounded-[12px] border-[#E5E8EB] bg-[#F9FAFB] focus-visible:border-[#3182F6] focus-visible:ring-[#3182F6]/20" />
              {fieldError("description")}
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-icon`}>아이콘</Label>
              <select id={`${id}-icon`} {...fieldProps("icon")} className={`w-full border px-3 text-sm outline-none focus-visible:ring-2 ${inputClassName}`}>
                <option value="Globe">웹사이트</option>
                <option value="FolderGit2">깃허브 · 프로젝트</option>
                <option value="BookOpen">블로그 · 기록</option>
                <option value="Coffee">커피챗</option>
                <option value="Send">뉴스레터 · 소식</option>
                <option value="Sparkles">포트폴리오 · 디자인</option>
              </select>
              {fieldError("icon")}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor={`${id}-category`}>카테고리</Label>
                <Input id={`${id}-category`} {...fieldProps("category")} placeholder="예: 프로젝트" className={inputClassName} />
                {fieldError("category")}
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-badge`}>배지</Label>
                <Input id={`${id}-badge`} {...fieldProps("badge")} placeholder="예: 대표 프로젝트" className={inputClassName} />
                {fieldError("badge")}
              </div>
            </div>
            <div className="mt-2 flex gap-3">
              <DialogClose render={<Button type="button" variant="secondary" className="h-12 flex-1 rounded-[14px] bg-[#F2F4F6] text-[#191F28]" />}>취소</DialogClose>
              <Button type="submit" disabled={isSubmitting} className="h-12 flex-1 rounded-[14px] bg-[#3182F6] font-semibold text-white hover:bg-[#1B64CE]">추가하기</Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
