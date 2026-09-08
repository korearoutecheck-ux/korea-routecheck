import { access, readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("../", import.meta.url).pathname;
const files = (await readdir(root)).filter(file => file.endsWith(".html") && !file.startsWith("google"));
const pages = new Map(await Promise.all(files.map(async file => [file, await readFile(join(root, file), "utf8")])));
const errors = [];

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
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Audit passed: ${pages.size} pages, internal links, assets, metadata and structured data.`);
}
