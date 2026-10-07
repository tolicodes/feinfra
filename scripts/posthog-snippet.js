(function(){
if(location.hostname!=="feinfra.toli.me" || navigator.doNotTrack==="1" || navigator.globalPrivacyControl) return;
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],Object.defineProperty(u,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e}}),Object.defineProperty(u.people,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(){return u.toString(1)+".people (stub)"}}),o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
// Shared policy for these public sites only. Never reuse on an authenticated app unchanged.
function cleanUrl(value) {
  if (typeof value !== "string") return value;
  try {
    const url = new URL(value);
    if (!["https:", "http:"].includes(url.protocol)) return value;
    url.username = "";
    url.password = "";
    url.search = "";
    // Only the Personal Index's known public collection routes are retained.
    if (!/^#\/(?:publications|creative|writing|travels)?$/.test(url.hash)) url.hash = "";
    return url.href;
  } catch { return value; }
}

function sanitizeEvent(event) {
  if (!event) return event;
  const properties = { ...event.properties };
  for (const key of ["$current_url", "$referrer", "$initial_referrer", "$initial_current_url", "$prev_pageview_pathname"]) {
    if (key in properties) properties[key] = cleanUrl(properties[key]);
  }
  delete properties.$search;
  delete properties.$initial_search;
  for (const key of ["$set", "$set_once"]) {
    if (properties[key]) properties[key] = sanitizeEvent({ properties: properties[key] }).properties;
  }
  if (Array.isArray(properties.$elements)) {
    properties.$elements = properties.$elements.map((element) => {
      const clean = { ...element };
      if (clean.attr__href) clean.attr__href = cleanUrl(clean.attr__href);
      delete clean.attr__value;
      return clean;
    });
  }
  return { ...event, properties };
}

function startAnalytics(client, { projectToken, apiHost, site, win, hashRouting = false }) {
  if (!projectToken || win.location.hostname !== site || win.navigator.doNotTrack === "1" || win.navigator.globalPrivacyControl) return false;
  client.init(projectToken, {
    api_host: apiHost,
    ui_host: "https://us.posthog.com",
    defaults: "2025-11-30",
    person_profiles: "never",
    cross_subdomain_cookie: false,
    respect_dnt: true,
    capture_pageview: false,
    capture_pageleave: false,
    capture_performance: false,
    capture_exceptions: false,
    disable_surveys: true,
    enable_recording_console_log: false,
    autocapture: {
      dom_event_allowlist: ["click"],
      capture_copied_text: false,
      element_attribute_ignorelist: ["value"],
    },
    session_recording: {
      maskAllInputs: true,
      blockSelector: '[data-private], .ph-no-capture, input[type="hidden"], input[type="file"]',
      recordHeaders: false,
      recordBody: false,
      // Preserve sanitized URL-only replay Meta calls; reject actual network records.
      maskCapturedNetworkRequestFn: (request) =>
        request && Object.keys(request).length === 1 && typeof request.name === "string"
          ? { name: cleanUrl(request.name) }
          : null,
    },
    before_send: sanitizeEvent,
    loaded: (instance) => {
      instance.register({ site });
      const pageview = () => instance.capture("$pageview", { $current_url: cleanUrl(win.location.href) });
      pageview();
      if (hashRouting) win.addEventListener("hashchange", pageview);
      instance.startSessionRecording();
    },
  });
  return true;
}

startAnalytics(window.posthog, {projectToken:"phc_pdFjkdxTf788it8uKBG5PqwMcZPY6kZjCPAJUoDXEkYS",apiHost:"https://us.i.posthog.com",site:"feinfra.toli.me",win:window});
})();