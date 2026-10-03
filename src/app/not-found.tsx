import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-md w-full text-center space-y-4">
        <h1 className="text-6xl font-black text-indigo-600 dark:text-indigo-400">404</h1>
        <h2 className="text-2xl font-bold">페이지를 찾을 수 없습니다</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors text-sm font-medium shadow-md shadow-indigo-500/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>홈(프로필)으로 돌아가기</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
