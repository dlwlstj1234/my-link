const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const Module = require("node:module");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

function renderStats({ user = { uid: "owner" }, loading = false, links = [], counts = {}, error = false } = {}) {
  const redirects = [];
  const queried = [];
  const mocks = {
    react: { ...React, useEffect: (callback) => callback() },
    "next/link": { default: ({ children, ...props }) => React.createElement("a", props, children) },
    "next/navigation": { useRouter: () => ({ replace: (path) => redirects.push(path) }) },
    "@/hooks/useAuth": { useAuth: () => ({ user, loading, error: "" }) },
    "@tanstack/react-query": { useQuery: ({ queryKey }) => {
      queried.push(queryKey);
      return { data: queryKey.at(-1) === "links" ? links : counts, isPending: false, isError: error, isFetching: false };
    } },
    "@/lib/links": {},
    "@/lib/query-keys": { userKeys: { links: (uid) => [uid, "links"], linkCounts: (uid) => [uid, "counts"] } },
    "lucide-react": { LoaderCircle: () => null, RefreshCw: () => null },
    recharts: { Bar: () => null, BarChart: () => null, CartesianGrid: () => null, XAxis: () => null, YAxis: () => null },
    "@/components/ui/button": { Button: "button" },
    "@/components/ui/card": { Card: "div", CardContent: "div", CardHeader: "div", CardTitle: "div" },
    "@/components/ui/chart": { ChartContainer: () => null, ChartTooltip: () => null, ChartTooltipContent: () => null },
  };
  const mod = new Module("stats-test", module);
  mod.paths = module.paths;
  const nativeRequire = mod.require.bind(mod);
  mod.require = (name) => name in mocks ? mocks[name] : nativeRequire(name);
  mod._compile(ts.transpileModule(fs.readFileSync("src/app/stats/page.tsx", "utf8"), { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 } }).outputText, "stats-test");
  return { html: renderToStaticMarkup(React.createElement(mod.exports.default)), redirects, queried };
}

test("anonymous stats redirect home without querying private data, after auth resolves", () => {
  assert.deepEqual(renderStats({ user: null, loading: true }).redirects, []);
  const result = renderStats({ user: null });
  assert.deepEqual(result.redirects, ["/"]);
  assert.equal(result.queried.length, 0);
  assert.equal(result.html.includes("총 클릭수"), false);
});

test("stats sums all current links, defaults missing counts to zero, and excludes deleted links", () => {
  const result = renderStats({ links: [{ id: "a", title: "First" }, { id: "b", title: "Second" }, { id: "c", title: "Third" }], counts: { a: 2, b: 3, deleted: 100 } });
  assert.match(result.html, />5<span/);
  assert.match(result.html, />0회</);
  assert.equal(result.queried.every((key) => key[0] === "owner"), true);
  assert.match(renderStats().html, />0<span/);
});

test("stats query failures display retry instead of a misleading zero total", () => {
  const { html } = renderStats({ error: true });
  assert.match(html, /통계를 불러오지 못했어요/);
  assert.equal(html.includes("총 클릭수"), false);
});
