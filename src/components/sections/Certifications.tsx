import Heading from "@/components/ui/Heading";
import Frame from "@/components/ui/Frame";

/**
 * Real certification logos supplied by the client, each linking to the
 * actual certificate PDF (also client-supplied) rather than a static image
 * of the logo alone — a visitor can verify the certificate number, issue
 * and expiry dates directly rather than taking the logo's word for it.
 */
const CERTIFICATIONS = [
  { name: "CMMI Maturity Level 3", logo: "/certifications/logo-cmmi.png", pdf: "/certifications/cmmi-level-3.pdf" },
  { name: "DPIIT — Startup India", logo: "/certifications/logo-dpiit.png", pdf: "/certifications/dpiit-startup-india.pdf" },
  { name: "ISO 9001:2015", logo: "/certifications/logo-iso-9001.png", pdf: "/certifications/iso-9001-2015.pdf" },
  { name: "ISO/IEC 20000-1:2018", logo: "/certifications/logo-iso-20000.png", pdf: "/certifications/iso-20000-1-2018.pdf" },
  { name: "MSME / Udyam Registration", logo: "/certifications/logo-msme.png", pdf: "/certifications/udyam-msme.pdf" },
];

export default function Certifications() {
  return (
    <Frame>
      <section className="px-6 min-[1440px]:px-[122px] py-16 text-center">
        <Heading as="h2" size="h3Lg">
          Certifications
        </Heading>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {CERTIFICATIONS.map((c) => (
            <a
              key={c.pdf}
              href={c.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-28 md:w-32 opacity-90 hover:opacity-100 transition-opacity"
              aria-label={`View ${c.name} certificate (PDF, opens in a new tab)`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- a
                  handful of small, non-LCP logo marks; next/image's fixed
                  aspect-ratio box isn't worth it for uniformly-white-background
                  crops that already share one visual size. */}
              <img src={c.logo} alt={`${c.name} certified`} className="w-full h-auto" />
            </a>
          ))}
        </div>
      </section>
    </Frame>
  );
}
