// Run once: node scripts/migrate-demo-links.cjs
// Explicit reruns may recreate deleted demo links; never run on page load.
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const Module = require("node:module");
const { initializeApp, deleteApp } = require("firebase/app");
const { collection, doc, getDocsFromServer, getFirestore, serverTimestamp, writeBatch, terminate } = require("firebase/firestore");

require("@next/env").loadEnvConfig(process.cwd());
const filename = path.resolve("src/data/profile.ts");
const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const profileModule = new Module(filename, module);
profileModule.filename = filename;
profileModule.paths = module.paths;
profileModule._compile(compiled, filename);

async function migrate() {
  const app = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  });
  const db = getFirestore(app);
  try {
    const links = collection(db, "users", "anonymous", "links");
    const existing = new Set((await getDocsFromServer(links)).docs.map((item) => item.id));
    const batch = writeBatch(db);
    let added = 0;
    for (const { id, ...link } of profileModule.exports.profileData.links) {
      const documentId = `demo-${id}`;
      if (existing.has(documentId)) continue;
      batch.set(doc(links, documentId), { description: "", category: "", badge: "", ...link, createdAt: serverTimestamp() });
      added++;
    }
    if (added) await batch.commit();
    console.log(`Migrated ${added} demo links to users/anonymous/links; existing documents preserved.`);
  } finally {
    await terminate(db);
    await deleteApp(app);
  }
}

migrate().catch((error) => { console.error("Migration failed:", error.code || error.message); process.exitCode = 1; });
