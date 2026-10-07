import { readFileSync } from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
import { test } from "node:test";
const source = readFileSync(new URL("./posthog-snippet.js", import.meta.url), "utf8");
function run(hostname, navigator = {}) {
 const context = { URL, location: { hostname }, navigator, document: {createElement: () => ({}), getElementsByTagName: () => [{parentNode:{insertBefore(){}}}]}};
 context.window = context; vm.runInNewContext(source, context);return context.posthog;
}
test("aliases/previews and privacy opt-outs never load the SDK", () => {
 for (const host of ["feinfra.com", "feinfra-book.netlify.app", "localhost"]) assert.equal(run(host), undefined);
 assert.equal(run("feinfra.toli.me", {doNotTrack: "1"}), undefined);
 assert.equal(run("feinfra.toli.me", {globalPrivacyControl: true}), undefined);
});
test("canonical visitors get masked anonymous analytics without payload capture", () => {
 const client = run("feinfra.toli.me"), config = client._i[0][1];
 assert.equal(config.person_profiles, "never");assert.equal(config.session_recording.maskAllInputs, true);
 assert.equal(config.enable_recording_console_log, false);assert.equal(config.session_recording.recordBody, false);
 assert.equal(config.session_recording.maskCapturedNetworkRequestFn({}), null);
 assert.equal(config.before_send({properties: {$current_url:"https://feinfra.toli.me/chapter/?token=private#unknown"}}).properties.$current_url,"https://feinfra.toli.me/chapter/");
});
