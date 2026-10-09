import Link from "next/link";
import Logo from "./Logo";
import Frame from "./ui/Frame";
import ObfuscatedEmail from "./ObfuscatedEmail";
import {
  solutionLinksCol1,
  solutionLinksCol2,
  solutionLinkSlugs,
  productLinksCol1,
  productLinksCol2,
  productLinkSlugs,
  companyInfo,
} from "@/lib/data";
import { solutionHref } from "@/lib/solutions";
import { fx } from "@/lib/tokens";

/**
 * Layout: one symmetric scheme for every page. The three columns used to be
 * the PDF's measured widths (370 / 512 / 512, and a separate set for the
 * Products page) with padding only on each column's LEFT edge — so links
 * started ~73px after one divider but ran to within ~16px of the next, and
 * the columns read as unevenly spaced. Now the two link columns are exactly
 * equal widths with the same padding on both sides, the info column is a
 * little narrower, and the footer is identical on every page.
 */
const rowPitch = { lineHeight: "30px" };

/**
 * The left column previously ran phone, email and two addresses as four bare
 * lines of grey text, so it read as one undifferentiated block — you had to
 * parse each line to work out what it was. GSTIN and CIN already carried bold
 * labels; this applies the same treatment to the rest so the column scans.
 */
const labelStyle = { fontWeight: 700, color: "var(--text-primary)" } as const;

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg)" }}>
      <Frame>
        <style>{`
          /* Link sub-columns: 2 on phones (sm), 1 across the tablet/narrow-laptop
             range where each footer column is too narrow for two, 2 again once
             there's room. Plain CSS so the order is explicit rather than left to
             Tailwind's variant sorting. */
          @media (min-width: 640px) and (max-width: 767px) { .footer-sub { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
          @media (min-width: 1200px) { .footer-sub { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
          /* From lg up: info column + two EQUAL link columns, each link column
             padded the same on both sides so the divider-to-text spacing is
             identical left and right. Side inset is proportional (fx) so the
             layout holds its shape at every width. */
          @media (min-width: 1024px) {
            .footer-grid { display: grid; grid-template-columns: minmax(0, 0.7fr) minmax(0, 1fr) minmax(0, 1fr); padding-left: ${fx(23)}; padding-right: ${fx(23)}; }
            .footer-col2, .footer-col3 { padding-left: ${fx(32)}; padding-right: ${fx(32)}; }
          }
        `}</style>
        <div
          className={`footer-grid grid grid-cols-1 md:grid-cols-2 gap-x-0 gap-y-10 pt-14 pb-10 px-6`}
        >
          <div className="md:col-span-2 lg:col-span-1 lg:pr-8 min-w-0">
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

          <div className="footer-col2 lg:border-l-2" style={{ borderColor: "var(--brand-red)" }}>
            {/* h2, not h4: every page's content headings top out at h2/h3, so an
                h4 here skipped levels and failed axe's heading-order check.
                The global h1-h4 rule styles h2 identically, so this is a
                markup-only change. */}
            <h2 style={{ fontSize: "var(--fs-footer-heading)", fontWeight: 800, marginBottom: "1rem", textAlign: "center" }}>
              Solution
            </h2>
            <div className="footer-sub grid grid-cols-1 gap-x-6">
              <ul className="flex flex-col" style={{ fontSize: "var(--fs-footer-link)", color: "var(--text-muted)" }}>
                {solutionLinksCol1.map((s) => {
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
              <ul className="flex flex-col" style={{ fontSize: "var(--fs-footer-link)", color: "var(--text-muted)" }}>
                {solutionLinksCol2.map((s) => {
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
          </div>

          <div className="footer-col3 md:border-l-2 md:pl-8" style={{ borderColor: "var(--brand-red)" }}>
            <h2 style={{ fontSize: "var(--fs-footer-heading)", fontWeight: 800, marginBottom: "1rem", textAlign: "center" }}>
              Products
            </h2>
            <div className="footer-sub grid grid-cols-1 gap-x-6">
              <ul className="flex flex-col" style={{ fontSize: "var(--fs-footer-link)", color: "var(--text-muted)" }}>
                {productLinksCol1.map((p) => (
                  <li key={p} style={rowPitch}>
                    {/* Flat, root-level URL — see the note atop src/app/[slug]/page.tsx. */}
                    <Link href={`/${productLinkSlugs[p]}`} className="hover:underline">
                      {p}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col" style={{ fontSize: "var(--fs-footer-link)", color: "var(--text-muted)" }}>
                {productLinksCol2.map((p) => (
                  <li key={p} style={rowPitch}>
                    <Link href={`/${productLinkSlugs[p]}`} className="hover:underline">
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
