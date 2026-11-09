import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {test} from 'node:test';
const source=readFileSync(new URL('./clarity-snippet.js',import.meta.url),'utf8');
function run(host='feinfra.toli.me',nav={},suffix='') {
 const scripts=[];
 const context={URL,window:{location:{hostname:host,href:'https://'+host+'/'+suffix},navigator:nav},document:{referrer:'',querySelector:()=>scripts[0],querySelectorAll:()=>[],createElement:()=>({setAttribute(){}}),head:{appendChild:s=>scripts.push(s)}}};
 vm.runInNewContext(source,context);return {scripts,client:context.window.clarity};
}
test('canonical pages load one Clarity tag with both storage consents denied',()=>{
 const f=run();assert.equal(f.scripts.length,1);assert.equal(f.scripts[0].src,'https://www.clarity.ms/tag/zb5fa2mqgu');
 assert.equal(f.client.q[0][0],'consentv2');assert.equal(f.client.q[0][1].ad_Storage,'denied');assert.equal(f.client.q[0][1].analytics_Storage,'denied');
 assert.doesNotMatch(source,/posthog|gtag\(/);
});
test('previews, privacy signals and token-bearing URLs never initialize',()=>{
 for(const h of ['localhost','feinfra.com','feinfra-book.netlify.app'])assert.equal(run(h).scripts.length,0);
 for(const n of [{doNotTrack:'1'},{globalPrivacyControl:true}])assert.equal(run('feinfra.toli.me',n).scripts.length,0);
 for(const q of ['?token=private','#private'])assert.equal(run('feinfra.toli.me',{},q).scripts.length,0);
});
