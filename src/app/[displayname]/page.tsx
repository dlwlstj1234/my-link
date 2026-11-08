import Link from "next/link";
import { notFound } from "next/navigation";
import ProfileAvatar from "@/components/ProfileAvatar";
import LinkList from "@/components/LinkList";
import { Card, CardContent } from "@/components/ui/card";
import { loadPublicPage } from "@/lib/public-page";

export const dynamic = "force-dynamic";

export default async function PublicPage({ params }: { params: Promise<{ displayname: string }> }) {
  const { displayname } = await params;
  const page = await loadPublicPage(displayname);
  if (!page) notFound();
  const { profile, links } = page;

  return (
    <div className="min-h-screen bg-[#F2F4F6] text-[#191F28]">
      <header className="mx-auto flex h-16 w-full max-w-[460px] items-center justify-between gap-3 px-5">
        <Link href="/" className="text-[17px] font-bold tracking-tight">마이링크</Link>
        <Link href="/" className="text-sm font-semibold text-[#3182F6]">내 링크 관리</Link>
      </header>
      <main className="mx-auto flex w-full max-w-[460px] flex-col gap-4 px-4 pt-2 pb-12 sm:px-5">
        <Card className="rounded-[24px] border border-[#E5E8EB] bg-white p-0 shadow-none ring-0">
          <CardContent className="flex items-center gap-4 p-6">
            <ProfileAvatar name={profile.displayName} photoURL={profile.photoURL} size={72} />
            <div className="min-w-0">
              <h1 className="break-words text-xl font-bold">{profile.displayName}</h1>
              {profile.bio && <p className="mt-3 break-words whitespace-pre-wrap text-sm leading-relaxed text-[#4E5968]">{profile.bio}</p>}
            </div>
          </CardContent>
        </Card>
        <LinkList title="링크" links={links} />
        {links.length === 0 && <p className="py-8 text-center text-sm text-[#6B7684]">아직 등록한 링크가 없어요.</p>}
      </main>
    </div>
  );
}
