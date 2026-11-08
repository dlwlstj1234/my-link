const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const Module = require("node:module");
const ts = require("typescript");

function load(file, mocks) {
  const mod = new Module(file, module);
  mod.paths = module.paths;
  const nativeRequire = mod.require.bind(mod);
  mod.require = (name) => name in mocks ? mocks[name] : nativeRequire(name);
  mod._compile(ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017, jsx: ts.JsxEmit.ReactJSX } }).outputText, file);
  return mod.exports;
}

test("clicks initialize old links at zero, accumulate, and leave link content and timestamps unchanged", async () => {
  const link = { title: "링크", createdAt: 10, updatedAt: 20 };
  const data = {};
  let queue = Promise.resolve();
  let savedPath;
  const firestore = {
    getFirestore: () => ({}),
    doc: (_, ...parts) => { savedPath = parts.join("/"); return {}; },
    runTransaction: (_, callback) => {
      const result = queue.then(() => callback({
        get: async () => ({ get: (key) => data[key] }),
        set: (_, values) => Object.assign(data, values),
      }));
      queue = result;
      return result;
    },
  };
  const { recordLinkClick } = load("src/lib/link-clicks.ts", { "firebase/firestore": firestore, "@/lib/firebase": { getFirebaseApp: () => ({}) } });
  assert.deepEqual(await Promise.all([recordLinkClick("owner", "link"), recordLinkClick("owner", "link")]), [1, 2]);
  assert.deepEqual(data, { clickCount: 2 });
  assert.equal(savedPath, "users/owner/linkClicks/link");
  assert.deepEqual(link, { title: "링크", createdAt: 10, updatedAt: 20 });
});

test("management cards show zero clicks while public cards hide click counts", () => {
  const React = require("react");
  const { renderToStaticMarkup } = require("react-dom/server");
  const empty = () => null;
  const { default: LinkItem } = load("src/components/LinkItem.tsx", {
    "@tanstack/react-query": { useMutation: () => ({ mutate: empty }), useQueryClient: () => ({}) },
    "@/lib/query-keys": { userKeys: {} },
    "@/lib/link-clicks": { recordLinkClick: empty },
    "next/image": { default: empty },
    "lucide-react": { Globe: empty, ChevronRight: empty },
    "@/components/ui/badge": { Badge: "span" },
    "@/components/ui/card": { Card: "div", CardContent: "div" },
    "@/components/ui/button": { Button: "button" },
    "@/components/LinkForm": { default: empty },
    "@/components/DeleteLinkDialog": { default: empty },
    "@/lib/link-schema": {},
  });
  const props = { ownerUid: "owner", link: { id: "link", title: "Example", description: "", url: "https://example.com", icon: "Globe" } };
  const management = renderToStaticMarkup(React.createElement(LinkItem, props));
  assert.match(management, /클릭 0회/);
  const unavailable = renderToStaticMarkup(React.createElement(LinkItem, { ...props, clickCountsStatus: "error" }));
  assert.match(unavailable, /클릭수 확인 불가/);
  assert.equal(unavailable.includes("클릭 0회"), false);
  const publicCard = renderToStaticMarkup(React.createElement(LinkItem, { ...props, showClickCount: false, link: { ...props.link, clickCount: 12 } }));
  assert.equal(publicCard.includes("클릭"), false);
  assert.match(publicCard, /href="https:\/\/example.com"/);
});

