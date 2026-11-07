"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { LinkFormValues } from "@/lib/link-schema";
import LinkForm from "@/components/LinkForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function AddLinkDialog({ onAdd, disabled = false }: { onAdd: (values: LinkFormValues) => Promise<void>; disabled?: boolean }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  return (
    <Dialog open={open} onOpenChange={(value) => { if (!busy) setOpen(value); }}>
      <DialogTrigger disabled={disabled} render={<Button variant="outline" className="h-10 rounded-[12px] border-[#E5E8EB] bg-white text-[#3182F6] hover:bg-[#E8F3FF]" />}>
        <Plus aria-hidden="true" /> 새 링크 추가
      </DialogTrigger>
      <DialogContent showCloseButton={!busy} className="max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-[24px] bg-white p-6 text-[#191F28] sm:max-w-[440px]">
        <DialogHeader className="pr-8">
          <DialogTitle className="text-xl font-bold">새 링크 추가</DialogTitle>
          <DialogDescription>추가한 링크는 저장 후 목록에 표시돼요. 새로고침해도 유지돼요.</DialogDescription>
        </DialogHeader>
        {open && <LinkForm onSubmit={async (values) => { await onAdd(values); setOpen(false); }} onCancel={() => setOpen(false)} onBusyChange={setBusy} />}
      </DialogContent>
    </Dialog>
  );
}
