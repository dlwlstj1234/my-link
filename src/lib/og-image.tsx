import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const ogSize = { width: 1200, height: 630 };
let font: Promise<Buffer> | undefined;

export async function createOgImage(profile?: { displayName: string; bio: string }) {
  font ??= readFile(path.join(process.cwd(), "src/assets/fonts/Pretendard-Bold.woff"));
  const fontData = await font;
  const name = profile?.displayName ?? "마이링크";
  const bio = profile?.bio.trim().replace(/\s+/g, " ") || "나의 관심사와 작업, 모든 연결을 한곳에.";
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#F2F4F6", fontFamily: "Pretendard", color: "#191F28", padding: 48, position: "relative" }}>
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: "white", borderRadius: 36, padding: "38px 44px", border: "1px solid #E5E8EB" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}><div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, background: "#3182F6", color: "white", borderRadius: 13, fontSize: 30 }}>↗</div><span style={{ fontSize: 24 }}>마이링크</span><span style={{ marginLeft: "auto", fontSize: 15, color: "#8B95A1" }}>나를 잇는 하나의 링크</span></div>
        <div style={{ display: "flex", flex: 1, alignItems: "center", gap: 36 }}>
          <div style={{ display: "flex", flexDirection: "column", width: 610 }}>
            <div style={{ display: "flex", color: "#1B64CE", fontSize: 19, marginBottom: 18 }}>{profile ? "반가워요, 여기는 나의 마이링크" : "흩어진 나를, 하나의 링크로"}</div>
            {profile ? <div style={{ display: "flex", flexDirection: "column", fontSize: name.length > 14 ? 46 : name.length > 9 ? 54 : 68, lineHeight: 1.2, letterSpacing: -2 }}><span style={{ color: "#3182F6", wordBreak: "break-all" }}>{name}</span><span>님의 모든 연결.</span></div>
              : <div style={{ display: "flex", flexDirection: "column", fontSize: 56, lineHeight: 1.2, letterSpacing: -2 }}><span>링크는 여러 개.</span><span style={{ fontSize: 46 }}>나를 소개하는 곳은</span><span style={{ color: "#3182F6" }}>딱 하나.</span></div>}
            <div style={{ display: "flex", marginTop: 24, fontSize: 23, lineHeight: 1.5, color: "#6B7684", wordBreak: "break-all" }}>{profile ? bio.length > 65 ? `${bio.slice(0, 65)}…` : bio : "나의 작업부터 일상까지, 한 페이지에 담아보세요."}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 300, background: "#EEF3F9", borderRadius: 28, padding: "24px 20px", transform: "rotate(3deg)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 72, height: 72, borderRadius: 23, background: "#3182F6", color: "white", fontSize: 36 }}>{profile ? Array.from(name)[0].toUpperCase() : "M"}</div>
            <div style={{ display: "flex", fontSize: 17, marginTop: 14, marginBottom: 18, color: "#4E5968" }}>{profile ? `@${name.length > 12 ? `${name.slice(0, 12)}…` : name}` : "MY LINK"}</div>
            {["나의 프로젝트", "이야기와 기록", "함께 연결되기"].map((label, index) => <div key={label} style={{ display: "flex", alignItems: "center", width: "100%", background: "white", borderRadius: 13, padding: "13px 12px", marginTop: 8, gap: 10, fontSize: 16 }}><span style={{ display: "flex", width: 27, height: 27, borderRadius: 8, background: ["#E8F3FF", "#E8F5E9", "#FFF3D6"][index], alignItems: "center", justifyContent: "center", color: "#3182F6" }}>{["↗", "+", "↗"][index]}</span><span>{label}</span><span style={{ marginLeft: "auto", color: "#B0B8C1" }}>↗</span></div>)}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 15, color: "#8B95A1" }}><span>MY LINK · YOUR NEXT CONNECTION</span><span style={{ color: "#3182F6" }}>{profile ? "나의 페이지 구경하기 ↗" : "나만의 마이링크 만들기 ↗"}</span></div>
      </div>
    </div>,
    { ...ogSize, fonts: [{ name: "Pretendard", data: fontData, weight: 700, style: "normal" }] },
  );
}
