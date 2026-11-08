"use client";

import { Button } from "@/components/ui/button";

export default function PublicPageError({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F2F4F6] px-5 text-center">
      <h1 className="text-xl font-bold">페이지를 불러오지 못했어요</h1>
      <p role="alert" className="text-sm text-[#6B7684]">잠시 후 다시 시도해 주세요.</p>
      <Button onClick={reset}>다시 불러오기</Button>
    </main>
  );
}
