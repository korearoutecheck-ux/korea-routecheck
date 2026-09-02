(function initializeRouteCheckAnalytics() {
  const settings = window.ROUTECHECK_CONFIG?.analytics || {};
  const consentKey = "routecheck_analytics_consent";
  const measurementId = typeof settings.measurementId === "string" ? settings.measurementId.trim() : "";
  const ready = settings.enabled === true && /^G-[A-Z0-9]+$/i.test(measurementId);
  let loaded = false;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  window.routecheckTrack = function routecheckTrack(eventName, parameters = {}) {
    if (!loaded) return;
    window.gtag("event", eventName, parameters);
  };

  if (!ready) return;

  function loadAnalytics() {
    if (loaded) return;
    loaded = true;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      anonymize_ip: true,
      allow_google_signals: false,
      page_title: document.title,
      page_location: window.location.href
    });
    const guideType = document.body.dataset.guide;
    if (guideType) window.routecheckTrack("view_guide", { guide_type: guideType });
  }

  function saveConsent(value) {
    try { window.localStorage.setItem(consentKey, value); } catch (_) {}
  }

  function readConsent() {
    try { return window.localStorage.getItem(consentKey); } catch (_) { return null; }
  }

  const existingConsent = readConsent();
  if (existingConsent === "granted") {
    loadAnalytics();
    return;
  }
  if (existingConsent === "denied") return;

  const banner = document.createElement("aside");
  banner.className = "analytics-consent";
  banner.setAttribute("aria-label", "Analytics preferences");
  banner.innerHTML = `<div><strong>Help improve Korea RouteCheck</strong><p>Allow anonymous analytics to show which guides and planner features are useful. No itinerary form data is sent.</p></div><div class="analytics-consent-actions"><button type="button" data-analytics-choice="deny">Not now</button><button type="button" data-analytics-choice="allow">Allow analytics</button></div>`;
  document.body.appendChild(banner);

  banner.addEventListener("click", event => {
    const choice = event.target.closest("[data-analytics-choice]")?.dataset.analyticsChoice;
    if (!choice) return;
    if (choice === "allow") {
      saveConsent("granted");
      loadAnalytics();
      window.routecheckTrack("analytics_consent", { consent_status: "granted" });
    } else {
      saveConsent("denied");
    }
    banner.remove();
  });
})();
