"use client";

import type { User } from "firebase/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { LinkCardItem } from "@/data/profile";
import { getFirebaseAuth } from "@/lib/auth";
import { deleteLink, loadLinks, loadLinkCounts, saveLink, updateLink } from "@/lib/links";
import type { LinkFormValues } from "@/lib/link-schema";
import { userKeys } from "@/lib/query-keys";
import { loadUserProfile } from "@/lib/user-profile";

export function useUserData(user: User) {
  const uid = user.uid;
  const client = useQueryClient();
  const linksKey = userKeys.links(uid);
  const stillSignedIn = () => getFirebaseAuth().currentUser?.uid === uid;
  const linksQuery = useQuery({ queryKey: linksKey, queryFn: async ({ signal }) => {
    const links = await loadLinks(uid); signal.throwIfAborted(); return links;
  } });
  const profileQuery = useQuery({ queryKey: userKeys.profile(uid), queryFn: async ({ signal }) => {
    const profile = await loadUserProfile(user); signal.throwIfAborted(); return profile;
  } });
  const countsQuery = useQuery({ queryKey: userKeys.linkCounts(uid), retry: false, queryFn: async ({ signal }) => {
    const counts = await loadLinkCounts(uid); signal.throwIfAborted(); return counts;
  } });
  const beforeChange = () => client.cancelQueries({ queryKey: linksKey });
  const refresh = () => {
    if (stillSignedIn()) void client.invalidateQueries({ queryKey: linksKey });
  };
  const add = useMutation({
    mutationKey: [...userKeys.all(uid), "add-link"],
    mutationFn: (values: LinkFormValues) => saveLink(uid, values),
    onMutate: beforeChange,
    onSuccess: (saved) => {
      if (!stillSignedIn()) return;
      client.setQueryData<LinkCardItem[]>(linksKey, (current = []) => [saved, ...current.filter((link) => link.id !== saved.id)]);
      refresh();
    },
  });
  const update = useMutation({
    mutationKey: [...userKeys.all(uid), "update-link"],
    mutationFn: ({ id, values }: { id: string; values: LinkFormValues }) => updateLink(uid, id, values),
    onMutate: beforeChange,
    onSuccess: (saved) => {
      if (!stillSignedIn()) return;
      client.setQueryData<LinkCardItem[]>(linksKey, (current = []) => current.map((link) => link.id === saved.id ? { ...link, ...saved } : link));
      refresh();
    },
  });
  const remove = useMutation({
    mutationKey: [...userKeys.all(uid), "delete-link"],
    mutationFn: (id: string) => deleteLink(uid, id).then(() => id),
    onMutate: beforeChange,
    onSuccess: (id) => {
      if (!stillSignedIn()) return;
      client.setQueryData<LinkCardItem[]>(linksKey, (current = []) => current.filter((link) => link.id !== id));
      refresh();
    },
  });
  return { linksQuery, profileQuery, countsQuery, add, update, remove };
}
