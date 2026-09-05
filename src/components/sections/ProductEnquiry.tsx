import Link from "next/link";
import Frame from "@/components/ui/Frame";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import { companyInfo } from "@/lib/data";

/**
 * Compact enquiry strip for product detail pages.
 *
 * These pages deliberately do NOT use <CTASection />. That block is a 72px
 * "Ready to Automate Your Operations?" headline with a full form column — the
 * right weight for the end of Home, Solution or About, where it's the single
 * closing ask. Repeated at the foot of all 29 product pages it stops reading
 * as a call to action and starts reading as furniture, and it buries the one
 * thing a buyer on a spec page actually wants: a phone number and a way to
 * ask about THIS product.
 *
 * So: one line, the product named, and the two contact routes inline.
 */
export default function ProductEnquiry({ productName }: { productName: string }) {
  return (
    <Frame>
      <section
        className="px-6 min-[1440px]:px-[122px] py-12 mt-6"
        style={{ borderTop: "2px solid var(--brand-red)" }}
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <Heading as="h2" size="h3Lg">
              Enquire about the {productName}
            </Heading>
            <Text size="bodyXs" tone="muted" className="mt-3 max-w-xl">
              Tell us your lane count, read range or volume and we&rsquo;ll quote the right
              configuration.
            </Text>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              href="/contact"
              className="px-6 py-3"
              style={{
                background: "var(--brand-red)",
                color: "var(--white)",
                fontSize: "var(--fs-body-xs)",
                fontWeight: 700,
              }}
            >
              Request a quote
            </Link>
            <a
              href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
              style={{
                color: "var(--brand-red)",
                fontSize: "var(--fs-body-xs)",
                fontWeight: 700,
              }}
            >
              {companyInfo.phone}
            </a>
          </div>
        </div>
      </section>
    </Frame>
  );
}
