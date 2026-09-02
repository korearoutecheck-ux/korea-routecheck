import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));
const siteBase = "https://korearoutecheck-ux.github.io/korea-routecheck";

const days = {
  palace: {
    area: "Gwanghwamun · Seochon · Insadong",
    title: "Royal Seoul, moving east",
    summary: "Start with the palace district, then move through adjacent historic neighborhoods instead of leaving Jongno between stops.",
    moments: [
      ["Morning", "Gwanghwamun and Gyeongbokgung", "Begin at Gwanghwamun Square and enter the palace near opening time. Gyeongbokgung normally closes on Tuesdays, so confirm the operating calendar before fixing this day."],
      ["Lunch", "Seochon", "Exit toward the west side for lunch in Seochon. Keeping lunch outside the palace gates prevents an unnecessary subway trip."],
      ["Afternoon", "Insadong and nearby cultural lanes", "Travel east once, then browse craft shops, galleries and tea houses around Insadong at an unhurried pace."],
      ["Evening", "Ikseon-dong or Cheonggyecheon", "Finish in Ikseon-dong for dinner. If energy remains, add a short Cheonggyecheon walk rather than another attraction across town."]
    ],
    route: "Gwanghwamun → Gyeongbokgung → Seochon → Insadong → Ikseon-dong",
    rain: "Use the National Palace Museum as the morning anchor, spend longer in Insadong's indoor spaces and keep the outdoor lanes brief."
  },
  center: {
    area: "Namdaemun · Myeongdong · Namsan",
    title: "Markets, central Seoul and the skyline",
    summary: "This day climbs gradually from a central market toward Myeongdong and Namsan, with no need to cross the river.",
    moments: [
      ["Morning", "Namdaemun Market", "Arrive before the busiest part of the day, browse with a specific snack or meal in mind and avoid treating every aisle as mandatory."],
      ["Lunch", "Myeongdong", "Walk or take one short transit hop to Myeongdong for lunch, shopping and a flexible indoor break."],
      ["Afternoon", "Namsan approach", "Choose the cable car, bus or a walking route according to weather and mobility. The objective is the skyline—not exhausting the group before sunset."],
      ["Evening", "N Seoul Tower area or Euljiro", "Stay for the view when visibility is good. In poor conditions, return to central Seoul for dinner around Euljiro instead."]
    ],
    route: "Namdaemun → Myeongdong → Namsan → central Seoul dinner",
    rain: "Use Myeongdong and central department stores as indoor anchors; keep Namsan only if the cloud ceiling and visibility improve."
  },
  northwest: {
    area: "Yeonnam · Mangwon · Hongdae",
    title: "Northwest Seoul without the backtrack",
    summary: "Give the northwest its own day so independent shops, a neighborhood market and Hongdae's evening energy connect naturally.",
    moments: [
      ["Morning", "Yeonnam-dong", "Start with coffee and a walk near Gyeongui Line Forest Park while the neighborhood is still relatively calm."],
      ["Lunch", "Mangwon Market", "Move west for a food-focused market lunch. Choose a few items deliberately instead of queueing for every popular stall."],
      ["Afternoon", "Mangwon and the neighborhood streets", "Browse small shops or pause in a cafe. A river detour is optional and should depend on weather and walking energy."],
      ["Evening", "Hongdae", "Return toward Hongdae for dinner, live music, shopping or nightlife. Ending here avoids a late cross-city transfer between attractions."]
    ],
    route: "Yeonnam-dong → Gyeongui Line Forest Park → Mangwon Market → Hongdae",
    rain: "Build the day around cafes, object shops, galleries and the covered market, then shorten the park section."
  },
  seongsu: {
    area: "Seoul Forest · Seongsu · Ttukseom",
    title: "Design Seoul with breathing room",
    summary: "Pair Seongsu's retail and cafe streets with nearby green space so the day is more than a sequence of shops.",
    moments: [
      ["Morning", "Seoul Forest", "Use the cooler, quieter part of the day for the park. Choose one loop rather than trying to cover every section."],
      ["Lunch", "Seongsu", "Walk into Seongsu for lunch and select a compact cluster of cafes, design stores or current pop-ups."],
      ["Afternoon", "Seongsu design streets", "Leave room for discoveries, but set a stopping point; pop-up queues can consume the afternoon without improving the trip."],
      ["Evening", "Ttukseom or Seongsu dinner", "Add the river only in comfortable weather. Otherwise stay in Seongsu for dinner and an easy return."]
    ],
    route: "Seoul Forest → Seongsu streets → optional Ttukseom Hangang Park",
    rain: "Reverse the emphasis: make indoor design spaces and cafes the main plan, with a short park window between showers."
  },
  yongsan: {
    area: "Ichon · Yongsan · Hannam · Itaewon",
    title: "Korean art, modern culture and an easy evening",
    summary: "A museum-first day moves north toward Hannam and Itaewon instead of mixing Yongsan with a distant palace or market.",
    moments: [
      ["Morning", "National Museum of Korea", "Give the permanent collection a clear time limit and choose priority galleries. General admission is free, while some special exhibitions charge separately."],
      ["Lunch", "Yongsan or Ichon", "Eat nearby before changing districts. This keeps the museum visit from being squeezed between two long transfers."],
      ["Afternoon", "Hannam-dong or a second museum", "Choose Hannam's galleries and shops or another museum—not both unless the group genuinely wants a museum-heavy day."],
      ["Evening", "Itaewon", "Finish with dinner in Itaewon. The area provides variety without requiring another major transfer at the end of the day."]
    ],
    route: "National Museum of Korea → Yongsan/Ichon → Hannam-dong → Itaewon",
    rain: "This is already one of the strongest rain days. Give more time to the museums and reduce hillside walking around Hannam."
  },
  gangnam: {
    area: "Samseong · Gangnam",
    title: "Modern Gangnam, kept in one district",
    summary: "Treat Gangnam as a complete south-of-the-river day rather than a single photo stop inserted into a northern Seoul itinerary.",
    moments: [
      ["Morning", "Bongeunsa Temple", "Begin outside before the commercial district becomes busy. Keep voices low and remember that this remains an active religious site."],
      ["Lunch", "COEX", "Cross into COEX for lunch and a weather-proof midday block."],
      ["Afternoon", "Starfield Library and Samseong", "See the library, shops or aquarium according to interest. Pick one paid indoor attraction rather than stacking several."],
      ["Evening", "Gangnam dinner", "Move west only for dinner or nightlife. Avoid adding Jamsil simply because it is also south of the river."]
    ],
    route: "Bongeunsa → COEX → Starfield Library → Gangnam evening",
    rain: "Use COEX as the day's spine and visit Bongeunsa during the clearest short window."
  },
  jamsil: {
    area: "Seokchon · Jamsil · Songridan-gil",
    title: "Lake, high-rise Seoul and a slower finish",
    summary: "End the week with a self-contained eastern district that works in both clear and poor weather.",
    moments: [
      ["Morning", "Seokchon Lake", "Walk one section of the lake rather than both loops. Seasonal crowds can make a short circuit the better choice."],
      ["Lunch", "Songridan-gil", "Have lunch east of the lake, where cafes and restaurants make it easy to slow the pace."],
      ["Afternoon", "Lotte World Mall", "Use the mall, aquarium or shopping as the main indoor block. Choose according to budget and reserve time where required."],
      ["Evening", "Seoul Sky area", "Use the observatory only when visibility justifies the cost. Otherwise finish with dinner and the lake after dark."]
    ],
    route: "Seokchon Lake → Songridan-gil → Lotte World Mall → optional Seoul Sky",
    rain: "Center the day on the mall, aquarium and indoor attractions; keep the lake walk short or skip it entirely."
  }
};

const guides = [
  {
    days: 2,
    slug: "seoul-2-day-itinerary",
    kicker: "The focused first visit",
    title: "A realistic 2-day Seoul itinerary",
    description: "A practical two-day Seoul itinerary grouping Gyeongbokgung, Insadong, Namdaemun, Myeongdong and Namsan into two efficient central days.",
    lede: "Two days can deliver a strong first look at Seoul—but only if the route resists distant detours. This plan stays central, protects walking energy and saves Hongdae, Seongsu and Gangnam for another trip.",
    facts: [
      ["Best for", "A first visit or short stop"],
      ["Daily pace", "Balanced, 3–4 anchors"],
      ["Best base", "Jongno, Euljiro or Myeongdong"],
      ["Tradeoff", "Skips outer districts"]
    ],
    dayKeys: ["palace", "center"],
    overview: "The first day follows the historic core from Gwanghwamun into Jongno's traditional lanes. The second stays in the center and rises toward Namsan. Both days work without repeated long subway rides.",
    callout: "Do not add Gangnam, Jamsil or a day trip to this schedule. Each would consume a large share of the limited time in transit.",
    adjustments: [
      ["Arriving late", "Start with Myeongdong and save the palace route for the only full morning."],
      ["Easy pace", "Choose either Insadong or Ikseon-dong, and treat the Namsan viewpoint as optional."],
      ["Tuesday palace closure", "Check the official palace calendar and use a museum-led morning if Gyeongbokgung is closed."]
    ]
  },
  {
    days: 3,
    slug: "seoul-3-day-itinerary",
    kicker: "The first-trip sweet spot",
    title: "A balanced 3-day Seoul itinerary",
    description: "A neighborhood-clustered three-day Seoul itinerary covering royal Seoul, Myeongdong and Namsan, plus Hongdae, Yeonnam and Mangwon.",
    lede: "Three days is enough to see Seoul's historic center, classic skyline and one distinctly local-feeling district without turning every day into a race across the subway map.",
    facts: [
      ["Best for", "A first Seoul city break"],
      ["Daily pace", "Balanced with one late night"],
      ["Best base", "Central Seoul or Hongdae"],
      ["Route rule", "One district family per day"]
    ],
    dayKeys: ["palace", "center", "northwest"],
    overview: "Days one and two cover the historic and central essentials. Day three gives northwest Seoul enough room to feel like a neighborhood rather than a quick evening photo stop.",
    callout: "Hongdae works best as the end of its own northwest day. Pairing it with Gangnam or Jamsil creates exactly the cross-city zigzag this plan avoids.",
    adjustments: [
      ["Early departure", "Move Hongdae to the second evening and shorten the third day to Yeonnam and Mangwon."],
      ["Food priority", "Keep market portions small enough to leave room for a seated dinner in each district."],
      ["Rainy day", "Use the central day for shopping and museums, then place the palace route on the clearest forecast."]
    ]
  },
  {
    days: 5,
    slug: "seoul-5-day-itinerary",
    kicker: "Old Seoul and the creative city",
    title: "A coherent 5-day Seoul itinerary",
    description: "A realistic five-day Seoul itinerary with the historic core, Namsan, Hongdae, Seongsu, Seoul Forest, Yongsan museums and Itaewon.",
    lede: "Five days lets Seoul expand beyond the checklist. The route still protects one principle: every day should feel geographically whole, even when the week crosses the river and changes character.",
    facts: [
      ["Best for", "A complete first visit"],
      ["Daily pace", "Balanced with recovery space"],
      ["Best base", "Jongno, Euljiro or Myeongdong"],
      ["Range", "History, design, parks and museums"]
    ],
    dayKeys: ["palace", "center", "northwest", "seongsu", "yongsan"],
    overview: "The opening days establish royal and central Seoul. The middle shifts to northwest neighborhoods, while the final two days add contemporary Seongsu and a museum-led Yongsan–Itaewon route.",
    callout: "Five city days are more useful than four rushed city days plus an obligatory day trip. Add a trip outside Seoul only when it outranks one of these districts for the traveler.",
    adjustments: [
      ["Design and shopping", "Give Seongsu the full afternoon and remove the river rather than rushing both."],
      ["Museum priority", "Use a Wednesday or Saturday evening at the National Museum when current hours support it."],
      ["Low walking", "Remove the Namsan climb, use surface transport and keep one cafe break in every afternoon."]
    ]
  },
  {
    days: 7,
    slug: "seoul-7-day-itinerary",
    kicker: "A full Seoul week",
    title: "A complete 7-day Seoul itinerary",
    description: "A seven-day Seoul itinerary covering Jongno, Myeongdong, Hongdae, Seongsu, Yongsan, Gangnam and Jamsil without inefficient cross-city days.",
    lede: "A full week makes room for Seoul's different centers. This route moves from royal neighborhoods to independent northwest streets, design districts, museums and the modern city south of the river.",
    facts: [
      ["Best for", "A deep first visit"],
      ["Daily pace", "Balanced, with flexible evenings"],
      ["Best base", "Central Seoul or a split stay"],
      ["Coverage", "North, south, east and west"]
    ],
    dayKeys: ["palace", "center", "northwest", "seongsu", "yongsan", "gangnam", "jamsil"],
    overview: "The first five days build the historic, central, northwest, creative and museum sides of the city. Gangnam and Jamsil receive separate days because being south of the river does not make them one compact district.",
    callout: "Do not interpret seven days as permission to fill every evening. Seoul's distances, stairs and summer or winter weather make deliberate recovery time part of a better itinerary.",
    adjustments: [
      ["Add a day trip", "Replace either Gangnam or Jamsil instead of squeezing a day trip between them."],
      ["Split stay", "Use three or four nights centrally and the remainder near Hongdae only if luggage movement is worth the saved transfers."],
      ["Recovery day", "Turn Jamsil or Seongsu into a late-start day with one outdoor walk and one indoor anchor."]
    ]
  }
];

const sources = [
  ["Seoul transportation information", "https://english.visitseoul.net/transportation"],
  ["Official Gyeongbokgung operating information", "https://royal.khs.go.kr/ENG/contents/E702000000.do"],
  ["Visit Seoul official travel guide", "https://english.visitseoul.net/"],
  ["National Museum of Korea visitor information", "https://www.museum.go.kr/ENG/contents/E0101000000.do"],
  ["Seoul Metropolitan Government Hangang parks guide", "https://english.seoul.go.kr/service/amusement/hangang/hangang-parks/"]
];

function dayMarkup(day, index) {
  return `<section class="itinerary-day" id="day-${index + 1}">
    <div class="day-heading">
      <div class="day-number" aria-hidden="true">${index + 1}</div>
      <div><span>${day.area}</span><h3>Day ${index + 1}: ${day.title}</h3><p>${day.summary}</p></div>
    </div>
    <div class="time-grid">
      ${day.moments.map(([part, title, text]) => `<article><small>${part}</small><h4>${title}</h4><p>${text}</p></article>`).join("\n      ")}
    </div>
    <p class="route-line"><strong>Route:</strong> ${day.route}</p>
    <p class="rain-note"><strong>Rain fallback:</strong> ${day.rain}</p>
  </section>`;
}

function guideCards(currentSlug) {
  return guides.map(guide => `<a class="guide-card" href="${guide.slug}.html"${guide.slug === currentSlug ? ' aria-current="page"' : ""}><span>${guide.days} days</span><h3>${guide.days === 2 ? "Seoul essentials" : guide.days === 3 ? "First-trip balance" : guide.days === 5 ? "Old and new Seoul" : "The complete city week"}</h3><p>${guide.description}</p><strong>${guide.slug === currentSlug ? "Current guide" : "See the route →"}</strong></a>`).join("\n        ");
}

function page(guide) {
  const routeDays = guide.dayKeys.map(key => days[key]);
  const canonical = `${siteBase}/${guide.slug}.html`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    mainEntityOfPage: canonical,
    author: { "@type": "Organization", name: "Korea RouteCheck" },
    publisher: { "@type": "Organization", name: "Korea RouteCheck" },
    about: { "@type": "Place", name: "Seoul, South Korea" },
    hasPart: routeDays.map((day, index) => ({ "@type": "TouristTrip", name: `Day ${index + 1}: ${day.title}`, touristType: "First-time visitors to Seoul" }))
  };

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${guide.title} | Korea RouteCheck</title>
  <meta name="description" content="${guide.description}">
  <meta name="theme-color" content="#112f2a">
  <meta property="og:title" content="${guide.title}">
  <meta property="og:description" content="${guide.description}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonical}">
  <link rel="canonical" href="${canonical}">
  <link rel="stylesheet" href="styles.css?v=20260902-2">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body class="guide-page" data-guide="${guide.slug}">
  <header class="site-header">
    <a class="brand" href="index.html" aria-label="Korea RouteCheck home"><span class="brand-mark" aria-hidden="true">路</span><span>Korea RouteCheck</span></a>
    <nav aria-label="Primary navigation"><a href="index.html#planner">Planner</a><a href="#guides">Itineraries</a><a href="index.html#planning-guides">Planning guides</a></nav>
  </header>

  <main id="top">
    <section class="guide-hero">
      <div class="guide-hero-copy">
        <div class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><a href="index.html#guides">Seoul itineraries</a><span>/</span><span>${guide.days} days</span></div>
        <p class="eyebrow">${guide.kicker}</p>
        <h1>${guide.title}</h1>
        <p class="hero-lede">${guide.lede}</p>
        <div class="hero-actions"><a class="button button-primary" href="index.html#planner">Personalize this route</a><span class="microcopy">Free · No account required</span></div>
        <ul class="trip-chips"><li>${guide.days} neighborhood days</li><li>Rain alternatives</li><li>First-visit friendly</li></ul>
      </div>
      <figure class="guide-hero-media">
        <img src="assets/seoul-han-river.webp" width="1800" height="1000" alt="Seoul skyline stretching along the Han River" fetchpriority="high">
        <figcaption>Seoul across the Han River. Public-domain image via <a href="https://commons.wikimedia.org/wiki/File:Han_River_Seoul_skyline_Pixabay_1214950.jpg" target="_blank" rel="noopener">Wikimedia Commons</a>.</figcaption>
      </figure>
    </section>

    <section class="guide-facts" aria-label="Itinerary summary">
      ${guide.facts.map(([label, value]) => `<article><small>${label}</small><strong>${value}</strong></article>`).join("\n      ")}
    </section>

    <div class="guide-layout">
      <aside class="guide-toc" aria-label="On this page"><strong>On this page</strong><a href="#overview">Route logic</a><a href="#plan">Day-by-day plan</a><a href="#adjustments">Adjustments</a><a href="#booking">Booking shortcuts</a><a href="#sources">Check current details</a></aside>
      <article class="guide-content">
        <section class="guide-intro" id="overview">
          <p class="eyebrow">Route logic</p>
          <h2>How this ${guide.days}-day route holds together</h2>
          <p>${guide.overview}</p>
          <div class="guide-callout"><strong>The important tradeoff</strong><p>${guide.callout}</p></div>
        </section>

        <section id="plan">
          <p class="eyebrow">Day by day</p>
          <h2>Your ${guide.days}-day Seoul plan</h2>
          <div class="guide-plan">${routeDays.map(dayMarkup).join("\n")}</div>
        </section>

        <section class="adjustment-section" id="adjustments">
          <p class="eyebrow">Make it fit</p>
          <h2>Useful adjustments</h2>
          <div class="adjustment-grid">${guide.adjustments.map(([title, text]) => `<article><h3>${title}</h3><p>${text}</p></article>`).join("\n")}</div>
        </section>

        <aside class="booking-panel" id="booking">
          <div><p class="eyebrow">Optional booking shortcuts</p><h3>Book around the route—not the other way around.</h3><p>Commercial links are clearly disclosed and activate only after the relevant partner approves Korea RouteCheck.</p></div>
          <div class="booking-links"><a data-affiliate="experiences" href="#">Compare Seoul experiences <span>→</span></a><a data-affiliate="esim" href="#">Set up a Korea eSIM <span>→</span></a></div>
        </aside>

        <section class="source-section" id="sources">
          <p class="eyebrow">Check before traveling</p>
          <h2>Verify current details</h2>
          <p>Operating days, reservations, temporary closures, events and visibility change. Confirm the relevant details directly before committing money or reorganizing a day.</p>
          <ul class="source-list">${sources.map(([title, url]) => `<li><a href="${url}" target="_blank" rel="noopener">${title}</a></li>`).join("\n")}</ul>
        </section>
      </article>
    </div>

    <section class="guide-switcher" id="guides">
      <div class="section-heading"><p class="eyebrow">Compare trip lengths</p><h2>More Seoul itinerary guides</h2><p>Choose the guide that matches the number of full days actually available in the city.</p></div>
      <div class="guide-card-grid">${guideCards(guide.slug)}</div>
    </section>
  </main>

  <footer>
    <div><strong>Korea RouteCheck</strong><p>Practical Korea itineraries without the needless zigzag.</p></div>
    <div class="footer-links"><a href="index.html#planner">Planner</a><a href="disclosure.html">Affiliate disclosure</a><a href="privacy.html">Privacy</a></div>
    <p class="copyright">© <span id="year"></span> Korea RouteCheck. Verify current travel information before booking.</p>
  </footer>
  <script src="config.js?v=20260902-2"></script>
  <script src="analytics.js?v=20260902-2"></script>
  <script src="app.js?v=20260902-2"></script>
</body>
</html>`;
}

for (const guide of guides) {
  await writeFile(join(root, `${guide.slug}.html`), page(guide), "utf8");
}

console.log(`Built ${guides.length} itinerary pages.`);
