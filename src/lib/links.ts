import { addDoc, collection, doc, getDocFromServer, getDocsFromServer, getFirestore, orderBy, query, serverTimestamp, Timestamp, updateDoc, writeBatch } from "firebase/firestore";
import type { LinkCardItem } from "@/data/profile";
import { getFirebaseAuth } from "@/lib/auth";
import { getFirebaseApp } from "@/lib/firebase";
import { linkSchema, type LinkFormValues } from "@/lib/link-schema";

function linksCollection(uid: string) {
  if (!uid || getFirebaseAuth().currentUser?.uid !== uid) throw new Error("로그인이 필요해요.");
  return collection(getFirestore(getFirebaseApp()), "users", uid, "links");
}

export async function loadLinks(uid: string): Promise<LinkCardItem[]> {
  const snapshot = await getDocsFromServer(query(linksCollection(uid), orderBy("createdAt", "desc")));
  return snapshot.docs.map((document) => ({
    ...linkSchema.parse(document.data()),
    ...(typeof document.data().image === "string" && /^https:\/\//.test(document.data().image) ? { image: document.data().image } : {}),
    id: document.id,
    ...(document.data().updatedAt instanceof Timestamp ? { updatedAt: document.data().updatedAt.toMillis() } : {}),
  }));
}

export async function loadLinkCounts(uid: string): Promise<Record<string, number>> {
  linksCollection(uid); // Enforce the same account boundary as the links query.
  const snapshot = await getDocsFromServer(collection(getFirestore(getFirebaseApp()), "users", uid, "linkClicks"));
  return Object.fromEntries(snapshot.docs.map((document) => {
    const value = document.data().clickCount;
    return [document.id, Number.isSafeInteger(value) && value >= 0 ? value : 0];
  }));
}

export async function saveLink(uid: string, input: LinkFormValues): Promise<LinkCardItem> {
  const values = linkSchema.parse(input);
  const link = { ...values, url: new URL(values.url).href };
  const document = await addDoc(linksCollection(uid), { ...link, createdAt: serverTimestamp() });
  return { ...link, id: document.id };
}

export async function updateLink(uid: string, id: string, input: LinkFormValues): Promise<LinkCardItem> {
  const values = linkSchema.parse(input);
  const link = { ...values, url: new URL(values.url).href };
  const reference = doc(linksCollection(uid), id);
  await updateDoc(reference, { ...link, updatedAt: serverTimestamp() });
  const saved = await getDocFromServer(reference);
  const updatedAt = saved.get("updatedAt");
  return { ...link, id, ...(updatedAt instanceof Timestamp ? { updatedAt: updatedAt.toMillis() } : {}) };
}

export async function deleteLink(uid: string, id: string): Promise<void> {
  const reference = doc(linksCollection(uid), id);
  const db = getFirestore(getFirebaseApp());
  const batch = writeBatch(db);
  batch.delete(reference);
  batch.delete(doc(db, "users", uid, "linkClicks", id));
  await batch.commit();
}
