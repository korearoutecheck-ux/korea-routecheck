import { readFile, readdir, writeFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const base = "https://korearoutecheck-ux.github.io/korea-routecheck/";
const old = await readFile(new URL("sitemap.xml", root), "utf8");
const previousDates = new Map([...old.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>\s*<\/url>/g)].map(m => [m[1], m[2]]));
const files = (await readdir(root)).filter(f => f.endsWith(".html") && !f.startsWith("google")).sort();
const entries = [];
for (const file of files) {
  const html = await readFile(new URL(file, root), "utf8");
  if (/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html)) continue;
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/)?.[1];
  const expected = file === "index.html" ? base : `${base}${file}`;
  if (canonical !== expected) throw Error(`Unexpected canonical in ${file}`);
  const dates = [];
  for (const [, json] of html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    const schema = JSON.parse(json);
    for (const node of schema["@graph"] || [schema]) if (node.dateModified) dates.push(node.dateModified);
  }
  const date = dates.sort().at(-1) || previousDates.get(canonical);
  entries.push({ canonical, date });
}
entries.sort((a,b) => a.canonical === base ? -1 : b.canonical === base ? 1 : a.canonical.localeCompare(b.canonical));
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map(({canonical,date}) => `  <url><loc>${canonical}</loc>${date ? `<lastmod>${date}</lastmod>` : ""}</url>`).join("\n")}\n</urlset>\n`;
await writeFile(new URL("sitemap.xml", root), xml);
console.log(`Built sitemap with ${entries.length} canonical URLs; retained actual content modification dates.`);
