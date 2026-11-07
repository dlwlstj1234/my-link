import { addDoc, collection, deleteDoc, doc, getDocFromServer, getDocsFromServer, getFirestore, orderBy, query, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import type { LinkCardItem } from "@/data/profile";
import { getFirebaseApp } from "@/lib/firebase";
import { linkSchema, type LinkFormValues } from "@/lib/link-schema";

function linksCollection() {
  return collection(getFirestore(getFirebaseApp()), "users", "anonymous", "links");
}

export async function loadLinks(): Promise<LinkCardItem[]> {
  const snapshot = await getDocsFromServer(query(linksCollection(), orderBy("createdAt", "desc")));
  return snapshot.docs.map((document) => ({
    ...linkSchema.parse(document.data()),
    ...(typeof document.data().image === "string" && /^https:\/\//.test(document.data().image) ? { image: document.data().image } : {}),
    id: document.id,
    ...(document.data().updatedAt instanceof Timestamp ? { updatedAt: document.data().updatedAt.toMillis() } : {}),
  }));
}

export async function saveLink(input: LinkFormValues): Promise<LinkCardItem> {
  const values = linkSchema.parse(input);
  const link = { ...values, url: new URL(values.url).href };
  const document = await addDoc(linksCollection(), { ...link, createdAt: serverTimestamp() });
  return { ...link, id: document.id };
}

export async function updateLink(id: string, input: LinkFormValues): Promise<LinkCardItem> {
  const values = linkSchema.parse(input);
  const link = { ...values, url: new URL(values.url).href };
  const reference = doc(linksCollection(), id);
  await updateDoc(reference, { ...link, updatedAt: serverTimestamp() });
  const saved = await getDocFromServer(reference);
  const updatedAt = saved.get("updatedAt");
  return { ...link, id, ...(updatedAt instanceof Timestamp ? { updatedAt: updatedAt.toMillis() } : {}) };
}

export async function deleteLink(id: string): Promise<void> {
  await deleteDoc(doc(linksCollection(), id));
}
