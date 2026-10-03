import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#F2F4F6] text-[#191F28]">
      <div className="max-w-[400px] w-full text-center space-y-4 p-8 rounded-[24px] bg-white border border-[#E5E8EB]/70 shadow-tds-card">
        <h1 className="text-[56px] font-bold text-[#3182F6] tracking-tight">404</h1>
        <h2 className="text-[20px] font-bold text-[#191F28]">페이지를 찾을 수 없어요</h2>
        <p className="text-[14px] text-[#6B7684] leading-relaxed">
          요청하신 페이지가 사라졌거나 주소가 변경되었어요.
        </p>
        <div className="pt-3">
          <Link
            href="/"
            className="w-full h-[48px] inline-flex items-center justify-center gap-2 rounded-[14px] bg-[#3182F6] text-white text-[15px] font-semibold hover:bg-[#2B72D6] active:bg-[#1B64CE] tds-press transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>홈으로 돌아가기</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
