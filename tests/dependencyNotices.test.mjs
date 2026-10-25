import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=path=>JSON.parse(readFileSync(new URL(path,import.meta.url)));
test('published direct package notices match locked versions and upstream license metadata',()=>{
 const inventory=read('../src/content/dependencyInventory.json'),root=read('../package.json'),lock=read('../package-lock.json');
 assert.deepEqual(inventory.map(item=>item.name).sort(),Object.keys({...root.dependencies,...root.devDependencies}).sort());
 for(const item of inventory){
  assert.equal(item.version,lock.packages[`node_modules/${item.name}`].version);
  const meta=read(`../node_modules/${item.name}/package.json`);
  assert.equal(item.license,typeof meta.license==='string'?meta.license:'See upstream notice');
  assert.equal(item.url,`https://www.npmjs.com/package/${item.name}/v/${item.version}`);
 }
});
