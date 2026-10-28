import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';

export async function verifyProduction(origin, fetcher = fetch) {
  async function read(path) {
    const response = await fetcher(new URL(path, origin), {signal: AbortSignal.timeout(15000), redirect: 'error'});
    assert.equal(response.status, 200, `${path}: expected HTTP 200`);
    assert.match(response.headers.get('content-type') || '', /^application\/json\b/i, `${path}: expected JSON`);
    return response.json();
  }
  const health = await read('/api/health');
  for (const binding of ['ok', 'ai', 'profiles', 'research']) assert.equal(health[binding], true, `Unhealthy binding: ${binding}`);
  const catalog = await read('/api/papers');
  assert.ok(Array.isArray(catalog.papers) && catalog.papers.length > 0, 'Research catalog is empty');
  assert.equal((await read('/api/auth-status')).emailAvailable, true, 'Account mail is not configured');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const origin = process.argv[2] || 'https://atoma-labs-site.pages.dev';
  await verifyProduction(origin);
  console.log('Production databases, AI binding, catalog and mail configuration verified.');
}
