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
 * WordPress stores a full-size original alongside its generated thumbnails, so
 * for a URL like `foo-931x1024.png` this also tries `foo.png` first and keeps
 * whichever is larger. Several catalog images were only linked at thumbnail
 * size on the live site (the User Fare Display, for instance, at 300x300).
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

/** For `name-931x1024.png` return `name.png` — WordPress's full-size original. */
function fullSizeVariant(url) {
  const stripped = url.replace(/-\d+x\d+(\.[a-z]+)$/i, "$1");
  return stripped === url ? null : stripped;
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

const results = { saved: 0, skipped: 0, upgraded: 0, missing: [], failed: [] };

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

  const candidates = [fullSizeVariant(remote), remote].filter(Boolean);
  let best = null;
  let bestUrl = null;

  for (const url of candidates) {
    try {
      const buf = await download(url);
      if (!best || buf.length > best.length) {
        best = buf;
        bestUrl = url;
      }
      // The full-size variant is tried first; if it worked, don't bother
      // fetching the thumbnail as well.
      if (url === candidates[0]) break;
    } catch {
      /* try the next candidate */
    }
  }

  if (!best) {
    results.failed.push({ local, remote });
    continue;
  }

  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, best);
  results.saved++;
  if (bestUrl !== remote) results.upgraded++;
  process.stdout.write(`  ✓ ${local}\n`);
}

console.log(
  `\n${results.saved} saved (${results.upgraded} at full size), ${results.skipped} already present.`
);

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
