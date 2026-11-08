import { createOgImage } from "@/lib/og-image";

export const alt = "마이링크 — 흩어진 나를, 하나의 링크로";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() { return createOgImage(); }
