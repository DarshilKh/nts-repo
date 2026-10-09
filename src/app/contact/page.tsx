import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactHero from "@/components/sections/ContactHero";
import ContactForm from "@/components/sections/ContactForm";
import ContactFAQ from "@/components/sections/ContactFAQ";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Frame from "@/components/ui/Frame";
import { fx } from "@/lib/tokens";

export const metadata: Metadata = {
  // `absolute` opts out of the root layout's title template — see the note
  // in src/app/[slug]/page.tsx for why (this title is already complete).
  title: { absolute: "Contact us - Network Toll Solution" },
  description: "Get in touch with us for any need related to RFID product and services.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: "Contact us - Network Toll Solution" },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <Frame>
          <div className="page-x fx-pl pt-6" style={{ "--pl": fx(281) } as CSSProperties}>
            <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
          </div>
        </Frame>
        <ContactHero />
        <ContactForm />
        <ContactFAQ />
      </main>
      <Footer />
    </>
  );
}
