import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));
const siteBase = "https://korearoutecheck-ux.github.io/korea-routecheck";
const imageCredit = `<figure class="guide-hero-media"><img src="assets/seoul-han-river.webp" width="1800" height="1000" alt="Seoul skyline stretching along the Han River" fetchpriority="high"><figcaption>Seoul across the Han River. Public-domain image via <a href="https://commons.wikimedia.org/wiki/File:Han_River_Seoul_skyline_Pixabay_1214950.jpg" target="_blank" rel="noopener">Wikimedia Commons</a>.</figcaption></figure>`;

const guides = [
  {
    slug: "rainy-day-seoul-itinerary",
    label: "Rainy-day Seoul",
    kicker: "A weather-proof city day",
    title: "A rainy-day Seoul itinerary that still feels like Seoul",
    description: "A practical rainy-day Seoul itinerary with indoor neighborhood clusters in Jamsil, Yongsan and COEX, plus a full-day plan that avoids wet cross-city transfers.",
    lede: "Rain should change the shape of a Seoul day, not erase it. The strongest plan chooses one indoor-heavy district, limits exposed transfers and keeps one flexible outdoor window instead of chasing clear weather across the city.",
    chips: ["One indoor district", "Short exposed transfers", "Budget alternatives"],
    facts: [["Best all-day cluster", "Jamsil"], ["Best low-cost anchor", "National Museum"], ["Best compact backup", "COEX"], ["Main mistake", "Cross-city venue hopping"]],
    note: "Do not prepay for a skyline view when heavy cloud is forecast. Move the observatory decision to the end of the day and use the aquarium, museum or shopping complex as the reliable anchor.",
    sections: [
      { id: "route", eyebrow: "The complete route", title: "A full indoor day in Jamsil", intro: "Jamsil works because the main attractions connect through one large complex. The day stays useful in sustained rain and can still include a short lake walk if conditions improve.", cards: [
        ["Morning", "Start inside Lotte World Mall. Choose the aquarium or the indoor theme park as the main paid attraction; trying to do both usually makes the day expensive and rushed."],
        ["Lunch", "Eat inside the complex or cross toward Songridan-gil only during a lighter rain window. Keep the meal near the afternoon plan rather than treating lunch as another destination."],
        ["Afternoon", "Use shopping, cafes, an exhibition or the attraction not chosen in the morning. Build in one unstructured hour so queues do not break the entire schedule."],
        ["Evening", "Check visibility before buying an observatory ticket. If the skyline is hidden, finish with dinner and save Seoul Sky for a clearer day."]
      ]},
      { id: "alternatives", eyebrow: "Choose by budget", title: "Two strong alternatives", intro: "A rainy day does not need to mean a mall. These clusters work when museum time or a lower-cost day fits the trip better.", cards: [
        ["Yongsan and Ichon", "Anchor the day at the National Museum of Korea, whose permanent collection has free general admission. Eat nearby, then continue to an indoor space in Yongsan or Hannam rather than crossing to Gangnam."],
        ["Samseong and COEX", "Use COEX, Starfield Library and one paid indoor attraction as a compact route. Visit Bongeunsa only during a short dry interval and avoid adding Jamsil merely because both are south of the river."],
        ["Central Seoul", "Use the Seoul Museum of History, an extended lunch, covered shopping and a market stop. This option costs less, but it requires more short outdoor connections than Jamsil or COEX."]
      ]},
      { id: "prepare", eyebrow: "Make the day easier", title: "Rain-day decisions that matter", intro: "The problem is rarely the rain itself. Wet shoes, long transfers and rigid reservations are what make the day deteriorate.", cards: [
        ["Protect feet first", "A compact umbrella helps, but waterproof footwear or spare socks usually matters more during a full walking day."],
        ["Avoid peak transfers", "Move after the morning rush and before the evening rush when possible. Crowded stations are slower and more tiring when everyone is carrying wet umbrellas."],
        ["Keep one movable booking", "Make only one time-sensitive reservation. Everything else should be able to move by an hour if the forecast briefly improves."],
        ["Recheck closures", "Heavy rain can affect outdoor areas, visibility and special operations. Verify same-day information directly before leaving the hotel."]
      ]}
    ],
    sources: [["Visit Seoul rainy-day recommendations", "https://english.visitseoul.net/jamsilarea/travelingwithchildren/ENN033222"], ["National Museum of Korea visitor information", "https://www.museum.go.kr/ENG/contents/E0101000000.do"], ["Visit Seoul attractions guide", "https://english.visitseoul.net/attractions"]]
  },
  {
    slug: "seoul-solo-travel-guide",
    label: "Seoul solo travel",
    kicker: "Independent without feeling isolated",
    title: "Seoul for solo travelers: where to stay, eat and explore",
    description: "A practical Seoul solo travel guide covering the easiest neighborhoods, comfortable solo dining, a one-day route, safety basics and ways to meet other travelers.",
    lede: "Seoul is well suited to independent travel: transit is extensive, many days work without reservations and cafes create natural pauses. The better solo plan combines easy navigation with one or two optional social moments.",
    chips: ["Easy navigation", "Solo-friendly meals", "Optional group activities"],
    facts: [["Easiest first base", "Central Seoul or Hongdae"], ["Best quiet solo day", "Jongno"], ["Best social evening", "Hongdae"], ["Tourist help", "1330 helpline"]],
    note: "Solo travel does not require filling every evening with a tour or meetup. Book a group activity only where it adds access, context or companionship that would be difficult to create alone.",
    sections: [
      { id: "base", eyebrow: "Choose the right base", title: "Three neighborhoods that simplify a solo trip", intro: "The ideal base depends on whether the trip prioritizes sightseeing, late evenings or the lowest-friction airport connection.", cards: [
        ["Jongno or Euljiro", "Best for palaces, traditional neighborhoods and central transit. It is efficient for early sightseeing and easier to return to before a late solo walk becomes tiring."],
        ["Hongdae or Yeonnam", "Best for airport-rail convenience, cafes and a social evening atmosphere. It is less convenient for repeated palace mornings but works well for a first or final night."],
        ["Myeongdong", "Best for a straightforward first visit, central shopping and abundant hotel choices. The neighborhood is convenient rather than intimate, which can be useful on a short solo trip."]
      ]},
      { id: "route", eyebrow: "A complete solo day", title: "Jongno at a flexible pace", intro: "This route is easy to shorten, extend or pause without affecting another traveler. It also provides a mix of public sights, cafes and active streets.", cards: [
        ["Morning", "Start at Gwanghwamun and Gyeongbokgung near opening time. Confirm the palace calendar because Gyeongbokgung normally closes on Tuesdays."],
        ["Lunch", "Walk into Seochon and choose a counter-seat restaurant, casual set meal or market-style lunch. Arriving before the main rush reduces pressure when dining alone."],
        ["Afternoon", "Move east through Insadong, galleries and tea houses. These are natural solo spaces where a pause does not feel like unused itinerary time."],
        ["Evening", "Finish in Ikseon-dong or Cheonggyecheon. If a more social evening matters, return to the hotel first and make Hongdae a deliberate second outing."]
      ]},
      { id: "practical", eyebrow: "Comfort and safety", title: "Small habits that make solo travel easier", intro: "Seoul is navigable, but the same big-city habits still apply—especially after the last trains, in nightlife areas and when a phone battery is low.", cards: [
        ["Plan the return", "Check the final train before a late evening and keep enough battery for navigation. Use an official taxi app or clearly marked taxi when rail service has ended."],
        ["Save essential numbers", "Police is 112, fire and ambulance is 119, and the Korea Tourism Organization's multilingual 1330 service can help travelers with tourism questions."],
        ["Use social activities selectively", "Food tours, cooking classes and guided day trips can add natural conversation. Choose one or two rather than outsourcing the whole trip to group bookings."],
        ["Trust the atmosphere", "Move away from any venue, sales approach or interaction that creates pressure. A legitimate activity does not require a traveler to surrender a passport or make an immediate transfer."]
      ]}
    ],
    sources: [["Visit Seoul solo Hongdae guide", "https://english.visitseoul.net/editorspicks/hongdae/ENN12shly"], ["Visit Seoul transportation guide", "https://english.visitseoul.net/transportation"], ["Korea Tourism Organization and 1330 helpline", "https://english.visitkorea.or.kr/svc/main/index.do"]]
  },
  {
    slug: "first-day-in-seoul",
    label: "First day in Seoul",
    kicker: "An arrival day that respects reality",
    title: "Your first day in Seoul: a plan for every arrival time",
    description: "A first-day Seoul plan organized by morning, afternoon and evening arrival, with airport transfer, luggage, jet lag and neighborhood-based route advice.",
    lede: "The first day should create orientation, not exhaustion. Immigration, baggage, the airport transfer and hotel access often consume more time than expected, so the best plan starts near the accommodation and keeps every attraction optional.",
    chips: ["Arrival-time options", "Jet-lag aware", "No rigid reservations"],
    facts: [["First priority", "Reach the hotel area"], ["Best activity", "A neighborhood walk"], ["Booking rule", "Keep the evening flexible"], ["Avoid", "A cross-city checklist"]],
    note: "Treat the scheduled landing time as the beginning of airport processing—not the time the Seoul itinerary starts. A comfortable plan leaves a wide buffer before any reservation.",
    sections: [
      { id: "arrival", eyebrow: "Choose by arrival time", title: "Three realistic versions of day one", intro: "Use the version based on the time the traveler reaches the hotel neighborhood, not the flight's published arrival time.", cards: [
        ["At the hotel before noon", "Leave luggage, eat nearby and take a calm central route such as Gwanghwamun to Insadong. Stop after one major attraction if the overnight flight begins to catch up."],
        ["At the hotel from noon to 4 p.m.", "Choose one neighborhood anchor: Myeongdong and Namsan, Hongdae and Yeonnam, or Jongno and Ikseon-dong. Make sunset optional rather than a timed obligation."],
        ["At the hotel after 4 p.m.", "Skip formal sightseeing. Walk the hotel neighborhood, buy transit essentials, eat a proper meal and prepare the next morning's route."],
        ["Very late arrival", "Use the most direct available transfer, confirm late check-in and go directly to the accommodation. Do not plan an airport meal as a substitute for checking transport cutoffs."]
      ]},
      { id: "checklist", eyebrow: "Before sightseeing", title: "The arrival checklist", intro: "Completing a few practical tasks early prevents repeated stops and confused purchases during the first full day.", cards: [
        ["Confirm connectivity", "Connect a working eSIM, SIM or roaming plan before leaving the airport or while using reliable Wi-Fi. Navigation and hotel communication are more valuable than immediate social posting."],
        ["Set up local navigation", "Save the accommodation address in Korean and install a Korea-friendly map app. Screenshot the route in case the connection drops underground."],
        ["Handle transit simply", "Buy or load the transit product that matches the actual trip. Do not overbuy a pass before confirming how many days and airport segments it covers."],
        ["Check tomorrow", "Confirm the next morning's opening day, reservation and weather before sleeping. Palace closures and rain are easier to solve the night before."]
      ]},
      { id: "neighborhood", eyebrow: "Stay close", title: "Match the first walk to the hotel", intro: "A good first evening should end close to where it began. These short routes provide atmosphere without a complicated return.", cards: [
        ["Jongno", "Gwanghwamun Square → Cheonggyecheon → Ikseon-dong."],
        ["Myeongdong", "Myeongdong streets → Namdaemun edge → central dinner."],
        ["Hongdae", "Yeonnam-dong → Gyeongui Line Forest Park → Hongdae evening."],
        ["Gangnam or Jamsil", "Stay south of the river: COEX and Bongeunsa area, or Seokchon Lake and Songridan-gil."]
      ]}
    ],
    sources: [["Incheon Airport railroad guide", "https://www.airport.kr/ap_en/1512/subview.do"], ["Visit Seoul first-time visitor guide", "https://english.visitseoul.net/mvp/IfyouvisitSeoulforthefirsttime/ENN036597"], ["Visit Seoul transportation guide", "https://english.visitseoul.net/transportation"]]
  },
  {
    slug: "incheon-airport-to-seoul-guide",
    label: "Incheon Airport arrival",
    kicker: "From the terminal to the right neighborhood",
    title: "Incheon Airport to Seoul: choose the right transfer",
    description: "An Incheon Airport arrival guide comparing AREX express and all-stop trains, airport buses and taxis by luggage, landing time and Seoul neighborhood.",
    lede: "There is no universally best airport transfer. The fastest train can still be inconvenient for a hotel far from Seoul Station, while a bus can be the simplest option when it stops close to the accommodation.",
    chips: ["Terminal 1 and 2", "Train, bus or taxi", "Late-arrival fallback"],
    facts: [["Best for Seoul Station", "AREX Express"], ["Best for Hongdae", "AREX all-stop"], ["Best for heavy luggage", "Direct bus or taxi"], ["Late arrivals", "Check same-day service"]],
    note: "Check the official airport and operator information on the travel date. Fares, boarding locations, first and last services, traffic and route availability can change.",
    sections: [
      { id: "terminal", eyebrow: "Before leaving the airport", title: "A calm arrival sequence", intro: "Finish the airport tasks in an order that keeps documents secure and avoids carrying luggage back through the terminal.", cards: [
        ["1. Immigration and bags", "Complete entry procedures and collect baggage before making a fixed transfer purchase. Delays can make a tightly timed ticket unhelpful."],
        ["2. Connectivity", "Activate a phone connection and save the hotel address in Korean. Use official airport Wi-Fi if the eSIM or SIM needs troubleshooting."],
        ["3. Cash and payment", "Withdraw or exchange only what is needed for the first day, then compare rates later. Keep at least one backup payment method separate."],
        ["4. Find the correct terminal stop", "Terminal 1 and Terminal 2 have different rail and bus boarding points. Follow airport signs instead of assuming the route begins on the arrivals level."]
      ]},
      { id: "compare", eyebrow: "The transport decision", title: "Train, bus or taxi?", intro: "Choose based on the final hotel connection, not the airport segment alone.", cards: [
        ["AREX Express", "Best when Seoul Station is the destination or the onward transfer is simple. Reserved seating and limited stops can make the airport segment comfortable, but a difficult final subway transfer cancels much of that advantage."],
        ["AREX all-stop train", "Best for Hongdae and useful for connections along the airport line. It costs less than the express but has more stops and can be crowded with luggage."],
        ["Airport limousine bus", "Best when a current route stops near the hotel, especially in Myeongdong, central Seoul, Gangnam or Jamsil. Road traffic makes arrival time less predictable."],
        ["Official taxi", "Best for groups, heavy luggage, children or late arrivals. Use official taxi queues and confirm the destination; tolls and traffic affect the final cost."]
      ]},
      { id: "location", eyebrow: "Choose by destination", title: "The simplest default by neighborhood", intro: "These are decision starting points, not fixed rules. The hotel's exact location can change the best answer within the same district.", cards: [
        ["Hongdae or Yeonnam", "Start by comparing the AREX all-stop train with a direct bus. The rail connection is usually the most straightforward when the accommodation is near Hongik University Station."],
        ["Myeongdong, Jongno or Euljiro", "Compare an airport bus that stops near the hotel against AREX plus one central transfer. Heavy luggage favors the option with less walking."],
        ["Gangnam, Jamsil or COEX", "A direct airport bus can reduce transfers, while a taxi becomes more competitive for several travelers. Rail often requires a longer final connection."],
        ["Outside standard service hours", "Check the airport's late-night transport page on the day. If regular services have ended, use an official late-night option or taxi rather than improvising at the curb."]
      ]}
    ],
    sources: [["Incheon Airport railroad guide", "https://www.airport.kr/ap_en/1512/subview.do"], ["Incheon Airport bus ticket information", "https://www.airport.kr/ap_en/1503/subview.do"], ["Incheon Airport late-night buses", "https://www.airport.kr/ap_en/1510/subview.do"], ["Incheon inter-terminal transportation", "https://www.airport.kr/ap_en/1525/subview.do"]]
  },
  {
    slug: "best-seoul-neighborhoods-first-time",
    label: "Seoul neighborhoods",
    kicker: "Choose a base before choosing a hotel",
    title: "Best Seoul neighborhoods for first-time visitors",
    description: "A first-time Seoul neighborhood guide comparing Jongno, Myeongdong, Hongdae, Itaewon, Gangnam, Jamsil and Seongsu by sightseeing, nightlife and airport convenience.",
    lede: "The best neighborhood is the one that reduces travel to the places that matter most. For a short first visit, central Seoul usually wins; for a longer trip, airport convenience, nightlife or a specific south-of-the-river focus can justify another base.",
    chips: ["Seven neighborhoods", "Clear tradeoffs", "Short-trip recommendations"],
    facts: [["Best overall first base", "Jongno or Myeongdong"], ["Best for nightlife", "Hongdae"], ["Best for modern Seoul", "Gangnam or Jamsil"], ["Best for design", "Seongsu"]],
    note: "A famous neighborhood is not automatically a practical base. Compare the hotel to the nearest useful station, airport connection and the first three full-day routes before booking.",
    sections: [
      { id: "central", eyebrow: "The easiest first choices", title: "Central Seoul", intro: "These areas place palaces, markets, Myeongdong and Namsan within short transit distances and work especially well for two- to five-day visits.", cards: [
        ["Jongno", "Best for history, early palace starts and traditional neighborhoods. The tradeoff is a quieter late-night atmosphere in some pockets and hotel quality that varies block by block."],
        ["Myeongdong", "Best for convenience, shopping, central transit and a straightforward first arrival. The tradeoff is a commercial atmosphere with less neighborhood intimacy."],
        ["Euljiro", "Best for central positioning, restaurants and access to several subway lines. The tradeoff is that older commercial streets can feel less immediately legible than Myeongdong."]
      ]},
      { id: "character", eyebrow: "Choose a stronger personality", title: "Neighborhoods with a specific advantage", intro: "These bases work when their defining strength matters enough to accept longer trips to other parts of Seoul.", cards: [
        ["Hongdae and Yeonnam", "Best for airport-rail access, nightlife, cafes and a younger social atmosphere. Expect longer trips to Gangnam and some central sights."],
        ["Itaewon and Hannam", "Best for international dining, museums and evening variety. Hills and less direct access to some major sights are the tradeoffs."],
        ["Seongsu", "Best for design, cafes, pop-ups and repeat visitors. It is not the most efficient first base for a palace-heavy itinerary."],
        ["Gangnam or Jamsil", "Best for travelers focused on modern Seoul, shopping, events or south-of-the-river appointments. Central sightseeing days require more transit."]
      ]},
      { id: "choose", eyebrow: "Make the final choice", title: "A quick decision rule", intro: "Use the actual itinerary rather than a generic ranking.", cards: [
        ["Two or three days", "Choose Jongno, Euljiro or Myeongdong unless the trip has one dominant purpose elsewhere."],
        ["Four or five days", "Central Seoul remains the safest default, while Hongdae becomes attractive when airport convenience and nightlife matter."],
        ["Six or seven days", "Consider a central base or a split stay only when moving luggage saves several repeated long transfers."],
        ["Late arrival or early flight", "Airport access can outweigh atmosphere for the first or final night. Do not let that single night determine the whole stay."]
      ]}
    ],
    sources: [["Visit Seoul official guide", "https://english.visitseoul.net/"], ["Visit Seoul attractions guide", "https://english.visitseoul.net/attractions"], ["Visit Seoul transportation guide", "https://english.visitseoul.net/transportation"], ["Visit Seoul local neighborhood picks", "https://english.visitseoul.net/editorspicks"]]
  },
  {
    slug: "best-day-trips-from-seoul",
    label: "Seoul day trips",
    kicker: "Leave the city for the right reason",
    title: "Best day trips from Seoul: which one fits your trip?",
    description: "Compare the best Seoul day trips—including Suwon, the DMZ, Nami Island, the Garden of Morning Calm and Incheon—by independence, travel effort and interest.",
    lede: "A day trip should add something Seoul cannot provide, not merely fill a free day. The right choice depends on whether the traveler wants history, divided-Korea context, scenery, seasonal gardens or an easy independent outing.",
    chips: ["Independent and guided options", "Realistic tradeoffs", "First-trip priorities"],
    facts: [["Best independent trip", "Suwon"], ["Best guided context", "DMZ"], ["Best seasonal scenery", "Gapyeong"], ["Easiest urban change", "Incheon"]],
    note: "DMZ access, routes and required identification can change. Book only through a reputable operator, carry the required passport or identification and verify the exact itinerary shortly before departure.",
    sections: [
      { id: "compare", eyebrow: "The shortlist", title: "Five realistic day-trip choices", intro: "Each option earns the full day for a different reason. Avoid combining destinations simply because package tours advertise them together.", cards: [
        ["Suwon Hwaseong", "Best for an independent history-and-food day. Walk a manageable section of the UNESCO-listed fortress, visit the temporary palace area and finish around Haengnidan-gil."],
        ["DMZ", "Best for modern history and geopolitical context. A guided format is usually the practical choice because access and permitted stops are controlled and can change."],
        ["Nami Island and Garden of Morning Calm", "Best for seasonal landscapes, couples and photography. The route takes more coordination independently, so a combined tour can reduce transfer friction."],
        ["Incheon", "Best for an independent urban change of pace. Choose Chinatown, the open-port area, Wolmido or Songdo rather than trying to cover the entire city."],
        ["Korean Folk Village", "Best for traditional architecture, demonstrations and family-oriented cultural context. Check the performance calendar before choosing the travel day."]
      ]},
      { id: "choose", eyebrow: "Choose by traveler", title: "Which trip fits best?", intro: "The most popular option is not always the most valuable addition to the itinerary.", cards: [
        ["First visit with only four Seoul days", "Usually keep the day in Seoul unless the DMZ or Suwon is a major personal priority."],
        ["History-focused traveler", "Choose Suwon for independence and built heritage; choose the DMZ for recent history and guided interpretation."],
        ["Scenery-focused traveler", "Choose Gapyeong when foliage, flowers or winter illumination aligns with the season. Poor weather reduces much of the value."],
        ["Traveler avoiding tours", "Suwon and Incheon are the clearest independent options. Build a single-city route and keep the return flexible."],
        ["Family group", "Compare the Korean Folk Village, Suwon and seasonal Gapyeong attractions based on walking tolerance and the children's interests."]
      ]},
      { id: "booking", eyebrow: "Book carefully", title: "Day-trip booking rules", intro: "A day outside Seoul introduces more dependency on weather, operating conditions and transport timing.", cards: [
        ["Read the exact inclusions", "Check admission, meals, pickup location and return time. Similar tour titles can conceal very different stops."],
        ["Protect the next morning", "Do not schedule a late-return day trip before an early flight, palace reservation or another long excursion."],
        ["Check cancellation terms", "Weather and access restrictions matter most for the DMZ and outdoor seasonal trips. Know what happens when an advertised stop closes."],
        ["Use the return location", "A tour ending in Myeongdong or Hongdae can be useful only if it matches the evening plan. Otherwise, the advertised convenience becomes another transfer."]
      ]}
    ],
    sources: [["Suwon Hwaseong Fortress — VisitKorea", "https://english.visitkorea.or.kr/svc/contents/contentsView.do?vcontsId=94415"], ["Gyeonggi-do day-trip recommendations", "https://english.visitkorea.or.kr/svc/contents/infoHtmlView.do?vcontsId=193799"], ["Garden of Morning Calm — VisitKorea", "https://english.visitkorea.or.kr/svc/contents/contentsView.do?vcontsId=110690"], ["Korean Folk Village — VisitKorea", "https://english.visitkorea.or.kr/svc/contents/contentsView.do?vcontsId=111995"], ["Incheon Airport transit-tour examples", "https://www.airport.kr/ap_en/1471/subview.do"]]
  }
];

const related = guides.map(({ slug, label, description }) => ({ slug, label, description }));

function sectionMarkup(section) {
  return `<section class="decision-section" id="${section.id}"><p class="eyebrow">${section.eyebrow}</p><h2>${section.title}</h2><p>${section.intro}</p><div class="decision-grid">${section.cards.map(([title, text]) => `<article><h3>${title}</h3><p>${text}</p></article>`).join("\n")}</div></section>`;
}

function relatedMarkup(currentSlug) {
  return related.filter(item => item.slug !== currentSlug).slice(0, 3).map(item => `<a class="guide-card" href="${item.slug}.html"><span>Planning guide</span><h3>${item.label}</h3><p>${item.description}</p><strong>Read the guide →</strong></a>`).join("\n");
}

function page(guide) {
  const canonical = `${siteBase}/${guide.slug}.html`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    mainEntityOfPage: canonical,
    author: { "@type": "Organization", name: "Korea RouteCheck" },
    publisher: { "@type": "Organization", name: "Korea RouteCheck" },
    about: { "@type": "Place", name: "Seoul, South Korea" }
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
  <header class="site-header"><a class="brand" href="index.html" aria-label="Korea RouteCheck home"><span class="brand-mark" aria-hidden="true">路</span><span>Korea RouteCheck</span></a><nav aria-label="Primary navigation"><a href="index.html#planner">Planner</a><a href="index.html#guides">Itineraries</a><a href="#related">Planning guides</a></nav></header>
  <main id="top">
    <section class="guide-hero"><div class="guide-hero-copy"><div class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><a href="index.html#planning-guides">Planning guides</a><span>/</span><span>${guide.label}</span></div><p class="eyebrow">${guide.kicker}</p><h1>${guide.title}</h1><p class="hero-lede">${guide.lede}</p><div class="hero-actions"><a class="button button-primary" href="index.html#planner">Build a Seoul itinerary</a><span class="microcopy">Free · No account required</span></div><ul class="trip-chips">${guide.chips.map(chip => `<li>${chip}</li>`).join("")}</ul></div>${imageCredit}</section>
    <section class="guide-facts" aria-label="Guide summary">${guide.facts.map(([label, value]) => `<article><small>${label}</small><strong>${value}</strong></article>`).join("\n")}</section>
    <div class="guide-layout"><aside class="guide-toc" aria-label="On this page"><strong>On this page</strong>${guide.sections.map(section => `<a href="#${section.id}">${section.title}</a>`).join("")}<a href="#booking">Booking shortcuts</a><a href="#sources">Official sources</a></aside><article class="guide-content"><div class="guide-callout"><strong>The key decision</strong><p>${guide.note}</p></div>${guide.sections.map(sectionMarkup).join("\n")}
      <aside class="booking-panel" id="booking"><div><p class="eyebrow">Optional booking shortcut</p><h3>Compare activities that fit this plan.</h3><p>Use the route first, then book only the experience that adds real value. Affiliate relationships are disclosed clearly.</p></div><div class="booking-links"><a data-affiliate="experiences" href="#">Compare Seoul experiences <span>→</span></a><a data-affiliate="esim" href="#">Set up a Korea eSIM <span>→</span></a></div></aside>
      <section class="source-section" id="sources"><p class="eyebrow">Check before traveling</p><h2>Official sources</h2><p>Transport, access, hours and operating conditions change. Verify current details directly before spending money or restructuring a day.</p><ul class="source-list">${guide.sources.map(([title, url]) => `<li><a href="${url}" target="_blank" rel="noopener">${title}</a></li>`).join("\n")}</ul></section>
    </article></div>
    <section class="guide-switcher" id="related"><div class="section-heading"><p class="eyebrow">Keep planning</p><h2>Related Seoul guides</h2><p>Use the next guide to solve a different part of the trip.</p></div><div class="guide-card-grid planning-guide-grid">${relatedMarkup(guide.slug)}</div></section>
  </main>
  <footer><div><strong>Korea RouteCheck</strong><p>Practical Korea itineraries without the needless zigzag.</p></div><div class="footer-links"><a href="index.html#planner">Planner</a><a href="disclosure.html">Affiliate disclosure</a><a href="privacy.html">Privacy</a></div><p class="copyright">© <span id="year"></span> Korea RouteCheck. Verify current travel information before booking.</p></footer>
  <script src="config.js?v=20260902-2"></script><script src="analytics.js?v=20260902-2"></script><script src="app.js?v=20260902-2"></script>
</body>
</html>`;
}

for (const guide of guides) await writeFile(join(root, `${guide.slug}.html`), page(guide), "utf8");
console.log(`Built ${guides.length} high-intent planning guides.`);
