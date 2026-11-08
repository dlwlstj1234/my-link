"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle, RefreshCw } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useAuth } from "@/hooks/useAuth";
import { loadLinks, loadLinkCounts } from "@/lib/links";
import { userKeys } from "@/lib/query-keys";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const chartConfig = { clicks: { label: "클릭수", color: "#3182F6" } } satisfies ChartConfig;
const formatCount = (count: number) => count.toLocaleString("ko-KR");

function UserStats({ uid }: { uid: string }) {
  const linksQuery = useQuery({ queryKey: userKeys.links(uid), queryFn: async ({ signal }) => {
    const links = await loadLinks(uid); signal.throwIfAborted(); return links;
  } });
  const countsQuery = useQuery({ queryKey: userKeys.linkCounts(uid), retry: false, queryFn: async ({ signal }) => {
    const counts = await loadLinkCounts(uid); signal.throwIfAborted(); return counts;
  } });
  const loading = linksQuery.isPending || countsQuery.isPending;
  const failed = linksQuery.isError || countsQuery.isError;
  const refreshing = linksQuery.isFetching || countsQuery.isFetching;
  const data = (linksQuery.data ?? []).map((link) => ({ id: link.id, title: link.title, clicks: countsQuery.data?.[link.id] ?? 0 }));
  const total = data.reduce((sum, link) => sum + link.clicks, 0);
  const refresh = () => { void linksQuery.refetch(); void countsQuery.refetch(); };

  return <>
    <div className="flex items-center justify-between gap-3">
      <h1 className="text-2xl font-bold tracking-tight">링크 통계</h1>
      <Button variant="outline" onClick={refresh} disabled={refreshing} className="rounded-[12px] bg-white"><RefreshCw aria-hidden="true" className={`size-4 ${refreshing ? "motion-safe:animate-spin" : ""}`} />새로고침</Button>
    </div>
    {failed ? <Card className="rounded-[24px] bg-white p-6 shadow-none ring-0"><div role="alert" className="space-y-3"><h2 className="font-semibold">통계를 불러오지 못했어요</h2><p className="text-sm leading-relaxed text-[#6B7684]">연결 상태와 Firestore의 linkClicks 조회 권한을 확인해주세요.</p><Button onClick={refresh} disabled={refreshing}>다시 불러오기</Button></div></Card>
    : loading ? <div role="status" className="flex items-center gap-2 rounded-[24px] bg-white p-8 text-sm text-[#6B7684]"><LoaderCircle aria-hidden="true" className="size-4 motion-safe:animate-spin" />통계를 불러오는 중이에요…</div>
    : <>
      <Card className="rounded-[24px] border border-[#E5E8EB] bg-white py-6 shadow-none ring-0">
        <CardContent className="px-6"><h2 className="text-sm font-medium text-[#6B7684]">총 클릭수</h2><p className="mt-2 text-4xl font-bold tabular-nums text-[#3182F6]" aria-live="polite">{formatCount(total)}<span className="ml-1 text-lg font-medium">회</span></p><p className="mt-3 text-xs leading-relaxed text-[#8B95A1]">현재 등록된 모든 링크 {data.length}개의 누적 클릭수 합계예요.</p></CardContent>
      </Card>
      <Card className="rounded-[24px] border border-[#E5E8EB] bg-white py-6 shadow-none ring-0">
        <CardHeader className="px-6"><CardTitle><h2 className="text-lg font-semibold">링크별 클릭수</h2></CardTitle></CardHeader>
        <CardContent className="px-4 sm:px-6">
          {data.length === 0 ? <p className="py-10 text-center text-sm text-[#6B7684]">아직 등록한 링크가 없어요. 링크를 추가하면 통계를 확인할 수 있어요.</p> : <>
            <div className="max-h-[480px] overflow-y-auto">
              <ChartContainer config={chartConfig} className="w-full aspect-auto" style={{ height: Math.max(200, data.length * 48 + 36) }}>
                <BarChart accessibilityLayer data={data} layout="vertical" margin={{ left: 0, right: 12 }}>
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" allowDecimals={false} domain={[0, (max: number) => Math.max(1, max)]} tickLine={false} axisLine={false} />
                  <YAxis type="category" dataKey="id" width={100} tickLine={false} axisLine={false} tickFormatter={(id: string) => { const title = data.find((link) => link.id === id)?.title ?? ""; return title.length > 10 ? `${title.slice(0, 10)}…` : title; }} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent labelFormatter={(_, payload) => payload[0]?.payload?.title ?? ""} />} />
                  <Bar dataKey="clicks" fill="var(--color-clicks)" radius={4} maxBarSize={28} />
                </BarChart>
              </ChartContainer>
            </div>
            <ul className="mt-4 divide-y divide-[#E5E8EB]" aria-label="링크별 클릭수 목록">{data.map((link) => <li key={link.id} className="flex items-center justify-between gap-4 py-3 text-sm"><span className="min-w-0 break-words text-[#4E5968]">{link.title}</span><span className="shrink-0 font-semibold tabular-nums">{formatCount(link.clicks)}회</span></li>)}</ul>
          </>}
        </CardContent>
      </Card>
    </>}
  </>;
}

export default function StatsPage() {
  const { user, loading, error } = useAuth();
  const router = useRouter();
  useEffect(() => { if (!loading && !error && !user) router.replace("/"); }, [loading, error, user, router]);
  return <div className="min-h-screen bg-[#F2F4F6] text-[#191F28]">
    <header className="mx-auto flex h-16 max-w-[640px] items-center justify-between px-5"><Link href="/" className="text-[17px] font-bold">마이링크</Link><Link href="/" className="text-sm font-semibold text-[#3182F6]">내 링크 관리</Link></header>
    <main className="mx-auto flex w-full max-w-[640px] flex-col gap-5 px-4 pt-3 pb-12 sm:px-5">
      {error ? <p role="alert" className="text-sm text-[#F04452]">{error}</p> : loading || !user ? <p role="status" className="text-sm text-[#6B7684]">로그인 상태를 확인하고 있어요…</p> : <UserStats key={user.uid} uid={user.uid} />}
    </main>
  </div>;
}
