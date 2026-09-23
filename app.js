const CLUSTERS = [
  {
    id: "palace",
    title: "Palaces and old Seoul",
    area: "Jongno",
    tags: ["history", "food", "art"],
    intensity: 2,
    description: "Start at the palace, eat in Seochon and continue east through Insadong.",
    stops: ["Gyeongbokgung Palace", "Seochon", "Insadong", "Ikseon-dong"],
    rain: "Use the National Palace Museum, then spend more time in Insadong's galleries and tea houses."
  },
  {
    id: "market",
    title: "Markets and central Seoul",
    area: "Jongno · Dongdaemun",
    tags: ["food", "shopping", "modern", "art"],
    intensity: 2,
    description: "Visit Gwangjang Market, Dongdaemun and Euljiro in one central route.",
    stops: ["Gwangjang Market", "Dongdaemun Design Plaza", "Cheonggyecheon", "Euljiro"],
    rain: "Spend more time at Dongdaemun Design Plaza and visit the market during a dry window.",
    meal: { name: "Buchon Yukhoe", note: "Gwangjang Market · from about ₩11,000", url: "https://map.naver.com/p/entry/place/36428555", id: "buchon-yukhoe" }
  },
  {
    id: "hongdae",
    title: "Hongdae, Yeonnam and Mangwon",
    area: "Hongdae · Yeonnam · Mangwon",
    tags: ["food", "shopping", "art", "nightlife"],
    intensity: 2,
    description: "A relaxed day for cafes, small shops, Mangwon Market and a Hongdae evening.",
    stops: ["Yeonnam-dong", "Gyeongui Line Forest Park", "Mangwon Market", "Hongdae"],
    rain: "Focus on cafes, shops, galleries and the covered parts of Mangwon Market.",
    meal: { name: "Okdongsik", note: "Mapo · pork soup around ₩15,000", url: "https://map.naver.com/p/entry/place/859857359", id: "okdongsik" }
  },
  {
    id: "namsan",
    title: "Myeongdong and Namsan",
    area: "Myeongdong · Namdaemun · Namsan",
    tags: ["food", "shopping", "nature", "modern"],
    intensity: 3,
    description: "Shop, eat and finish with a city view without leaving central Seoul.",
    stops: ["Namdaemun Market", "Myeongdong", "Namsan route", "N Seoul Tower area"],
    rain: "Skip the Namsan walk, stay indoors and visit the tower only if visibility improves.",
    meal: { name: "Myeongdong Kyoja", note: "Myeongdong · noodles from ₩12,000", url: "https://map.naver.com/p/entry/place/11592650", id: "myeongdong-kyoja" }
  },
  {
    id: "seongsu",
    title: "Seongsu and Seoul Forest",
    area: "Seongsu · Seoul Forest",
    tags: ["art", "shopping", "modern", "nature", "food"],
    intensity: 2,
    description: "Pair Seongsu's shops and cafes with Seoul Forest and an optional river walk.",
    stops: ["Seongsu design streets", "Seoul Forest", "Ttukseom Hangang Park", "Seongsu dinner"],
    rain: "Stay with cafes, pop-ups and indoor shops, then use the clearest hour for the park.",
    meal: { name: "Somunnan Seongsu Gamjatang", note: "Seongsu · meals from about ₩12,000", url: "https://map.naver.com/p/entry/place/11721256", id: "somunnan-seongsu" }
  },
  {
    id: "gangnam",
    title: "Modern Gangnam",
    area: "Samseong · Gangnam",
    tags: ["modern", "shopping", "food", "history"],
    intensity: 2,
    description: "Combine Bongeunsa, COEX and Gangnam in one south-side day.",
    stops: ["Bongeunsa Temple", "COEX", "Starfield Library", "Gangnam evening"],
    rain: "Stay inside COEX and visit Bongeunsa during a dry window.",
    meal: { name: "Nongmin Baekam Sundae", note: "Gangnam · soup from ₩11,000", url: "https://map.naver.com/p/entry/place/13149768", id: "nongmin-baekam-sundae" }
  },
  {
    id: "jamsil",
    title: "Lake walk & high-rise Seoul",
    area: "Jamsil",
    tags: ["modern", "nature", "shopping", "food"],
    intensity: 2,
    description: "Walk the lake, explore the mall and add a skyline view if the weather is clear.",
    stops: ["Seokchon Lake", "Lotte World Mall", "Seoul Sky area", "Songridan-gil"],
    rain: "Use the mall and aquarium. Add the lake only if the weather improves.",
    meal: { name: "Bongpiyang", note: "Jamsil · noodles from ₩16,000", url: "https://map.naver.com/p/entry/place/11861413", id: "bongpiyang" }
  },
  {
    id: "itaewon",
    title: "Yongsan and Itaewon",
    area: "Yongsan · Itaewon",
    tags: ["art", "food", "nightlife", "modern"],
    intensity: 2,
    description: "Start with a museum, then move to Hannam and Itaewon for the evening.",
    stops: ["National Museum of Korea", "Leeum area", "Hannam-dong", "Itaewon evening"],
    rain: "Spend more time in the museums and shorten the hillside walking.",
    meal: { name: "Goobok Mandu", note: "Yongsan · dumplings from ₩8,500", url: "https://map.naver.com/p/entry/place/36432841", id: "goobok-mandu" }
  },
  {
    id: "yeouido",
    title: "A slower day in Yeouido",
    area: "Yeouido",
    tags: ["nature", "modern", "shopping", "food"],
    intensity: 1,
    description: "Mix a river walk with The Hyundai Seoul and easy indoor stops.",
    stops: ["Yeouido Hangang Park", "The Hyundai Seoul", "IFC area", "River sunset"],
    rain: "Stay inside The Hyundai and IFC, then walk by the river if it clears.",
    meal: { name: "Jeongin Myeonok", note: "Yeouido · noodles from ₩15,000", url: "https://map.naver.com/p/entry/place/34883067", id: "jeongin-myeonok" }
  },
  {
    id: "bukchon",
    title: "Bukchon and Samcheong-dong",
    area: "Bukchon · Samcheong",
    tags: ["history", "art", "food", "shopping"],
    intensity: 2,
    description: "A quiet route for architecture, craft shops, galleries and cafes.",
    stops: ["Samcheong-dong", "Bukchon cultural spaces", "Craft galleries", "Anguk cafes"],
    rain: "Stay with museums, galleries and cafes, and keep the residential walk short."
  }
];

const SPEND = {
  budget: { food: 28, transit: 7, activities: 14, label: "Budget-conscious" },
  comfortable: { food: 52, transit: 10, activities: 35, label: "Comfortable" },
  premium: { food: 95, transit: 20, activities: 85, label: "Premium" }
};

const PLAN_STORAGE_KEY = "routecheck_last_plan";
const VALID_PACES = new Set(["easy", "balanced", "full"]);
const VALID_SPEND = new Set(Object.keys(SPEND));
const VALID_INTERESTS = new Set(["history", "food", "shopping", "art", "nature", "nightlife", "modern"]);
const INTEREST_LABELS = {
  history: "history",
  food: "food",
  shopping: "shopping",
  art: "art and design",
  nature: "parks and views",
  nightlife: "nightlife",
  modern: "modern Seoul"
};

const form = document.querySelector("#trip-form");
const results = document.querySelector("#results");
const dayPlans = document.querySelector("#day-plans");

function selectedInterests() {
  return [...document.querySelectorAll('input[name="interest"]:checked')].map(input => input.value);
}

function seededSort(items, seed) {
  return [...items].sort((a, b) => {
    const aValue = [...a.id].reduce((sum, char) => sum + char.charCodeAt(0), seed);
    const bValue = [...b.id].reduce((sum, char) => sum + char.charCodeAt(0), seed);
    return (aValue % 17) - (bValue % 17);
  });
}

function chooseClusters(days, interests, pace) {
  const paceFit = pace === "easy" ? 1 : pace === "balanced" ? 2 : 3;
  const scored = CLUSTERS.map(cluster => {
    const interestScore = cluster.tags.filter(tag => interests.includes(tag)).length * 5;
    const intensityScore = 3 - Math.abs(cluster.intensity - paceFit);
    return { ...cluster, score: interestScore + intensityScore };
  });
  const seed = days * 13 + interests.join("").length + pace.length;
  return seededSort(scored, seed).sort((a, b) => b.score - a.score).slice(0, days);
}

function displayStops(stops, pace) {
  if (pace === "easy") return stops.slice(0, 3);
  return stops;
}

function estimateBudget(days, travelers, lodging, spendKey) {
  const profile = SPEND[spendKey];
  const personalDaily = profile.food + profile.transit + profile.activities;
  const variable = personalDaily * travelers * days;
  const rooms = lodging * Math.max(days - 1, 1);
  const buffer = (variable + rooms) * .1;
  return Math.round(variable + rooms + buffer);
}

function buildPlainText(plan, data, total) {
  const lines = [
    `Korea RouteCheck — ${data.days}-day Seoul plan`,
    `Pace: ${data.pace} | Travelers: ${data.travelers} | Estimated total: $${total.toLocaleString()}`,
    ""
  ];
  plan.forEach((day, index) => {
    lines.push(`Day ${index + 1}: ${day.title} (${day.area})`);
    lines.push(displayStops(day.stops, data.pace).join(" → "));
    if (day.meal) lines.push(`Meal nearby: ${day.meal.name} — ${day.meal.note}`);
    if (data.rainReady) lines.push(`Rain fallback: ${day.rain}`);
    lines.push("");
  });
  lines.push("Verify current hours, closures, reservations, and prices before traveling.");
  lines.push("Open this itinerary: " + planUrl(data).toString());
  return lines.join("\n");
}

function naverPlaceSearch(stop) {
  return `https://map.naver.com/p/search/${encodeURIComponent(`${stop} 서울`)}`;
}

function readFormData() {
  return {
    days: Number(document.querySelector("#days").value),
    travelers: Number(document.querySelector("#travelers").value),
    pace: document.querySelector("#pace").value,
    spend: document.querySelector("#spend").value,
    lodging: Number(document.querySelector("#lodging").value),
    rainReady: document.querySelector("#rain-ready").checked,
    interests: selectedInterests()
  };
}

function normalizePlanData(candidate) {
  if (!candidate || typeof candidate !== "object") return null;
  const days = Math.min(7, Math.max(2, Math.round(Number(candidate.days) || 3)));
  const travelers = Math.min(8, Math.max(1, Math.round(Number(candidate.travelers) || 2)));
  const lodging = Math.min(1500, Math.max(0, Number(candidate.lodging) || 0));
  const pace = VALID_PACES.has(candidate.pace) ? candidate.pace : "balanced";
  const spend = VALID_SPEND.has(candidate.spend) ? candidate.spend : "comfortable";
  const interests = Array.isArray(candidate.interests)
    ? candidate.interests.filter(item => VALID_INTERESTS.has(item)).slice(0, VALID_INTERESTS.size)
    : [];
  return {
    days,
    travelers,
    lodging,
    pace,
    spend,
    rainReady: candidate.rainReady !== false,
    interests: interests.length ? interests : ["history", "food", "modern"]
  };
}

function applyPlanToForm(data) {
  document.querySelector("#days").value = String(data.days);
  document.querySelector("#travelers").value = String(data.travelers);
  document.querySelector("#pace").value = data.pace;
  document.querySelector("#spend").value = data.spend;
  document.querySelector("#lodging").value = String(data.lodging);
  document.querySelector("#rain-ready").checked = data.rainReady;
  document.querySelectorAll('input[name="interest"]').forEach(input => {
    input.checked = data.interests.includes(input.value);
  });
}

function savePlan(data) {
  try {
    window.localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (_) { return false; }
}

function readSavedPlan() {
  try { return normalizePlanData(JSON.parse(window.localStorage.getItem(PLAN_STORAGE_KEY))); } catch (_) { return null; }
}

function planFromUrl() {
  const params = new URLSearchParams(window.location.search);
  if (!params.has("d")) return null;
  return normalizePlanData({
    days: params.get("d"),
    travelers: params.get("t"),
    pace: params.get("p"),
    spend: params.get("s"),
    lodging: params.get("l"),
    rainReady: params.get("r") !== "0",
    interests: (params.get("i") || "").split(",").filter(Boolean)
  });
}

function planUrl(data) {
  const url = new URL(window.location.href);
  url.hash = "planner";
  url.search = new URLSearchParams({
    d: String(data.days),
    t: String(data.travelers),
    p: data.pace,
    s: data.spend,
    l: String(data.lodging),
    r: data.rainReady ? "1" : "0",
    i: data.interests.join(",")
  }).toString();
  return url;
}

function interestSummary(interests) {
  return interests.slice(0, 2).map(item => INTEREST_LABELS[item]).join(" and ");
}

function selectPlanOffers(data) {
  const offers = [];
  if (data.interests.includes("food")) offers.push(data.rainReady
    ? { key: "cookingClasses", title: "Learn to cook a Korean meal", reason: "You selected food and rain fallbacks. Compare kitchen sessions; some classes also include an outdoor market visit.", guide: "seoul-cooking-classes.html", label: "Check cooking-class dates" }
    : { key: "foodTours", title: "Explore Seoul through food", reason: "You selected food. Compare guided tastings and check how much food is included before choosing.", guide: "seoul-food-tours-guide.html", label: "Check food-tour dates" });
  if (data.interests.includes("history")) offers.push({ key: "palaceTours", title: "Add context to a palace visit", reason: "You selected history. Compare a guided palace visit with exploring independently; check the opening day and admission inclusions.", guide: "gyeongbokgung-palace-tour-guide.html", label: "Check palace-tour dates" });
  if (data.interests.includes("nightlife")) offers.push({ key: "nightTours", title: "Plan one evening out", reason: "You selected nightlife. Compare evening routes and check the finish location before booking.", guide: "seoul-night-tours-guide.html", label: "Check night-tour dates" });
  return offers.slice(0, 2);
}

function renderPlanOffers(data) {
  const panel = document.querySelector("#plan-experiences");
  const container = document.querySelector("#plan-offers");
  if (!panel || !container) return;
  const config = window.ROUTECHECK_CONFIG?.affiliateLinks || {};
  const offers = selectPlanOffers(data).filter(offer => config[offer.key]?.enabled && config[offer.key]?.url);
  panel.hidden = !offers.length;
  container.innerHTML = offers.map(offer => `<article class="plan-offer"><h4>${offer.title}</h4><p>${offer.reason}</p><div class="plan-offer-actions"><a class="button button-primary" data-affiliate="${offer.key}" data-placement="planner_match" href="${config[offer.key].url}" target="_blank" rel="sponsored noopener">${offer.label} ↗</a><a href="${offer.guide}">Compare options first →</a></div></article>`).join("");
  applyAffiliateLinks(container);
}

let activePlan = null;

function renderPlan(rawData, options = {}) {
  const data = normalizePlanData(rawData);
  if (!data) return;
  applyPlanToForm(data);
  const plan = chooseClusters(data.days, data.interests, data.pace);
  const total = estimateBudget(data.days, data.travelers, data.lodging, data.spend);
  const load = data.pace === "easy" ? "Light" : data.pace === "full" ? "Full" : "Balanced";
  activePlan = { data, plan, total };

  document.querySelector("#result-title").textContent = `${data.days}-day Seoul itinerary for ${interestSummary(data.interests)}`;
  document.querySelector("#route-score").textContent = String(data.days);
  document.querySelector("#daily-load").textContent = load;
  document.querySelector("#budget-total").textContent = `$${total.toLocaleString()}`;

  dayPlans.innerHTML = plan.map((day, index) => `
    <article class="day-card">
      <div class="day-meta">
        <strong>Day ${index + 1}</strong>
        <span>${day.area}</span>
      </div>
      <div class="day-content">
        <h3>${day.title}</h3>
        <p>${day.description}</p>
        <ol class="stops" aria-label="Suggested stop order">${displayStops(day.stops, data.pace).map((stop, stopIndex) => `<li><a href="${naverPlaceSearch(stop)}" target="_blank" rel="noopener" data-place-map="${stop}"><span>${stopIndex + 1}</span>${stop}</a></li>`).join("")}</ol>
        ${day.meal ? `<p class="meal-pick"><strong>Meal nearby:</strong> <a href="${day.meal.url}" target="_blank" rel="noopener" data-map-link="${day.meal.id}">${day.meal.name}</a> <span>· ${day.meal.note}</span></p>` : `<p class="meal-pick"><a href="where-to-eat-seoul-by-budget.html">See Seoul restaurant picks by budget</a></p>`}
        ${data.rainReady ? `<p class="rain-note"><strong>Rain fallback:</strong> ${day.rain}</p>` : ""}
      </div>
    </article>
  `).join("");

  renderPlanOffers(data);
  const saved = savePlan(data);
  const restoreButton = document.querySelector("#restore-plan");
  if (restoreButton) restoreButton.hidden = !saved;
  const shareUrl = planUrl(data);
  if (options.updateUrl !== false) window.history.replaceState({}, "", shareUrl);
  const status = document.querySelector("#plan-status");
  if (status) status.textContent = !saved
    ? "Your browser could not save this itinerary. Copy or share the link to keep it."
    : options.restored === "shared"
    ? "Shared itinerary opened. Changes are saved on this device."
    : options.restored === "saved"
      ? "Saved itinerary restored. Share the link to open it elsewhere."
      : "Saved on this device. Share the link to open the same choices elsewhere.";
  results.hidden = false;

  window.routecheckTrack?.("generate_itinerary", {
    trip_days: data.days,
    trip_pace: data.pace,
    rain_ready: data.rainReady ? "yes" : "no",
    itinerary_source: options.restored || "form"
  });
  if (options.scroll !== false) {
    document.querySelector("#result-title").focus({ preventScroll: true });
    results.scrollIntoView({ behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const temporary = document.createElement("textarea");
  temporary.value = text;
  temporary.setAttribute("readonly", "");
  temporary.style.position = "fixed";
  temporary.style.opacity = "0";
  document.body.appendChild(temporary);
  temporary.select();
  const copied = document.execCommand("copy");
  temporary.remove();
  if (!copied) throw new Error("Copy unavailable");
}

async function shareResource(button, payload, eventName, parameters = {}) {
  const originalLabel = button.textContent;
  button.disabled = true;
  let method = "copy";
  try {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share(payload);
        method = "native";
      } catch (error) {
        if (error.name === "AbortError") return;
        await copyText(payload.url);
      }
    } else {
      await copyText(payload.url);
    }
    button.textContent = method === "native" ? "Shared" : "Link copied";
    window.routecheckTrack?.(eventName, { ...parameters, share_method: method });
  } catch (_) {
    button.textContent = "Could not share — try again";
  } finally {
    button.disabled = false;
    setTimeout(() => { button.textContent = originalLabel; }, 2000);
  }
}

function applyAffiliateLinks(root = document) {
  const config = window.ROUTECHECK_CONFIG?.affiliateLinks || {};
  root.querySelectorAll("[data-affiliate]").forEach(link => {
    const key = link.dataset.affiliate;
    const item = config[key];
    if (item?.enabled && item.url) {
      link.href = item.url;
      link.target = "_blank";
      link.rel = "sponsored noopener";
      link.dataset.disabled = "false";
      if (link.dataset.affiliateBound === "true") return;
      link.dataset.affiliateBound = "true";
      link.addEventListener("click", () => {
        window.routecheckTrack?.("affiliate_click", {
          affiliate_partner: key,
          affiliate_provider: "viator",
          affiliate_product: item.productId || "category",
          affiliate_placement: link.dataset.placement || "page",
          affiliate_context: link.textContent.trim().replace(/\s+/g, " ").slice(0, 80),
          page_path: window.location.pathname
        });
      });
    } else {
      link.href = "#planner";
      link.dataset.disabled = "true";
      link.title = "Affiliate link will activate after program approval";
      link.addEventListener("click", event => event.preventDefault());
    }
  });
}

if (form) {
  form.addEventListener("submit", event => {
    event.preventDefault();
    const data = readFormData();
    if (!data.interests.length) data.interests = ["history", "food", "modern"];
    renderPlan(data);
  });

  document.querySelectorAll("[data-preset-days]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelector("#days").value = button.dataset.presetDays;
      window.routecheckTrack?.("planner_preset_click", { trip_days: Number(button.dataset.presetDays) });
      form.requestSubmit();
    });
  });

  document.querySelector("#copy-plan").addEventListener("click", async event => {
    if (!activePlan) return;
    const button = event.currentTarget;
    const plan = activePlan;
    try {
      await copyText(buildPlainText(plan.plan, plan.data, plan.total));
      button.textContent = "Copied";
      window.routecheckTrack?.("copy_itinerary", { trip_days: plan.data.days });
    } catch (_) {
      button.textContent = "Could not copy — try again";
    }
    setTimeout(() => { button.textContent = "Copy plan"; }, 2000);
  });

  document.querySelector("#share-plan").addEventListener("click", async event => {
    if (!activePlan) return;
    const url = planUrl(activePlan.data);
    window.history.replaceState({}, "", url);
    await shareResource(event.currentTarget, {
      title: `${activePlan.data.days}-day Seoul itinerary | Korea RouteCheck`,
      url: url.toString()
    }, "share_itinerary", { trip_days: activePlan.data.days });
  });

  document.querySelector("#print-plan").addEventListener("click", () => {
    if (activePlan) window.routecheckTrack?.("print_itinerary", { trip_days: activePlan.data.days });
    window.print();
  });

  const restoreButton = document.querySelector("#restore-plan");
  restoreButton.hidden = !readSavedPlan();
  restoreButton.addEventListener("click", () => {
    const savedPlan = readSavedPlan();
    if (savedPlan) renderPlan(savedPlan, { restored: "saved" });
  });

  const sharedPlan = planFromUrl();
  if (sharedPlan) renderPlan(sharedPlan, { restored: "shared", updateUrl: false, scroll: false });
}

const yearElement = document.querySelector("#year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

document.addEventListener("click", event => {
  const mapLink = event.target.closest("[data-map-link]");
  if (!mapLink) return;
  window.routecheckTrack?.("restaurant_map_click", {
    restaurant_name: mapLink.dataset.mapLink,
    page_path: window.location.pathname
  });
});

document.addEventListener("click", event => {
  const placeLink = event.target.closest("[data-place-map]");
  if (!placeLink) return;
  window.routecheckTrack?.("place_map_click", {
    place_name: placeLink.dataset.placeMap,
    page_path: window.location.pathname
  });
});

document.addEventListener("click", event => {
  const contentLink = event.target.closest("a.guide-card, a[data-guide-link]");
  if (!contentLink) return;
  window.routecheckTrack?.("content_card_click", {
    destination_path: contentLink.getAttribute("href"),
    card_label: contentLink.querySelector("h3")?.textContent || contentLink.textContent.trim().slice(0, 80),
    page_path: window.location.pathname
  });
});

applyAffiliateLinks();

const tourFinder = document.querySelector("#tour-finder");
if (tourFinder) {
  const interest = document.querySelector("#tour-interest");
  const time = document.querySelector("#tour-time");
  const cards = [...document.querySelectorAll("[data-tour-interest]")];
  const count = document.querySelector("#tour-result-count");
  const empty = document.querySelector("#tour-no-results");
  function filterTours(track = false) {
    let matches = 0;
    cards.forEach(card => {
      const show = (interest.value === "all" || card.dataset.tourInterest === interest.value)
        && (time.value === "all" || card.dataset.tourTime === time.value);
      card.hidden = !show;
      if (show) matches++;
    });
    count.textContent = `${matches} ${matches === 1 ? "option matches" : "options match"} your choices.`;
    empty.hidden = matches > 0;
    if (track) window.routecheckTrack?.("tour_finder_filter", {
      tour_interest: interest.value,
      tour_time: time.value,
      result_count: matches
    });
  }
  tourFinder.hidden = false;
  count.hidden = false;
  tourFinder.addEventListener("submit", event => event.preventDefault());
  tourFinder.addEventListener("change", () => filterTours(true));
  tourFinder.addEventListener("reset", event => {
    event.preventDefault();
    interest.value = "all";
    time.value = "all";
    filterTours(true);
  });
  filterTours();
}

const guideActions = document.querySelector(".guide-hero .hero-actions");
if (document.body.dataset.guide && guideActions) {
  const shareGuide = document.createElement("button");
  shareGuide.type = "button";
  shareGuide.className = "button button-secondary";
  shareGuide.textContent = "Share guide";
  guideActions.appendChild(shareGuide);
  shareGuide.addEventListener("click", () => {
    const url = document.querySelector('link[rel="canonical"]')?.href;
    if (!url) return;
    shareResource(shareGuide, { title: document.title, url }, "share_guide", {
      guide_type: document.body.dataset.guide,
      page_path: window.location.pathname
    });
  });
}
