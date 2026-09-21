import { access, readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("../", import.meta.url).pathname;
const files = (await readdir(root)).filter(file => file.endsWith(".html") && !file.startsWith("google"));
const pages = new Map(await Promise.all(files.map(async file => [file, await readFile(join(root, file), "utf8")])));
const errors = [];
const titles = new Map();
const descriptions = new Map();
const inbound = new Map([...pages.keys()].map(file => [file, new Set()]));
const siteBase = "https://korearoutecheck-ux.github.io/korea-routecheck/";

function report(file, message) {
  errors.push(`${file}: ${message}`);
}

function attrs(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)=(?:"([^"]*)"|'([^']*)')/g)].map(match => [match[1], match[2] ?? match[3]]));
}

async function localFileExists(path) {
  try { await access(join(root, path)); return true; } catch { return false; }
}

for (const [file, html] of pages) {
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length) report(file, `duplicate IDs: ${[...new Set(duplicateIds)].join(", ")}`);

  const h1Count = (html.match(/<h1(?:\s|>)/g) || []).length;
  if (h1Count !== 1) report(file, `expected one h1, found ${h1Count}`);
  if (!/<main(?:\s|>)/.test(html)) report(file, "missing main landmark");

  const indexable = !/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html);
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1];
  const description = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i)?.[1];
  if (indexable) {
    if (!title) report(file, "missing title");
    if (titles.has(title)) report(file, `duplicate title with ${titles.get(title)}`);
    if (descriptions.has(description)) report(file, `duplicate description with ${descriptions.get(description)}`);
    titles.set(title, file);
    descriptions.set(description, file);
    const expected = file === "index.html" ? siteBase : siteBase + file;
    const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
    if (canonical !== expected) report(file, "canonical does not match this page");
  }
  if (indexable && !/<meta\s+name="description"\s+content="[^"]+"/i.test(html)) report(file, "missing meta description");
  if (indexable && !/<link\s+rel="canonical"\s+href="[^"]+"/i.test(html)) report(file, "missing canonical URL");

  for (const match of html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(match[1]); } catch (error) { report(file, `invalid JSON-LD: ${error.message}`); }
  }

  for (const tag of html.match(/<a\b[^>]*>/g) || []) {
    const data = attrs(tag);
    if (data.target === "_blank" && !String(data.rel || "").split(/\s+/).includes("noopener")) report(file, `target=_blank link missing noopener: ${data.href}`);
    const href = data.href || "";
    if (!href || /^(https?:|mailto:|tel:|javascript:)/i.test(href)) continue;
    const [pathPart, fragment] = href.split("#");
    const targetFile = (pathPart.split("?")[0] || file).replace(/^\.\//, "");
    if (targetFile !== file && inbound.has(targetFile)) inbound.get(targetFile).add(file);
    if (!(await localFileExists(targetFile))) {
      report(file, `missing internal target: ${targetFile}`);
      continue;
    }
    if (fragment && targetFile.endsWith(".html")) {
      const targetHtml = pages.get(targetFile) || await readFile(join(root, targetFile), "utf8");
      const escapedFragment = fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (!new RegExp(`\\sid=["']${escapedFragment}["']`).test(targetHtml)) report(file, `missing fragment #${fragment} in ${targetFile}`);
    }
  }

  for (const tag of html.match(/<(?:script|img|link)\b[^>]*>/g) || []) {
    const data = attrs(tag);
    const value = data.src || data.href || "";
    if (!value || /^(https?:|data:)/i.test(value)) continue;
    const target = value.split(/[?#]/)[0].replace(/^\.\//, "");
    if (!(await localFileExists(target))) report(file, `missing local asset: ${target}`);
  }
}

const sitemap = await readFile(join(root, "sitemap.xml"), "utf8");
for (const [file, html] of pages) {
  if (/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html)) continue;
  const expected = file === "index.html" ? "/korea-routecheck/</loc>" : `/korea-routecheck/${file}</loc>`;
  if (!sitemap.includes(expected)) report(file, "indexable page missing from sitemap");
  if (file !== "index.html" && !inbound.get(file).size) report(file, "no internal links point to this page");
}

const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
if (new Set(sitemapUrls).size !== sitemapUrls.length) report("sitemap.xml", "duplicate URLs");
for (const url of sitemapUrls) {
  const file = url === siteBase ? "index.html" : url.slice(siteBase.length);
  if (!url.startsWith(siteBase) || !pages.has(file)) report("sitemap.xml", `unknown URL: ${url}`);
  else if (/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(pages.get(file))) report("sitemap.xml", `noindex page included: ${file}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Audit passed: ${pages.size} pages, internal links, assets, unique metadata, canonical URLs, structured data and no orphaned indexable pages.`);
}
