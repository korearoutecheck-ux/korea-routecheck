import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));
const siteBase = "https://korearoutecheck-ux.github.io/korea-routecheck";
const canonical = `${siteBase}/where-to-eat-seoul-by-budget.html`;

const groups = [
  {
    id: "budget",
    eyebrow: "Most mains under ₩15,000",
    title: "Quick, affordable meals",
    intro: "Good choices for a simple lunch or dinner near a sightseeing route.",
    restaurants: [
      {
        name: "Goobok Mandu",
        area: "Yongsan",
        food: "Dumplings",
        price: "₩8,500–₩9,500",
        note: "A small dumpling shop near Sookmyung Women's University Station. Go for steamed dumplings, pot stickers or xiaolongbao.",
        map: "https://map.naver.com/p/entry/place/36432841",
        mapId: "goobok-mandu",
        michelin: "https://guide.michelin.com/kr/en/seoul-capital-area/kr-seoul/restaurant/goobok-mandu"
      },
      {
        name: "Myeongdong Kyoja",
        area: "Myeongdong",
        food: "Kalguksu and dumplings",
        price: "₩12,000–₩13,000",
        note: "A famous central stop with a short menu. It is easy to add to a Myeongdong or Namsan day, but queues are common.",
        map: "https://map.naver.com/p/entry/place/11592650",
        mapId: "myeongdong-kyoja",
        michelin: "https://guide.michelin.com/kr/en/seoul-capital-area/kr-seoul/restaurant/myeongdong-kyoja"
      },
      {
        name: "Nongmin Baekam Sundae",
        area: "Gangnam",
        food: "Sundae-guk and boiled pork",
        price: "₩11,000–₩13,000",
        note: "A busy local soup restaurant in Daechi-dong. It works best as a dedicated meal stop rather than a quick snack.",
        map: "https://map.naver.com/p/entry/place/13149768",
        mapId: "nongmin-baekam-sundae"
      }
    ]
  },
  {
    id: "mid-range",
    eyebrow: "About ₩15,000–₩30,000",
    title: "Well-known local favorites",
    intro: "A little more room in the budget adds several long-running Seoul institutions.",
    restaurants: [
      {
        name: "Okdongsik",
        area: "Mapo",
        food: "Pork gomtang",
        price: "₩15,000 for the standard bowl",
        note: "A focused pork-soup restaurant near Hapjeong. Add it to a Hongdae, Yeonnam or Mangwon day and expect a possible wait.",
        map: "https://map.naver.com/p/entry/place/859857359",
        mapId: "okdongsik",
        michelin: "https://guide.michelin.com/kr/en/seoul-capital-area/kr-seoul/restaurant/okdongsik"
      },
      {
        name: "Jeongin Myeonok",
        area: "Yeouido",
        food: "Pyongyang-style cold noodles",
        price: "Many meals ₩15,000–₩22,000",
        note: "A practical meal stop for a Yeouido or Han River day. The mild broth is very different from sweet or spicy cold noodles.",
        map: "https://map.naver.com/p/entry/place/34883067",
        mapId: "jeongin-myeonok"
      },
      {
        name: "Hadongkwan",
        area: "Myeongdong",
        food: "Beef gomtang",
        price: "₩18,000–₩30,000",
        note: "A long-running gomtang restaurant that opens early and closes after lunch. Check the same-day hours before building the route around it.",
        map: "https://map.naver.com/p/entry/place/11679353",
        mapId: "hadongkwan",
        michelin: "https://guide.michelin.com/kr/en/seoul-capital-area/kr-seoul/restaurant/hadongkwan"
      }
    ]
  },
  {
    id: "splurge",
    eyebrow: "Shared dishes and splurges",
    title: "Prices that depend on the order",
    intro: "These restaurants can be affordable or expensive depending on whether the table orders a single meal, a shared pot or barbecue.",
    restaurants: [
      {
        name: "Somunnan Seongsu Gamjatang",
        area: "Seongsu",
        food: "Pork-bone soup",
        price: "₩12,000–₩15,000 meals; pots from ₩32,000",
        note: "Open around the clock when checked. Choose a single bowl for one person or a larger pot to share after a Seongsu day.",
        map: "https://map.naver.com/p/entry/place/11721256",
        mapId: "somunnan-seongsu"
      },
      {
        name: "Buchon Yukhoe",
        area: "Gwangjang Market",
        food: "Yukhoe and rice bowls",
        price: "From ₩11,000; yukhoe about ₩23,000",
        note: "A popular choice inside the Gwangjang Market area. Raw beef is the specialty, while rice bowls offer a lower-cost option.",
        map: "https://map.naver.com/p/entry/place/36428555",
        mapId: "buchon-yukhoe"
      },
      {
        name: "Bongpiyang",
        area: "Jamsil",
        food: "Cold noodles and Korean barbecue",
        price: "Noodles from ₩16,000; barbecue ₩39,000+",
        note: "Use it as a noodle stop or spend more on barbecue. The Bangi location fits a Jamsil, Seokchon Lake or Lotte World day.",
        map: "https://map.naver.com/p/entry/place/11861413",
        mapId: "bongpiyang"
      }
    ]
  }
];

const restaurants = groups.flatMap(group => group.restaurants);
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${canonical}#article`,
      headline: "Where to eat in Seoul by budget",
      description: "Nine popular Seoul restaurants grouped by budget and neighborhood, with current Naver Maps links and practical route advice.",
      image: `${siteBase}/assets/seoul-han-river.webp`,
      datePublished: "2026-09-07",
      dateModified: "2026-09-08",
      inLanguage: "en",
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      author: { "@type": "Organization", name: "Korea RouteCheck", url: `${siteBase}/` }
    },
    {
      "@type": "ItemList",
      name: "Popular Seoul restaurants by budget",
      numberOfItems: restaurants.length,
      itemListElement: restaurants.map((restaurant, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: { "@type": "Place", name: restaurant.name, url: restaurant.map }
      }))
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteBase}/` },
        { "@type": "ListItem", position: 2, name: "Where to eat in Seoul", item: canonical }
      ]
    }
  ]
};

function restaurantCard(restaurant) {
  return `<article class="restaurant-card">
    <div class="restaurant-card-top"><span>${restaurant.area}</span><strong>${restaurant.price}</strong></div>
    <h3>${restaurant.name}</h3>
    <p class="restaurant-food">${restaurant.food}</p>
    <p>${restaurant.note}</p>
    <div class="restaurant-links"><a href="${restaurant.map}" target="_blank" rel="noopener" data-map-link="${restaurant.mapId}">Open in Naver Maps →</a>${restaurant.michelin ? `<a href="${restaurant.michelin}" target="_blank" rel="noopener">Michelin Guide</a>` : ""}</div>
  </article>`;
}

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Where to Eat in Seoul by Budget: 9 Popular Restaurants | Korea RouteCheck</title>
  <meta name="description" content="Nine popular Seoul restaurants grouped by budget and neighborhood, with Naver Maps links, current menu ranges and nearby itinerary ideas.">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <meta name="theme-color" content="#10213d">
  <meta property="og:title" content="Where to eat in Seoul by budget">
  <meta property="og:description" content="Nine popular restaurant picks with current menu ranges and Naver Maps links.">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonical}">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="styles.css?v=20260907b">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body class="guide-page dining-guide" data-guide="where-to-eat-seoul-by-budget">
  <a class="skip-link" href="#main-content">Skip to content</a>
  <header class="site-header"><a class="brand" href="index.html" aria-label="Korea RouteCheck home"><span class="brand-mark" aria-hidden="true">路</span><span>Korea RouteCheck</span></a><nav aria-label="Primary navigation"><a href="index.html#planner">Planner</a><a href="index.html#guides">Itineraries</a><a href="index.html#where-to-eat">Where to eat</a><a href="index.html#planning-guides">Travel guides</a></nav></header>
  <main id="main-content">
    <section class="guide-hero dining-guide-hero">
      <div class="guide-hero-copy"><div class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><span>Where to eat</span></div><p class="eyebrow">Checked September 2026</p><h1>Where to eat in Seoul by budget</h1><p class="hero-lede">Nine popular restaurants that fit naturally into a Seoul itinerary. Prices below are current menu guides, not guarantees.</p><div class="hero-actions"><a class="button button-primary" href="#budget">Browse restaurants</a><a class="text-link" href="index.html#planner">Build an itinerary</a></div><p class="editorial-note"><span>Locally reviewed · September 2026</span><a href="about.html">How recommendations are checked</a></p></div>
      <figure class="guide-hero-media"><img src="assets/seoul-han-river.webp" width="1800" height="1000" alt="Seoul skyline along the Han River" fetchpriority="high"><figcaption>Seoul across the Han River. Public-domain image via <a href="https://commons.wikimedia.org/wiki/File:Han_River_Seoul_skyline_Pixabay_1214950.jpg" target="_blank" rel="noopener">Wikimedia Commons</a>.</figcaption></figure>
    </section>
    <section class="guide-facts" aria-label="Restaurant guide summary"><article><small>Price groups</small><strong>3</strong></article><article><small>Restaurants</small><strong>9</strong></article><article><small>Map source</small><strong>Naver Maps</strong></article><article><small>Areas</small><strong>Across Seoul</strong></article></section>
    <div class="restaurant-guide-content">
      <aside class="price-note"><strong>How prices work</strong><p>The ranges reflect menu listings checked in September 2026. A single bowl can be inexpensive even when shared dishes or barbecue cost much more.</p></aside>
      ${groups.map(group => `<section class="restaurant-group" id="${group.id}"><p class="eyebrow">${group.eyebrow}</p><h2>${group.title}</h2><p>${group.intro}</p><div class="restaurant-grid">${group.restaurants.map(restaurantCard).join("\n")}</div></section>`).join("\n")}
      <aside class="booking-panel" id="affiliate-booking"><div><p class="eyebrow">Want more context?</p><h3>Compare Seoul food tours.</h3><p>A good tour can help with markets, ordering and local food history. Booking through an affiliate link may support Korea RouteCheck at no extra cost.</p></div><div class="booking-links"><a data-affiliate="foodTours" href="#">Compare Seoul food tours <span>→</span></a></div></aside>
      <section class="source-section" id="sources"><p class="eyebrow">Before visiting</p><h2>Check the listing again</h2><p>Restaurants can change prices, hours, branches and queue systems. Open the Naver Maps link before leaving, and make sure the name and branch match this guide.</p><a class="editorial-link" href="about.html">Read our review process →</a></section>
    </div>
  </main>
  <footer><div><strong>Korea RouteCheck</strong><p>Practical Seoul itineraries and travel guides.</p></div><div class="footer-links"><a href="index.html#planner">Planner</a><a href="index.html#guides">Itineraries</a><a href="about.html">About</a><a href="disclosure.html">Affiliate disclosure</a><a href="privacy.html">Privacy</a></div><p class="copyright">© <span id="year"></span> Korea RouteCheck. Verify current travel information before booking.</p></footer>
  <script src="config.js?v=20260907b"></script><script src="analytics.js?v=20260907b"></script><script src="app.js?v=20260907b"></script>
</body>
</html>`;

await writeFile(join(root, "where-to-eat-seoul-by-budget.html"), html, "utf8");
console.log("Built Seoul dining guide.");
