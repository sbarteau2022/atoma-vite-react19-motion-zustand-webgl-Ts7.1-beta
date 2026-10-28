import {test} from 'node:test';
import assert from 'node:assert/strict';
import {verifyProduction} from '../scripts/verify-production.mjs';
const healthy = {'/api/health':{ok:true,ai:true,profiles:true,research:true},'/api/papers':{papers:[{id:'source'}]},'/api/auth-status':{emailAvailable:true}};
const stub = (changes = {}) => async url => {
  const path = url.pathname;
  const value = path in changes ? changes[path] : healthy[path];
  return value instanceof Response ? value : Response.json(value);
};
test('release smoke accepts healthy bindings and configured services',async()=>verifyProduction('https://example.test',stub()));
test('release smoke rejects SPA fallback, failed HTTP, missing bindings, empty catalog and disabled mail',async()=>{
  for(const changes of [
    {'/api/health':new Response('<html>SPA fallback</html>',{headers:{'content-type':'text/html'}})},
    {'/api/health':Response.json({error:'Unavailable'},{status:503})},
    {'/api/health':{ok:true,ai:false,profiles:true,research:true}},
    {'/api/papers':{papers:[]}},
    {'/api/auth-status':{emailAvailable:false}},
  ])await assert.rejects(()=>verifyProduction('https://example.test',stub(changes)));
});
