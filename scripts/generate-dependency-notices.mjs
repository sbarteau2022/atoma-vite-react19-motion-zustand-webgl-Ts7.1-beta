import {readFileSync, writeFileSync} from 'node:fs';
const root=JSON.parse(readFileSync(new URL('../package.json',import.meta.url)));
const lock=JSON.parse(readFileSync(new URL('../package-lock.json',import.meta.url)));
const entries=Object.entries({...root.dependencies,...root.devDependencies}).sort(([a],[b])=>a.localeCompare(b)).map(([name])=>{
 const resolved=lock.packages[`node_modules/${name}`];
 const meta=JSON.parse(readFileSync(new URL(`../node_modules/${name}/package.json`,import.meta.url)));
 return {name,version:resolved.version,license:typeof meta.license==='string'?meta.license:'See upstream notice',usage:root.dependencies[name]?'Runtime':'Development',url:`https://www.npmjs.com/package/${name}/v/${resolved.version}`};
});
writeFileSync(new URL('../src/content/dependencyInventory.json',import.meta.url),JSON.stringify(entries,null,2)+'\n');
console.log(`Generated ${entries.length} direct dependency notices.`);
