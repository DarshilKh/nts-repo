# DESIGN_SYSTEM.md
### Network Toll Solution — Reverse-Engineered Design System
Source of truth: `NTS.pdf` (6 pages, Figma export, frame width **1440pt = 1440px**, 1pt : 1px)

**Methodology.** Every number below was pulled programmatically from the PDF's vector/text layer (PyMuPDF: `get_text("dict")` for type/position/color, `get_drawings()` for shapes/fills/strokes, `get_image_info()` for photo placement) — not eyeballed off the raster preview. Where the PDF's vector layer could not resolve a value cleanly (this happens twice, noted inline), the value is flagged **[VISUAL ESTIMATE]** rather than presented as measured. Nothing in this doc is invented; anything not in the source is flagged **[NOT IN SOURCE / INFERRED]**.

---

## 0. Critical corrections vs. a "typical" rebuild

These are things that are easy to assume and that the PDF data explicitly disproves. Flagging up front because they run against default instincts:

1. **Border-radius is 0 everywhere I could test it.** Stat cards, product cards, the CTA panels, the "Get Started"/"Submit" buttons — every shape I inspected at the path level (`get_drawings()['items']`) is a plain `re` (axis-aligned rectangle) or straight `l` (line) segment. No bezier curves anywhere in card/button geometry. This is a sharp-cornered, industrial design system, not a rounded/soft one.
2. **"Get Started" / "Submit" buttons are true parallelograms**, not rounded rectangles with an icon. Path: `(0,y0) → (0,y1) → (w-Δ, y1) → (w, y0) → close`, i.e. vertical left edge, horizontal bottom edge, and the **right edge slants — full width at the top, indented at the bottom**. Δ ≈ 8.6% of button width.
3. **The vertical red accent bars are not "underline" accents.** I initially assumed a short horizontal rule under headings. The vector data shows they are **25px-wide × 162px-tall solid red vertical rectangles**, placed as corner/section-transition marks — closer to a bookend than an underline. See §3.4.
4. **Footer column dividers are red, not gray**, 2px solid vertical strokes, not a neutral hairline.
5. **Cards and section "panels" are not white** — they're filled with the exact same off-white as the page background (`#F7FCFE`). All elevation comes from a offset/blurred drop shadow, not color contrast. A card sitting on the page is visually separated only by its shadow.
6. **Body/heading font-weight cannot be read from the PDF's font metadata.** All 5 embedded font subsets report as `Manrope ExtraLight / usWeightClass 200`, even though headings render visibly bold and body text renders visibly light in the rendered preview. This is a known Figma→PDF export bug (per-weight subsets keep the wrong `name`/`OS2` table values). Treat the **rendered visual weight** as ground truth, not the embedded font metadata — see §1.2.

---

## 1. Typography

### 1.1 Font family
- Single family across the whole site: **Manrope**.
- No secondary/serif/mono family anywhere in the extracted text spans.
- Fallback stack for build: `"Manrope", "Segoe UI", system-ui, -apple-system, sans-serif`.

### 1.2 Weights (visual, not metadata — see §0.6)
Based on rendered stroke weight in the source preview, cross-referenced with typical Manrope's cut points:

| Role | Weight | Notes |
|---|---|---|
| Display / H1 (hero, CTA, FAQ headline) | ExtraBold (800) | heaviest stroke in the doc |
| Section H2 | ExtraBold (800) / Bold (700) | slightly lighter than H1 in some sections — verify per-section during build |
| Card / row titles (H3) | Bold (700) | |
| Nav links, footer column headers | SemiBold (600) | |
| Body copy, form labels, footer link lists | Regular (400) | |
| Muted/placeholder text | Regular (400) at reduced opacity/gray | |

**Action for build:** load Manrope 400/600/700/800 at minimum via `next/font/google`.

### 1.3 Type scale (measured font sizes, pt = px, from `span['size']`)

Full distinct set found across all 6 pages: `14, 16, 18, 19, 20, 21, 22, 23, 24, 26, 30, 33, 35, 36, 44, 45, 48, 52, 60, 65, 72`

Mapped to role by where each size actually appears in the document:

| Size (px) | Role | Example |
|---|---|---|
| 72 | Largest display headline | "Ready to Automate / Your Operations?" (Home/Solution/About CTA), "Frequently asked questions." (Contact) |
| 65 | Home hero H1 | "Smart Fleet / Monitoring Platform" |
| 60 | Page-title H1 (secondary pages) | "Intelligent RFID & Automation Solution" (Solution), "Let's Discuss the Right Solution" (Contact), "About Us" (About) |
| 52 | "Proven Excellence Backed by Experience and Results" (Home) |
| 48 | Stat card number | "100+", "500+", "8+", "200+" |
| 45 | Section H2 | "Designed for Diverse Operations", "Delivering Results Across Industries", project row titles ("Visitors Tracking System" etc.) |
| 44 | About page section H2 | "Our Mission", "Our Vision", "Why Choose Us" |
| 36 | "Some of our existing project."; Solution-page row titles ("Toll Management", "Smart Parking Management", etc.) |
| 35 | Product card title | "RFID Tag", "RFID Integrated Reader", etc. |
| 33 | Button label | "Get Started" |
| 30 | Hero subhead | "Monitor, Track & Manage Your Vehicles in Real Time"; Submit button label (30px, white) |
| 26 | Footer column heading | "Solution", "Product" |
| 24 | "FAQ" eyebrow label |
| 23 | Stat card caption | "Satisfied clients" etc. |
| 22 | "Why Choose Us" item heading | "Customized Solutions" etc. |
| 21 | Body paragraph (large) | hero body copy, CTA body copy, FAQ answer, Solution-row body copy |
| 20 | Body paragraph (standard) | "Designed for Diverse Operations" body, About body, Mission/Vision body, Why-choose-us item body |
| 19 | Body paragraph (compact) | "Delivering Results…" body, project card body copy, FAQ questions |
| 18 | Product card body / form field labels ("Name", "Mail", "Phone", "Comment") |
| 16 | Nav link |
| 14 | Footer link list items, footer contact block |

### 1.4 Line height / spacing (measured from consecutive span baselines)
- Multi-line headings: line-to-line delta ≈ **1.0–1.05× font size** (e.g. 72px heading lines are 86–87px apart; 45px heading lines ~54–59px apart) → tight display leading, consistent with a large ExtraBold display face.
- Body paragraphs (19–21px): line delta ≈ **24–28px** → leading ≈ 1.3×.
- Footer list rows (14px): row-to-row delta = **exactly 30px** → very open list spacing, ≈2.14× the type size.

### 1.5 Color per role (measured `span['color']`, hex)
| Hex | RGB | Usage |
|---|---|---|
| `#000000` / `#000103` | (0,0,0) | primary heading/body text |
| `#222222` | (34,34,34) | nav link text |
| `#5C5C5C` | (92,92,92) | muted body copy |
| `#595959` | (89,89,89) | contact-form placeholder-style labels |
| `#E41F26` | (228,31,38) | links, "Contact us", "Learn More", "Our team is ready to help.", active accents |
| `#FFFFFF` | (255,255,255) | text on red/dark fills (button labels) |

---

## 2. Color palette (measured `fill`/`color` from vector layer)

| Token | Hex | Source |
|---|---|---|
| `--bg` (page background, "white" panels, card fill) | `#F7FCFE` (rgb 247,252,254) | full-bleed background rects on every page; also the literal fill of stat cards / content panels — **panels are NOT pure white** |
| `--brand-red` | `#E41F26` (rgb 228,31,38 avg across samples 226–229/30–32/38) | logo, buttons, links, accent bars, input underlines, dividers |
| `--text-primary` | `#000000` | headings/body |
| `--text-muted` | `#5C5C5C` | secondary body copy |
| `--text-label` | `#595959` | form field labels |
| `--nav-text` | `#222222` | nav links |
| `--shadow-color` | `rgba(0,0,0,0.29)` | every card/button drop shadow uses **black at 29% opacity**, no other opacity value found anywhere in the document |

**Not resolvable from vector data — [VISUAL ESTIMATE]:** the dark navy panel behind the "Our Mission" / "Our Vision" icons on the About page. The region is composed of a placed raster/gradient image (`get_image_info` shows a 590×641 and 982×628 image block here), not a flat vector fill, so it can't be read as a single hex value the way the red/bg tokens can. Visual read from the rendered preview: **≈ `#1A1E24`–`#212E3F` dark navy**. Confirm by pixel-sampling the raster once the source images are re-exported at higher fidelity, or ask the client for the original panel asset.

---

## 3. Spacing, layout, and shape geometry

### 3.1 Frame / container
- Figma frame width: **1440px** (all 6 pages).
- Full-bleed background rect spans `x:0–1440` on every page.
- The **stat-card row** (Home) is the cleanest evidence of an actual content container: 4 cards of 317.3px each + 3 gaps of 18.6px = 1325px total, left edge at x=60 → container ≈ **1320px wide, ~60px side margin** at 1440 viewport.
- **This 60px/1320px grid is not used consistently everywhere** — hero heading starts at x=122, "Delivering Results" heading at x=154, "Proven Excellence" heading at x=214, footer columns at x=588/926/1077. Rather than forcing one rigid container value, treat each section's left inset as an explicit, independently-set value (table in §4) — the source file itself is not on a single strict grid.

### 3.2 Shadows (measured: shadow rect vs. panel rect, per card)
Pattern observed identically on stat cards (Home) and product cards (Products): a black, 29%-opacity rectangle sits behind a `--bg`-colored panel rectangle, offset like this (product card example):
- Panel: `435 × 644px`
- Shadow rect: `486 × 696px`, positioned `x: -22 / y: -20` relative to panel top-left, extending `+29 / +31` past panel bottom-right.

Net effect: **asymmetric shadow, heavier on bottom-right, ~20-30px spread, black @ 29% opacity, no visible top/left shadow.** As a CSS approximation: `box-shadow: 8px 12px 24px rgba(0,0,0,0.16)` (opacity reduced from the flattened 29% to approximate real blur falloff — the 29% figure is the *flattened bounding-box* opacity, not the peak blur opacity, since PDF flattens soft shadows to solid shapes).

### 3.3 Cards
| Card type | Panel size | Radius | Gap between cards |
|---|---|---|---|
| Stat card (Home, 4-up row) | 317.3 × 295.6px | **0px** | 18.6px |
| Product card (Products, 3-up grid) | 435 × 644px | **0px** | 17px (both row and column gap) |

### 3.4 Decorative red accent shapes
- **Vertical accent bar:** `25px wide × 162px tall`, solid `#E41F26`, placed at section-transition corners (e.g. near the Home "Proven Excellence" section boundary). Not centered under a heading — treat as a standalone corner mark, not a text underline.
- **"Ribbon fold" mark** (near CTA sections): two overlapping small rectangles, ~52×34px each inside a ~94×64px bounding box, solid red. Reads as a folded-corner/flag flourish. Appears near the "Ready to Automate" heading on every page that has the CTA block.
- **Logo mark:** not two shapes as I originally assumed — **three overlapping red rectangles**, bounding box ≈ 67×45px, positioned top-left at (122, 79) on every page.

### 3.5 Buttons
- Shape: parallelogram, see §0.2. Measured from the Home "Get Started" button: bounding box 390×83px, right-edge slant Δ ≈ 33.6px (≈8.6% of width).
- Fill: `#E41F26` solid, no gradient found.
- Label color: white (Submit button, 30px) / red button-on-red uses white — but "Get Started" label itself renders in dark text over red in the source at 33px — **verify exact label color against the raster preview before finalizing** (span color extraction for that exact glyph run returned inconsistent results across export passes; treat as [VISUAL ESTIMATE: white]).
- Radius: **0px** (confirmed via path inspection, straight `l` segments only).

### 3.6 Form inputs (Contact page, measured strokes)
- Underlined inputs (Name/Phone/City, Email/Company/Service): **3px solid `#E41F26`** bottom rule, field width 263px, no visible top/left/right border — true underline-only input style.
- Message textarea: **2px solid `#E41F26`** full rectangle border, 388×188px, **0px radius**.
- FAQ divider rules: 2px solid `#E41F26`, full question-column width (380px).
- Footer column divider rules: 2px solid `#E41F26` **(red, not gray)**, full column height (438px).

### 3.7 Images (measured aspect ratios from `get_image_info`)
| Image | Measured size (px) | Aspect ratio |
|---|---|---|
| Hero dashboard illustration | 708 × 472 | 1.5 : 1 |
| "Designed for Diverse Operations" banner (toll gate) | 517 × 349 | ~1.48 : 1 |
| "Delivering Results" banner (warehouse aerial) | 516.5 × 296 | ~1.75 : 1 |
| Visitors Tracking project photo | 841 × 533 | ~1.58 : 1 |
| Inter State Toll Collection project photo | 843 × 531 | ~1.59 : 1 |
| Toll Management System project photo | 841 × 532 | ~1.58 : 1 |
| Stat icon glyphs | 179 × 179 (bulb icon 142×142) | 1 : 1 |
| Logo mark | 67 × 45 | ~1.49 : 1 |

Row/column images are **not uniformly cropped to one fixed ratio** — each is close to but not exactly the same aspect. Build should preserve each measured ratio per-image rather than forcing one shared `aspect-*` value across all rows.

### 3.8 Breakpoints
**[NOT IN SOURCE / INFERRED]** — the PDF is a single static 1440px desktop frame; no tablet/mobile frame exists in the file, so there is no measured mobile layout to reproduce. Standard responsive breakpoints will need to be designed (not reverse-engineered) for <1440px. Flagging this now so it's not confused with a measured value later.

---

## 4. Per-page audit tables (left-inset / size reference)

### 4.1 Home
| Element | x | y | size/notes |
|---|---|---|---|
| Nav links | 729–1318 | 95 | 16px |
| Hero H1 "Smart Fleet Monitoring Platform" | 122 | 352 | 65px |
| Hero subhead | 122 | 536 | 30px |
| Hero body | 122 | 586 | 21px |
| "Get Started" button | 122 | 771 | 33px label, 390×83 shape |
| Stat row | 60 → 1385 | 897–1192 | 4×(317.3×295.6), gap 18.6 |
| "Designed for Diverse Operations" H2 | 599 | 1299 | 45px |
| "Delivering Results Across Industries" H2 | 154 | 1622 | 45px |
| "Proven Excellence…" H2 | 214 | 2070 | 52px |
| Project rows (3×) | 89 | 2583 / 3132 / 3680 | title 45px, body 18px, photo ~841×532 |
| CTA H1 "Ready to Automate" | 189 | 4124 | 72px |
| CTA form labels | 992 | 4198+ | 18px |
| Footer col headers | 588 / 926 / 1077 | 4722 | 26px |
| Footer links | same x | 4776+ (30px row height) | 14px |

### 4.2 Solution
| Element | x | y | size |
|---|---|---|---|
| H1 "Intelligent RFID & Automation Solution" | 182–292 | 268/340 | 60px |
| Body + "Contact us" | 653 | 477 / 544 | 20px / 20px red |
| Row titles (7 rows, alternating sides) | 964 or 85 or 54 | 876…2931 | 36px |
| "Smart Parking Management" body + Learn More | 85 | 1340 / 1453 | 21px |

### 4.3 Products
| Element | x | y | size |
|---|---|---|---|
| Product card title | 104 / 556 / 1008 | 862 (row 1) | 35px |
| Product card body | same col x | 916 | 18px, 2-line wrap |
| Card panel | — | — | 435×644, gap 17px, radius 0 |
| Row pitch (top-to-top) | — | 661px | includes card + gap |

### 4.4 Contact
| Element | x | y | size |
|---|---|---|---|
| H1 "Let's Discuss the Right Solution" | 281–355 | 282/354 | 60px |
| Body + "Our team is ready to help." | 685 | 503 / 589 | 20px / 21px red |
| Form fields (2-col + message) | 189 / 516 / 843 | 796–1027 | 18px labels, underline/box per §3.6 |
| Submit button | 1167 | 1081 | 30px white label |
| "FAQ" eyebrow | 122 | 1255 | 24px |
| "Frequently asked questions." H1 | 189 | 1364 | 72px |
| FAQ Q/A rows | 829 | 1357–1630 | 19px, 2px red divider, 380px wide |

### 4.5 About
| Element | x | y | size |
|---|---|---|---|
| H1 "About Us" | 704 | 279 | 60px |
| Body | 704 | 378 | 20px |
| "Our Mission" H2 + body | 527 | 685 / 758 | 44px / 20px |
| "Our Vision" H2 + body | 372 | 981 / 1055 | 44px / 20px |
| "Why Choose Us" H2 | 653 | 1272 | 44px |
| Why-choose-us items (4×) | 653 | 1371, 1456, 1547, 1636 | heading 22px, body 20px |

*(CTA + Footer on Solution/Contact/About are byte-identical in position/size to Home's — see §4.1 — confirmed by diffing spans across pages.)*

---

## 5. Open items to confirm visually before Phase 5 sign-off

1. Dark navy Mission/Vision icon panel — exact hex (§2, flagged estimate).
2. "Get Started" button label color — confirm white vs. dark (§3.5).
3. Section H2 weight: is it uniformly ExtraBold, or does it step down to Bold in some sections? Metadata can't answer this (§0.6); needs a side-by-side stroke-width comparison against the rendered preview per section.
4. Confirm red accent-bar (§3.4) placement rule empirically per page before treating it as a reusable component — it does not appear to be a fixed offset from its adjacent heading in the two instances checked.

---

**End of Phase 1.** No component or page code has been written. Waiting for confirmation before proceeding to Phase 2 (project setup / folder structure / design tokens).
