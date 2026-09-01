# Korea RouteCheck

Korea RouteCheck is a zero-API, static travel-planning web application. It builds neighborhood-clustered Seoul itineraries based on trip length, pace, interests, budget, and weather preference.

## Current MVP

- Generates 2–7 day Seoul plans.
- Scores routes for coherence.
- Adjusts the number of stops to the user's pace.
- Provides rain alternatives.
- Estimates a trip budget.
- Copies or prints the itinerary.
- Includes dedicated, search-optimized 2-, 3-, 5-, and 7-day Seoul guides.
- Includes prepared affiliate-link positions.
- Stores no itinerary data and requires no account.

## Launch checklist

1. Join Viator's affiliate program.
2. Join Airalo's affiliate program.
3. Generate official tracking links inside each affiliate dashboard.
4. Replace the two URLs in `config.js` and change `enabled` to `true`.
5. The monitored business email is configured as `korearoutecheck@gmail.com`.
6. Test every booking link and confirm attribution in the affiliate dashboards.
7. Verify all travel recommendations, hours, and prices before promoting the site.

Never invent tracking parameters. Use the links produced by the affiliate programs.

## Local preview

The app can be opened directly from `index.html`. Its initial production URL is configured as `https://korearoutecheck-ux.github.io/korea-routecheck/`.

## Next product increments

1. Add Busan and Gyeongju route clusters.
2. Add arrival/departure airport logic.
3. Add mobility and dietary filters.
4. Add a route feedback control using privacy-preserving analytics.
5. Use affiliate conversion data to prioritize the most helpful recommendations.

## Important operating principle

The useful planning result comes first. Affiliate links should be displayed only when they genuinely match the itinerary, and every commercial relationship should be disclosed.
