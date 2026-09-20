# Korea RouteCheck analytics setup

The live configuration uses GA4 measurement ID `G-MSXQSYV0QL`. The Google tag only loads after consent. A valid ID and a loaded tag do **not** establish that the intended GA4 property received data.

## Verification status — September 20, 2026

- The live consent button inserted the tag with the configured measurement ID.
- Analytics and Search Console returned gateway errors in the test browser; receipt in Realtime/DebugView and the sitemap report remain unverified.
- The sitemap returned HTTP 200, `application/xml`, and 18 URLs. The domain-root robots.txt returned 404, which does not prohibit crawling. The project-directory robots.txt is not the host-root robots file Google consults.
- Client-side regression tests cover denied/granted consent, persistence, withdrawal, storage failures, explicit retries, duplicate initial views, URL sanitization, and product click attribution. These tests cannot confirm delivery to Google's servers.

## Confirm collection in the existing property

1. Confirm the existing GA4 Web stream uses `G-MSXQSYV0QL`. Do not create a replacement property merely because a report is empty.
2. Open the food guide with `?analytics_debug=1`, then allow analytics. If previously declined, open Privacy → Change analytics preference first.
3. Check DebugView for `page_view` and `view_guide`. Click a shortlist link and confirm `affiliate_click`, `affiliate_product`, and `affiliate_placement`. This is an outbound-click test, not a booking.
4. Check that `page_location` contains no shared-plan settings (`d`, `t`, `p`, `s`, `l`, `r`, `i`) or hash. Only standard UTM campaign keys are retained by the site code. In the Web stream's enhanced measurement settings, verify that automatic history-based page views are disabled for the planner; otherwise GA4 may generate its own events outside this code's explicit page-view flow.
5. Use GA4's developer/internal traffic filters appropriately to keep testing out of business reports. Debug mode is a label; it does not by itself exclude traffic from all reports.
6. If events are absent, check stream identity, active data filters, browser blockers, and the Google tag's network requests. Do not remove consent gating to make numbers appear.

Source: [GA4 DebugView](https://support.google.com/analytics/answer/7201382) and [Search Console sitemap report](https://support.google.com/webmasters/answer/7451001).

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
| `generate_itinerary` | The planner produces or restores a route | `trip_days`, `trip_pace`, `rain_ready`, `itinerary_source` |
| `planner_preset_click` | A quick trip-length choice is used | `trip_days` |
| `copy_itinerary` | A visitor copies a generated itinerary | `trip_days` |
| `share_itinerary` | A visitor copies a shareable itinerary URL | `trip_days` |
| `print_itinerary` | A visitor opens the print or PDF flow | `trip_days` |
| `affiliate_click` | An active Viator link is clicked | `affiliate_partner` (legacy link key), `affiliate_provider`, `affiliate_product`, `affiliate_placement`, `affiliate_context`, `page_path` |
| `restaurant_map_click` | A visitor opens a restaurant in Naver Maps | `restaurant_name`, `page_path` |
| `place_map_click` | A visitor opens an itinerary stop in Naver Maps | `place_name`, `page_path` |
| `content_card_click` | A visitor opens an itinerary or travel-guide card | `destination_path`, `card_label`, `page_path` |
| `analytics_consent` | A visitor chooses to allow analytics | `consent_status` |

The planner does not deliberately send traveler count, lodging budget, selected interests, generated itinerary text, names or email addresses to analytics. Page and referrer URLs passed by the site code are sanitized. Visitors can change their choice on Privacy; withdrawal disables collection, clears accessible GA cookies and reloads the page.

Register `affiliate_product`, `affiliate_placement`, and `affiliate_provider` as event-scoped custom dimensions to compare the three shortlisted products. Existing `affiliate_partner` values remain intact for report continuity. Booking and commission reports still come from Viator.

## Reports to use

- **Planner usage:** Events → `generate_itinerary`.
- **Affiliate-link clicks:** Events → `affiliate_click`, broken down by `page_path`.
- **Restaurant interest:** Events → `restaurant_map_click`, broken down by `restaurant_name` and `page_path`.
- **Itinerary usefulness:** Compare `copy_itinerary`, `share_itinerary`, `print_itinerary` and `place_map_click` after `generate_itinerary`.
- **Content navigation:** Events → `content_card_click`, broken down by `destination_path`.
- **Popular trip lengths:** Explore `generate_itinerary` using `trip_days`. Register `trip_days` as an event-scoped custom dimension if GA4 does not expose it automatically in the desired report.
- **Search traffic:** Acquisition → Traffic acquisition, filtered to Organic Search.
- **Landing pages:** Engagement → Landing page, then compare sessions, `generate_itinerary` and `affiliate_click`.

## Measurement rules

- Do not enable analytics before adding the real GA4 measurement ID.
- Do not remove the consent choice or privacy disclosure.
- Evaluate conversion rate as affiliate clicks divided by landing-page sessions; raw clicks alone can reward low-quality traffic.
- Wait for enough data before changing a page. A few visits do not establish a reliable pattern.
