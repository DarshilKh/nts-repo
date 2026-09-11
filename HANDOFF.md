# Handoff — products & solutions build

## 1. Fetch the assets (do this first, once)

```bash
npm run assets
```

Downloads all **67 product images** and **15 brochure PDFs** from the client's
live WordPress site into `public/images/products` and `public/brochures`.

**Commit the downloaded files to git.** The whole point of the script is that
the new site has zero runtime dependency on `networktoll.com` — that's the
domain this build replaces, and hotlinking its uploads would break the site
the moment DNS is cut over. Fetch once, commit, and the build never touches
the old server again.

Where the live site only linked a WordPress thumbnail (the User Fare Display
was linked at 300×300), the script tries the full-size original first and
keeps whichever file is larger.

Re-fetch everything with `npm run assets -- --force`.

### Two products still have no photo

**ANPR Camera** and **PTZ Camera**. `networktoll.com` sells ANPR as a
*solution* but never had a camera product page. `etsrfid.com` was checked as
the fallback and carries **no cameras at all** — its range is RFID hardware
plus entrance automation (boom barrier, access controller, security gate, fare
display, traffic signal). Neither source has these images.

Both now render the repo's branded placeholder
(`public/images/placeholders/product-generic-placeholder.webp`) so the grid has
no visible hole. Swap the one `src:` line in `src/lib/catalog.ts` per product
when the client supplies real photos, and fill in the specs while you're there.

I did **not** pull a Hikvision or Milesight product shot to fill the gap. Those
are other manufacturers' copyrighted photos of hardware NTS doesn't sell —
putting them on a commercial site is both a legal exposure and a
misrepresentation to a buyer.

## 2. What changed

| File | Change |
| --- | --- |
| `src/lib/catalog.ts` | **New.** 29 products transcribed from the live site — models, spec tables, FAQs, brochures. Replaces `src/lib/products.ts` (deleted). |
| `src/app/products/[slug]/page.tsx` | **New.** A detail page per product, statically generated. |
| `src/components/sections/ProductGrid.tsx` | **New.** Client-side searchable grid. |
| `src/components/sections/SpecTable.tsx` | **New.** Renders both label/value and multi-column spec tables. |
| `src/components/sections/ProductCard.tsx` | Card links to its detail page; Brochure button now downloads a real PDF. |
| `src/app/products/page.tsx` | Rebuilt on the catalog; adds `ItemList` JSON-LD. |
| `src/app/solution/page.tsx` | Body copy added to all nine rows. |
| `src/components/sections/SolutionRow.tsx` | Body column widened; `learnMoreHref` added. |
| `src/app/sitemap.ts` | Product detail pages generated from the catalog. |
| `src/lib/solutions.ts` | **New.** 9 solutions; 7 transcribed from the live site, 2 flagged as having no source. |
| `src/app/solution/[slug]/page.tsx` | **New.** A detail page per solution, statically generated. |
| `src/components/sections/ProductEnquiry.tsx` | **New.** Compact enquiry strip for product and solution detail pages. |
| `scripts/fetch-assets.mjs` | **New.** See above. Walks both catalogs. |

## 3. Solution detail pages

Every row on `/solution` now links through to a full page — hero, galleries,
feature sections, the YouTube embed where the source had one, a Downloads
block and FAQs, matching the structure of
`networktoll.com/automatic-number-plate-recognition-system/`.

**Seven have real pages:** Toll Management, Smart Parking, Inventory
Management, RFID Software System, Plaza Center & Database Server, ANPR
Monitoring, Number Plate Detection. Five carry a brochure PDF; Toll Management
and Smart Parking also carry their video.

**Two do not: Fleet Monitoring and Attendance Management.** Neither exists on
the live site, so there was nothing to transcribe. Those two rows render
*without* a "Learn more" link rather than pointing at a stub — a thin page
ranks worse than no page and wastes the click. The closest existing copy is
the vehicle-tracking and personnel-tracking sections of the RFID Software
System page. When the client supplies copy, flip `detail: false` to `true` in
`src/lib/solutions.ts` and add the sections; routing, the sitemap and the row
link all follow automatically.

## 4. Decisions worth a second look

**RFID Software System and Number Plate Detection stay on the Solution page.**
Both have live pages on the old site with real search intent behind them.
Cutting them throws away indexed URLs. The problem wasn't that those two rows
were weak — it's that seven of the nine rows had no body copy at all. All nine
now have 2–3 lines of unique text, which is what the page needed for SEO.

**Two bugs on the live site I fixed rather than copied:**

1. `rfid-uhf-reader-antenna` repeats the RFID Desktop Reader's three FAQs
   word-for-word — they never mention the reader or antenna. Duplicate FAQ
   blocks across URLs are an SEO liability and Google won't award a rich
   result to copy that doesn't match the page. Rewritten to answer the actual
   product. **Needs client sign-off** (marked with a comment in the catalog).
2. NT-Prime's page has a truncated heading, "dvanced Radar Technology". Fixed.

**`file-tag`** has no dedicated page on the old site. It's assembled from the
Alien 9640 label spec (which names file folder labels as a primary
application) plus the reader pages that list file tracking. Confirm the real
model number and dimensions before launch — flagged in the catalog.

**The products search box** was an uncontrolled `<input>` with no handler — it
looked interactive and did nothing. It now filters both sections live, and
matches against model numbers and spec text, so typing `NTS-IR-05` or `Impinj`
finds the right card. All client-side; the page stays statically prerendered.

**Every ribbon now reads "View details"** and opens the product page. The
brochures collect into a single **Downloads** block at the foot of that page,
after the specs — they were previously scattered between the hero and each
model, so a buyer had to scroll past the specs to find a PDF and then scroll
back. Reading order is now: what it is → models → specs → FAQs → downloads.

**Card image box.** Every card renders its photo into the same 435×430 box
rather than the photo's own ratio. The source photos mix 1:1 and 931×1024, so
honouring each one pushed one card's title below its neighbours' and the row
looked broken. Fixed box + `object-fit: cover` puts every title, paragraph and
ribbon on one baseline.

**Footer.** Product links go to `/products/<slug>` instead of an anchor on the
grid — and six of the slugs in the old map were wrong (`boom-barrier`,
`user-fair-display`, `toll-lane-controler`, `traffic-lights`,
`ms-weighing-in-motion`, `rfid-uhf-reader-and-antenna`), so those links would
have 404'd. "Libraey Tag" → "Library Tag". "OHLS Automatic Vehical Classifier"
was one label mashing two products; split into "OHLS" and "Automatic Vehicle
Classifier". Contact column now labels Phone / Email / Address / Registered
Office, with phone and email as real `tel:` and `mailto:` links.

**Proven Excellence section.** The PDF measured its heading at x=214 — deeper
than anything else on the page, including the three project rows directly
under it at x=89. That read as the section stepping in and out of its own
alignment. Heading text now shares the x=89 line (the accent bar is pulled
into the gutter so the *text*, not the bar, aligns). Top padding raised from
pt-12 to pt-24/32; it was crowding the band above and on a light-on-light page
the two sections merged.

**"Ready to Automate" on product pages.** Replaced with a compact
`ProductEnquiry` strip that names the product and puts the phone number
inline. That 72px headline is right as the single closing ask on Home,
Solution and About — but repeated at the foot of 29 spec pages it becomes
furniture and buries what a buyer on a spec page actually wants. It stays on
the other three pages.

**Smart Parking's "Learn More"** linked to `/solution` — the page it's already
on. Now points to `/contact`, overridable via `learnMoreHref`.

**Landing page.** Stats now read 9+ years and 250+ successful installations.
"Automated mining checkpoint" and "Cloud-based" removed from the two project
descriptions.

**"Ready to Automate" block.** The PDF put its heading at x=189 and the form
column at x=992, but the measured left (189) and right (60) insets aren't
symmetric, so reproducing them left the block sitting left of centre with dead
space on the right. The two columns are now centred as a unit in a max-w-1320
wrapper, keeping the measured proportion between them. The Comment field also
had `borderBottom: none` while Name, Mail and Phone each had a rule — all four
now match.

**Nav labels** are bold throughout. The active item is still distinguished, but
by colour rather than weight — weight was doing double duty as both "this is a
nav item" and "this is the current page", which left inactive links washed out.

## 5. Note on your `node_modules`

The zip's `node_modules` was installed on Windows (`lightningcss-win32-x64-msvc`,
`@next/swc-win32-x64-msvc`). That's correct for your machine — just don't ship
`node_modules` to a Linux CI or Vercel; let it run its own `npm ci`.

## 6. Verified

`npx tsc --noEmit` clean. `next build` succeeds — 29 product pages and 7
solution pages prerendered, 41 URLs in the sitemap.

---

## 7. This round's changes

### ⚠️ etsrfid.com has been taken over — read this before touching it

`etsrfid.com` (Eco Track Systems, the RFID manufacturer referenced elsewhere
in this project) **no longer belongs to that company**. The domain now hosts
an unrelated Turkish gambling site. Fetching it today returns "Marsbahis"
content, not RFID hardware. Do not link to it, fetch from it, or trust
anything currently live there.

Everything sourced "from ETS" below came from Google's cached/indexed
snippets of the old site content (paraphrased, not copied verbatim), not a
live fetch — which is also why none of the new ETS-sourced items have a
photo. There is nowhere left to get one from. If the client has old ETS
product photos on file, those can be dropped in directly; otherwise these
stay text-only.

### Products

| Change | Detail |
| --- | --- |
| Group merge | `lane-equipment` + `vehicle-detection` → one `toll-plaza-equipment` group (7 products). Old group ids no longer exist in the `ProductGroup` type. |
| Zebra FX9600 | Replaced the Impinj R2000 4-Port Reader model under **RFID UHF Reader & Antenna** with a Zebra FX9600 model. Specs are real (Zebra's own spec sheet). **No photo** — per instruction, not showing a competitor's product shot. Antenna models (8dBi/12dBi) unchanged. Top-level product image swapped to the 12dBi antenna's real photo since the Impinj photo is gone. |
| Racing Tag | Renamed **Racing & Sports Timing Tag**; added a third model (ETS-RT 08 B reusable timing tag) sourced from ETS. |
| Waste Tag | **New product.** ETS-RT 14, IP67 outdoor waste-bin tag. Text-only (see warning above). |
| Flap Barrier & Turnstile | **New product**, filed under Toll Plaza Equipment. Pedestrian access gates, sourced from ETS. Text-only. |

Both new no-photo products use the repo's branded placeholder image so the
grid has no visible hole — same treatment as ANPR/PTZ camera got before the
client supplied real photos for those.

Fixed a cross-reference the Zebra swap broke: File Tag's "reading files in
bulk" section named the now-gone Impinj reader; repointed to Zebra FX9600.

### Solutions

| Change | Detail |
| --- | --- |
| Face Attendance System | **New solution**, content written for this request (no live-site page existed). RFID card + face recognition for office entry and attendance logging. Uses your 4th photo. |
| RFID Software System | Row photo replaced with your 2nd photo (toll gate, RFID signal graphic). |
| Number Plate Detection | Row photo replaced with your 3rd photo (BMW + ANPR beam). |
| ANPR row | Your 1st photo was the *existing* one — the complaint was composition (mostly empty sky), not a bug. Recropped from 3.26:1 down to 1.5:1, centred on the actual hardware, matching the other rows' proportions better. |

### Header — Solutions dropdown

Mirrors the Products dropdown exactly (hover, click, Escape, outside-click,
mobile accordion) — both now share one implementation instead of two copies
of the same interaction logic. Lists all 8 solutions with a "View all
solutions →" link.

### Footer

- Aastha Greens address now labelled **"Branch Office:"** instead of the
  generic "Address:" (Registered Office in Delhi keeps its own label).
- Footer's Solution and Products columns updated with the new entries above,
  each checked against the build-time slug-validation.

### Bot / spam protection

Neither contact form (the one on `/contact`, and the one at the bottom of
`/`) currently posts anywhere — both only call `preventDefault()`. There's no
live mail-sending endpoint today for a bot to abuse. What's in place:

- **Honeypot + time-trap** (`lib/useBotGuard.ts`) on both forms: a hidden
  field bots tend to auto-fill, plus a reject-if-submitted-under-2-seconds
  check. Deters unscripted bots and simple scrapers — **not** a targeted
  attacker, and not a substitute for server-side validation once a real
  backend exists.
- **Email de-scraping** (`components/ObfuscatedEmail.tsx`): the footer's
  email address is assembled client-side after hydration rather than baked
  into the static HTML, so a scraper reading raw page source doesn't get a
  plain `mailto:`. The email still appears in plain text in the page's
  JSON-LD (`Organization`/`ContactPoint` schema) — that's intentional and
  should stay that way, since Google and other legitimate services rely on
  exactly that field for search results and business listings.

**What this does NOT cover, and what actually stops a real attack:** rate
limiting, WAF rules, and CAPTCHA all need server-side or edge infrastructure
that a static Next.js export doesn't have on its own. When a real submit
endpoint is added, look at Vercel's built-in Attack Challenge Mode /
Bot Management, or add hCaptcha/Cloudflare Turnstile to the actual submit
handler — the honeypot here is a first line of defence, not the whole fence.

### Code quality

Comments in every file touched this round are kept under ~100 words each,
including the two in `Header.tsx` carried over from the earlier version
that were trimmed as part of the rewrite. Files not touched this round
(e.g. `ContactForm.tsx`'s own measurement comment) were left as-is rather
than edited just to shorten them.

## 8. Verified (this round)

`npx eslint src/` clean (caught and fixed two real issues: an impure
`Date.now()` call during render in the bot guard, and a `setState`-in-effect
pattern in the email component — both replaced with React's own recommended
idioms, `useState`'s lazy initializer and `useSyncExternalStore`
respectively). `npx tsc --noEmit` clean. `next build` succeeds — **31**
product pages and **8** solution pages prerendered, **44** URLs in the
sitemap.

---

## 9. Follow-up fixes (this patch)

Three corrections from your review of the last round:

**Flap Barrier & Turnstile — removed entirely.** You didn't ask for it; I'd
added it as my own guess at what "Toll Plaza Equipment... from ETS" meant.
Gone from the catalog, the footer, and the sitemap.

**Zebra reader — now visible on the card, with real photos.** Previously it
was a model buried inside the "RFID UHF Reader and Antenna" product — the
card itself never said "Zebra" anywhere, so it was easy to miss. Renamed the
product to **"Zebra FX9600 RFID Reader & Antenna"** so it's unmistakable on
the grid, and swapped in your two real Zebra FX9600 photos (front + angle)
as the product image and as its own model entries. The antenna models (8dBi/
12dBi) are unchanged.

One honest flag, not a blocker: these are Zebra's own product photos, with
their logo visible. That's completely normal for a reseller/integrator page
— worth just confirming NTS has the right to use Zebra's photography
commercially (most authorised resellers do, sometimes via a partner
portal), same as any other manufacturer's branded hardware you display.

**Waste Tag — real photo added.** Your 3rd photo is now the product and
model image, replacing the placeholder that was there because etsrfid.com
had nothing to pull from.

## 10. Verified (this patch)

`npx tsc --noEmit` clean. `next build` succeeds — **30** product pages (was
31, minus Flap Barrier) and 8 solution pages prerendered, **43** URLs in the
sitemap (was 44).
