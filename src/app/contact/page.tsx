import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactHero from "@/components/sections/ContactHero";
import ContactForm from "@/components/sections/ContactForm";
import ContactFAQ from "@/components/sections/ContactFAQ";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Frame from "@/components/ui/Frame";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Network Toll Solution for toll plaza, parking management, and fleet tracking projects. Request a quote or schedule a consultation today.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: "Contact Us | Network Toll Solution" },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <Frame>
          <div className="px-6 min-[1440px]:pl-[281px] pt-6">
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
