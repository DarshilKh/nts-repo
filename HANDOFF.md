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
