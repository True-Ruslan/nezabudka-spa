import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

async function withFixtureServer(handler, callback) {
  const server = createServer(handler);
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });

  const address = server.address();
  if (!address || typeof address === 'string') {
    server.close();
    throw new Error('Fixture server did not expose a TCP port');
  }

  try {
    await callback(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

async function runChecker(distRoot) {
  return await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ['scripts/check-external-links.mjs'], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        CHECK_LINK_ROOT: distRoot,
        CHECK_LINK_RETRIES: '0',
        CHECK_LINK_TIMEOUT_MS: '1000',
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => {
      stdout += chunk;
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk;
    });
    child.once('error', reject);
    child.once('close', (code) => resolve({ code, stdout, stderr }));
  });
}

async function withDist(html, callback) {
  const directory = await mkdtemp(path.join(tmpdir(), 'nepomka-links-'));
  try {
    await writeFile(path.join(directory, 'index.html'), html, 'utf8');
    await callback(directory);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

test('accepts reachable links, deduplicates URLs and tolerates anti-bot 403 responses', async () => {
  await withFixtureServer((request, response) => {
    if (request.url === '/ok') {
      response.writeHead(200).end('ok');
      return;
    }
    if (request.url === '/restricted') {
      response.writeHead(403).end('restricted');
      return;
    }
    response.writeHead(404).end('missing');
  }, async (origin) => {
    const html = `<!doctype html>
      <a href="${origin}/ok">One</a>
      <a href="${origin}/ok">Duplicate</a>
      <a href="${origin}/restricted">Restricted</a>
      <a href="mailto:test@example.test">Mail</a>`;

    await withDist(html, async (distRoot) => {
      const result = await runChecker(distRoot);
      assert.equal(result.code, 0, result.stderr || result.stdout);
      assert.match(result.stdout, /2 external link\(s\) checked/);
    });
  });
});

test('fails the quality gate when an external link returns 404', async () => {
  await withFixtureServer((_request, response) => {
    response.writeHead(404).end('missing');
  }, async (origin) => {
    await withDist(`<!doctype html><a href="${origin}/missing">Missing</a>`, async (distRoot) => {
      const result = await runChecker(distRoot);
      assert.notEqual(result.code, 0, 'checker unexpectedly accepted a 404');
      assert.match(`${result.stdout}\n${result.stderr}`, /404/);
    });
  });
});
