(function () {
// Public book pages only. Private apps need their own capture boundaries.
function startAnalytics({ projectId, site, win, doc }) {
  try {
    if (!/^[a-z0-9]+$/.test(projectId || "") || win.location.hostname !== site ||
        win.navigator.doNotTrack === "1" || win.navigator.globalPrivacyControl) return false;
    // Clarity captures page URLs itself. Never start on credential-bearing URLs.
    const url = new URL(win.location.href);
    if (url.username || url.password || url.search || url.hash) return false;
    if (doc.referrer) {
      const referrer = new URL(doc.referrer);
      if (referrer.username || referrer.password || referrer.search || referrer.hash) return false;
    }
    if (doc.querySelector('script[data-toli-clarity]')) return false;
    doc.querySelectorAll('[data-private], .ph-no-capture, input, textarea, select')
      .forEach((element) => element.setAttribute('data-clarity-mask', 'true'));
    win.clarity = win.clarity || function (...args) {
      (win.clarity.q = win.clarity.q || []).push(args);
    };
    win.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'denied' });
    win.clarity('set', 'site', site);
    const script = doc.createElement('script');
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${projectId}`;
    script.setAttribute('data-toli-clarity', 'true');
    doc.head.appendChild(script);
    return true;
  } catch {
    // Analytics must never prevent the book from rendering.
    return false;
  }
}

startAnalytics({projectId:'zb5fa2mqgu',site:'feinfra.toli.me',win:window,doc:document});
}());
