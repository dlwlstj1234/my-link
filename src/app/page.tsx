export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 text-center space-y-6">
        {/* 프로필 아바타 / 이니셜 */}
        <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
          이진서
        </div>

        {/* 이름 및 역할 */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">이진서</h1>
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
            Student & Learner
          </p>
        </div>

        {/* 소개글 */}
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base break-keep">
          안녕하세요! 바이브 코딩을 배우고 있는 대학생입니다.
        </p>

        {/* 심플한 구분선 & 뱃지 */}
        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex justify-center gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
            🌱 바이브 코딩
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
            🎓 대학생
          </span>
        </div>
      </div>
    </main>
  );
}

