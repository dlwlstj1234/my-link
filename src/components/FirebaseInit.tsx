"use client";

import { useEffect } from "react";
import { getFirebaseAnalytics, getFirebaseApp } from "@/lib/firebase";

export default function FirebaseInit() {
  useEffect(() => {
    try {
      getFirebaseApp();
    } catch (error) {
      console.error("Firebase 초기화에 실패했어요.", error);
      return;
    }
    void getFirebaseAnalytics().catch((error: unknown) => {
      console.warn("Firebase Analytics를 초기화하지 못했어요.", error);
    });
  }, []);

  return null;
}
