# Why I Wrote This Guide

I wrote this guide while interviewing for a few big tech companies. Namely, Dropbox and Square. I was up for some architectural Frontend Roles, where Systems Design interviews are the deciding factor for getting the job.

I tried searching for some videos, but most examples were for Backend/Distributed System problems.

So I had to piece together some knowledge I had from my career, asked a few folks to help out, and did a few mock interviews.&#x20;

I decided to release this as open source, because us FE folks need some love too!!! Feel free to make PRs and [contribute](https://github.com/tolicodes/feinfra)!

## Website analytics

The existing Netlify site serves the public book at `feinfra.toli.me`.
Its footer snippet uses the official Microsoft Clarity tag for project
`zb5fa2mqgu`, replacing the historical PostHog snippet. Canonical-host, DNT/GPC,
credential-bearing URL/referrer and duplicate-startup guards run before loading.
Inputs/private-marked elements and project text are masked; analytics and
advertising storage consent are denied. No identity or custom content is sent.
The source snippet is `scripts/clarity-snippet.js`. Its provider configuration,
served-page injection and actual recording receipt are separate checks.
