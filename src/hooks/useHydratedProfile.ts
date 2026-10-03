"use client";

import { useEffect, useState } from "react";
import { useProfileStore } from "@/store/useProfileStore";
import { profileData as fallbackData } from "@/data/profile";

export function useHydratedProfile() {
  const profile = useProfileStore((state) => state.profile);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return {
    profile: hydrated ? profile : fallbackData,
    isHydrated: hydrated,
  };
}
