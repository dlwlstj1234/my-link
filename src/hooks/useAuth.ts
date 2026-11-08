"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/auth";
import { useQueryClient } from "@tanstack/react-query";
import { clearUserCache } from "@/lib/clear-user-cache";

export function useAuth() {
  const client = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let previousUid: string | undefined;
    try {
      return onAuthStateChanged(getFirebaseAuth(), (nextUser) => {
        if (previousUid && previousUid !== nextUser?.uid) {
          clearUserCache(client, previousUid);
        }
        previousUid = nextUser?.uid;
        setUser(nextUser);
        setLoading(false);
      }, () => {
        setError("로그인 상태를 확인하지 못했어요. 페이지를 새로고침해 주세요.");
        setLoading(false);
      });
    } catch {
      setError("로그인 설정을 확인하지 못했어요. Firebase 설정을 확인해 주세요.");
      setLoading(false);
    }
  }, [client]);
  return { user, loading, error };
}
