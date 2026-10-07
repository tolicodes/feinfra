# Frontend Infra Book hosting

The historical GitBook Markdown remains here unchanged. Production is the static Next export retained in Netlify `feinfra-book` (site 2423212a-2330-44bd-b8c6-12cd20edf5d3), published deploy `6a626235e879a0f66adbede4` from July 23, 2026. This repo currently has no rebuild pipeline for that exported site. Canonical hostname is https://feinfra.toli.me; old domain aliases remain for existing links.

## Session replay — October 7, 2026

Netlify footer snippet 0 injects `scripts/posthog-snippet.js` on static pages as served, without rebuilding book content. It uses PostHog's official asynchronous web loader/CDN and US project 651591, with only a publishable project token. This CDN follows PostHog releases; the other rollout sites pin their npm SDK to 1.438.2. The snippet initializes only on feinfra.toli.me and labels sessions with that site. Legacy aliases/previews, DNT and GPC skip initialization.

Inputs are masked, hidden/file/private-marked elements blocked; console capture and network request headers/bodies are disabled. Analytics URL metadata removes credentials, queries and unknown fragments; public text/images remain visible. Replay snapshots are not claimed to redact every URL. No user identification/person profiles. The shared PostHog project is on the capped free plan with console/network settings off.

Syntax/host/opt-out/privacy-config checks pass. The Netlify API readback matches the source and trusted HTTPS homepage includes the injected code. The existing export, redirects and audience remain unchanged. Actual replay receipt is verified separately; local configuration evidence is retained in `/Users/toli/Documents/posthog-rollout-2026-10-07`.
