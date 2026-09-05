/**
 * Design tokens as typed JS values, mirroring the CSS custom properties in
 * globals.css. Source: DESIGN_SYSTEM.md. Use these (or the matching CSS
 * vars) instead of hardcoding numbers in components.
 */

/** §1.3 — exact measured type scale, by role */
export const fontSize = {
  displayXl: 72, // CTA / FAQ headline
  displayLg: 65, // home hero H1
  displayMd: 60, // secondary page H1
  h2Xl: 52, // "Proven Excellence..."
  statNumber: 48,
  h2: 45, // standard section H2
  h2Alt: 44, // about page section H2
  h3Lg: 36, // project / solution row titles
  h3: 35, // product card title
  button: 33,
  subhead: 30, // hero subhead / submit button label
  footerHeading: 26,
  eyebrow: 24,
  statLabel: 23,
  itemHeading: 22,
  bodyLg: 21,
  body: 20,
  bodySm: 19,
  bodyXs: 18,
  nav: 16,
  footerLink: 14,
} as const;

/** §3.3 — measured card geometry. Radius is 0 on every card checked. */
export const card = {
  radius: 0,
  stat: { width: 317.3, height: 295.6, gap: 18.6 },
  product: { width: 435, height: 644, gap: 17 },
  shadow: "8px 12px 24px rgba(0,0,0,0.16)",
} as const;

/**
 * §3.5 — button geometry (parallelogram, slanted edge). IMPORTANT: this is
 * NOT one uniform slant reused everywhere — path-level inspection of all
 * three buttons in the source gives three different ratios:
 *   "Get Started" (Home/Solution/About CTA): 8.6%, cuts the bottom-right
 *   "Brochure" (Products):                   6.1%, cuts the bottom-right
 *   "Submit" (Contact):                      11.9%, cuts the TOP-LEFT
 *     (mirrored — this button is flush to the frame's right edge, so its
 *     slant runs the opposite direction from the other two)
 * Each is reproduced with its own measured ratio rather than one shared
 * constant.
 */
export const button = {
  radius: 0,
  slantRatioGetStarted: 0.086, // Δ/width = 33.6/390, "Get Started"
  slantRatioBrochure: 0.061, // Δ/width = 12.28/200.9, "Brochure"
  slantRatioSubmit: 0.119, // Δ/width = 40.41/339.6, "Submit" (mirrored)
} as const;

/** Parallelogram clip-path. `mirrored: false` (default) cuts the
 * bottom-right corner, matching "Get Started" and "Brochure". `mirrored:
 * true` cuts the top-left corner instead, matching "Submit" — see the
 * comment on `button` above for why these aren't the same shape. */
export function parallelogramClipPath(
  slantRatio: number = button.slantRatioGetStarted,
  mirrored: boolean = false
): string {
  const cut = slantRatio * 100;
  return mirrored
    ? `polygon(${cut}% 0, 100% 0, 100% 100%, 0 100%)`
    : `polygon(0 0, 100% 0, ${100 - cut}% 100%, 0 100%)`;
}

/** §3.4 — decorative vertical accent bar */
export const accentBar = {
  width: 25,
  height: 162,
} as const;
