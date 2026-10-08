# Frontend Infra Book hosting

The historical GitBook Markdown remains here, with restored outbound documentation links. Production is the static Next export retained in Netlify `feinfra-book` (site 2423212a-2330-44bd-b8c6-12cd20edf5d3), published deploy `6a626235e879a0f66adbede4` from July 23, 2026. This repo currently has no rebuild pipeline for that exported site. Canonical hostname is https://feinfra.toli.me; old domain aliases remain for existing links.

## Session replay — October 7, 2026

Netlify footer snippet 0 injects `scripts/posthog-snippet.js` on static pages as served, without rebuilding book content. It uses PostHog's official asynchronous web loader/CDN and US project 651591, with only a publishable project token. This CDN follows PostHog releases; the other rollout sites pin their npm SDK to 1.438.2. The snippet initializes only on feinfra.toli.me and labels sessions with that site. Legacy aliases/previews, DNT and GPC skip initialization.

Inputs are masked, hidden/file/private-marked elements blocked; console capture and network request headers/bodies are disabled. Analytics URL metadata removes credentials, queries and unknown fragments; public text/images remain visible. Replay snapshots are not claimed to redact every URL. No user identification/person profiles. The shared PostHog project is on the capped free plan with console/network settings off.

Syntax/host/opt-out/privacy-config checks pass. The Netlify API readback matches the source and trusted HTTPS homepage includes the injected code. The existing export, redirects and audience remain unchanged. Actual replay receipt is verified separately; local configuration evidence is retained in `/Users/toli/Documents/posthog-rollout-2026-10-07`.

## Replay viewport correction — October 7, 2026

The original network-mask callback returned null for every call. SDK 1.438.2 also invokes it with a URL-only object to mask replay page metadata; dropping that call removed the rrweb Meta event and its viewport dimensions, leaving the playback iframe hidden. Received sessions/full DOM snapshots alone did not verify usable playback; a recorded viewport resize could incidentally make some earlier playback work.

The callback now retains sanitized URL-only metadata and rejects actual network-request records. Headers, bodies, console capture, input masking, production-host/privacy opt-outs and private-context gates retain their contracts. Replay page URLs now use the existing URL sanitizer. A snippet regression exercises URL-only calls matching the verified SDK URL-mask path and verifies that page metadata survives while request payloads are rejected. Corrected source and checks are committed before publishing; new visual playback and deployment receipts are verified separately. Old recordings lacking viewport metadata are preserved and may remain black.

Viewport correction deployed: runtime source d05234ef47f6307c0687a7be1dab411a4c5d9ad4; Netlify footer snippet0; exact corrected source is present live. New toli.me playback visibly renders the recorded page. This verifies the corrected shared callback; per-host live source checks do not establish visual playback on every host. Old recordings lacking viewport metadata remain preserved. This documentation follow-up does not rebuild or redeploy runtime code.

## PickleJS cross-links — October 8, 2026

Three historical Markdown mentions now link to https://picklejs.toli.me/. The deployed reader differs from that Markdown: only Scaling HOVER and Company Culture contain PickleJS. Their two server HTML pages and six Next Flight payloads are patched together, including recalculated UTF-8 text-record lengths and serialized hydration data. This preserves client navigation as well as direct loads. Original raw inputs are verified against Netlify upload SHA1 values; the committed deployment/picklejs-crosslinks manifest retains every unchanged file digest and the exact prior deployment. Atomic digest publication reuses unchanged assets, redirects and headers, retaining the configured PostHog footer snippet. No old export or historical evidence is deleted. Source validation precedes deployment; published results are recorded separately.
