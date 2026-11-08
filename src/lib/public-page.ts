import { collection, doc, getDocFromServer, getDocsFromServer, getFirestore, orderBy, query, Timestamp } from "firebase/firestore";
import { getFirebaseApp } from "@/lib/firebase";
import { displayNameKey, displayNameSchema } from "@/lib/display-name";
import { linkSchema } from "@/lib/link-schema";
import type { LinkCardItem } from "@/data/profile";

export async function loadPublicProfile(name: string) {
  if (!displayNameSchema.safeParse(name).success) return null;
  const db = getFirestore(getFirebaseApp());
  const reservation = await getDocFromServer(doc(db, "displayNames", displayNameKey(name)));
  if (!reservation.exists()) return null;
  const uid = reservation.get("uid");
  if (typeof uid !== "string" || !uid || uid.includes("/")) return null;
  const snapshot = await getDocFromServer(doc(db, "publicProfiles", uid));
  if (!snapshot.exists()) return null;
  const data = snapshot.data();
  if (typeof data.displayName !== "string" || displayNameKey(data.displayName) !== displayNameKey(name)) return null;
  const profile = {
    displayName: data.displayName,
    photoURL: typeof data.photoURL === "string" ? data.photoURL : "",
    bio: typeof data.bio === "string" ? data.bio : "",
  };
  return { uid, profile };
}

export async function loadPublicPage(name: string) {
  const result = await loadPublicProfile(name);
  if (!result) return null;
  const { uid, profile } = result;
  const db = getFirestore(getFirebaseApp());
  const linksSnapshot = await getDocsFromServer(query(collection(db, "users", uid, "links"), orderBy("createdAt", "desc")));
  const links: LinkCardItem[] = linksSnapshot.docs.map((document) => {
    const link = document.data();
    return {
      ...linkSchema.parse(link),
      id: document.id,
      ...(typeof link.image === "string" && /^https:\/\//.test(link.image) ? { image: link.image } : {}),
      ...(link.updatedAt instanceof Timestamp ? { updatedAt: link.updatedAt.toMillis() } : {}),
    };
  });
  return { uid, profile, links };
}
