import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const root = new URL("../", import.meta.url);
const code = readFileSync(new URL("analytics.js", root), "utf8");
function setup(saved = null, blockedStorage = false, enabled = true) {
  const elements = [];
  const storage = new Map(saved ? [["routecheck_analytics_consent", saved]] : []);
  function element(tagName) {
    const el = { tagName, dataset: {}, events: {}, textContent: "", removed: false,
      setAttribute() {}, addEventListener(n, fn) { this.events[n] = fn; },
      remove() { this.removed = true; }, focus() {},
      querySelector() { return { focus() {} }; }
    };
    elements.push(el);
    return el;
  }
  const settings = element("button");
  const status = element("p");
  const location = new URL("https://korearoutecheck-ux.github.io/korea-routecheck/?d=3&t=2&l=120&i=food&analytics_debug=1&utm_source=hostel#planner");
  let reloads = 0;
  location.reload = () => { reloads++; };
  const window = { location, ROUTECHECK_CONFIG: { analytics: { enabled, measurementId: "G-MSXQSYV0QL" } },
    events: {}, addEventListener(n, fn) { this.events[n] = fn; },
    localStorage: { getItem(k) { if (blockedStorage) throw Error(); return storage.get(k) ?? null; },
      setItem(k, v) { if (blockedStorage) throw Error(); storage.set(k, v); } }
  };
  const document = { title: "Food tours", referrer: "https://example.com/arrival?l=120#plan", cookie: "_ga=old; other=keep",
    body: { dataset: { guide: "seoul-food-tours-guide" }, appendChild() {} }, head: { appendChild() {} },
    createElement: element,
    querySelectorAll(selector) { return selector === "[data-analytics-settings]" ? [settings] : selector === "[data-analytics-status]" ? [status] : []; }
  };
  runInNewContext(code, { window, document, URL, Date, Set });
  const commands = () => window.dataLayer.map(args => [...args]);
  const scripts = () => elements.filter(e => e.tagName === "script" && !e.removed);
  const choose = choice => {
    const banner = elements.findLast(e => e.tagName === "aside" && !e.removed);
    assert.ok(banner, "consent UI is available");
    banner.events.click({ target: { closest: () => ({ dataset: { analyticsChoice: choice } }) } });
  };
  return { window, document, commands, scripts, choose, settings, status, storage, get reloads() { return reloads; } };
}

const fresh = setup();
fresh.window.routecheckTrack("affiliate_click");
assert.equal(fresh.scripts().length, 0);
assert.equal(fresh.commands().length, 0);
fresh.choose("deny");
assert.equal(fresh.scripts().length, 0);
assert.equal(fresh.storage.get("routecheck_analytics_consent"), "denied");
fresh.settings.events.click();
fresh.choose("allow");
assert.equal(fresh.scripts().length, 1);
assert.equal(fresh.commands().filter(c => c[1] === "page_view").length, 1);
assert.equal(fresh.commands().find(c => c[0] === "config")[2].send_page_view, false);
fresh.window.routecheckTrack("affiliate_click", { page_location: "unsafe", affiliate_product: "7812P100" });
const hit = fresh.commands().at(-1)[2];
assert.equal(hit.page_location, "https://korearoutecheck-ux.github.io/korea-routecheck/?utm_source=hostel");
assert.equal(hit.page_referrer, "https://example.com/arrival");
assert.equal(hit.affiliate_product, "7812P100");
assert.equal(hit.debug_mode, true);
fresh.settings.events.click(); fresh.choose("allow");
assert.equal(fresh.commands().filter(c => c[1] === "page_view").length, 1);
fresh.scripts()[0].events.error();
assert.equal(fresh.scripts().length, 0);
fresh.settings.events.click(); fresh.choose("allow");
assert.equal(fresh.scripts().length, 1);
assert.equal(fresh.commands().filter(c => c[1] === "page_view").length, 1);
fresh.settings.events.click(); fresh.choose("deny");
const count = fresh.commands().length;
fresh.window.routecheckTrack("affiliate_click");
assert.equal(fresh.commands().length, count);
assert.equal(fresh.window["ga-disable-G-MSXQSYV0QL"], true);
assert.equal(fresh.reloads, 1);
assert.equal(setup("denied").scripts().length, 0);
assert.equal(setup("granted").commands().filter(c => c[1] === "page_view").length, 1);
assert.equal(setup(null, false, false).scripts().length, 0);
const privateBrowser = setup(null, true); privateBrowser.choose("allow");
assert.equal(privateBrowser.scripts().length, 1);
const otherTab = setup("granted");
otherTab.storage.set("routecheck_analytics_consent", "denied");
otherTab.window.events.storage({ key: "routecheck_analytics_consent" });
assert.equal(otherTab.reloads, 1);
assert.equal(otherTab.window["ga-disable-G-MSXQSYV0QL"], true);
console.log("Analytics checks passed: consent, URL privacy, one initial view, retry, withdrawal, storage, and cross-tab changes.");

let affiliateBindings = 0;
const affiliateLink = { dataset: { affiliate: "foodMarket", placement: "food_shortlist" }, textContent: "Check dates & price", events: {}, addEventListener(n, fn) { affiliateBindings++; this.events[n] = fn; } };
const appContext = { window: { location: new URL("https://korearoutecheck-ux.github.io/korea-routecheck/seoul-food-tours-guide.html"), routecheckTrack: (...args) => { appContext.hit = args; } },
  document: { body: { dataset: {} }, querySelector() { return null; }, querySelectorAll(s) { return s === "[data-affiliate]" ? [affiliateLink] : []; }, addEventListener() {} }, URL, Date, Set };
runInNewContext(readFileSync(new URL("config.js", root), "utf8"), appContext);
runInNewContext(readFileSync(new URL("app.js", root), "utf8"), appContext);
affiliateLink.events.click();
assert.equal(appContext.hit[0], "affiliate_click");
assert.equal(appContext.hit[1].affiliate_product, "7812P100");
assert.equal(appContext.hit[1].affiliate_placement, "food_shortlist");
assert.equal(new URL(affiliateLink.href).searchParams.get("pid"), "P00317839");
assert.equal(affiliateLink.rel, "sponsored noopener");
appContext.applyAffiliateLinks();
appContext.applyAffiliateLinks();
assert.equal(affiliateBindings, 1, "Shared-plan initialization must not bind duplicate click events");
console.log("Affiliate checks passed: direct destination, existing account ID, product attribution, and sponsored link attributes.");
