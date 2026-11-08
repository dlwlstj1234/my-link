"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getFirebaseAuth } from "@/lib/auth";
import { displayNameKey, type ProfileFormValues } from "@/lib/display-name";
import { userKeys } from "@/lib/query-keys";
import { checkDisplayName, updateUserDisplayName, type UserProfile } from "@/lib/user-profile";

export function useProfileEditor(uid: string) {
  const client = useQueryClient();
  const check = useMutation({
    mutationKey: [...userKeys.all(uid), "check-name"],
    mutationFn: (name: string) => client.fetchQuery({
      queryKey: userKeys.displayName(uid, displayNameKey(name)),
      queryFn: async ({ signal }) => { const available = await checkDisplayName(uid, name); signal.throwIfAborted(); return available; },
      staleTime: 0, gcTime: 0, retry: false,
    }),
  });
  const save = useMutation({
    mutationKey: [...userKeys.all(uid), "edit-profile"],
    mutationFn: async (values: ProfileFormValues) => {
      const displayName = await updateUserDisplayName(uid, values.displayName, values.bio);
      return { displayName, bio: values.bio.trim() };
    },
    onMutate: () => client.cancelQueries({ queryKey: userKeys.profile(uid) }),
    onSuccess: (saved) => {
      if (getFirebaseAuth().currentUser?.uid !== uid) return;
      client.setQueryData<UserProfile>(userKeys.profile(uid), (profile) => profile ? { ...profile, ...saved } : undefined);
      void client.invalidateQueries({ queryKey: userKeys.profile(uid) });
    },
  });
  return { check, save };
}
