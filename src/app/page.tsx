"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProfileAvatar from "@/components/ProfileAvatar";
import type { User } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { LoaderCircle, LogIn, LogOut, Link as LinkIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { logOut, signInWithGoogle } from "@/lib/auth";
import { useUserData } from "@/hooks/useUserData";
import { type UserProfile } from "@/lib/user-profile";
import LinkList from "@/components/LinkList";
import AddLinkDialog from "@/components/AddLinkDialog";
import ProfileMenu from "@/components/ProfileMenu";
import EditProfileDialog from "@/components/EditProfileDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProfileSummary { uid: string; profile: UserProfile | null; linkCount: number | null }

function UserWorkspace({ user, onSummaryChange, editRequest }: { user: User; onSummaryChange: (summary: ProfileSummary) => void; editRequest: number }) {
  const { linksQuery, profileQuery, countsQuery, add, update, remove } = useUserData(user);
  const links = (linksQuery.data ?? []).map((link) => ({ ...link, clickCount: Math.max(link.clickCount ?? 0, countsQuery.data?.[link.id] ?? 0) }));
  const profile = profileQuery.data ?? null;
  const loading = linksQuery.isPending || profileQuery.isPending;
  const saving = add.isPending || update.isPending || remove.isPending;
  const error = linksQuery.isError || profileQuery.isError ? "내 정보를 불러오지 못했어요. 연결 상태와 Firestore 접근 권한을 확인하고 다시 시도해 주세요." : "";
  const [editingProfile, setEditingProfile] = useState(false);

  useEffect(() => { if (editRequest) setEditingProfile(true); }, [editRequest]);

  useEffect(() => {
    onSummaryChange({ uid: user.uid, profile, linkCount: loading || error ? null : links.length });
  }, [user.uid, profile, loading, error, links.length, onSummaryChange]);

  const name = profile?.displayName ?? (user.email?.split("@")[0] || "마이링크 사용자");
  const email = profile?.email ?? user.email ?? "";
  const photo = profile?.photoURL ?? user.photoURL ?? "";

  return (
    <>
      <Card className="rounded-[24px] border border-[#E5E8EB] bg-white p-0 shadow-none ring-0">
        <CardContent className="flex items-center gap-4 p-6">
          <ProfileAvatar key={photo} name={name} photoURL={photo} size={72} />
          <div className="min-w-0">
            <p className="mb-1 text-xs font-semibold text-[#3182F6]">나의 마이링크</p>
            <h1 className="break-words text-xl font-bold text-[#191F28]">{name}</h1>
            <p className="mt-1 break-all text-sm text-[#6B7684]">{email}</p>
            {profile?.bio && <p className="mt-3 break-words whitespace-pre-wrap text-sm leading-relaxed text-[#4E5968]">{profile.bio}</p>}
          </div>
        </CardContent>
      </Card>
      {profile && <>
        <Button variant="outline" disabled={loading || Boolean(error)} onClick={() => setEditingProfile(true)} className="self-end rounded-[12px] border-[#E5E8EB] bg-white">프로필 수정</Button>
        <EditProfileDialog uid={user.uid} profile={profile} open={editingProfile} onOpenChange={setEditingProfile} />
      </>}
      {error && <div role="alert" className="space-y-2 text-sm text-[#F04452]"><p>{error}</p><Button variant="outline" onClick={() => { void linksQuery.refetch(); void profileQuery.refetch(); }}>다시 불러오기</Button></div>}
      <LinkList
        clickCountsStatus={countsQuery.isError ? "error" : countsQuery.isPending ? "loading" : undefined}
        ownerUid={user.uid}
        title="내 링크"
        links={links}
        isLoading={linksQuery.isFetching || profileQuery.isFetching || saving}
        showSkeleton={linksQuery.isPending}
        action={<AddLinkDialog onAdd={async (values) => { await add.mutateAsync(values); }} disabled={loading || Boolean(error)} />}
        onUpdate={async (id, values) => { await update.mutateAsync({ id, values }); }}
        onDelete={async (id) => { await remove.mutateAsync(id); }}
      />
      {countsQuery.isError && <div role="status" className="space-y-2 text-sm text-[#6B7684]"><p>링크는 불러왔지만 클릭수 조회 권한이 없거나 연결이 원활하지 않아요. Firebase 콘솔에 최신 firestore.rules를 게시했는지 확인해주세요.</p><Button variant="outline" disabled={countsQuery.isFetching} onClick={() => { void countsQuery.refetch(); }}>클릭수 다시 불러오기</Button></div>}
      {!loading && !error && links.length === 0 && <Card className="rounded-[20px] bg-white p-6 text-center shadow-none ring-0"><LinkIcon aria-hidden="true" className="mx-auto mb-3 size-7 text-[#3182F6]" /><h2 className="font-semibold">아직 등록한 링크가 없어요</h2><p className="mt-2 text-sm leading-relaxed text-[#6B7684]">새 링크 추가 버튼으로 나만의 링크 목록을 만들어 보세요.</p></Card>}
    </>
  );
}

export default function Home() {
  const { user, loading, error: authError } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState<ProfileSummary | null>(null);
  const [editRequest, setEditRequest] = useState<{ uid: string; sequence: number } | null>(null);

  async function authenticate() {
    setBusy(true);
    setError("");
    try { if (user) await logOut(); else await signInWithGoogle(); }
    catch (cause) {
      const code = cause instanceof FirebaseError ? cause.code : "";
      if (code !== "auth/popup-closed-by-user" && code !== "auth/cancelled-popup-request") {
        setError(code === "auth/popup-blocked" ? "로그인 팝업이 차단됐어요. 팝업을 허용한 뒤 다시 시도해 주세요." : code === "auth/operation-not-allowed" || code === "auth/configuration-not-found" ? "Google 로그인이 설정되지 않았어요. Firebase Authentication의 Google 제공업체를 활성화해 주세요." : code === "auth/unauthorized-domain" ? "로그인 허용 도메인이 아니에요. Firebase Authentication의 승인된 도메인에 현재 도메인을 추가해 주세요." : "로그인 상태를 변경하지 못했어요. 연결 상태를 확인하고 다시 시도해 주세요.");
      }
    } finally { setBusy(false); }
  }

  const pageHref = user && summary?.uid === user.uid && summary.profile ? `/${encodeURIComponent(summary.profile.displayName)}` : undefined;

  const loginButton = (header = false) => (
    <Button onClick={authenticate} disabled={busy || loading || Boolean(authError)} className={`${header ? "h-10 rounded-[12px] text-sm" : "h-12 w-full rounded-[14px]"} bg-[#3182F6] font-semibold text-white hover:bg-[#1B64CE]`}>
      {busy ? <LoaderCircle aria-hidden="true" className="size-4 motion-safe:animate-spin" /> : user ? <LogOut aria-hidden="true" /> : <LogIn aria-hidden="true" />}
      {busy ? "처리 중…" : user ? "로그아웃" : "Google로 로그인"}
    </Button>
  );

  return (
    <div className="min-h-screen bg-[#F2F4F6] text-[#191F28]">
      <header className="sticky top-0 z-30 mx-auto flex h-16 w-full max-w-[460px] items-center justify-between gap-3 bg-[#F2F4F6]/95 px-5 backdrop-blur-md">
        <Link href="/" className="shrink-0 text-[17px] font-bold tracking-tight">마이링크</Link>
        {pageHref && <Link href={pageHref} className="ml-auto shrink-0 text-sm font-semibold text-[#3182F6]">내 페이지</Link>}
        {user ? <ProfileMenu
          key={user.uid}
          pageHref={pageHref}
          profile={summary?.uid === user.uid && summary.profile ? summary.profile : { displayName: user.email?.split("@")[0] || "마이링크 사용자", email: user.email ?? "", photoURL: user.photoURL ?? "", bio: "" }}
          linkCount={summary?.uid === user.uid ? summary.linkCount : null}
          busy={busy}
          onLogout={authenticate}
          canEdit={summary?.uid === user.uid && Boolean(summary.profile)}
          onEdit={() => setEditRequest((current) => ({ uid: user.uid, sequence: current?.uid === user.uid ? current.sequence + 1 : 1 }))}
        /> : loginButton(true)}
      </header>
      <main className="mx-auto flex w-full max-w-[460px] flex-col gap-4 px-4 pt-2 pb-12 sm:px-5">
        {(authError || error) && <p role="alert" className="rounded-[14px] bg-white p-4 text-sm text-[#F04452]">{authError || error}</p>}
        {loading ? <div role="status" className="flex items-center justify-center gap-2 py-20 text-sm text-[#6B7684]"><LoaderCircle aria-hidden="true" className="size-5 motion-safe:animate-spin" />로그인 상태를 확인하고 있어요…</div> : user ? <UserWorkspace key={user.uid} user={user} onSummaryChange={setSummary} editRequest={editRequest?.uid === user.uid ? editRequest.sequence : 0} /> : (
          <Card className="rounded-[24px] border border-[#E5E8EB] bg-white p-0 shadow-none ring-0">
            <CardContent className="flex flex-col gap-5 p-7">
              <span className="flex size-14 items-center justify-center rounded-[18px] bg-[#E8F3FF] text-[#3182F6]"><LinkIcon aria-hidden="true" className="size-7" /></span>
              <h1 className="text-2xl leading-snug font-bold tracking-tight">나만의 링크를<br />한곳에 모아 보세요</h1>
              <p className="text-[15px] leading-relaxed text-[#4E5968]">Google 계정으로 로그인한 후 링크를 추가하고 수정·삭제할 수 있어요. 로그인하면 내 프로필과 계정에 저장된 링크가 표시돼요.</p>
              {loginButton()}
            </CardContent>
          </Card>
        )}
        <footer className="pt-6 text-center text-xs text-[#8B95A1]">© {new Date().getFullYear()} My Link</footer>
      </main>
    </div>
  );
}
