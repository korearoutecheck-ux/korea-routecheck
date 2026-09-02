# Korea RouteCheck analytics setup

The site is prepared for Google Analytics 4 (GA4), which is free at the expected early traffic level. Analytics remains completely inactive until a valid measurement ID is added and `enabled` is changed to `true` in `config.js`.

## Activate GA4

1. Create a Google Analytics account and a GA4 property for Korea RouteCheck.
2. Add a Web data stream using `https://korearoutecheck-ux.github.io/korea-routecheck/`.
3. Copy the Measurement ID. It begins with `G-`.
4. In `config.js`, set:

```javascript
analytics: {
  enabled: true,
  provider: "ga4",
  measurementId: "G-YOUR-ID"
}
```

5. Upload the updated `config.js` to the repository root and hard-refresh the live site.
6. Choose **Allow analytics** in the consent banner during testing, then confirm events in GA4 Realtime or DebugView.

## Events already implemented

| Event | Trigger | Useful parameters |
|---|---|---|
| `page_view` | GA4 loads after consent | Page title, page path, referrer and campaign attribution |
| `view_guide` | A guide page loads after consent | `guide_type` |
| `generate_itinerary` | The planner produces a route | `trip_days`, `trip_pace`, `rain_ready` |
| `affiliate_click` | An active Viator or Airalo link is clicked | `affiliate_partner`, `page_path` |
| `analytics_consent` | A visitor chooses to allow analytics | `consent_status` |

The planner does not send traveler count, lodging budget, selected interests, generated itinerary text, names or email addresses to analytics.

## Reports to use

- **Planner usage:** Events → `generate_itinerary`.
- **Affiliate-link clicks:** Events → `affiliate_click`, broken down by `page_path`.
- **Popular trip lengths:** Explore `generate_itinerary` using `trip_days`. Register `trip_days` as an event-scoped custom dimension if GA4 does not expose it automatically in the desired report.
- **Search traffic:** Acquisition → Traffic acquisition, filtered to Organic Search.
- **Landing pages:** Engagement → Landing page, then compare sessions, `generate_itinerary` and `affiliate_click`.

## Measurement rules

- Do not enable analytics before adding the real GA4 measurement ID.
- Do not remove the consent choice or privacy disclosure.
- Evaluate conversion rate as affiliate clicks divided by landing-page sessions; raw clicks alone can reward low-quality traffic.
- Wait for enough data before changing a page. A few visits do not establish a reliable pattern.
