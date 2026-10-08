import json,sys,hashlib,urllib.request,urllib.parse,time,subprocess
from pathlib import Path
folder=Path(sys.argv[1]).resolve();m=json.loads((folder/'manifest.json').read_text())
repo=subprocess.check_output(['git','rev-parse','--show-toplevel'],cwd=folder,text=True).strip();dirty=subprocess.check_output(['git','status','--porcelain'],cwd=repo,text=True).strip();assert not dirty,'Commit the patch from a clean checkout before deployment'
sha=subprocess.check_output(['git','rev-parse','HEAD'],cwd=repo,text=True).strip()
c=json.loads((Path.home()/'Library/Preferences/netlify/config.json').read_text());a=c['users'][c['userId']]['auth'];token=a.get('token') if isinstance(a,dict) else a
base='https://api.netlify.com/api/v1'
def api(path,data=None,method=None,raw=False):
 headers={'Authorization':'Bearer '+token};body=None
 if data is not None:headers['Content-Type']='application/octet-stream' if raw else 'application/json';body=data if raw else json.dumps(data).encode()
 with urllib.request.urlopen(urllib.request.Request(base+path,data=body,headers=headers,method=method),timeout=60) as r:return json.load(r)
s=api('/sites/'+m['site_id']);assert s['published_deploy']['id']==m['base_deploy'],'Live deployment advanced; reconcile changes before publishing'
files=dict(m['base_files']);upload={}
for x in m['changes']:
 b=(folder/'files'/x['path'].lstrip('/')).read_bytes();h=hashlib.sha1(b).hexdigest();assert h==x['sha1'];assert files[x['path']]==x['before_sha1'];files[x['path']]=h;upload[h]=(x['path'],b)
d=api('/sites/'+m['site_id']+'/deploys',{'files':files,'draft':True,'title':'Restore PickleJS cross-links · '+sha})
assert not d.get('required_functions'),'Unexpected function requirements'
for h in d['required']:
 assert h in upload,'An unchanged base file is missing from Netlify; retain source and recover it'
 path,b=upload[h];api('/deploys/'+d['id']+'/files/'+urllib.parse.quote(path.lstrip('/'),safe='/'),b,method='PUT',raw=True)
for _ in range(60):
 d=api('/deploys/'+d['id'])
 if d['state']=='ready':break
 assert d['state'] not in ['error','failed'],d.get('error_message');time.sleep(1)
assert d['state']=='ready',d['state']
receipt={'source_sha':sha,'site_id':m['site_id'],'base_deploy':m['base_deploy'],'candidate_deploy':d['id'],'candidate_url':d['deploy_ssl_url'],'state':d['state'],'changes':m['changes'],'files':len(files)}
# Preview proof: raw file hashes establish the candidate contains exactly the committed patches.
for x in m['changes']:
 req=urllib.request.Request(base+'/deploys/'+d['id']+'/files/'+urllib.parse.quote(x['path'].lstrip('/'),safe='/'),headers={'Authorization':'Bearer '+token,'Content-Type':'application/vnd.bitballoon.v1.raw'})
 b=urllib.request.urlopen(req,timeout=30).read();assert hashlib.sha1(b).hexdigest()==x['sha1']
receipt['candidate_raw_hashes_verified']=True
if len(sys.argv)>2 and sys.argv[2]=='--publish':
 s=api('/sites/'+m['site_id']);assert s['published_deploy']['id']==m['base_deploy'],'Live deployment advanced while validating'
 result=api('/sites/'+m['site_id']+'/deploys/'+d['id']+'/restore',{},method='POST')
 s=api('/sites/'+m['site_id']);assert s['published_deploy']['id']==d['id'];receipt['published_deploy']=d['id'];receipt['url']=s['ssl_url']
Path(sys.argv[-1] if sys.argv[-1].endswith('.json') else str(folder/'receipt.json')).write_text(json.dumps(receipt,indent=2)+'\n');print(json.dumps(receipt))
