import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Frame from "@/components/ui/Frame";

const faqs = [
  {
    q: "How soon will I receive a response?",
    a: "We typically get back to you within 1–2 business days of receiving your enquiry.",
  },
  { q: "Do you provide customized solutions?", a: "Yes. Our solutions are tailored to your operational requirements." },
  {
    q: "Do you offer installation and support?",
    a: "Yes. Our team handles on-site installation and provides ongoing maintenance and support after deployment.",
  },
  {
    q: "How can I request a quotation?",
    a: "Share your requirements through the form above or reach out directly, and our team will get back to you with a quotation.",
  },
];

/**
 * §4.4 — eyebrow "FAQ" at x=122, 24px. Heading at x=189, 72px, 3 lines.
 * Q/A column at x=829, width 380px (measured x:829–1209), 19px, with a
 * 2px red divider AFTER each of the first three items (3 dividers for 4
 * items — the last item has no trailing rule).
 */
export default function ContactFAQ() {
  return (
    <Frame>
      <style>{`
        @media (min-width: 1440px) {
          .faq-eyebrow { padding-left: 122px; }
          .faq-heading { padding-left: 189px; }
          .faq-grid { grid-template-columns: 829px 1fr; padding-right: 60px; }
          .faq-qa-inner { max-width: 380px; }
        }
      `}</style>
      <section className="py-16 px-6 min-[1440px]:px-0">
        <div className="faq-eyebrow">
          <Text size="body" style={{ color: "var(--brand-red)", fontSize: "var(--fs-eyebrow)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em" }}>
            FAQ
          </Text>
        </div>

        <div className="faq-grid mt-6 grid grid-cols-1 min-[1440px]:grid-cols-2 gap-10">
          <div className="faq-heading">
            <Heading as="h2" size="displayXl" className="leading-[1.1]">
              Frequently
              <br />
              asked
              <br />
              questions.
            </Heading>
          </div>

          <div className="faq-qa">
            <div className="faq-qa-inner flex flex-col">
              {faqs.map((f, i) => (
                <div
                  key={f.q}
                  className="py-4"
                  style={i < faqs.length - 1 ? { borderBottom: "2px solid var(--brand-red)" } : undefined}
                >
                  <Text size="bodySm">
                    <span style={{ fontWeight: 700 }}>Q. </span>
                    {f.q}
                  </Text>
                  {f.a && (
                    <Text size="bodySm" tone="muted" className="mt-2">
                      <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>A. </span>
                      {f.a}
                    </Text>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Frame>
  );
}
