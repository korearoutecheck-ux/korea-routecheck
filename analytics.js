(function initializeRouteCheckAnalytics() {
  const settings = window.ROUTECHECK_CONFIG?.analytics || {};
  const consentKey = "routecheck_analytics_consent";
  const measurementId = typeof settings.measurementId === "string" ? settings.measurementId.trim() : "";
  const ready = settings.enabled === true && /^G-[A-Z0-9]+$/i.test(measurementId);
  let consent = readConsent();
  let initialized = false;
  let tag = null;
  let banner = null;
  let settingsTrigger = null;
  const disableKey = `ga-disable-${measurementId}`;

  function cleanUrl(value, keepCampaign = false) {
    try {
      const url = new URL(value);
      const clean = new URL(url.origin + url.pathname);
      if (keepCampaign) for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
        if (url.searchParams.has(key)) clean.searchParams.set(key, url.searchParams.get(key));
      }
      return clean.href;
    } catch (_) { return ""; }
  }
  const pageContext = {
    page_title: document.title,
    page_location: cleanUrl(window.location.href, true),
    page_referrer: cleanUrl(document.referrer)
  };
  const debug = new URL(window.location.href).searchParams.get("analytics_debug") === "1";

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  window.routecheckTrack = function routecheckTrack(eventName, parameters = {}) {
    if (!ready || consent !== "granted" || !initialized) return;
    window.gtag("event", eventName, { ...parameters, ...pageContext, ...(debug ? { debug_mode: true } : {}) });
  };
  window[disableKey] = consent !== "granted";

  function loadAnalytics() {
    if (!ready || consent !== "granted") return;
    window[disableKey] = false;
    if (!initialized) {
      initialized = true;
      window.gtag("js", new Date());
      window.gtag("config", measurementId, {
        ...pageContext, send_page_view: false,
        allow_google_signals: false, allow_ad_personalization_signals: false,
        ...(debug ? { debug_mode: true } : {})
      });
      window.routecheckTrack("page_view");
      const guideType = document.body.dataset.guide;
      if (guideType) window.routecheckTrack("view_guide", { guide_type: guideType });
    }
    if (tag) return;
    tag = document.createElement("script");
    tag.async = true;
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    tag.addEventListener("error", () => {
      // An explicit retry from Privacy reuses the queue without duplicate views.
      tag.remove();
      tag = null;
    });
    document.head.appendChild(tag);
  }

  function saveConsent(value) {
    consent = value;
    try { window.localStorage.setItem(consentKey, value); } catch (_) {}
    updatePreferenceText();
  }

  function readConsent() {
    try { return window.localStorage.getItem(consentKey); } catch (_) { return null; }
  }

  function updatePreferenceText() {
    document.querySelectorAll("[data-analytics-status]").forEach(element => {
      element.textContent = !ready ? "Analytics is unavailable." : consent === "granted"
        ? "Your choice: analytics allowed." : consent === "denied"
          ? "Your choice: analytics declined." : "You have not chosen an analytics preference.";
    });
  }

  function clearAnalyticsCookies() {
    const hostname = window.location.hostname;
    const domains = ["", hostname, `.${hostname}`];
    const directory = window.location.pathname.slice(0, window.location.pathname.lastIndexOf("/") + 1);
    const paths = new Set(["/", directory, directory.replace(/\/$/, "")]);
    document.cookie.split(";").forEach(cookie => {
      const name = cookie.split("=")[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) return;
      for (const domain of domains) for (const path of paths) {
        document.cookie = `${name}=; Max-Age=0; path=${path || "/"}${domain ? `; domain=${domain}` : ""}`;
      }
    });
  }

  function showPreferences(trigger) {
    if (!ready) return;
    settingsTrigger = trigger || null;
    if (!banner) {
      banner = document.createElement("aside");
      banner.className = "analytics-consent";
      banner.setAttribute("aria-label", "Analytics preferences");
      banner.innerHTML = `<div><strong>Optional analytics</strong><p>Allow Google Analytics to measure page visits and clicks. The planner works either way. <a href="privacy.html">Privacy details</a></p></div><div class="analytics-consent-actions"><button type="button" data-analytics-choice="deny">Decline</button><button type="button" data-analytics-choice="allow">Allow analytics</button></div>`;
      banner.addEventListener("click", event => {
        const choice = event.target.closest("[data-analytics-choice]")?.dataset.analyticsChoice;
        if (!choice) return;
        if (choice === "allow") {
          const changed = consent !== "granted";
          saveConsent("granted");
          loadAnalytics();
          if (changed) window.routecheckTrack("analytics_consent", { consent_status: "granted" });
        } else {
          saveConsent("denied");
          window[disableKey] = true;
          clearAnalyticsCookies();
        }
        banner.remove();
        banner = null;
        settingsTrigger?.focus();
        // Remove an already-running tag after withdrawing consent.
        if (choice === "deny" && initialized) window.location.reload();
      });
      document.body.appendChild(banner);
    }
    if (trigger) banner.querySelector("button")?.focus();
  }

  document.querySelectorAll("[data-analytics-settings]").forEach(button => {
    button.addEventListener("click", () => showPreferences(button));
  });
  window.addEventListener("storage", event => {
    if (event.key === consentKey || event.key === null) {
      consent = readConsent();
      window[disableKey] = consent !== "granted";
      window.location.reload();
    }
  });
  updatePreferenceText();
  if (!ready) return;
  if (consent === "granted") loadAnalytics();
  else if (consent !== "denied") showPreferences();
})();
