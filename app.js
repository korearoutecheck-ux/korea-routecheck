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
    if (data.rainReady) lines.push(`Rain fallback: ${day.rain}`);
    lines.push("");
  });
  lines.push("Verify current hours, closures, reservations, and prices before traveling.");
  return lines.join("\n");
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
  document.execCommand("copy");
  temporary.remove();
}

function applyAffiliateLinks() {
  const config = window.ROUTECHECK_CONFIG?.affiliateLinks || {};
  document.querySelectorAll("[data-affiliate]").forEach(link => {
    const key = link.dataset.affiliate;
    const item = config[key];
    if (item?.enabled && item.url) {
      link.href = item.url;
      link.target = "_blank";
      link.rel = "sponsored noopener";
      link.dataset.disabled = "false";
      link.addEventListener("click", () => {
        window.routecheckTrack?.("affiliate_click", {
          affiliate_partner: key,
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

if (form) form.addEventListener("submit", event => {
  event.preventDefault();
  const data = {
    days: Number(document.querySelector("#days").value),
    travelers: Number(document.querySelector("#travelers").value),
    pace: document.querySelector("#pace").value,
    spend: document.querySelector("#spend").value,
    lodging: Number(document.querySelector("#lodging").value),
    rainReady: document.querySelector("#rain-ready").checked,
    interests: selectedInterests()
  };

  if (!data.interests.length) data.interests = ["history", "food", "modern"];
  const plan = chooseClusters(data.days, data.interests, data.pace);
  const total = estimateBudget(data.days, data.travelers, data.lodging, data.spend);
  const averageIntensity = plan.reduce((sum, day) => sum + day.intensity, 0) / plan.length;
  const routeScore = Math.max(86, Math.min(98, Math.round(98 - averageIntensity * 2 + (data.pace === "balanced" ? 2 : 0))));
  const load = data.pace === "easy" ? "Light" : data.pace === "full" ? "High" : "Balanced";

  window.routecheckTrack?.("generate_itinerary", {
    trip_days: data.days,
    trip_pace: data.pace,
    rain_ready: data.rainReady ? "yes" : "no"
  });

  document.querySelector("#result-title").textContent = `${data.days}-day Seoul itinerary: ${data.interests.slice(0, 2).join(" and ")}`;
  document.querySelector("#route-score").textContent = `${routeScore}/100`;
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
        <ul class="stops">${displayStops(day.stops, data.pace).map(stop => `<li>${stop}</li>`).join("")}</ul>
        ${day.meal ? `<p class="meal-pick"><strong>Meal nearby:</strong> <a href="${day.meal.url}" target="_blank" rel="noopener" data-map-link="${day.meal.id}">${day.meal.name}</a> <span>· ${day.meal.note}</span></p>` : `<p class="meal-pick"><a href="where-to-eat-seoul-by-budget.html">See Seoul restaurant picks by budget</a></p>`}
        ${data.rainReady ? `<p class="rain-note"><strong>Rain fallback:</strong> ${day.rain}</p>` : ""}
      </div>
    </article>
  `).join("");

  document.querySelector("#copy-plan").onclick = async () => {
    const button = document.querySelector("#copy-plan");
    await copyText(buildPlainText(plan, data, total));
    button.textContent = "Copied";
    setTimeout(() => { button.textContent = "Copy plan"; }, 1600);
  };

  results.hidden = false;
  results.scrollIntoView({ behavior: "smooth", block: "start" });
});

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

applyAffiliateLinks();
