"use client";

import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChartNoAxesCombined, Code2, Coffee, Globe, Link2, LoaderCircle, MousePointer2, Palette, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const examples = [
  { label: "크리에이터", name: "하루", handle: "haru", bio: "좋아하는 것을 만들고, 기록해요.", initial: "H", color: "bg-[#E8F3FF] text-[#1B64CE]", links: ["작업과 이야기가 모인 포트폴리오", "요즘 쓰고 있는 기록들", "함께 재미있는 일 해요"] },
  { label: "개발자", name: "민", handle: "min_dev", bio: "작은 아이디어를 작동하는 서비스로.", initial: "M", color: "bg-[#E8F5E9] text-[#237A48]", links: ["직접 만든 프로젝트 구경하기", "배우고 나누는 개발 노트", "커피 한 잔, 이야기 나눠요"] },
  { label: "프리랜서", name: "유니", handle: "yuni", bio: "브랜드의 다음 장면을 디자인해요.", initial: "Y", color: "bg-[#FFF3D6] text-[#926019]", links: ["최근 작업한 브랜드 프로젝트", "나의 디자인 이야기", "프로젝트 문의하기"] },
];

function ProfilePreview() {
  const [selected, setSelected] = useState(0);
  const example = examples[selected];
  return <div id="preview" className="relative mx-auto w-full max-w-[420px] scroll-mt-24">
    <div className="mb-5 flex flex-wrap justify-center gap-2" role="group" aria-label="프로필 예시 선택">
      {examples.map((item, index) => <Button key={item.handle} variant="ghost" aria-pressed={selected === index} onClick={() => setSelected(index)} className={`h-9 rounded-full px-4 text-xs font-semibold ${selected === index ? "bg-[#191F28] text-white hover:bg-[#333D4B] hover:text-white" : "bg-white/70 text-[#6B7684] hover:bg-white"}`}>{item.label}</Button>)}
    </div>
    <div className="absolute -right-3 top-20 z-10 hidden rotate-6 rounded-2xl bg-[#FFC342] p-3 text-[#191F28] sm:block"><Sparkles aria-hidden="true" className="size-6" /></div>
    <Card className="gap-0 rounded-[32px] border border-[#E5E8EB] bg-white py-0 shadow-[0_20px_70px_-30px_rgba(25,31,40,0.2)] ring-0">
      <div className="flex items-center justify-between border-b border-[#F2F4F6] px-5 py-4 text-[11px] text-[#8B95A1]"><span className="flex items-center gap-1.5"><Globe aria-hidden="true" className="size-3.5" />나만의 공개 페이지</span><span>프로필 예시</span></div>
      <CardContent className="p-5 sm:p-7">
        <div className={`mx-auto flex size-16 items-center justify-center rounded-[22px] text-2xl font-bold ${example.color}`}>{example.initial}</div>
        <div className="mt-4 text-center" aria-live="polite"><h3 className="text-xl font-bold">{example.name}</h3><p className="mt-1 text-xs text-[#8B95A1]">@{example.handle}</p><p className="mt-3 text-sm text-[#4E5968]">{example.bio}</p></div>
        <div className="mt-6 space-y-3">{example.links.map((title, index) => {
          const Icon = [Palette, Code2, Coffee][index];
          return <div key={title} className="flex items-center gap-3 rounded-[16px] border border-[#E5E8EB] p-3.5"><span className={`flex size-9 shrink-0 items-center justify-center rounded-[11px] ${example.color}`}><Icon aria-hidden="true" className="size-4" /></span><span className="flex-1 text-[13px] font-semibold leading-relaxed">{title}</span><ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-[#8B95A1]" /></div>;
        })}</div>
        <p className="mt-6 text-center text-[10px] font-medium tracking-widest text-[#B0B8C1]">MADE WITH MY LINK</p>
      </CardContent>
    </Card>
    <div className="relative mx-auto -mt-3 flex w-fit items-center gap-2 rounded-full border border-[#E5E8EB] bg-white px-4 py-2.5 text-xs font-semibold text-[#4E5968] shadow-sm"><Check aria-hidden="true" className="size-4 text-[#237A48]" />하나의 주소로, 나를 더 가깝게</div>
  </div>;
}

export default function LandingPage({ onLogin, busy, disabled, error }: { onLogin: () => void; busy: boolean; disabled: boolean; error: string }) {
  const startButton = (label: string) => <Button onClick={onLogin} disabled={disabled} className="h-13 rounded-[16px] bg-[#3182F6] px-6 text-[15px] font-semibold text-white hover:bg-[#1B64CE] active:scale-[0.98] motion-reduce:transform-none">{busy ? <LoaderCircle aria-hidden="true" className="size-4 motion-safe:animate-spin" /> : <Plus aria-hidden="true" className="size-4" />}{busy ? "로그인하는 중…" : label}<ArrowRight aria-hidden="true" className="size-4" /></Button>;
  return <div className="min-h-screen bg-[#F9FAFB] text-[#191F28]">
    <header className="sticky top-0 z-30 border-b border-[#E5E8EB]/70 bg-[#F9FAFB]/95 backdrop-blur-md">
      <nav aria-label="주 메뉴" className="mx-auto flex h-18 max-w-[1160px] items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#" aria-label="마이링크 홈" className="flex items-center gap-2 text-lg font-bold tracking-tight"><span className="flex size-8 items-center justify-center rounded-[11px] bg-[#3182F6] text-white"><Link2 aria-hidden="true" className="size-5" /></span>마이링크</a>
        <div className="flex items-center gap-6"><a href="#how-it-works" className="hidden text-sm font-medium text-[#6B7684] hover:text-[#191F28] sm:block">어떻게 사용하나요?</a><Button variant="ghost" onClick={onLogin} disabled={disabled} className="h-10 rounded-[12px] bg-[#E8F3FF] px-4 font-semibold text-[#1B64CE] hover:bg-[#D9E9FF]">{busy ? "연결 중…" : "Google로 시작하기"}</Button></div>
      </nav>
    </header>
    <main>
      {error && <div role="alert" className="mx-auto mt-5 max-w-[1096px] rounded-[16px] border border-[#F04452]/20 bg-white p-4 text-sm text-[#F04452]">{error}</div>}
      <section aria-labelledby="hero-title" className="mx-auto grid max-w-[1160px] items-center gap-12 px-5 pt-12 pb-16 sm:px-8 sm:pt-18 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pt-20 lg:pb-24">
        <div>
          <Badge variant="secondary" className="mb-6 gap-1.5 rounded-full bg-[#E8F3FF] px-3 py-1.5 text-xs font-semibold text-[#1B64CE]"><Sparkles aria-hidden="true" className="size-3.5" />흩어진 나를, 하나의 링크로</Badge>
          <h1 id="hero-title" className="text-[40px] leading-[1.22] font-bold tracking-[-0.045em] sm:text-[56px] lg:text-[64px]">링크는 여러 개.<br />나를 소개하는 곳은<br /><span className="text-[#3182F6]">딱 하나.</span></h1>
          <p className="mt-6 max-w-[390px] text-base leading-7 break-keep text-[#6B7684] sm:text-lg sm:leading-8">포트폴리오부터 블로그, 나의 작은 프로젝트까지.<br className="hidden sm:block" /> 당신의 모든 연결을 마이링크에 담아보세요.</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">{startButton("내 마이링크 만들기")}<a href="#preview" className="inline-flex min-h-12 items-center gap-2 text-sm font-semibold text-[#4E5968] hover:text-[#3182F6]">예시 구경하기<ArrowDown aria-hidden="true" className="size-4" /></a></div>
          <p className="mt-4 text-xs text-[#8B95A1]">Google 계정으로 시작해요. 복잡한 설정 없이.</p>
        </div>
        <div className="rounded-[36px] bg-[#EEF3F9] px-4 py-7 sm:px-7 sm:py-8"><ProfilePreview /></div>
      </section>
      <section aria-labelledby="features-title" className="border-y border-[#E5E8EB]/70 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1160px] px-5 sm:px-8">
          <p className="text-sm font-semibold text-[#3182F6]">작지만, 필요한 건 모두</p><h2 id="features-title" className="mt-3 text-[28px] leading-snug font-bold tracking-tight sm:text-4xl">소개는 가볍게.<br className="sm:hidden" /> 연결은 더 넓게.</h2>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {[
              { icon: Link2, color: "bg-[#E8F3FF] text-[#1B64CE]", title: "여기저기 흩어진 링크, 한곳에", text: "링크를 더하고, 고치고, 정리하세요. 나의 관심사와 작업을 카드에 차곡차곡 담을 수 있어요.", tag: "링크 추가 · 수정 · 삭제" },
              { icon: Globe, color: "bg-[#E8F5E9] text-[#237A48]", title: "이름을 담은 나만의 페이지", text: "닉네임과 소개글로 나다운 첫인상을 만들어요. 공유받은 사람은 로그인 없이 둘러볼 수 있어요.", tag: "나만의 공개 프로필" },
              { icon: ChartNoAxesCombined, color: "bg-[#FFF3D6] text-[#926019]", title: "어떤 링크에 관심이 모일까?", text: "링크별 클릭수와 전체 클릭수를 확인해보세요. 통계 화면은 로그인한 나에게만 보여요.", tag: "한눈에 보는 클릭 통계" },
            ].map(({ icon: Icon, color, title, text, tag }) => <Card key={title} className="gap-0 rounded-[24px] bg-[#F9FAFB] py-0 shadow-none ring-0"><CardContent className="p-6 sm:p-7"><span className={`mb-6 flex size-12 items-center justify-center rounded-[16px] ${color}`}><Icon aria-hidden="true" className="size-6" /></span><h3 className="text-lg font-bold tracking-tight">{title}</h3><p className="mt-3 text-sm leading-6 text-[#6B7684]">{text}</p><p className="mt-6 text-xs font-semibold text-[#4E5968]">{tag}</p></CardContent></Card>)}
          </div>
        </div>
      </section>
      <section id="how-it-works" aria-labelledby="steps-title" className="mx-auto max-w-[1160px] scroll-mt-20 px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#3182F6]"><MousePointer2 aria-hidden="true" className="size-4" />시작은 간단해요</div><h2 id="steps-title" className="mt-3 text-[28px] font-bold tracking-tight sm:text-4xl">나를 연결하는 세 걸음</h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-3">{[{ title: "Google로 로그인", text: "쓰던 Google 계정으로 시작하세요." }, { title: "나를 담은 링크 추가", text: "닉네임, 소개글, 보여주고 싶은 링크를 채워요." }, { title: "내 페이지 주소 공유", text: "프로필에, 명함에, 메시지에. 어디든 연결해요." }].map((step, index) => <li key={step.title} className="flex gap-4"><span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#D1D6DB] bg-white text-sm font-bold text-[#3182F6]">0{index + 1}</span><div><h3 className="text-base font-bold">{step.title}</h3><p className="mt-2 text-sm leading-6 text-[#6B7684]">{step.text}</p></div></li>)}</ol>
      </section>
      <section aria-labelledby="start-title" className="mx-auto max-w-[1160px] px-5 pb-16 sm:px-8 sm:pb-20"><div className="flex flex-col items-start justify-between gap-7 rounded-[28px] bg-[#E8F3FF] p-7 sm:p-10 md:flex-row md:items-center"><div><h2 id="start-title" className="text-2xl leading-snug font-bold tracking-tight sm:text-3xl">당신의 다음 연결,<br />여기서 시작해볼까요?</h2><p className="mt-3 text-sm leading-6 text-[#4E5968]">나를 보여주는 가장 간단한 방법, 마이링크.</p></div>{startButton("Google로 시작하기")}</div></section>
    </main>
    <footer className="border-t border-[#E5E8EB] px-5 py-7"><div className="mx-auto flex max-w-[1096px] flex-wrap items-center justify-between gap-3 text-xs text-[#8B95A1]"><span className="font-semibold text-[#4E5968]">마이링크 · 나를 잇는 하나의 링크</span><span>© {new Date().getFullYear()} My Link</span></div></footer>
  </div>;
}
