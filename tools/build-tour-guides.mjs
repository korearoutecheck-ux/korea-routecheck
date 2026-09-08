import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const siteBase = "https://korearoutecheck-ux.github.io/korea-routecheck";
const siteImage = `${siteBase}/assets/seoul-han-river.webp`;
const publishedDate = "2026-09-08";
const modifiedDate = "2026-09-08";

const guides = [
  {
    slug: "seoul-food-tours-guide",
    label: "Seoul food tours",
    kicker: "Markets, tastings and cooking classes",
    title: "Seoul food tours: how to choose the right one",
    seoTitle: "Seoul Food Tours: How to Choose the Right One",
    description: "Compare Seoul food tours, market tastings, cooking classes and private food experiences by neighborhood, timing, inclusions and dietary fit.",
    lede: "The best choice depends less on the number of tastings and more on where the tour goes, what is included and how it fits the rest of the day.",
    chips: ["Market tours", "Cooking classes", "Private options"],
    facts: [["Best first taste", "Gwangjang market tour"], ["Most hands-on", "Cooking class"], ["Time to allow", "About 2–4 hours"], ["Check closely", "Food and dietary fit"]],
    note: "Do not choose from photos alone. Confirm how many tastings are included, whether they replace a full meal, the group size and the exact meeting point.",
    sections: [
      { id: "compare", eyebrow: "Tour formats", title: "Four common Seoul food experiences", intro: "Each format solves a different travel problem.", cards: [
        ["Gwangjang Market tasting tour", "A straightforward first introduction to Korean market food. Look for several included tastings, a small group and clear guidance on whether drinks are included."],
        ["Multi-market walking tour", "Useful for comparing neighborhoods and food styles, but check the walking and transit involved. More locations do not automatically mean a better experience."],
        ["Cooking class", "Best for travelers who want to learn techniques and sit down for a structured meal. Check whether a market visit, recipe materials and dietary substitutions are included."],
        ["Private or customized tour", "The most flexible option for families, dietary needs or specific dishes. Confirm whether the price is per person or per group before comparing value."]
      ]},
      { id: "choose", eyebrow: "Choose by traveler", title: "Which food tour fits the trip?", intro: "Use the rest of the itinerary to narrow the choice.", cards: [
        ["First evening in Seoul", "Choose a central market or neighborhood walk with an easy meeting point. Avoid a late finish after a long-haul arrival."],
        ["Solo traveler", "A small-group tasting or cooking class provides conversation without committing an entire day to a group itinerary."],
        ["Vegetarian or allergy concerns", "Use only listings that explain substitutions clearly. Send the operator a written question before booking rather than assuming every stop can adapt."],
        ["Repeat visitor", "Skip the broad introduction and choose a focused class, neighborhood tour or private experience built around a specific dish."]
      ]},
      { id: "check", eyebrow: "Before booking", title: "Read these details first", intro: "Small listing details determine whether the experience is convenient or frustrating.", cards: [
        ["Included food", "Check whether samples add up to lunch or dinner, and whether alcohol or extra purchases are optional."],
        ["Start and end points", "A tour ending near Jongno, Euljiro or Myeongdong can connect easily to an evening plan. Confirm instead of guessing."],
        ["Group size", "Smaller groups usually move through crowded markets more easily and allow more time for questions."],
        ["Cancellation terms", "Check the weather policy and the deadline for changing plans, especially during Seoul's summer rain season."]
      ]},
      { id: "timing", eyebrow: "Itinerary fit", title: "Where to place it in the itinerary", intro: "Treat the experience as the main meal and activity for that part of the day.", cards: [
        ["Central market tour", "Pair it with Jongno, Dongdaemun or Cheonggyecheon rather than crossing the city for another major stop."],
        ["Cooking class", "Keep the surrounding half-day light. Shopping or a nearby cafe works better than another timed attraction."],
        ["Evening food tour", "Eat a small lunch and leave the following morning flexible if the tour includes alcohol or a late finish."],
        ["Independent alternative", "Use the restaurant guide when the goal is simply a good meal rather than guided context or a social activity."]
      ]}
    ],
    affiliateKey: "foodTours",
    affiliateLabel: "Compare Seoul food tours",
    sources: [["Seoul food tours — Viator", "https://www.viator.com/Seoul-tours/Food-Tours/d973-g6-c80"], ["Gwangjang Market tours and visitor information — Viator", "https://www.viator.com/Seoul-attractions/Gwangjang-Market/d973-a9453"], ["Visit Seoul official travel guide", "https://english.visitseoul.net/"]]
  },
  {
    slug: "dmz-tours-from-seoul-guide",
    label: "DMZ tours",
    kicker: "Access, timing and tour formats",
    title: "DMZ tours from Seoul: what to check before booking",
    seoTitle: "DMZ Tours from Seoul: What to Check Before Booking",
    description: "Compare DMZ tours from Seoul by route, duration, group size, physical demands, identification rules and optional stops before booking.",
    lede: "DMZ listings often sound similar, but their pickup points, return times, included stops and physical demands can be very different.",
    chips: ["Standard group tours", "Private options", "Access can change"],
    facts: [["Best for", "Modern Korean history"], ["Time to allow", "Most of a day"], ["Bring", "Required passport or ID"], ["Never assume", "JSA access is included"]],
    note: "Military access and permitted routes can change with little notice. Verify the exact itinerary, identification requirement and cancellation policy with the operator shortly before departure.",
    sections: [
      { id: "route", eyebrow: "Typical route", title: "What a standard DMZ tour may include", intro: "Read the stop list rather than relying on the tour title.", cards: [
        ["Imjingak Park", "A common first stop with memorials and exhibits connected to Korea's division. Some tours spend substantial time here before controlled-area access."],
        ["Third Infiltration Tunnel", "A major stop on many itineraries. The descent and return can be physically demanding, so check accessibility and walking requirements."],
        ["Dora Observatory", "A viewing point toward North Korea. Visibility depends on weather, haze and operating conditions."],
        ["Optional additions", "Suspension bridges, defector talks and other stops can extend the day. Decide whether the extra context is worth the later return."]
      ]},
      { id: "choose", eyebrow: "Tour formats", title: "Choose the level of structure", intro: "The right format depends on budget, mobility and how much explanation matters.", cards: [
        ["Standard group tour", "Usually the simplest value choice. Compare meeting points, shopping stops, group size and the advertised return time."],
        ["Small group or specialist guide", "Useful when historical explanation and time for questions matter more than finding the lowest price."],
        ["Private tour", "Adds flexible pickup and more direct attention, but controlled-area timing may still limit how customizable the day can be."],
        ["Tour with extra bridge stop", "Adds scenery and walking but can make a supposedly short tour last most of the day. Check the final drop-off time."]
      ]},
      { id: "check", eyebrow: "Booking checklist", title: "Questions the listing should answer", intro: "If a listing is vague on one of these points, ask before paying.", cards: [
        ["Which identification is required?", "Follow the operator's instructions exactly and bring the original document requested for the travel date."],
        ["Is the JSA actually included?", "Panmunjeom and the JSA are separate from the standard DMZ circuit and may be unavailable. Do not infer access from promotional photographs."],
        ["How strenuous is the Third Tunnel?", "Check slope, distance and alternatives for anyone with mobility, heart or respiratory concerns."],
        ["What happens if access changes?", "Read whether the operator substitutes another stop, changes the schedule or offers cancellation when restrictions intervene."]
      ]},
      { id: "timing", eyebrow: "Plan the day", title: "Protect the rest of the itinerary", intro: "Return times can shift, so the Seoul evening should remain simple.", cards: [
        ["Night before", "Keep the evening moderate when the tour has an early meeting time."],
        ["Tour evening", "Plan dinner near the advertised drop-off area and avoid a timed show or reservation immediately after the tour."],
        ["Weather", "Rain may not cancel every tour, while fog can reduce observatory views. Pack for exposed areas and follow operator notices."],
        ["Short Seoul trip", "With only two or three full days, book the DMZ only when it is a major priority because it replaces a full Seoul neighborhood day."]
      ]}
    ],
    affiliateKey: "dmzTours",
    affiliateLabel: "Compare DMZ tours from Seoul",
    sources: [["Demilitarized Zone tours — VisitKorea", "https://english.visitkorea.or.kr/svc/contents/contentsView.do?vcontsId=139771"], ["Panmunjeom visitor information — VisitKorea", "https://english.visitkorea.or.kr/svc/contents/contentsView.do?vcontsId=107338"], ["DMZ tours and tickets — Viator", "https://www.viator.com/Seoul-attractions/DMZ/d973-a8969"]]
  },
  {
    slug: "seoul-night-tours-guide",
    label: "Seoul night tours",
    kicker: "Markets, skyline views and evening walks",
    title: "Seoul night tours: choose the right evening experience",
    seoTitle: "Seoul Night Tours: Choose the Right Evening Experience",
    description: "Compare Seoul night tours including market walks, skyline viewpoints, Han River experiences and private evening tours by timing and neighborhood.",
    lede: "A good night tour should make Seoul easier after dark—not leave the traveler stranded far from the hotel after an overpacked day.",
    chips: ["Food and markets", "Night views", "Han River"],
    facts: [["Best first night", "Food and central views"], ["Best clear weather", "Skyline viewpoint"], ["Check closely", "Final drop-off"], ["Avoid", "Two late nights in a row"]],
    note: "Seoul's transit is excellent, but return times and meeting points still matter late at night. Confirm where the tour ends and how the route returns to the hotel.",
    sections: [
      { id: "compare", eyebrow: "Tour formats", title: "Four ways to see Seoul at night", intro: "Choose the experience that adds something the daytime itinerary cannot.", cards: [
        ["Food and market walk", "Combines dinner with cultural explanation. It works best when the food is included and the route stays within one central area."],
        ["Night-view walking tour", "Good for city walls, hilltop viewpoints and photography. Check elevation, stairs and how much of the route is outdoors."],
        ["Han River cruise or river tour", "Best in clear weather for skyline views. Check boarding location, cruise duration and whether transport to the pier is included."],
        ["Private evening tour", "Useful for families, mobility needs or a specific photo route. Confirm the vehicle, included admissions and per-group pricing."]
      ]},
      { id: "choose", eyebrow: "Choose by schedule", title: "Match the tour to the day", intro: "The daytime route should determine the evening—not the other way around.", cards: [
        ["After a Jongno day", "A Gwangjang, Euljiro or city-wall route keeps the evening central and limits another long subway ride."],
        ["After a Yeouido day", "A Han River or skyline-focused experience can extend the same area without repeating central Seoul."],
        ["After Gangnam or Jamsil", "Choose a south-side viewpoint or local evening rather than returning north for a second major route."],
        ["On arrival day", "Use only a short, flexible option when flight delays and fatigue could make a fixed departure stressful."]
      ]},
      { id: "check", eyebrow: "Before booking", title: "Details that change the experience", intro: "Night tours become inconvenient when logistics are vague.", cards: [
        ["Exact end point", "Find the nearest subway station and last practical connection before booking."],
        ["Food and drinks", "Check whether tastings replace dinner, whether alcohol is included and whether non-drinkers have alternatives."],
        ["Weather policy", "Confirm what happens to cruises, outdoor viewpoints and photo stops in rain, fog or strong wind."],
        ["Walking demands", "Hill routes can involve stairs and steep streets even when the total distance looks short."]
      ]},
      { id: "independent", eyebrow: "Do it yourself", title: "When a tour is unnecessary", intro: "Many Seoul evenings are easy to enjoy independently.", cards: [
        ["Simple riverside walk", "A familiar subway route and one riverside destination do not require a guide."],
        ["Restaurant-focused evening", "Use the dining guide when the main goal is a particular meal rather than history or group interaction."],
        ["Shopping night", "Myeongdong, Hongdae and major malls are straightforward without a tour when opening hours are checked."],
        ["Already confident on transit", "Book only when the guide, access or included experience adds value beyond transportation."]
      ]}
    ],
    affiliateKey: "nightTours",
    affiliateLabel: "Compare Seoul night tours",
    sources: [["Seoul night tours — Viator", "https://www.viator.com/Seoul-tours/Night-Tours/d973-g12-c96"], ["Hangang parks guide — Seoul Metropolitan Government", "https://english.seoul.go.kr/service/amusement/hangang/hangang-parks/"], ["Visit Seoul official travel guide", "https://english.visitseoul.net/"]]
  },
  {
    slug: "gyeongbokgung-palace-tour-guide",
    label: "Gyeongbokgung tours",
    kicker: "Guided, self-guided and hanbok options",
    title: "Gyeongbokgung Palace tour or self-guided visit?",
    seoTitle: "Gyeongbokgung Palace Tour or Self-Guided Visit?",
    description: "Decide between a Gyeongbokgung Palace tour and a self-guided visit, including free official tours, hanbok experiences and combined Seoul routes.",
    lede: "Gyeongbokgung is easy to enter independently. A paid tour is most useful when historical explanation, photography or a wider guided route matters.",
    chips: ["Self-guided visits", "History tours", "Hanbok options"],
    facts: [["Best flexibility", "Self-guided visit"], ["Best context", "Specialist guide"], ["Time to allow", "At least 2 hours"], ["Check first", "Closure and tour schedule"]],
    note: "Gyeongbokgung's operating days, admission rules and guided-tour schedules can change. Check the official palace website before fixing the itinerary.",
    sections: [
      { id: "compare", eyebrow: "The basic choice", title: "Self-guided and guided visits compared", intro: "Both can work well for a first trip.", cards: [
        ["Self-guided visit", "Best for flexible timing, photography and travelers comfortable reading signs or using an audio resource. Arrive near opening for a calmer start."],
        ["Official guided tour", "Check the palace's current language schedule. This can add useful context without committing to a larger city tour."],
        ["Paid palace specialist", "Worth considering for deeper history, more time for questions or a small private group."],
        ["Combined city tour", "Useful when transportation and several landmarks matter, but read the timetable to make sure the palace is not reduced to a rushed photo stop."]
      ]},
      { id: "formats", eyebrow: "Experience types", title: "What paid options usually add", intro: "Choose the extra that matters rather than buying the longest itinerary.", cards: [
        ["Palace and Bukchon walk", "Adds neighborhood context but involves more walking and residential-area etiquette."],
        ["Palace, Insadong and market route", "Convenient for a first central-Seoul day when the sequence and meal stop are sensible."],
        ["Hanbok rental or photography", "Best when the clothing or photographs are the purpose. Check rental time, hair accessories, image delivery and weather terms."],
        ["Private city tour", "Offers flexibility and easier questions, but compare the number of meaningful stops with the time spent in a vehicle."]
      ]},
      { id: "check", eyebrow: "Booking checklist", title: "Avoid a disappointing palace tour", intro: "A strong listing should answer these points clearly.", cards: [
        ["Which palace is visited?", "Some tours substitute Changdeokgung on Gyeongbokgung's regular closure day. Make sure that works for the trip."],
        ["How long is actually inside?", "A full-day tour title does not reveal how much time is spent at the palace."],
        ["Are tickets included?", "Check admission, hanbok rental, photography and museum entry separately."],
        ["Where does the tour finish?", "An Insadong or Myeongdong finish may connect well to the next plan; another location may add an unnecessary transfer."]
      ]},
      { id: "route", eyebrow: "Build the day", title: "A practical central-Seoul sequence", intro: "Keep the palace inside one compact neighborhood day.", cards: [
        ["Morning", "Gwanghwamun Square and Gyeongbokgung Palace."],
        ["Lunch", "Walk west toward Seochon or eat east toward Anguk depending on the afternoon route."],
        ["Afternoon", "Choose Insadong and Ikseon-dong, or Samcheong-dong and a carefully timed Bukchon visit."],
        ["Evening", "Finish near Jongno or Cheonggyecheon rather than adding Gangnam or Jamsil."]
      ]}
    ],
    affiliateKey: "palaceTours",
    affiliateLabel: "Compare Gyeongbokgung Palace tours",
    sources: [["Gyeongbokgung Palace official visitor information", "https://royal.khs.go.kr/ENG/contents/E702000000.do"], ["Gyeongbokgung Palace tours and tickets — Viator", "https://www.viator.com/Seoul-attractions/Gyeongbokgung-Palace/d973-a5004"], ["Visit Seoul official travel guide", "https://english.visitseoul.net/"]]
  }
];

function sectionMarkup(section) {
  return `<section class="decision-section" id="${section.id}"><p class="eyebrow">${section.eyebrow}</p><h2>${section.title}</h2><p>${section.intro}</p><div class="decision-grid">${section.cards.map(([title, text]) => `<article><h3>${title}</h3><p>${text}</p></article>`).join("\n")}</div></section>`;
}

function relatedMarkup(currentSlug) {
  return guides.map(guide => `<a class="guide-card tour-guide-card" href="${guide.slug}.html"${guide.slug === currentSlug ? ' aria-current="page"' : ""}><span>Tour guide</span><h3>${guide.label}</h3><p>${guide.description}</p><strong>${guide.slug === currentSlug ? "Current guide" : "Compare options →"}</strong></a>`).join("\n");
}

function page(guide) {
  const canonical = `${siteBase}/${guide.slug}.html`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": `${canonical}#article`, "@type": "Article", headline: guide.title,
        description: guide.description, image: siteImage, datePublished: publishedDate,
        dateModified: modifiedDate, inLanguage: "en",
        mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
        author: { "@type": "Organization", name: "Korea RouteCheck", url: `${siteBase}/` },
        publisher: { "@type": "Organization", name: "Korea RouteCheck", url: `${siteBase}/` },
        about: { "@type": "Place", name: "Seoul, South Korea" }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteBase}/` },
          { "@type": "ListItem", position: 2, name: "Seoul tour guides", item: `${siteBase}/#tour-guides` },
          { "@type": "ListItem", position: 3, name: guide.label, item: canonical }
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
  <meta name="theme-color" content="#10213d">
  <meta property="og:title" content="${guide.title}">
  <meta property="og:description" content="${guide.description}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonical}">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="styles.css?v=20260908">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body class="guide-page" data-guide="${guide.slug}">
  <a class="skip-link" href="#main-content">Skip to content</a>
  <header class="site-header"><a class="brand" href="index.html" aria-label="Korea RouteCheck home"><span class="brand-mark" aria-hidden="true">路</span><span>Korea RouteCheck</span></a><nav aria-label="Primary navigation"><a href="index.html#planner">Planner</a><a href="index.html#guides">Itineraries</a><a href="index.html#where-to-eat">Where to eat</a><a href="index.html#tour-guides">Tours</a><a href="index.html#planning-guides">Travel guides</a></nav></header>
  <main id="main-content">
    <section class="guide-hero"><div class="guide-hero-copy"><div class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><a href="index.html#tour-guides">Tour guides</a><span>/</span><span>${guide.label}</span></div><p class="eyebrow">${guide.kicker}</p><h1>${guide.title}</h1><p class="hero-lede">${guide.lede}</p><div class="hero-actions"><a class="button button-primary" href="#${guide.sections[0].id}">Compare options</a><a class="text-link" href="index.html#planner">Build an itinerary</a></div><ul class="trip-chips">${guide.chips.map(chip => `<li>${chip}</li>`).join("")}</ul><p class="editorial-note"><span>Locally reviewed · September 2026</span><a href="about.html">How recommendations are checked</a></p></div><figure class="guide-hero-media"><img src="assets/seoul-han-river.webp" width="1800" height="1000" alt="Seoul skyline stretching along the Han River" fetchpriority="high"><figcaption>Seoul across the Han River. Public-domain image via <a href="https://commons.wikimedia.org/wiki/File:Han_River_Seoul_skyline_Pixabay_1214950.jpg" target="_blank" rel="noopener">Wikimedia Commons</a>.</figcaption></figure></section>
    <section class="guide-facts" aria-label="Guide summary">${guide.facts.map(([label, value]) => `<article><small>${label}</small><strong>${value}</strong></article>`).join("\n")}</section>
    <div class="guide-layout"><aside class="guide-toc" aria-label="On this page"><strong>On this page</strong>${guide.sections.map(section => `<a href="#${section.id}">${section.title}</a>`).join("")}<a href="#affiliate-booking">Compare bookings</a><a href="#sources">Sources</a></aside><article class="guide-content"><div class="guide-callout"><strong>Keep in mind</strong><p>${guide.note}</p></div>${guide.sections.map(sectionMarkup).join("\n")}
      <aside class="booking-panel" id="affiliate-booking"><div><p class="eyebrow">Compare current options</p><h3>${guide.affiliateLabel}.</h3><p>Check the exact itinerary, inclusions, recent reviews and cancellation terms before booking. Affiliate bookings may support Korea RouteCheck at no extra cost.</p></div><div class="booking-links"><a data-affiliate="${guide.affiliateKey}" href="#">${guide.affiliateLabel} <span>→</span></a></div></aside>
      <section class="source-section" id="sources"><p class="eyebrow">Research sources</p><h2>Check current details</h2><p>Availability, access, prices and operator terms change. Recheck the original source before paying.</p><ul class="source-list">${guide.sources.map(([title, url]) => `<li><a href="${url}" target="_blank" rel="noopener">${title}</a></li>`).join("\n")}</ul><a class="editorial-link" href="about.html">Read our review process →</a></section>
    </article></div>
    <section class="guide-switcher" id="related"><div class="section-heading"><p class="eyebrow">More comparisons</p><h2>Other Seoul tour guides</h2><p>Choose the experience that fits the itinerary.</p></div><div class="guide-card-grid planning-guide-grid">${relatedMarkup(guide.slug)}</div></section>
  </main>
  <footer><div><strong>Korea RouteCheck</strong><p>Practical Seoul itineraries and travel guides.</p></div><div class="footer-links"><a href="index.html#planner">Planner</a><a href="index.html#guides">Itineraries</a><a href="index.html#tour-guides">Tour guides</a><a href="where-to-eat-seoul-by-budget.html">Where to eat</a><a href="about.html">About</a><a href="disclosure.html">Affiliate disclosure</a><a href="privacy.html">Privacy</a></div><p class="copyright">© <span id="year"></span> Korea RouteCheck. Verify current travel information before booking.</p></footer>
  <script src="config.js?v=20260908"></script><script src="analytics.js?v=20260908"></script><script src="app.js?v=20260908"></script>
</body>
</html>`;
}

for (const guide of guides) await writeFile(join(root, `${guide.slug}.html`), page(guide), "utf8");
console.log(`Built ${guides.length} commercial-intent tour guides.`);
