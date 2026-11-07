import { addDoc, collection, getDocsFromServer, getFirestore, orderBy, query, serverTimestamp } from "firebase/firestore";
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
    id: document.id,
  }));
}

export async function saveLink(input: LinkFormValues): Promise<LinkCardItem> {
  const values = linkSchema.parse(input);
  const link = { ...values, url: new URL(values.url).href };
  const document = await addDoc(linksCollection(), { ...link, createdAt: serverTimestamp() });
  return { ...link, id: document.id };
}
