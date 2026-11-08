const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const Module = require("node:module");
const { QueryClient } = require("@tanstack/react-query");

function load(file) {
  const filename = path.resolve(file);
  const mod = new Module(filename, module);
  mod.filename = filename;
  mod.paths = module.paths;
  const nativeRequire = mod.require.bind(mod);
  mod.require = (name) => name.startsWith("@/") ? load(`src/${name.slice(2)}.ts`) : nativeRequire(name);
  mod._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 } }).outputText, filename);
  return mod.exports;
}
const { userKeys } = load("src/lib/query-keys.ts");
const { clearUserCache } = load("src/lib/clear-user-cache.ts");

test("logout clears only the previous user's profile, links, and name check cache", () => {
  const client = new QueryClient();
  client.setQueryData(userKeys.profile("alice"), { displayName: "Alice" });
  client.setQueryData(userKeys.links("alice"), [{ id: "a" }]);
  client.setQueryData(userKeys.displayName("alice", "name"), true);
  client.setQueryData(userKeys.links("bob"), [{ id: "b" }]);
  clearUserCache(client, "alice");
  assert.equal(client.getQueriesData({ queryKey: userKeys.all("alice") }).length, 0);
  assert.deepEqual(client.getQueryData(userKeys.links("bob")), [{ id: "b" }]);
  client.clear();
});

test("a late query result cannot restore a logged-out user's removed cache", async () => {
  const client = new QueryClient();
  let finish;
  const request = client.fetchQuery({ queryKey: userKeys.links("alice"), queryFn: ({ signal }) => {
    signal.addEventListener("abort", () => {});
    return new Promise((resolve) => { finish = resolve; });
  } }).catch(() => {});
  clearUserCache(client, "alice");
  finish([{ id: "old-user-link" }]);
  await request;
  assert.equal(client.getQueryData(userKeys.links("alice")), undefined);
  client.clear();
});
