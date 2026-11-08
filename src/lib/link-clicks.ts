import { doc, getFirestore, runTransaction } from "firebase/firestore";
import { getFirebaseApp } from "@/lib/firebase";

export async function recordLinkClick(uid: string, id: string): Promise<number> {
  const db = getFirestore(getFirebaseApp());
  const reference = doc(db, "users", uid, "linkClicks", id);
  return runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(reference);
    const current = snapshot.get("clickCount");
    const clickCount = (Number.isSafeInteger(current) && current >= 0 ? current : 0) + 1;
    transaction.set(reference, { clickCount });
    return clickCount;
  });
}
