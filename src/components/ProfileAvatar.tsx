"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProfileAvatar({ name, photoURL, size = 32 }: { name: string; photoURL: string; size?: 32 | 40 | 72 }) {
  const [failed, setFailed] = useState(false);
  const allowed = /^https:\/\/lh[0-9]+\.googleusercontent\.com\//.test(photoURL);
  const shape = size === 72 ? "size-[72px] rounded-[22px] text-2xl" : size === 40 ? "size-10 rounded-full" : "size-8 rounded-full";
  return allowed && !failed ? (
    <Image src={photoURL} alt={`${name} 프로필`} width={size} height={size} unoptimized referrerPolicy="no-referrer" onError={() => setFailed(true)} className={`${shape} shrink-0 object-cover`} />
  ) : (
    <span aria-label={`${name} 프로필`} className={`${shape} flex shrink-0 items-center justify-center bg-[#E8F3FF] font-semibold text-[#3182F6]`}>{name.slice(0, 1)}</span>
  );
}
