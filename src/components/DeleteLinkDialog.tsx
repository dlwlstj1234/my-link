"use client";

import { useState } from "react";
import { LoaderCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function DeleteLinkDialog({ title, onDelete, disabled = false }: { title: string; onDelete: () => Promise<void>; disabled?: boolean }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function remove() {
    setBusy(true);
    setError("");
    try { await onDelete(); setOpen(false); }
    catch { setError("삭제하지 못했어요. 연결 상태를 확인하고 다시 시도해 주세요."); }
    finally { setBusy(false); }
  }
  return (
    <Dialog open={open} onOpenChange={(value) => { if (!busy) { setOpen(value); setError(""); } }}>
      <DialogTrigger disabled={disabled} render={<Button type="button" variant="ghost" aria-label={`${title} 삭제`} className="h-10 rounded-[12px] text-[#F04452] hover:bg-[#F04452]/10 hover:text-[#F04452]" />}>
        <Trash2 aria-hidden="true" /> 삭제
      </DialogTrigger>
      <DialogContent role="alertdialog" showCloseButton={false} className="rounded-[24px] bg-white p-6 text-[#191F28] sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">정말 삭제하시겠습니까?</DialogTitle>
          <DialogDescription className="break-words text-[#4E5968]">{title}</DialogDescription>
        </DialogHeader>
        <p className="text-sm font-semibold text-[#F04452]">이 작업은 되돌릴 수 없습니다</p>
        {error && <p role="alert" className="text-sm text-[#F04452]">{error}</p>}
        <div className="flex gap-3" aria-busy={busy}>
          <Button type="button" variant="secondary" disabled={busy} onClick={() => setOpen(false)} className="h-12 flex-1 rounded-[14px]">취소</Button>
          <Button type="button" variant="destructive" disabled={busy} onClick={remove} className="h-12 flex-1 rounded-[14px] bg-[#F04452] font-semibold text-white hover:bg-[#D93443]">
            {busy && <LoaderCircle aria-hidden="true" className="size-4 motion-safe:animate-spin" />}
            {busy ? "삭제 중…" : "삭제하기"}
          </Button>
        </div>
        <span role="status" className="sr-only">{busy ? "링크를 삭제하고 있어요." : ""}</span>
      </DialogContent>
    </Dialog>
  );
}
