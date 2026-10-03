import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProfileData, profileData as initialProfileData } from "@/data/profile";

interface ProfileStore {
  profile: ProfileData;
  setProfile: (profile: ProfileData) => void;
  updateProfile: (updates: Partial<ProfileData>) => void;
  resetProfile: () => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: initialProfileData,
      setProfile: (profile) => set({ profile }),
      updateProfile: (updates) =>
        set((state) => ({
          profile: {
            ...state.profile,
            ...updates,
          },
        })),
      resetProfile: () => set({ profile: initialProfileData }),
    }),
    {
      name: "mylink_profile_data", // localStorage key
    }
  )
);
