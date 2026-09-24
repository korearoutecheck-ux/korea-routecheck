import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const root = new URL("../", import.meta.url);
const html = readFileSync(new URL("seoul-tours.html", root), "utf8");
const cards = [...html.matchAll(/data-tour-interest="([^"]+)" data-tour-time="([^"]+)"/g)].map(([,interest,time]) => ({ dataset: { tourInterest: interest, tourTime: time }, hidden: false }));
assert.equal(cards.length, 5, "All categories exist in crawlable static HTML");
const form = { events: {}, addEventListener(name, fn) { this.events[name] = fn; } };
const interest = { value: "all" };
const time = { value: "all" };
const count = {};
const empty = {};
const nodes = { "#tour-finder": form, "#tour-interest": interest, "#tour-time": time, "#tour-result-count": count, "#tour-no-results": empty };
const hits = [];
const ctx = { window: { location: new URL("https://korearoutecheck-ux.github.io/korea-routecheck/seoul-tours.html"), history: { replaceState(_state, _title, url) { ctx.window.location = new URL(url); } }, routecheckTrack: (...args) => hits.push(args) }, document: { body: { dataset: {} }, querySelector: selector => nodes[selector] || null, querySelectorAll: selector => selector === "[data-tour-interest]" ? cards : [], addEventListener() {} }, URL, Date, Set };
runInNewContext(readFileSync(new URL("app.js", root), "utf8"), ctx);
assert.equal(form.hidden, false);
assert.equal(cards.filter(card => !card.hidden).length, 5);
assert.equal(hits.length, 0, "Initial filtering does not record an interaction");
interest.value = "food";
form.events.change();
assert.equal(cards.filter(card => !card.hidden).length, 2);
assert.match(count.textContent, /^2 options/);
assert.equal(ctx.window.location.searchParams.get("interest"), "food");
assert.equal(hits.at(-1)[0], "tour_finder_filter");
time.value = "day";
form.events.change();
assert.equal(cards.filter(card => !card.hidden).length, 0);
assert.equal(empty.hidden, false);
form.events.reset({ preventDefault() {} });
assert.equal(cards.filter(card => !card.hidden).length, 5);
assert.equal(empty.hidden, true);
assert.equal(ctx.window.location.search, "", "Reset clears filter parameters");
interest.value = "history";
time.value = "day";
form.events.change();
assert.equal(cards.filter(card => !card.hidden).length, 1);
assert.match(count.textContent, /^1 option matches/);

const config = { window: {} };
runInNewContext(readFileSync(new URL("config.js", root), "utf8"), config);
for (const file of ["seoul-tours.html", "seoul-cooking-classes.html", "gwangjang-market-food-guide.html"]) {
  const content = readFileSync(new URL(file, root), "utf8");
  for (const tag of content.match(/<a\b[^>]*data-affiliate=[^>]+>/g) || []) {
    const key = tag.match(/data-affiliate="([^"]+)"/)[1];
    const href = tag.match(/href="([^"]+)"/)[1].replaceAll("&amp;", "&");
    assert.equal(href, config.window.ROUTECHECK_CONFIG.affiliateLinks[key].url, `${file}: static link matches configured booking destination`);
    assert.equal(new URL(href).searchParams.get("pid"), "P00317839");
    assert.match(tag, /rel="sponsored noopener"/);
  }
}
console.log("Discovery checks passed: static categories, filters, empty state, reset, consent-gated event hook and affiliate destinations.");

interest.value = "all"; time.value = "all"; hits.length = 0;
runInNewContext(readFileSync(new URL("app.js", root), "utf8"), {...ctx});
assert.equal(interest.value, "history"); assert.equal(time.value, "day");
assert.equal(cards.filter(card => !card.hidden).length, 1);
assert.equal(hits.length, 0, "Reopening filters is not a user interaction");
ctx.window.location = new URL("https://korearoutecheck-ux.github.io/korea-routecheck/seoul-tours.html?interest=invalid&time=invalid");
interest.value = "all"; time.value = "all";
runInNewContext(readFileSync(new URL("app.js", root), "utf8"), {...ctx});
assert.equal(cards.filter(card => !card.hidden).length, 5, "Invalid filters fall back to all options");
