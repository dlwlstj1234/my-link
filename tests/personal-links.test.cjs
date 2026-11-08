const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const Module = require("node:module");

function createEnvironment() {
  const auth = { currentUser: null };
  const records = new Map();
  const requests = [];
  let nextId = 0;
  let transactionQueue = Promise.resolve();
  class Timestamp { toMillis() { return 1000; } }
  const snapshot = (reference) => ({
    id: reference.path.split("/").at(-1),
    exists: () => records.has(reference.path),
    data: () => records.get(reference.path),
    get: (field) => records.get(reference.path)?.[field],
  });
  const firestore = {
    Timestamp, getFirestore: () => ({}), serverTimestamp: () => new Timestamp(),
    collection: (_, ...parts) => ({ path: parts.join("/") }),
    doc: (reference, ...parts) => ({ path: [reference.path, ...parts].filter(Boolean).join("/") }),
    orderBy: () => ({}), query: (reference) => reference,
    getDocsFromServer: async (reference) => {
      requests.push(reference.path);
      return { docs: [...records.keys()].filter((key) => key.startsWith(reference.path + "/")).map((key) => snapshot({ path: key })) };
    },
    addDoc: async (reference, data) => {
      const id = String(++nextId);
      records.set(`${reference.path}/${id}`, data);
      return { id };
    },
    updateDoc: async (reference, data) => {
      if (!records.has(reference.path)) throw new Error("not-found");
      records.set(reference.path, { ...records.get(reference.path), ...data });
    },
    getDocFromServer: async (reference) => snapshot(reference),
    deleteDoc: async (reference) => records.delete(reference.path),
    setDoc: async (reference, data, options) => records.set(reference.path, { ...(options?.merge ? records.get(reference.path) : {}), ...data }),
    runTransaction: (_, callback) => {
      const result = transactionQueue.then(async () => {
        const writes = [];
        const transaction = {
          get: async (reference) => snapshot(reference),
          set: (reference, data, options) => writes.push(() => firestore.setDoc(reference, data, options)),
          update: (reference, data) => writes.push(() => firestore.updateDoc(reference, data)),
          delete: (reference) => writes.push(() => firestore.deleteDoc(reference)),
        };
        const value = await callback(transaction);
        for (const write of writes) await write();
        return value;
      });
      transactionQueue = result.catch(() => {});
      return result;
    },
  };
  const cache = new Map();
  function load(file) {
    const filename = path.resolve(file);
    if (cache.has(filename)) return cache.get(filename).exports;
    const mod = new Module(filename, module);
    mod.filename = filename;
    mod.paths = module.paths;
    const nativeRequire = mod.require.bind(mod);
    mod.require = (name) => {
      if (name === "firebase/firestore") return firestore;
      if (name === "@/lib/firebase") return { getFirebaseApp: () => ({}) };
      if (name === "@/lib/auth") return { getFirebaseAuth: () => auth };
      return name.startsWith("@/") ? load(`src/${name.slice(2)}.ts`) : nativeRequire(name);
    };
    cache.set(filename, mod);
    mod._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 } }).outputText, filename);
    return mod.exports;
  }
  return { auth, records, requests, links: load("src/lib/links.ts"), profiles: load("src/lib/user-profile.ts"), publicPages: load("src/lib/public-page.ts") };
}

const input = { title: "My link", url: "https://example.com", description: "", icon: "Globe", category: "", badge: "" };

test("unauthenticated and mismatched UID access makes no Firestore request", async () => {
  const { auth, links, requests, records } = createEnvironment();
  await assert.rejects(links.loadLinks("alice"));
  auth.currentUser = { uid: "alice" };
  await assert.rejects(links.loadLinks("bob"));
  await assert.rejects(links.saveLink("bob", input));
  await assert.rejects(links.updateLink("bob", "1", input));
  await assert.rejects(links.deleteLink("bob", "1"));
  assert.equal(requests.length, 0);
  assert.equal(records.size, 0);
});

test("CRUD uses the signed-in UID path and account changes isolate lists", async () => {
  const { auth, links, records, requests } = createEnvironment();
  auth.currentUser = { uid: "alice" };
  const created = await links.saveLink("alice", input);
  assert(records.has(`users/alice/links/${created.id}`));
  const updated = await links.updateLink("alice", created.id, { ...input, title: "Edited" });
  assert.equal(updated.title, "Edited");
  assert.equal((await links.loadLinks("alice"))[0].title, "Edited");
  auth.currentUser = { uid: "bob" };
  assert.deepEqual(await links.loadLinks("bob"), []);
  await assert.rejects(links.deleteLink("alice", created.id));
  auth.currentUser = { uid: "alice" };
  await links.deleteLink("alice", created.id);
  assert.deepEqual(await links.loadLinks("alice"), []);
  assert(requests.every((value) => !value.includes("anonymous")));
});

test("initial name uses email prefix, and later loads preserve a custom display name", async () => {
  const { auth, profiles, records } = createEnvironment();
  const user = { uid: "alice", displayName: "Alice", email: "alice@example.com", photoURL: "" };
  auth.currentUser = user;
  assert.equal((await profiles.loadUserProfile(user)).displayName, "alice");
  assert(records.has("users/alice"));
  await profiles.updateUserDisplayName("alice", "New_name");
  assert.equal((await profiles.loadUserProfile(user)).displayName, "New_name");
  assert.equal(records.get("users/alice").displayName, "New_name");
});

test("display name checks are case-insensitive, saving rechecks availability, and renaming releases the old name", async () => {
  const { auth, profiles, records } = createEnvironment();
  const alice = { uid: "alice", email: "alice@example.com", photoURL: "" };
  const bob = { uid: "bob", email: "bob@example.com", photoURL: "" };
  auth.currentUser = alice;
  await profiles.loadUserProfile(alice);
  await profiles.updateUserDisplayName("alice", "Shared");
  auth.currentUser = bob;
  await profiles.loadUserProfile(bob);
  assert.equal(await profiles.checkDisplayName("bob", "shared"), false);
  await assert.rejects(profiles.updateUserDisplayName("bob", "SHARED"), profiles.DisplayNameTakenError);
  assert.equal(records.get("displayNames/shared").uid, "alice");
  auth.currentUser = alice;
  assert.equal(await profiles.checkDisplayName("alice", "SHARED"), true);
  await profiles.updateUserDisplayName("alice", "Different");
  assert(!records.has("displayNames/shared"));
  auth.currentUser = bob;
  await profiles.updateUserDisplayName("bob", "Shared");
  assert.equal(records.get("displayNames/shared").uid, "bob");
});

test("invalid display names are rejected before modifying profiles", async () => {
  const { auth, profiles, records } = createEnvironment();
  auth.currentUser = { uid: "alice" };
  for (const name of ["", "a", "a".repeat(21), "two words", "slash/name", "💙💙"]) {
    await assert.rejects(profiles.updateUserDisplayName("alice", name));
  }
  assert.equal(records.size, 0);
});

test("biography is trimmed and persisted without changing the display name", async () => {
  const { auth, profiles, records } = createEnvironment();
  const user = { uid: "alice", email: "alice@example.com", photoURL: "" };
  auth.currentUser = user;
  await profiles.loadUserProfile(user);
  await profiles.updateUserDisplayName("alice", "alice", "  Hello\nWorld  ");
  assert.equal((await profiles.loadUserProfile(user)).bio, "Hello\nWorld");
  assert.equal(records.get("users/alice").displayName, "alice");
  await assert.rejects(profiles.updateUserDisplayName("alice", "alice", "a".repeat(301)));
  assert.equal(records.get("users/alice").bio, "Hello\nWorld");
  await profiles.updateUserDisplayName("alice", "alice", "");
  assert.equal((await profiles.loadUserProfile(user)).bio, "");
});

test("public pages resolve names without login and omit private profile fields", async () => {
  const { auth, profiles, links, publicPages, records, requests } = createEnvironment();
  const user = { uid: "alice", email: "alice@example.com", photoURL: "" };
  auth.currentUser = user;
  await profiles.loadUserProfile(user);
  await profiles.updateUserDisplayName(user.uid, "공개_Alice", "소개");
  await links.saveLink(user.uid, input);
  auth.currentUser = null;
  const page = await publicPages.loadPublicPage("공개_ALICE");
  assert.deepEqual(page.profile, { displayName: "공개_Alice", photoURL: "", bio: "소개" });
  assert.equal(page.links.length, 1);
  assert.equal(page.links[0].title, input.title);
  assert.equal(records.get("publicProfiles/alice").email, undefined);
  assert.equal(await publicPages.loadPublicPage("alice"), null);
  assert.equal(await publicPages.loadPublicPage("missing"), null);
  assert.equal(await publicPages.loadPublicPage("invalid/name"), null);
  assert(requests.every((request) => request === "users/alice/links"));
});

test("renaming updates the public page and removes the previous address", async () => {
  const { auth, profiles, publicPages } = createEnvironment();
  const user = { uid: "alice", email: "alice@example.com", photoURL: "" };
  auth.currentUser = user;
  await profiles.loadUserProfile(user);
  await profiles.updateUserDisplayName(user.uid, "New_name", "new bio");
  auth.currentUser = null;
  assert.equal(await publicPages.loadPublicPage("alice"), null);
  const page = await publicPages.loadPublicPage("new_name");
  assert.equal(page.profile.bio, "new bio");
  assert.deepEqual(page.links, []);
});
