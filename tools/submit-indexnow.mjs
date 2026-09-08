import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const siteBase = "https://korearoutecheck-ux.github.io/korea-routecheck";
const host = "korearoutecheck-ux.github.io";
const key = "0a7421384d0cc3dd5c16fff38e7f4e10";
const keyLocation = `${siteBase}/${key}.txt`;
const sitemapPath = fileURLToPath(new URL("../sitemap.xml", import.meta.url));
const sitemap = await readFile(sitemapPath, "utf8");
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);

if (!urlList.length) throw new Error("No URLs found in sitemap.xml");

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList })
});

if (!response.ok) {
  const body = await response.text();
  throw new Error(`IndexNow returned ${response.status}: ${body}`);
}

console.log(`IndexNow accepted ${urlList.length} URLs with status ${response.status}.`);
