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
            Frontend & Software Developer
          </p>
        </div>

        {/* 소개글 */}
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base break-keep">
          직관적인 사용자 경험과 깔끔한 코드를 지향하는 프론트엔드 개발자입니다.<br />
          새로운 기술을 탐구하는 과정을 즐기며, 일상의 문제를 코드로 해결하는 가치를 만들어가고 있습니다.
        </p>

        {/* 심플한 구분선 & 뱃지 */}
        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap justify-center gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
            💻 Frontend
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
            ⚡ Next.js & React
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
            🌱 Continuous Growth
          </span>
        </div>
      </div>
    </main>
  );
}

