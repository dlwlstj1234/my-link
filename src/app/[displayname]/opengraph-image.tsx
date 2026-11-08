import { createOgImage } from "@/lib/og-image";
import { loadPublicProfile } from "@/lib/public-page";

export const alt = "마이링크 개인 프로필 — 나를 잇는 하나의 링크";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-dynamic";

export default async function Image({ params }: { params: Promise<{ displayname: string }> }) {
  const { displayname } = await params;
  let profile;
  try { profile = (await loadPublicProfile(displayname))?.profile; }
  catch { /* A temporary database error must not break the share image. */ }
  return createOgImage(profile);
}
