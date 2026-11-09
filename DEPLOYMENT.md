# Frontend Infra Book hosting

The historical GitBook Markdown remains here, with restored outbound documentation links. Production is the static Next export retained in Netlify `feinfra-book` (site 2423212a-2330-44bd-b8c6-12cd20edf5d3), published deploy `6a626235e879a0f66adbede4` from July 23, 2026. This repo currently has no rebuild pipeline for that exported site. Canonical hostname is https://feinfra.toli.me; old domain aliases remain for existing links.

## Interaction analytics

Netlify footer snippet0 injects the committed `scripts/clarity-snippet.js`
without rebuilding book content. It uses the official Microsoft Clarity tag for
project `zb5fa2mqgu`, replacing PostHog. The canonical hostname, DNT/GPC,
credential-bearing URLs/referrers and duplicate-startup guards run before loading.
Inputs/private-marked elements are masked and the project uses Strict text
masking. Analytics and advertising storage consent are denied. No identity or
custom content is supplied. Script failures cannot interrupt reading.

Focused source checks, provider configuration, actual served-page injection and
recording/playback are separate checks. Historical PostHog recordings remain
available. Existing book exports, redirects and audience are preserved.

## PickleJS cross-links — October 8, 2026

Three historical Markdown mentions now link to https://picklejs.toli.me/. The deployed reader differs from that Markdown: only Scaling HOVER and Company Culture contain PickleJS. Their two server HTML pages and six Next Flight payloads are patched together, including recalculated UTF-8 text-record lengths and serialized hydration data. This preserves client navigation as well as direct loads. Original raw inputs are verified against Netlify upload SHA1 values; the committed deployment/picklejs-crosslinks manifest retains every unchanged file digest and the exact prior deployment. Atomic digest publication reuses unchanged assets, redirects and headers, retaining the configured footer snippet. No old export or historical evidence is deleted. Source validation precedes deployment; published results are recorded separately.
