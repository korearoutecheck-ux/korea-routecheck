# Korea RouteCheck

Korea RouteCheck is a zero-API, static travel-planning web application. It builds neighborhood-clustered Seoul itineraries based on trip length, pace, interests, budget, and weather preference.

## Current MVP

- Generates 2–7 day Seoul plans.
- Groups each day around nearby parts of Seoul.
- Adjusts the number of stops to the user's pace.
- Provides rain alternatives.
- Estimates a trip budget.
- Copies, shares or prints the itinerary.
- Includes dedicated, search-optimized 2-, 3-, 4-, 5-, and 7-day Seoul guides.
- Includes six high-intent planning guides for rain, solo travel, arrival day, airport transfers, neighborhoods, and day trips.
- Includes a budget-based Seoul dining guide with nine verified Naver Maps listings.
- Adds neighborhood-matched restaurant suggestions to generated itineraries.
- Links every generated and ready-made itinerary stop to a Naver Maps search.
- Restores the most recent itinerary on the same device and opens shared plans from compact URLs.
- Includes local review notes, editorial standards, a corrections contact and a helpful 404 page.
- Includes consent-based GA4 event tracking using the configured Korea RouteCheck property.
- Includes an active Viator affiliate link; the Airalo placement remains disabled.
- Requires no account or server-side itinerary storage.

## Launch checklist

1. Test the active Viator booking link and confirm attribution in the affiliate dashboard.
2. Keep the Airalo integration disabled unless a future application is approved and an official tracking link is issued.
3. Monitor GA4, Search Console and Viator conversion data, including restaurant-map clicks.
4. The monitored business email is configured as `korearoutecheck@gmail.com`.
5. Verify all travel recommendations, hours and prices before promoting the site.

Never invent tracking parameters. Use the links produced by the affiliate programs.

## Local preview

The app can be opened directly from `index.html`. Its initial production URL is configured as `https://korearoutecheck-ux.github.io/korea-routecheck/`.

Run the page generators after changing their source data:

```bash
node tools/build-guides.mjs
node tools/build-intent-guides.mjs
node tools/build-dining-guide.mjs
```

Run the static-site audit before publishing:

```bash
node tools/audit-site.mjs
```

## Next product increments

1. Add Busan and Gyeongju route clusters.
2. Add arrival/departure airport logic.
3. Add mobility and dietary filters.
4. Add a route feedback control using privacy-preserving analytics.
5. Use affiliate conversion data to prioritize the most helpful recommendations.

## Analytics

See `ANALYTICS_SETUP.md` for GA4 activation and the event/report map. Analytics does not load until a valid measurement ID is supplied and the visitor explicitly allows it.

## Important operating principle

The useful planning result comes first. Affiliate links should be displayed only when they genuinely match the itinerary, and every commercial relationship should be disclosed.
