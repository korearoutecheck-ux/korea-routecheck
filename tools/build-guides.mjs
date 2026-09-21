import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));
const siteBase = "https://korearoutecheck-ux.github.io/korea-routecheck";
const siteImage = `${siteBase}/assets/seoul-han-river.webp`;
const publishedDate = "2026-09-01";
const modifiedDate = "2026-09-21";

const days = {
  palace: {
    area: "Gwanghwamun · Seochon · Insadong",
    title: "Palaces, Seochon and Insadong",
    summary: "Start at the palace, eat in Seochon and continue east through Insadong.",
    moments: [
      ["Morning", "Gwanghwamun and Gyeongbokgung", "Begin at Gwanghwamun Square and enter the palace near opening time. Gyeongbokgung normally closes on Tuesdays, so confirm the operating calendar before fixing this day."],
      ["Lunch", "Seochon", "Exit toward the west side for lunch in Seochon. Keeping lunch outside the palace gates prevents an unnecessary subway trip."],
      ["Afternoon", "Insadong and nearby cultural lanes", "Travel east once, then browse craft shops, galleries and tea houses around Insadong at an unhurried pace."],
      ["Evening", "Ikseon-dong or Cheonggyecheon", "Finish in Ikseon-dong for dinner. If energy remains, add a short Cheonggyecheon walk rather than another attraction across town."]
    ],
    route: "Gwanghwamun → Gyeongbokgung → Seochon → Insadong → Ikseon-dong",
    rain: "Start at the National Palace Museum, spend more time indoors in Insadong and keep the outdoor walk short."
  },
  center: {
    area: "Namdaemun · Myeongdong · Namsan",
    title: "Markets, Myeongdong and Namsan",
    summary: "Move from Namdaemun to Myeongdong, then finish at Namsan.",
    moments: [
      ["Morning", "Namdaemun Market", "Arrive before the busiest part of the day, browse with a specific snack or meal in mind and avoid treating every aisle as mandatory."],
      ["Lunch", "Myeongdong", "Walk or take one short transit hop to Myeongdong for lunch, shopping and a flexible indoor break."],
      ["Afternoon", "Namsan approach", "Choose the cable car, bus or walking route based on weather and mobility. Save enough energy to enjoy the view."],
      ["Evening", "N Seoul Tower area or Euljiro", "Stay for the view when visibility is good. In poor conditions, return to central Seoul for dinner around Euljiro instead."]
    ],
    route: "Namdaemun → Myeongdong → Namsan → central Seoul dinner",
    rain: "Stay indoors around Myeongdong and visit Namsan only if the sky clears."
  },
  northwest: {
    area: "Yeonnam · Mangwon · Hongdae",
    title: "Yeonnam, Mangwon and Hongdae",
    summary: "Spend the day in northwest Seoul, from quiet morning streets to a lively evening.",
    moments: [
      ["Morning", "Yeonnam-dong", "Start with coffee and a walk near Gyeongui Line Forest Park while the neighborhood is still relatively calm."],
      ["Lunch", "Mangwon Market", "Move west for a market lunch. Pick a few dishes instead of waiting at every popular stall."],
      ["Afternoon", "Mangwon and the neighborhood streets", "Browse small shops or pause in a cafe. A river detour is optional and should depend on weather and walking energy."],
      ["Evening", "Hongdae", "Return toward Hongdae for dinner, live music, shopping or nightlife. Ending here avoids a late cross-city transfer between attractions."]
    ],
    route: "Yeonnam-dong → Gyeongui Line Forest Park → Mangwon Market → Hongdae",
    rain: "Build the day around cafes, object shops, galleries and the covered market, then shorten the park section."
  },
  seongsu: {
    area: "Seoul Forest · Seongsu · Ttukseom",
    title: "Seongsu and Seoul Forest",
    summary: "Pair Seongsu's shops and cafes with nearby Seoul Forest.",
    moments: [
      ["Morning", "Seoul Forest", "Use the cooler, quieter part of the day for the park. Choose one loop rather than trying to cover every section."],
      ["Lunch", "Seongsu", "Walk into Seongsu for lunch and select a compact cluster of cafes, design stores or current pop-ups."],
      ["Afternoon", "Seongsu design streets", "Leave room for discoveries, but set a stopping point; pop-up queues can consume the afternoon without improving the trip."],
      ["Evening", "Ttukseom or Seongsu dinner", "Add the river only in comfortable weather. Otherwise stay in Seongsu for dinner and an easy return."]
    ],
    route: "Seoul Forest → Seongsu streets → optional Ttukseom Hangang Park",
    rain: "Spend most of the day in cafes and indoor shops, then visit the park between showers."
  },
  yongsan: {
    area: "Ichon · Yongsan · Hannam · Itaewon",
    title: "Museums, Hannam and Itaewon",
    summary: "Start at the National Museum, then move north to Hannam and Itaewon.",
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
    title: "Bongeunsa, COEX and Gangnam",
    summary: "Keep the whole day south of the river and avoid an extra trip back north.",
    moments: [
      ["Morning", "Bongeunsa Temple", "Begin outside before the commercial district becomes busy. Keep voices low and remember that this remains an active religious site."],
      ["Lunch", "COEX", "Cross into COEX for lunch and an easy indoor break."],
      ["Afternoon", "Starfield Library and Samseong", "See the library, shops or aquarium according to interest. Pick one paid indoor attraction rather than stacking several."],
      ["Evening", "Gangnam dinner", "Move west only for dinner or nightlife. Avoid adding Jamsil simply because it is also south of the river."]
    ],
    route: "Bongeunsa → COEX → Starfield Library → Gangnam evening",
    rain: "Stay inside COEX and visit Bongeunsa during a dry window."
  },
  jamsil: {
    area: "Seokchon · Jamsil · Songridan-gil",
    title: "Seokchon Lake and Jamsil",
    summary: "Mix a lake walk, a large indoor complex and an optional skyline view.",
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
    seoTitle: "2-Day Seoul Itinerary for First-Time Visitors",
    cardTitle: "Seoul essentials",
    description: "A practical two-day Seoul itinerary grouping Gyeongbokgung, Insadong, Namdaemun, Myeongdong and Namsan into two efficient central days.",
    lede: "Two days is enough for Seoul's historic center, major markets, Myeongdong and Namsan. Save Hongdae, Seongsu and Gangnam for another trip.",
    facts: [
      ["Best for", "A first visit or short stop"],
      ["Daily pace", "Balanced, 3–4 main stops"],
      ["Best base", "Jongno, Euljiro or Myeongdong"],
      ["What it skips", "Outer districts"]
    ],
    dayKeys: ["palace", "center"],
    overview: "Day one covers Gwanghwamun, Seochon and Insadong. Day two stays around Namdaemun, Myeongdong and Namsan. Both avoid long subway rides.",
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
    seoTitle: "3-Day Seoul Itinerary for First-Time Visitors",
    cardTitle: "First-trip balance",
    description: "A three-day Seoul itinerary covering the palaces, Myeongdong, Namsan, Hongdae, Yeonnam and Mangwon.",
    lede: "Three days is enough to see Seoul's historic center, classic skyline and one distinctly local-feeling district without turning every day into a race across the subway map.",
    facts: [
      ["Best for", "A first Seoul trip"],
      ["Daily pace", "Balanced with one late night"],
      ["Best base", "Central Seoul or Hongdae"],
      ["Route rule", "One part of Seoul per day"]
    ],
    dayKeys: ["palace", "center", "northwest"],
    overview: "Days one and two cover the historic and central essentials. Day three gives northwest Seoul enough room to feel like a neighborhood rather than a quick evening photo stop.",
    callout: "Do not pair Hongdae with Gangnam or Jamsil. The trip across the city takes too much time.",
    adjustments: [
      ["Early departure", "Move Hongdae to the second evening and shorten the third day to Yeonnam and Mangwon."],
      ["Food priority", "Keep market portions small enough to leave room for a seated dinner in each district."],
      ["Rainy day", "Use the central day for shopping and museums, then place the palace route on the clearest forecast."]
    ]
  },
  {
    days: 4,
    slug: "seoul-4-day-itinerary",
    kicker: "Four days without rushing",
    title: "A realistic 4-day Seoul itinerary",
    seoTitle: "4-Day Seoul Itinerary for First-Time Visitors",
    cardTitle: "Seoul beyond the essentials",
    description: "A practical four-day Seoul itinerary covering royal Seoul, Myeongdong, Namsan, Hongdae, Yeonnam, Mangwon, Seongsu and Seoul Forest by area.",
    lede: "Four days gives a first-time visitor time for historic Seoul, a skyline evening, Hongdae and a full Seongsu day.",
    facts: [
      ["Best for", "A rounded first visit"],
      ["Daily pace", "Balanced, with flexible evenings"],
      ["Best base", "Jongno, Euljiro or Myeongdong"],
      ["Range", "History, markets and creative Seoul"]
    ],
    dayKeys: ["palace", "center", "northwest", "seongsu"],
    overview: "The first two days cover royal and central Seoul. Day three keeps Yeonnam, Mangwon and Hongdae together, while day four gives Seoul Forest and Seongsu enough time to work as a real neighborhood day rather than a quick cafe stop.",
    callout: "A day trip will replace one Seoul day. Choose it only if the DMZ, Suwon or another destination matters more.",
    adjustments: [
      ["History priority", "Replace Seongsu with a museum-led Yongsan day or spend more time in the palace district."],
      ["Shopping priority", "Keep Myeongdong and Seongsu, then shorten the market stops instead of adding another retail district."],
      ["Rainy forecast", "Use the central or Seongsu day for the wettest weather and protect the palace morning for the clearest forecast."]
    ],
    publishedDate: "2026-09-07"
  },
  {
    days: 5,
    slug: "seoul-5-day-itinerary",
    kicker: "Old Seoul and the creative city",
    title: "A practical 5-day Seoul itinerary",
    seoTitle: "5-Day Seoul Itinerary: Old and New Seoul",
    cardTitle: "Old and new Seoul",
    description: "A realistic five-day Seoul itinerary with the historic core, Namsan, Hongdae, Seongsu, Seoul Forest, Yongsan museums and Itaewon.",
    lede: "Five days covers the historic center, Hongdae, Seongsu, Yongsan museums and an Itaewon evening without rushing across town.",
    facts: [
      ["Best for", "A complete first visit"],
      ["Daily pace", "Balanced with free time"],
      ["Best base", "Jongno, Euljiro or Myeongdong"],
      ["Range", "History, design, parks and museums"]
    ],
    dayKeys: ["palace", "center", "northwest", "seongsu", "yongsan"],
    overview: "Start with historic and central Seoul. Then visit the northwest, Seongsu and a museum route from Yongsan to Itaewon.",
    callout: "Do not add a day trip automatically. Replace a Seoul day only when the destination is a real priority.",
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
    seoTitle: "7-Day Seoul Itinerary: A Complete First Visit",
    cardTitle: "The complete city week",
    description: "A seven-day Seoul itinerary covering Jongno, Myeongdong, Hongdae, Seongsu, Yongsan, Gangnam and Jamsil without inefficient cross-city days.",
    lede: "A full week makes room for Seoul's different centers. This route moves from royal neighborhoods to independent northwest streets, design districts, museums and the modern city south of the river.",
    facts: [
      ["Best for", "A deep first visit"],
      ["Daily pace", "Balanced, with flexible evenings"],
      ["Best base", "Central Seoul or a split stay"],
      ["Coverage", "North, south, east and west"]
    ],
    dayKeys: ["palace", "center", "northwest", "seongsu", "yongsan", "gangnam", "jamsil"],
    overview: "The first five days cover historic Seoul, the center, the northwest, Seongsu and Yongsan. Gangnam and Jamsil get separate days because they are not close enough to combine comfortably.",
    callout: "Do not fill every evening. Seoul's distances, stairs and weather make a slower night useful.",
    adjustments: [
      ["Add a day trip", "Replace either Gangnam or Jamsil instead of squeezing a day trip between them."],
      ["Split stay", "Use three or four nights centrally and the remainder near Hongdae only if luggage movement is worth the saved transfers."],
      ["Slower day", "Start late in Jamsil or Seongsu and choose one outdoor stop and one indoor stop."]
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

function routeLinks(route) {
  return route.split(" → ").map((stop, index) => {
    const url = `https://map.naver.com/p/search/${encodeURIComponent(`${stop} 서울`)}`;
    return `<li><a href="${url}" target="_blank" rel="noopener" data-place-map="${stop}"><span>${index + 1}</span>${stop}</a></li>`;
  }).join("");
}

function dayMarkup(day, index) {
  return `<section class="itinerary-day" id="day-${index + 1}">
    <div class="day-heading">
      <div class="day-number" aria-hidden="true">${index + 1}</div>
      <div><span>${day.area}</span><h3>Day ${index + 1}: ${day.title}</h3><p>${day.summary}</p></div>
    </div>
    <div class="time-grid">
      ${day.moments.map(([part, title, text]) => `<article><small>${part}</small><h4>${title}</h4><p>${text}</p></article>`).join("\n      ")}
    </div>
    <div class="route-line"><strong>Open each stop in Naver Maps</strong><ol class="stops" aria-label="Day ${index + 1} stop order">${routeLinks(day.route)}</ol></div>
    <p class="rain-note"><strong>Rain fallback:</strong> ${day.rain}</p>
  </section>`;
}

function guideCards(currentSlug) {
  return guides.map(guide => `<a class="guide-card" href="${guide.slug}.html"${guide.slug === currentSlug ? ' aria-current="page"' : ""}><span>${guide.days} days</span><h3>${guide.cardTitle}</h3><p>${guide.description}</p><strong>${guide.slug === currentSlug ? "Current guide" : "See the route →"}</strong></a>`).join("\n        ");
}

function page(guide) {
  const routeDays = guide.dayKeys.map(key => days[key]);
  const canonical = `${siteBase}/${guide.slug}.html`;
  const articleSchema = {
    "@id": `${canonical}#article`,
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    image: siteImage,
    datePublished: guide.publishedDate || publishedDate,
    dateModified: modifiedDate,
    inLanguage: "en",
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    author: { "@type": "Organization", name: "Korea RouteCheck", url: `${siteBase}/` },
    publisher: { "@type": "Organization", name: "Korea RouteCheck", url: `${siteBase}/` },
    about: { "@type": "Place", name: "Seoul, South Korea" },
    hasPart: routeDays.map((day, index) => ({ "@type": "TouristTrip", name: `Day ${index + 1}: ${day.title}`, touristType: "First-time visitors to Seoul" }))
  };
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      articleSchema,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteBase}/` },
          { "@type": "ListItem", position: 2, name: "Seoul itineraries", item: `${siteBase}/#guides` },
          { "@type": "ListItem", position: 3, name: `${guide.days}-day Seoul itinerary`, item: canonical }
        ]
      }
    ]
  };

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${guide.seoTitle} | Korea RouteCheck</title>
  <meta name="description" content="${guide.description}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <meta name="theme-color" content="#132e37">
  <meta property="og:title" content="${guide.title}">
  <meta property="og:description" content="${guide.description}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="https://korearoutecheck-ux.github.io/korea-routecheck/assets/seoul-han-river.webp">
  <meta property="og:image:width" content="1800">
  <meta property="og:image:height" content="1000">
  <meta property="og:image:alt" content="Seoul skyline along the Han River">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="favicon.svg?v=krc1" type="image/svg+xml">
  <link rel="stylesheet" href="styles.css?v=20260921-seo1">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body class="guide-page" data-guide="${guide.slug}">
  <a class="skip-link" href="#main-content">Skip to content</a>
  <header class="site-header">
    <a class="brand" href="index.html" aria-label="Korea RouteCheck home"><img class="brand-mark" src="favicon.svg?v=krc1" width="44" height="44" alt=""><span>Korea RouteCheck</span></a>
    <nav aria-label="Primary navigation"><a href="index.html#planner">Planner</a><a href="index.html#guides">Itineraries</a><a href="index.html#where-to-eat">Where to eat</a><a href="seoul-tours.html">Tours</a><a href="index.html#planning-guides">Travel guides</a></nav>
  </header>

  <main id="main-content">
    <section class="guide-hero">
      <div class="guide-hero-copy">
        <div class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><a href="index.html#guides">Seoul itineraries</a><span>/</span><span>${guide.days} days</span></div>
        <p class="eyebrow">${guide.kicker}</p>
        <h1>${guide.title}</h1>
        <p class="hero-lede">${guide.lede}</p>
        <div class="hero-actions"><a class="button button-primary" href="index.html#planner">Customize this itinerary</a><span class="microcopy">Free · No sign-up</span></div>
        <ul class="trip-chips"><li>${guide.days} neighborhood days</li><li>Rain alternatives</li><li>First-visit friendly</li></ul>
        <p class="editorial-note"><span>Locally reviewed · September 2026</span><a href="about.html">How recommendations are checked</a></p>
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
      <aside class="guide-toc" aria-label="On this page"><strong>On this page</strong><a href="#overview">Plan overview</a><a href="#plan">Day-by-day plan</a><a href="#adjustments">Adjustments</a><a href="#affiliate-booking">Food and tours</a><a href="#sources">Current details</a></aside>
      <article class="guide-content">
        <section class="guide-intro" id="overview">
          <p class="eyebrow">Plan overview</p>
          <h2>Why this ${guide.days}-day itinerary works</h2>
          <p>${guide.overview}</p>
          <div class="guide-callout"><strong>One thing to skip</strong><p>${guide.callout}</p></div>
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

        <aside class="booking-panel" id="affiliate-booking">
          <div><p class="eyebrow">Food and tours</p><h3>Add only what improves the day.</h3><p>Find a meal near the route, or compare guided activities when local context would help.</p></div>
          <div class="booking-links"><a href="where-to-eat-seoul-by-budget.html">See restaurants by budget <span>→</span></a><a href="seoul-tours.html">Choose a Seoul tour type <span>→</span></a><a data-affiliate="experiences" href="#">Browse all Seoul activities <span>→</span></a></div>
        </aside>

        <section class="source-section" id="sources">
          <p class="eyebrow">Check before traveling</p>
          <h2>Verify current details</h2>
          <p>Hours, closures, reservations and prices change. Check the source before visiting.</p>
          <ul class="source-list">${sources.map(([title, url]) => `<li><a href="${url}" target="_blank" rel="noopener">${title}</a></li>`).join("\n")}</ul>
          <a class="editorial-link" href="about.html">Read our review process →</a>
        </section>
      </article>
    </div>

    <section class="guide-switcher" id="guides">
      <div class="section-heading"><p class="eyebrow">More itineraries</p><h2>Choose another trip length</h2><p>Pick the guide that matches your full days in Seoul.</p></div>
      <div class="guide-card-grid">${guideCards(guide.slug)}</div>
    </section>
  </main>

  <footer>
    <div><strong>Korea RouteCheck</strong><p>Practical Seoul itineraries and travel guides.</p></div>
    <div class="footer-links"><a href="index.html#planner">Planner</a><a href="where-to-eat-seoul-by-budget.html">Where to eat</a><a href="seoul-tours.html">Tour guides</a><a href="about.html">About</a><a href="disclosure.html">Affiliate disclosure</a><a href="privacy.html">Privacy</a></div>
    <p class="copyright">© <span id="year"></span> Korea RouteCheck. Verify current travel information before booking.</p>
  </footer>
  <script src="config.js?v=20260921-seo1"></script>
  <script src="analytics.js?v=20260920"></script>
  <script src="app.js?v=20260921-seo1"></script>
</body>
</html>`;
}

for (const guide of guides) {
  await writeFile(join(root, `${guide.slug}.html`), page(guide), "utf8");
}

console.log(`Built ${guides.length} itinerary pages.`);
