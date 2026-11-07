"use client";

import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { linkSchema, type LinkFormValues } from "@/lib/link-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface LinkFormProps {
  defaultValues?: Partial<LinkFormValues>;
  submitLabel?: string;
  onSubmit: (values: LinkFormValues) => Promise<void>;
  onCancel: () => void;
  onBusyChange?: (busy: boolean) => void;
}

const inputClassName = "h-12 rounded-[12px] border-[#E5E8EB] bg-[#F9FAFB] text-[#191F28] focus-visible:border-[#3182F6] focus-visible:ring-[#3182F6]/20";

export default function LinkForm({ defaultValues, submitLabel = "추가하기", onSubmit, onCancel, onBusyChange }: LinkFormProps) {
  const id = useId();
  const { register, handleSubmit, setError, clearErrors, formState: { errors, isSubmitting } } = useForm<LinkFormValues>({
    resolver: zodResolver(linkSchema), mode: "onSubmit", reValidateMode: "onChange",
    defaultValues: { title: "", url: "", description: "", icon: "Globe", category: "", badge: "", ...defaultValues },
  });

  async function submit(values: LinkFormValues) {
    clearErrors("root");
    onBusyChange?.(true);
    try { await onSubmit(values); }
    catch { setError("root", { message: "링크를 저장하지 못했어요. 연결 상태를 확인하고 다시 시도해 주세요." }); }
    finally { onBusyChange?.(false); }
  }

  function fieldProps(name: keyof LinkFormValues) {
    return { ...register(name), "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined };
  }
  function fieldError(name: keyof LinkFormValues) {
    return errors[name] && <p id={`${id}-${name}-error`} role="alert" className="text-sm text-[#F04452]">{errors[name].message}</p>;
  }

  return (
    <form noValidate aria-busy={isSubmitting} onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
      <fieldset disabled={isSubmitting} className="flex min-w-0 flex-col gap-4">
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
          <Button type="button" onClick={onCancel} variant="secondary" className="h-12 flex-1 rounded-[14px] bg-[#F2F4F6] text-[#191F28]">취소</Button>
          <Button type="submit" disabled={isSubmitting} className="h-12 flex-1 rounded-[14px] bg-[#3182F6] font-semibold text-white hover:bg-[#1B64CE]">
            {isSubmitting && <LoaderCircle aria-hidden="true" className="size-4 motion-safe:animate-spin" />}
            {isSubmitting ? "저장 중…" : submitLabel}
          </Button>
        </div>
      </fieldset>
      <span role="status" className="sr-only">{isSubmitting ? "링크를 저장하고 있어요." : ""}</span>
      {errors.root && <p role="alert" className="text-sm text-[#F04452]">{errors.root.message}</p>}
    </form>
  );
}
