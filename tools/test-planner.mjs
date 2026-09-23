import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const code = readFileSync(new URL("../app.js", import.meta.url), "utf8");
const plan = { days: 3, travelers: 2, pace: "balanced", spend: "comfortable", lodging: 120, rainReady: true, interests: ["history", "food"] };

function setup({ blocked = false, initial = null, search = "", reducedMotion = false } = {}) {
  const storage = new Map(initial ? [["routecheck_last_plan", JSON.stringify(initial)]] : []);
  const ids = ["trip-form", "results", "day-plans", "days", "travelers", "pace", "spend", "lodging", "rain-ready", "result-title", "route-score", "daily-load", "budget-total", "plan-status", "restore-plan", "copy-plan", "share-plan", "print-plan"];
  const nodes = Object.fromEntries(ids.map(id => [id, {
    hidden: true, textContent: "", events: {},
    addEventListener(name, fn) { this.events[name] = fn; },
    focus() { this.focused = true; },
    scrollIntoView(options) { this.scrollOptions = options; }
  }]));
  const interests = ["history", "food", "modern"].map(value => ({ value, checked: false }));
  const window = {
    location: new URL("https://korearoutecheck-ux.github.io/korea-routecheck/" + search),
    localStorage: {
      getItem(key) { if (blocked) throw Error("Storage blocked"); return storage.get(key) ?? null; },
      setItem(key, value) { if (blocked) throw Error("Storage blocked"); storage.set(key, value); }
    },
    history: { replaceState() {} },
    matchMedia() { return { matches: reducedMotion }; }
  };
  const document = {
    body: { dataset: {} },
    querySelector(selector) { return nodes[selector.slice(1)] ?? null; },
    querySelectorAll(selector) { return selector === 'input[name="interest"]' ? interests : []; },
    addEventListener() {}
  };
  const context = { window, document, URL, URLSearchParams, Set, Date };
  runInNewContext(code, context);
  return { context, nodes, storage };
}

const fresh = setup({ reducedMotion: true });
assert.equal(fresh.nodes["restore-plan"].hidden, true);
fresh.context.renderPlan(plan);
assert.equal(fresh.nodes["restore-plan"].hidden, false);
assert.equal(fresh.nodes.results.hidden, false);
assert.equal(fresh.nodes["result-title"].focused, true);
assert.equal(fresh.nodes.results.scrollOptions.behavior, "auto");
assert.equal((fresh.nodes["day-plans"].innerHTML.match(/class="day-card"/g) || []).length, 3);
fresh.context.renderPlan({ ...plan, days: 5 });
fresh.nodes["restore-plan"].events.click();
assert.match(fresh.nodes["result-title"].textContent, /^5-day/, "Restore uses the latest saved plan");

const returning = setup({ initial: plan });
assert.equal(returning.nodes["restore-plan"].hidden, false);
returning.nodes["restore-plan"].events.click();
assert.match(returning.nodes["result-title"].textContent, /^3-day/);

const blocked = setup({ blocked: true });
blocked.context.renderPlan(plan);
assert.equal(blocked.nodes.results.hidden, false, "Planning works without local storage");
assert.equal(blocked.nodes["restore-plan"].hidden, true);
assert.match(blocked.nodes["plan-status"].textContent, /could not save/);

const shared = setup({ search: "?d=5&t=2&p=easy&s=budget&l=80&r=1&i=food" });
assert.match(shared.nodes["result-title"].textContent, /^5-day/);
assert.equal(shared.nodes["result-title"].focused, undefined, "Opening a shared link does not steal focus");
console.log("Planner checks passed: new and returning visits, latest saved plan, blocked storage, reduced motion, focus and shared links.");

assert.deepEqual(Array.from(fresh.context.selectPlanOffers({interests:["food"],rainReady:true}), x=>x.key), ["cookingClasses"]);
assert.deepEqual(Array.from(fresh.context.selectPlanOffers({interests:["food"],rainReady:false}), x=>x.key), ["foodTours"]);
assert.deepEqual(Array.from(fresh.context.selectPlanOffers({interests:["history","nightlife"],rainReady:false}), x=>x.key), ["palaceTours","nightTours"]);
assert.equal(fresh.context.selectPlanOffers({interests:["nature"],rainReady:false}).length, 0, "Do not force an unrelated paid activity");
assert.equal(fresh.context.selectPlanOffers({interests:["food","history","nightlife"],rainReady:false}).length, 2);
console.log("Offer matching passed: rain-aware food choice, history, nightlife, two-option limit, and no unrelated fallback.");
const offerContainer = { innerHTML: '', querySelectorAll() { return []; } };
fresh.nodes['plan-offers'] = offerContainer;
fresh.nodes['plan-experiences'] = { hidden: true };
fresh.context.window.ROUTECHECK_CONFIG = { affiliateLinks: { cookingClasses: { enabled: true, url: 'https://www.viator.com/test?pid=P00317839' } } };
fresh.context.renderPlanOffers(plan);
assert.equal(fresh.nodes['plan-experiences'].hidden, false);
assert.match(offerContainer.innerHTML, /data-placement="planner_match"/);
assert.match(offerContainer.innerHTML, /sponsored noopener/);
fresh.context.renderPlanOffers({...plan, interests: ['nature']});
assert.equal(fresh.nodes['plan-experiences'].hidden, true);
assert.equal(offerContainer.innerHTML, '', 'Changing choices removes stale offers');
console.log('Offer rendering passed: enabled destinations, attribution, and stale offer removal.');
assert.equal(fresh.context.normalizePlanData({...plan, travelers: 2.7}).travelers, 3, 'Shared links cannot create fractional travelers');
assert.equal(fresh.context.normalizePlanData({...plan, days: 3.7}).days, 4, 'Trip length and generated day count stay consistent');
