const CLUSTERS = [
  {
    id: "palace",
    title: "Palaces, lanes & old Seoul",
    area: "Jongno",
    tags: ["history", "food", "art"],
    intensity: 2,
    description: "A compact historic route that moves south from the palace district into traditional lanes and evening streets.",
    stops: ["Gyeongbokgung Palace", "Seochon", "Insadong", "Ikseon-dong"],
    rain: "Swap the palace grounds for the National Palace Museum and spend longer in Insadong's galleries and tea houses."
  },
  {
    id: "market",
    title: "Markets, design & the city center",
    area: "Jongno · Dongdaemun",
    tags: ["food", "shopping", "modern", "art"],
    intensity: 2,
    description: "A food-first central route linking a traditional market, modern design, and an easy evening walk.",
    stops: ["Gwangjang Market", "Dongdaemun Design Plaza", "Cheonggyecheon", "Euljiro"],
    rain: "Use Dongdaemun Design Plaza and nearby malls as the main indoor anchors, then visit the market between showers."
  },
  {
    id: "hongdae",
    title: "Independent shops & northwest Seoul",
    area: "Hongdae · Yeonnam · Mangwon",
    tags: ["food", "shopping", "art", "nightlife"],
    intensity: 2,
    description: "A relaxed northwest day with small shops, cafes, a neighborhood market, and an optional late finish.",
    stops: ["Yeonnam-dong", "Gyeongui Line Forest Park", "Mangwon Market", "Hongdae"],
    rain: "Focus on cafes, object shops, galleries, and the covered sections of Mangwon Market."
  },
  {
    id: "namsan",
    title: "Classic central Seoul & skyline",
    area: "Myeongdong · Namdaemun · Namsan",
    tags: ["food", "shopping", "nature", "modern"],
    intensity: 3,
    description: "A central shopping-and-view day that avoids adding distant neighborhoods to an already active route.",
    stops: ["Namdaemun Market", "Myeongdong", "Namsan route", "N Seoul Tower area"],
    rain: "Replace the Namsan walk with indoor shopping and a long meal; keep the tower only if visibility improves."
  },
  {
    id: "seongsu",
    title: "Design Seoul & riverside breathing room",
    area: "Seongsu · Seoul Forest",
    tags: ["art", "shopping", "modern", "nature", "food"],
    intensity: 2,
    description: "Contemporary retail and design are paired with a park and river edge so the day does not become one long shopping crawl.",
    stops: ["Seongsu design streets", "Seoul Forest", "Ttukseom Hangang Park", "Seongsu dinner"],
    rain: "Prioritize pop-ups, cafes, and indoor design spaces; move the park portion to the clearest hour."
  },
  {
    id: "gangnam",
    title: "Modern Gangnam, properly grouped",
    area: "Samseong · Gangnam",
    tags: ["modern", "shopping", "food", "history"],
    intensity: 2,
    description: "A south-of-the-river day combining modern architecture, shopping, and a calm historic counterpoint.",
    stops: ["Bongeunsa Temple", "COEX", "Starfield Library", "Gangnam evening"],
    rain: "COEX and Starfield become the main route; visit Bongeunsa during the best weather window."
  },
  {
    id: "jamsil",
    title: "Lake walk & high-rise Seoul",
    area: "Jamsil",
    tags: ["modern", "nature", "shopping", "food"],
    intensity: 2,
    description: "A self-contained east Seoul day with a lake, skyline views, and abundant indoor backup options.",
    stops: ["Seokchon Lake", "Lotte World Mall", "Seoul Sky area", "Songridan-gil"],
    rain: "Use the mall, aquarium, and indoor observatory route; add the lake only if conditions allow."
  },
  {
    id: "itaewon",
    title: "Art, hillside streets & evening energy",
    area: "Yongsan · Itaewon",
    tags: ["art", "food", "nightlife", "modern"],
    intensity: 2,
    description: "A museum-led afternoon grows into a food and nightlife route without a cross-city transfer at the end.",
    stops: ["National Museum of Korea", "Leeum area", "Hannam-dong", "Itaewon evening"],
    rain: "Give more time to the museums and Hannam's indoor spaces; skip unnecessary hillside walking."
  },
  {
    id: "yeouido",
    title: "River, architecture & a slower day",
    area: "Yeouido",
    tags: ["nature", "modern", "shopping", "food"],
    intensity: 1,
    description: "A low-friction recovery day built around the river, contemporary architecture, and easy indoor options.",
    stops: ["Yeouido Hangang Park", "The Hyundai Seoul", "IFC area", "River sunset"],
    rain: "Use The Hyundai and IFC as indoor anchors and save the river for a short break between showers."
  },
  {
    id: "bukchon",
    title: "Architecture, craft & quiet northern lanes",
    area: "Bukchon · Samcheong",
    tags: ["history", "art", "food", "shopping"],
    intensity: 2,
    description: "A slower alternative to the palace route, emphasizing craft, architecture, galleries, and respectful neighborhood walking.",
    stops: ["Samcheong-dong", "Bukchon cultural spaces", "Craft galleries", "Anguk cafes"],
    rain: "Use museums, galleries, and cafes as the route spine and keep residential-lane walking brief."
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

  document.querySelector("#result-title").textContent = `${data.days} days in Seoul, built around ${data.interests.slice(0, 2).join(" + ")}`;
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
applyAffiliateLinks();
