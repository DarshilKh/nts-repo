import Link from "next/link";
import Logo from "./Logo";
import Frame from "./ui/Frame";
import ObfuscatedEmail from "./ObfuscatedEmail";
import {
  solutionLinks,
  solutionLinkSlugs,
  productLinksCol1,
  productLinksCol2,
  productLinkSlugs,
  companyInfo,
} from "@/lib/data";
import { solutionHref } from "@/lib/solutions";

/**
 * §4 — footer measurements are identical on Home/Solution/Contact/About
 * (left inset 155, columns 370/343/512, divider gaps 61/56) but measurably
 * DIFFERENT on Products (columns 363/310/486, divider gaps 33/42, dividers
 * land at x=518/861 instead of x=525/868). Rather than forcing one shared
 * value, this takes an explicit variant for the one outlier page.
 */
const rowPitch = { lineHeight: "30px" };

/**
 * The left column previously ran phone, email and two addresses as four bare
 * lines of grey text, so it read as one undifferentiated block — you had to
 * parse each line to work out what it was. GSTIN and CIN already carried bold
 * labels; this applies the same treatment to the rest so the column scans.
 */
const labelStyle = { fontWeight: 700, color: "var(--text-primary)" } as const;

const variants = {
  default: { cols: "370px 343px 512px", pad2: 61, pad3: 56 },
  products: { cols: "363px 310px 486px", pad2: 33, pad3: 42 },
} as const;

// The 1440px reference frame has no padding of its own (see Frame.tsx), so
// the footer's own left/right inset has to add up to whatever's left after
// the three measured columns. Splitting that remainder evenly keeps the
// whole grid centered inside the frame instead of drifting toward one side
// — with a fixed 155/60 split (this used to be hardcoded) the default
// variant sat ~48px right of center and the products variant ~66px further
// still, since its narrower columns left extra remainder unaccounted for.
const FRAME_WIDTH = 1440;
function sidePad(cols: string) {
  const total = cols
    .split(" ")
    .reduce((sum, c) => sum + parseInt(c, 10), 0);
  return Math.round((FRAME_WIDTH - total) / 2);
}

export default function Footer({
  variant = "default",
}: {
  variant?: keyof typeof variants;
}) {
  const g = variants[variant];
  const pad = sidePad(g.cols);

  return (
    <footer style={{ background: "var(--bg)" }}>
      <Frame>
        <style>{`
          @media (min-width: 1440px) {
            .footer-grid-${variant} { display: grid; grid-template-columns: ${g.cols}; padding-left: ${pad}px; padding-right: ${pad}px; }
            .footer-col2-${variant} { padding-left: ${g.pad2}px; }
            .footer-col3-${variant} { padding-left: ${g.pad3}px; }
          }
        `}</style>
        <div
          className={`footer-grid-${variant} grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10 pt-14 pb-10 px-6 min-[1440px]:gap-x-0`}
        >
          <div>
            <Logo />
            <div className="mt-6 flex flex-col gap-3" style={{ fontSize: "var(--fs-footer-link)", color: "var(--text-muted)" }}>
              <p style={rowPitch}>
                <span style={labelStyle}>GSTIN:</span>{" "}
                {companyInfo.gstin}
                <br />
                <span style={labelStyle}>CIN No:</span>{" "}
                {companyInfo.cin}
              </p>
              <p style={rowPitch}>
                <span style={labelStyle}>Phone:</span>{" "}
                <a href={`tel:${companyInfo.phone.replace(/\s/g, "")}`} className="hover:underline">
                  {companyInfo.phone}
                </a>
              </p>
              <p style={rowPitch}>
                <span style={labelStyle}>Email:</span>{" "}
                <ObfuscatedEmail
                  user={companyInfo.email.split("@")[0]}
                  domain={companyInfo.email.split("@")[1]}
                  className="hover:underline"
                />
              </p>
              <p style={rowPitch}>
                <span style={labelStyle}>Branch Office:</span>{" "}
                {companyInfo.addressLine1}
                <br />
                {companyInfo.addressLine2}
              </p>
              <p style={rowPitch}>
                <span style={labelStyle}>Registered Office:</span>{" "}
                {companyInfo.regOffice}
              </p>
            </div>
          </div>

          <div className={`footer-col2-${variant} min-[1440px]:border-l-2`} style={{ borderColor: "var(--brand-red)" }}>
            {/* h2, not h4: every page's content headings top out at h2/h3, so an
                h4 here skipped levels and failed axe's heading-order check.
                The global h1-h4 rule styles h2 identically, so this is a
                markup-only change. */}
            <h2 style={{ fontSize: "var(--fs-footer-heading)", fontWeight: 800, marginBottom: "1rem" }}>
              Solution
            </h2>
            <ul className="flex flex-col" style={{ fontSize: "var(--fs-footer-link)", color: "var(--text-muted)" }}>
              {solutionLinks.map((s) => {
                const href = solutionLinkSlugs[s] ? solutionHref(solutionLinkSlugs[s]) : undefined;
                return href ? (
                  <li key={s} style={rowPitch}>
                    <Link href={href} className="hover:underline">
                      {s}
                    </Link>
                  </li>
                ) : (
                  <li key={s} style={rowPitch}>
                    {s}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={`footer-col3-${variant} min-[1440px]:border-l-2`} style={{ borderColor: "var(--brand-red)" }}>
            <h2 style={{ fontSize: "var(--fs-footer-heading)", fontWeight: 800, marginBottom: "1rem", textAlign: "center" }}>
              Products
            </h2>
            <div className="grid grid-cols-2 gap-x-6">
              <ul className="flex flex-col" style={{ fontSize: "var(--fs-footer-link)", color: "var(--text-muted)" }}>
                {productLinksCol1.map((p) => (
                  <li key={p} style={rowPitch}>
                    <Link href={`/products/${productLinkSlugs[p]}`} className="hover:underline">
                      {p}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col" style={{ fontSize: "var(--fs-footer-link)", color: "var(--text-muted)" }}>
                {productLinksCol2.map((p) => (
                  <li key={p} style={rowPitch}>
                    <Link href={`/products/${productLinkSlugs[p]}`} className="hover:underline">
                      {p}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Frame>
    </footer>
  );
}
