import type { User } from "firebase/auth";
import { doc, getDocFromServer, getFirestore, runTransaction, serverTimestamp } from "firebase/firestore";
import { getFirebaseApp } from "@/lib/firebase";
import { getFirebaseAuth } from "@/lib/auth";
import { displayNameKey, displayNameSchema, profileSchema } from "@/lib/display-name";

export interface UserProfile {
  displayName: string;
  email: string;
  photoURL: string;
  bio: string;
}

export class DisplayNameTakenError extends Error {
  constructor() { super("이미 사용 중인 표시 이름이에요."); }
}

function requireUser(uid: string) {
  if (getFirebaseAuth().currentUser?.uid !== uid) throw new Error("로그인이 필요해요.");
}

export async function checkDisplayName(uid: string, name: string): Promise<boolean> {
  requireUser(uid);
  const reference = doc(getFirestore(getFirebaseApp()), "displayNames", displayNameKey(name));
  const snapshot = await getDocFromServer(reference);
  return !snapshot.exists() || snapshot.get("uid") === uid;
}

export async function updateUserDisplayName(uid: string, name: string, bio?: string): Promise<string> {
  requireUser(uid);
  const displayName = displayNameSchema.parse(name);
  const key = displayNameKey(displayName);
  const biography = bio === undefined ? undefined : profileSchema.shape.bio.parse(bio);
  const db = getFirestore(getFirebaseApp());
  const profileRef = doc(db, "users", uid);
  await runTransaction(db, async (transaction) => {
    const profile = await transaction.get(profileRef);
    if (!profile.exists()) throw new Error("프로필을 먼저 불러와 주세요.");
    const targetRef = doc(db, "displayNames", key);
    const target = await transaction.get(targetRef);
    if (target.exists() && target.get("uid") !== uid) throw new DisplayNameTakenError();
    const oldKey = profile.get("displayNameKey");
    const oldRef = typeof oldKey === "string" && oldKey !== key ? doc(db, "displayNames", oldKey) : null;
    const old = oldRef ? await transaction.get(oldRef) : null;
    transaction.set(targetRef, { uid });
    transaction.update(profileRef, { displayName, displayNameKey: key, ...(biography !== undefined ? { bio: biography } : {}), updatedAt: serverTimestamp() });
    transaction.set(doc(db, "publicProfiles", uid), {
      displayName,
      photoURL: typeof profile.get("photoURL") === "string" ? profile.get("photoURL") : "",
      bio: biography ?? (typeof profile.get("bio") === "string" ? profile.get("bio") : ""),
    });
    if (oldRef && old?.exists() && old.get("uid") === uid) transaction.delete(oldRef);
  });
  return displayName;
}

export async function loadUserProfile(user: User): Promise<UserProfile> {
  requireUser(user.uid);
  const db = getFirestore(getFirebaseApp());
  const profileRef = doc(db, "users", user.uid);
  // Stable fallback keeps an invalid or already-used email prefix from blocking sign-in.
  const suffix = user.uid.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8) || "user";
  return runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(profileRef);
    const data = snapshot.data();
    const email = user.email ?? (typeof data?.email === "string" ? data.email : "");
    const initial = typeof data?.displayName === "string" ? data.displayName : email.split("@")[0];
    let name = displayNameSchema.safeParse(initial).success ? initial.trim() : `user_${suffix}`;
    let key = displayNameKey(name);
    let reservationRef = doc(db, "displayNames", key);
    let reservation = await transaction.get(reservationRef);
    if (reservation.exists() && reservation.get("uid") !== user.uid) {
      name = `user_${suffix}`;
      key = displayNameKey(name);
      reservationRef = doc(db, "displayNames", key);
      reservation = await transaction.get(reservationRef);
      if (reservation.exists() && reservation.get("uid") !== user.uid) throw new DisplayNameTakenError();
    }
    const profile = { displayName: name, email, photoURL: typeof data?.photoURL === "string" ? data.photoURL : user.photoURL ?? "", bio: typeof data?.bio === "string" ? data.bio : "" };
    transaction.set(doc(db, "publicProfiles", user.uid), { displayName: profile.displayName, photoURL: profile.photoURL, bio: profile.bio });
    if (!reservation.exists()) transaction.set(reservationRef, { uid: user.uid });
    if (!snapshot.exists() || data?.displayNameKey !== key || data?.email !== email || data?.bio !== profile.bio || data?.photoURL !== profile.photoURL) {
      transaction.set(profileRef, { ...profile, displayNameKey: key, ...(snapshot.exists() ? { updatedAt: serverTimestamp() } : { createdAt: serverTimestamp() }) }, { merge: true });
    }
    return profile;
  });
}
