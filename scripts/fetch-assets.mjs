#!/usr/bin/env node
/**
 * Downloads every product image and brochure referenced by src/lib/catalog.ts
 * from the client's live WordPress site into ./public.
 *
 *   node scripts/fetch-assets.mjs          # fetch anything missing
 *   node scripts/fetch-assets.mjs --force  # re-fetch everything
 *
 * Run this once after cloning. It exists because the new site must not depend
 * on networktoll.com at runtime — that is the domain this build replaces, and
 * hotlinking its uploads would break the site the moment DNS is cut over.
 *
 * Fetches the literal `remote` URL recorded in the catalog — the exact URL
 * observed embedded in the live page's HTML — and nothing else.
 *
 * An earlier version of this script tried to guess WordPress's full-size
 * original by stripping the `-WxH` suffix (`foo-931x1024.png` -> `foo.png`)
 * and used it unvalidated whenever *anything* came back at that guessed URL,
 * on the theory that a same-named upload was probably the same image at
 * higher resolution. It wasn't: for six images (the RFID Tag family and one
 * Integrated Reader model, all from the client's 2025/08 upload batch) the
 * guessed URL resolved to an unrelated file — this site's own logo graphic —
 * which silently overwrote the real product photo on disk. See the commit
 * that removed this logic, and the comments in src/lib/catalog.ts on the
 * `rfid-integrated-reader` entry, for the full story. Do not reintroduce a
 * "guess a nearby URL and trust whatever comes back" step here — if a higher-
 * resolution source is wanted, its exact URL should be verified (e.g. by
 * viewing the file) and added to the catalog as `remote` directly.
 */

import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");
const FORCE = process.argv.includes("--force");

/** Pull the asset list out of the catalog without needing a TS toolchain. */
async function readAssets() {
  const PDF = "/brochures";
  const WP = "https://networktoll.com/wp-content/uploads";

  // catalog.ts and solutions.ts each define their own `IMG` const pointing at
  // a different folder, so a `${IMG}/...` template means different things in
  // each file. Parse them separately rather than concatenating, so the right
  // folder is substituted.
  const files = [
    { path: "src/lib/catalog.ts", img: "/images/products" },
    { path: "src/lib/solutions.ts", img: "/images/solutions" },
  ];

  // src/href immediately followed by remote, template-literal or plain string.
  const re = /(?:src|href):\s*[`"]([^`"]+)[`"],\s*\n\s*remote:\s*[`"]([^`"]*)[`"]/g;

  const assets = new Map();
  for (const { path, img } of files) {
    const source = await readFile(join(ROOT, path), "utf8");
    const expand = (s) =>
      s
        .replace(/^\$\{IMG\}/, img)
        .replace(/^\$\{PDF\}/, PDF)
        .replace(/^\$\{WP\}/, WP);

    let m;
    re.lastIndex = 0;
    while ((m = re.exec(source))) {
      const local = expand(m[1]);
      const remote = m[2] ? expand(m[2]) : "";
      if (!assets.has(local)) assets.set(local, remote);
    }
  }
  return [...assets].map(([local, remote]) => ({ local, remote }));
}

async function download(url) {
  const res = await fetch(url, {
    headers: {
      // WP installs behind a WAF commonly reject the default fetch UA.
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36",
      Referer: "https://networktoll.com/",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

const results = { saved: 0, skipped: 0, missing: [], failed: [] };

for (const { local, remote } of await readAssets()) {
  const dest = join(PUBLIC, local);

  if (!remote) {
    // Assets that ship with the repo (the branded placeholder) have no
    // upstream and are not missing — only report ones that aren't on disk.
    if (!(await exists(dest))) results.missing.push(local);
    continue;
  }
  if (!FORCE && (await exists(dest))) {
    results.skipped++;
    continue;
  }

  let buf;
  try {
    buf = await download(remote);
  } catch {
    results.failed.push({ local, remote });
    continue;
  }

  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  results.saved++;
  process.stdout.write(`  ✓ ${local}\n`);
}

console.log(`\n${results.saved} saved, ${results.skipped} already present.`);

if (results.failed.length) {
  console.log(`\n${results.failed.length} failed to download:`);
  for (const f of results.failed) console.log(`  ✗ ${f.local}  <-  ${f.remote}`);
}

if (results.missing.length) {
  console.log(
    `\n${results.missing.length} asset(s) have no upstream file and must be supplied by the client:`
  );
  for (const m of results.missing) console.log(`  ? ${m}`);
}

if (results.failed.length) process.exitCode = 1;
